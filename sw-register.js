if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("✅ Service Worker зареєстровано"))
      .catch((err) => console.log("❌ Помилка SW:", err));
  });
}
