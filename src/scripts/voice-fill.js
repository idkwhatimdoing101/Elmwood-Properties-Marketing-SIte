const WORD_DIGITS = {
  zero: "0", oh: "0", o: "0",
  one: "1", two: "2", to: "2", too: "2",
  three: "3", four: "4", for: "4",
  five: "5", six: "6", seven: "7",
  eight: "8", ate: "8", nine: "9",
};

function normalizeName(transcript) {
  const cleaned = transcript.trim().replace(/\s+/g, " ");
  if (!cleaned) return null;
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizePhone(transcript) {
  const words = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  let digits = "";
  for (const w of words) {
    if (/^\d+$/.test(w)) digits += w;
    else if (w in WORD_DIGITS) digits += WORD_DIGITS[w];
  }
  if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return digits || null;
}

function normalizeEmail(transcript) {
  let t = ` ${transcript.toLowerCase().trim()} `;
  t = t.replace(/\bat\b/g, "@").replace(/\bdot\b/g, ".");
  t = t.replace(/\bunderscore\b/g, "_").replace(/\bdash\b|\bhyphen\b/g, "-");
  t = t.replace(/\s+/g, "");
  return t.includes("@") && t.includes(".") ? t : null;
}

function hasExplicitYear(transcript) {
  return /\b(18|19|20)\d{2}\b/.test(transcript);
}

function parseSpokenDate(transcript) {
  const cleaned = transcript.toLowerCase().replace(/(\d+)(st|nd|rd|th)\b/g, "$1").trim();
  const parsed = new Date(cleaned);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Requires an explicit year — without one, JS Date parsing silently defaults to
// 2001, which is wrong far more often than it's right for a date of birth.
function normalizeDate(transcript) {
  if (!hasExplicitYear(transcript)) return null;
  const parsed = parseSpokenDate(transcript);
  if (!parsed) return null;
  const year = parsed.getFullYear();
  if (year < 1900 || year > 2100) return null;
  return toISODate(parsed);
}

// A move-in date is usually said without a year ("October 1st") — assume the
// next upcoming occurrence of that month/day rather than rejecting it.
function normalizeFutureDate(transcript) {
  const parsed = parseSpokenDate(transcript);
  if (!parsed) return null;
  if (!hasExplicitYear(transcript)) {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    parsed.setFullYear(today.getFullYear());
    if (parsed < todayMidnight) parsed.setFullYear(today.getFullYear() + 1);
  }
  const year = parsed.getFullYear();
  if (year < 1900 || year > 2100) return null;
  return toISODate(parsed);
}

function normalizeYesNo(transcript) {
  const t = transcript.toLowerCase();
  if (/\b(yes|yeah|yep|correct|affirmative)\b/.test(t)) return "Yes";
  if (/\b(no|nope|negative)\b/.test(t)) return "No";
  return null;
}

function normalizeFreeText(transcript) {
  const cleaned = transcript.trim();
  if (!cleaned) return null;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export const NORMALIZERS = {
  name: normalizeName,
  phone: normalizePhone,
  email: normalizeEmail,
  date: normalizeDate,
  futureDate: normalizeFutureDate,
  yesno: normalizeYesNo,
  text: normalizeFreeText,
};

export function isVoiceFillSupported() {
  return Boolean((window.SpeechRecognition || window.webkitSpeechRecognition) && window.speechSynthesis);
}

export class VoiceFillEngine {
  constructor({ form, fields, els, onDone }) {
    this.form = form;
    this.fields = fields;
    this.els = els;
    this.onDone = onDone;
    this.queue = [];
    this.index = 0;
    this.running = false;
    this.redoRequested = false;
    this.skipRequested = false;

    els.redoBtn.addEventListener("click", () => { this.redoRequested = true; });
    els.skipBtn.addEventListener("click", () => { this.skipRequested = true; });
    els.stopBtn.addEventListener("click", () => this.stop());
  }

  async start() {
    if (!isVoiceFillSupported()) {
      this.els.unsupported.hidden = false;
      return;
    }
    this.queue = this.fields.map((f) => f.name);
    this.index = 0;
    this.running = true;
    this.els.panel.hidden = false;
    this.els.startBtn.setAttribute("disabled", "true");
    await this.runLoop();
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    window.speechSynthesis.cancel();
    this.els.panel.hidden = true;
    this.els.startBtn.removeAttribute("disabled");
  }

  setStatus(text) {
    this.els.status.textContent = text;
  }

  setTranscript(text) {
    this.els.transcript.textContent = text ? `Heard: "${text}"` : "";
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  speak(text) {
    this.setStatus(text);
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      utterance.onerror = resolve;
      window.speechSynthesis.speak(utterance);
    });
  }

  listenOnce() {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    return new Promise((resolve, reject) => {
      const recognition = new SpeechRecognitionCtor();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      let settled = false;
      recognition.onresult = (event) => {
        settled = true;
        resolve(event.results[0][0].transcript);
      };
      recognition.onerror = (event) => {
        if (!settled) {
          settled = true;
          reject(event.error);
        }
      };
      recognition.onend = () => {
        if (!settled) reject("no-speech");
      };
      recognition.start();
    });
  }

  async askField(field) {
    await this.speak(field.prompt);
    if (!this.running) return;

    this.setStatus("Listening…");
    this.setTranscript("");

    let transcript;
    try {
      transcript = await this.listenOnce();
    } catch {
      this.setStatus("Didn't catch that — click Redo to try again, or type the answer in by hand.");
      return;
    }
    if (!this.running) return;

    this.setTranscript(transcript);
    const value = NORMALIZERS[field.kind](transcript);
    const input = this.form.elements.namedItem(field.name);

    if (value !== null) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      this.setStatus(`Got it — ${field.label}: ${value}`);
    } else {
      this.setStatus(`Couldn't quite parse that for "${field.label}" — it's focused now, feel free to type it, or click Redo to try again by voice.`);
      input.focus();
    }

    await this.pause(1300);
  }

  async runLoop() {
    while (this.running && this.index < this.queue.length) {
      const field = this.fields.find((f) => f.name === this.queue[this.index]);
      await this.askField(field);
      if (!this.running) return;

      if (this.skipRequested) {
        this.skipRequested = false;
        this.index += 1;
        continue;
      }
      if (this.redoRequested) {
        this.redoRequested = false;
        continue;
      }

      if (field.onAfter) field.onAfter(this.form, this.queue, this.index);
      this.index += 1;
    }

    if (this.running) {
      this.running = false;
      this.els.panel.hidden = true;
      this.els.startBtn.removeAttribute("disabled");
      await this.speak("That's everything. Here's a review before you submit.");
      this.onDone?.();
    }
  }
}
