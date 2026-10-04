# Audit UI Prototype

## Sudah tersedia di frontend

- Route publik, auth, Client, Admin, Officer, Technician; kontrol Mode demo.
- Form pelanggan/layanan, tiket Client, detail dan perubahan tiket, klaim teknisi, voucher dengan dialog koreksi, import CSV, ekspor contoh, pengguna Admin.
- Filter daftar pelanggan, layanan, tiket; peta ilustrasi dengan daftar layanan dan status gagal.
- Layout desktop dan mobile menggunakan CSS responsive.

## Batas yang masih perlu desain/implementasi

- Figma native belum dapat dinyatakan selesai. File target berisi tiga page, 13 Sections, 23 variables, satu text style, dan komponen Button dua variant. Layar per role serta prototype links masih perlu dibuat. Konektor Figma saat ini memiliki seat View sehingga operasi edit via API ditolak.
- Mock state hilang setelah refresh; auth dan izin belum ditegakkan server.
- Peta tidak memakai koordinat geografis nyata; state loading dan peta gagal tersedia sebagai simulasi.
- Dashboard chart dan aktivitas masih ilustratif. Filter mengubah metrik/tabel contoh, tetapi grafik belum dihitung dari dataset penuh.
- Upload foto hanya pemilih file; preview/penyimpanan lampiran belum tersedia.
- Form edit pelanggan/layanan tersedia; pagination dan set komponen lengkap untuk semua state masih perlu pendalaman.
- Landing memuat alur pelaporan dan contoh narasi testimonial yang jelas ditandai sebagai placeholder. Copy resmi dan testimoni asli perlu persetujuan sebelum publikasi.

## Pemeriksaan

Perintah: `npm ci`, `npm run build`, `node --test src/domain.test.js`. Alur manual dan hasil aktual dicatat pada laporan akhir kerja, bukan diasumsikan dari keberadaan kode.
