// responsive.js — один скрипт адаптації для всього сайту
(function () {
  const MOBILE_BP = 980; // ширина, з якої вмикаємо мобільний режим
  const body = document.body;

  const getNav = () => document.querySelector('.main-nav');
  const getToggle = () => document.getElementById('menuToggle');

  function ensureToggleHandler() {
    const t = getToggle();
    if (!t) return;
    if (!t._bound) {
      t.addEventListener('click', onToggle);
      t._bound = true;
    }
  }

  function onToggle() {
    const nav = getNav();
    if (!nav) return;
    const opened = nav.classList.toggle('open');
    this.classList.toggle('active', opened);
  }

  function applyMode() {
    const nav = getNav();
    const toggle = getToggle();
    const isMobile = window.innerWidth <= MOBILE_BP;

    if (isMobile) {
      body.classList.add('mobile');
      nav && nav.classList.remove('open');          // стартово закрите
      toggle && toggle.classList.remove('active');  // скинути стан іконки
      ensureToggleHandler();
    } else {
      body.classList.remove('mobile');
      nav && nav.classList.remove('open');
      toggle && toggle.classList.remove('active');
    }
  }

  // Закривати меню при кліку поза ним
  document.addEventListener('click', (e) => {
    if (!body.classList.contains('mobile')) return;
    const nav = getNav();
    const toggle = getToggle();
    if (!nav) return;

    const clickInsideMenu = nav.contains(e.target) || (toggle && toggle.contains(e.target));
    if (!clickInsideMenu) {
      nav.classList.remove('open');
      toggle && toggle.classList.remove('active');
    }
  });

  // Закривати меню при переході по пункту
  document.addEventListener('click', (e) => {
    if (!body.classList.contains('mobile')) return;
    const link = e.target.closest('.main-nav a');
    if (link) {
      const nav = getNav();
      const toggle = getToggle();
      nav && nav.classList.remove('open');
      toggle && toggle.classList.remove('active');
    }
  });

  // Ховати ховер-мегаменю на мобільному (без JS-наведення)
  function disableHoverMegaOnMobile() {
    if (!body.classList.contains('mobile')) return;
    document.querySelectorAll('.mega-menu, .mega-series, .mega-cartoons')
      .forEach(m => { m.style.display = 'none'; m.style.opacity = 0; m.style.pointerEvents = 'none'; });
  }

  window.addEventListener('resize', () => { applyMode(); disableHoverMegaOnMobile(); });
  document.addEventListener('DOMContentLoaded', () => { applyMode(); disableHoverMegaOnMobile(); });

})();
