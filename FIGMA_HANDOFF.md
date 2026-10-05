# Figma Native Handoff

Target file yang diminta: [Nirwana](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?t=fDeAJLcIT1RQeujJ-1). Sesuai keputusan pemilik file, struktur memakai tiga page Starter dan Sections di dalamnya. Page yang sudah dibuat: `00 — Cover & Foundations`, `01 — Components & Patterns`, `02 — Screens & Flows`. Ketiga page memuat total 13 Sections sesuai daftar di bawah. Foundations memiliki 23 variables (9 warna, 14 dimensi) dan satu text style `Text / Button / Medium`. Page layar berisi **46 frame native editable**: 7 Public/Auth, 9 Client, 14 Admin, 10 Officer, dan 6 Technician. Sepuluh koneksi prototype dasar dibuat lewat editor browser: Landing → Login → Dashboard Client → Form Tiket → Detail Tiket; Admin Dashboard → Tickets → Ticket Detail; Officer Dashboard → Customers → Customer Detail; Technician Dashboard → Tickets → Ticket Detail. Koneksi tersebut berada pada frame dan dapat diperhalus ke tombol spesifik. Integrasi Figma mencapai batas panggilan MCP paket Starter; perubahan selanjutnya dilakukan melalui editor browser. **Status desain: parsial.**

Pembaruan 5 Oktober 2026: Section `00 — Cover & Notes` kini memuat ringkasan produk dan jumlah layar/Sections/pages. `01 — Foundations` memuat delapan swatch warna dengan hex, spacing, dan radius. Library memuat component set Button (Primary, Secondary), `Badge / Ticket` (6 varian dengan properti Category dan Status), `Badge / Priority` (4 varian dengan properti Category dan Level), dan `Input` (Default, Focus, Error, Disabled dengan properti State). Section `03 — Patterns` memuat tiga komponen native: Ticket / List Item, Customer / Detail Header, Import / Validation Result. Section `04 — User Flows` berisi delapan alur teks editable untuk Client, Admin, Officer, Technician, Auth, Pelanggan, Layanan, dan Import CSV. Swatch baru di Foundations memakai fill hex biasa; binding ke variables belum dikerjakan.

Mulai dari [Landing Desktop](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=13-2), [Login](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=13-89), atau [Dashboard Client](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?node-id=15-7). Semua berada dalam Section yang sudah ada, bukan file atau page baru.

## Struktur workspace target

1. Page `00 — Cover & Foundations`: Sections `00 — Cover & Notes`, `01 — Foundations`.
2. Page `01 — Components & Patterns`: Sections `02 — Components`, `03 — Patterns`.
3. Page `02 — Screens & Flows`: Sections `04 — User Flows`, `05 — Public & Auth`, `06 — Client`, `07 — Admin`, `08 — Officer`, `09 — Technician`, `10 — Prototype`, `98 — Codex Working Area`, `99 — Archive`.

Jangan mengubah frame berstatus **Approved** tanpa instruksi eksplisit. Jangan membuat file Figma lain. Layar yang sudah dibangun memakai frame, teks, bentuk, Auto Layout, warna variable, dan instance Button native; tidak ada screenshot layar penuh sebagai hasil akhir. Banyak pola/variant lanjutan di bawah masih merupakan target pengembangan, bukan klaim selesai. Ketiga komponen Patterns dan varian Badge/Input masih sederhana dan belum dipakai ulang secara menyeluruh sebagai instances pada 46 frame.

## Foundations

| Token semantik | Nilai awal |
|---|---|
| Color / Action / Primary | `#2563EB` |
| Color / Status / Success | `#16A34A` |
| Color / Status / Warning | `#F59E0B` |
| Color / Status / Danger | `#DC2626` |
| Color / Background / Default | `#F8FAFC` |
| Color / Surface / Default | `#FFFFFF` |
| Color / Text / Primary | `#0F172A` |
| Color / Text / Secondary | `#64748B` |

Gunakan Inter atau Plus Jakarta Sans. Spacing: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Radius: `6, 8, 12, 999`. Buat text styles untuk display, heading 1–3, body, label, caption; atur grid 12 kolom desktop dan margin responsif mobile. Buat aturan shadow dan iconography memakai satu gaya outline konsisten.

## Components dan variants

- Button: Primary, Secondary, Outline, Ghost, Destructive × Small, Medium, Large × Default, Hover, Pressed, Focus, Disabled, Loading.
- Input/Textarea/Select/Search/OTP: Default, Focus, Filled, Error, Disabled.
- Badge / Ticket: New, Open, In Progress, Pending, Selesai, Archived.
- Badge / Priority: Low, Medium, High, Critical.
- Badge / Service dan Badge / Account: Aktif/Nonaktif sebagai keluarga **terpisah**.
- Card, MetricCard, ServiceCard, TicketCard, Table, Pagination, Tabs, Timeline, Sidebar, Topbar, Breadcrumb, Modal, ConfirmationDialog, Toast, Alert, FileUploader, EmptyState, ErrorState, LoadingSkeleton.

Gunakan Auto Layout, Hug Contents, Fill Container, dan fixed width sesuai konteks. Layar memakai component instances; jangan detach tanpa alasan. Nama contoh: `Button / Primary / Medium`, `Badge / Ticket / Open`, `Admin / Ticket Detail / Desktop`.

## Patterns

`Dashboard / Filter Bar`, `Dashboard / Metric Group`, `Ticket / List Item`, `Ticket / Mobile Card`, `Ticket / Timeline`, `Ticket / Progress Form`, `Ticket / Technician Assignment`, `Customer / Table Toolbar`, `Customer / Detail Header`, `Service / Detail Header`, `Map / Location Popup`, `Voucher / Stock Card`, `Import / Validation Result`, `Auth / Login Form`, `Auth / OTP`.

## Responsive dan prototype

Frame acuan: desktop 1440, tablet 768, mobile 390. Admin/Officer desktop first; Client responsif; Technician mobile first. Minimum target sentuh 44 px, focus terlihat, label form jelas, status tidak hanya mengandalkan warna. Koneksi prototype: Navigate To untuk route, Open/Close Overlay untuk dialog, Change To untuk variant, Back untuk kembali. Detail alur ada di [USER_FLOWS.md](USER_FLOWS.md), daftar frame di [FIGMA_SCREEN_INVENTORY.md](FIGMA_SCREEN_INVENTORY.md).

## Pertanyaan UX tersisa

Definisi SLA/prioritas, copy dan kontak resmi, skema import, KPI final, perangkat utama teknisi, dan rincian penugasan multi teknisi perlu validasi. Lihat [ASSUMPTIONS.md](ASSUMPTIONS.md).
