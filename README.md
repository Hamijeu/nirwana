# Nirwana Management System

Prototype frontend interaktif untuk PT Nirwana Akses Teknologi. Semua data pelanggan, alamat, tiket, dan aktivitas adalah fiktif. Belum ada backend, autentikasi nyata, pengiriman OTP, atau peta produksi.

## Stack dan setup

React 19, Vite 6, JavaScript, CSS, Lucide React. Package manager: npm (`package-lock.json`).

```bash
npm ci
npm run dev
npm run build
node --test src/domain.test.js
```

Vite biasanya menampilkan `http://127.0.0.1:5173/`. Route memakai History API.

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
