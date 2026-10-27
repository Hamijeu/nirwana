# Local public redesign verification — 25 October 2026

Approved direction: minimal premium combining the supplied Apple/BMW/Vodafone analysis references with Nirwana branding. Local only; no commit/push. Branch codex/public-portal-redesign.

Changed app files: src/Landing.jsx, src/PortalLanding.jsx; new src/PublicChrome.jsx, src/public-design.css. Existing plan data, prices, auth pages, Client/staff and Figma untouched. Previous unrelated handoff/audit changes preserved.

Asset: public/images/home-workspace.jpg (178832 bytes), George Milton/Pexels7015115. Local BASE_URL path verified in production preview /nirwana/. Credit in image caption and public/images/CREDITS.md. Illustrative lifestyle photo, not presented as Nirwana personnel or premises.

Verified:
- npm run build: success,1602 modules, final build2.93s.
- node --test src/routing.test.js src/theme.test.js:6 passed,0 failed.
- Desktop1440: both pages, Light/Dark, photo and NAT logos loaded; home4plans, business3plans and existing prices/custom offer.
- Business Custom consultation opens existing simulation dialog; no message sent.
- Portal login click -> /login heading Masuk ke akun Anda; activation -> /first-login heading Verifikasi akun Anda. Existing recovery link remains on login.
- Portal demo failure -> Belum bisa terhubung; Coba Lagi restores normal hero.
- Mobile390: both themes/pages inspected; menu opens/closes; guide link closes menu; pricing category verified with native AX checked state and Business Start/Pro/Custom content.
- Layout320,390,768,1440: no document horizontal overflow in company/portal.320 company oversized-element scan empty.
- Production preview http://127.0.0.1:5174/nirwana/#/portal: Panduan layanan leaves URL unchanged, retains portal heading and closes menu. Company hero link similarly preserves /nirwana/#/; photo loaded. Business plans3verified in production DOM.
- Demo floating control adjusted only for .feedback-root containing public-redesign:16px bottom instead of workspace69px mobile, confirmed computed style.
- git diff --check: no whitespace errors (line-ending warnings only).

Screenshots in this directory include company-desktop-light.jpg and portal-desktop-light.jpg as final desktop evidence; mobile and dark screenshots taken during responsive QA. Browser is returned to local company page. Prices remain illustrative; official contacts unavailable. Real backend/AI not added. GitHub publication awaits user review and explicit push request.

## About page visual revision
Replaced the previous oversized introductory heading and full-width navy band with a single photo/story split, shorter copy, a restrained audience row, and balanced portal/contact columns. Contact availability remains truthful. Only AboutPage.jsx and About-specific CSS changed in this revision. Build passed(1603modules,2.91s). Browser verified desktop1440 Light/Dark; mobile390 Light/Dark;320 no horizontal overflow. One theme control and loaded local image confirmed. Browser initially served an intermediate stylesheet; a fresh CSS update resolved it and final grid layout was visually verified. Proof: about-desktop-light-v2.jpg, about-desktop-dark-v2.jpg, about-mobile-light-v2.jpg, about-mobile-dark-v2.jpg. No commit/push.
