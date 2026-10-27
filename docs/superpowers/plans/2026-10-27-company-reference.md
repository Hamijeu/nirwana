# Company Reference Implementation Plan

> **For agentic workers:** Use executing-plans to implement the tasks sequentially in this session.

**Goal:** Menghadirkan pembanding beta referensi di Mode demo dan menyempurnakan halaman utama sesuai lima arahan screenshot.

**Architecture:** Salinan staging disimpan dalam `public/company-reference/` dan ditampilkan melalui `CompanyProfileBeta.jsx`, sehingga CSS dan runtime referensi terisolasi. Halaman utama menggunakan komponen lokal serta data dan callback paket yang sudah ada.

**Tech Stack:** React 19, Vite 6, CSS, Node test runner, Playwright untuk verifikasi browser lokal.

## Global Constraints

- Semua perubahan lokal; tidak push atau deploy.
- Checkpoint utama #010 tetap tersedia; backup batch #011 telah diverifikasi.
- Paket dan fitur lokal tetap dipertahankan.
- Tidak menambahkan klaim voucher hotspot, FAQ, atau kontak resmi tanpa dasar lokal.

### Task 1: Pembanding referensi

Files: `public/company-reference/*`, `src/CompanyProfileBeta.jsx`, `src/main.jsx`, `src/demoPages.js`, `src/demoPages.test.js`.

- [x] Tes pilihan demo mencakup company profile utama dan beta dengan jalur berbeda dan penanda aktif yang tepat.
- [x] Unduh HTML, bundle, font dan aset staging; sesuaikan hanya jalur aset/navigasi agar berfungsi di subfolder lokal/production base.
- [x] Tambahkan beta terisolasi dan pilihan demo. Pertahankan pilihan peran lain serta perilaku sesi Client.
- [x] Uji beta membuka referensi lokal dan perpindahan demo bekerja dua arah.

### Task 2: Adaptasi halaman utama

Files: `src/Landing.jsx`, `src/CompanyServices.jsx`, `src/CompanyFooter.jsx`, `src/company-reference.css`, `src/Pricing.jsx`.

- [x] Tambahkan dua informasi singkat yang diizinkan screenshot 3 dengan aksi portal/konsultasi lokal.
- [x] Ubah tampilan kartu paket tanpa mengganti array paket, harga, fitur atau callback konsultasi.
- [x] Tambahkan footer minimalis yang menggunakan pintasan lokal tersedia.
- [x] Periksa mobile, desktop dan tema gelap; pastikan FAQ dan panel hotspot tidak masuk halaman utama.

### Task 3: Pemeriksaan dan handoff

- [x] Jalankan `node --test src/*.test.js tests/*.test.js` dan `npm run build` dari proyek.
- [x] Bandingkan `src/plans.js` dengan checkpoint utama #010 untuk memastikan katalog tidak berubah.
- [x] Verifikasi browser: 4 kartu rumah, 3 bisnis/custom, tombol konsultasi, perpindahan beta/utama, navigasi beta dan tidak ada overflow horizontal pada mobile.
- [x] Simpan catatan sumber referensi, hasil pencarian dan hasil uji di `docs/audits/2026-10-27-company-reference.md`.
