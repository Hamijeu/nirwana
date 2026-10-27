# Audit tampilan Figma — 25 Oktober 2026

Status: pemeriksaan awal halaman utama; belum audit setiap layar/state. Prototype ditunda sesuai arahan pengguna.

## Acuan
Website commit 141ddff2637ecbdeb1e5f590950a8c123f771501. Gunakan logo NAT asli dan lockup Nirwana Management System; desktop1440/mobile390; Light/Dark; komponen native yang sudah ada. Konsisten secara visual, tetapi struktur tiap peran mengikuti kebutuhan web.

## Temuan dari editor langsung
| Area | Frame diperiksa | Temuan | Tindak lanjut |
|---|---|---|---|
| Company |13:2|1440×1710 dengan isi terkumpul di atas dan ruang kosong besar; empat paket rumah; pilihan Bisnis & Custom belum terlihat; susunan hero belum sama dengan web|Samakan header/hero, tab paket, kartu harga, bantuan dan tinggi konten|
| Login |13:89|Form dan pemulihan ada; area merek kiri hanya tulisan Nirwana tanpa logo NAT terlihat|Gunakan lockup logo asli, audit ukuran form dan jarak|
| Client |15:7|Header memiliki logo NAT dan menu; tiga metrik serta layanan/tiket tersedia; launcher Asisten pelaporan belum terlihat pada frame ini|Samakan shell dan launcher dengan web; audit review badge dan kartu|
| Admin |16:15|Sidebar/logo tersedia; dashboard masih susunan metrik/filter/list lama, belum mengikuti grafik dan antrean review web|Catat untuk tahap role operations; gunakan sidebar abu-abu dan header konsisten|
| Officer |17:26|Lockup hanya teks; susunan ringkasan/filter/list lama|Samakan shell dengan Admin dan konten role Officer|
| Teknisi |17:310|Mobile dengan merek teks; tombol berlabel Masuk masih ada pada dashboard; footer lima menu|Ganti merek dengan logo; sesuaikan CTA dan konten dengan web; tambah desktop pada tahap Teknisi|
| Organisasi file |Screens4:2|Dua section Public & Auth dengan banyak frame bernama sama|Tentukan versi sah lewat ID/sumber; jangan hapus massal atau mengubah ID asli|

## Urutan perbaikan visual tahap5
1. Rapikan shared shell Client: header, lockup, theme icon, menu mobile, bottom nav4item.
2. Dashboard dan daftar layanan: metrik, kartu, jarak, tipografi, launcher asisten.
3. Detail layanan dan tiket mobile yang belum lengkap.
4. Form manual/Nira: mode switch konsisten, ringkasan, bantuan, konfirmasi, pesan gagal.
5. Lengkapi pasangan Light/Dark dan periksa teks terpotong/kontras/ruang kosong.
6. Verifikasi semua layar Client dengan checklist; tahap belum selesai sebelum cakupan lengkap.

Tidak ada pengeditan prototype atau source web/push pada audit ini. Pemeriksaan visual ini belum membuktikan seluruh desain sama dengan web.

## Perubahan visual diterapkan setelah audit
- Services Mobile Light481:2101 dan Dark481:2184: menu teks lima item diganti native Navigation/Client Bottom; Active=Layanan, Theme sesuai, X0/Y785,390×59. Frame tetap390×844. Light dimensions dibaca ulang di editor.
- Dashboard Mobile Light15:41 dan Dark491:1417: footer sama, Active=Beranda dan Theme sesuai. Root diubah dari Hug1119 menjadi tinggi844; Main Content panjang tetap dipertahankan. Footer absoluteX0/Y785. Konten bawah memerlukan pemeriksaan lanjutan pada scroll/layout; prototype tidak dikerjakan.
- IDs footer baru703:4104 (Services Light),704:4140 (Services Dark),705:4176 (Dashboard Dark),706:4212 (Dashboard Light). Pergantian varian mereset Ignore auto layout; sudah dikembalikan untuk keempat footer.
- Tidak mengubah koneksi prototype secara sengaja. Instance hasil salin masih membawa koneksi lama; audit tautan ditunda sesuai instruksi terbaru.
- Bukti: services-mobile-light-visual-revised.jpg, services-mobile-dark-visual-revised.jpg, dashboard-mobile-light-visual-revised.jpg.
- Tahap5 belum selesai. Audit awal ini hanya mencakup halaman utama per peran; seluruh state dan responsif masih perlu pemeriksaan.
