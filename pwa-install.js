let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installPwaBtn");
  if (btn) btn.style.display = "inline-flex";
});

async function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  console.log("Результат встановлення:", result.outcome);
  deferredPrompt = null;
  const btn = document.getElementById("installPwaBtn");
  if (btn) btn.style.display = "none";
}

window.installPWA = installPWA;
