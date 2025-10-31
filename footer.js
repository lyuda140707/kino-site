// footer.js
(function () {
  const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyZZRm6kGq-pH7PwTtPynQF5WRxjfPNuOA1mUMQP8wedsdZ3uVpDpGDnShmQWmem4I9/exec";

  const contactModal = document.getElementById("contactModal");
  const rightsModal  = document.getElementById("rightsModal");

  // Кнопки відкриття/закриття
  document.getElementById("openContact")?.addEventListener("click", () => contactModal.style.display = "flex");
  document.getElementById("openRights")?.addEventListener("click",  () => rightsModal.style.display  = "flex");
  document.getElementById("closeContact")?.addEventListener("click", () => contactModal.style.display = "none");
  document.getElementById("closeRights")?.addEventListener("click",  () => rightsModal.style.display  = "none");

  window.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.style.display = "none";
    if (e.target === rightsModal)  rightsModal.style.display  = "none";
  });

  // Форма "Контакти"
  document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const msg  = document.getElementById("contactMsg").value.trim();
    const statusEl = document.getElementById("contactStatus");
    statusEl.textContent = "⏳ Відправляю...";
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact_form", name, message: msg })
      });
      const data = await res.json();
      if (data?.ok) {
        statusEl.textContent = "✅ Повідомлення відправлено!";
        e.target.reset();
      } else throw new Error();
    } catch {
      statusEl.textContent = "❌ Не вдалося відправити. Спробуйте пізніше.";
    }
  });

  // Форма "Правовласникам"
  document.getElementById("dmcaForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name    = document.getElementById("dmcaName").value.trim();
    const email   = document.getElementById("dmcaEmail").value.trim();
    const details = document.getElementById("dmcaDetails").value.trim();
    const statusEl = document.getElementById("dmcaStatus");
    statusEl.textContent = "⏳ Відправляю...";
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "dmca_form", name, email, message: details })
      });
      const data = await res.json();
      if (data?.ok) {
        statusEl.textContent = "✅ Запит відправлено! Ми зв’яжемося найближчим часом.";
        e.target.reset();
      } else throw new Error();
    } catch {
      statusEl.textContent = "❌ Не вдалося відправити. Спробуйте пізніше.";
    }
  });
})();
