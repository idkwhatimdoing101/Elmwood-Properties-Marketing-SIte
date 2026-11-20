// Submits any <form class="web3-form"> to Web3Forms, which emails the
// submission to the address tied to the access key (see site.ts).
// Form attributes:
//   data-access-key  Web3Forms access key (required)
//   data-subject     Email subject line; "{field}" is replaced with that field's value
// The status element is the sibling [data-form-status] with [data-success]/[data-error] children.

document.querySelectorAll("form.web3-form").forEach((form) => {
  const statusEl = form.parentElement?.querySelector("[data-form-status]");

  const showStatus = (state) => {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.dataset.state = state;
    statusEl.querySelectorAll("p").forEach((p) => {
      p.style.display = p.hasAttribute(`data-${state}`) ? "block" : "none";
    });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn?.setAttribute("disabled", "true");

    const payload = Object.fromEntries(new FormData(form).entries());
    const accessKey = form.dataset.accessKey;
    payload.access_key = accessKey;
    payload.from_name = "Elmwood Apartments Website";
    if (form.dataset.subject) {
      payload.subject = form.dataset.subject.replace(/\{(\w+)\}/g, (_, key) => payload[key] ?? "");
    }
    // Lets the admin hit "reply" to answer the resident directly.
    if (payload.email) payload.replyto = payload.email;

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
      showStatus("success");
    } catch (err) {
      showStatus("error");
      submitBtn?.removeAttribute("disabled");
    }
  });
});
