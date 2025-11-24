// 🔗 Адреса твого активного Apps Script (нова!)
window.APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzUl7EZMk9KlBUgirrZtCg6sK9POdlrqKVSuJt0NqQ1NHJWj2_-EX_gLLvN0DoykM0qsQ/exec";

// === 🔹 Глобальна перевірка користувача (Telegram або Email) + кешування PRO ===
window.addEventListener("DOMContentLoaded", async () => {
  // 🧩 Отримуємо користувача з Telegram або Email
  const tgUser = localStorage.getItem("telegram_user");
  const emailUser = localStorage.getItem("email_user");

  let user = null;
  let userId = null;

  if (tgUser) {
    user = JSON.parse(tgUser);
    userId = user.id;
  } else if (emailUser) {
    user = JSON.parse(emailUser);
    userId = user.id || localStorage.getItem("web_id");
  }

  if (!userId) {
    console.log("👤 Користувач не авторизований");
    return;
  }

  window.currentUser = user;

  // 🔗 Перевірка PRO лише раз на 5 хв
  // ❗ Завжди очищаємо кеш при відкритті профілю
 
  const lastCheck = Number(localStorage.getItem("pro_last_check") || 0);
  const now = Date.now();
  if (now - lastCheck < 5 * 1000) {  // 5 секунд
    console.log("⚡ Використано кешований PRO-статус:", localStorage.getItem("isPro"));
    return;
  }

  // 🧩 URL Apps Script
  const url = (window.APPS_SCRIPT_URL || "").trim();
  if (!url) {
    console.warn("⚠️ APPS_SCRIPT_URL не задано — перевірку PRO пропущено");
    return;
  }

  try {
    const res = await fetch(`${url}?user_id=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    if (!res.ok) throw new Error("Server returned " + res.status);

    const json = await res.json();

    localStorage.setItem("isPro", json.isPro ? "true" : "false");
    localStorage.setItem("pro_last_check", now);
    console.log("🔗 PRO оновлено:", json.isPro);

    // 🟢 Якщо знайдено активний PRO — онови UI
    if (typeof checkProStatus === "function") checkProStatus();
    if (typeof updateProUI === "function") updateProUI();

  } catch (err) {
    console.warn("⚠️ Не вдалося перевірити PRO:", err.message);
  }
});
