# Public and Portal redesign implementation plan

Goal: implement the approved minimal premium design on local company and portal pages only.
Architecture: preserve React routing, login/activation, plan data and demo feedback. Introduce a shared public header/footer and scoped public-design.css to avoid changing workspace screens.
Stack: existing React19, Vite6, Lucide and CSS. No new dependencies. Branch codex/public-portal-redesign; no commit or push before user review.

- [x] Source and save a relevant optimized lifestyle photograph locally; record source and photographer.
- [x] Build shared PublicHeader/PublicFooter with route-aware links, mobile menu and theme toggle; company has one Portal CTA, portal access action stays in hero.
- [x] Revise Landing.jsx to split editorial hero, restrained photo and existing Pricing, followed by compact about/help.
- [x] Revise PortalLanding.jsx to split explanation/access panel, compact three-step guide and preserved load-error/retry simulation.
- [x] Add page-scoped palette, typography, layout and responsive Light/Dark styles. Restyle plan cards without changing prices or features.
- [x] Run npm run build; inspect desktop/mobile Light/Dark, image loading, both pricing tabs/dialog, menu, login/activation routes and portal failure/retry. Fix observed issues, save visual evidence and report local URLs. Leave workspace and Figma untouched.

