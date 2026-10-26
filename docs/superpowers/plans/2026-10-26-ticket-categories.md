# Ticket categories implementation plan

**Goal:** Add a category selector immediately after the affected service for both reporting modes; retain category in submitted tickets and expose it on cards, details and a status-compatible list filter.

- [ ] Checkpoint ZIP #008 (created before edits).
- [ ] Add shared category labels, validation and filtering with legacy fallback; verify Node tests.
- [ ] Add required selector to ReportComposer; reset on service change, clear confirmation on edit, keep manual selection in Nira mode.
- [ ] Show category in cards/details and add list filter plus empty state.
- [ ] Build and verify local desktop/mobile, submission, validation, Nira toggle and combined filtering.
- [ ] Commit only scoped files with Hamijeu identity; push and verify deployment.
- [ ] Update existing Figma report/list/detail frames with checkpoint, keeping old progress. Continue remaining parity work after category synchronization.
