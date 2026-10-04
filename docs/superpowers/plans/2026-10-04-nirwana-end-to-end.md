# Nirwana End-to-End Implementation Plan

> **For agentic workers:** Implement in the existing React/Vite app. Review each verified outcome before moving to the next section.

**Goal:** Deliver an interactive frontend prototype, publish source to the existing GitHub repository, and build an editable native design in the specified Figma file when connected.

**Architecture:** Keep the current React/Vite application and CSS system. Isolate domain rules from UI, keep demo data local, and use the current History API navigation. Git is initialized inside the application folder to avoid unrelated files in the parent workspace.

**Tech Stack:** React 19, Vite 6, JavaScript, CSS, Lucide React, Node test runner.

## Global Constraints

- Use only `https://github.com/Hamijeu/nirwana` and the specified Figma file.
- Do not add billing, payment, invoices, prices, tax, chatbot, inventory, router configuration, or network monitoring.
- Treat all data and copy not confirmed by stakeholders as assumptions.
- Never claim Figma native completion without inspecting editable native layers.

## Task 1: Frontend domain and missing screens

- [x] Add failing tests for lifecycle, voucher permissions, and CSV validation, then implement rules in `src/domain.js`.
- [x] Add auth, customer, service, and technician profile screens in `src/ExtraPages.jsx`.
- [x] Connect required routes in `src/main.jsx`; check every route in the browser.

## Task 2: Operational interactions

- [x] Connect ticket transitions, archive state, forms, voucher modal, user actions, and CSV import/export.
- [x] Check Client, Admin, Officer, and Technician flows in the browser.
- [ ] Add a complete component library, all empty/loading/error variants, and richer map states after design review.

## Task 3: Documentation and repository

- [x] Add README, audit, roles, flows, assumptions, Figma handoff, and inventory.
- [ ] Run clean install, tests, and build; initialize Git in the app folder, commit, and push to the existing repository if authentication works.

## Task 4: Native Figma design

- [ ] Connect Figma integration and inspect the exact target file, existing pages, and Approved frames.
- [ ] Create foundations, native components/variants, patterns, screens, and prototype flows in that file.
- [ ] Verify layer editability, Auto Layout, instances, and prototype connections before declaring Figma ready.
