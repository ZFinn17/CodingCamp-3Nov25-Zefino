// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) Update waktu setiap detik
  startClock();

  // 2) Prompt welcome (opsional)
  const namePrompt = prompt("Masukkan nama kamu (opsional):");
  if (namePrompt && namePrompt.trim() !== "") {
    const span = document.getElementById("span");
    if (span) span.textContent = namePrompt.trim();
  }

  // 3) Tangkap form dan tangani submit
  const form = document.getElementById("message-form");
  const outputBox = document.getElementById("outputBox");

  if (!form) {
    console.error("Form #message-form tidak ditemukan di DOM!");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil nilai
    const nama = document.getElementById("nama").value.trim();
    const tanggal = document.getElementById("tanggal").value;
    const genderEl = document.querySelector('input[name="gender"]:checked');
    const pesan = document.getElementById("pesan").value.trim();

    // Validasi sederhana
    if (!nama) { alert("Nama harus diisi"); return; }
    if (!tanggal) { alert("Tanggal harus diisi"); return; }
    if (!genderEl) { alert("Pilih jenis kelamin"); return; }
    if (!pesan) { alert("Pesan harus diisi"); return; }

    const gender = genderEl.value;

    // Tampilkan hasil
    const now = new Date();
    const formattedNow = now.toLocaleString(); // atau gunakan custom format

    outputBox.innerHTML = `
      <p><strong>Current time :</strong> <span id="currentTime">${formattedNow}</span></p>
      <p><strong>Nama :</strong> ${escapeHtml(nama)}</p>
      <p><strong>Tanggal Lahir :</strong> ${escapeHtml(tanggal)}</p>
      <p><strong>Jenis Kelamin :</strong> ${escapeHtml(gender)}</p>
      <p><strong>Pesan :</strong> ${escapeHtml(pesan)}</p>
    `;

    // (Opsional) reset form jika ingin
    // form.reset();
  });
});

// Fungsi untuk update clock berkala
function startClock() {
  const el = document.getElementById("currentTime");
  if (!el) return;
  function update() {
    el.textContent = new Date().toLocaleString();
  }
  update();
  setInterval(update, 1000);
}

// Sedikit sanitasi untuk tampilan
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
