// === Responsive.js — адаптація для всього сайту Relax/KinoSite ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector(".main-nav");
  const topbar = document.querySelector(".topbar");
  const search = document.querySelector("#search-input");
  const profileBtn = document.querySelector(".profile-btn");
  const sidebar = document.querySelector(".sidebar") || document.querySelector(".left-menu");
  const filmsGrid = document.querySelector("#films-list");

  function applyResponsive() {
    const w = window.innerWidth;

    // === 📱 Мобільна версія ===
    if (w <= 768) {
      document.body.classList.add("mobile");
      document.body.classList.remove("tablet", "desktop");

      if (search) search.placeholder = "🔍 Пошук";
      if (profileBtn) profileBtn.textContent = "👤";

      // Додаємо кнопку меню (☰)
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
        nav.classList.remove("desktop");
      }

      // переносимо бокове меню вниз (як секцію після фільмів)
      if (sidebar) {
        sidebar.style.order = "2";
        sidebar.style.width = "100%";
        sidebar.style.marginTop = "25px";
      }

      // фільми 2 в ряд
      if (filmsGrid) {
        filmsGrid.style.display = "grid";
        filmsGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
        filmsGrid.style.gap = "12px";
      }
    }

    // === 💻 Планшетна версія ===
    else if (w <= 1024) {
      document.body.classList.add("tablet");
      document.body.classList.remove("mobile", "desktop");

      if (search) search.placeholder = "Пошук фільмів...";
      if (profileBtn) profileBtn.textContent = "👑 Мій кабінет";

      if (nav) {
        nav.classList.remove("collapsed", "open");
        nav.style.display = "flex";
      }
      if (sidebar) sidebar.style.width = "100%";
      if (filmsGrid) filmsGrid.style.gridTemplateColumns = "repeat(3, 1fr)";
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

      if (sidebar) {
        sidebar.style.order = "initial";
        sidebar.style.width = "";
        sidebar.style.marginTop = "";
      }

      if (filmsGrid) {
        filmsGrid.style.display = "grid";
        filmsGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
        filmsGrid.style.gap = "18px";
      }
    }
  }

  applyResponsive();
  window.addEventListener("resize", applyResponsive);
});
