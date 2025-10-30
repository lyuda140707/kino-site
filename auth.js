// === 🔹 Глобальна перевірка Telegram користувача ===
window.addEventListener("DOMContentLoaded", async () => {
  const savedUser = localStorage.getItem("telegram_user");

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      window.currentUser = user; // глобально зберігаємо

      // 🔸 Перевірка PRO статусу через Google Script
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyrCxL8N7w1XC3JDU-A1QMlZn8NKs5QKaS1vg-TRjijk_zI00i_y5KP-N5_VNjUA17xyA/exec?user_id=" +
        encodeURIComponent(user.id)
      );
      const json = await res.json();

      // зберігаємо статус у localStorage
      localStorage.setItem("isPro", json.isPro ? "true" : "false");

      console.log("🔗 Користувач:", user.first_name, "| PRO =", json.isPro);
    } catch (err) {
      console.warn("⚠️ Не вдалося перевірити PRO:", err);
      localStorage.removeItem("isPro");
    }
  } else {
    console.log("👤 Користувач не авторизований у Telegram");
  }
});
