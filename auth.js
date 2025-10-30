// === 🔹 Глобальна перевірка Telegram користувача + кешування PRO ===
window.addEventListener("DOMContentLoaded", async () => {
  const savedUser = localStorage.getItem("telegram_user");
  if (!savedUser) return console.log("👤 Користувач не авторизований");

  const user = JSON.parse(savedUser);
  window.currentUser = user;

  const lastCheck = Number(localStorage.getItem("pro_last_check") || 0);
  const now = Date.now();
  const cacheValid = now - lastCheck < 5 * 60 * 1000; // 5 хвилин

  if (cacheValid) {
    console.log("⚡ Використано кешований PRO-статус:", localStorage.getItem("isPro"));
    return;
  }

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyrCxL8N7w1XC3JDU-A1QMlZn8NKs5QKaS1vg-TRjijk_zI00i_y5KP-N5_VNjUA17xyA/exec?user_id=" +
        encodeURIComponent(user.id)
    );
    const json = await res.json();
    localStorage.setItem("isPro", json.isPro ? "true" : "false");
    localStorage.setItem("pro_last_check", now);
    console.log("🔗 PRO оновлено:", json.isPro);
  } catch (err) {
    console.warn("⚠️ Не вдалося перевірити PRO:", err);
  }
});
