# Auth and workspace visual rollout — 25 October 2026

Scope: local web only; Figma remains paused and Git push awaits user approval. Branch codex/public-portal-redesign. Shared visual direction remains the approved Apple/BMW/Vodafone-inspired Nirwana design, without third-party logos/proprietary fonts.

Implemented:
- AuthPages: public header, split editorial introduction and account panel; Login/Register tabs with animated underline and keyboard arrow switching. Login retains existing demo validation/account states/recovery/activation.
- RegisterForm: requested new-customer registration UI. Name, Indonesian phone, password8–128 and confirmation validated. Explicit local simulation; no account created, no credentials/profile data stored or sent. Existing customer activation remains separate.
- Recovery/activation: top Kembali ke login appears only before requesting OTP; hidden at code and password steps; final success retains necessary login action. Existing OTP/retry/expiry behavior preserved.
- Header theme single instance, no floating duplicate; mobile demo control moved into document flow on auth pages to avoid covering fields.
- PublicHeader auth navigation routes to portal guide/help using section query; production hash route verified.
- workspace-design.css applies restrained typography, blue/navy hierarchy, clear header/gray sidebar, consistent cards/forms/tables across Client/Admin/Officer/Technician. Preserves semantic status colors and business workflow. Searchbox nested border corrected. No ticket/customer/service logic changed.

Verification:
- Final npm run build succeeds:1607modules,3.21s.
- node --test:31passed,0failed. New registration validation test first failed because missing implementation, then3cases passed.
- git diff --check -- src: clean.
- Browser: Login/Register underline switches and keyboard ArrowLeft selects Login; blank Register error and valid synthetic registration success; synthetic wrong login error; demo login reaches Client.
- Recovery: back-link count before code1, after code0, password step0. Activation code step0backlinks.
- Desktop1440 Light/Dark: Login/Register, Client dashboard, Admin dashboard, Officer dashboard, Technician dashboard; list/form/card specimens inspected.
- Additional desktop routes with expected heading and no horizontal overflow: Admin service create, tickets, import, map, vouchers, users, settings.
- Mobile390: auth Light/Dark, Technician dashboard, Admin dashboard/customers/service create, Officer dashboard, Client dashboard/services/tickets/report composer no horizontal overflow. Login320 no horizontal overflow, one theme control.
- Production preview /nirwana/#/login -> Panduan layanan preserves /nirwana/#/portal?section=panduan and renders portal guide.
- Screenshots stored in this directory, especially login-desktop-light.jpg, register-desktop-light.jpg, client-desktop-light.jpg, admin-desktop-light.jpg, officer-desktop-light.jpg, technician-desktop-light.jpg and mobile samples.

Limits: this is UI/prototype registration only. No real self-service registration backend, OTP service or authentication persistence added. No exhaustive workflow re-test of every individual data-detail screen; shared styles exercised across representative roles and route families plus existing31unit tests. No commit/push.

## Revisi tab aktivasi dan navigasi
- Register dan form pendaftaran mandiri dihapus; Login / Aktifkan akun langsung membuka aktivasi nomor terdaftar.
- Tautan navigasi footer dan Bantuan di header dihapus; bantuan akses berada di panel portal/login/aktivasi.
- Browser desktop dan mobile 390px diperiksa; OTP simulasi mencapai langkah password tanpa navigasi kembali.
- Verifikasi terbaru: npm run build sukses; node --test 28 lulus, 0 gagal; git diff --check -- src bersih.
- Lokal saja, belum commit/push. Screenshot: activation-panel-revised.jpg dan portal-access-help-revised.jpg.

