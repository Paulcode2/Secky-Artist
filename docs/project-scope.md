# Musician promotional website: project scope

Planning date: 18 October 2026. Status: planning complete; interface not implemented.

## Objective and repository findings

Plan an original, responsive single-page website that introduces the artist, promotes a featured release, makes the catalogue easy to explore, and provides public booking contact details.

The workspace was empty at inspection, including hidden entries. No repository metadata, README, application files, assets, or project instructions were found. No existing framework or deployment configuration can therefore be assumed. This phase creates documentation only.

## Reference review

Reviewed the accessible page content of [Omah Lay's official website](https://www.omahlay.com/) on 18 October 2026. The page exposes artist identity, featured “Listen Now” calls to action, and a music catalogue with release-specific destinations. These support a direct path from artist discovery to listening. Review was limited to extracted page content; visual layout, animation, and responsive behaviour were not verified in a browser.

Use the supplied reference principles of prominent identity, featured release, release artwork, and clear listening links. Create the composition, colours, typography, and imagery around this artist's approved branding. Do not copy reference artwork, branding, text, or catalogue entries. Reference features outside the agreed scope are not requirements.

## Section order and behaviour

| Order | Section | Planned content and behaviour |
| --- | --- | --- |
| 1 | Header and navigation | Approved logo or text stage name linking to the top. In-page links: Latest Release, Music, About, Contact. |
| 2 | Hero (`home`) | Stage name, short introduction, approved hero photograph, and a primary link to the featured release. |
| 3 | Featured/latest release (`latest`) | One approved release, prominent artwork, title, type, release date, and labelled listening links. |
| 4 | Music catalogue (`music`) | Artwork-led cards with title, type, date, and listening links, newest first. The featured release may also appear here. |
| 5 | About (`about`) | Approved full biography; optional secondary portrait. Use the short biography for a concise introduction or metadata where appropriate. |
| 6 | Booking/contact (`contact`) | Public booking or management email with a working `mailto:` link and selectable address. Optional approved contact label. |
| 7 | Footer | Stage name, copyright attribution confirmed by the client, and approved social and streaming profile links. |

Navigation anchors must match section IDs. Keep the single-page flow usable without complex interaction. On narrow screens, stack the hero and release layouts and use a single-column catalogue; increase columns as space allows. Navigation may wrap or use an accessible menu if needed. Maintain readable text, comfortable touch targets, visible focus, keyboard operation, suitable contrast, meaningful image alternatives, and reduced-motion support if motion is added. Avoid autoplay audio.

## Included and excluded

Included in the future implementation: the seven sections above, responsive styling, accessible navigation, approved local imagery, external listening/profile links, email contact, and basic page title, description, favicon and social sharing metadata when assets are supplied.

Tours and Videos are explicitly excluded: no sections, pages, navigation items, embeds, or placeholder content for either. Also excluded from initial scope: backend, CMS, authentication, newsletter, payment gateway, admin dashboard, contact form processing, commerce, and invented testimonials or metrics. No hosting registration, deployment, interface scaffolding, or application code is part of this planning phase.

## Developer-managed content plan

Proposed paths for the later implementation, not files created in this phase:

| File/location | Contents |
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

Section order, exclusions, content ownership, missing inputs, maintenance steps and future implementation checks are documented. Completion of this document does not mean a website exists or is ready to launch.
