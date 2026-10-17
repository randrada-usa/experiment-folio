# Reference specification — Experiment Folio

Reference: https://www.trykala.com/

Portfolio: https://www.devbyrey.me/

Target repository: https://github.com/randrada-usa/experiment-folio

Inspection date: 2026-10-09

Implementation comparison updated through 2026-10-17. See IMPLEMENTATION_PLAN.md for the per-section evidence and final coverage limits.

## 2026-10-17 — Certificate detail-page study and implementation

This section records a fresh inspection of Rey's existing certificate detail page, not a claim that Kala has certificate pages. The full local page is implemented and checked within the coverage below; the first local detail was compared on desktop and phone before expansion. The existing project-detail page is the local motion/layout precedent; certificate content and hierarchy come from Rey's portfolio.

### Observed source page

- Inspected `https://www.devbyrey.me/certifications/data-analyst-associate` in a running browser at approximately 1652px desktop and 390×844 phone. The page briefly displayed `LOADING /RJ` before the detail rendered. Entrance animation timing and reverse-navigation behavior were not measured.
- Desktop: light background; back control at left, central navigation and availability at right. Category and issuer chips precede a very large title. Short description sits beneath the title; Issuer, Category and Year metadata occupies the adjacent column. A large, uncropped certificate image follows. A `/MORE CERTIFICATES` area presents two related items, then the site's contact/footer.
- Phone: back and availability remain; central navigation is absent at the inspected width. Content uses approximately 16px side margins. The title wraps to two lines, metadata becomes two columns with Year below, and the certificate image uses the available width without horizontal overflow.
- The source detail template selects up to two related certificates from the same category, excluding the current entry. Its back destination can return to the collection when reached from there; otherwise it falls back to the homepage certificates anchor. The certificate image is a static image, not an observed zoom control. The inspected original is 860×495 pixels; avoid upscaling expectations beyond its source resolution.
- At study start, the showcase held ten previews with title/issuer/image/slug only. The source inventory was reconciled to 27 records in five categories. The local data now contains all descriptions, years, source slugs and image dimensions, plus the 17 missing image files. All 27 records were compared field-for-field and all image hashes match the source. Refresh this inventory when adding future credentials.

### Approved local scope and proposed presentation

- Preserve the showcase's black/red-or-purple design language and shared header/footer rather than importing the existing portfolio's light styling wholesale. Use the original certificate image as the visual focus; keep its intrinsic aspect ratio and no crop.
- Page hierarchy: (1) accessible return/breadcrumb and certificate number, (2) issuer/category eyebrow and large title, (3) factual description and Issuer/Category/Year metadata, (4) full-width certificate image with optional explicit external verification/original-page link only where a real destination exists, (5) up to two related certificates drawn from the same category, (6) full-collection CTA and shared footer. Some categories have fewer than three records, so never fabricate a second related item. Avoid invented credential IDs, dates, scores or accreditation claims.
- User chose one local `/certifications/` page for **every certificate they have**, with search and category filtering. The currently verified source inventory is 27, not a permanently capped count. Keep stable `#<slug>` deep links for every record; the homepage's ten cards can link to their matching sections and “View all certs” can link to the local collection once it is complete and verified. Do not create 27 separate routes.
- Proposed in-page organization: searchable/filterable certificate index followed by detailed, anchor-addressable certificate sections. The same search and category state controls both index entries and visible detail sections, so clicking a result never lands on a hidden section. Selecting a result scrolls/focuses its detail beneath the fixed header; direct hash loads reveal and focus that certificate even when an earlier filter was active. Avoid loading all 27 full-resolution images eagerly; use responsive sizing and lazy loading for below-fold images while retaining direct-link reliability.
- Search matches title, issuer and description case-insensitively; category filter offers All plus the five source categories. Controls compose, display a live result count, offer Clear/Reset, and have a useful no-results state. Search/filter changes must not cause the page to jump unexpectedly or leave keyboard focus in hidden content. Exact control styling and motion are original design decisions, not observed reference behavior.
- At desktop, keep the title/meta in a balanced split and allow the certificate image to dominate the next row. At phone, stack title, description, metadata and image; make related items fully operable with touch and keyboard. Exact sizes and breakpoints require matching-viewport local comparison after implementation.
- Motion proposal is intentionally restrained: staged title/metadata entrance and image reveal only if fresh in-motion inspection supports them; related-card hover/focus treatments may follow the existing site's design language. No unobserved image parallax, pointer tilt, zoom or auto-playing media. Respect `prefers-reduced-motion`, reloaded deep links, and browser Back.

### Certificate detail comparison checklist — completed within stated coverage

- [x] Route/scope decision: one local collection/detail page for all owned certificates, with search and category filters; source currently lists 27.
- [x] Reconciled 27 source records, 27 matching images and five category labels. Original metadata/order preserved; intrinsic image sizes recorded for layout stability.
- [x] Combined search/category, result counts, empty/reset states, keyboard operation and deep-link reveal checked. Browser category counts: Data 4, AI 6, Cloud 8, Software 2, Events 7. DataCamp search gives 5; adding Cloud gives 1; description search “protocols” gives Networking Basics. Search persists on reload; related links reveal filtered-out targets and Back restores filters.
- [x] Source detail hierarchy rechecked on desktop and phone, including document scrolling and related-page navigation. Its loader was observed; exact source entrance/hover timing and source reduced-motion behavior remain unmeasured. No new loader or decorative entrance was copied.
- [x] All 27 records and original image bytes verified against the source. Visited every local detail through its index; all 27 images decoded.
- [x] First detail checked before expansion; complete page checked at 1440×900, 390×844, 320×800 and the 760/761 layout boundary. Split/stacked metadata, uncropped images and long titles rendered with no horizontal document overflow at those sizes.
- [x] Direct hash loads, conflicting query/hash recovery, index/related jumps, browser Back/Forward, menu/header/footer and homepage card/full-collection links exercised. Three phone detail reloads preserved query and landed at 120px with the image loaded. Forward restored the certificate hash, focused target and loaded image at approximately120px.
- [x] Local smooth jump measured in motion: top approximately 971→566→335→237→171→144px over the first 536ms, settling at 120px; target receives focus. Reduced motion removes smoothing/trail and hover transitions. Pointer hover on an index row produces gray fill, italic accent text and 10px horizontal inset; transitions are 140/180/100ms. Both red and purple themes inspected. These interactions adapt the established local language; exact source timing parity is not claimed.
- [x] Homepage still renders ten two-column previews, project page retains six cases, and normal-motion footer continuation reaches homepage contact. Back restores root opacity to 1. No captured production console warnings/errors.
- [x] Both planning documents and asset notes updated with the staged checks. Remaining coverage limits: physical touch, Safari/Firefox, OS-level reduced-motion changes and exact source animation parity.

Evidence: ignored `artifacts/certificates-collection-desktop.jpg` and `artifacts/certificates-detail-phone.jpg`. The complete collection/index is an intentional new page composition; each detail preserves the original certificate hierarchy in the showcase theme. Certificate images are static, lazy-loaded and uncropped; source resolution can limit large-screen sharpness.

## 2026-10-16 — Certificate adaptation and footer correction

User-directed change supersedes the homepage form portion of S05: retain the offset scrolling composition and pinned introduction, but replace its form with ten certificate previews in two columns. The heading is “Certificates”; the About CTA and collection footer say “View all certs” and link to the existing full collection. Certificate detail links also use the existing portfolio. The menu retains the inquiry form, opened by “Let’s Talk”; `#contact` still reaches the section's public social links, and `#certificates` reaches the preview grid. Old `#inquiry` links open the menu.

Fresh reference observations:

- Desktop contact introduction remains fixed while the right-hand form moves upward through it. The certificate adaptation reuses this behavior, not the reference form fields/content.
- Footer inspected at 1440×900 and 390×844, plus the initial 1652px desktop viewport. Desktop link labels and group headings compute to 14px. Rows have 10px vertical padding and approximately 4px separation, with bright dashed dividers. The reference arrow is an approximately 0.8em SVG, not a small font arrow.
- Actual pointer hover on Projects: background `#dfdfdf`, italic text `#eb0004`, padding changes from `10px 0` to `10px`. Computed transition settings: background 140ms, color 180ms, padding 100ms. Observed the before/after interaction; exact frame-by-frame easing was not measured.
- Local footer now mirrors those row states and uses a simple original SVG arrow. Own Email/GitHub/LinkedIn destinations remain; the reference's extra social accounts are not fabricated. Logo and right-hand artwork remain intentional portfolio adaptations.

Comparison checklist for this iteration:

- [x] Exactly ten source-backed certificate cards; all ten images decoded on desktop.
- [x] Two columns at desktop, 390px and 320px; no horizontal document overflow on the checked phone sizes.
- [x] Pinned intro stays around 8vh while certificate cards move; reverse/forward scrolling inspected. Static reduced-motion layout has zero pins.
- [x] Full collection link opened the live page showing 27 certifications; browser Back returned to a visible local page.
- [x] “Let’s Talk” opens the menu containing its single inquiry form.
- [x] Local footer pointer hover produces gray fill, italic red label and inset arrow; desktop and phone render inspected against the corresponding reference sizes.
- [x] Hovered marquee stays `running`; successive transform samples changed from x≈−70 to x≈−2146. Keyboard-focus pause is deliberately retained, and reduced motion disables the animation.
- [ ] Physical touch, Safari/Firefox, exact hover transition frame timing, and every individual external certificate-detail destination remain unverified.

Evidence: `artifacts/certificates-desktop.jpg`, `artifacts/certificates-phone.jpg`, `artifacts/footer-hover-certificates.jpg` (ignored local screenshots). Certificates are new user-directed content, not an element claimed to exist on Kala.

## Goal and evidence rules

An animation-showcase homepage using Rey Jane Andrada's content from the start. Recreate the reference's composition and motion language, not its branding or marketing claims. Link to existing portfolio case studies, CV, and other pages. Do not rebuild those routes.

Observed means exercised in a running Chrome browser. Source-confirmed means supported by the reference's public CSS/JavaScript but not necessarily visually measured. Unknown means further inspection is required. No animation may be marked matched from a screenshot alone.

Baseline inspection covered 1440x900 desktop, 834x1112 tablet, 390x844 and 360x800 phones, 768/769 responsive behavior, and desktop reduced motion. Used rendered screenshots and time-series scroll, transforms, opacity, and video playback measurements. Continuous video playback review, physical-device touch momentum, Safari, and Firefox are unverified. No production form submission was made.

The initial diagnostic screenshots are outside the repository in the task's visualization directory. New stage evidence belongs under ignored `artifacts/`; durable findings and test procedures belong here and in IMPLEMENTATION_PLAN.md.

## 1. Layout inventory

### S01 — Fixed header and global controls

- Transparent fixed header approximately 102px high. Desktop logo inset approximately 42px.
- Logo left; contact CTA, 3D, theme, hints, smoothing, menu, and next-page controls right.
- Small outlined icons, accent highlights, handwritten-style hover/hint annotations.
- Header stays above scrolling content. Bottom-right custom dashed 200px progress track with a draggable thumb; Skip sits beside it.
- Touch layouts hide pointer-specific controls. Record exact visibility during implementation reinspection.
- Adaptation: supplied RJ mark; accessible names, pressed states, focus indicators; no Kala identity.
- Branding update2026-10-10: user supplied the RJ raster mark. It now replaces the typographic placeholder; red original plus generated purple colorway. Original square canvases retained; CSS frames central artwork.

### S02 — Hero and link ticker

- Large wordmark, small navigation, emblem, tagline, and three unequal framed art panels.
- At 1440x900: central panel approximately 609px square at x416/y359; left approximately 278px at x111/y573; right approximately 348px at x1050/y444. Pointer perspective affects measured bounds.
- Desktop tagline approximately 32px; side supporting copy approximately 26px. Thin corner rules and layered halftone imagery.
- Ambient moving accent lines and intermittent lightning behind artwork.
- Phone: side artwork hidden, central artwork nearly full width (358px at 390px viewport), 26px tagline, supporting copy below. Approximate 16px margins.
- Source breakpoints: side art hidden <=794px; single-column composition <=640px; title/tagline rearrangement <=596px. Reconfirm measured sizing before coding.
- Link ticker repeats four calls to action, continuous horizontal loop.
- Adaptation: existing portrait centered; Wave & Wish and Iloilo Farmers Hub side imagery; /RJ display and full name; existing backend/data-engineering headline and copy. Original CSS/SVG texture, no reference illustrations.

### S03 — Selected projects

- Two-line 12vw heading (172.8px at desktop), viewport-height pinned section, horizontally translated card track.
- Four reference projects; large framed media and approximately 260px description column aligned low beside it.
- The title remains in the pinned composition while cards pass over/alongside it.
- Native vertical scrolling drives horizontal motion. Pin ends before the statement section.
- Pointer motion belongs to the homepage gallery's shared `.projects-container-wrapper`, not to each card independently. The wrapper translates and rotates in 3D, so cards at different horizontal positions appear to grow/shrink by different amounts. The first media block on the separate `/projects/` page stayed untransformed at the tested pointer positions; do not apply the homepage gallery effect to that page without new evidence.
- <=768px: no pin or horizontal transform; vertical media-then-copy cards. >=769px, including inspected tablet: pinned gallery.
- Adaptation: six projects, in order: Wave & Wish, Iloilo Farmers Hub, e-Serbisyo Rizal, Duely, ICSLink, Praise & Pray. Show all six in this new showcase on phones; original portfolio stays untouched.

### S04 — Statement / about

- Large paragraph with red/purple highlighted words, corner borders, second explanatory paragraph, divider, and outlined right-aligned CTA.
- Typography approximately 64px on inspected desktop/tablet, 8vw on phones (31.2px at 390px).
- Individual words reveal from blurred/transparent to clear once.
- Adaptation: verified existing introduction and backend/data-engineering direction; no invented clients, testimonials, or statistics.

### S05 — Contact

- Italic heading approximately 60px desktop, 42px phone.
- Wide layout: introduction and social links left, tall minimal inquiry form right. Form begins substantially lower than section heading.
- Left column pins at >=1080px; below that, stacked layout without pinning. Name display hidden at narrow phone widths in reference.
- Form: name/contact required, optional website, seven single-choice budget buttons, seven multi-choice services, message, submit; fine/dashed outlines and accent selection.
- Adaptation: inquiry type instead of budget; topics instead of commercial packages. Email draft with copy fallback, not a submission backend.

### S06 — Menu overlay

- Dimmed backdrop; white panel with dark text and accent; desktop maximum width approximately 1000px.
- Initially rests at 50vh; tall contents include identity, intro, links/socials and duplicate inquiry form. <=746px panel is full width.
- Scrolling moves the panel independently while the document stays in place. Reference intercepts wheel/touch/pointer movement.
- Opener opens only; backdrop and Escape close. Focus escapes behind reference menu (observed accessibility defect).
- Adaptation: native scrollable dialog, initial 50vh top spacing, focus trap/return, backdrop and Escape, shared in-memory inquiry draft. No custom touch interception.

### S07 — Footer

- Intro/copyright, bordered identity/navigation grid, hover-tilting marks, huge repeating wordmark on dotted texture, utility links.
- <=980px: identity row above links; narrow phones stack link groups.
- Continued wheel input at bottom fills a progress indicator and eventually opens Projects; inactivity resets it.
- Adaptation: /RJ, existing portfolio links/socials, all-projects destination. Explicit link always available; automatic continuation disabled for touch/reduced motion.

### S08 — Consent overlay (reference only)

- Delayed cookie banner lower-right on desktop; full-width at phone bottom.
- Preferences modal with necessary/analytics toggles. Acknowledgement persists across reload.
- No tracking is included in this build, so omit the unnecessary consent UI. Intentional difference, not an unimplemented feature.

## Project details expansion — 2026-10-15

User approved studying and implementing the reference project details. Live inspection of `/projects/` shows one long page containing all four cases, not separate detail routes. Adaptation will contain the existing six portfolio projects with numbered anchors; existing full case-study links remain available.

- Desktop baseline1440x900: content starts at y104, inset42; 32px Selected projects heading at y141, numbered links aligned right, divider and Project1 label. First case starts y322 after100px top spacing. Left column380px, gap42px, right media934px. Within the left column: narrow tools123px, gap18px, prose239px. Tools start260px below metadata; prose starts120px below metadata. Text16px, tools14px, muted gray, dotted separators and30% paragraph first-line indent. Four equal metadata columns sit above right-aligned media_01 labels and full-width recordings.
- Ordinary vertical scrolling: no pinned case columns and no pointer perspective on media. Live recordings advance on screen and pause after scrolling offscreen; they are not embedded interactive websites. First case has three recordings; later cases repeat the structure with three or four. Footer follows the final case.
- Numbered anchors smoothly scroll; sampled Project3 settled approximately120px below viewport top. Early screenshots may precede the scroll animation settling. Reference first two section IDs are reversed relative to display order; do not reproduce that inconsistency. No hash update was observed after its scripted jump.
- At<=890px tools/prose stack within the left column. At<=720px media comes first, followed by tools then prose, with70px between media and details and80px case top spacing. At390px inset15.6px, heading32px; reference's four metadata columns and last jump label become cramped. Local metadata will use two columns on small phones and nonbreaking numbered links as deliberate readability improvements.
- Theme swatches expose codes with opacity transitions; no verified portfolio palettes are supplied, so do not invent color codes. Replace that region with factual role/team information. No additional media hover action was observed. Shared theme, menu, smooth scrolling, cursor, progress and footer remain.
- Available owned assets: one genuine preview per project, with1600/1920 detail variants in CleanPortfolio. No additional gallery or recording is listed. Use one still without fabricating extra views or motion, and preserve the public case-study destination. Do not copy reference client assets or unsupported metrics.

Comparison stages: P01 heading/navigation and shared page shell; P02 first case desktop/mobile; P03 remaining cases, anchor destinations and media; P04 footer/navigation/regressions. Each must be browser checked before expanding. Exact video parity is blocked by missing owned recordings; physical-device and other-browser verification remain outside current evidence.

Implementation comparison2026-10-16: P01–P04 checked in that order. Desktop1440 local heading y141.21/reference141.33; case metadata starts322.03/reference322; prose x183/reference183.04; media x464 and934px wide in both. Own text changes metadata height and total page length. Local390/834 and720/721 inspected; metadata now uses two columns at<=1000px after a real721px overflow was found and fixed. Final boundary checks have0 horizontal overflow. Live numbered scrolling, direct hash/reload, reduced motion, themes, contact navigation and Back tested; Back reset now cancels a restored exit tween. All six owned previews rendered. Still media, factual role/team replacing unknown palettes, and narrower metadata layout are intentional adaptations, not exact reference parity. Detailed results and remaining limits are in the latest implementation ledger.

## 2. Motion inventory

| ID  | Effect              | Trigger / progression                                         | Evidence and target                                                                                                                                                                                                                       |
| --- | ------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Smooth scroll       | Wheel; content interpolates toward native scroll              | Observed 600px input settles over ~1s. GSAP smooth=1; reference off=0.1. Local off will be native.                                                                                                                                        |
| A02 | Perspective         | Fine pointer movement; settles on stop, neutral on disable    | Reinspected 2026-10-12: shared `.home-3` parent moves all three panels; side panels add equal translation and unequal rotations. The middle therefore moves less, not zero. See position samples below. Disable for touch/reduced motion. |
| A03 | Hero parallax       | Scroll from hero top, reversible                              | Source nav y=-60/blur2, title y=-40, emblem blur4, scrub1; remeasure against local assets.                                                                                                                                                |
| A04 | Background lines    | Continuous                                                    | Source approximately 30s cycles; observed motion.                                                                                                                                                                                         |
| A05 | Lightning           | Delayed continuous irregular flashes                          | Source 10s loop/2s delay; opacity time series confirms flashes. Use original motif, reduce flashing intensity.                                                                                                                            |
| A06 | CTA ticker          | Continuous linear                                             | 28s loop observed/source-confirmed.                                                                                                                                                                                                       |
| A07 | Section title       | Enters viewport                                               | Height 0 -> natural, 1s power3.out.                                                                                                                                                                                                       |
| A08 | Horizontal gallery  | Vertical scroll pin plus pointer-controlled shared 3D wrapper | Source travel=track width + heading width +26 - viewport; distance=travel/1.4. Pointer X translates/rotates Y; pointer Y translates/rotates X. See position samples below.                                                                |
| A09 | Project cursor      | Media hover / pointer movement                                | ~100px circular label, scale 0->1, ~350ms overshoot. Desktop only.                                                                                                                                                                        |
| A10 | Pointer trail       | Pointer movement                                              | Reinspected: 20 individually positioned white 26px circles, scaling from 1 to .05, with difference blend on parent. Rapid relocation visibly separates circles. Exact per-frame follow timing remains unmeasured.                         |
| A11 | Project video       | Intersection                                                  | Muted loop; visible playback advances, offscreen pauses. No owned videos available yet.                                                                                                                                                   |
| A12 | Word reveal         | Intersection threshold .4                                     | Blur6/opacity0 -> clear, ~600ms CSS, small randomized delays; once, not reverse.                                                                                                                                                          |
| A13 | Contact heading     | Top enters ~90% viewport                                      | y=-100% -> 0, duration600ms/stagger50ms; reverses above trigger.                                                                                                                                                                          |
| A14 | Contact pin         | Desktop >=1080                                                | Left at ~8vh until form bottom; observed.                                                                                                                                                                                                 |
| A15 | Menu                | Open/close                                                    | Open400ms power3.out; close300ms power2.in; backdrop ~200ms plus CSS.                                                                                                                                                                     |
| A16 | Footer tilt         | Pointer over artwork, reset on leave                          | Damping .12 and short CSS transition; observed neutral reset.                                                                                                                                                                             |
| A17 | Footer marquee      | Continuous linear                                             | 20s repeating loop.                                                                                                                                                                                                                       |
| A18 | Page exit           | Navigation                                                    | Smooth wrapper fades ~600ms, fallback navigation by700ms.                                                                                                                                                                                 |
| A19 | Bottom continuation | Continued downward wheel at bottom                            | ~6000px accumulated delta; reset after ~800ms idle. Real reference navigated to /projects/.                                                                                                                                               |

### Pointer-position reinspection — 2026-10-12

Implementation update 2026-10-13: hero shared/side gains implemented in `be22ebe`; gallery shared wrapper now implemented with the observed 49px travel, 9.8-degree tilt, +3-degree yaw cap, and a separate 49px/2.8-degree heading layer. Toggle cleanup and first/last-card behavior checked in-browser. The source confirms the +3 cap; it is no longer inferred solely from position samples. See the Stage 9 iteration ledger for the keyboard-scroll regression and its fix, plus remaining layout and timing limits.

Live Chrome inspection at approximately 1652x880, desktop/fine pointer, perspective enabled. Pointer was placed by a coordinate click on non-navigating space; the resulting running transforms and visible geometry were checked. Values are approximate settled samples, not a guarantee of identical behavior at other widths or during pointer acceleration.

- Hero: the shared `.home-3` parent moves all three artworks. At x~100/y450, it translated x~+12.3px and rotated Y~-1.23deg. Both side children additionally translated x~+24.6px; left rotated Y~-2.46deg and right Y~-0.615deg. At x~1550/y450, parent x~-12.3px/Y~+1.23deg and side children x~-24.5px, with Y~+2.45deg left and +0.613deg right. At x~100/y800, parent y~-11.45px/X~-1.15deg; both sides added y~-22.9px, X~-2.29deg left and -0.57deg right. The center `.home-3-2` has no _additional_ transform, but inherits its parent's motion. Net translations are therefore about 3x larger on the sides than the center at those points. Side-child rotation is about 4:1 left:right; net rotation includes the shared parent and differs less. This confirms the user's different-sensitivity observation.
- Homepage gallery: the shared `.projects-container-wrapper` at x~100/y800 translated (+43,-40)px and rotated (Y~-8.61deg, X~-8.01deg). At x~1550/y800 it translated (-43,-40)px and rotated (Y~+3deg, X~-8.02deg). At x~825/y800, X translation/rotation was ~0 while X rotation stayed ~-8.02deg; at x~825/y50 it translated y~+43.4px and rotated X~+8.68deg. The right-hand Y rotation appeared capped near +3deg in these samples; confirm its full envelope before choosing code constants. The 3D projection of this one wide strip explains why different cards appear nearer/farther depending on pointer X; no evidence of per-card mouse handlers was seen.
- Standalone `/projects/`: the first project media wrapper, container, and video remained `transform:none` after tested left and right pointer placements. This does not rule out other interactive media farther down the page; only the visible first block was checked.
- Cursor: `#cursor` contained 20 separate spans. Each had a 26px white circular base, decreasing scale in .05 steps; the parent used `mix-blend-mode:difference`. Fast cursor relocation produced visible discrete dots, not a single drawn path. Sampling after UI input lets some dots settle, so precise speed-dependent spacing/decay remains to be captured in a continuous recording.

## 3. Interaction inventory

| ID  | Control           | Observed behavior / local contract                                                                                                                                   |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I01 | Theme             | Red #EB0004 / purple #5135CD; reference swaps 3 art sources and persists theme. Local changes original duotone treatment.                                            |
| I02 | Perspective       | Toggle resets transforms; fine pointers only.                                                                                                                        |
| I03 | Hints             | Reveals control annotations; aria pressed state.                                                                                                                     |
| I04 | Smoothing         | Reference preference survives reload. Local native off state intentional.                                                                                            |
| I05 | Contact / Skip    | Contact scrolls to form, Skip to contact region; reference anchor offset ~120px.                                                                                     |
| I06 | Progress          | Reference drag tested; visible-track midpoint click produced no scroll change in reinspection. Local native range deliberately adds reliable click/keyboard seeking. |
| I07 | Menu              | Backdrop and Escape close; document scroll retained. Local keyboard behavior improves reference.                                                                     |
| I08 | Choice buttons    | Exclusive single choice; independently toggled multi choice, tested.                                                                                                 |
| I09 | Form              | Never submitted reference. Local mailto draft and copy fallback only; no false sent state.                                                                           |
| I10 | Project links     | Existing https://www.devbyrey.me/projects/{slug} destinations.                                                                                                       |
| I11 | Next / overscroll | All-projects destination with visible progress; reduced/touch explicit link only.                                                                                    |
| I12 | Resize            | Reference reloads crossing768; local contexts rebuild without reload.                                                                                                |

## 4. Design system, assets and architecture

- Cascadia Code, weight400 as main type; fluid oversized headings, italic contact heading; black page background with light gray text. The menu/consent overlays are light, not the main page.
- Self-host font with its license. Accent red #EB0004 / purple #5135CD. Confirm exact neutral colors/borders through stage captures.
- Final adaptation uses #A48AFF for purple text on black to improve readability, while purple artwork and the supplied logo colorway remain deep #5135CD. The white menu retains the deep accent.
- Responsive WebP portrait and six project preview families from existing CleanPortfolio assets. Copy only public portfolio assets needed here; do not alter original checkout.
- Keep critical portrait visible by default; no loader event or delayed hidden-opacity gate.
- No owned mp4/webm found. Still previews are an acknowledged fidelity gap; optional video interface supports later genuine recordings.
- No Kala client artwork, logos, analytics IDs, IP geolocation, or foreign form endpoint.
- Runtime reference verified GSAP/ScrollTrigger/ScrollSmoother3.14.2, no homepage canvas. Local: React/TypeScript/Vite, CSS, GSAP, @gsap/react. No Three.js, backend, or second animation library.
- One smoother; component-scoped animation cleanup and matchMedia; refresh after fonts/images; no full-page reload on responsive changes.
- Reduced motion: native scroll, unpinned vertical projects, static words/artwork/marquees, no custom cursor, no auto navigation.

Sources: https://www.trykala.com/, /script.js, /common.js, /styles.css, /common.css; https://gsap.com/resources/React/; https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/.

## 5. Comparison checklist and limitations

Correction2026-10-14: reference `#cursor` has an active SVG goo filter (blur6, alpha35/-15), missed in the earlier trail review. Fast automated jumps can still separate its dots. Per the user's clarified preference, the local trail now adds tapered connections and this filter for continuous motion, hides completely on project hover, and returns on exit. Reference help uses fixed red leader-line annotations in staggered rows, not rotated overlapping labels; the local controls now follow that placement pattern. This supersedes the earlier separate-circle acceptance notes. See the latest implementation ledger for live checks and evidence.

Status vocabulary: unimplemented; implemented/unverified; verified (specific checks only); intentional difference; blocked; regression. Never use verified to imply pixel-identical adaptation.

| Section             | Reference inspection                                                   | Local state                          | Evidence / unresolved differences                                                                                                                                                                                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S01 header/global   | Reinspected1440x900 and390x844                                         | verified adaptation                  | Theme/logo variants, menu/contact integration, range click/keyboard, skip, page exit/Back and resize matrix checked. Final live reinspection unavailable after browser tool changed.                                                                                                                                                   |
| S02 hero/ticker     | Pointer positions1652x880; local1468x936 retest                        | verified pointer adaptation          | Shared parent14px/1.4deg; side children28px with2.8deg left and0.7deg right. Center inherits only parent. Settled samples, running movement and toggle cleanup checked. Frame-perfect timing remains unverified.                                                                                                                       |
| S03 projects        | Reference/local1468x936 and earlier1652x880                            | verified pointer adaptation          | Shared wrapper49px/9.8deg, positive yaw capped3deg; heading49px/2.8deg. Scroll translation remains separate. First/last cards, keyboard focus, reverse, toggle and narrow/reduced layouts checked. Six-card geometry and heading placement differ from reference; no pixel-identical claim. Separate destination page tilt not added.  |
| S04 statement       | Reinspected390px; prior desktop observed                               | verified adaptation                  | Local390/1440 rendered, reveal time samples to opacity1, stays revealed on reverse. Anchor109.87px; gallery progress1 at exit. Own copy changes line breaks.                                                                                                                                                                           |
| S05 contact         | Reinspected desktop form/pin                                           | verified adaptation                  | 1440x900 form top110.18/left pin72.18;390x844 stacked358.8px form. Choices, required/email validation, prepared/shared draft invalidation, copy success and heading reverse checked. No backend; clipboard denial/mail client untested.                                                                                                |
| S06 menu            | Reinspected1440x900/390x844                                            | verified adaptation                  | Independent900px scroll with pageY0, Escape/backdrop, shared draft/resize and anchors pass. Extended test required explicit focus-loop fix;34 forward Tabs and reverse wrap pass. Reduced-motion setting added. Physical touch unverified.                                                                                             |
| S07 footer/global   | Reinspected cursor filter and live sweeps2026-10-14                    | verified continuous-trail adaptation | 20 tapered samples with goo filter and connecting strokes per user preference. Actual fast drag rendered continuously. Entire trail hidden on project hover; View project alone visible; trail restored on exit. Menu/narrow/reduced exclusions retained. Exact reference timing remains unverified.                                   |
| S08 consent         | Observed                                                               | intentional difference               | No analytics, no unnecessary consent dialog.                                                                                                                                                                                                                                                                                           |
| S09 project details | Live1440/1652 desktop,390 phone; media playback and scrolling observed | verified adaptation                  | Six own cases, staggered desktop columns, media-first <=720 layout, native deep links and smooth jumps, shared controls/footer. Local1440/834/390 and720/721 tested. One still per case replaces missing recordings; two-column metadata <=1000 avoids overlap. Back fade regression fixed and retested. No exact timing/media parity. |

Cross-browser Safari/Firefox, physical-device touch, precise hover/easing parity and continuous video capture remain gaps. Reference track click was attempted with no movement; local native click seeking is a verified deliberate improvement. Stage9 used the live development preview, followed by a desktop production-browser smoke check on2026-10-14 (hero, gallery pointer/scroll transforms, circle trail, zero document overflow and no captured warnings/errors). Every stage's viewport, settings, measurements, evidence, fixes and regressions are recorded in IMPLEMENTATION_PLAN.md. No pixel-identical claim is made.

# Local destination expansion — 2026-10-17

- User supersedes the earlier original-portfolio fallback: navigation must stay within this showcase for portfolio content. Real social profiles and live demos remain external.
- Inspected original `/cv` at 1440×900 and 390×844. Observed title/summary, Download PDF and Open PDF actions, format/length/update metadata, then one full uncropped static preview. Mobile stacks the title/actions above three metadata columns. Source loader appeared on navigation; its duration was not measured and is not replicated.
- Local CV deliberately adapts that content hierarchy to the showcase's black background, monospace, accent italic headline, existing shared navigation and motion settings; not a pixel-match claim.
- [x] Local `/cv/` production entry, desktop and phone screenshots inspected, preview decoded at 1530×1980, local PDF action destinations checked.
- [x] Six individual `/projects/{slug}/` entries with challenge, approach, results, local previews and related links. Original Wave & Wish page inspected at390×844 including its private-commission notice; local phone comparison uses the same viewport. New individual-page composition is a deliberate adaptation, not a Kala pixel-match: Kala has only the long overview page. Local desktop1440×900 and phone390×844 inspected. All six routes have three story sections, two local related links, decoded images and no phone overflow.
- [x] Case-study jump observed in motion (target moved from1469px to189px during easing), then phone reload restored the anchor at120px. Existing smoothing and focus behavior reused; exact source timing remains unmeasured.
- [x] Remaining link audit and navigation regression checks (2026-10-18): runtime homepage links and all six case pages have zero original-portfolio anchors; a source regression test rejects `devbyrey.me` and `portfolioUrl` in UI files. Hero artwork, project cards, overview case links, ticker, CV menu and certificate image actions now target local routes/assets. This supersedes historical external-link entries below/above.
- [x] Actual hero→Wave & Wish, overview→Duely, related→Wave & Wish, browser Back (root opacity1), menu→CV, PDF download and certificate-image new-tab tested. Download returned the local PDF successfully. Certificate DataCamp query still yields5 records.
- [x] Desktop1440 and phone390 checked; final320px Iloilo Farmers Hub layout has no horizontal overflow, readable two-column role/timeline plus full-width stack. Purple theme and reduced-motion keyboard toggle checked; reduced case-study jump lands at119.99px without easing. Normal motion/red theme restored.
- [ ] Physical touch, Safari/Firefox and exact source animation timing remain unverified. No new reference-motion parity is claimed. Public live demos/social profiles were left intact, not reimplemented.
