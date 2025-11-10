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

self.addEventListener("fetch", (event) => {

  const url = new URL(event.request.url);

  // 🚫 Не кешуємо sitemap.xml
  if (url.pathname.endsWith("/sitemap.xml")) {
    return fetch(event.request);
  }

  // 🟢 Основне кешування
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open("kino-cache-v1").then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;

          // 🟣 Якщо немає кешу — fallback-сторінка
          return new Response(
            `<h1 style="text-align:center;margin-top:50px;">🔌 Немає інтернету</h1>`,
            { headers: { "Content-Type": "text/html" } }
          );
        });
      })
  );
});
