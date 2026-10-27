# Kesesuaian Figma dengan Web Nirwana

Tanggal pemeriksaan terbaru: 10 Oktober 2026. Acuan implementasi adalah `src/main.jsx`, `src/ExtraPages.jsx`, `src/Landing.jsx`, dan `src/style.css` di repositori ini, serta [web publik](https://hamijeu.github.io/nirwana/#/client/tickets) untuk pembandingan visual. File Figma: [Nirwana](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana). Status saat ini **belum sama persis** dengan web.

## Selisih utama yang terkonfirmasi

| Area | Web saat ini | Figma saat ini | Perbaikan yang diperlukan |
|---|---|---|---|
| Shell Client desktop | Header horizontal 72 px berisi brand, navigasi, avatar, dan nama Budi Santoso (`ClientShell`) | Seluruh 11 frame Client desktop memakai instance header native 1440×72, logo NAT, subjudul, avatar BS, nama pelanggan, dan garis menu aktif. Master berada di Components & Patterns, dengan varian Default (Tiket), Beranda, Layanan Saya, Profil, Bantuan. Main content 1440×828 dengan padding 175 px horizontal dan 38 px vertikal. | Samakan isi layar dan lengkapi tautan navigasi pada seluruh instance; pemasangan shell belum membuktikan kesesuaian isi |
| Tiket Saya | Judul, tombol Buat laporan, tab Semua/Aktif/Selesai, lalu dua kartu tiket (`ClientPages`) | Frame **Tickets Initial** sudah memiliki struktur, data #014/#013, badge status, waktu, dan garis kartu yang mendekati web; ukuran huruf, jarak, logo, dan beberapa detail masih berbeda. | Selesaikan penyamaan visual pada viewport yang sama dan tambahkan interaksi tab |
| Form laporan | Area sempit berpusat, back link, pilihan layanan, kategori opsional, deskripsi, foto, Batal, Kirim laporan (`ClientPages`) | Form dalam area lebar, tanpa kategori, back link, dan Batal | Susun ulang form beserta label, input, dan baris aksi; perbarui alur tombol |
| Konfirmasi laporan | Kartu sukses berpusat dengan ikon, nomor tiket, dan tombol Lihat tiket (`ClientPages`) | Halaman detail penuh dengan ringkasan dan langkah berikutnya | Ubah menjadi state sukses sesuai web; tautkan tombol ke detail tiket baru |
| Data setelah kirim | Nomor dan detail tiket dibuat saat submit (`addTicket`) | Contoh statis #TKT-2026-016 | Tandai data Figma sebagai contoh; pastikan contoh konsisten antara konfirmasi, daftar, dan detail |
| Data awal Tiket Saya | `src/data.js` memberi Budi tiket #014 dan #013; #012 milik Siti Rahma. Tiket baru muncul setelah submit | Dua frame Figma memisahkan state awal (#014/#013) dan sesudah submit (#016/#014/#013). Kartu #014 menuju detail #014, kartu #013 menuju detail #013. Kedua alur sudah diuji di Present pada pemeriksaan sebelumnya. Detail #013 kini memakai header horizontal; isi detail masih sederhana. | Samakan isi detail #013 dan state setelah kirim dengan web |
| Responsif Client | Header dan bottom navigation berubah pada breakpoint 850/640 px (`src/style.css`) | Hanya Dashboard Client memiliki frame mobile | Tambah frame mobile untuk halaman Client utama dan periksa navigasinya |

## Urutan penyamaan

### Pembaruan konfirmasi Client

### Pembaruan form laporan Client

### Pembaruan Dashboard Client — editor browser

Frame `15:7` kini memakai sapaan Halo, Budi, deskripsi sesuai web, header dengan tombol Buat laporan di kanan, tiga statistik 2/2/7, keterangan statistik, serta ikon vektor Wifi/Ticket/CircleCheck yang bentuk dan warnanya dibaca dari DOM web. Area ringkasan selebar 1090 px, kartu statistik 353.33 px dengan gap 15 px. Panel Layanan Saya dan Tiket Aktif berdampingan, masing-masing 535 px dengan gap 20 px. Dua layanan dan dua tiket diberi wadah Auto Layout native dengan stroke E9EDF4; nama paket memakai Home Internet dan Business Internet dari data sumber.

Verifikasi Present: Buat laporan → Create Ticket (`15:151`); tiket #014 → Detail (`15:177`); tiket #013 → Detail (`178:37`). Uji pertama tiket #013 menemukan tujuan salah ke Public Landing; tujuan interaksi diperbaiki melalui dialog, nilai Destination diperiksa kembali, lalu klik ulang berhasil membuka `178:37`. Bukti preview: `figma-client-dashboard-proof.png`.

Dashboard tetap belum identik: kartu layanan masih memakai teks gabungan dan belum memiliki ikon/badge terpisah; Lihat semua belum dibuat; tautan layanan belum dipisahkan; radius, border/shadow statistik, hierarki font per baris, dan beberapa jarak masih berbeda. Tautan tiket hanya terpasang pada layer teks di dalam kartu. Layar mobile dan layar peran lain belum diperbarui dalam langkah ini. Jumlah frame tetap 50.

Frame `15:151` kini memakai area form 730 px (padding horizontal content 355 px), panel dengan padding 26 px, input selebar 676 px, kategori masalah opsional native, label dan placeholder sesuai sumber web, back link Tiket Saya, serta baris Batal/Kirim di dalam panel. Input kategori merupakan instance dari komponen Input yang sudah ada; tombol Batal memakai variant Secondary dari Button. Panel tambahan Setelah dikirim dan judul panel Form laporan dihapus karena tidak ada pada form web.

Di Present telah diuji: back link → daftar tiket awal; Batal → daftar tiket awal; Buat laporan → form; Kirim laporan → konfirmasi sukses; Lihat tiket → detail #016. Preview form: https://www.figma.com/proto/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=15-151&page-id=4%3A2&starting-point-node-id=15%3A151&scaling=contain . Bukti visual `figma-client-form-proof.png`.

Batasan: ini alur klik contoh statis. Pilihan dropdown, mengetik deskripsi, upload foto, dan validasi kosong belum disimulasikan. Spasi vertikal, border/shadow, warna input, bobot label, gaya Soft tombol Batal, ikon panah/select, serta input foto native browser belum sama persis dengan web. Detail #016 dan Dashboard masih perlu pendalaman.

### Konfirmasi dan detail #016

### Pembaruan tiga detail tiket — editor browser

Detail #016 (`237:345`), #014 (`15:177`), dan #013 (`178:37`) sekarang memakai susunan dua kolom: progress di kiri (588.5 px), stack informasi/deskripsi di kanan (481.5 px), gap 20 px, dan area konten 1090 px. Ketiganya memiliki back link native, kelompok header, panel deskripsi terpisah, judul laporan dan metadata yang disesuaikan dengan sumber web. Isi dan titik progress tetap berupa layer editable; #014 memiliki empat event, #013 dua event, dan #016 satu event. Root frame dan header tetap dipertahankan sehingga tautan kartu sebelumnya masih menuju frame yang sama.

Verifikasi Present terbaru: back link #016 → Tickets Initial; back link #013 → Tickets Initial; kartu #014 → detail #014 yang diperbarui; back link #014 → Tickets Initial. Pemeriksaan screenshot editor pada ketiga frame memperlihatkan panel tanpa overlap. Bukti terakhir: `figma-client-details-editor-proof.png`.

Status tetap **parsial**, belum identik dengan web. Label/nilai informasi masih teks gabungan; badge status belum mengikuti tampilan web; hierarki tipografi per baris timeline, garis penghubung, border, shadow, radius, dan sebagian jarak masih perlu dirapikan. Screenshot Present yang dipakai untuk pengujian memakai content-scaling=fixed sehingga sisi kanan terpotong pada panel browser yang lebih kecil; bukti editor memperlihatkan seluruh frame 1440×900. Override viewport sementara telah dihapus. Dashboard, Public/Auth, Admin, Officer, dan isi Technician masih memerlukan penyamaan penuh.

Frame `60:36` kini memakai kartu sukses native berpusat, bukan ringkasan dan timeline. Kartu `237:332` memiliki lebar 540 px, padding 45/32 px, ikon berhasil vektor, teks dari web, nomor contoh #TKT-2026-016, dan instance Button dengan label Lihat tiket. Seluruh teks tetap editable. Tombol telah diuji di Present dan membuka detail #016, frame `237:345` yang ditambahkan pada baris Client x1530/y3840 tanpa tumpang tindih pada pemeriksaan visual. Detail memakai status NEW, layanan Internet Rumah, dan hanya riwayat Laporan dibuat. Jumlah frame sekarang 50 (Client 13).

Kesesuaian visual belum selesai: margin antarbagian kartu, warna nomor, garis/shadow, ikon panah tombol, serta detail #016 masih perlu disamakan dengan CSS. Form laporan belum diubah pada pembaruan ini. Detail #016 masih kerangka dengan waktu contoh statis; belum memiliki deskripsi, badge, panel metadata, dan susunan lengkap dari web. Bukti konfirmasi ada pada `figma-client-success-proof.png`.

### Pembaruan logo dan navigasi Teknisi

- Logo asli NAT kini menjadi komponen native `Brand / NAT Lockup` (162×37), dengan nama Nirwana dan subjudul MANAGEMENT SYSTEM. Sebanyak 38 placeholder teks lama diganti; 11 header Client desktop sudah memakai logo asli sebelumnya. Pemeriksaan visual dilakukan pada Login, Admin Dashboard, dan Teknisi mobile.
- Keenam frame Teknisi mobile memakai bilah navigasi native 390×59 pada y785, lima label terpisah berukuran 9 px, dan ikon vektor dari bentuk Lucide yang dipakai web: LayoutDashboard, Ticket, MapPin, FileText, UserRound. Ikon aktif dibedakan untuk Dashboard, Ticket/detail, Peta, Voucher, dan Profil.
- Di Present, alur Dashboard → Ticket → Dashboard, Dashboard → Peta → Dashboard, Dashboard → Voucher → Dashboard, dan Dashboard → Profil → Dashboard sudah diuji dan membuka tujuan yang benar. Tautan kembali dari detail pekerjaan baru dipasang, belum diuji di Present.
- Bukti visual: `figma-brand-login-proof.png`, `figma-brand-admin-proof.png`, `figma-technician-nav-proof.png`.
- Batasan tersisa pada Teknisi: target klik masih pada label; ikon belum menjadi target klik bersama label. Warna label aktif, bobot huruf, garis batas, perilaku fixed saat scroll, serta isi layar belum selesai disamakan. Main content Dashboard/detail masih terpotong pada viewport dan perlu pengaturan scroll. Pembaruan navigasi ini tidak menandai layar Teknisi sebagai sudah sama persis.

Tahap berikutnya: samakan Dashboard Client dan alur laporan gangguan (form, sukses, daftar, detail), lanjutkan Public/Auth, lalu Admin/Officer/Technician. Verifikasi setiap layar pada viewport dan data demo yang sama dengan web.

1. Tetapkan ukuran viewport acuan untuk desktop 1440 px dan mobile 390 px, serta data demo awal dari `src/data.js`.
2. Shell Client native sudah diterapkan pada 11 frame desktop termasuk detail #013 tambahan. Lengkapi dan uji navigasi setiap instance.
3. Samakan layar Client satu per satu, dimulai dari Dashboard, Tickets, Create Ticket, Ticket Submitted, dan Ticket Detail. Gunakan teks, ikon, status, dimensi, dan urutan kartu dari kode web.
4. Ulangi perbandingan untuk Public/Auth, Admin, Officer, dan Technician. Tambah frame responsif dan state yang memang tampil di web.
5. Uji tautan prototype dan bandingkan screenshot Figma Present dengan web pada viewport dan data yang sama sebelum menandai setiap layar selesai.

## Batasan saat pemeriksaan

Pembaruan terakhir 10 Oktober melalui editor browser: empat variable warna disamakan dengan CSS (`Text/Primary #17233B`, `Text/Secondary #718098`, `Background/Default #F7F9FC`, `Border/Default #E6EBF2`). Frame Dashboard Mobile dipindahkan dari x470 ke x4840 agar tidak menimpa Dashboard Desktop. Pemeriksaan Present dengan `scaling=contain` mengonfirmasi header Tiket Saya, varian Beranda, dan dashboard tanpa tumpang tindih. Pengujian menemukan menu Beranda belum memiliki aksi; empat tautan pada header **Tickets Initial** kemudian ditambahkan (Beranda, Layanan Saya, Profil, Bantuan). Beranda → Dashboard telah diuji ulang dan membuka frame yang benar; tiga tautan lainnya baru terpasang dan belum diuji ulang. Navigasi header pada frame lain belum lengkap. Isi Dashboard, form, konfirmasi, dan mayoritas layar peran lain masih kerangka visual, bukan salinan persis web.

Figma MCP kembali mengembalikan batas panggilan paket Starter pada 10 Oktober setelah dua pembacaan struktur berhasil. Pada pembacaan terakhir, `Ticket 013 / Status row`, `Status`, `Status badge`, `Badge`, `Title`, `Metadata`, dan `Time` semuanya memiliki `reactions: []`. Interaksi yang benar kemudian ditambahkan ke seluruh bingkai kartu #013 melalui editor browser. Editor browser masih dapat dipakai untuk perubahan manual, tetapi penyesuaian massal pada puluhan layar tertahan oleh batas API tersebut. Halaman Tiket Saya di web publik dan Figma Present telah dibandingkan; peran dan layar lain belum menjalani perbandingan screenshot satu per satu. Jangan menganggap tabel ini sebagai sertifikasi kesesuaian visual.

State yang sudah dapat dibuka langsung: [Tiket awal](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=76-36), [Detail #013](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=178-37), dan [Tiket setelah kirim](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=15-123). Tombol Buat laporan serta kedua kartu #014/#013 pada state awal sudah diuji di Present; semuanya membuka layar yang sesuai. Jumlah frame native sekarang 49.

### 10 October 2026 — Dashboard panel links
- Added native horizontal headers with right-aligned Lihat semua links in both Dashboard panels.
- Verified in Figma Present: Services link navigates to 15:65; Tickets link navigates to 76:36.
- Rounded all four service/ticket card containers to radius 10.
- Corrected temporary ticket-card width regression to 495 and verified the full Dashboard visually.
- Removed accidental root text created during UI editing.
- Proof: figma-client-dashboard-links-proof.png.
- Still pending: native status badges, separate service actions, mixed typography, exact panel spacing/borders, and remaining screen bodies. Full web parity is not complete.

### 10 October 2026 — Home service actions
- Home card now uses separate editable action texts: Lihat detail and Laporkan gangguan.
- Tested Present clicks: detail -> 15:96, report -> 15:151.
- Home body is four editable lines, actions currently stacked vertically.
- Reverted failed badge construction and duplicate text caused by editor focus timing. No completed native badge claim.
- Proof: figma-client-service-actions-proof.png.
- Pending: badges, horizontal service footer, Office actions, exact typography and remaining screens.

### 10 October 2026 — Native screen updates and current blocker
- MCP access succeeded with the connected Full-seat account. Rebuilt Dashboard service/status/action cards and ticket cards; installed Client header navigation across desktop instances.
- Rebuilt Client Services, Profile and Help bodies. Rebuilt five desktop authentication views as editable two-column layouts with prototype links.
- Updated Admin/Officer shells and four customer/service list tables. Rebuilt Admin customer/service forms and Admin/Officer customer/service detail bodies from source.
- Inspected native screenshots for Dashboard, Services, Login, Customers and Add Service. These are progress checks, not proof of complete parity.
- Last screenshot of Add Service (16:185) shows lower form content clipped: root was extended to 1200, but Main Content/Sidebar retained 900 height. The corrective call was rejected before execution. Fix both child heights, then recheck form and button visibility.
- Figma returned: "You've reached the Figma MCP tool call limit on the Starter plan." Further MCP writes could not proceed.
- Remaining: operational dashboards/tickets/maps/vouchers/import/users/settings; technician bodies and scrolling; public landing parity; authentication copy/geometry refinement; customer tabs and edit states; individual record destinations; badges/icons/variable bindings; full prototype and viewport comparisons.
- Do not mark the project complete. The rejected corrective call made no verified change. Open review target: https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=16-185

### Direct editor correction after MCP limit
- Manually changed Main Content and Sidebar heights to 1200 on Admin Customer New (16:93) and Service New (16:185).
- Verified screenshots show complete forms including Batal and Simpan buttons, with full-height sidebar backgrounds.
- Proofs: figma-customer-form-height-proof.png and figma-service-form-height-proof.png.
- MCP call limit remains active; remaining parity work is not complete.
