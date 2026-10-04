# Audit UI Prototype

## Sudah tersedia di frontend

- Route publik, auth, Client, Admin, Officer, Technician; kontrol Mode demo.
- Form pelanggan/layanan, tiket Client, detail dan perubahan tiket, klaim teknisi, voucher dengan dialog koreksi, import CSV, ekspor contoh, pengguna Admin.
- Filter daftar pelanggan, layanan, tiket; peta ilustrasi dengan daftar layanan dan status gagal.
- Layout desktop dan mobile menggunakan CSS responsive.

## Batas yang masih perlu desain/implementasi

- Figma native belum dapat dinyatakan selesai. File target sudah diperiksa dan tiga page kosong dibuat, tetapi paket Starter membatasi tiga page per file; integrasi native juga belum tersambung.
- Mock state hilang setelah refresh; auth dan izin belum ditegakkan server.
- Peta tidak memakai koordinat geografis nyata; state loading dan peta gagal masih perlu penajaman visual.
- Dashboard chart dan aktivitas masih ilustratif. Filter mengubah metrik/tabel contoh, tetapi grafik belum dihitung dari dataset penuh.
- Upload foto hanya pemilih file; preview/penyimpanan lampiran belum tersedia.
- Form edit pelanggan/layanan, pagination, dan set komponen lengkap untuk semua state masih perlu pendalaman.
- Landing sengaja ringkas sesuai arahan sebelumnya; testimonial dan cara melapor dapat ditambahkan setelah copy resmi disetujui.

## Pemeriksaan

Perintah: `npm ci`, `npm run build`, `node --test src/domain.test.js`. Alur manual dan hasil aktual dicatat pada laporan akhir kerja, bukan diasumsikan dari keberadaan kode.
