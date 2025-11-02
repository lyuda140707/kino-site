// === responsive.js — стабільна адаптація для KinoSite ===
(() => {
  const MOBILE_BP = 980;
  const body = document.body;

  // функція для ініціалізації бургера
  function initBurger() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    // якщо подія вже прив’язана — не дублюємо
    if (toggle._bound) return;

    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      toggle.classList.toggle("active", opened);
    });
    toggle._bound = true;
  }

  // функція адаптації (додає клас mobile)
  function applyResponsive() {
    const isMobile = window.innerWidth <= MOBILE_BP;
    if (isMobile) {
      body.classList.add("mobile");
    } else {
      body.classList.remove("mobile");
      document.querySelector(".main-nav")?.classList.remove("open");
      document.getElementById("menuToggle")?.classList.remove("active");
    }
  }

  // 🟢 основні слухачі
  window.addEventListener("resize", applyResponsive);
  document.addEventListener("DOMContentLoaded", () => {
    applyResponsive();
    initBurger();
  });

  // 🟡 головне: спрацьовує після fetch("header.html")
  window.addEventListener("headerLoaded", () => {
    // чекаємо 100мс, щоб хедер встиг вставитись у DOM
    setTimeout(() => {
      applyResponsive();
      initBurger();
    }, 100);
  });
})();
