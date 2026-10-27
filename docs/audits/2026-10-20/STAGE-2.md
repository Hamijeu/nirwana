# Tahap 2 — Struktur file dan foundations
Tanggal: 20 Oktober 2026. Baseline web: 4118faa.
Status: selesai untuk lingkup Tahap 2; komponen dan layar berikutnya belum diselaraskan.

## Perubahan di Figma

- Tetap 3 page dan 53 frame layar pada Screens & Flows.
- Working Area dipindahkan ke (9600, 8200), Archive ke (11450, 8200); overlap Sections sudah tidak ditemukan.
- Page Cover & Foundations sekarang memiliki cover terbaru dan 5 lembar panduan native editable: Brand, Color, Typography, Layout dan Rules.
- Isi cover/foundations lama dipertahankan dalam frame tersembunyi Legacy / Pre-stage-2. Tidak ada penghapusan layar lama.
- Panduan penamaan Role / Screen / State / Viewport / Theme sudah dicantumkan. Penerapan nama layar dilakukan ketika layar terkait dikerjakan agar ID dan tautan tetap terjaga.
- Logo contoh menggunakan aset NAT asli dengan scaleMode FIT. Komponen Brand yang digunakan layar lama diperbarui pada Tahap 3.

## Variables dan styles

| Koleksi | Jumlah | Mode |
|---|---:|---|
| Nirwana / Color | 27 semantic aliases | Light |
| Nirwana / Dark | 27 semantic aliases | Dark |
| Nirwana / Primitive | 45 warna mentah | Value |
| Nirwana / Dimension | 18 spacing/radius | Value |

Light/Dark mempunyai nama semantic yang sama. IDs lama dipertahankan untuk token yang sudah digunakan, termasuk token dark yang namanya dirapikan.
Semua semantic colors alias ke primitive; primitive disembunyikan dari property picker dengan scopes kosong. Variables lain mempunyai scopes sesuai fungsi; tidak ada ALL_SCOPES tersisa.
Seluruh variable memiliki WEB code syntax. Properti CSS yang sudah ada memakai nama aslinya. Token dari CSS literal memakai usulan --nirwana-* dengan fallback, dan deskripsinya menyatakan bahwa custom property itu belum dideklarasikan di aplikasi.

- 18 text styles baru dengan font Inter dan spesimen terikat style; 1 style lama Text/Button/Medium dipertahankan agar dependensi komponen lama tidak rusak. Total 19.
- 5 effect styles: Panel, Header, Modal, Focus Light dan Focus Dark.
- 3 grid styles: Public Desktop 1120, Tablet dan Mobile. Grid adalah panduan alignment, bukan klaim bahwa CSS web memakai sistem kolom tersebut.
- 10 spacing tokens; 8 radius tokens termasuk 9, 10, 14, 18 yang ditambahkan.

## Panduan yang terlihat di canvas

- Logo: proporsi, FIT/contain, alas putih pada dark, ukuran normal/ringkas/login/mobile.
- Warna: 27 pasang Light/Dark, primary vs button, text, surface, border, navigation, status, focus dan overlay.
- Tipografi: hero desktop/mobile, heading, body, label, caption dan metric.
- Layout: viewport 1440/768/390/320, ukuran container, padding sidebar/header, spacing dan elevation.
- UI/UX: fokus, label, target kontras, target sentuh 44 px, error/retry, draft preservation, tabel responsive, batas prototype dan ikon Lucide.

Target aksesibilitas bukan sertifikasi lulus untuk semua pasangan warna/ukuran web. Caption 9–10 px dan kontrol tema visual 38/35 px tetap dicatat untuk peninjauan pada tahap komponen/layar. Aplikasi web tidak diubah.

## Verifikasi

Hasil API tersimpan di stage-2-verification.json dan stage-2-structure.json:

- 3 page, 53 screen frame; 0 overlap Sections pada Screens & Flows.
- 27 nama semantic Light/Dark cocok; 0 alias rusak.
- 0 variable dengan ALL_SCOPES; 0 WEB code syntax kosong/tidak berformat var(...).
- 18 spesimen typography terikat text styles.
- 0 teks runtuh ke tinggi 1 px dan 0 overflow horizontal child pada keenam lembar panduan.
- Logo specimen FIT.
- Keenam board diperiksa lewat screenshot. Tinggi otomatis teks telah diperbaiki; shadow specimen diperiksa ulang setelah perbaikan clipping.

## Link peninjauan

- [Cover](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-4)
- [Brand](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-14)
- [Color Light/Dark](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-25)
- [Typography](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-196)
- [Layout](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-254)
- [UI/UX Rules](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=346-299)

## Berikutnya

Tahap 3 — Komponen dan pola reusable: Brand, Button/Input/states, badge, navigasi, cards/table, modal/alert, pricing dan Nira. Menunggu persetujuan pengguna sesuai aturan satu tahap per giliran.

