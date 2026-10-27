# Audit Tahap 1 — Web dan Figma Nirwana
Tanggal: 20 Oktober 2026. Status: audit struktur, konten dan cakupan selesai; implementasi desain belum dilakukan.
Baseline kode: `4118faa66ef11f80450e8f2b8c40c19bdcb6ef56`.
Sumber web: http://127.0.0.1:5173/ . File Figma: https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana

## Metode dan batas pemeriksaan

- Membaca source routing, komponen tema, pricing, chat, peringatan, aturan domain serta dokumen implementasi.
- Membaca ketiga page Figma melalui API: Sections, 53 frame layar, teks, instances, Auto Layout, komponen, styles dan collections. Semua pemanggilan Figma bersifat read-only.
- Membuka 49 pola route dasar web menggunakan contoh ID 1, memeriksa konten DOM yang tampil dan jumlah kontrol tema. Tidak menemukan halaman not-found pada contoh tersebut; masing-masing menampilkan tepat satu kontrol tema.
- Menyimpan 24 screenshot full-page web: enam area (Public, Login, Client, Admin, Officer, Teknisi) pada viewport 1440×900, 768×900, 390×900 dan 320×900. Data demo awal dan tema light sama.
- Enam screenshot Figma dipakai untuk inspeksi visual representatif: landing, login, dashboard Client/Admin/Officer/Teknisi. Screenshot Figma landing diperkecil oleh batas render; bukan dasar pengukuran pixel.
- Memeriksa target navigasi prototype secara struktural. Belum melakukan pengujian klik semua flow, perbandingan pixel seluruh route, seluruh record ID, semua keadaan gagal, atau seluruh kombinasi dark/responsive. Itu verifikasi implementasi pada tahap terkait dan tahap 10.
- Pembacaan file berhasil. Izin write tidak diuji dengan mutasi pada tahap audit ini; tidak perlu login ulang tanpa bukti kegagalan akses.
- Nilai scrollWidth tidak melebihi innerWidth pada 24 sampel. Ini hanya pemeriksaan overflow horizontal halaman, bukan jaminan semua isi mobile terbaca; beberapa screenshot full-page menyertakan kontrol fixed di posisi viewport awal.

## Inventaris terkonfirmasi

| Area | Frame layar |
|---|---:|
| Public & Auth | 7 |
| Client | 13 |
| Admin | 14 |
| Officer | 10 |
| Technician | 6 |
| Preview Dark | 3 |
| Total | 53 |

Terdapat 3 page, 14 Sections, 39 variables (9 Color, 14 Dimension, 16 Dark), dan hanya 1 text style lokal: Text/Button/Medium.
Komponen terpusat: Button, Ticket Badge, Priority Badge, Input, Client Header; standalone Brand/NAT Lockup serta 3 pattern Ticket List Item, Customer Detail Header, Import Validation Result.
Angka ini membuktikan keberadaan struktur, bukan kecocokan visual atau kelengkapan semua state.

## Matriks route

[route-parity.csv](route-parity.csv) memuat 49 pola route: Public/Auth 5, Client 8, Admin 16, Officer 14, Technician 6.
Kolom mencakup role, route, state, viewport target, tema target, node ID, status, selisih, dan bukti. OTP merupakan state di /forgot-password; sukses laporan state di /client/tickets/create. State tidak dihitung sebagai route terpisah.
43 pola route memiliki frame referensi, 6 belum memiliki frame khusus. Semua yang memiliki frame tetap perlu revisi atau verifikasi detail; tidak ada layar disertifikasi identik dalam audit ini.

### Enam route yang belum memiliki frame khusus

- `/admin/customers/:id/edit`
- `/admin/services/:id/edit`
- `/officer/customers/new`
- `/officer/customers/:id/edit`
- `/officer/services/new`
- `/officer/services/:id/edit`

Officer memang memperoleh form tambah dan edit di source saat ini; inventaris sebelumnya terlalu sempit. Halaman ini harus dimasukkan saat tahap Officer.

## Temuan berurutan

| ID | Prioritas | Temuan dan bukti | Tindak lanjut |
|---|---|---|---|
| A01 | Tinggi | Landing 13:2/13:52 masih memuat layanan generik, CTA portal berulang, testimonial contoh dan kontak lama; teks pricing/Nira tidak ditemukan. | Tahap 4: ganti mengikuti landing terbaru dan 7 paket ilustrasi. |
| A02 | Tinggi | Login 13:89/340:464 masih memuat “Satu ruang kerja” dan logo kecil di atas; web memakai lockup besar tengah. | Tahap 4: sinkronkan layout, mobile dan state login. |
| A03 | Tinggi | Toggle tema hanya tampak pada 3 pasangan preview, masih berada dekat bawah frame. Route web memiliki satu toggle di header/pojok atas Auth. | Tahap 3–9: komponen header dan pasangan tema semua layar dasar. |
| A04 | Tinggi | Client belum memuat Nira; header putih dan border lama berbeda dari header light abu lembut pada web. | Tahap 5: shell + chat + konten/state. |
| A05 | Tinggi | Dashboard Admin/Officer berupa kartu teks, bukan grafik, tabel dan filter seperti web. Sidebar belum mengikuti warna abu, ikon dan active state terbaru. | Tahap 6. |
| A06 | Tinggi | Enam form route belum ada frame; beberapa detail/tabs masih representasi teks dan tautan record perlu pemeriksaan. | Tahap 6: tambah/edit Admin; tahap Officer lengkap. |
| A07 | Tinggi | Teknisi mobile masih kerangka; dashboard menampilkan 2 metrik awal berbeda dari 4 metrik web. Enam frame clipsContent=true; screenshot menunjukkan konten bawah terpotong. | Tahap 7: layout, isi, scroll, bottom nav dan desktop. |
| A08 | Tinggi | Tidak ada komponen pricing/chat/global alert pada library yang terinventaris. Label “Loading/Failed” dalam map hanya teks penjelasan, bukan bukti state terpisah. | Tahap 3 dan 8. |
| A09 | Sedang | Client Section beririsan dengan Working Area dan Archive menurut bounds API. | Tahap 2: relokasi Sections tanpa menghapus desain. |
| A10 | Sedang | Hierarki tipografi belum menjadi text styles lengkap; koleksi light dan dark tidak simetris. | Tahap 2: foundations dan semantic mapping. |
| A11 | Sedang | Logo NAT asli tersedia, tetapi sampel image paint masih scaleMode FILL; perlu FIT/contain dan pemeriksaan ruang aman/proposi. | Tahap 2 definisi logo; tahap 3 brand component. |
| A12 | Sedang | Ada 382 action navigasi bertarget dan tidak ditemukan destination ID hilang; ini tidak membuktikan tujuan semantik benar. Prototype Section sendiri kosong. | Tahap 9: entry flow dan uji klik per record. |
| A13 | Sedang | Mobile hanya tersedia untuk landing, dashboard Client dan enam layar Teknisi; dark hanya 3 preview. | Tahap layar terkait: varian responsive/theme, bukan sekadar clone warna. |

## Revisi pengguna yang harus dibawa ke tahap implementasi

1. Logo NAT asli + Nirwana / MANAGEMENT SYSTEM, proporsi utuh, tidak crop.
2. Landing ringkas: header, hero satu CTA Lihat paket, pricing bertab, summary bantuan singkat dan footer.
3. Hilangkan kategori hero Rumah/Bisnis/Sekolah, testimonial contoh, kontak besar dan portal CTA berulang yang telah dihapus.
4. Login tetap ada; Masuk Portal menuju Login, bukan langsung dashboard Client.
5. Harga rumah: 30/50/100/300 Mbps → Rp179.000/229.000/299.000/499.000 per bulan.
6. Bisnis 100/200 Mbps → Rp649.000/999.000 per bulan; Business Custom untuk sekolah/kantor/multi-lokasi. Label harga ilustrasi dan ketentuan mengikuti web.
7. Nira demo di publik dan Client saja: launcher, quick prompts, draft pertanyaan, bubble, typing, close dan action. Tanpa AI asli.
8. Tombol tema di atas untuk semua peran; tidak lagi menyatu dengan Mode Demo bawah.
9. Sidebar light abu lembut serta header Client dengan pemisah jelas.
10. Login memakai brand besar di tengah panel kiri; slogan dan logo kecil ganda dihapus.
11. Peringatan: login salah, offline, timeout, gagal simpan, field invalid, file invalid, CSV invalid, stok kurang, transisi tiket invalid dan retry.
12. Draft tidak hilang pada kegagalan; jangan menampilkan sukses ketika aksi diblokir.

## Inventaris state dan aturan perilaku

| Kelompok | State/aturan yang menjadi acuan |
|---|---|
| Auth | Kosong/terisi, nomor invalid, gagal login, OTP 6 digit, password minimal 6 dan konfirmasi sama, berhasil/kembali. Tidak ada autentikasi asli. |
| Ticket | NEW → OPEN → IN PROGRESS/PENDING → SELESAI; PENDING dapat ke IN PROGRESS/SELESAI; SELESAI dapat reopen OPEN; arsip read-only. Cocokkan setiap aksi dengan source, bukan label lama. |
| Client | Layanan rumah/kantor, tiket 014/013 dan contoh 016 setelah submit, tab Semua/Aktif/Selesai, form validasi/upload/sukses. |
| Ops | Search/filter/no results; customer tabs Overview/Layanan/Tiket/Riwayat; tambah/edit; assign; prioritas; status; progress; konfirmasi arsip. |
| Map | Loading/loaded/failed/retry/no coordinate; daftar tetap dapat dibaca saat peta gagal. |
| Voucher | Admin/Officer dapat koreksi; Teknisi read-only. Tambah/kurangi, validasi jumlah, stok kurang dan riwayat. |
| Import | Upload, validasi gagal/berhasil, preview, konfirmasi, sukses; file read failure; export konfirmasi dan kegagalan. |
| Users | Admin saja; tab Staff/Client Accounts, tambah, lihat, ubah role, aktif/nonaktif dan konfirmasi. |
| Feedback | Normal; auth/timeout/save sekali jalan; offline persisten sampai pulih. Field error, tipe/ukuran file 5 MB, aksi gagal mempertahankan draft. |
| Chat | Public: harga/paket/bisnis/area; Client: gangguan/progres/layanan. Percakapan lokal tidak diblokir guard jaringan. |

Hak peran adalah perilaku UI demo, bukan bukti keamanan backend. Alur Figma memakai skenario terdefinisi, bukan promise autentikasi/pengetikan bebas.

## Bukti tersimpan

- figma-structure.json — page, section, frame ID dan ukuran.
- figma-foundations.json / figma-components.json — library dan variables.
- figma-screen-content.json — teks, jumlah instances/Auto Layout/reactions dan lokasi toggle.
- routes.json / route-parity.csv — inventaris route dan gap.
- web-route-observations.json — observasi DOM 49 route.
- web-reference.json — observasi 24 sampel responsive.
- screenshots/ — 24 screenshot web dan 6 screenshot Figma.

## Keputusan untuk tahap berikutnya

Tahap 2 hanya menata struktur file dan foundations: perbaiki overlap Sections, panduan logo, semantic tokens light/dark, hierarki tipografi, spacing/grid/radius/shadow dan aturan penamaan. Pembuatan komponen berada di Tahap 3 dan pengerjaan layar mulai Tahap 4, mengikuti urutan rencana yang disetujui.
Pelaksanaan Tahap 2 menunggu konfirmasi pengguna. Tidak ada mutasi canvas atau perubahan source aplikasi dalam audit ini.

