// === responsive.js — стабільна адаптація для всіх сторінок ===
(function () {
  const MOBILE_BP = 980;
  const body = document.body;

  const getNav = () => document.querySelector(".main-nav");
  const getToggle = () => document.getElementById("menuToggle");

  // Основна функція — вмикає адаптив і бургер
  function applyResponsive() {
    const nav = getNav();
    const toggle = getToggle();
    const isMobile = window.innerWidth <= MOBILE_BP;

    if (isMobile) {
      body.classList.add("mobile");
      if (toggle && !toggle._bound) {
        toggle.addEventListener("click", () => {
          const opened = nav.classList.toggle("open");
          toggle.classList.toggle("active", opened);
        });
        toggle._bound = true;
      }
    } else {
      body.classList.remove("mobile");
      nav && nav.classList.remove("open");
      toggle && toggle.classList.remove("active");
    }
  }

  // Закриття меню при кліку поза ним
  document.addEventListener("click", (e) => {
    if (!body.classList.contains("mobile")) return;
    const nav = getNav();
    const toggle = getToggle();
    if (!nav || !toggle) return;

    const inside = nav.contains(e.target) || toggle.contains(e.target);
    if (!inside) {
      nav.classList.remove("open");
      toggle.classList.remove("active");
    }
  });

  // Закривати меню при кліку по пункту
  document.addEventListener("click", (e) => {
    if (!body.classList.contains("mobile")) return;
    const link = e.target.closest(".main-nav a");
    if (link) {
      const nav = getNav();
      const toggle = getToggle();
      nav && nav.classList.remove("open");
      toggle && toggle.classList.remove("active");
    }
  });

  // Ініціалізація при завантаженні сторінки
  document.addEventListener("DOMContentLoaded", applyResponsive);
  window.addEventListener("resize", applyResponsive);

  // 🟢 Коли хедер підтягується через fetch (після вставки у DOM)
  window.addEventListener("headerLoaded", () => {
    setTimeout(() => {
      applyResponsive(); // даємо час DOM оновитись
    }, 100);
  });
})();
