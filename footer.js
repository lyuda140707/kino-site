// === footer.js — фінальна версія для Formspree ===
(function () {
  const contactModal = document.getElementById("contactModal");
  const rightsModal  = document.getElementById("rightsModal");

  // Відкрити модалку "Контакти"
  document.getElementById("openContact")?.addEventListener("click", (e) => {
    e.preventDefault(); // щоб не стрибала сторінка вгору
    contactModal.style.display = "flex";
  });

  // Відкрити модалку "Правовласникам"
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

  // Клік поза модалкою — закрити
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
    if (e.target === rightsModal) {
      rightsModal.style.display = "none";
    }
  });

  // === Показ статусу після редіректу Formspree ===
  const params = new URLSearchParams(window.location.search);

  if (params.get("sent") === "contact") {
    const status = document.getElementById("contactStatus");
    if (status) status.textContent = "✅ Повідомлення відправлено!";
  }

  if (params.get("sent") === "dmca") {
    const status = document.getElementById("dmcaStatus");
    if (status) status.textContent = "✅ Запит відправлено!";
  }
})();
