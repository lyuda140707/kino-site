// === Responsive.js — адаптація для KinoSite ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector(".main-nav");
  const topbar = document.querySelector(".topbar");
  const search = document.querySelector("#search-input");
  const profileBtn = document.querySelector(".profile-btn");

  function applyResponsive() {
    const w = window.innerWidth;

    // === 📱 Мобільна версія ===
    if (w <= 768) {
      document.body.classList.add("mobile");
      document.body.classList.remove("tablet", "desktop");

      if (search) search.placeholder = "🔍 Пошук";
      if (profileBtn) profileBtn.textContent = "👤";

      // Якщо ще нема кнопки ☰ — додаємо
      if (!document.querySelector(".menu-toggle")) {
        const btn = document.createElement("div");
        btn.className = "menu-toggle";
        btn.innerHTML = "☰";
        topbar?.prepend(btn);

        btn.addEventListener("click", () => {
          nav.classList.toggle("open");
          btn.classList.toggle("active");
        });
      }

      // приховуємо навігацію до натискання
      if (nav) {
        nav.classList.add("collapsed");
        nav.classList.remove("open");
      }
    }

    // === 💻 Планшетна версія ===
    else if (w <= 1024) {
      document.body.classList.add("tablet");
      document.body.classList.remove("mobile", "desktop");

      if (search) search.placeholder = "Пошук фільмів...";
      if (profileBtn) profileBtn.textContent = "👑 Мій кабінет";

      const toggle = document.querySelector(".menu-toggle");
      if (toggle) toggle.remove();

      if (nav) {
        nav.classList.remove("collapsed", "open");
        nav.style.display = "flex";
      }
    }

    // === 🖥 Десктоп ===
    else {
      document.body.classList.add("desktop");
      document.body.classList.remove("mobile", "tablet");

      if (search) search.placeholder = "Пошук…";
      if (profileBtn) profileBtn.textContent = "👑 Мій кабінет";

      const toggle = document.querySelector(".menu-toggle");
      if (toggle) toggle.remove();

      if (nav) {
        nav.classList.remove("collapsed", "open");
        nav.style.display = "flex";
      }
    }
  }

  applyResponsive();
  window.addEventListener("resize", applyResponsive);
});
