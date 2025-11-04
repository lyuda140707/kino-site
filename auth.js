// === 🔹 Глобальна перевірка Telegram користувача + кешування PRO ===
window.addEventListener("DOMContentLoaded", async () => {
  const savedUser = localStorage.getItem("telegram_user");
  const emailUser = localStorage.getItem("email_user");
  
  if (!savedUser && !emailUser) {
    console.log("👤 Користувач не авторизований");
    return;
  }
  
  const user = savedUser ? JSON.parse(savedUser) : JSON.parse(emailUser);
  window.currentUser = user;


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
    const url = (window.APPS_SCRIPT_URL || "").trim();
if (!url) {
  console.warn("⚠️ APPS_SCRIPT_URL не задано — перевірку PRO пропущено");
  return;
}

try {
  const res = await fetch(url + "?user_id=" + encodeURIComponent(user.id), {
    method: "GET",
    headers: { "Accept": "application/json" }
  });

  if (!res.ok) throw new Error("Server returned " + res.status);

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Response is not valid JSON: " + text.slice(0, 100));
  }

  localStorage.setItem("isPro", json.isPro ? "true" : "false");
  localStorage.setItem("pro_last_check", now);
  console.log("🔗 PRO оновлено:", json.isPro);
} catch (err) {
  console.warn("⚠️ Не вдалося перевірити PRO:", err.message);
}

  } catch (err) {
    console.warn("⚠️ Не вдалося перевірити PRO:", err);
  }
});
