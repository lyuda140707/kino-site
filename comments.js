// === 💬 comments.js (safe version, no template literals) ===
(function () {
  const list = document.getElementById("commentsList");
  const sendBtn = document.getElementById("sendComment");
  const textEl = document.getElementById("commentText");
  const userEl = document.getElementById("username");

  if (!list || !sendBtn) return;

  if (!window.supabaseClient) {
    console.error("❌ supabaseClient не ініціалізований. Перевір порядок підключення скриптів.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("id") || params.get("title") || params.get("name");

  async function loadComments() {
    try {
      const res = await window.supabaseClient
        .from("comments")
        .select("*")
        .eq("film_id", filmId)
        .order("created_at", { ascending: false });

      const data = res.data;
      const error = res.error;

      list.innerHTML = "";

      if (error) {
        console.error("❌ Помилка Supabase:", error);
        list.innerHTML = "<p style='color:#888'>Помилка завантаження коментарів.</p>";
        return;
      }

      if (!data || !data.length) {
        list.innerHTML = "<p style='color:#777'>Поки немає коментарів.</p>";
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const c = data[i];

        const div = document.createElement("div");
        div.className = "comment";

        const strong = document.createElement("strong");
        strong.textContent = c.username || "Анонім";

        const p = document.createElement("p");
        p.textContent = c.text || "";

        const small = document.createElement("small");
        const d = c.created_at ? new Date(c.created_at) : new Date();
        small.textContent = d.toLocaleString("uk-UA");

        div.appendChild(strong);
        div.appendChild(p);
        div.appendChild(small);

        list.appendChild(div);
      }
    } catch (e) {
      console.error("❌ loadComments exception:", e);
      list.innerHTML = "<p style='color:#888'>Помилка завантаження коментарів.</p>";
    }
  }

  sendBtn.addEventListener("click", async function () {
    const text = (textEl.value || "").trim();
    if (!text) return alert("✏️ Напишіть коментар.");

    const username = (userEl && userEl.value ? userEl.value : "").trim() || "Анонім";

    sendBtn.disabled = true;
    const oldText = sendBtn.textContent;
    sendBtn.textContent = "⏳ Надсилається...";

    try {
      const res = await window.supabaseClient
        .from("comments")
        .insert([{ film_id: filmId, username: username, text: text }]);

      if (res.error) {
        console.error(res.error);
        alert("❌ Не вдалося зберегти коментар.");
      } else {
        textEl.value = "";
        await loadComments();
        sendBtn.textContent = "✅ Надіслано";
        setTimeout(function () {
          sendBtn.textContent = oldText || "Надіслати";
        }, 1500);
      }
    } catch (e) {
      console.error("❌ insert exception:", e);
      alert("❌ Не вдалося зберегти коментар.");
    } finally {
      sendBtn.disabled = false;
      if (sendBtn.textContent === "⏳ Надсилається...") {
        sendBtn.textContent = oldText || "Надіслати";
      }
    }
  });

  loadComments();
})();
