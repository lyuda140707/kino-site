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

          // 🟣 Якщо немає кешу — показуємо fallback-сторінку
          return new Response(
            `
              <html lang="uk">
              <head><meta charset="UTF-8"><title>Relax Kino</title></head>
              <body style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;">
                <div>
                  <h2>⏳ Завантаження...</h2>
                  <p>Перевіряємо з’єднання з Relax Kino</p>
                  <p style="font-size:13px;color:#999;">Якщо сторінка не відкривається — онови її пізніше.</p>
                </div>
              </body>
              </html>
            `,
            { headers: { "Content-Type": "text/html; charset=UTF-8" } }
          );
        });
      })
  );
});
