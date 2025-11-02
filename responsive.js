// === Responsive.js — універсальна адаптація для всього сайту ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector(".main-nav");
  const search = document.querySelector("#search-input");
  const profileBtn = document.querySelector(".profile-btn");
  const sidebar = document.querySelector(".sidebar") || document.querySelector(".left-menu");
  const filmsGrid = document.querySelector(".films-grid") || document.querySelector("#films-list");

  function applyResponsive() {
    const width = window.innerWidth;

    // 📱 Мобільна версія
    if (width < 768) {
      document.body.classList.add("mobile");
      document.body.classList.remove("tablet", "desktop");

      // пошук короткий
      if (search) search.placeholder = "🔍 Пошук";
      if (profileBtn) profileBtn.textContent = "👤 Профіль";

      // гамбургер
      if (!document.querySelector(".menu-toggle")) {
        const toggle = document.createElement("div");
        toggle.className = "menu-toggle";
        toggle.innerHTML = "☰";
        header?.prepend(toggle);

        toggle.addEventListener("click", () => {
          nav?.classList.toggle("show");
        });
      }

      // приховуємо бокове меню — переносимо вниз сторінки
      if (sidebar) {
        sidebar.style.order = "2";
        sidebar.style.width = "100%";
        sidebar.style.marginTop = "20px";
        sidebar.style.border = "none";
      }

      // фільми в 2 колонки
      if (filmsGrid) {
        filmsGrid.style.display = "grid";
        filmsGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
        filmsGrid.style.gap = "10px";
      }
    }

    // 💻 Планшет
    else if (width < 1024) {
      document.body.classList.add("tablet");
      document.body.classList.remove("mobile", "desktop");
      if (search) search.placeholder = "Пошук фільму...";
      if (filmsGrid) {
        filmsGrid.style.display = "grid";
        filmsGrid.style.gridTemplateColumns = "repeat(3, 1fr)";
      }
      if (sidebar) sidebar.style.width = "100%";
    }

    // 🖥 Десктоп
    else {
      document.body.classList.add("desktop");
      document.body.classList.remove("mobile", "tablet");

      if (search) search.placeholder = "Пошук фільмів, серіалів...";
      if (profileBtn) profileBtn.textContent = "👑 Мій кабінет";
      if (nav) nav.classList.remove("show");
      const toggle = document.querySelector(".menu-toggle");
      if (toggle) toggle.remove();

      // повертаємо бокове меню ліворуч
      if (sidebar) {
        sidebar.style.order = "";
        sidebar.style.width = "";
        sidebar.style.marginTop = "";
        sidebar.style.border = "";
      }

      // нормальна сітка фільмів
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
