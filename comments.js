// === 💬 comments.js ===
(async function() {
  const list = document.getElementById("commentsList");
  const sendBtn = document.getElementById("sendComment");
  const textEl = document.getElementById("commentText");
  const userEl = document.getElementById("username");

  if (!list || !sendBtn) return; // якщо на сторінці немає блоку — просто виходимо

  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("id") || params.get("title") || params.get("name");

  async function loadComments() {
    const { data, error } = await window.supabaseClient
      .from("comments"
      .select("*")
      .eq("film_id", filmId)
      .order("created_at", { ascending: false });

    list.innerHTML = "";
    if (error) {
      console.error("❌ Помилка Supabase:", error);
      list.innerHTML = "<p style='color:#888'>Помилка завантаження коментарів.</p>";
      return;
    }

    if (!data?.length) {
      list.innerHTML = "<p style='color:#777'>Поки немає коментарів.</p>";
      return;
    }

    for (const c of data) {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <strong>${c.username || "Анонім"}</strong>
        <p>${c.text}</p>
        <small>${new Date(c.created_at).toLocaleString("uk-UA")}</small>
      `;
      list.appendChild(div);
    }
  }

  sendBtn.addEventListener("click", async () => {
    const text = textEl.value.trim();
    if (!text) return alert("✏️ Напишіть коментар.");

    const username = userEl.value.trim() || "Анонім";
    sendBtn.disabled = true;
    sendBtn.textContent = "⏳ Надсилається...";

    const { error } = await window.supabaseClient
      .from("comments")
      .insert([{ film_id: filmId, username, text }]);

    sendBtn.disabled = false;
    sendBtn.textContent = "Надіслати";

    if (error) {
      console.error(error);
      alert("❌ Не вдалося зберегти коментар.");
    } else {
      textEl.value = "";
      await loadComments();
      sendBtn.textContent = "✅ Надіслано";
      setTimeout(() => (sendBtn.textContent = "Надіслати"), 1500);
    }
  });

  await loadComments();
})();
