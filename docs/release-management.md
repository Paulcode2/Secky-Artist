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
| `smartLink` | Optional release-specific HTTPS smart link. |
| `platforms` | Array of supplied `{ name, url }` release-specific HTTPS destinations; use `[]` if none exist. |
| `preSaveUrl` | Optional confirmed HTTPS pre-save destination, separate from ordinary listening links. |

Four platform-identified singles are now integrated; see `content-sources.md` for dates, destination evidence and access limits. None is featured and no artwork reuse has been authorised. Supported platforms are data-driven: only verified release-specific destinations appear. Do not substitute artist-profile links for release destinations or copy artwork merely because it is accessible online.

## Adding and maintaining releases

1. Collect the approved title/type, date if known, cover, image description, publication rights and release-specific destinations.
2. Prefer artwork stored under `src/assets/releases/` and imported into the content file. Vite fingerprints imported files and detects missing imports during builds. External image sources work too but need availability checks. The runtime fallback handles image load failures.
3. Add one typed entry to `releases` with a unique ID. Leave unavailable fields absent; never copy test URLs into content.
4. To feature a release, set `featured: true` on that entry and false on all others. The former feature returns to the catalogue. Zero selected features produces an honest empty state, not an automatic promotion.
5. Edit content in this file while retaining IDs. Remove a release by deleting its entry; remove its image only after checking other imports.
6. Run `npm run test:releases` and `npm run build`, review mobile/desktop layouts, and manually open each actual destination to confirm the correct artist, release, availability and redirects.
7. Record destination checks below; rebuild and follow the later delivery workflow when publication is authorised. There is no CMS or client login.

This model supersedes the planned release JSON/featured-ID structure. The featured entry is excluded from the catalogue, superseding the earlier option to repeat it. Remaining releases sort newest first by valid date; undated releases come last. Equal dates and undated entries sort by stable ID. Duplicate IDs and blank titles fail the authoring checks; rendering also guards against duplicate/empty cards.

## Listening behaviour

For releases not dated in the future: a valid smart link wins; otherwise one valid unique platform links directly; otherwise multiple platforms produce an inline chooser; otherwise an unavailable message appears without an active release listening action. Invalid or empty URLs/names are excluded at runtime. Duplicate destinations are collapsed. The content test reports invalid authored values before building. URL syntax checks do not establish that a destination exists or belongs to the artist.

All external website links are real anchors opening in a new tab with rel="noopener noreferrer". Internal navigation and mailto links retain their normal behaviour. There are no players or autoplay. Without an explicitly featured release with an available listening action, hero Listen Now targets Music and its supplied artist-profile choices. When a usable feature is supplied it targets the featured section instead.

The chooser uses native `details`/`summary`. Enter/Space or a touch tap expands it, Tab reaches platform links, and Escape closes it and returns focus to the summary. Activating the summary again also closes it. It is an inline disclosure, not a modal: focus stays in document order and is not trapped.

Future-dated releases show “Coming” with the date. Only an explicit valid `preSaveUrl` creates a Pre-save action; regular smart/platform links are never relabelled as pre-save. Without it, the release says listening is not yet available. On release day the regular listening rules apply and the pre-save link is ignored. Dates use Africa/Lagos and refresh once a minute and on window focus. This is a date-based schedule, not exact-time release automation. Missing dates display “Release date not supplied,” never “Out now”; a pre-save URL without a future date does not establish upcoming status.

## Destination verification register

| Content | Destinations | Result |
| --- | --- | --- |
| Four integrated releases | Five release-specific Spotify/Apple Music destinations | Metadata checked against indexed/cached platform sources. Some direct fetches unavailable; see the per-URL register in `content-sources.md`. No pre-save URLs supplied. |
| Isolated test fixtures | Reserved `example.test` URLs | Intentionally not opened; these are not music destinations and never appear in site content. |

The authoritative current verification register is `content-sources.md`: it distinguishes supplied artist profiles, accessible cached pages, indexed metadata and failed direct fetches. Live availability and regional playback need rechecking before launch. Approved artwork/alternatives, featured selection, canonical catalogue confirmation and additional release-specific destinations remain pending. No pre-save or smart links have been inferred.

## Verification

Eight Node tests cover authored data, smart-link precedence, direct/chooser/unavailable states, duplicate and invalid links, future/pre-save transitions, calendar dates/timezone, feature exclusion, sorting and authoring errors. The production build runs these tests and TypeScript checks.

The existing browser helper also renders isolated fixtures to check featured/grid rendering, long titles, missing/broken artwork, direct/smart/unavailable/pre-save behaviour, responsive 1/2/3-column layouts, chooser keyboard operation, Escape/focus return and emulated touch. Fixtures are test-only, not published client data. Real-device and screen-reader audits remain outstanding.
