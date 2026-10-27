# Nirwana Management System

Prototype frontend interaktif untuk PT Nirwana Akses Teknologi. Semua data pelanggan, alamat, tiket, dan aktivitas adalah fiktif. Belum ada backend, autentikasi nyata, pengiriman OTP, atau peta produksi.

## Stack dan setup

React 19, Vite 6, JavaScript, CSS, Lucide React. Package manager: npm (`package-lock.json`).

```bash
npm ci
npm run dev
npm run build
node --test src/*.test.js
```

Vite biasanya menampilkan `http://127.0.0.1:5173/`. Route lokal memakai History API.

## Demo online

GitHub Pages memakai repository yang sama: [https://hamijeu.github.io/nirwana/](https://hamijeu.github.io/nirwana/). Workflow `.github/workflows/deploy.yml` membangun dan menerbitkan `dist` setiap kali `main` diperbarui. Pada GitHub Pages, route memakai fragment URL seperti `https://hamijeu.github.io/nirwana/#/client/dashboard` agar tautan langsung dan refresh tetap membuka layar yang benar. Data tetap berupa simulasi lokal di browser.

## Mode demo

Kontrol **Mode demo** di kanan bawah membuka Website Publik, Client, Admin, Officer, dan Teknisi. Form login menerima kredensial contoh dan membuka Client. Aksi yang relevan mengubah state selama tab terbuka; refresh mengembalikan data awal. Form kontak dan OTP hanya simulasi.

## Route

| Area | Route |
|---|---|
| Publik | `/` |
| Auth | `/login`, `/forgot-password`, `/reset-password`, `/first-login` |
| Client | `/client/dashboard`, `/client/services`, `/client/services/:id`, `/client/tickets`, `/client/tickets/create`, `/client/tickets/:id`, `/client/profile`, `/client/help` |
| Admin | `/admin/dashboard`, `/admin/customers`, `/admin/customers/new`, `/admin/customers/:id`, `/admin/customers/:id/edit`, `/admin/services`, `/admin/services/new`, `/admin/services/:id`, `/admin/services/:id/edit`, `/admin/tickets`, `/admin/tickets/:id`, `/admin/map`, `/admin/vouchers`, `/admin/data`, `/admin/users`, `/admin/settings` |
| Officer | Sama dengan area operasional Admin, tanpa `/users` dan `/settings` |
| Technician | `/technician/dashboard`, `/technician/tickets`, `/technician/tickets/:id`, `/technician/map`, `/technician/vouchers`, `/technician/profile` |

## Struktur dan design system

- `src/main.jsx`: shell, routing, dashboard, detail, dan interaksi utama.
- `src/ExtraPages.jsx`: auth tambahan dan formulir pelanggan/layanan.
- `src/UsersPage.jsx`, `src/VoucherPage.jsx`, `src/ImportExport.jsx`: modul operasional.
- `src/SettingsPage.jsx`: pengaturan informasi perusahaan dan kontak demo.
- `src/domain.js`: aturan status tiket, izin voucher, validasi CSV; `src/domain.test.js`: tes aturan.
- `src/data.js`: data demo fiktif.
- `src/Landing.jsx`, `src/landing.css`: website publik.
- `src/style.css`: token CSS, komponen bersama, dan layout responsif.

Warna dasar: biru `#2563EB`, sukses `#16A34A`, peringatan `#F59E0B`, bahaya `#DC2626`, latar `#F8FAFC`, teks `#0F172A`. Desain native di [Figma Nirwana](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=13-2) berisi 46 frame editable pada tiga page dan 13 Sections. Detail status dan sisa pekerjaan ada di [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md).

## Batas dan asumsi

Prototype tidak menyimpan data setelah refresh. CSV diimpor sebagai simulasi validasi dan preview; tombol ekspor menghasilkan CSV demo. Peta adalah ilustrasi, bukan geolokasi. Kategori masalah, prioritas, KPI, dan copy website memerlukan konfirmasi. Lihat [ASSUMPTIONS.md](ASSUMPTIONS.md) dan [UI_AUDIT.md](UI_AUDIT.md).

## Revisi lokal 26 Oktober 2026

Kategori laporan Client bersifat opsional; Nira simulasi menawarkan kategori untuk dikonfirmasi. Admin/Officer dapat memeriksa kategori dengan jejak audit. Petugas membuat laporan pelanggan dengan prioritas; layanan Aktif diterbitkan New/Tidak Wajib, sedangkan Nonaktif diperiksa sebelum penerbitan.

Menu Arsip Tiket (`/admin/archives`) khusus Admin dan seluruh arsip baca saja. Informasi waktu memakai timestamp yang benar-benar tercatat; data lama tanpa timestamp ditampilkan Belum tersedia. Peta tetap ilustrasi, dengan filter dan daftar lokasi tanpa koordinat.

Ledger voucher disimpan di state aplikasi selama tab terbuka: jenis, saldo unit, mutasi dan koreksi tertaut. Teknisi dapat mencatat mutasi; pengelolaan jenis/koreksi khusus Admin/Officer. Perpindahan halaman/peran mempertahankan state; refresh mengembalikan fixture demo. Login, OTP, dan perubahan akun tetap simulasi lokal.

## Company profile 27 Oktober 2026

Mode demo menyediakan **Company Profile** (`/`) dan **Company Profile Beta Page** (`/company-profile-beta`). Beta menampilkan salinan staging untuk pembanding. Halaman utama mengambil gaya kartu paket dan footer referensi, dengan katalog serta aksi konsultasi lokal tetap dipertahankan. Detail sumber, batas salinan, dan hasil verifikasi: [audit company profile](docs/audits/2026-10-27-company-reference.md). Checkpoint utama tetap rollback #010; backup batch #011.

Halaman utama juga menyediakan timeline berlangganan dan konsultasi alamat yang diteruskan ke **Tentang Kami**. Galeri teknisi tetap menjadi pembuka Tentang Kami, diikuti profil, ilustrasi jaringan, portal, formulir konsultasi dan peta kantor. Informasi kontak beta telah dikonfirmasi pengguna; tombol WhatsApp menyiapkan draf dan pengguna mengirimnya sendiri. Statistik, logo pelanggan institusi dan cakupan otomatis belum ditambahkan. Lihat [audit penataan konten](docs/audits/2026-10-27-company-about-content.md); backup sebelum batch ini #016.

Pembaruan berikutnya mengganti formulir alamat di halaman utama dengan peta pin dari beta: lokasi kantor, pengenalan kecamatan, geolocation dan tautan WhatsApp. Ketersediaan pemasangan akhir dikonfirmasi tim Nirwana. Label ilustrasi/prototype pada main/About dihapus sesuai permintaan pengguna, sementara atribusi peta tetap ada. Sumber pin dan hasil uji: [audit peta publik](docs/audits/2026-10-27-public-coverage.md). Backup sebelum perubahan #018.

Bukti dan cakupan: [audit revisi](docs/audits/2026-10-26-document-revisions.md). Snapshot sebelum revisi: rollback #009 pada folder saudara `nirwana-rollbacks`.
