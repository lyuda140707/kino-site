// === 🌐 УНІВЕРСАЛЬНИЙ SEO-МОДУЛЬ ===
// Викликається після того, як DOM повністю завантажився
document.addEventListener("DOMContentLoaded", () => {
  let titleText = "";
  let descText = "";
  let posterUrl = "";
  let imdb = "";
  let genre = "";
  let year = "";
  let director = "";
  let cast = "";

  // 🧩 Визначаємо сторінку
  const url = window.location.pathname;

  // --- ГОЛОВНА ---
  if (url.includes("index")) {
    titleText = "KinoSite — Онлайн кінотеатр українською";
    descText =
      "Дивись онлайн фільми, серіали, мультфільми та новинки українською без реклами. KinoSite — твій кінотеатр без меж.";
    posterUrl = "https://kino-site.pages.dev/icon-512.png";
  }

  // --- ФІЛЬМ ---
  else if (url.includes("film")) {
    const el = document.getElementById("filmTitle");
    titleText = el?.textContent?.trim() || "Фільм — KinoSite";
    descText =
      document.getElementById("filmDesc")?.textContent?.slice(0, 160) ||
      `Дивись онлайн фільм ${titleText} українською без реклами.`;
    posterUrl = document.getElementById("filmPoster")?.src;
    genre = document.getElementById("filmGenre")?.textContent;
    year = document.getElementById("filmYear")?.textContent;
    director = document.getElementById("filmDirector")?.textContent;
    cast = document.getElementById("filmCast")?.textContent;
    imdb = document.getElementById("filmImdb")?.textContent;
  }

  // --- СЕРІАЛ ---
  else if (url.includes("series")) {
    titleText = document.getElementById("seriesTitle")?.textContent?.trim();
    descText =
      document.getElementById("seriesDesc")?.textContent?.slice(0, 160) ||
      `Дивись онлайн серіал ${titleText} українською.`;
    posterUrl = document.getElementById("seriesPoster")?.src;
    genre = document.getElementById("seriesGenre")?.textContent;
    year = document.getElementById("seriesYear")?.textContent;
    imdb = document.getElementById("seriesImdb")?.textContent;
  }

  // --- МУЛЬТСЕРІАЛ ---
  else if (url.includes("multseries")) {
    titleText = document.getElementById("seriesTitle")?.textContent?.trim();
    descText =
      document.getElementById("seriesDesc")?.textContent?.slice(0, 160) ||
      `Дивись онлайн мультсеріал ${titleText} українською.`;
    posterUrl = document.getElementById("seriesPoster")?.src;
    genre = document.getElementById("seriesGenre")?.textContent;
    year = document.getElementById("seriesYear")?.textContent;
    imdb = document.getElementById("seriesImdb")?.textContent;
  }

  // --- КАТЕГОРІЯ ---
  else if (url.includes("category")) {
    titleText =
      document.getElementById("pageTitle")?.textContent || "Категорія — KinoSite";
    descText =
      "Добірка фільмів, серіалів і мультфільмів українською мовою онлайн.";
    posterUrl = "https://kino-site.pages.dev/icon-512.png";
  }

  // --- ЗБІРКА ---
  else if (url.includes("collection")) {
    titleText =
      document.getElementById("collectionTitle")?.textContent || "Збірка фільмів — KinoSite";
    descText =
      `Переглянь тематичну збірку фільмів: ${titleText}. Дивись українською без реклами.`;
    posterUrl = "https://kino-site.pages.dev/icon-512.png";
  }

  // --- УСІ ЗБІРКИ ---
  else if (url.includes("collections")) {
    titleText = "Збірки фільмів — KinoSite";
    descText =
      "Оглянь усі добірки фільмів за жанрами, тематикою та настроєм. Дивись онлайн безкоштовно українською.";
    posterUrl = "https://kino-site.pages.dev/icon-512.png";
  }

  // --- META-теги ---
  if (titleText) {
    document.title = titleText;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = descText;

    const ogTags = [
      ["og:title", titleText],
      ["og:description", descText],
      ["og:image", posterUrl],
    ];
    ogTags.forEach(([p, c]) => {
      let t = document.querySelector(`meta[property="${p}"]`);
      if (!t) {
        t = document.createElement("meta");
        t.setAttribute("property", p);
        document.head.appendChild(t);
      }
      t.content = c;
    });

    // --- JSON-LD Schema.org ---
    const schema = {
      "@context": "https://schema.org",
      "@type": "Movie",
      "name": titleText,
      "description": descText,
      "image": posterUrl,
      "genre": genre,
      "datePublished": year,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": imdb || "7.0",
        "bestRating": "10",
        "ratingCount": "1000",
      },
      "director": { "@type": "Person", "name": director || "" },
      "actor": (cast || "")
        .split(",")
        .map((n) => ({ "@type": "Person", "name": n.trim() })),
    };

    let ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(schema, null, 2);
    console.log("🎬 SEO оновлено:", titleText);
  }
});
