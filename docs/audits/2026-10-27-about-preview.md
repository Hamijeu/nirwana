# About preview and public layout revision

Rollback: checkpoint #019, created before this revision batch. No deployment or push.

- Added a floating About preview in the company navigation, with a link to the full page, outside dismissal and Escape focus restoration.
- Added full About page entry and scroll reveals, respecting reduced motion.
- Removed the About intro kicker and audience icon row.
- Added photos for usage and installation, plus a local demo portal screenshot for monitoring.
- Split the main closing calls to action into adjacent navy and soft panels on desktop, stacked on narrow screens.
- Centered the company name, heading and logo beside the main gallery.

Verification: 55 Node tests passed; Vite production build passed. Playwright checks passed for preview navigation/dismissal, centering, split layout, scroll reveal, reduced motion, mobile widths 320/390, dark mode, image loading, and contact message preparation.
