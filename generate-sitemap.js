import fs from "fs";
import fetch from "node-fetch";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const PAGE_SIZE = 1000;
let allFilms = [];
let from = 0;
let to = PAGE_SIZE - 1;

console.log("📡 Завантажуємо фільми з Supabase...");

while (true) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/films?select=id,title&order=id.asc`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Range: `${from}-${to}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Помилка запиту:", res.status, await res.text());
    break;
  }

  const data = await res.json();
  if (!data.length) break;

  allFilms = allFilms.concat(data);
  from += PAGE_SIZE;
  to += PAGE_SIZE;
}

console.log(`✅ Отримано ${allFilms.length} фільмів`);

let urls = allFilms.map(
  (film) => `
  <url>
    <loc>https://kino-site.top/film.html?id=${film.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
);

const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
const sitemapBody = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kino-site.top/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls.join("\n")}
</urlset>`;

const sitemap = sitemapHeader + sitemapBody.trim();

fs.writeFileSync("sitemap.xml", sitemap, "utf8");
console.log("🗺️ Sitemap оновлено успішно!");
