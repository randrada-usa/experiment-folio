# Experiment Folio

Rey Jane Andrada’s animation-showcase homepage, project details and searchable certificate collection. Built with React, TypeScript, Vite and GSAP, adapting the composition and motion of [Kala](https://www.trykala.com/) to original portfolio content and the supplied RJ logo.

## Run locally

Requires Node.js24+ and npm.

```sh
npm ci
npm run dev
```

Open the printed localhost URL (default `http://127.0.0.1:5173`). The server binds only to loopback. No API keys, environment variables, backend, or analytics are needed.

```sh
npm run build
npm run preview
npm test
npm run format:check
```

`build` includes TypeScript checking; `test` covers certificate inventory/filtering, draft encoding, cursor calculations and continuation behavior. Browser tests and comparison findings are recorded in [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md), not implied by the unit tests.

## Features

- Theme-aware supplied red/purple RJ artwork, layered portrait hero, pointer perspective and CTA ticker.
- Six-project desktop pinned gallery, native mobile stack, one-time word reveals, and a pinned certificate introduction beside a two-column, ten-certificate preview. Both “View all certs” links open the complete local collection.
- Local `/certifications/` page with all 27 owned certificates, title/issuer/description search, five category filters, shareable search state, numbered index and full document images. Each card links to an anchored detail; related links reveal hidden targets and browser Back restores prior filters. Below-fold images load lazily with reserved dimensions. The build emits `dist/certifications/index.html` for direct static-host access.
- Local `/projects/` overview with numbered project anchors, staggered tools/story/media columns, and media-first phone layout. All six projects also have their own `/projects/{slug}/` pages with challenge, technical approach, results and related projects. Hero artwork and homepage cards open these pages.
- Local `/cv/` page with the existing August 2026 CV preview, PDF download and Open PDF actions. Certificate full-image actions also use local assets. No site navigation links to the original portfolio; social profiles, live demos and reference attribution remain external.
- The build emits ten HTML entries (home, project overview, six case studies, certificates and CV), so direct links do not depend on a hosting rewrite.
- Independently scrollable accessible menu with the inquiry form, native validation, email-draft preview and copy fallback. “Let’s Talk” opens this menu; the former homepage form is now certificates. **No message is sent by the site.** Reload clears drafts; theme, perspective, smoothing and motion preferences persist locally.
- Footer tilt/marquee, keyboard-accessible progress control, pointer trail and page exit fade. Continued downward wheel at the desktop page end advances home → projects → certificates → homepage contact after6000px of accumulated input.800ms idle resets progress.
- Device reduced-motion preference and menu override disable decorative motion, smooth scrolling, pins, cursors and automatic continuation. Narrow screens and coarse pointers never auto-continue.

## Editing

- `src/content.ts`: social links and project summaries/media. `src/project-studies.ts`: project overview and metadata. `src/project-case-content.ts`: full case-study content preserved from the original public portfolio. Results describe the documented project evaluations, not fresh production measurements. Unpublished projects and private source links are excluded.
- `src/certificates.ts`: complete certificate records and image dimensions, with the first ten used for the homepage preview. Images live in `public/assets/certs/`. Update this source and its owned image assets together when adding certificates. `src/pages.ts` defines shared navigation destinations.
- `src/Logo.tsx` and `public/assets/brand/`: supplied red logo and generated purple colorway. CSS frames the original square canvases without modifying their pixels.
- `src/motion.tsx`: shared GSAP lifecycle and preferences. `src/GlobalMotion.tsx`: progress, pointer and navigation behavior.
- Section components and their CSS are separate. Reinspect reference and test the corresponding local section before recording a match or moving on.
- [REFERENCE_SPEC.md](./REFERENCE_SPEC.md): reference inventory and comparison checklist. [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md): stages, tests and unresolved differences. [ASSET_NOTES.md](./ASSET_NOTES.md): provenance and exact image-edit prompt.

## Known boundaries

This is an adaptation, not a pixel-identical copy. Own branding/copy, six projects rather than four, static project previews rather than unavailable owned video clips, accessible modal behavior and brighter purple text are deliberate differences. No reference artwork, form service, analytics or consent prompt is copied. Physical touch hardware, Safari/Firefox, OS-level reduced-motion switching, clipboard-denial UI and configured mail clients still need independent checks. Browser viewport resizing is not real-device certification.

Commit and verification milestones are recorded in the implementation ledger. A local build or commit does not publish the website. `dist/` and local screenshots in `artifacts/` are ignored. Original CleanPortfolio source was read but not modified.
