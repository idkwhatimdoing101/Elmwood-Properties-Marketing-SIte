function encode(data) {
  return new URLSearchParams(data).toString();
}

document.querySelectorAll("form.netlify-form").forEach((form) => {
  const statusEl = form.parentElement?.querySelector("[data-form-status]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn?.setAttribute("disabled", "true");

    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(Object.fromEntries(formData)),
      });

      if (!response.ok) throw new Error(String(response.status));

      form.hidden = true;
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.dataset.state = "success";
      }
    } catch (err) {
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.dataset.state = "error";
      }
      submitBtn?.removeAttribute("disabled");
    }
  });
});
