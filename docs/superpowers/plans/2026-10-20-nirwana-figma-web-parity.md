# Nirwana — Rencana Implementasi Desain Figma

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Eksekusi dilakukan setelah pengguna menyetujui rencana ini.

**Goal:** Menyelaraskan desain Figma editable dengan website Nirwana terbaru, dari publik hingga Teknisi, termasuk revisi, tema, responsivitas, kondisi gagal, dan prototype.

**Architecture:** Website menjadi acuan tampilan dan perilaku; foundations → komponen → shell → layar → state → prototype → pemeriksaan visual. Komponen bersama digunakan melalui instances agar konsisten.

**Tech Stack:** Figma Design, Auto Layout, Components/Variants, Variables, Text Styles, Prototype; React/CSS lokal sebagai referensi. File tujuan: https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana

## Global Constraints

- Tahap sekarang hanya perencanaan. Perubahan canvas menunggu persetujuan pengguna.
- Tetap maksimal 3 page sesuai keputusan pengguna; gunakan Sections. Pertahankan desain yang masih relevan dan arsipkan versi yang diganti secara teratur.
- Desain utama harus berupa layer native yang dapat diedit, bukan screenshot satu halaman sebagai hasil akhir.
- Acuan adalah kode dan tampilan web terkini, bukan screenshot atau dokumen inventaris lama saja. Catat commit acuan saat implementasi dimulai.
- Perbedaan yang membutuhkan perubahan desain web dicatat sebagai usulan terpisah; jangan diam-diam mengubah web selama pekerjaan Figma.
- AI chat, autentikasi, dan gangguan jaringan adalah simulasi prototype. Figma tidak menggantikan backend atau percakapan AI asli.
- Gunakan figma-use, figma-generate-design, figma-generate-library saat implementasi sesuai tugasnya; gunakan verification-before-completion sebelum menyatakan selesai.

## Temuan dan batas bukti per 20 Oktober 2026

- Inventaris lokal mencatat 50 frame awal: Public/Auth 7, Client 13, Admin 14, Officer 10, Teknisi 6. Dokumen itu sendiri menyebut banyak frame masih berupa kerangka dan variasinya belum lengkap.
- Sumber `src/plans.js` memuat 4 paket rumah dan 3 paket bisnis/custom; angka di bawah mengikuti sumber itu.
- Pemeriksaan metadata Figma pada tahap perencanaan hanya mengembalikan page `0:1 — Cover & Foundations`. Ini belum membuktikan page lain hilang. Tahap audit harus memastikan struktur nyata dan akses sebelum melakukan perubahan.
- Jumlah akhir frame ditentukan dari matriks route, ukuran, tema, dan state hasil audit; jumlah frame bukan ukuran kelengkapan.

## Tahap 1 — Audit dan matriks kesesuaian

- [x] Pastikan identitas file, akses baca, page `0:1`, `4:3`, `4:2` dan keberadaan desain lama melalui API read-only. Akses write belum diuji dengan mutasi; diperiksa saat Tahap 2 dimulai.
- [x] Inventaris semua route aktual dari `src/main.jsx` dan halaman terkait, navigasi, modal, tab, keadaan data, dan batas akses setiap peran.
- [x] Bandingkan struktur/konten Figma dengan web dan visual enam layar representatif: perlu revisi, belum ada, atau perlu verifikasi visual detail.
- [x] Buat matriks dengan kolom: peran, route, state, viewport, tema, node Figma, status, selisih, bukti pemeriksaan.
- [x] Rekam referensi web dengan data demo yang sama: enam area pada 1440, 390, 768 dan 320 px. Pemeriksaan ini sampel responsif, bukan sertifikasi semua route/state.
- [x] Catat baseline kode dan keputusan desain agar revisi selama pekerjaan dapat dilacak.

Laporan Tahap 1: [Audit 20 Oktober 2026](../../audits/2026-10-20/README.md). Terverifikasi 3 page, 53 frame layar, 49 pola route; 6 route belum punya frame khusus. Tahap 2 menunggu konfirmasi pengguna.

**Hasil:** Daftar layar dan state terukur; tidak ada asumsi bahwa kerangka lama sudah selesai.

## Tahap 2 — Struktur file dan foundations

- [x] Page 00: Cover, panduan penggunaan, status pekerjaan, warna, tipografi, grid, spacing, radius, shadow, ikon dan aksesibilitas.
- [x] Page 01: Components & Patterns, termasuk contoh penggunaan dan aturan variasi.
- [x] Page 02: Screens & Flows dengan Sections Public & Auth, Client, Admin, Officer, Technician, User Flows, Prototype, Working Area, Archive.
- [x] Atur Sections tanpa saling menimpa. Pisahkan versi aktif dan arsip; pertahankan ID layar lama bila memungkinkan agar tautan tidak rusak.
- [x] Penamaan konsisten: `Role / Screen / State / Viewport / Theme`; nama layer berdasarkan fungsi, bukan Rectangle/Frame acak.
- [x] Gunakan Inter mengikuti web; dokumentasikan hierarchy heading, body, label, caption, ukuran, weight, dan line-height aktual.
- [x] Susun semantic tokens untuk background, surface, text, muted, border, primary, success, warning, danger, focus, dan overlay dalam light/dark.
- [x] Gunakan modes bila tersedia pada paket akun; jika terbatas, gunakan koleksi semantic light/dark terpisah yang konsisten. Tidak mensyaratkan upgrade.
- [x] Ikuti spacing web berbasis 4 px; dokumentasikan radius dan shadow yang benar-benar digunakan.
- [x] Target pemeriksaan: kontras teks biasa 4,5:1, teks besar 3:1, kontrol penting 3:1, label tidak mengandalkan warna saja; fokus terlihat dan error menyebut tindakan pemulihan. Ini target QA, bukan klaim sertifikasi aksesibilitas.
- [x] Evaluasi keterbacaan caption kecil dan area sentuh mobile, target praktis 44×44 px. Jika ukuran visual web lebih kecil, dokumentasikan hit area atau usulan perbaikan tanpa mengubah tampilan acuan sepihak.

## Tahap 3 — Komponen dan pola reusable

Status 20 Oktober 2026: sedang dikerjakan; 16 keluarga komponen inti dan 31 ikon sudah tersimpan, tetapi review menemukan koreksi properties tertunda. Figma MCP mengembalikan limit Starter sebelum koreksi dapat dikirim. Lihat [checkpoint Tahap 3](../../audits/2026-10-20/STAGE-3.md); jangan memulai Tahap 4 dahulu.

- [ ] Brand lockup memakai logo NAT asli, proporsi terjaga, contain tanpa crop, dengan teks Nirwana / MANAGEMENT SYSTEM.
- [ ] Button, Icon Button, Input, Password, Select, Textarea, Checkbox, Search, Tabs, Filter, Pagination dan Upload.
- [ ] Varian relevan: default, hover, focus, pressed/selected, disabled, loading, error, success; jangan membuat kombinasi varian yang tidak digunakan.
- [ ] Badge tiket/prioritas/layanan; Stat Card, Service Card, Pricing Card, Ticket Item, Table, Timeline dan Empty State.
- [ ] Public Header/Footer, Client Header, Ops Sidebar/Topbar, Technician Bottom Navigation, Auth Layout.
- [ ] Theme Toggle, Mode Demo, Notification/Alert, Modal Konfirmasi, Map Placeholder/State, Import Validation, Nira Chat launcher/panel/bubble/quick prompt/typing.
- [ ] Susun Auto Layout dan constraints yang mendukung teks panjang; gunakan instances dan variable bindings, hindari duplikasi komponen tanpa kebutuhan.
- [ ] Dokumentasikan kapan memakai alert inline, notifikasi sementara, banner offline, atau modal konfirmasi. Pesan penting tidak hanya muncul singkat lalu hilang.

## Tahap 4 — Publik dan autentikasi, termasuk seluruh revisi

- [ ] Header publik: logo, Beranda, Paket Internet, Tentang, Bantuan, Masuk Portal dan tombol tema di atas.
- [ ] Masuk Portal tetap menuju Login; akses Client melalui alur login. Login tidak dihapus.
- [ ] Hero singkat dengan satu CTA Lihat paket; hapus deretan label Rumah/Bisnis/Sekolah di bawah CTA sesuai anotasi terakhir.
- [ ] Paket rumah: Home Lite 30 Mbps Rp179.000; Comfort 50 Mbps Rp229.000; Family 100 Mbps Rp299.000; Ultimate 300 Mbps Rp499.000 per bulan.
- [ ] Paket bisnis: Start 100 Mbps Rp649.000; Pro 200 Mbps Rp999.000 per bulan; Custom berdasarkan konsultasi untuk bisnis/sekolah/multi-lokasi.
- [ ] Tampilkan label harga ilustrasi/prototype dan catatan biaya sesuai web; tab Rumah dan Bisnis & Custom berfungsi pada prototype.
- [ ] Pertahankan bagian profil/bantuan singkat dan footer sederhana. Jangan kembalikan testimonial contoh, form kontak besar, kartu manfaat berulang, atau CTA login duplikat yang telah dihapus.
- [ ] Tombol Tanya Paket membuka Nira dengan pertanyaan paket yang sudah disiapkan; pengguna tetap menekan kirim pada simulasi.
- [ ] Login: ganti slogan lama dan teks pendamping dengan logo NAT + Nirwana / MANAGEMENT SYSTEM di tengah panel kiri, tanpa logo kecil ganda; form tetap jelas di kanan.
- [ ] Forgot Password, OTP, New Password, First Login disesuaikan alur aktual; state kosong, terisi, error, loading, berhasil, serta kembali ke login.
- [ ] Sediakan light/dark dan layout desktop/mobile untuk layar dasar Public/Auth.

## Tahap 5 — Client

- [ ] Dashboard, daftar/detail layanan, daftar tiket awal dan setelah submit, buat tiket, berhasil kirim, detail tiket, profil, bantuan.
- [ ] Pertahankan informasi layanan dan tiket yang berbeda; setiap baris/detail mengarah ke data contoh yang sesuai, bukan semua ke detail pertama.
- [ ] Selaraskan header light dengan pemisah jelas: background abu lembut, border dan shadow sesuai web; tema berada di header pada semua layar.
- [ ] Form laporan: pilihan layanan, masalah, keterangan, lampiran, validasi, loading, gagal, coba lagi, berhasil; draft tidak hilang pada kegagalan.
- [ ] Nira di semua halaman Client: bantuan gangguan internet, layanan dan status tiket, bubble user/asisten, quick prompts, typing, close dan tindak lanjut ke layar terkait.
- [ ] Nira berlabel demo; jawaban contoh tidak mengesankan diagnosis atau tiket backend sungguhan.
- [ ] Desktop/mobile dan light/dark untuk seluruh layar dasar; state tambahan melalui varian/overlay atau frame terpisah sesuai kebutuhan.

## Tahap 6 — Admin dan Officer

- [ ] Admin: Dashboard; Pelanggan daftar/tambah/detail; Layanan daftar/tambah/detail; Tiket daftar/detail; Peta Layanan; Stok Voucher; Import/Export; Pengguna & Akses; Pengaturan.
- [ ] Officer: Dashboard; Pelanggan daftar/detail; Layanan daftar/detail; Tiket daftar/detail; Peta; Voucher; Import/Export, mengikuti fitur yang benar-benar tersedia pada web.
- [ ] Gunakan shell bersama; sidebar light lebih tegas dengan abu lembut, teks terbaca, active state biru dan indikator yang jelas.
- [ ] Lengkapi filter, search, tab detail, pagination dan empty/no-results; modal assign, archive, perubahan status akun dan koreksi voucher mengikuti web.
- [ ] Tiket: status, prioritas, penugasan, timeline dan pembatasan transisi; jangan samakan navigasi/hak Officer dengan Admin.
- [ ] Import: upload → error/sukses validasi → preview → konfirmasi → berhasil; sertakan kegagalan baca file dan pemulihan.
- [ ] Map: loading, loaded, gagal + coba lagi, tanpa koordinat; daftar layanan tetap dapat digunakan saat peta gagal.
- [ ] Voucher: stok cukup, permintaan melebihi stok, koreksi dan konfirmasi; pengguna/pengaturan menyertakan kondisi simpan gagal.
- [ ] Lengkapi desktop light/dark, serta penyesuaian tablet/mobile sesuai perilaku route web; tabel memiliki pola overflow atau tampilan kecil yang eksplisit.

## Tahap 7 — Teknisi

- [ ] Dashboard, daftar tiket, detail tiket, peta, voucher dan profil mengikuti web, dengan prioritas mobile.
- [ ] Tampilkan penugasan/claim jika tersedia, update status, catatan progres, unggah bukti, validasi, loading, gagal dan sukses.
- [ ] Bottom navigation konsisten; area konten scroll tidak terpotong atau tertutup navigasi/chat/kontrol demo.
- [ ] Hak perubahan dan informasi pelanggan sesuai peran; jangan menambahkan akses Admin.
- [ ] Lengkapi versi mobile light/dark dan representasi desktop semua route dasar sesuai web.

## Tahap 8 — State peringatan lintas halaman

- [ ] Gagal login; nomor/password kosong atau tidak valid; pesan pemulihan yang jelas.
- [ ] Offline nyata/simulasi, timeout, gagal menyimpan; tombol coba lagi/pemulihan yang sesuai. Tampilan tidak mengklaim sukses ketika operasi gagal.
- [ ] File tidak didukung/lebih dari 5 MB, CSV gagal dibaca dan hasil validasi bermasalah.
- [ ] Transisi tiket tidak valid, tiket arsip, progres kosong, voucher melebihi stok dan konfirmasi tindakan penting.
- [ ] Mode Demo menyediakan skenario Normal, Gagal login berikutnya, Offline, Timeout berikutnya, Gagal simpan berikutnya sesuai implementasi web.
- [ ] Jelaskan skenario sekali jalan dan persisten; pertahankan data/draft pada skenario gagal. Chat lokal tidak berpura-pura membutuhkan jaringan.
- [ ] Gunakan varian komponen dan beberapa layar contoh untuk state berulang; semua kondisi tetap tercatat dalam matriks, tanpa menggandakan setiap kombinasi layar secara berlebihan.

## Tahap 9 — Prototype dan pemeriksaan UI/UX

- [ ] Entry flow terpisah: Public/Auth, Client, Admin, Officer, Teknisi; sediakan daftar tautan agar mudah ditinjau dosen/PM.
- [ ] Hubungkan alur Public → Login → Client, reset password, buat/detail tiket, assignment/progres, import, modal konfirmasi dan pemulihan error.
- [ ] Tema berpindah ke pasangan layar yang sama dan tidak mereset konteks ke dashboard lain.
- [ ] Chat membuka/menutup panel, memilih prompt, menampilkan state terisi, kirim dan contoh balasan. Input bebas/AI real-time di Present bukan janji fitur Figma; gunakan state simulasi yang terdokumentasi.
- [ ] Tidak ada tombol mati tanpa penjelasan, hotspot seluruh frame yang salah, atau aksi destruktif tanpa konfirmasi yang memang ada di web.
- [ ] Periksa hierarchy, alignment, spacing, keterbacaan, focus/error state, panjang teks, overflow, area sentuh dan gangguan dari floating controls pada mobile.

## Tahap 10 — Verifikasi akhir dan handoff

- [ ] Bandingkan screenshot web dan Figma pada viewport, data, tema, scroll dan state yang sama; periksa logo, header/sidebar, typography, spacing, warna, card/table/form dan posisi kontrol.
- [ ] Perbaiki selisih visual dan cek ulang bagian terdampak. Tidak menyatakan identik jika masih ada selisih yang belum diperiksa.
- [ ] Uji prototype dengan klik nyata untuk alur utama seluruh peran, termasuk kembali, batal, sukses dan gagal.
- [ ] Periksa struktur native, penggunaan instances/tokens, clipping, nama layer, Sections overlap, dan link rusak.
- [ ] Perbarui `FIGMA_SCREEN_INVENTORY.md`, `FIGMA_HANDOFF.md`, serta matriks parity dengan node ID, route, state, viewport, tema, status dan catatan keterbatasan.
- [ ] Serahkan link editor dan prototype tiap peran, preview layar representatif, hasil checklist dan daftar selisih yang masih terbuka bila ada.

## Urutan peninjauan selama implementasi

1. Audit + foundations + komponen.
2. Public/Auth + Client, termasuk revisi paling baru.
3. Admin + Officer + Teknisi.
4. State gagal + light/dark + responsivitas + prototype.
5. Perbandingan visual dan handoff akhir.

Setelah rencana disetujui, checkpoint ini menjadi laporan progres, bukan permintaan izin berulang untuk pekerjaan yang sudah tercakup. Perubahan lingkup besar tetap dikonfirmasikan.

## Definisi selesai

Semua route dasar dan state yang disepakati tercatat serta diperiksa; seluruh revisi pengguna terselaraskan; prototype utama setiap peran dapat ditelusuri; komponen native editable dan tema konsisten; tidak ada clipping/overlap/link salah yang diketahui tanpa catatan. Setiap pengecualian teknis dicatat secara spesifik. Penyelesaian dibuktikan melalui matriks dan pemeriksaan visual, bukan hanya jumlah frame.

**Status saat dokumen dibuat:** Rencana untuk persetujuan. Implementasi Figma belum dimulai pada tahap ini.

