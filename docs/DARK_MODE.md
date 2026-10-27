# Dark mode — 20 October 2026

## Web
- Global moon/sun toggle beside Mode demo, with an accessible label, pressed state and visible keyboard focus.
- Navy background #0c1424, surface #141f32, text #e3ebf8, secondary text #a6b5cc, blue links #8bb4ff and button #316bd7.
- Initial theme follows the device. Explicit light/dark choice is stored under nirwana-theme. Storage failure does not prevent switching.
- Startup script sets the theme before the app renders; native form controls use the corresponding color scheme.
- Palette covers public profile, auth and all workspace shells, tables, forms, statuses, charts and illustrative maps.

## Verification
- 9 Node tests pass, including preference precedence, restoration and blocked-storage handling.
- Vite production build succeeds.
- Browser: toggled both directions; reloaded and confirmed saved light preference; navigated between roles with dark preference retained.
- Visually reviewed Client and Admin dashboards, public landing and login at desktop size; public landing and Technician dashboard at 390px width. Mobile review showed no horizontal overflow.
- Desktop and mobile preview PNGs are under docs/previews/.

## Figma
- Created 16 dark palette variables in Nirwana / Dark, preserving Starter-compatible single-mode collections and the existing three pages.
- Added section 11 — Theme / Light & Dark (340:346).
- Editable previews: Client Dashboard 340:347, Login 340:464, Admin Customers 340:504.
- Six toggle reactions connect those three previews to their original light frames and back; targets verified through Plugin API. Prototype pointer clicks have not been separately tested.
- Remaining Figma screens do not yet have dark variants. Existing full-web parity work remains incomplete.

Published to GitHub Pages on 20 October 2026 in commit 4c4587a. Actions run 39362034590 succeeded. Verified the live toggle in both directions and dark preference after refresh at https://hamijeu.github.io/nirwana/#/client/dashboard.

