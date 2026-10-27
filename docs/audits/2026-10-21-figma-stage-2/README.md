# Stage 2 — Foundations and reusable components

Status: IN PROGRESS. This checkpoint is not approval to start Stage 3.

## Baseline and method

- Figma file: 9US6c0r5wmKyUDaWtta59T, existing three pages preserved.
- Web baseline: main commit 141ddff2637ecbdeb1e5f590950a8c123f771501.
- Figma MCP inventory call was blocked by Starter tool quota. Existing Scripter plugin failed to load its environment; no script ran. Changes were made through native Figma browser UI.
- No website code edits, commits, or pushes in this stage.

## Completed and visually checked

| Asset | Node | Result |
|---|---|---|
| Badge / Review | 397:312 | Six native variants: Menunggu Review, Disetujui, Tidak Wajib × Light/Dark. Auto Layout, editable text, radius variable retained. |
| Badge / Publication | 397:347 | Six native variants: Belum Terbit, Terbit, Administratif × Light/Dark. Separate axis from review. |
| Review specimen | 397:330 | Six connected instances, all properties checked visually. |
| Publication specimen | 397:360 | Six connected instances, all properties checked visually. |

New main sets are located in Components section at x40 and x672, y14800. Specimens are at y15100. Original service badge components were preserved.

### Foundations

Verified live collections: Nirwana / Color, Nirwana / Dark, Nirwana / Dimension, Nirwana / Primitive. Existing semantic-to-primitive aliases were present.

Added six semantic workflow tokens and six matching primitive tokens. All six semantic values were aliased through the native variable editor:

| Collection | Token | Primitive |
|---|---|---|
| Color | Color/Workflow/WaitingText | Palette/855600 |
| Color | Color/Workflow/WaitingSurface | Palette/FFF4DD |
| Color | Color/Workflow/ApprovedSurface | Palette/EAF1FF |
| Color | Color/Workflow/ApprovedText | Palette/2459BB |
| Dark | Color/Workflow/ApprovedSurface | Palette/203C66 |
| Dark | Color/Workflow/ApprovedText | Palette/ADCCFF |

Waiting light and approved light/dark fills and text were bound to these semantic tokens in both new main component sets. Native property output confirmed each binding and resolved hex. Dark waiting retained existing matching warning tokens. Neutral states retain background/secondary text tokens.

Collection counts after additions: Color 31, Dark 29, Dimension 18, Primitive 51.

## Verification evidence

- review-specimen.png and publication-specimen.png: native Figma canvas, all six connected instances per family.
- Corresponding .ax.txt snapshots: selected specimen dimensions and native frame structure.
- Each specimen is 592 × 140 with six 160 × 26 instances. Native label style is inherited Nirwana/Label/Badge 10/14. Exact web typography reconciliation remains open; this is not a pixel parity claim.

## Remaining Stage 2 work

1. Reconcile badge typography against .pm-status and confirm documented token scopes/code syntax as useful.
2. Account/auth states, review action controls and form feedback.
3. Nira launcher, panel, bubbles, prompts, draft-to-form and staff review states.
4. Composed navigation for public, client, operations and technician.
5. Filter/stat/service/pricing/ticket/table/timeline patterns, dialogs and empty/error/loading states.
6. Verify existing components before reusing them; final component inventory and instance proofs.

Full page migration and prototype parity belong to later stages. Pending official pricing, privacy decisions and unsupported business flows remain flagged in Stage 1 rather than invented here.

## Continuation — 22 October 2026

Status remains IN PROGRESS. MCP quota is still blocked; edits used native browser UI.

- Added `Badge / Account` component set **402:324**, cloned from Review without changing the source set. Six variants: Account=Aktif/Belum Aktif/Nonaktif × Theme=Light/Dark. Aktif uses semantic SuccessSurface and SuccessText in each collection; Belum Aktif retains waiting tokens; Nonaktif retains neutral tokens. Native editable labels and radius bindings retained.
- Added **403:324**, `Stage 2 / Account / Specimen`, six connected account instances. Checked all labels and light/dark appearances in account-specimen.png. Located x1304/y15100, 592×140.
- Added **404:330**, `Stage 2 / Review Actions / Specimen`, six connected instances of the existing Button set. Three labels from TicketWorkflow.jsx: Setujui & terbitkan, Setujui administratif, Simpan catatan, each Light/Dark. First two use Primary; last uses Secondary. Show icon=false; labels use auto width to prevent wrapping; Button text style retained. Width240, height43, positions32/296/560 and32/99. Specimen832×174 at x1936/y15100.
- Final visual check confirmed all six review labels fit in one line, no overlap or clipping; screenshot and AX evidence saved. A UI batch timed out mid-edit; the canvas was read before finishing the remaining items and verifying the final layout.
- Existing Button variants remain intact; no new duplicated button family was created.

Remaining: complete review form composition and validation messages, account authentication feedback, Nira components and remaining prior checklist. New assets are not yet integrated into full screens or prototype links. No web code changes or git push.

### Review form continuation — 22 October 2026

- Built native main component **406:385**, `Pattern / Review Form / Inactive Validation / Light`, at x2808/y15100. Existing Select, Textarea and Button instances are retained inside it. Original control families remain unchanged.
- Added connected review instance **406:386** at x3252/y15100, outside the main component. Final size404×698, vertical Auto Layout,32px padding,16px gap, Hug height. Screenshot and AX saved as review-form-validation-light.*.
- Includes heading, explanatory copy, priority placeholder, conditional Nonaktif follow-up placeholder, reason textarea, exact workflow validation message, approval and save-note actions, and the note that saving does not unlock technician access.
- Source: TicketWorkflow.jsx review panel and workflow.js approval validation. This is the light validation example only. It does not show opened dropdown options, technical/administrative selected states, normal/no-error state or dark theme yet. It has no prototype interactions yet.
- Visual checks repaired placeholder text, long-text typography, padding, layout and button placement. Final screenshot shows all content without overlap/clipping. Error text is bound to Color/Status/DangerText in Nirwana / Color; copied heading/body text styles and existing control token bindings retained.
- Pending QA: bind new container spacing/radius values where applicable, normalize copied internal layer names, verify all text styles structurally, then create normal, selected administrative, and dark counterparts. Do not mark Stage2 complete.
- No site source modifications or git push.

### Normal and administrative examples — 22 October 2026

- Added connected instances of406:385: **412:392** `Stage 2 / Review Form / Normal / Light` at3696/15100; **412:421** `Stage 2 / Review Form / Administrative / Light` at4140/15100; **412:456** `Stage 2 / Review Form / Administrative / Dark` at4584/15100. Each404×698, vertical Auto Layout, retained control instances and text styles.
- Normal example has placeholders, visible explanatory footer and hidden error message.
- Administrative examples show MEDIUM, Tindak lanjut administratif, an illustrative reason in the textarea, Setujui administratif, Simpan catatan, visible footer and hidden error. They demonstrate the form before submission, not a published ticket or real decision.
- Dark example swaps all three nested controls and both Button instances to Theme=Dark. Root Surface/Default, heading Text/Primary, description/footer Text/Secondary are bound to Nirwana / Dark semantic variables. Returned native property reads confirmed #141F32, #E3EBF8, #A6B5CC. Nested text contents were preserved after swaps.
- Final visual checks corrected a reason-text override and visibility of footer/error before screenshots. Captured review-normal-light.png, review-administrative-light.png and review-administrative-dark.png; AX evidence saved for normal and dark. All visible text fits without overlap/clipping.
- These are instance overrides, not new component-set axes. Generic main406:385 is preserved. No prototype dropdown interactions or submission links added. Theme/state axes, spacing variable bindings and internal layer-name normalization remain pending component QA.
- Stage2 overall remains IN PROGRESS; account authentication feedback and Nira remain. No web edits or git push.
