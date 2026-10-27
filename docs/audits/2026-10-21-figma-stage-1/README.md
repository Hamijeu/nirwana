# Tahap 1 — Audit web terbaru ke Figma

## Status dan batas audit

Tahap audit selesai. Belum ada revisi konten/desain Figma, kode web, commit, atau push dalam tahap ini. Acuan web adalah commit `141ddff2637ecbdeb1e5f590950a8c123f771501`.

Inventaris layar Figma dibaca ulang melalui metadata live page `4:2` pada 21 Oktober 2026. Metadata berisi 2.186 node dan 53 frame layar langsung di dalam Sections. Pemetaan dilakukan terhadap kode dan kondisi prototype, bukan klaim kesamaan visual/pixel atau kelulusan semua AC.

Page foundations dan components diperiksa keberadaannya melalui browser. Rincian token/variant memakai checkpoint terdahulu karena dua permintaan metadata berikutnya ditolak kuota Starter. Nilai token, jumlah variant, dan prototype links belum diaudit ulang menyeluruh. Tidak perlu upgrade untuk memulai pekerjaan UI manual pada tahap berikutnya.

Catatan operasi: selection section Components sempat bergeser 1 px saat membaca lewat keyboard; langsung di-Undo dan X=0 terverifikasi pada AX browser. Tidak ada perpindahan akhir atau perubahan desain yang dipertahankan.

## Ringkasan inventaris

| Kelompok | Pola route web | Frame layar Figma yang ada |
|---|---:|---:|
| Company profile + Portal + Auth | 6 | 7 (belum ada Portal terpisah) |
| Client | 8 | 13 |
| Admin | 16 | 14 |
| Officer | 14 | 10 |
| Teknisi | 6 | 6 (semuanya mobile) |
| Preview dark terpisah | — | 3 |
| **Total** | **50** | **53** |

Ada **43 route dengan frame untuk direvisi**, dan **7 route tanpa frame dasar**. Angka ini bukan estimasi jumlah frame akhir: state alternatif, tema, modal, dan versi mobile/desktop akan menambah kebutuhan representasi desain.

### Tujuh route yang belum memiliki frame dasar

1. `/portal`
2. `/admin/customers/:id/edit`
3. `/admin/services/:id/edit`
4. `/officer/customers/new`
5. `/officer/customers/:id/edit`
6. `/officer/services/new`
7. `/officer/services/:id/edit`

Tambahan di luar tujuh route: desktop untuk enam halaman Teknisi; mobile auth dan sebagian besar modul Client/operasional; state review dan asisten; perluasan light/dark.

## Pertahankan, revisi, tambah, arsip

### Pertahankan sebagai aset reusable

- Tiga page: `0:1` Cover & Foundations, `4:3` Components & Patterns, `4:2` Screens & Flows.
- Logo asli NAT dan lockup perusahaan; periksa FIT dan rasio saat digunakan.
- Foundations/tokens/text/effect/grid yang sudah dibuat, setelah validasi ulang di Tahap 2.
- Komponen native yang sudah ada: Brand, Button, Input, Password, Select, Textarea, Search, Badge, Checkbox, Upload, Tab, Pagination, ThemeToggle, IconButton dan Lucide.
- ID frame layar yang masih menjadi tujuan prototype dipertahankan selama memungkinkan. Pertahankan komponen umum, bukan tampilan lama yang berbeda dari web.

### Revisi prioritas

- Landing `13:2/13:52`: pisahkan Company Profile dari Portal; buang CTA login/promosi portal, testimonial lama; gunakan paket rumah/bisnis-custom dengan label ilustrasi, kontak belum tersedia, tanpa AI publik.
- Login `13:89/340:464`: logo besar terpusat, slogan lama dihapus, link pemulihan diperbarui, kontrol tema di atas, kondisi akun dan akun demo terbaru.
- Auth `13:103/13:114/13:125/13:139`: wizard aktivasi/recovery; OTP, salah/kedaluwarsa, kanal gagal, password 8–128 karakter, konfirmasi dan kembali login. `/reset-password` di web kini memulai verifikasi, bukan bypass langsung ke input password.
- Client `15:7/15:41/340:347`: hitungan demo terbaru, launcher Asisten pelaporan, badge Menunggu Review pada tiket.
- Laporan `15:151/60:36`: form/asisten, form rangkuman, edit fakta, penilaian stale, fallback, konfirmasi Client, sukses New + Menunggu Review.
- Detail Client `15:177/178:37/237:345`: read-only, status review/penanganan terpisah, tidak menampilkan audit internal atau klaim penerimaan sebelum terjadi.
- Admin/Officer dashboard `16:15/17:26`: angka data demo, pelanggan aktif unik, periode WIB, antrean review terpisah. Grafik statis lama bukan acuan terbaru.
- Detail staf `16:285/17:203`: review, prioritas/alasan, Nonaktif teknis/administratif, terbit tetap New, multi-Teknisi/handover, tindakan Terima, progress/arsip.
- Teknisi `17:310/17:339/17:356`: antrean hanya tiket terbit, klaim tetap New, Terima terpisah, tugas sendiri dan stok unit perusahaan.
- Semua shell: penempatan theme toggle, sidebar abu-abu light, pembatas header Client, logo FIT, kondisi mobile dan Mode demo terbaru.

### Tambahkan state dan komponen gabungan

- Portal landing, gagal muat/Coba Lagi, kontak disabled, panduan 3 langkah.
- Auth: salah kredensial, Belum Aktif, Nonaktif, lockout, OTP/pengiriman gagal, verifikasi/password/sukses.
- AI Client: pengantar, pilihan layanan, empat pertanyaan, Tidak tahu, mengetik, rangkuman editable, perubahan fakta/stale, penilaian ulang, respons gagal, fallback ke form.
- Pengajuan: isian wajib kurang, foto invalid, konfirmasi, gagal simpan, sukses dan read-only.
- Review: belum lengkap/catatan tindak lanjut, prioritas/alasan kosong, keputusan Nonaktif, disetujui/terbit, administratif tanpa terbit.
- Teknisi: belum klaim, telah klaim tetap New, Terima/Open, tidak berwenang, progress/foto invalid, Pending/Selesai/reopen dengan catatan.
- Pola operasional: filterbar, statistik, kartu layanan/tiket/pricing, tabel responsive, timeline, alert/dialog/empty state, peta/import states.

### Arsip bersyarat, belum dilakukan

- Hanya versi/duplikat yang sudah punya pengganti terverifikasi yang boleh dipindah ke Archive.
- State seperti Client Tickets Initial/Submitted dan detail #013/#016 jangan otomatis dihapus: evaluasi sebagai skenario prototype.
- Jangan menghapus frame/component lama sebelum tujuan prototype, instance dan konten yang perlu dipertahankan dipetakan.
- Flow lama perlu diganti setelah flow baru terbukti berjalan; tidak cukup hanya mengganti nama layar.

## Pemetaan US/AC dan gap web

`us-ac-screen-map.csv` memetakan **35 US dan 142 AC per-US** ke route dan node yang relevan. Sepuluh AC-PDP bersifat lintas fitur; UI aktivasi berhubungan dengan AC-PDP-10, sementara gate KTP, register hak data/insiden dan bukti kepatuhan tidak diklaim selesai.

Penting: visual web terbaru menjadi acuan parity, sedangkan AC menjadi aturan dan catatan gap. Jangan diam-diam merancang fitur yang belum ada di web sebagai fitur selesai.

| Area | Gap yang masih ada / keputusan |
|---|---|
| US-003 | Profil menuju pemulihan; perubahan password sesi aktif penuh belum tersedia. |
| US-007–008 | Form pelanggan/account lifecycle dan verifikasi nomor belum lengkap; gate privasi ditunda. |
| US-010 | Penomoran unik/snapshot historis belum dibuktikan pada prototype. |
| US-015 | Form pembuatan tiket oleh petugas/Teknisi belum tersedia. |
| US-021 | Durasi respons/penyelesaian belum disajikan penuh berdasarkan peristiwa. |
| US-022 | Tindakan arsip ada; navigasi daftar arsip khusus belum ada. |
| US-023–024 | WhatsApp/Telegram dan status delivery/retry belum diimplementasikan; hanya keterangan simulasi. |
| US-029–031 | Kelola jenis/koreksi tertaut belum ada; Teknisi masih baca saja, sedangkan US-030 mengizinkan tambah/kurangi. |
| US-032–033 | Impor validasi dasar; ekspor per layanan, belum pelanggan aktif unik. |
| US-034–035 | Menunggu konfirmasi PM; ditunda. |
| Penolakan/klarifikasi | Alur Ditolak dan cara Client menjawab masih belum diputuskan. |
| Harga | Tetap ilustrasi, bukan penawaran resmi atau harga yang disetujui PM. |

Jika ingin memperbaiki gap perilaku ini, perlukan tahap web yang disetujui terpisah sebelum menyatakan Figma/web/AC selaras. Figma boleh memberi catatan handoff tentang keterbatasan, tanpa mengarang fungsi.

## Urutan lanjutan dan gate

1. **Tahap 2:** validasi foundations/komponen yang ada, selesaikan komponen gabungan dan status review baru.
2. **Tahap 3:** Company Profile dan Portal (desktop/mobile).
3. **Tahap 4:** Auth dan state alternatif.
4. **Tahap 5:** Client dan laporan/asisten.
5. **Tahap 6:** Admin/Officer, dimulai review dan detail tiket, lalu modul pendukung.
6. **Tahap 7:** Teknisi, klaim/Terima dan progress, mobile lalu desktop.
7. **Tahap 8:** tema, responsif, state, aksesibilitas dan konsistensi lintas layar.
8. **Tahap 9:** prototype links, flow dan perbandingan visual web–Figma.

Setiap tahap: tampilkan hasil dan keterbatasan; minta konfirmasi pengguna sebelum tahap berikutnya. Audit ini belum mengesahkan pixel parity, semua variant, semua prototype links, atau kelulusan AC produksi.

## Berkas hasil dan bukti

- `route-parity.csv/json`: seluruh 50 route, target frame, state, referensi, prioritas, tahap dan catatan.
- `frame-disposition.csv`: seluruh 53 frame dan aturan mempertahankan/arsip.
- `us-ac-screen-map.csv`: pemetaan 35 US / 142 AC.
- `figma-screens-live.xml` dan `figma-inventory-live.json`: metadata Figma terbaru.
- `figma-components-browser.txt`, `figma-foundations-browser.txt`: bukti keberadaan page/section dan state editor.
- `web-browser-evidence.json`: pemeriksaan ulang Company Profile, Portal dan Login. Route lainnya diperiksa dari kode dan checkpoint pengujian web; bukan 50 kunjungan browser baru.
- `verification.json`: jumlah, baseline commit dan fingerprint metadata.

File Figma: https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=4-2
