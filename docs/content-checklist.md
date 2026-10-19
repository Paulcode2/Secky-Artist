# Client content checklist

Updated: 19 October 2026, release-candidate review. SECKY's supplied identity, biographies, hero copy and two streaming profiles are integrated. Required means needed for launch. See `content-sources.md` for source URLs, partial catalogue verification and access limitations.

## Required content

| Status | Item | What to supply or confirm |
| --- | --- | --- |
| Integrated | Stage name | SECKY used in header, hero and footer. Full name preserved as Success Enwerem Chimezie KingsleY; confirm final capital Y. |
| Updated | Hero heading and introduction | Hero displays only SECKY as its heading. The former “Nigerian roots. Global rhythms.” tagline is removed; the supplied supporting paragraph remains. |
| Integrated | Short biography | Exact supplied copy remains in the content record; the INFO section uses the full biography. |
| Integrated; evidence pending | Full biography | Both supplied paragraphs retained verbatim. Treat award/FIFA statements as client-provided copy; see confirmations below. |
| Integrated | Hero photograph | Client-supplied monochrome studio portrait (`15.47.06.jpeg`), with face-safe responsive framing. |
| Missing | Brand direction | Existing brand colours and typography preferences, or agreement that the developer may propose them for approval. Include font licensing constraints. The proposed ivory/ink/rust palette and Georgia/Arial typography await approval. |
| Missing | Featured release selection | Identify the release to lead the page and whether it is already released or forthcoming. |
| Partially integrated | Release catalogue | Six releases with titles, dates, covers and release-specific links. The two newly added EPs have client-supplied covers and direct Spotify/Apple Music links. Canonical catalogue confirmation and final client review remain needed; see `content-sources.md`. |
| Missing | Social profile URLs | Exact official profile destinations to include; explicitly confirm if none should appear. |
| Integrated | Streaming profile URLs | Exact supplied Spotify and Apple Music GB URLs. Apple GB direct fetch was unavailable; identity corroborated via matching US artist ID. Kept separate from release links. |
| Integrated | MP4 YouTube links | Four exact client-supplied YouTube links are in `src/content/videos.ts`; titles came from YouTube metadata. See `content-sources.md`. Playback availability remains untested. |
| Automated | Video thumbnails | No separate assets were supplied; previews derive maxres/hq YouTube thumbnails from the verified video IDs. Confirm each thumbnail and video association during client review. |
| Integrated | Public booking/management email | Supplied address `Info@seckyworldwide.com` is linked via mailto; mailbox delivery and purpose confirmation remain untested. Do not supply private account credentials. |
| Missing | Publication approval and attribution | Confirm copy accuracy, image/artwork usage rights, mandatory credits and the correct copyright attribution. |

Profile categories are part of the requested footer. If official profiles do not exist, record that absence and agree to omit those links; do not invent destinations.

## MP3 update — 19 October 2026

The client-requested Infatuation and Lagos 2 London EPs are now the final two catalogue cards, in that order. Client-supplied square covers and direct Spotify/Apple Music album URLs are integrated. HyperFollow and Spotify metadata confirm the releases; the exact title, Yeye Boiz artist credit, dates and source limitations are recorded in `content-sources.md`. Final client approval, live regional availability, publication rights/credits and featured selection remain review items.

## Required for each displayed release

My Name, Celebration in the air, Letter to my wife (Redux), Black, Infatuation, and Lagos 2 London have titles/types/dates, artwork and release-specific URLs integrated. None is featured. The initial four covers came from Apple Music catalogue sources; the two recent covers were client supplied. The canonical catalogue and client review remain pending. Indexed metadata verification does not replace checking live destinations before launch; details are in `content-sources.md`.

- [ ] Exact release title.
- [ ] Release type: single, EP, album, or another approved category.
- [ ] Accurate release date, ideally supplied as `YYYY-MM-DD`.
- [ ] Approved artwork original, preferably square and high resolution, with permission and any mandatory credit.
- [ ] At least one working release-specific listening URL or approved smart link, with the platform/service label.
- [ ] Confirmation that every supplied link leads to this artist and this release.
- [ ] Availability status if forthcoming; do not imply a release is already available. A forthcoming release without a listening destination needs a content decision before it can satisfy the current featured-release requirements.

The developer will assign stable IDs, create accurate image descriptions from supplied assets, optimise exports, and validate structured data. Client-facing copy must be approved rather than inferred from file names or unrelated online profiles.

## MP4 video content

- [x] Four supplied YouTube URLs added to `src/content/videos.ts` with stable IDs.
- [x] Titles taken from YouTube's public metadata; source links and extracted IDs are recorded in `content-sources.md`.
- [x] YouTube URL allowlist and ID validation implemented; generated embeds use `youtube-nocookie.com` only after visitor activation.
- [ ] Supply/approve thumbnails if desired; none are currently used.
- [ ] Confirm video ownership/association with SECKY and test live playback/availability before launch. Metadata retrieval is not a playback test.

## Optional content

| Status | Item | Use or fallback |
| --- | --- | --- |
| Not supplied | Logo | Supply SVG or high-resolution transparent artwork and usage rules if available; otherwise use the stage name as text. |
| Integrated | Other artist photographs | Client supplied 21 photos; `seky1.jpeg` selected for About. Remaining options are not loaded into the page. |
| Not supplied | Separate mobile hero crop | Useful where the original cannot crop well; developer can prepare a crop from the approved original. |
| Not supplied | Additional listening destinations | Extra platforms beyond the one required per release. Only show verified supplied links. |
| Not supplied | Release descriptions or credits | Short approved context where useful; no fabricated collaborators, reviews or achievements. |
| Not supplied | Management/contact label | Approved name or organisation and role, only if intended for public display. The public email is sufficient. |
| Not supplied | Brand guide and licensed font files | Existing guidelines can direct styling; otherwise agree on an original visual direction and suitable fonts. |
| Review / pending | Favicon and social sharing image | S-dot SVG favicon implemented for review. Sharing image and final domain still pending. |

## Collection and approval process

Client confirmations before launch:

- Confirm the unusual final capitalisation in **Success Enwerem Chimezie KingsleY**; it has not been normalised.
- Supply the Top Naija Music Awards year/category and official evidence. This claim is client copy, not independently verified.
- Supply links supporting the precise claim about appearing on FIFA's official Spotify and Apple Music pages. Release collaborator metadata does not independently establish official endorsement or account ownership. No ambassador/partner/performer/award claim has been added.
- Choose the featured release; confirm the partial catalogue and resolve differing platform titles/types for other entries before adding them.
- Artist photographs and all six release covers are integrated. Supply any required artist/photographer credit wording; existing stock photos remain excluded from the application.
- Supply a public booking/management email, official social handles if any, copyright attribution and brand approval.
- Confirm live availability of the supplied Apple Music GB profile and cached/indexed release destinations. Final domain, canonical URL and sharing image remain pending. Review the derived S-dot favicon and see qa-report.md for launch requirements.

Supply copy and release data in a document or spreadsheet with files clearly matched to the artist/release. Provide original assets rather than screenshots where possible. Record which items are approved, require edits, or are intentionally unavailable. The developer then transfers approved values into the structured files proposed in `project-scope.md`.

Do not invent achievements, reviews, streaming figures, collaborators, client information, email addresses or URLs. Missing required material remains recorded here until resolved. Internal draft notes may track missing items; public placeholders and broken links are not a launch solution. The client supplied the four YouTube URLs; no other videos are added. Tours remain excluded. Video uploads, self-hosted MP4 files and backend functionality are not part of the approved MP4 feature.

## Artwork and About update - 19 October 2026

All four official covers are now integrated at the explicit user request. Apple catalogue lookup matched collection IDs 6811251027, 1888957592, 1891233342 and 1843594841 to artist ID 1756161815. Local 800px square images have descriptive alternatives and lazy loading. See docs/release-artwork-sources.json for provenance. This supersedes earlier missing-artwork statements; featured selection remains pending.

About now uses a balanced portrait-and-text layout, smaller heading and readable 16px biography. The repeated short introduction was removed from this section; the full approved biography is unchanged. Mobile stacks naturally.

Production build, TypeScript, all eight tests and browser checks at 320/390/768/1440/1920px passed. Four loaded covers, no artwork fallbacks, navigation, listening fixtures and keyboard/touch checks passed with no runtime exceptions. Mobile/desktop screenshots were refreshed and visually reviewed. Deployment remains on hold.

## Booking email and link behaviour - 19 October 2026

Added the supplied public booking address Info@seckyworldwide.com as a mailto link. This supersedes previous missing-booking-email notes; actual mailbox delivery has not been tested. All external HTTP(S) links now open a new tab with noopener noreferrer through the shared Link component, including profiles, release destinations and chooser options. Internal anchors and mailto links retain their normal behaviour. Deployment remains on hold.
