# Release management

The application reads `src/content/releases.ts`. The old `preview/index.html` is the preserved visual study, not the application. Start the app using the README instructions.

## Typed content

| Field | Requirement |
| --- | --- |
| `id` | Unique, stable, nonempty string; retain when editing a title. |
| `title` | Approved release title. |
| `type` | `single`, `EP` or `album`. |
| `releaseDate` | Optional real calendar date, `YYYY-MM-DD`; omit when unknown. |
| `artwork` | Optional `{ src, alt }`. Use approved artwork and a meaningful text alternative. Missing or failed images get a square labelled fallback. |
| `featured` | Boolean; at most one entry may be true. |
| `catalogueOrder` | Optional nonnegative integer; ordered releases follow date-sorted entries in ascending order. |
| `smartLink` | Optional release-specific HTTPS smart link. |
| `platforms` | Array of supplied `{ name, url }` release-specific HTTPS destinations; use `[]` if none exist. |
| `preSaveUrl` | Optional confirmed HTTPS pre-save destination, separate from ordinary listening links. |

Six platform-identified releases are integrated; see `content-sources.md` for dates, destination evidence and access limits. None is featured. Four covers are from Apple Music catalogue sources and two were supplied by the client; all six are tracked in `docs/release-artwork-sources.json`. Supported platforms are data-driven: only verified release-specific destinations appear. Do not substitute artist-profile links for release destinations.

## Adding and maintaining releases

1. Collect the approved title/type, date if known, cover, image description, publication rights and release-specific destinations.
2. Prefer artwork stored under `src/assets/releases/` and imported into the content file. Vite fingerprints imported files and detects missing imports during builds. External image sources work too but need availability checks. The runtime fallback handles image load failures.
3. Add one typed entry to `releases` with a unique ID. Leave unavailable fields absent; never copy test URLs into content.
4. To feature a release, set `featured: true` on that entry and false on all others. The former feature returns to the catalogue. Zero selected features produces an honest empty state, not an automatic promotion.
5. Edit content in this file while retaining IDs. Remove a release by deleting its entry; remove its image only after checking other imports.
6. Run `npm run test:releases` and `npm run build`, review mobile/desktop layouts, and manually open each actual destination to confirm the correct artist, release, availability and redirects.
7. Record destination checks below; rebuild and follow the later delivery workflow when publication is authorised. There is no CMS or client login.

This model supersedes the planned release JSON/featured-ID structure. The featured entry is excluded from the catalogue, superseding the earlier option to repeat it. Entries without `catalogueOrder` sort newest first by valid date; undated entries come last. Equal dates and undated entries sort by stable ID. Explicitly ordered entries follow the date-sorted set in ascending `catalogueOrder`. Duplicate IDs, blank titles and invalid catalogue orders fail authoring checks; rendering also guards against duplicate/empty cards.

## Listening behaviour

For non-upcoming releases, valid platform links render as labelled Spotify/Apple Music buttons; when none exist, an approved smart link or a single valid platform can provide a direct action, otherwise the component displays an unavailable message. Upcoming releases require an explicit valid pre-save URL. Invalid or empty URLs/names are excluded at runtime. Duplicate destinations are collapsed. The content test reports invalid authored values before building. URL syntax checks do not establish that a destination exists or belongs to the artist.

All external website links are real anchors opening in a new tab with rel="noopener noreferrer". Internal navigation and mailto links retain their normal behaviour. There is no autoplay. Without an explicitly featured release with an available listening action, hero Listen Now targets the MP3 catalogue at `#music` and its supplied artist-profile choices. When a usable feature is supplied it targets the featured section instead.

The current release cards present their platform destinations as independent links; no inline chooser or embedded audio player is used. The historical chooser implementation notes below in the Phase 4 record are superseded by the later platform-button update.

Future-dated releases show “Coming” with the date. Only an explicit valid `preSaveUrl` creates a Pre-save action; regular smart/platform links are never relabelled as pre-save. Without it, the release says listening is not yet available. On release day the regular listening rules apply and the pre-save link is ignored. Dates use Africa/Lagos and refresh once a minute and on window focus. This is a date-based schedule, not exact-time release automation. Missing dates display “Release date not supplied,” never “Out now”; a pre-save URL without a future date does not establish upcoming status.

## Destination verification register

| Content | Destinations | Result |
| --- | --- | --- |
| Six integrated releases | Twelve release-specific Spotify/Apple Music destinations | Metadata checked against indexed/cached platform sources and the client-supplied HyperFollow pages. Some Apple Music direct fetches unavailable; see `content-sources.md`. No pre-save URLs supplied. |
| Isolated test fixtures | Reserved `example.test` URLs | Intentionally not opened; these are not music destinations and never appear in site content. |

The authoritative current verification register is `content-sources.md`: it distinguishes supplied artist profiles, HyperFollow-derived destinations, accessible cached pages, indexed metadata and failed direct fetches. Live availability and regional playback need rechecking before launch. Featured selection, canonical catalogue confirmation, publication rights/credits and any additional release-specific destinations remain pending. No pre-save or smart links have been inferred.

## Verification

Nine Node tests cover release data, listening destinations, future/pre-save transitions, dates, feature exclusion, sorting and authoring errors, including the two requested final catalogue entries. Five additional video tests cover the client-supplied URLs, watch/short/Shorts/embed forms, malformed/non-YouTube input, ID-only embed/watch/thumbnail URL construction, duplicate data and invalid IDs. The production build runs both test suites and TypeScript checks.

The existing browser helper renders isolated fixtures to check featured/grid rendering, long titles, missing/broken artwork, direct/unavailable/pre-save behaviour, responsive release/video layouts, video activation by mouse and keyboard, secure iframe/fallback settings and an empty video state. Fixtures are test-only, not published client data. Real-device and screen-reader audits remain outstanding.

## Header wordmark and platform buttons

Changed only the header wordmark to the exact client text ArUsi’. Artist metadata, hero name and footer remain SECKY. The optional headerWordmark field lives in src/content/artist.ts.

Every current release now has visible Listen on Spotify and Listen on Apple Music buttons, replacing the chooser. Both open new tabs with noopener noreferrer. Valid platform links take priority over a smart link in the UI; smart links remain a fallback when no platforms exist. Upcoming releases still require a real pre-save link. This supersedes prior chooser instructions.

Missing Spotify destinations were discovered directly on the public artist page and their destination HTML titles and artist ID 2gyg88Hy443exTHje87bKk were verified:
- My Name: https://open.spotify.com/track/4E99PWSUTRKyPK97TZkuNF (title also confirms the choir collaborator).
- Black: https://open.spotify.com/track/0H8uVUagukefzhUNp2BqBH.
- Letter to my wife (Redux): https://open.spotify.com/album/6H3XGnkh65NSCZUDOH6or5 (single/release destination).
Existing Celebration Spotify and all Apple Music destinations retained. No playback or regional availability claim is made. Deployment remains on hold.

## Music video maintenance

The `MP4` section uses YouTube-hosted music videos only; it does not accept uploaded/self-hosted MP4 media and has no backend. Maintain entries in `src/content/videos.ts` with a stable unique `id`, a verified title, and a supplied YouTube `url`. The component derives `maxresdefault.jpg` and `hqdefault.jpg` preview URLs from the validated video ID; no thumbnail fields or manual image files are needed. It falls back to `hqdefault` when the max-resolution image fails or is YouTube's 120×90 placeholder. The current four titles were read from YouTube metadata for the exact links listed in `content-sources.md`.

`src/lib/videos.ts` accepts HTTPS `youtube.com/watch?v=...`, `youtube.com/embed/...`, YouTube Shorts, and `youtu.be` URL forms with an 11-character ID. It rejects other hosts, schemes, credentials, ports, malformed paths, duplicate video IDs, and missing titles. Keep the original supplied URL as the source record, but never use it as an iframe `src`: the app extracts the ID and constructs both the `youtube-nocookie.com` embed and canonical Watch on YouTube link itself. Tracking query parameters are omitted from those generated destinations.

The `MP4` previews use a 16:9 ratio, a generated thumbnail with `object-fit: cover`, and a centered translucent circular play button with an inline SVG. The 72px desktop/tablet control reduces to 56px on mobile. The button is keyboard/touch-accessible, labelled with the video title and respects reduced motion. The YouTube iframe is created only after the visitor activates the thumbnail and receives `autoplay=1`, a descriptive title and `allowFullScreen`. Each card also provides a Watch on YouTube link using the shared external-link security behavior. If there are no valid entries, the section shows “Videos coming soon.” Do not add self-hosted video files or another artist's videos.

To maintain the entries, update `src/content/videos.ts`, then run `npm run test:videos`, `npm run build`, and the README browser suite. The video tests validate URL parsing and generated destinations; the browser suite confirms navigation order, responsive previews, deferred embed creation, fallback links and the empty state. These checks do not assert playback availability; manually confirm the video belongs on SECKY's site and that the public link plays before launch. Tours remain excluded.
