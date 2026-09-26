import { VoiceFillEngine, isVoiceFillSupported, applyVoicePreference } from "./voice-fill.js";
import { ttsVoiceNames } from "../data/site";

const FIELDS = [
  { name: "firstName", label: "First name", kind: "name", prompt: "What is your first name?" },
  { name: "lastName", label: "Last name", kind: "name", prompt: "What is your last name?" },
  { name: "phone", label: "Phone number", kind: "phone", prompt: "What is your phone number? You can say the digits one at a time." },
  { name: "email", label: "Email", kind: "email", prompt: "What is your email address? Say 'at' for the at sign and 'dot' for periods." },
  { name: "dob", label: "Date of birth", kind: "date", prompt: "What is your date of birth? Please include the year — for example, say January 5th, 1990." },
  { name: "moveInDate", label: "Desired move-in date", kind: "futureDate", prompt: "What date would you like to move in? For example, say October 1st." },
  { name: "desiredBedrooms", label: "Desired bedrooms", kind: "bedrooms", prompt: "How many bedrooms are you looking for? You can say studio, 1, 2, 3, or 4." },
  {
    name: "criminalHistory",
    label: "Criminal history",
    kind: "yesno",
    prompt: "Do you have a criminal history? Please say yes or no.",
    onAfter(form, queue, index) {
      const value = form.elements.namedItem("criminalHistory").value;
      if (value === "Yes" && !queue.includes("criminalHistoryDetails")) {
        queue.splice(index + 1, 0, "criminalHistoryDetails");
      }
    },
  },
  {
    name: "criminalHistoryDetails",
    label: "Please explain",
    kind: "text",
    prompt: "Please briefly describe.",
  },
];

function initApplyForm() {
  const form = document.querySelector("[data-apply-form]");
  if (!form) return;

  const fillFields = form.querySelector("[data-fill-fields]");
  const fillActions = form.querySelector("[data-fill-actions]");
  const reviewSection = form.querySelector("[data-review-fields]");
  const reviewList = form.querySelector("[data-review-list]");
  const statusEl = document.querySelector("[data-form-status]");

  const criminalSelect = form.elements.namedItem("criminalHistory");
  const criminalDetailsField = form.querySelector("[data-criminal-details]");

  criminalSelect.addEventListener("change", () => {
    criminalDetailsField.hidden = criminalSelect.value !== "Yes";
  });

  function visibleFields() {
    return FIELDS.filter((field) => {
      if (field.name === "criminalHistoryDetails") return criminalSelect.value === "Yes";
      return true;
    });
  }

  function renderReview() {
    reviewList.innerHTML = "";
    visibleFields().forEach((field) => {
      const input = form.elements.namedItem(field.name);
      const dt = document.createElement("dt");
      dt.textContent = field.label;
      const dd = document.createElement("dd");
      dd.textContent = input.value || "—";
      reviewList.append(dt, dd);
    });
  }

  function goToReview() {
    if (!form.reportValidity()) return;
    renderReview();
    fillFields.hidden = true;
    fillActions.hidden = true;
    reviewSection.hidden = false;
    form.dataset.step = "review";
    reviewSection.querySelector("h2")?.focus();
  }

  function goBackToEdit() {
    fillFields.hidden = false;
    fillActions.hidden = false;
    reviewSection.hidden = true;
    form.dataset.step = "fill";
  }

  form.querySelector("[data-go-review]").addEventListener("click", goToReview);
  form.querySelector("[data-go-back]").addEventListener("click", goBackToEdit);

  form.querySelector("[data-voice-readback]").addEventListener("click", () => {
    if (!window.speechSynthesis) return;
    const parts = visibleFields().map((field) => `${field.label}: ${form.elements.namedItem(field.name).value || "blank"}`);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`Here's what you entered. ${parts.join(". ")}`);
    applyVoicePreference(utterance, ttsVoiceNames);
    window.speechSynthesis.speak(utterance);
  });

  // Voice fill accessibility tool
  const voiceTool = document.querySelector("[data-voice-tool]");
  if (voiceTool) {
    const els = {
      startBtn: voiceTool.querySelector("[data-voice-start]"),
      panel: voiceTool.querySelector("[data-voice-panel]"),
      status: voiceTool.querySelector("[data-voice-status]"),
      transcript: voiceTool.querySelector("[data-voice-transcript]"),
      redoBtn: voiceTool.querySelector("[data-voice-redo]"),
      skipBtn: voiceTool.querySelector("[data-voice-skip]"),
      stopBtn: voiceTool.querySelector("[data-voice-stop]"),
      unsupported: voiceTool.querySelector("[data-voice-unsupported]"),
    };

    if (!isVoiceFillSupported()) {
      els.startBtn.setAttribute("disabled", "true");
      els.unsupported.hidden = false;
    }

    const engine = new VoiceFillEngine({
      form,
      fields: FIELDS,
      els,
      onDone: goToReview,
      voicePreferences: ttsVoiceNames,
    });

    els.startBtn.addEventListener("click", () => engine.start());
  }

  // Submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn?.setAttribute("disabled", "true");

    const accessKey = form.dataset.accessKey;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.access_key = accessKey;
    payload.subject = `New rental application — ${payload.firstName} ${payload.lastName}`;
    payload.from_name = "Elmwood Apartments Website";

    try {
      if (!accessKey) throw new Error("missing-access-key");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || String(response.status));

      form.hidden = true;
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.dataset.state = "success";
      }
      if (typeof fbq === "function") fbq("track", "SubmitApplication", { content_name: "Apply" });
    } catch (err) {
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.dataset.state = "error";
      }
      submitBtn?.removeAttribute("disabled");
    }
  });

  if (statusEl) {
    const observer = new MutationObserver(() => {
      const state = statusEl.dataset.state;
      statusEl.querySelectorAll("p").forEach((p) => {
        const show = (state === "success" && p.hasAttribute("data-success")) ||
          (state === "error" && p.hasAttribute("data-error"));
        p.style.display = show ? "block" : "none";
      });
    });
    observer.observe(statusEl, { attributes: true, attributeFilter: ["data-state"] });
  }
}

initApplyForm();
