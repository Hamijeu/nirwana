# Document revision implementation plan

Approved spec: ../specs/2026-10-26-document-revisions-design.md.

Goal: complete primary document and screenshot revisions in existing React/Vite modules, retaining local simulation and current styling. App owns tickets and voucher ledger; pure domain functions validate transitions, access and audit history.

Constraints: use current codex/public-portal-redesign checkout; verified rollback #009; preserve unrelated changes; no Git push. Supporting document contents must be verified before assuming staff review exceptions.

- [x] Add failing ticket-domain tests for optional categories, conservative suggestions, audited edits, staff service ownership, archive authorization and missing timestamps; implement and rerun.
- [x] Integrate Client category proposals/confirmation, staff category review, timing, staff composer, archive list and guarded App callbacks.
- [x] Complete login/OTP/password states, phone editing and duplicates, workload warning, public portal copy/navigation with focused tests.
- [x] Add role-checked voucher ledger with types, positive integer stock changes, immutable linked corrections and tests; lift ledger into App.
- [x] Add common service map with consistent filters, status legend, filtered missing-coordinate list and derived popup selection.
- [x] Run all Node tests and production build after integration. Exercise Client/Admin/Officer/Technician flows, direct route denials, desktop/mobile and themes.
- [x] Review implementation against acceptance criteria; record evidence and remaining source limitations in audit document.
