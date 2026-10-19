# Musician promotional website: project scope

Planning date: 18 October 2026. Initial status below is historical; the approved section/order update dated 19 October 2026 is recorded in “Section order and behaviour.”

## Objective and repository findings

Plan an original, responsive single-page website that introduces the artist, promotes a featured release, makes the catalogue easy to explore, and provides public booking contact details.

The workspace was empty at inspection, including hidden entries. No repository metadata, README, application files, assets, or project instructions were found. No existing framework or deployment configuration can therefore be assumed. This phase creates documentation only.

## Reference review

Reviewed the accessible page content of [Omah Lay's official website](https://www.omahlay.com/) on 18 October 2026. The page exposes artist identity, featured “Listen Now” calls to action, and a music catalogue with release-specific destinations. These support a direct path from artist discovery to listening. Review was limited to extracted page content; visual layout, animation, and responsive behaviour were not verified in a browser.

Use the supplied reference principles of prominent identity, featured release, release artwork, and clear listening links. Create the composition, colours, typography, and imagery around this artist's approved branding. Do not copy reference artwork, branding, text, or catalogue entries. Reference features outside the agreed scope are not requirements.

## Section order and behaviour

Original planning order superseded by the approved SECKY implementation update on 19 October 2026:

| Order | Section | Visible navigation / content |
| --- | --- | --- |
| 1 | Header and navigation | MP3 (`#music`), MP4 (`#mp4`), INFO (`#about`), Contact (`#contact`); desktop links and mobile disclosure. |
| 2 | Hero (`home`) | SECKY alone as the dominant h1, existing supporting introduction, approved portrait, streaming links and listening action. |
| 3 | Featured/latest release (`latest`) | Existing featured-release state and labelled listening links. |
| 4 | MP3 catalogue (`music`) | Existing artwork-led catalogue, release metadata, artist profiles and streaming links. No downloads. |
| 5 | MP4 videos (`mp4`) | Client-supplied YouTube music videos in 16:9 click-to-load previews. Privacy-enhanced embeds, direct YouTube fallback, no self-hosted files or backend. |
| 6 | INFO (`about`) | Existing approved biography and portrait; section ID retained. |
| 7 | Contact (`contact`) | Existing public booking/contact details and profiles. |
| 8 | Footer | Stage name, copyright attribution when confirmed, and approved social/streaming links. |

Navigation anchors must match section IDs. Preserve `#music`, `#about`, and `#contact`; only `#mp4` is new. Keep the single-page flow accessible with desktop and mobile navigation, focusable section targets and the measured sticky-header offset. The hero h1 must remain fully visible without horizontal overflow on small screens. Video previews keep a 16:9 ratio; if no valid video entries are supplied, show “Videos coming soon.” Avoid loading any player until the visitor activates its Play video control. Avoid autoplay audio/video.

## Included and excluded

Included in the current approved implementation: the sections above, responsive styling, accessible navigation, supplied local imagery, external listening/profile links, YouTube-hosted music video links, privacy-enhanced click-to-load embeds, email contact, and existing metadata. “MP3” and “MP4” are display labels only; they do not imply audio downloads or locally hosted video.

Tours remain excluded. Videos are no longer excluded: the approved MP4 section accepts only valid YouTube watch, youtu.be, and Shorts links. Also excluded: video uploads/self-hosted MP4 files, backend, CMS, authentication, newsletter, payment gateway, admin dashboard, contact form processing, commerce, and invented testimonials or metrics. This is an approved content-scope update; earlier planning statements to the contrary are historical and superseded.

## Developer-managed content plan

The following paths record the original planning proposal, now superseded by the typed implementation. Current sources of truth are `src/content/artist.ts`, `src/content/releases.ts`, and `src/content/videos.ts`; see `release-management.md` for edits and validation.

| Original proposal | Contents |
| --- | --- |
| `content/artist.json` | `stageName`, `introduction`, `shortBio`, `fullBio`, hero image path and alternative text, optional logo/portraits, public booking email, contact label, approved copyright attribution. |
| `content/releases.json` | `featuredReleaseId` and a `releases` array. Each entry: stable unique `id`, `title`, `type` (single/EP/album or approved category), `releaseDate` in `YYYY-MM-DD`, artwork path and alternative text, and `listeningLinks` containing platform label and HTTPS URL. |
| `content/links.json` | Separate `socialProfiles` and `streamingProfiles` arrays, each containing a platform label and approved HTTPS profile URL. Release links remain with releases. |
| `content/brand.json` | Approved colour tokens and typography choices; reference locally stored font files where licensed and available. |
| `public/assets/artist/`, `public/assets/releases/`, `public/assets/brand/` | Optimised, approved images, artwork, logo and optional font assets. |

The developer updates these version-controlled files when the client supplies changes. To add a release: add its approved artwork, create a release entry with a unique ID, verify its dates and listening URLs, and update `featuredReleaseId` only when the featured release changes. Sort the catalogue by release date descending, with stable ID as a tie-breaker. Explicit feature selection prevents an unapproved upcoming item from becoming the lead release automatically. Do not label a future release “out now.”

Profile and booking updates use their respective structured fields so URLs and contact details are not duplicated in page components. Validate required fields, unique IDs, featured-ID references, real calendar dates, asset existence and URL formats before release. Manually open listening and profile URLs to confirm the correct artist/release destination; a valid URL format alone is insufficient. Missing optional links are omitted. Missing required content blocks launch readiness and must never be replaced with fake public information or dead buttons.

After content changes, the developer previews the page, checks links and layout, and rebuilds/redeploys through the eventual hosting workflow. There is no client login or content editor. Hosting and framework selection remain pending; a static build using structured local data is the working assumption, with no server required.

## Delivery sequence for a later phase

1. Collect and verify the required items in `content-checklist.md`; confirm the artist's visual direction and featured release.
2. Select a minimal static implementation and hosting target appropriate to the agreed delivery environment. Define content validation and asset conventions.
3. Prepare approved photography/artwork, brand tokens and structured content files.
4. Implement the seven sections and responsive navigation, then apply original styling and metadata.
5. Check content accuracy, keyboard navigation, contrast, image descriptions, reduced motion where applicable, and layouts at approximately 320, 768 and 1440 CSS pixels with no horizontal overflow. Verify all anchors, email and external destinations; optimise image sizing and loading.
6. Review with the client and undertake deployment only in the implementation/delivery phase.

## Assumptions and outstanding decisions

- English is the initial content language, pending confirmation.
- The client will supply or approve the copy, branding and usage rights for all assets.
- At least one release with artwork and a working listening destination is needed for the agreed release-led page. If none exists, resolve the content/scope mismatch before implementation.
- The client selects the featured release; it need not be the chronologically newest item.
- No artist identity, biography, contact, catalogue, approved images or brand preferences were supplied. See the checklist for the complete outstanding set.
- Domain, hosting, framework and any licensed font choices remain undecided; no provider or purchase is assumed.

## Planning acceptance

Initial planning acceptance recorded the requested order, exclusions, content ownership, missing inputs, maintenance steps and future checks. The approved application and later MP4 update supersede that planning-only status; current production readiness and client blockers are tracked in `qa-report.md`.
