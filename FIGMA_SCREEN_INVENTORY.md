# Figma Screen Inventory

Target: https://www.figma.com/design/9US6c0r5wmKyUDaWtta59T/Nirwana?t=fDeAJLcIT1RQeujJ-1

Status: **inventory target**. Tiga page dan 13 Sections sudah dibuat di file target. Baris di bawah adalah target frame editable, belum klaim bahwa seluruh frame sudah dibuat. Paket Starter membatasi file ini pada tiga page, sehingga label `05` sampai `09` merujuk pada Sections di page `02 — Screens & Flows`.

| Page | Frame target | Route referensi | Ukuran |
|---|---|---|---|
| 05 — Public & Auth | Landing Desktop, Landing Mobile | `/` | 1440, 390 |
| 05 — Public & Auth | Login, Forgot Password, OTP, New Password, First Login | `/login`, `/forgot-password`, `/reset-password`, `/first-login` | 1440, 390 |
| 06 — Client | Dashboard Desktop, Dashboard Mobile | `/client/dashboard` | 1440, 390 |
| 06 — Client | Services, Service Detail, Tickets, Create Ticket, Ticket Detail, Profile, Help | `/client/*` | 1440, 390 |
| 07 — Admin | Dashboard, Customers, Customer New, Customer Detail, Services, Service New, Service Detail | `/admin/*` | 1440 |
| 07 — Admin | Tickets, Ticket Detail, Map, Voucher, Import/Export, Users & Access, Settings | `/admin/*` | 1440 |
| 08 — Officer | Dashboard, Customers, Customer Detail, Services, Service Detail, Tickets, Ticket Detail, Map, Voucher, Import/Export | `/officer/*` | 1440 |
| 09 — Technician | Dashboard, Tickets, Ticket Detail, Map, Voucher, Profile | `/technician/*` | 390 |

## State yang perlu frame/variant

- Ticket: New, Open, In Progress, Pending, Selesai, Archived, empty.
- Map: Loading, Loaded, Failed, No Coordinate.
- Import: Upload, Validation Error, Validation Success, Preview, Confirmation, Success.
- Forms: Default, Focus, Error, Disabled, Success.
- Modal: assignment, voucher correction, archive confirmation, account status confirmation.
- Responsive: Client dan landing desktop/mobile; Admin/Officer desktop dengan tablet fallback; Technician mobile utama.
