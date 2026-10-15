# Experiment Folio

Rey Jane Andrada’s animation-showcase homepage and project details. Built with React, TypeScript, Vite and GSAP, adapting the composition and motion of [Kala](https://www.trykala.com/) to original portfolio content and the supplied RJ logo.

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

`build` includes TypeScript checking; `test` covers draft encoding and continuation calculations. Browser tests and comparison findings are recorded in [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md), not implied by the unit tests.

## Features

- Theme-aware supplied red/purple RJ artwork, layered portrait hero, pointer perspective and CTA ticker.
- Six-project desktop pinned gallery, native mobile stack, one-time word reveals, responsive contact pin.
- Local `/projects/` page with numbered project anchors, staggered tools/story/media columns, and media-first phone layout. Each case retains a link to its full existing portfolio case study. The build emits both `dist/index.html` and `dist/projects/index.html`, so direct project links do not depend on a hosting rewrite.
- Independently scrollable accessible menu, shared in-memory inquiry form, native validation, email-draft preview and copy fallback. **No message is sent by the site.** Reload clears drafts; theme, perspective, smoothing and motion preferences persist locally.
- Footer tilt/marquee, keyboard-accessible progress control, pointer trail and page exit fade. Continued downward wheel at the desktop homepage end opens the local projects page after6000px of accumulated input; the project page continues to homepage contact.800ms idle resets progress.
- Device reduced-motion preference and menu override disable decorative motion, smooth scrolling, pins, cursors and automatic continuation. Narrow screens and coarse pointers never auto-continue.

## Editing

- `src/content.ts`: portfolio links and project summaries/media. `src/project-studies.ts`: local detail-page copy adapted from the existing portfolio. Full original case studies remain on `www.devbyrey.me`.
- `src/Logo.tsx` and `public/assets/brand/`: supplied red logo and generated purple colorway. CSS frames the original square canvases without modifying their pixels.
- `src/motion.tsx`: shared GSAP lifecycle and preferences. `src/GlobalMotion.tsx`: progress, pointer and navigation behavior.
- Section components and their CSS are separate. Reinspect reference and test the corresponding local section before recording a match or moving on.
- [REFERENCE_SPEC.md](./REFERENCE_SPEC.md): reference inventory and comparison checklist. [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md): stages, tests and unresolved differences. [ASSET_NOTES.md](./ASSET_NOTES.md): provenance and exact image-edit prompt.

## Known boundaries

This is an adaptation, not a pixel-identical copy. Own branding/copy, six projects rather than four, static project previews rather than unavailable owned video clips, accessible modal behavior and brighter purple text are deliberate differences. No reference artwork, form service, analytics or consent prompt is copied. Physical touch hardware, Safari/Firefox, OS-level reduced-motion switching, clipboard-denial UI and configured mail clients still need independent checks. Browser viewport resizing is not real-device certification.

Homepage work through `ce98ec2` was pushed to GitHub; the project-details expansion is recorded separately in the implementation ledger. No deployment is performed by this repository's local build. `dist/` and local screenshots in `artifacts/` are ignored. Original CleanPortfolio source was read but not modified.
