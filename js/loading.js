// Ditambahkan agar loader terhenti dan menghilang ketika data selesai dimuat
function finishLoading() {
    const loading = document.getElementById('loading-container');
    loading.style.display = 'none';
};

function startLoading() {
    const loading = document.getElementById('loading-container');
    loading.style.display = 'flex';
}
   
  // Dimodifikasi agar loader terhenti dan menampilkan pesan gagal ketika mengambil data
function error(error) {
    console.log('Error: ' + error);
   
    const loadFailed = `
      <p class="white-text center-align">
        Gagal memuat data. Periksa koneksi internet lalu coba lagi.
      </p>
    `;
   
    document.getElementById('progress-bar').className = 'determinate';
    document.getElementById('load-failed').innerHTML = loadFailed;
};
   
// Memanggil finishLoading() ketika data klasemen dimuat