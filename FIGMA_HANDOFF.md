# Figma Native Handoff

Target file yang diminta: [Nirwana](https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?t=fDeAJLcIT1RQeujJ-1). File ini harus menjadi sumber desain. Editor target telah diperiksa: page awal kosong, lalu dibuat `00 — Cover & Notes`, `01 — Foundations`, dan `02 — Components`. Ketiganya belum berisi sistem desain atau layar native. Saat menambah page keempat, Figma menampilkan batas paket Starter: tiga page per file. Integrasi Figma native belum tersambung. **Status desain: parsial, belum siap untuk handoff editable.**

## Struktur workspace target

1. `00 — Cover & Notes`: tujuan, asumsi, status review.
2. `01 — Foundations`: token, tipografi, grid, ikon, responsivitas.
3. `02 — Components`: komponen dan variants.
4. `03 — Patterns`: blok UI lintas layar.
5. `04 — User Flows`: enam alur inti.
6. `05 — Public & Auth`, `06 — Client`, `07 — Admin`, `08 — Officer`, `09 — Technician`: frame per role.
7. `10 — Prototype`: koneksi antar frame dan overlay.
8. `98 — Codex Working Area`: eksperimen/duplikat sebelum revisi besar.
9. `99 — Archive`: versi lama setelah review.

Jangan mengubah frame berstatus **Approved** tanpa instruksi eksplisit. Jangan membuat file Figma lain. Semua layar harus berupa frame, teks, bentuk, komponen, dan instance native yang dapat diedit; jangan menggunakan screenshot atau SVG tunggal untuk layar penuh.

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
