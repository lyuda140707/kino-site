// === Responsive.js — адаптація для всіх сторінок ===
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector("header");
  const nav = document.querySelector(".main-nav");
  const search = document.querySelector("#search-input");
  const profileBtn = document.querySelector(".profile-btn");

  function applyResponsive() {
    const width = window.innerWidth;

    // 📱 Мобільна версія
    if (width < 768) {
      body.classList.add("mobile");
      body.classList.remove("tablet", "desktop");

      if (nav) nav.classList.add("collapsed");
      if (search) search.placeholder = "🔍 Пошук";
      if (profileBtn) profileBtn.textContent = "👤 Профіль";

      // створюємо "гамбургер"
      if (!document.querySelector(".menu-toggle")) {
        const toggle = document.createElement("div");
        toggle.className = "menu-toggle";
        toggle.innerHTML = "☰";
        header.prepend(toggle);

        toggle.addEventListener("click", () => {
          nav.classList.toggle("show");
        });
      }
    }
    // 💻 Планшет
    else if (width < 1024) {
      body.classList.add("tablet");
      body.classList.remove("mobile", "desktop");
      if (search) search.placeholder = "Пошук фільму...";
    }
    // 🖥 Десктоп
    else {
      body.classList.add("desktop");
      body.classList.remove("mobile", "tablet");

      if (nav) nav.classList.remove("collapsed", "show");
      if (search) search.placeholder = "Пошук фільмів, серіалів...";
      const toggle = document.querySelector(".menu-toggle");
      if (toggle) toggle.remove();
    }
  }

  applyResponsive();
  window.addEventListener("resize", applyResponsive);
});
