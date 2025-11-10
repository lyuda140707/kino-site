import fs from "fs";
import fetch from "node-fetch";

// 🔹 Підключення до Supabase
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

// 🔹 Основна функція
async function generateSitemap() {
  console.log("📡 Завантажуємо фільми з Supabase...");
  const response = await fetch(`${SUPABASE_URL}/rest/v1/films?select=id`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  const films = await response.json();
  console.log(`✅ Отримано ${films.length} фільмів`);

  // 🔹 Формуємо XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Головні сторінки
  const staticPages = [
    "",
    "search.html",
    "category.html",
    "collections.html",
    "collection.html",
    "new.html",
    "film.html",
    "series.html",
    "multseries.html",
    "profile.html",
    "bookmarks.html",
  ];

  staticPages.forEach((page) => {
    xml += `  <url><loc>https://kino-site.pages.dev/${page}</loc></url>\n`;
  });

  // Додаємо всі фільми
  films.forEach((film) => {
    xml += `  <url><loc>https://kino-site.pages.dev/film.html?id=${film.id}</loc></url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync("sitemap.xml", xml);
  console.log("🗺️  Sitemap оновлено успішно!");
}

generateSitemap();
