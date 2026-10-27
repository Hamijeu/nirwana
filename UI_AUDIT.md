# Audit UI Prototype

## Sudah tersedia di frontend

- Route publik, auth, Client, Admin, Officer, Technician; kontrol Mode demo.
- Form pelanggan/layanan, tiket Client, detail dan perubahan tiket, klaim teknisi, voucher dengan dialog koreksi, import CSV, ekspor contoh, pengguna Admin.
- Filter daftar pelanggan, layanan, tiket; peta ilustrasi dengan daftar layanan dan status gagal.
- Layout desktop dan mobile menggunakan CSS responsive.

## Batas yang masih perlu desain/implementasi

- Figma native belum dapat dinyatakan selesai. File target berisi tiga page, 13 Sections, 23 variables, satu text style, 48 frame layar native, component set Button (2 varian), Badge / Ticket (6), Badge / Priority (4), Input (4), serta tiga komponen pola. Cover, swatch fondasi, dan delapan alur teks sudah ditambahkan. Koneksi prototype inti kini dipasang pada tombol, tautan, panel, atau baris yang sesuai untuk alur Auth, Client, Admin, Officer, dan Technician; alur tersebut diuji di Present. Alur Client Create Ticket → Ticket Submitted #016 → Tickets beserta tautan #016/#014 dan tombol Buat laporan diuji di Present. Daftar Client kini memiliki frame state awal (#014/#013; Aktif 2, Selesai 0) dan sesudah kirim (#016/#014/#013; Aktif 3, Selesai 0). Form native yang lengkap, tautan navigasi lainnya, overlay, variant states lanjutan, responsivitas lintas frame, dan pemakaian ulang komponen pada seluruh layar belum lengkap. Swatch baru belum terikat ke variables. Integrasi MCP mencapai batas panggilan paket Starter. Audit selisih terhadap web ada di `FIGMA_WEB_PARITY.md`.
- Mock state hilang setelah refresh; auth dan izin belum ditegakkan server.
- Peta tidak memakai koordinat geografis nyata; state loading dan peta gagal tersedia sebagai simulasi.
- Dashboard chart dan aktivitas masih ilustratif. Filter mengubah metrik/tabel contoh, tetapi grafik belum dihitung dari dataset penuh.
- Upload foto hanya pemilih file; preview/penyimpanan lampiran belum tersedia.
- Form edit pelanggan/layanan tersedia; pagination dan set komponen lengkap untuk semua state masih perlu pendalaman.
- Landing memuat alur pelaporan dan contoh narasi testimonial yang jelas ditandai sebagai placeholder. Copy resmi dan testimoni asli perlu persetujuan sebelum publikasi.

## Pemeriksaan

Perintah: `npm ci`, `npm run build`, `node --test src/domain.test.js`. Alur manual dan hasil aktual dicatat pada laporan akhir kerja, bukan diasumsikan dari keberadaan kode.
