// === header.js ===

// Функція пошуку в шапці
function bindHeaderSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = input.value.trim();
      if (query.length > 1) {
        localStorage.setItem("searchQuery", query);
        window.location.href = "/search.html";
      }
    }
  });
}

// Ініціалізація мобільного меню
function initMobileMenu() {
  if (window.innerWidth > 980) return;
  const header = document.querySelector("header") || document.getElementById("header-placeholder");
  if (!header) return;
  if (document.querySelector(".burger-btn")) return;

  const desktopNav = document.querySelector(".main-nav");
  const burger = document.createElement("button");
  burger.className = "burger-btn";
  burger.innerHTML = "☰";

  const overlay = document.createElement("div");
  overlay.className = "mobile-overlay";

  const panel = document.createElement("aside");
  panel.className = "mobile-panel";
  panel.innerHTML = `
    <div class="mobile-panel-header">
      <div class="mobile-title">Меню</div>
      <button class="mobile-close">✕</button>
    </div>
    <div class="mobile-nav-scroll">
      <nav class="mobile-nav"></nav>
    </div>
  `;

  document.body.append(overlay, panel, burger);
  const mobileNav = panel.querySelector(".mobile-nav");
  const btnClose = panel.querySelector(".mobile-close");

  if (desktopNav) {
    const topItems = Array.from(desktopNav.children);
    topItems.forEach((item) => {
      const link = item.querySelector("a");
      const mega = item.querySelector(".mega-menu, .submenu");

      if (mega) {
        const acc = document.createElement("div");
        acc.className = "mobile-accordion";
        const head = document.createElement("div");
        head.className = "mobile-acc-head";
        head.innerHTML = `<span>${link ? link.textContent.trim() : "Розділ"}</span><span class="chev">›</span>`;

        const body = document.createElement("div");
        body.className = "mobile-acc-body";
        const inner = document.createElement("div");
        inner.className = "mobile-acc-inner";

        mega.querySelectorAll("a").forEach(a => {
          const mLink = document.createElement("a");
          mLink.href = a.getAttribute("href") || "#";
          mLink.textContent = a.textContent.trim();
          mLink.addEventListener("click", () => closeMenu());
          inner.appendChild(mLink);
        });

        body.append(inner);
        acc.append(head, body);
        mobileNav.append(acc);

        head.addEventListener("click", () => {
          const open = head.classList.contains("open");
          panel.querySelectorAll(".mobile-acc-head").forEach(h => h.classList.remove("open"));
          panel.querySelectorAll(".mobile-acc-body").forEach(b => (b.style.maxHeight = "0px"));
          if (!open) {
            head.classList.add("open");
            body.style.maxHeight = body.scrollHeight + "px";
          }
        });
      } else if (link) {
        const mLink = document.createElement("a");
        mLink.href = link.href;
        mLink.textContent = link.textContent.trim();
        mLink.addEventListener("click", () => closeMenu());
        mobileNav.appendChild(mLink);
      }
    });
  }

  function openMenu() {
    document.body.classList.add("menu-open");
    overlay.classList.add("show");
    panel.classList.add("show");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
    overlay.classList.remove("show");
    panel.classList.remove("show");
    panel.querySelectorAll(".mobile-acc-head").forEach(h=>h.classList.remove("open"));
    panel.querySelectorAll(".mobile-acc-body").forEach(b=>b.style.maxHeight="0px");
  }

  burger.addEventListener("click", openMenu);
  btnClose.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
  document.body.classList.add("mobile");
}

// Завантаження header.html
function loadHeader() {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      const mount = document.getElementById("header-placeholder");
      if (mount) mount.innerHTML = html;
      bindHeaderSearch();
      initMobileMenu();
    })
    .catch(err => console.error("Header load error:", err));
}

document.addEventListener("DOMContentLoaded", loadHeader);
