# Release candidate QA

Initial release-candidate QA completed 19 October 2026; current update recorded at the end of this report. Status: ready for client review, **not approved for public launch**. No deployment performed. Review the current application at http://127.0.0.1:4173/ while the production preview is running, or run `npm run build` and `npm run preview`. `preview/index.html` is an archived design study, not this candidate.

## Scope and visible content

| Section | Audit result |
| --- | --- |
| Header | SECKY text identity; MP3, MP4, INFO and Contact anchors; accessible mobile disclosure. |
| Hero | SECKY-only heading with no trailing period or former tagline; supporting text, studio portrait, Listen Now and exact supplied streaming profiles retained. |
| Featured | Functional route to MP3 catalogue remains in the featured-release section. Client must select a release before the agreed featured presentation is complete. |
| MP3 | Six platform-identified releases; existing date-descending cards remain unchanged and the two client-requested EPs are appended last with supplied art and Spotify/Apple Music buttons. |
| MP4 | Four client-supplied YouTube videos with metadata titles; 16:9 click-to-load previews, privacy-enhanced player and Watch on YouTube fallback. Playback/availability unverified. |
| INFO | Supplied full two-paragraph biography and outdoor photograph. Full-name spelling retained. Award/FIFA claims remain client copy pending supporting evidence. |
| Contact | Supplied booking email and streaming profiles; social links omitted. Email delivery remains untested. |
| Footer | Secky.uk wordmark with compact Instagram/X icon-only links; Spotify/Apple Music links are omitted here. Footer color matches the featured section. Copyright owner remains pending. |

The initial QA run introduced no new sections or players. The later client-approved update below adds the MP4 YouTube section; no autoplay, backend or account functionality was introduced. Sample artist copy is absent. Featured release selection, publication approval and other listed client confirmations remain outstanding.

## Changes and measured results

- Added responsive WebP sources at 480px, 800px and original width, with JPEG fallback. Original photographs preserved; no retouching. Hero remains eager/high priority, About lazy with async decoding. Responsive `sizes` accompanies `srcset`; explicit dimensions reserve space.
- WebP bytes, measured on disk: hero 32,468 / 80,976 / 130,370 versus original JPEG 152,908; About 25,906 / 61,886 / 102,648 versus original JPEG 116,917. Actual source choice depends on viewport, pixel density and browser cache. These are file sizes, not network performance scores.
- Added an SVG S-dot favicon derived from the existing text identity and palette, for client review. Production asset returned HTTP 200.
- Added Open Graph type/site name/title/description and Twitter summary/title/description to initial HTML. Verified the served production HTML contains these without JavaScript. No invented handles or domain.
- Fixed low-contrast rust hover text on the dark featured-section background by retaining the light text colour and strengthening its underline.
- Seven text colour pairs computed from design tokens pass 4.5:1: ink/paper 13.34, muted/paper 5.32, button normal 5.42, button hover 7.74, light/dark 12.53, muted/dark 8.53, artwork fallback 4.77. This is a targeted contrast check, not a complete WCAG certification.

## Checks performed

| Check | Actual result |
| --- | --- |
| `npm.cmd run build` | Passed strict TypeScript, 8/8 release tests, Vite production build (32 modules). JS gzip 73.87 kB; CSS gzip 4.82 kB. |
| Development browser suite | Passed Edge headless at 320, 390, 768, 1440 and 1920 CSS px. |
| Production browser suite | Passed same widths against Vite preview on 4173; HTTP 200; no horizontal overflow, missing images or unresolved anchors. Fixture imports intentionally skipped on production, exercised on development. |
| Keyboard/navigation | Enter, Tab, Escape, close-on-selection, restored focus, focused target and sticky-header clearance passed. Visible 3px focus outline verified. |
| Semantics | One h1, ordered h2/h3 hierarchy, one main/header/footer, labelled actions and artist image alternatives passed. |
| Reduced motion | Emulated preference makes scrolling auto; stylesheet disables transitions/animations. |
| Listening | Smart/direct/multiple/unavailable/pre-save branches, future dates, feature exclusion, newest-first order, missing fields and broken artwork fixtures passed. |
| Platform chooser | Native nonmodal details/summary, not a dialog. Enter/Tab/Escape, focus return and emulated touch passed; no focus trap required. |
| Booking/social | Supplied Instagram/X URLs are linked as accessible icon-only footer actions; footer Spotify/Apple Music links are omitted. URL syntax and link attributes passed. Social ownership/live availability and email delivery were not independently verified. Exact streaming profile hrefs remain in the hero and catalogue. |
| Runtime | Zero captured uncaught browser runtime exceptions in development and production. This is not a comprehensive capture of every browser log/network message. |
| Visual review | Refreshed 390px and 1440px full-page screenshots in `docs/review/content-390.png` and `content-1440.png`; readable wrapping/spacing and visible faces without stretching. |

The browser helper forces images eager for full-page captures; source code retains About's lazy loading in normal use. Capture code now waits for responsive source decoding after resizing, fixing an initial screenshot that omitted the About image during source switching. Initial image preparation was interrupted by Vite reloading; generation now finishes encoding all variants before writing them. The retried encoding and all final checks passed.

## External destinations

Rechecked through browsing on 18 October during this phase. Tool responses can be cached; none establishes current playback or worldwide availability. No login or playback performed. Do not replace restricted destinations with guessed URLs.

| Destination | Result / unresolved verification |
| --- | --- |
| [Spotify artist](https://open.spotify.com/artist/2gyg88Hy443exTHje87bKk) | Title identifies Secky; no body returned. Full destination/profile review remains unverified. |
| [Apple Music GB artist](https://music.apple.com/gb/artist/secky/1756161815) | Fetch cache miss; exact supplied URL retained, live check required. |
| [My Name — Apple Music](https://music.apple.com/us/album/my-name-feat-ill-take-you-there-choir/6811251027?i=6811251028) | Cache miss; prior indexed metadata recorded in content-sources.md, live destination unverified. |
| [Celebration — Apple Music](https://music.apple.com/us/album/celebration-in-the-air-fifa-world-cup-2026-feat-fifa/1888957592) | Accessible cached page matches Secky, title, single and 5 April 2026. Playback not tested. |
| [Celebration — Spotify](https://open.spotify.com/track/2AoDhIQASYWEc1FjtXQv6y) | Page title matches track and Secky/FIFA Sound; no body returned. Playback/current availability unverified. |
| [Letter to my wife (Redux) — Apple Music](https://music.apple.com/us/album/letter-to-my-wife-redux/1891233342?i=1891233343) | Fetch error; prior indexed metadata retained, live destination unverified. |
| [Black — Apple Music](https://music.apple.com/us/album/black-single/1843594841) | Fetch error; prior indexed metadata retained, live destination unverified. |

## Launch blockers and client review

1. Confirm publication rights and required credits for the six integrated release covers, approve the partial catalogue and select the featured release. Until then the artwork-led/featured scope remains content-incomplete.
2. Supply a public booking email and verify receipt, or explicitly approve a change to the booking requirement. Supply social links or confirm intentional omission; confirm copyright attribution.
3. Confirm `Success Enwerem Chimezie KingsleY`, biography accuracy, award year/category/evidence and precise FIFA-profile claim. No endorsement or additional achievement has been inferred.
4. Review the colours/type, portrait crops, S-dot favicon, required image credits and publication rights. Confirm the final content for publication.
5. Manually verify the restricted destinations above on the intended platforms/region before launch; correct any mismatches using client-confirmed links.
6. Supply the final HTTPS domain/hosting destination. Then add absolute canonical and `og:url`, an approved sharing image with absolute OG/Twitter image URLs and alt text, and a single-page sitemap. Configure public robots.txt and remove initial HTML `noindex, nofollow` only for approved launch. No domain-dependent files or fake domain values have been generated. Social image previews remain incomplete until this step.

## Limits and repeatable checks

No Lighthouse/axe score, Core Web Vitals field data, throttled performance benchmark, screen-reader session, physical-device test, Safari/Firefox test or social-platform debugger test was run. No full accessibility certification is claimed. Follow-up cross-browser/screen-reader review is recommended before public delivery.

For development fixtures, follow README's dedicated Edge setup and run `node scripts/check-foundation.mjs`. For production, start a fresh dedicated browser and run `$env:QA_URL='http://127.0.0.1:4173/'; node scripts/check-foundation.mjs` in PowerShell. The helper closes its dedicated browser. Set `CAPTURE_CONTENT=1` to refresh captures. Clear `QA_URL` before running development fixtures. Image exports can be reproduced using `node scripts/prepare-images.mjs` with the dev server and dedicated browser running.

## Artwork and About update - 19 October 2026

All four official covers are now integrated at the explicit user request. Apple catalogue lookup matched collection IDs 6811251027, 1888957592, 1891233342 and 1843594841 to artist ID 1756161815. Local 800px square images have descriptive alternatives and lazy loading. See docs/release-artwork-sources.json for provenance. This supersedes earlier missing-artwork statements; featured selection remains pending.

About now uses a balanced portrait-and-text layout, smaller heading and readable 16px biography. The repeated short introduction was removed from this section; the full approved biography is unchanged. Mobile stacks naturally.

Production build, TypeScript, all eight tests and browser checks at 320/390/768/1440/1920px passed. Four loaded covers, no artwork fallbacks, navigation, listening fixtures and keyboard/touch checks passed with no runtime exceptions. Mobile/desktop screenshots were refreshed and visually reviewed. Deployment remains on hold.

## Booking email and link behaviour - 19 October 2026

Added the supplied public booking address Info@seckyworldwide.com as a mailto link. This supersedes previous missing-booking-email notes; actual mailbox delivery has not been tested. All external HTTP(S) links now open a new tab with noopener noreferrer through the shared Link component, including profiles, release destinations and chooser options. Internal anchors and mailto links retain their normal behaviour. Deployment remains on hold.

## Approved MP3 / MP4 / INFO update — 19 October 2026

The current desktop and mobile navigation order is MP3 → MP4 → INFO → Contact. The existing `#music` and `#about` section IDs remain unchanged; the new `#mp4` section is between them. The hero h1 now contains only “SECKY”, without a trailing period or the retired tagline. Existing release artwork, platform destinations, artist biography, both portraits, supporting copy, motto and listening behavior remain.

Four client-supplied YouTube links are in `src/content/videos.ts`, with titles read from public YouTube metadata. The site validates supported HTTPS URL forms and builds embeds from video IDs only. At rest no iframe is present; the visitor must activate the centered play button. Activated players use `youtube-nocookie.com` with autoplay, have a descriptive title and fullscreen support, and retain a direct Watch on YouTube fallback. Previews are 16:9; generated thumbnails use maxres and fall back to hq. No separate approved thumbnail assets were supplied; no uploads, self-hosted MP4s, backend or Tours section were added.

| Verification | Result |
| --- | --- |
| `npm.cmd run build` | Passed strict TypeScript, 8 release tests, 5 video tests and Vite production build. |
| `npm.cmd run check:deployment` | Passed metadata, lockfile, local assets and allowed static artifact check; no video files were emitted. |
| `node scripts/check-foundation.mjs` | Passed desktop/mobile labels, anchors, section order, keyboard navigation, sticky offsets, reduced motion, release checks, video browser checks and five viewport widths (320/390/768/1440/1920px) without horizontal overflow. |
| Browser smoke | Confirmed no iframe before activation; one privacy-enhanced iframe afterward with title/fullscreen; secure canonical fallback; 16:9 layout; mobile nav and hero sizing; no 390px overflow. |
| YouTube playback | Not verified: the browser environment failed to connect to the YouTube iframe endpoint. Live availability/region and playback remain client-review checks. |

All four supplied links are included; no URLs are missing. YouTube metadata provided the titles. No approved thumbnails were supplied, so the cards use generated YouTube previews with fallback behavior. Tours remain excluded. This update supersedes earlier report statements that no Videos section existed.

## Client-requested MP3 additions — 19 October 2026

The MP3 catalogue now has six cards. Infatuation and Lagos 2 London are the final two in that order, each with client-supplied cover artwork and two release-specific platform links. Spotify confirms Infatuation by Secky (EP, 15 July 2024) and Lagos 2 London by Yeye Boiz (EP, 12 December 2025); the latter credits Secky on five tracks. HyperFollow supplied the corresponding Apple Music destinations; direct Apple Music page fetches returned errors. Do not treat those fetch failures as broken links, but recheck regional availability before launch.

| Check | Result |
| --- | --- |
| `npm.cmd run build` | Passed strict TypeScript, 9 release tests, 5 video tests and the Vite production build. |
| `npm.cmd run check:deployment` | Passed; both supplied covers are local build assets and permitted static files. |
| Local browser | All six cover images loaded; both new cards expose Spotify and Apple Music links. Confirmed one-column mobile and three-column desktop catalogue layouts without horizontal overflow. |
| Foundation regression | Passed at 320/390/768/1440/1920px; six catalogue cards, final-two order, local covers, video checks and release fixtures all passed without runtime errors. |
