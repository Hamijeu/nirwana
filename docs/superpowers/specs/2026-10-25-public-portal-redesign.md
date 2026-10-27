# Usulan revisi Company Profile dan Portal Layanan

Status: usulan desain untuk persetujuan; kode aplikasi belum diubah.

## Tujuan dan batas
Revisi dua halaman lokal, `/` dan `/portal`, dengan identitas NAT/Nirwana yang ada. Halaman ringkas, jelas, responsif, tersedia terang/gelap. Figma dan halaman setelah login tidak termasuk perubahan ini. Git push hanya setelah pemeriksaan pengguna dan instruksi berikutnya. Harga tetap ilustrasi, kontak resmi tidak direkayasa, AI hanya dalam Client yang sudah login.

## Referensi
- https://github.com/voltagent/awesome-design-md
- https://getdesign.md/vodafone/design-md — struktur informasi telekomunikasi, kontras antarbagian, hierarki paket.
- https://getdesign.md/bmw/design-md — navy, biru untuk aksi, grid tegas, permukaan netral.
- https://getdesign.md/apple/design-md — ruang putih, judul singkat, fokus pada satu pesan utama.

Referensi adalah analisis independen; gunakan pola visual, bukan logo, aset, font proprietary, atau klaim brand tersebut.

## Pilihan arah
1. Rekomendasi: minimal premium. Apple untuk kepadatan/ruang, BMW untuk navy/biru, Vodafone untuk paket. Paling sesuai dengan permintaan sebelumnya agar halaman tidak ramai.
2. Telecom editorial: judul lebih besar dan pita warna lebih dominan. Identitas kuat tetapi halaman terasa lebih ramai.
3. Monokrom premium: mayoritas hitam/putih dengan biru terbatas. Sangat tenang tetapi paket dan akses portal kurang menonjol.

## Desain yang direkomendasikan
### Company Profile
1. Header kompak: logo asli, Paket Internet, Tentang, Bantuan, tautan Portal Layanan, kontrol tema, menu mobile.
2. Hero editorial dua kolom pada desktop: pesan singkat “Koneksi yang membawa Anda lebih jauh.”, deskripsi satu paragraf, aksi utama Lihat paket. Kolom visual berupa komposisi konektivitas sederhana yang tidak menyiratkan statistik jaringan nyata. Pada mobile menjadi satu kolom, tanpa dekorasi dominan.
3. Paket sebagai fokus berikutnya. Pertahankan tab Rumah dan Bisnis & Custom, empat paket rumah dan tiga bisnis yang ada. Harga serta kecepatan mudah dibandingkan, satu paket rekomendasi, fitur maksimum tiga baris per kartu. Label harga ilustrasi tetap dekat harga. Custom mencakup sekolah dan bisnis.
4. Tentang dan bantuan digabung menjadi satu bagian pendek. Kontak belum tersedia tampil sebagai informasi, bukan formulir palsu. Footer ringkas.

### Portal Layanan
1. Header satu keluarga dengan company page; tautan kembali Company Profile dan tema. Hindari pengulangan tombol Masuk di header dan hero.
2. Hero dua kolom yang lebih fungsional: penjelasan portal di kiri, panel akses di kanan. Panel memiliki satu aksi utama Masuk ke akun dan tautan sekunder Aktifkan akun. Tidak memindahkan atau menghapus halaman login.
3. Tiga langkah ringkas: Masuk, Buat laporan, Pantau penanganan. Gunakan satu baris pada desktop dan tumpukan pada mobile, tanpa tiga kartu besar yang berulang.
4. Bantuan akses akun singkat dan footer. Pemulihan tetap pada login. Tampilan gagal memuat dan Coba Lagi dipertahankan dengan gaya baru.

## Sistem visual
Warna aksi tetap biru Nirwana; navy dipakai terarah pada area aksen, bukan semua bagian. Light memakai putih dan abu-abu netral dengan teks gelap. Dark memakai navy/charcoal, teks terang dan batas yang terlihat. Gunakan font proyek yang sudah ada, judul responsif sekitar40–64px desktop dan32–40px mobile, body14–16px. Grid konsisten, jarak berbasis8px, tombol minimal44px, sudut kartu12–16px, bayangan tipis. Fokus keyboard terlihat dan animasi menghormati reduced motion.

## Implementasi dan verifikasi setelah persetujuan
Batasi CSS baru ke halaman publik/portal, khususnya karena pm-revisions.css juga digunakan halaman internal. Pertahankan data plans.js dan perilaku dialog konsultasi simulasi. Periksa tab paket, menu mobile, tema, navigasi portal/login/aktivasi, gagal muat/coba lagi; jalankan build dan inspeksi visual desktop/mobile pada kedua tema. Tidak menambah dependensi hanya untuk tampilan ini.
