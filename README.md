# Artist website

SECKY's identity, biographies, supplied hero/About photos, Spotify/Apple Music profiles and four platform-identified releases are integrated after Phase 4. No release is featured yet; covers and contact details are still missing. Release-candidate QA is complete; see docs/qa-report.md for launch blockers. No backend or account features are included.

## Setup and development

Use Node.js 24 or newer and npm. Verified locally with Node 24.21.0 and npm 11.19.0. From the project root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173/`. In Windows PowerShell, use `npm.cmd` instead of `npm` if execution policy blocks the npm PowerShell shim. Stop the server with Ctrl+C.

```sh
npm run typecheck
npm run test:releases
npm run build
npm run preview
```

The build runs strict TypeScript checks and outputs the application to `dist/`. Preview serves that build locally, normally at `http://127.0.0.1:4173/`. The application needs an HTTP server; do not open the root HTML directly from disk. The earlier standalone study at `preview/index.html` can still be opened directly and remains unchanged.

Dependencies are pinned in `package.json` and `package-lock.json`: React/React DOM 19.3.1, TypeScript 7.0.2, Vite 8.3.4, React Vite plugin 6.1.2, Tailwind and its Vite plugin 4.3.3. Setup follows the official [Vite guide](https://vite.dev/guide/) and [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite). Use `npm ci` for reproducible installs; do not upgrade packages as part of ordinary content changes.

## Structure

- `src/content/artist.ts`: typed artist information, optional image/logo definitions, public booking address, social and streaming profiles.
- `src/components/`: reusable header, footer, buttons, links, layout containers, headings, image/profile rendering and artist sections.
- `src/styles.css`: original visual-direction tokens and responsive styling, plus Tailwind integration/utilities.
- `src/App.tsx`: section composition; `src/main.tsx`: application entry.
- `preview/`: archived Phase 2 design study and temporary images. These images are no longer imported by the application. The open `preview/index.html` tab is the old mockup; use the Vite local URL to see SECKY's integrated site.
- `docs/`: scope, content requirements, design direction and implementation progress.
- `scripts/check-foundation.mjs`: targeted browser verification helper.

## Editing content

Edit `src/content/artist.ts`, not layout components. Change stage name, tagline, introduction, headings, short biography and biography paragraph array there. The page title follows the stage name. Add approved photography under an appropriate asset directory, import it and update the image's `src`, dimensions, `alt` and optional caption. Set an optional image/logo to `undefined` to omit it; the hero expands to one column without a photograph.

Set `bookingEmail` to the verified public address. The contact component renders it as a `mailto:` link; blank or malformed values render an honest unavailable message. There is no form or sending service. Social/streaming arrays contain `{ label, url }` entries. Only nonempty labels with valid HTTPS URLs are displayed. They open in the same tab and have visible text labels; decorative arrows are hidden from assistive technology. Empty arrays produce no placeholder links or empty link headings. Manually verify the actual artist destination; syntax validation does not establish ownership.

Current artist copy is client-supplied and `isDraft` is false, removing obsolete sample-copy notices. This does not mean launch-ready: noindex remains in place, and release artwork, booking/social details and copyright attribution are pending. Spotify and Apple Music profile links use the exact supplied URLs. Test `.test` URLs stay inside isolated fixtures. Set `copyrightOwner` only when confirmed. The full biography is supplied copy; supporting award/FIFA evidence and the final capital Y in the full name are tracked in the checklist.

Artist content uses a typed file in place of the initial JSON proposal. Release data is maintained separately in `src/content/releases.ts`; see [release management](docs/release-management.md) for adding, editing, featuring, removing and verifying releases. `src/lib/releases.ts` handles selection, dates and listening decisions; `src/components/Releases.tsx` renders the artwork, grid and inline chooser. With no featured release selected, hero Listen Now targets `#music`, which offers both artist profiles. An explicitly featured release with an available listening/pre-save action switches that anchor to `#latest`.

Maintain `pageTitle` and `metaDescription` in the artist content and the matching initial metadata in root `index.html`. The requested title is `SECKY | Official Website`. Initial HTML includes Open Graph and Twitter title/description tags and a locally derived S-dot SVG favicon. Final domain, canonical URL, sitemap, public robots configuration and approved sharing image remain pending; retain noindex until launch approval. See [content sources](docs/content-sources.md) before changing release metadata or achievement wording.

## Navigation and accessibility

Below 640px, Menu toggles a labelled navigation disclosure with `aria-expanded` and `aria-controls`. Enter/Space activate the native button; Tab moves through links; Escape closes and returns focus to Menu. Selecting a link closes the disclosure and focuses its target section. Leaving the header closes it; switching breakpoints resets it. It is a nonmodal disclosure, so focus is not trapped. Desktop navigation remains visible.

A ResizeObserver measures the sticky header to set the anchor offset, including wrapped names. Sections can receive programmatic focus. Focus outlines, a skip link, image descriptions, semantic landmarks and reduced-motion behaviour are included. Text wraps without clipping. Catalogue columns follow mobile/tablet/desktop sizing. Multiple listening platforms use a native inline disclosure with keyboard/touch operation and Escape-to-close with focus return.

## Browser checks

The focused helper requires Node 24, the dev server on port 5173 and a dedicated Chromium/Edge debugging instance on port 9223. For Windows PowerShell, in another terminal:

```powershell
Start-Process -FilePath 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' -ArgumentList '--headless','--disable-gpu','--disable-extensions','--no-first-run','--remote-debugging-port=9223',('--user-data-dir="' + (Join-Path $PWD '.qa-browser') + '"'),'about:blank' -WindowStyle Hidden
```

Once that browser is listening, run:

```sh
node scripts/check-foundation.mjs
```

The helper closes its dedicated browser on completion. It checks 320, 390, 768, 1440 and 1920px layouts, images and anchors, keyboard menu interactions, sticky-heading clearance, reduced motion, omission of missing links and valid contact/profile rendering using isolated test content. `.qa-browser/` is ignored by Git and the Vite watcher. Do not point the helper at a personal browsing session. Existing Phase 2 checks under `preview/` target only that historical static mockup.

## Outstanding content and later work

Remaining inputs: all cover artwork, featured selection, canonical full catalogue, booking/management email, social handles, copyright attribution, brand approval and claim/name confirmations. The identity, hero copy, biographies and two artist profile URLs have been supplied and integrated. Catalogue sources and limited-access URLs are recorded in `docs/content-sources.md`. Responsive image optimisation and targeted production QA are complete. No deployment, broad cross-browser audit, physical-device testing or screen-reader audit has been performed. See docs/qa-report.md.

The production build also runs eight release logic/content tests. The existing browser helper now includes isolated release fixtures via `scripts/browser-release-checks.mjs` and `scripts/browser-fixtures.ts`; neither is imported into the production application. It tests all listening branches, artwork failure, feature exclusion, responsive catalogue columns, keyboard and emulated touch without navigating to fictitious destinations.

