// === GLOBAL PULL TO REFRESH for ALL PAGES ===

let startY = 0;
let currentY = 0;
let pulling = false;
const threshold = 80;  // скільки тягнути вниз
const minMove = 10;    // мінімальний рух щоб не спрацьовувало при тапі

// Панель
const refresher = document.createElement("div");
refresher.style.cssText = `
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  height: 60px;
  background: #00fff2;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  transition: top 0.25s ease;
  z-index: 99999;
`;
refresher.innerHTML = "⬇️ Потягни, щоб оновити...";
document.body.appendChild(refresher);


// Початок торкання
document.addEventListener("touchstart", (e) => {
  if (window.scrollY === 0) {
    pulling = true;
    startY = e.touches[0].clientY;
  }
});


// Рух пальця
document.addEventListener("touchmove", (e) => {
  if (!pulling) return;

  currentY = e.touches[0].clientY;
  let diff = currentY - startY;

  if (diff < minMove) return;
  if (diff > 0) {
    refresher.style.top = Math.min(diff - 60, 20) + "px";
  }
});


// Відпускання
document.addEventListener("touchend", () => {
  if (!pulling) return;
  pulling = false;

  let diff = currentY - startY;

  if (diff < threshold) {
    refresher.style.top = "-60px";
    return;
  }

  refresher.innerHTML = "🔄 Оновлюємо...";
  refresher.style.top = "0px";

  setTimeout(() => {
    window.scrollTo(0, 0);
    setTimeout(() => location.reload(), 150);
  }, 150);
});
