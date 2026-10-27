# Company Profile and About Content Implementation Plan

> For implementation: execute sequentially in the current local checkout. User approved the previous placement proposal, with the current About gallery kept first.

**Goal:** Adapt the approved beta sections to main and About pages, preserving the current hero, packages and original About gallery.

**Architecture:** Shared content and contact configuration support a compact main page and fuller About page. Reuse existing local and mirrored reference photos, labelled as illustrative when appropriate. Contact channels, statistics, client logos and coverage facts must be confirmed before being presented as official.

**Tech Stack:** React 19, Vite 6, CSS, Node tests and Playwright browser checks.

## Constraints

- Snapshot #016 is the pre-change rollback; main checkpoint #010 remains available.
- Preserve first About gallery, hero scroll behavior, package data, demo comparison and operational routes.
- No unconfirmed numeric claims, institution logos, working coverage map, automatic sending or deployment.

## Tasks

- [x] Add meaningful browser checks for gallery-first layout, added images, timeline selection, main-to-About consultation handoff, contact validation and responsive overflow.
- [x] Add main summary, replace the old subscription steps with a concise navy timeline and interactive image panel; add location consultation, portal and brief contact actions.
- [x] Keep gallery first on About and add an expanded profile, service approach, illustrative network imagery and contact section. Reuse shared local channels once confirmed; otherwise prepare a clearly labelled message preview without sending.
- [x] Test main/About at desktop and 390/320 mobile, dark/reduced-motion, image loading and keyboard navigation. Run existing tests/build and verify package/beta files unchanged.
- [x] Record final scope, confirmation status, evidence and local review URLs.
