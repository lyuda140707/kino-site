// supabase-client.js
(function () {
  const SUPABASE_URL = "https://zerlqvbmqszomlondlte.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcmxxdmJtcXN6b21sb25kbHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMzg3NzQsImV4cCI6MjA3MDkxNDc3NH0.8wUBYIeQRC6KVp6vdzv0oqofIf4PeZyzbV5GcD0vxTE";

  if (!window.supabase) {
    console.error("❌ Supabase library не підключена. Постав <script src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'></script> ПЕРЕД supabase-client.js");
    return;
  }

  window.supabaseClient =
    window.supabaseClient || window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log("✅ supabaseClient готовий");
})();
