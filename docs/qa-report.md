# Release candidate QA

Completed 19 October 2026. Status: ready for client review, **not approved for public launch**. No deployment performed. Review the current application at http://127.0.0.1:4173/ while the production preview is running, or run `npm run build` and `npm run preview`. `preview/index.html` is an archived design study, not this candidate.

## Scope and visible content

| Section | Audit result |
| --- | --- |
| Header | SECKY text identity; Music, About and Contact anchors; accessible mobile disclosure. |
| Hero | Supplied name, introduction, supporting text and studio portrait; Listen Now targets Music because no feature is approved. Exact supplied Spotify/Apple Music profile URLs retained. |
| Featured | Functional route to catalogue remains in the reserved section. Client must select a release before the agreed featured presentation is complete. |
| Music | Four real, previously platform-identified singles; long titles wrap; dates descend; release-specific links only. All four covers remain unavailable and are visibly labelled. No fictional replacements. |
| About | Supplied short biography and full two-paragraph biography, with supplied outdoor photograph. Full-name spelling retained. Award/FIFA claims remain client copy pending supporting evidence. |
| Contact | Booking email absent; honest unavailable state, no fake form or action. Removed the unsupported promise that details would be available “soon”. Streaming profiles available; social links omitted. |
| Footer | SECKY and supplied streaming profiles. Copyright owner and social destinations still need client confirmation. |

No new features, excluded sections, embedded players, autoplay, backend or account functionality introduced. Sample artist copy is absent from the current page. Visible cover-unavailable and booking-unavailable states are launch blockers, not finished client content.

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
| Booking/social | Missing links omitted; isolated valid mailto and profile fixtures passed. No real email or social account exists to verify. Exact supplied streaming profile hrefs checked. |
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

1. Supply authorised covers for all four releases; approve the partial catalogue and select the featured release. Until then the artwork-led/featured scope remains content-incomplete.
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
