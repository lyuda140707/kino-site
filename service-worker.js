const CACHE_NAME = "kino-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/film.html",
  "/style.css",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Інсталяція — кешуємо основні файли
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Активування — видаляємо старий кеш
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// Обробка запитів — кеш first, потім мережа
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (response) => response || fetch(event.request)
    )
  );
});
