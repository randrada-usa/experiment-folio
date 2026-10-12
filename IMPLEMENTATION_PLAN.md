# Implementation plan — Experiment Folio

## Approved direction

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
