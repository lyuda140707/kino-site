// === footer.js — фінальна версія для Formspree ===
(function () {
  // Елементи модалок
  const contactModal = document.getElementById("contactModal");
  const rightsModal  = document.getElementById("rightsModal");

  // Відкрити модалку "Контакти"
  document.getElementById("openContact")?.addEventListener("click", () => {
    contactModal.style.display = "flex";
  });

  // Відкрити модалку "Правовласникам"
  document.getElementById("openRights")?.addEventListener("click", () => {
    rightsModal.style.display = "flex";
  });

  // Закрити модалку "Контакти"
  document.getElementById("closeContact")?.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Закрити модалку "Правовласникам"
  document.getElementById("closeRights")?.addEventListener("click", () => {
    rightsModal.style.display = "none";
  });

  // Клік поза модалкою — закрити
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) contactModal.style.display = "none";
    if (e.target === rightsModal)  rightsModal.style.display  = "none";
  });

  // === Показ статусу після редіректу Formspree ===
  const params = new URLSearchParams(window.location.search);

  if (params.get("sent") === "contact") {
    document.getElementById("contactStatus")?.textContent = "✅ Повідомлення відправлено!";
  }

  if (params.get("sent") === "dmca") {
    document.getElementById("dmcaStatus")?.textContent = "✅ Запит відправлено!";
  }
})();
