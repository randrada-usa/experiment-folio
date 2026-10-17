# Implementation plan — Experiment Folio

## Approved direction

2026-10-16 update: replace the scrolling homepage contact form with a two-column certificate preview (ten cards), keep contact inquiry in the menu, and correct footer link hover/marquee behavior. The later 2026-10-17 decision below supersedes the external certificate collection/details destination once the local page is verified.

### 2026-10-17 — Full certificate collection/details plan and completed stages

The user chose one local page for every certificate they have, with search and filtering. The reference for credential content/hierarchy is Rey's existing `devbyrey.me` certificate detail template; Kala is a motion/layout influence, not a source of certificate details. The October 16 homepage and footer implementation remains intact until the complete local page passes browser checks.

**Route and inventory.** Use one real `/certifications/` entry point, not separate detail URLs. The currently inspected portfolio data has 27 certificate records and five categories; refresh that inventory before migration so “all” means all current owned certificates. Each record has a stable `#slug` target. Keep the homepage's ten-card preview, but send those cards to matching local anchors and “View all certs” to `/certifications/` only after the full page and its assets work on direct load. The original portfolio remains an optional source/verification link, not the primary browse destination.

**Content and design contract.** Maintain one typed certificate data source for all verified records (title, issuer, category, year, description, slug, image). Bring over the 17 images missing from this repository if the source inventory remains at 27. Preserve aspect ratios, use lazy loading below the fold, and do not add unsupported credential numbers, dates or claims. Use the showcase's theme-aware shell with a source-inspired hierarchy: collection heading and controls → filtered index/count → detail sections with issuer/category, title, description/metadata and large image → related same-category links → shared footer. The local dark/purple-red treatment is an intentional adaptation, not a pixel reproduction of the light source page.

**Search/filter contract.** Search title, issuer and description with case-insensitive, trimmed matching. Category buttons/select offer All and the five verified categories; search and category combine. Index entries and detail sections derive from the same filtered list. Show accurate result count, clear/reset and an accessible no-results message. Selecting an index item updates the hash and lands with a fixed-header offset. A direct hash load must reveal the targeted certificate even if session filters would hide it. Keep controls keyboard/touch operable, avoid unexpected scroll jumps when filtering, and test focused elements that become hidden. No external search service or dependency is needed.

**Stage C0 — Motion/content reinspection and routing proof.** Reopen representative existing detail pages at 1440×900 and 390×844. Exercise loader/entrance, back target, related-item hover/click and reduced motion; time visible motion rather than inferring from stills. Reconcile the full source inventory, all image assets and five category labels. Prove `/certifications/` direct loading in the local static build and map every shell destination (header, menu, footer, progress/Skip). Record observations in REFERENCE_SPEC.md before writing page code.

**Stage C1 — Collection shell and first detail.** Add the page entry, collection heading/control layout, and the first certificate's title/meta/image/return link. Run the development server. Compare desktop and phone browser render against the source's hierarchy and local portfolio language at matching viewport widths; correct spacing, wrapping, ratio and image quality. Check keyboard focus and a direct hash/URL reload before extending the template. Commit this verified milestone separately.

**Stage C2 — Full inventory, search and filters.** Add every remaining verified certificate and its owned image, plus same-category related links. Implement the combined search/category behavior, result count, reset and empty state. Reinspect a source page with a different category/long title first. Validate all images, titles, years, destinations and responsive wraps; test query combinations, deep-link reveal, forward/reverse navigation and browser Back/Forward. Make anchors land below the fixed header and avoid 27 simultaneous animation timelines. Commit only after browser comparison.

**Stage C3 — Motion and integration.** Inspect source entrance/hover motion again. Implement only observed or explicitly approved adapted effects, compare moving browser states (trigger, direction, duration, settling) and test reduced motion. Then repoint the homepage cards and “View all certs” to the complete local page. Generalize the current `projectPage` shell logic into explicit page identity/destinations so certificate navigation does not inherit project-specific bottom continuation or wrong contact targets. Check menu, shared cursor, footer, both themes and touch-width behavior. Commit the integrated stage.

**Stage C4 — Regression and handoff.** Build/typecheck/tests, full inventory/asset audit, all search/filter combinations, direct loads, deep-link refresh, 1440×900/390×844 plus breakpoint and 320px overflow, image decode/lazy loading, hover/focus/touch, reduced motion, repeated hard reload and Back/Forward. Recheck homepage certificate section and projects page for regressions. Update both documents with pass/fail evidence, intentional differences and remaining limits; make a focused documentation/repair commit. Push/deploy only on explicit request.

Current status: C0–C4 complete within the browser coverage and limitations below. No push or deployment performed.

#### Certificate implementation ledger — 2026-10-17

- C0: source inventory reconciled to 27 records, five categories and 27 matching owned WebP images. Copied only the 17 missing assets, preserved source wording/slugs/order, and recorded intrinsic dimensions to reserve image space before lazy loading. Source portfolio remains unchanged.
- C1: built the real `/certifications/` entry, collection introduction and first detail. Production build/typecheck passed. Revisited live Data Analyst Associate at desktop and SQL Associate at 390×844; the source uses a static uncropped document, split desktop metadata and stacked phone metadata. Local first detail retains that hierarchy in the showcase theme. Browser checked local desktop 1440×900 and phone 390×844: no horizontal overflow, first image decoded; direct hash reload landed approximately 120px below the top and focused the detail. The title, monospace typography, colors and collection introduction are intentional adaptations.
- Source loader and related-page navigation were observed, but exact entrance timing was not measured. No new decorative entrance animation or reference timing parity is claimed. Shared smooth scrolling remains subject to C3 moving-browser checks.
- C2: all 27 detail sections, a searchable index, five category filters plus All, count/reset/empty states and same-category related links implemented. Search/filter state is in the URL; hash navigation reveals a hidden related certificate, and Back restores the prior search/category. Browser checked DataCamp search (5), DataCamp + Cloud & Development (1), no results (0), reset (27), Software & Tools (2), and its one available related item. Keyboard navigation to GitHub Foundations at 390×844 focused its detail at approximately 120px, loaded the image and showed no horizontal overflow. Python detail smooth jump was observed in motion and settled near 120px. Eleven tests pass, covering the full asset inventory, canonical slugs, search combinations and URL filter parsing. Integration and final production regression remain pending.
- C3: introduced explicit home/projects/certificates navigation. Homepage cards, both full-collection CTAs, menu and footer use the local page. The next-page sequence is home → projects → certificates → homepage contact. Browser exercised the homepage SQL card, View all certs, menu Projects, projects header Certificates, and certificate footer continuation to contact; Back returned to visible content at root opacity 1. Existing ten-card preview and six project sections remain. No dependencies added.
- C4 production checks: all 27 records match the source field-for-field and all 27 asset hashes match; every certificate was visited in the browser and its image decoded. All five category counts checked (4/6/8/2/7), description search/reload checked, conflicting query/hash recovered to the requested certificate. Inspected 1440×900, 390×844, 320×800 and 760/761 boundaries with zero document overflow. Three phone detail reloads retained its query and settled at 120px with loaded media. Red/purple themes, menu close/return, local reduced motion and footer rendering checked. Captured console warnings/errors empty. Build/typecheck, eleven tests, format check and whitespace checks pass.
- Motion evidence: index activation moved the detail top from ≈971px at79ms to566 at182ms,335 at280ms,237 at372ms,171 at455ms and144 at536ms, finally120px; focus followed the detail. Pointer hover matched the existing local row treatment (gray, italic accent,10px inset) with140/180/100ms CSS transitions. Reduced motion has no smoothing/trail or row transitions. Exact source entrance timing is not claimed; static certificate images have no added tilt/parallax.
- Repairs during verification: removed unintended programmatic focus/outline on a plain collection load, kept focus for real deep links, and raised phone search text to16px with12px category labels. Rechecked phone/320px wrapping after the change. Images reserve intrinsic dimensions; full-page lazy-load audit found no missing assets.
- Final Back/Forward check restored the selected certificate hash, target focus and loaded image at≈120px. Remaining differences/limits: this is a new searchable long collection in the showcase theme, not the original site's separate light detail routes. Original image resolution may soften at desktop scale. Physical touch, Safari/Firefox and OS-level reduced-motion switching were not tested. Local viewport tests are not device certification. Evidence saved in ignored `artifacts/certificates-collection-desktop.jpg` and `artifacts/certificates-detail-phone.jpg`.

### 2026-10-16 — Certificate and footer iteration completed

1. **Reinspect:** exercised Kala's pinned introduction/form scroll and footer pointer hover; compared desktop 1440×900 and phone 390×844 layouts. Recorded measured row styling in REFERENCE_SPEC.md.
2. **Certificates:** copied ten unchanged public certificate images from CleanPortfolio, preserved source array ordering, replaced the homepage form, updated heading/copy and both full-collection CTAs. Kept the menu form and routed “Let’s Talk” there; preserved legacy inquiry hash handling.
3. **Certificate verification:** 10 cards/10 loaded assets, two columns at 1652/1440 desktop and 390/320 phone widths; phone overflow false. Desktop intro top remained ≈74.9px while grid moved; fresh 1440×900 `#certificates` load put collection top≈120.2px and intro≈72.2px. Reduced-motion mode produced zero pins and marquee animation `none`. Full-collection navigation opened the existing 27-item page and Back restored a visible local page. Menu opens with one inquiry form.
4. **Footer:** matched bright dashed rows, row spacing, gray hover fill, italic accent text, horizontal inset and appropriately sized SVG arrows. Removed pointer-hover marquee pause; retained keyboard-focus pause and reduced-motion behavior. Actual hover computed `rgb(223,223,223)` background, `rgb(235,0,4)` text and `10px` padding. Hovered marquee remained running across two changing transform samples. Compared rendered desktop/phone groups with Kala; own three social destinations and branding intentionally differ.
5. **Checks:** production build/typecheck passed; eight tests passed (including ten unique certificate slugs and existing asset files); formatting checked. Existing preview was restarted after the browser/session restart. No dependencies installed, no source-portfolio changes, no message submitted, no deployment or push.
6. **Regressions/differences:** no overflow or missing assets observed at checked sizes. Certificates deliberately keep two columns even on narrow phones; detail links provide larger originals. Header/menu/social contact access retained. Exact animation frame timing and physical-device/cross-browser behavior remain unchecked. Existing broader known limitations still apply.

Focused commits: certificate content/assets/contact access first; footer behavior second; this verification ledger records both. See Git history for hashes.

2026-10-09: user approved starting the build after the reference plan. Use own portfolio content from the beginning; homepage and overlays only, link existing portfolio pages. Maintain focused commits. No push/deployment requested. Target repository was verified empty and cloned into supplied workspace C:\dev\beyblade; original CleanPortfolio checkout is read-only input.

## Non-negotiable section loop

For EVERY section: (1) reinspect original, (2) implement locally, (3) start/check server, (4) inspect local browser, (5) compare identical viewports and equivalent motion progress, (6) fix differences, (7) retest/update both documents, (8) commit verified milestone. Do not implement all sections then defer browser checks.

Animation acceptance needs timed running-browser measurements and visual inspection of frames, not static screenshots alone. Report unavailable physical-device/cross-browser/video-review checks. Deliberate content and accessibility differences are not perfect matches.

## Architecture and content decisions

- Vite + React + TypeScript + CSS + GSAP3.14.2 + @gsap/react; one smooth-scroll owner and media-query cleanup. No router required for one homepage; external existing portfolio destinations.
- Data interfaces: project title/summary/tags/destination/responsive image/optional video; persisted theme/perspective/smoothing preferences; shared in-memory inquiry draft with distinct instance IDs.
- Initial theme red, perspective and smoothing on where appropriate; browser reduced-motion overrides decorative motion. Hints session-only.
- User-supplied RJ mark in red and purple, Rey Jane Andrada identity, existing headline/intro/contact, existing portrait and public project WebP assets. No invented accomplishments.
- Six projects in source order: Wave & Wish, Iloilo Farmers Hub, e-Serbisyo Rizal, Duely, ICSLink, Praise & Pray. Six visible on mobile in this separate showcase.
- Contact default: name/email/optional website, single inquiry type, multiple topics, message. Open email draft; copy fallback; no backend and no fake success. Menu and page forms share memory only.
- No tracking => no cookie dialog. No imported client artwork. No video assets available => honest still previews, support later optional video.
- Native scrollable menu with initial50vh inset, matching entry/exit timing, proper dialog focus/return and scroll lock. Reduced motion/touch disables bottom auto-navigation.

## Stages and intended commits

| Stage | Work                                                           | Acceptance before advancing                                            | State                                                              |
| ----- | -------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 0     | Persist reference spec, plan, evidence conventions             | Document observation vs unknown and adaptation                         | complete: 6b84032                                                  |
| 1     | Scaffold, tokens/fonts, header, preferences, motion lifecycle  | Browser desktop/mobile; semantic/keyboard checks; build                | verified and integrated                                            |
| 2     | Hero, layered art, ticker, perspective/parallax/ambient motion | Desktop/phone comparison; motion time samples; 3 hard reloads          | verified adaptation                                                |
| 3     | Six-project horizontal gallery and mobile stack                | Pin/reverse/exit; 768/769 resize; correct destinations/media           | verified adaptation                                                |
| 4     | Statement, word reveal, CTA                                    | Trigger and once-only behavior; phone wraps                            | verified adaptation                                                |
| 5     | Contact heading/pin/form                                       | Wide pin/narrow stack; choices; validation/draft/copy, no sends        | verified draft/layout; clipboard failure branch not browser-tested |
| 6     | Menu dialog and duplicate form                                 | Entry/exit, independent scrolling, Escape/focus/backdrop, shared draft | verified adaptation                                                |
| 7     | Footer, cursor/progress/skip, page exit/bottom continuation    | Marquee/tilt; safe public navigation test; reduced/narrow exceptions   | verified adaptation                                                |
| 8     | Integration/regression and polish                              | Build/typecheck, browser matrix, accessibility, repeated loads         | complete within documented browser coverage; limitations below     |
| 9     | Pointer-motion fidelity refinement (hero, gallery, trail)       | Matching-viewport moving-browser comparison and regression matrix     | implemented and checked within the coverage below; exact timing/geometry parity not claimed |

Commit sequence: docs baseline; chore foundation; feat hero; feat gallery; feat statement; feat contact; feat menu; feat footer/navigation; focused fix commits and verification docs. Stage only intended paths and inspect staged diff/check before committing. Report hashes separately from push status. Never stage unrelated original portfolio changes.

## Test strategy

- Viewports: 1440x900,1280x720,834x1112,390x844,360x800; boundaries768/769 and1079/1080.
- Modes: fine pointer/touch emulation, normal/reduced motion, both themes, smoothing/perspective toggles.
- Scroll: slow/fast, forward/reverse, interrupted, pinned-region entry/exit, anchors with offset, resize while pinned.
- Dialog: open mid-scroll, repeated open/close, Escape/backdrop, keyboard containment/return, shared input retention, no behind-dialog scrolling.
- Media: responsive sources, images decoded, missing media fallback, optional videos pause offscreen; never block portrait on animation initialization.
- Reliability: three hard reloads at desktop/phone, back/forward, localStorage unavailable, no duplicate triggers after resize/remount.
- Contact: required fields, single/multiple choices, accurate mailto encoding, no fake sent state, clipboard fallback. Intercept navigation during automated tests; never send real email.
- Performance/accessibility: avoid layout-changing per-frame animation, visible focus, semantic landmarks, reduced-motion static content, clean browser errors, no horizontal document overflow.
- Build/typecheck are required but not proof of visual match. Automated Chrome is not physical-device or Safari verification.

## Iteration ledger

### 2026-10-16 — Project details comparison and integration completion

- P01–P04 complete within the checks below. All six existing projects have local details, public still media, factual tools/role/team, adapted project descriptions, and original case-study links. Homepage cards, header/menu/footer now use the local project page; details-page contact links return to homepage contact. The build emits a real `projects/index.html` for direct static-host navigation.
- Live production preview4173 checked at1440x900,834x1112,390x844 and720/721 boundaries. Viewed all six cases across those sizes; preview images decoded, desktop columns and phone media-first flow rendered. Numbered jumps changed the hash, focused the target and settled near120px. Example desktop Project2 moved from top1048.57 during motion to120.44 after settling; phone Project6 settled120.31. Reloading a deep link restored its target; reduced-motion jump settled120.04 without smoother/trail.
- Responsive regression found: four-column metadata overflowed at721px (9px document overflow, multiple long words overlapping). Changed metadata to two columns at<=1000px. Retest721: overflow0, no metadata child overflow, desktop column direction retained;720: overflow0 and media-first column-reverse. This extends the planned phone readability adaptation to tablet widths.
- Navigation regression found on repeated homepage-card -> details -> Back: the browser restored a still-running exit tween, taking root opacity from0.79 to0 even after pageshow reset. Reset now kills the exit tween before clearing opacity. Card and header navigation/Back retests stayed atopacity1 across subsequent samples; hovered homepage card still hides the trail and shows View project. Contact navigation landed at119.84px; no message/form was submitted.
- Both themes, menu open/close, reduced-motion preference and restoration, footer return-to-top and explicit destinations were inspected. Footer continuation destination is wired to homepage contact; full6000px automatic continuation was not retriggered in this expansion pass. Existing gallery pointer mathematics were not changed. No exact timing parity or real-device/cross-browser claim.
- Build/typecheck, seven existing tests, formatting and diff whitespace checks passed. An earlier development-only hot-reload warning recorded changing effect dependency-array length while editing; no production navigation runtime error was observed. Evidence saved under ignored `artifacts/project-details-desktop.jpg` and `artifacts/project-details-phone.jpg`.
- Remaining differences: one still rather than three/four recordings per case, six cases rather than four, own text/metadata changes wrapping and section heights, no invented palette swatches, two-column metadata at narrower widths. Reference detail media has no homepage-style pointer perspective. Missing owned recordings remain the main visual/motion gap.
- Main implementation was independently committed as3492ae2 during the work. Preserve it; final responsive and Back fixes plus these verification notes are separate focused commits. This pass does not push or deploy.

### 2026-10-15 — Project details expansion (authorized)

- New scope supersedes the initial homepage-only destination decision: implement the reference's long project details page locally with six own projects. Preserve links to existing full case studies. No new dependency required; native page navigation can select `/projects/`, with shared shell and deep-link anchors.
- Study complete at1440x900,1652x936 and390x844: staggered desktop tools/prose/media, ordinary vertical scrolling, phone media-first order, viewport-controlled video playback, smooth numbered jumps, existing footer. Measurements and intentional adaptations recorded in REFERENCE_SPEC.md.
- P01: build heading/numbered navigation and page shell, compare browser before case content.
- P02: implement Wave & Wish with verified existing portfolio facts and owned detail image; compare desktop and phone before remaining cases.
- P03: extend the checked template to the other five projects; verify anchors, direct links, image loads and phone/tablet flow.
- P04: integrate homepage cards, menu/header/footer/contact destinations, exit/Back and reduced-motion behavior; build/test, document differences, make focused commits. No push requested for this new work.
- Outstanding fidelity limit: no owned project recordings or additional gallery views; one genuine still per case. No fake live interactions, invented theme swatches, or borrowed client media.
- P01/P02 checked before expansion: live local1440x900 heading y141.21 vs reference141.33; case metadata starts322.03 vs322; prose x183 vs183.04; media x464/w934 matches. Corrected narrow tools column from100px to123px after comparison. First imported image initially cached404 during HMR, resolved by reload and confirmed decoded964x542. At390x844 media-first order, two-column metadata, six wrapped jump links and preview rendered with no horizontal overflow. Different copy changes row heights and case height; one still gives a shorter media column than the reference's three videos. Remaining cases/navigation now in progress.

### 2026-10-14 — Cursor continuity, project hover, and help placement correction

- User clarified that the desired fast trail is continuous and project hover must show only the View project label. Reinspection found the reference parent cursor uses `filter:url(#goo)` (blur6, alpha35/-15). The previous implementation omitted this compositing step. A large automated reference drag still showed separate circles; continuous local connections are an explicit user-requested adaptation, not an exact-reference claim.
- Added the blending filter and tapered connections between samples so fast sweeps remain continuous. Idle flutter starts only after the samples settle near the pointer, preventing a distant frozen tail. Project hover hides the entire trail immediately (including stationary-pointer hover caused by scrolling), stops its animation on movement inside cards, and reseeds it on exit. Browser observed project:hover=true / trail hidden / View project visible, then hover=false / trail visible / label hidden.
- Replaced alternating rotated help text with fixed SVG annotations and leader lines based on the reference positions: four staggered rows for perspective/theme/help/smoothing, separate menu/projects labels. Added a dark text outline for readability over artwork. Desktop text rectangles do not overlap;390x844 labels stay in bounds, document overflow=0, decorative trail absent.
- Observed an actual drag from(900,250) to(150,200): local trail rendered as one continuous taper while its sample coordinates advanced. Reference goo filter confirmed from computed DOM, not inferred from a still. Evidence: `artifacts/project-cursor-only.jpg` and `artifacts/help-label-layout.jpg` (ignored local files). Earlier Stage9 notes describing intentionally separate visible circles are superseded by this correction.
- Final build/typecheck, seven existing tests and formatting check pass. Rebuilt4173 preview shows corrected help placement; captured warnings/errors empty. Final cropped evidence: `artifacts/help-controls-corrected.jpg`. No push performed.

### 2026-10-14 — Production-preview handoff

- Confirmed the trail work and notes are already committed in `3fd9ec3`; no application changes were needed in this pass. Fresh build, seven tests, and format check pass.
- Started the production preview at http://127.0.0.1:4173/ and verified it serves the freshly built `index-BWttwDk4.js`. Inspected hero motion, gallery pin/scroll and left-pointer projection, and separate trail circles in the running production page. Gallery wrapper and scroll track retained independent transforms; document overflow=0; captured warning/error log empty.
- Saved local evidence `artifacts/production-pointer-check.jpg`, restored temporary viewport overrides, and left the production preview available. This is an additional desktop production smoke check, not a new full responsive/cross-browser matrix. Remaining timing, geometry and physical-device limits from Stage9 still apply. No push or deployment performed.

### 2026-10-13 — Stage 9c trail and regression pass

- Reinspected reference fast pointer relocations: separate tapered circles are visible, with small tail flutter after stopping. Public active cursor implementation confirms 20 circles, 26px base diameter, direct head, 35% retained follower history, 150ms idle threshold, and 0.05-radian/frame idle phase. Implemented these behaviors without introducing a blur/connecting stroke; deterministic staggered phases substitute for reference random phases.
- Trail starts at the first pointer position, hides/cancels on leave, blur or hidden document, and is removed for the menu, narrow screens, and reduced motion. Browser fast relocation to (734,70) produced head=(734,70), next=(512.1,360.5), next=(367.865,549.325); the 26px circles were visibly separate. Later samples showed the first seven dots anchored and the tail fluttering. These observations and live perspective samples are motion checks, not a screenshot-only acceptance claim.
- Added three model tests: tapered initialization, direct-head/history-follow and separated fast-move circles, bounded idle flutter/resume. All seven tests and production build/typecheck pass. Build JS383.41kB /128.45kB gzip; CSS26.45kB /6.69kB gzip.
- Browser matrix: local/reference1468x936; additional local1440x900; 390x844 vertical cards with no trail/tilt/overflow;768px vertical/no trail;769px horizontal/trail restored with no overflow. This is viewport testing, not physical touch emulation. Both red/purple rendered, browser warning/error log empty. Menu removed the trail; Reduce motion produced static vertical cards and cleared hero/gallery transforms; restored normal mode successfully.
- Matching upper-center position at1468x936 showed positive rotateX near7.5 degrees in both running pages (expected settled~8.02), reversing the lower-pointer sign. Left/right projections, +3-degree cap, reverse scrolling, focus to final card, perspective toggle cleanup and project navigation/Back were checked. Automated calls may return pre-render screenshots; follow-up DOM/screenshot checks were used. Continuous high-speed path timing, physical-device touch, other browsers, and the full original Stage9 matrix remain unverified.
- Local evidence (ignored, not committed): `artifacts/pointer-motion-purple.jpg`, `artifacts/gallery-pointer-trail.jpg`. Exact pixel parity is not claimed: six vs four cards changes the projection; the existing heading placement differs; idle phases differ. No new regressions remain from the checks performed; the keyboard-scroll regression is fixed in1168de7. No dependencies added and no push/deployment performed.

### 2026-10-13 — Stage 9a/9b implementation

- Hero change is preserved in existing commit `be22ebe`: shared mild parent, equal side travel, stronger left-side rotation. Prior live 1652x880 samples matched the reference's settled transforms; toggle-off cleared all three transforms. Per-frame damping is 0.12; frame-perfect wall-clock timing is not certified.
- Reinspected the live reference gallery, including left/right movement and discrete cursor circles. Confirmed the positive rotateY cap of 3 degrees. Implemented a shared pointer wrapper (49px travel, 9.8-degree tilt, positive yaw capped at 3) and independently moving heading (49px / 2.8 degrees). Scroll translation remains on the inner track.
- Browser checked local gallery at 1440x900 and matching reference/local 1468x936. Left/right positions produced shrink/grow projection; right cap reached 3 degrees; perspective-off clears wrapper and heading. First project link reached the existing Wave & Wish case study and Back restored root opacity to 1.
- Regression found and fixed during keyboard testing: focus could native-scroll the overflow-hidden section in addition to ScrollTrigger, leaving the final card offscreen. Changed section overflow to `clip`. Retest: last card focused and visible, section scrollLeft=0.
- Own six-card strip is longer than the reference four-card strip, so projected sizes are not pixel-identical despite equivalent transforms. Existing heading placement also differs (local heading remains behind the pinned cards). Do not label the full gallery visually identical. Mobile/reduced-motion and trail checks follow in Stage 9c.
- Preview restarted on http://127.0.0.1:5174/ because the sandbox-started 5173 preview was inaccessible to Chrome. Typecheck passed after gallery edits.

### 2026-10-12 — Pointer-motion review and proposed Stage 9 (plan only)

- Reopened the live reference homepage and `/projects/` page at approximately 1652x880. Positioned the pointer at left/center/right and high/low locations and inspected in-motion screenshots plus settled DOM transforms. Detailed samples and confidence limits are in `REFERENCE_SPEC.md` under “Pointer-position reinspection.” No application code changed in this review.
- **Hero gap:** reference `.home-3` parent moves all three artworks mildly; the two side children add about +/-25px horizontal and -23px lower-position vertical translation at the sampled points. The center has no extra child transform, so the net side translation is about 3x the center's. Side-child left rotation is about four times the right's. Local `Hero.tsx` currently assigns depth 30/80/50 to left/middle/right and applies the same rotation to all, so its center is incorrectly most mobile. Proposed: add a mild shared wrapper transform with the reference's opposite-sign pointer mapping; layer stronger equal side translations and independent left/right rotation gains on top; preserve smooth settling and clear transforms when perspective turns off. Reinspect the reference at the chosen comparison viewport immediately before editing, then compare each corner/center and a moving transition in the local browser. Do not lock constants solely to the 1652x880 samples.
- **Homepage gallery gap:** reference `.projects-container-wrapper` applies one perspective transform to the entire pinned horizontal strip. At left-bottom it reached about translate(+43,-40)px, rotateY(-8.61deg), rotateX(-8.01deg); at right-bottom translate(-43,-40)px, rotateY(+3deg), rotateX(-8.02deg); at center-top y~+43px/rotateX~+8.68deg. The asymmetrical positive Y rotation may be a cap; confirm its envelope before coding. Local `Projects.tsx` only translates the track for scrolling and moves the hover label. Proposed: add a wrapper around the scroll track (and only elements seen to share the reference tilt), apply pointer X to horizontal shift/Y rotation and pointer Y to vertical shift/X rotation, keep GSAP ScrollTrigger translation on the inner track so transforms do not overwrite each other, and reset on leave/toggle. Test cards near both ends of the strip at matching scroll progress to confirm the apparent near/far size change is from shared perspective rather than per-card scaling. The separate reference `/projects/` first media block stayed `transform:none`; do not invent this tilt on destination pages.
- **Cursor gap:** reference `#cursor` has 20 white 26px circular spans, decreasing by .05 in scale, under `mix-blend-mode:difference`; fast movement shows distinct trailing circles. Local `GlobalMotion.tsx`/CSS has 20 circles but at 20px with a chained .45 lerp. Proposed: match base size/stacking/blend, then tune delayed-position sampling so high-speed turns create spaced circles while slow/stopped movement clusters cleanly. Compare motion (not just stills) across a slow sweep, a rapid cross-viewport move, a stop, and project-hover label entry/exit; record the circle separation/settling envelope. Exact reference per-frame trail timing is still unverified, so do not claim perfect parity until this is observed continuously.
- **Stage 9 section loop:** (1) fresh reference observation for one motion system, (2) isolated code change, (3) start/check local server, (4) same viewport/position/scroll-progress inspection on reference and local, (5) adjust and retest, (6) update both checklists with completed work, unresolved differences and regressions, (7) one focused commit for each of hero, gallery, cursor after passing checks, then a regression/docs commit if needed. Do not change all three before the first local visual check.
- **Regression matrix:** 1652x880 and 1440x900 fine pointer; 390x844 touch, 768/769 gallery boundary, reduced motion, perspective off/on, both themes, menu open, hover/focus card navigation, gallery pin/reverse/exit, no document overflow or pointer-driven layout shift. Repeat reloads and verify browser console/build. If continuous capture or direct pointer movement is unavailable, report that limitation instead of declaring timing parity.
- Status: reference observations recorded, local mismatch identified from source, implementation/side-by-side retest pending user approval. No new regression introduced because this was a documentation-only pass.

### 2026-10-09 — Stage 0 baseline

- Completed: reference inspection synthesized into REFERENCE_SPEC.md; explicit content/asset/accessibility differences; empty remote cloned into requested workspace.
- Remaining: all application implementation and local comparison. Documents are the first commit; no application code existed at this checkpoint.
- Regressions: none applicable yet.
- Evidence: prior inspection screenshots under task visualization directory; fresh per-stage evidence will be in ignored artifacts/ with tracked findings here.
- Commit: baseline documentation commit (resolve using git log).

## Completed iteration details

### 2026-10-11 to 2026-10-12 — Stage 8 integration and production verification

- All homepage sections and menu are implemented. Code hardening/formatting commit: `daa989d`. Earlier focused milestones remain individually reviewable in Git history. No push or deployment.
- Rechecked final production build, not only Vite development output. Three reloads each at 1280x720 and 390x844 retained decoded portrait opacity1, correct purple preference/logo, and zero horizontal overflow. These are ordinary browser reloads; cache-disabled reload behavior was not independently established in this pass.
- Production browser warning/error log empty. Contact anchor landed at110.28px; contact heading transform returned from identity to y=-53.53px on reverse. Keyboard focus on Duely brought its card fully into view (left41.30px/right1315.60px at1440px).
- Form: empty required name and invalid email block preparation and focus the relevant field. Copy draft reports success; no email app was opened and nothing sent. Editing either form now invalidates both prepared views, verified with a shared synthetic draft. Clipboard-denial UI remains untested.
- Extended menu keyboard test exposed a native last-control escape missed by the earlier short check. Added explicit focus wrapping; retest34 successive Tab presses never left the dialog, Shift+Tab on Close focused Prepare email, and Escape returned focus to the opener.
- Reduced-motion tablet preview exposed a card description extending past its intended inset. Limited media width to leave room for its260px description and22px gap; retest769px has matching card/description right edges738.56px, zero pins and no overflow.
- Purple text now uses #A48AFF on black while artwork/logo keep #5135CD; white menu uses the deep accent. Calculated token contrast: purple ink/black7.66:1, deep purple/white7.66:1, red/black4.53:1. This is a color-token check, not a whole-site accessibility certification.
- Added a one-shot navigation guard, progress refresh synchronization, readable formatting scripts, README and packaged font/React notices. Removed only the obsolete scaffold favicon; it remains recoverable from Git, and the supplied logo is the current favicon.
- Current final commands (2026-10-12): build/typecheck PASS,4 unit tests PASS, format check PASS, dependency audit reported0 vulnerabilities. JS bundle381.85kB raw /127.97kB gzip; CSS26.30kB raw /6.66kB gzip. Assets are additional.
- Final screenshots: `artifacts/final-desktop.jpg`, `artifacts/final-phone-purple.jpg`; all stage evidence remains local/ignored. Last inspected production output used `index-DMrj19MF.js` and `index-BThEqLSM.css`; the final rebuild produces the same filenames.
- At final handoff, the previous browser-control tool and retained server session handles were no longer available. No new app changes were made after the last successful browser inspection, and no extra live comparison or viewport-reset claim is made. Restart with `npm run dev`; final live-server availability is not promised.

#### Viewport regression record

| Viewport    | Checked result                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| 1440x900    | Hero/menu/footer inspected;2 pins; modal focus loop; exit/Back; no document overflow                              |
| 1280x720    | Production screenshot and3 reloads;2 pins; visible decoded portrait; no overflow                                  |
| 834x1112    | Tablet hero/gallery inspected;1 normal pin; reduced static layout inspected                                       |
| 390x844     | Hero/menu/contact/footer inspected;0 pins;3 production reloads; logo/theme persistence; no automatic continuation |
| 360x800     | Narrow hero and controls inspected;0 pins; images decoded; no overflow                                            |
| 768 / 769   | Normal gallery changes from0 to1 pin; no document reload required;769 reduced layout fits after fix               |
| 1079 / 1080 | Settled pin count changes1→2; immediate resize sampling can precede ScrollTrigger refresh                         |

#### Remaining checks and deliberate differences

- Physical touchscreen momentum, Safari/Firefox, OS-level reduced-motion switching, blocked localStorage and denied clipboard permission were not exercised. Menu reduced-motion override and its persisted/static behavior were exercised.
- No continuous video capture or frame-perfect easing certification. Running-browser time samples and pointer/scroll/keyboard actions support only the specific observations recorded here.
- No owned project video clips are available. Still previews, personal copy/branding, six projects, native range seeking, brighter purple text, and accessible modal behavior deliberately differ from the reference.
- Original CleanPortfolio checkout remains unchanged. No backend, analytics, cookie banner, reference illustrations or reference form endpoint was added.

### 2026-10-10 — Stage 7 footer and global navigation

- Reinspected original footer at390x844/1440x900. Reference marquee advances~255px/1.2s. Reference track clicks at visible midpoint did not change scroll; no click-seek fidelity claim. Implemented own identity grid, tilted supplied logo, oversized20s text marquee, credits, existing-page links, cursor trail and native accessible progress slider.
- Local1440x900 marquee x=-1743→-1989 over1114ms. Footer tilt enabled: non-identity matrices settle over706ms, pointer leave returns identity. Exit fade sampled opacity.731→.119 over166ms mid-transition. Complete navigation reaches verified public /projects page; Back restores opacity1.
- Slider midpoint click yields50.004% page progress; Home/End keys work. Desktop continued-wheel7200px reaches /projects. Phone390px and explicit reduced-motion desktop ignore10-page continued wheel and remain local; reduced mode has0 pins/no cursor/no CSS marquees.
- Found footer bottom118px out of reach due collapsed hero margin outside smoother content. Added flow-root; retest bottom900.16px at1440x900 and843.21px at390x844, no overflow. Phone screenshot inspected;6vs8 footer links and original RJ/color identity are intentional differences.
- Build/typecheck and4 unit tests pass. Evidence artifacts/footer-desktop.jpg and footer-phone.jpg. Physical touch and precise trail/hover parity remain unverified; independent tests use current browser viewport emulation.

### 2026-10-10 — User-supplied RJ branding

- Saved original red logo and built-in-tool purple edit in public/assets/brand; exact generation prompt and provenance in ASSET_NOTES.md. Kept white J/black background and four accent rays, no redesign.
- Replaced placeholder header/hero/menu marks with a shared theme-aware Logo component; supplied original also serves as favicon. CSS frames excess black canvas rather than modifying the original file.
- Browser1440x900 inspected in both themes: all3 logo instances load the proper source, no clipped lettering. Moved small location text above new taller logo. Phone390x844:290px framed hero logo, no overflow; menu black-tile treatment inspected. Evidence artifacts/logo-purple-desktop.jpg and menu-logo-phone.jpg. Footer will consume the same component.

### 2026-10-10 — Stage 6 menu

- Reinspected reference menu at390x844/1440x900. Implemented native dialog, white1000px desktop/full-width phone sheet starting50vh, independent scrolling, shared inquiry, local section links and existing CV/certification/social destinations.
- Browser: settled panel top450px desktop/422px phone; scrolling dialog900px leaves pageY0. Escape closes and returns focus to opener; keyboard focus remains in dialog. Backdrop close samples: top451.5→800.4px over243ms, then closed by654ms (sampling overhead included); backgroundY7374 unchanged. About link closes then lands at109.87px.
- Shared synthetic draft survives menu close/reopen and390→1440 resize; page/menu IDs unique. HMR module reload intentionally clears memory-only drafts, ordinary resizing does not. Added explicit reduced-motion option; browser toggle yields0 pins and static layout, re-enabling restores2 pins.
- Opening motion observed top458.9→450px; exact full400ms envelope not captured because locator click returned after its start. Fixed close distance when sheet is deeply scrolled. Build/typecheck passed. Evidence artifacts/menu-phone.jpg.
- New user input: supplied RJ raster logo and requested alternate purple colorway; handled as a separate branding commit, not folded into menu milestone.

### 2026-10-10 — Stage 5 contact

- Reinspected reference desktop form80px field gaps, offset form and pinned introduction. Implemented same visual hierarchy with personal name/intro/socials, responsive pin, native radio/checkbox fields, and shared in-memory draft provider for forthcoming menu.
- Local1440x900: form top110.18px after CTA, pinned intro72.18px; phone390x844: no pins, contact top109.68px, form358.8px wide, unique IDs, no overflow. Screenshots inspected (artifacts/contact-desktop.jpg, contact-phone.jpg).
- Browser-tested synthetic name/email, exclusive inquiry type (pointer label selection), multiple topics and deselection (keyboard), prepared mailto with escaped message. Nothing was sent and email app was not opened. Hidden1px input automation was unreliable; visible pointer labels and Space worked.
- Deliberate UX adjustment: Prepare email reveals explicit Open email app and Copy draft instead of immediately launching another app. Honest nothing-sent status and readable draft preview. Clipboard success/failure and native mail client remain unverified.
- Build/typecheck and2 Node tests pass (encoding/optional fields/subject newline cleanup). Remaining: heading reverse timing, form validation regression, menu-shared-state test.
- Commit: contact milestone; resolve via git log.

### 2026-10-10 — Stage 4 statement and anchor correction

- Reinspected phone reference typography31.2px and revealed words; implemented verified personal copy with accent words, corner framing, divider and CTA. Rendered at390x844/1440x900, no overflow.
- Timed word samples reach opacity1/clear within510ms after partial reveal; words remain revealed on reverse. Removed the initial fade-out transition for unrevealed offscreen words.
- Found anchor/focus and lazy-image-refresh interactions while testing gallery exit. Explicit numeric smooth-scroll coordinates, section-focus exception, home handler, and removing unnecessary image-load refresh (media dimensions are fixed) stabilize navigation. Retest About from visible hero lands at109.87px; gallery progress1.0000, pin exits correctly.
- Evidence artifacts/about-desktop.jpg. Build/typecheck passed before small anchor correction; will run again with contact. CTA destination integration is next stage.
- Commit: statement milestone with scoped navigation fixes.

### 2026-10-10 — Stage 3 project gallery

- Reinspected original at390x844 and1440x900, including time-series horizontal scrubbing. Built six original projects with responsive media, case-study destinations, computed pin travel, hover cursor, focus-visible card scrolling, and optional intersection-controlled video support.
- Local1440x900: pinned section top~-0.14px, reverse-scroll transform x=-1098.98 -> -744.10 in295ms, progress decreases. No document overflow. Large framed previews and bottom-aligned descriptions visually inspected.
- Resize769px => one gallery pin;768px => zero pins/native wrapper;390px => six vertical cards/no overflow. All six images decoded after full scroll; last card reaches viewport bottom. A screenshot taken during an unfinished keyboard scroll was discarded/replaced with settled phone evidence.
- Build/typecheck pass. Evidence artifacts/projects-phone.jpg. Remaining: continuous video review/real touch; owned project clips unavailable. Full-gallery exit is rechecked after adding the following statement.
- Commit: gallery milestone; resolve via git log.

### 2026-10-10 — Stage 2 hero

- Reinspected reference at1440x900 and390x844 before implementation. Built /RJ composition, existing portrait and two existing project-image collages, original accent cross/texture/lightning, parallax, damped perspective, ticker.
- Local center608.5px wide at desktop versus reference~609px; phone358.8px wide versus~358px. Personal wordmark/copy changes vertical phone position by~15px; acknowledged adaptation.
- Fixed phone copy words joining across hidden line breaks and excessively dark multiply-blended portrait after viewing actual renders. Neutralized emblem horizontal-centering transform conflict.
- Motion samples over309ms: ticker x=-525.15 -> -540.73 (~50px/s); perspective non-identity matrix resets to none on toggle. Parallax/ambient are implemented; precise amplitude fidelity and physical touch remain unverified.
- Three reloads each1440x900/390x844: portrait opacity1 and decoded, no overflow. Browser error log empty. Build/typecheck pass before final CSS positioning adjustment; next stage also rebuilds.
- Evidence: artifacts/hero-desktop.jpg and artifacts/hero-phone.jpg. Original images/content deliberately differ. No full-animation-perfect-match claim.
- Commit: hero milestone; resolve via git log.

### 2026-10-10 — Stage 1 foundation

- Reinspected reference desktop1440x900 and phone390x844. Confirmed main background #000, text #dfdfdf, muted/borders #767676, accent #EB0004. Corrected prior plan's light-page assumption before implementation.
- Implemented pinned dependency stack, self-hosted Cascadia Code, scoped GSAP lifecycle, preferences, semantic fixed header and skip link. Menu is intentionally disabled until its stage; contact temporarily uses public email.
- Local browser inspected at1280x720 and390x844: no horizontal overflow, theme changes accent to #5135cd and back, no browser errors. Adjusted header top to32px after reference comparison and removed native scrollbar to match reference's uncluttered edge. Larger muted text contrast and native smoothing-off are deliberate improvements.
- Build/typecheck pass. Sites helper failed resolving npm on Windows; direct installed npm succeeded (0 audit vulnerabilities). Sandbox server was unreachable; approved local server outside sandbox is reachable.
- Remaining: header menu/contact wiring in later stages; actual motion verification belongs to hero/gallery, not the temporary scaffold content. No perfect-match claim.
- Commit: foundation milestone; resolve from git log.

Every stage has a local inspection record, motion behavior check, deliberate differences list, and focused commit. Final report identifies remaining gaps, real test results, commit hashes, and whether anything was pushed/deployed. Never label the full site matched while source video/artwork or device coverage is absent.
