// === footer.js — з Ajax-відправкою Formspree ===
(function () {
  const contactModal = document.getElementById("contactModal");
  const rightsModal  = document.getElementById("rightsModal");
  const FORM_URL = "https://formspree.io/f/mkgpqaav"; // твій Formspree endpoint

  // Відкрити модалки
  document.getElementById("openContact")?.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "flex";
  });
  document.getElementById("openRights")?.addEventListener("click", (e) => {
    e.preventDefault();
    rightsModal.style.display = "flex";
  });

  // Закрити модалки
  document.getElementById("closeContact")?.addEventListener("click", () => {
    contactModal.style.display = "none";
  });
  document.getElementById("closeRights")?.addEventListener("click", () => {
    rightsModal.style.display = "none";
  });

  // Клік поза модалкою
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.style.display = "none";
    if (e.target === rightsModal) rightsModal.style.display = "none";
  });

  // === Відправлення через AJAX (без редіректу)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "⏳ Відправляю...";

    const formData = {
      name: document.getElementById("contactName").value,
      message: document.getElementById("contactMsg").value,
    };

    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        status.textContent = "✅ Повідомлення відправлено!";
        form.reset();
      } else {
        status.textContent = "❌ Помилка. Спробуйте пізніше.";
      }
    } catch (err) {
      status.textContent = "❌ Не вдалося відправити.";
    }
  });
})();
