# Reference specification — Experiment Folio

Reference: https://www.trykala.com/

Portfolio: https://www.devbyrey.me/

Target repository: https://github.com/randrada-usa/experiment-folio

Inspection date: 2026-10-09

Implementation comparison updated through2026-10-12. See IMPLEMENTATION_PLAN.md for the per-section evidence and final coverage limits.

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

## 2. Motion inventory

| ID  | Effect              | Trigger / progression                                            | Evidence and target                                                                                                               |
| --- | ------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Smooth scroll       | Wheel; content interpolates toward native scroll                 | Observed 600px input settles over ~1s. GSAP smooth=1; reference off=0.1. Local off will be native.                                |
| A02 | Perspective         | Fine pointer hover/movement; settles on stop, neutral on disable | Observed; source intensity .35, damping .12; distinct layer depths. Disable for touch/reduced motion.                             |
| A03 | Hero parallax       | Scroll from hero top, reversible                                 | Source nav y=-60/blur2, title y=-40, emblem blur4, scrub1; remeasure against local assets.                                        |
| A04 | Background lines    | Continuous                                                       | Source approximately 30s cycles; observed motion.                                                                                 |
| A05 | Lightning           | Delayed continuous irregular flashes                             | Source 10s loop/2s delay; opacity time series confirms flashes. Use original motif, reduce flashing intensity.                    |
| A06 | CTA ticker          | Continuous linear                                                | 28s loop observed/source-confirmed.                                                                                               |
| A07 | Section title       | Enters viewport                                                  | Height 0 -> natural, 1s power3.out.                                                                                               |
| A08 | Horizontal gallery  | Vertical scroll, pin, reversible scrub                           | Source travel=track width + heading width +26 - viewport; distance=travel/1.4. Compute dynamically, never fixed page coordinates. |
| A09 | Project cursor      | Media hover / pointer movement                                   | ~100px circular label, scale 0->1, ~350ms overshoot. Desktop only.                                                                |
| A10 | Pointer trail       | Pointer movement                                                 | Separate difference-blend trailing dots; source-confirmed. Visually retest with project cursor.                                   |
| A11 | Project video       | Intersection                                                     | Muted loop; visible playback advances, offscreen pauses. No owned videos available yet.                                           |
| A12 | Word reveal         | Intersection threshold .4                                        | Blur6/opacity0 -> clear, ~600ms CSS, small randomized delays; once, not reverse.                                                  |
| A13 | Contact heading     | Top enters ~90% viewport                                         | y=-100% -> 0, duration600ms/stagger50ms; reverses above trigger.                                                                  |
| A14 | Contact pin         | Desktop >=1080                                                   | Left at ~8vh until form bottom; observed.                                                                                         |
| A15 | Menu                | Open/close                                                       | Open400ms power3.out; close300ms power2.in; backdrop ~200ms plus CSS.                                                             |
| A16 | Footer tilt         | Pointer over artwork, reset on leave                             | Damping .12 and short CSS transition; observed neutral reset.                                                                     |
| A17 | Footer marquee      | Continuous linear                                                | 20s repeating loop.                                                                                                               |
| A18 | Page exit           | Navigation                                                       | Smooth wrapper fades ~600ms, fallback navigation by700ms.                                                                         |
| A19 | Bottom continuation | Continued downward wheel at bottom                               | ~6000px accumulated delta; reset after ~800ms idle. Real reference navigated to /projects/.                                       |

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

Status vocabulary: unimplemented; implemented/unverified; verified (specific checks only); intentional difference; blocked; regression. Never use verified to imply pixel-identical adaptation.

| Section           | Reference inspection                        | Local state            | Evidence / unresolved differences                                                                                                                                                                                                                                                                |
| ----------------- | ------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S01 header/global | Reinspected1440x900 and390x844              | verified adaptation    | Theme/logo variants, menu/contact integration, range click/keyboard, skip, page exit/Back and resize matrix checked. Final live reinspection unavailable after browser tool changed.                                                                                                             |
| S02 hero/ticker   | Reinspected1440x900/390x844 + time samples  | verified adaptation    | Desktop center608.5px vs reference~609px; phone358.8px in baseline pass. Ticker advances; perspective toggles neutral. Repeat reloads pass. Own artwork, milder lightning and the supplied logo's taller mobile composition are intentional; final captures supersede placeholder-logo geometry. |
| S03 projects      | Reinspected pin/reverse/mobile              | verified adaptation    | Local1440x900 pin and reverse time series;390x844 six cards/media;768/769 cleanup0/1 pins. Six vs four and still media deliberate.                                                                                                                                                               |
| S04 statement     | Reinspected390px; prior desktop observed    | verified adaptation    | Local390/1440 rendered, reveal time samples to opacity1, stays revealed on reverse. Anchor109.87px; gallery progress1 at exit. Own copy changes line breaks.                                                                                                                                     |
| S05 contact       | Reinspected desktop form/pin                | verified adaptation    | 1440x900 form top110.18/left pin72.18;390x844 stacked358.8px form. Choices, required/email validation, prepared/shared draft invalidation, copy success and heading reverse checked. No backend; clipboard denial/mail client untested.                                                          |
| S06 menu          | Reinspected1440x900/390x844                 | verified adaptation    | Independent900px scroll with pageY0, Escape/backdrop, shared draft/resize and anchors pass. Extended test required explicit focus-loop fix;34 forward Tabs and reverse wrap pass. Reduced-motion setting added. Physical touch unverified.                                                       |
| S07 footer        | Reinspected desktop/phone and timed marquee | verified adaptation    | 1440/390 geometry; running loop/tilt/reset/fade measured; bottom continuation reaches own projects; Back resets opacity; phone/reduced exceptions tested. Footer reachability fixed.                                                                                                             |
| S08 consent       | Observed                                    | intentional difference | No analytics, no unnecessary consent dialog.                                                                                                                                                                                                                                                     |

Cross-browser Safari/Firefox, physical-device touch, precise hover/easing parity and continuous video capture remain gaps. Reference track click was attempted with no movement; local native click seeking is a verified deliberate improvement. Last inspected production bundle and final rebuild match; browser controls were unavailable for an additional final handoff pass. Every stage's viewport, settings, measurements, evidence, fixes and regressions are recorded in IMPLEMENTATION_PLAN.md. No pixel-identical claim is made.
