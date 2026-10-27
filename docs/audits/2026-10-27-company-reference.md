# Company profile: referensi dan adaptasi lokal

Tanggal: 27 Oktober 2026, Asia/Jakarta.

## Hasil

- `/`: halaman utama, dengan hero dan fitur paket lokal; tampilan paket diadaptasi dari screenshot 4.
- `/company-profile-beta`: **Company Profile Beta Page**, dipilih dari Mode demo. Memuat salinan referensi dalam iframe terisolasi; pilihan Company Profile kembali ke halaman utama.
- Halaman utama tidak memuat FAQ screenshot 1 maupun panel hotspot screenshot 2. Informasi penanganan gangguan dan website/sistem screenshot 3 diringkas menjadi dua kartu. Footer screenshot 5 diadaptasi menjadi identitas perusahaan dan tiga pintasan lokal.
- Seluruh 4 paket rumah dan 3 paket bisnis/custom, harga ilustrasi, daftar fitur serta aksi konsultasi lokal tetap dipertahankan. `src/plans.js` identik byte per byte dengan checkpoint utama #010.

## Dasar informasi screenshot 2

Pemeriksaan sumber lokal: `src/data.js`, `src/voucherLedger.js`, `src/VoucherPage.jsx`, `ROLES_AND_PERMISSIONS.md`, `ASSUMPTIONS.md`, README dan dokumen/audit proyek. Ada layanan per pelanggan dan ledger jenis/saldo/mutasi voucher. Tidak ditemukan dasar lokal yang mengonfirmasi penawaran hotspot konsumen dengan kode akses dan masa aktif satu hari seperti screenshot. Pengelolaan stok tidak dianggap bukti penawaran tersebut. Panel itu tidak dimasukkan ke halaman utama; tetap terdapat dalam beta karena beta adalah pembanding referensi.

## Salinan referensi

Sumber: https://company-staging.nirwana.id/ . Alat web tidak dapat membacanya, tetapi pengunduhan langsung HTTP berhasil. Repository https://github.com/nirwana-system/nat-company-profile belum dapat diverifikasi; tidak diklaim bahwa kode lokal berasal dari checkout repository tersebut.

`public/company-reference/snapshot.json` mencatat waktu capture, 33 URL sumber, hash SHA256 sumber dan hash hasil lokal. Disimpan: halaman beranda, tiga halaman layanan, dua halaman legal, bundle, font, gambar dan video yang dirujuk.

Penyesuaian khusus lokal: base URL aset dan halaman internal, normalisasi pathname subfolder, jalur lazy-load peta, penonaktifan analitik Cloudflare dan transisi lintas dokumen di iframe. Referensi tetap membawa teks, penawaran dan tautan eksternalnya sendiri; tidak dijadikan data paket utama. Peta/layanan pihak ketiga masih memerlukan jaringan. Salinan ini bukan jaminan dapat berfungsi seluruhnya tanpa internet.

## Backup dan lingkup

- Checkpoint utama: `../nirwana-rollbacks/rollback-010.zip`.
- Sebelum batch ini: `../nirwana-rollbacks/rollback-011.zip`, 340 file terverifikasi SHA256 per file, tercatat dalam INDEX.md.
- Kode yang diubah batch ini: `src/main.jsx`, `src/Landing.jsx`, `src/Pricing.jsx`; komponen beta, layanan, footer, CSS dan konfigurasi/tes pilihan demo ditambahkan.
- Modul portal, autentikasi, tiket, voucher dan data operasional tidak diedit dalam batch ini. Perubahan lama yang sudah ada di working tree dipertahankan.
- Tidak ada push atau deployment.

## Verifikasi

- `node --test src/*.test.js tests/*.test.js`: 54 tes lulus, 0 gagal.
- `npm run build`: berhasil; Vite menghasilkan build production dengan base `/nirwana/`.
- `node ../output/verify_company.cjs`: berhasil pada dev `http://127.0.0.1:5173/` dan build preview `http://127.0.0.1:4173/nirwana/`.
- Pemeriksaan browser: perpindahan beta/utama, pemuatan aset beta termasuk lazy-load peta, tautan halaman layanan internal, 4/3 paket, modal paket biasa/custom, informasi layanan yang diizinkan, tidak ada FAQ/hotspot pada halaman utama, overflow desktop/mobile 390 dan 320, menu demo mobile, tema gelap, tanpa page error atau respons aset lokal 4xx/5xx.
- Bukti visual diperiksa: `../output/company-reference-verification/company-desktop.png`, `company-mobile-390.png`, `company-mobile-dark.png`, dan `../output/company-beta-service.png`.
- `python ../output/verify_company_snapshot.py`: memeriksa hash setiap file salinan referensi, kesamaan katalog dengan #010 dan ketiadaan penghapusan file baseline #011.
- Review kode independen menemukan import helper scroll pada CTA hero yang hilang. Tes browser mereproduksi perubahan hash yang tidak diinginkan; import dipulihkan dan tes diperluas untuk memastikan CTA tidak melempar error serta mempertahankan route pada dev dan build.

Server untuk peninjauan pengguna: `http://127.0.0.1:5173/`.
