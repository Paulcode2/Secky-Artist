# SECKY content integration sources

Reviewed 18 October 2026, after Phase 4 and before Phase 5. This is content integration, not final optimisation, launch approval or an endorsement check.

## Client copy

The attached client brief supplies SECKY's identity, hero headline/supporting text, short biography, two-paragraph full biography and two artist profile URLs. The full name is preserved as **Success Enwerem Chimezie KingsleY**, including the final capital Y. The full biography is integrated verbatim as client-provided copy. Award and FIFA-related statements have not been expanded or represented as independently verified facts.

Still needed: confirmation of name capitalisation; Top Naija Music Awards year/category and supporting announcement; evidence for the precise assertion that the song appeared on FIFA's official Spotify and Apple Music pages. A streaming credit alone is not proof of endorsement, an official relationship, or control of the associated profile. No FIFA logo or additional partnership claim is used.

## Supplied artist profiles

| Source | Check and use |
| --- | --- |
| [Spotify artist profile](https://open.spotify.com/artist/2gyg88Hy443exTHje87bKk) | Direct extraction returned a Secky title but no body. Indexed Spotify content identifies the supplied full name/background and discography. The exact supplied URL is used in hero, MP3, Contact and footer. Playback/account availability was not tested. |
| [Apple Music GB artist profile](https://music.apple.com/gb/artist/secky/1756161815) | Direct fetch returned a cache miss. The exact client URL is retained in the site; not replaced with a guessed address. |
| [Apple Music US profile, same artist ID](https://music.apple.com/us/artist/secky/1756161815) | Accessible cached page identifies Secky and links to releases. Used for corroborating catalogue identity, not to replace the client's GB profile. Its older snapshot and newer search index differ, so no latest/featured designation was inferred. |

## Catalogue entries integrated

The initial catalogue integration added the four releases listed below. Dates, titles and types were taken from the linked platform sources; the platform suffix “- Single” is represented by the separate type field. At that stage, all had `featured: false`, no smart link and no artwork. The client-requested Infatuation and Lagos 2 London EPs were subsequently added in the update below. This remains a partial catalogue, not a claim of completeness.

| Entry | Type/date | Source/destination and verification limit |
| --- | --- | --- |
| My Name (feat. I’ll Take You There Choir) | Single, 2026-09-17 | [Apple Music song/release](https://music.apple.com/us/album/my-name-feat-ill-take-you-there-choir/6811251027?i=6811251028): indexed platform result identifies Secky, single and exact date; direct fetch returned cache miss. Recheck current live availability before launch. |
| Celebration in the air (FIFA World Cup 2026) (feat. FIFA SOUND) | Single, 2026-04-05 | [Apple Music release](https://music.apple.com/us/album/celebration-in-the-air-fifa-world-cup-2026-feat-fifa/1888957592): accessible cached release page confirms title, Secky credit, date and single. [Spotify track](https://open.spotify.com/track/2AoDhIQASYWEc1FjtXQv6y): indexed platform content identifies Secky/FIFA Sound and date; direct extraction returned no body. No official relationship inferred. |
| Letter to my wife (Redux) | Single, 2026-04-04 | [Apple Music song/release](https://music.apple.com/us/album/letter-to-my-wife-redux/1891233342?i=1891233343): indexed platform result confirms Secky, title/type/date; direct fetch returned cache miss. |
| Black | Single, 2025-10-03 | [Apple Music release](https://music.apple.com/us/album/black-single/1843594841): indexed platform result confirms Secky, title/type/date; direct fetch returned cache miss. |

Links retain the actual discovered US release URLs rather than inventing GB equivalents. Artist profiles are never used as release links. The existing chooser is used for Celebration's two verified platform destinations; the other three link directly to their release-specific Apple Music pages. No live playback was attempted and no sign-in was performed.

The initial source review deferred other profile/index snapshot entries pending direct release-page confirmation. Infatuation and Lagos 2 London are now included based on the client's exact HyperFollow links and matching covers, with Spotify-confirmed metadata recorded below. Aboki Amapiano/Amapiano Aboki and Arusi/Arusi (Masquerade) remain outside the catalogue. The complete canonical catalogue and featured selection still need client review.

## Client-requested MP3 additions — 19 October 2026

The client supplied both HyperFollow URLs and the matching cover-art attachments. Their HyperFollow pages provide the release-specific Spotify and Apple Music destinations below. Direct Spotify pages confirm title, artist/type and release date; direct Apple Music fetches returned cache errors, so titles/dates are not independently asserted from Apple. URLs are syntax-checked and linked as supplied by HyperFollow; current regional availability/playback still needs client review.

| Entry | Type/date | Spotify | Apple Music | Cover/source |
| --- | --- | --- | --- | --- |
| Infatuation | EP, 2024-07-15 | [Spotify EP by Secky](https://open.spotify.com/album/4KLrZlZcKbK55f8KbxXshk) confirms four tracks and date. | [Apple Music Infatuation EP](https://music.apple.com/us/album/infatuation-ep/1756520071?uo=4), linked from the supplied HyperFollow page; direct fetch returned an error. | Client-supplied cover shows “Infatuation (EP)” and SECKY; stored as `src/assets/releases/infatuation.jpg`. |
| Lagos 2 London | EP, 2025-12-12 | [Spotify EP by Yeye Boiz](https://open.spotify.com/album/0mMxLf1UH34ikskq84otkg) confirms six tracks, date, and Secky credits on five tracks. | [Apple Music Lagos 2 London EP](https://music.apple.com/us/album/lagos-2-london-ep/1858948120?uo=4), linked from the supplied HyperFollow page; direct fetch returned an error. | Client-supplied cover identifies Lagos 2 London / YeYe Boiz; stored as `src/assets/releases/lagos-2-london.jpg`. |

The four previous releases remain unchanged. Both new EPs are appended after them using the explicit catalogue order property (1 then 2) because the default catalogue sorts by release date. Neither is featured. Artwork provenance and asset paths are recorded in `release-artwork-sources.json`; the public page uses the supplied originals, with descriptive alt text. No dates or direct platform IDs were inferred from title similarity.

## Assets and publication gaps

**Photo follow-up:** The client subsequently supplied 21 photographs identified as SECKY. The current hero uses `WhatsApp Image 2026-10-15 at 15.47.06.jpeg` (1047×1143, monochrome studio portrait), copied to `src/assets/artist/secky-studio.jpeg`. About uses `seky1.jpeg` (1080×720, outdoor close-up), copied to `src/assets/artist/secky-outdoor.jpeg`. Originals are unchanged; CSS handles responsive framing. The hero face stays visible in the 4:5 frame; About retains 3:2 proportions and source colour. No photo was repurposed as release artwork. Current mobile/desktop captures in `docs/review/` were refreshed and visually checked after integration. Photography is no longer a missing-content item; any requested photographer credit wording can be added when supplied.

The following records the earlier pre-photo integration state:

The workspace contained only the two stock images under `preview/assets/` and previous design screenshots. None identifies SECKY or is approved client artwork. Imports were removed from the application, so these images are absent from the current production bundle. They remain only in the archived Phase 2 study. Hero and About initially rendered without photos; the supplied photographs now replace that state. Release cards still use the existing artwork-unavailable fallback.

Still needed: covers for the four entries, optional logo, approved social-sharing image/favicon if wanted, booking/management email, social handles, copyright attribution, feature selection and brand approval. No production domain or canonical URL has been invented. The requested title and description are present; no social-sharing title/description fields previously existed. The existing noindex directive remains until the later launch decision.

## Validation scope

Production build, eight release tests, existing foundation/browser checks and content-specific assertions passed. Checked exact supplied profile hrefs in hero/Music/footer, hero routing to Music, no profile URL reused for a release, absence of sample copy and stock photographs, full-name spelling, and title. Mobile/desktop text wrapping and biography spacing were visually reviewed in `docs/review/content-390.png` and `content-1440.png`; automated widths also covered 320, 768 and 1920px. After photo integration, refreshed mobile/desktop captures were visually checked for face visibility and proportions. The repeated brief verification reran the build and browser checks successfully, including both loaded artist images; it did not repeat live destination checks. No physical-device, screen-reader, final performance or broad QA audit was performed; Phase 5 has not begun.

## Artwork and About update - 19 October 2026

All four official covers are now integrated at the explicit user request. Apple catalogue lookup matched collection IDs 6811251027, 1888957592, 1891233342 and 1843594841 to artist ID 1756161815. Local 800px square images have descriptive alternatives and lazy loading. See docs/release-artwork-sources.json for provenance. This supersedes earlier missing-artwork statements; featured selection remains pending.

About now uses a balanced portrait-and-text layout, smaller heading and readable 16px biography. The repeated short introduction was removed from this section; the full approved biography is unchanged. Mobile stacks naturally.

Production build, TypeScript, all eight tests and browser checks at 320/390/768/1440/1920px passed. Four loaded covers, no artwork fallbacks, navigation, listening fixtures and keyboard/touch checks passed with no runtime exceptions. Mobile/desktop screenshots were refreshed and visually reviewed. Deployment remains on hold.

## Header wordmark and platform buttons

Changed only the header wordmark to the exact client text ArUsi’. Artist metadata, hero name and footer remain SECKY. The optional headerWordmark field lives in src/content/artist.ts.

Every current release now has visible Listen on Spotify and Listen on Apple Music buttons, replacing the chooser. Both open new tabs with noopener noreferrer. Valid platform links take priority over a smart link in the UI; smart links remain a fallback when no platforms exist. Upcoming releases still require a real pre-save link. This supersedes prior chooser instructions.

Missing Spotify destinations were discovered directly on the public artist page and their destination HTML titles and artist ID 2gyg88Hy443exTHje87bKk were verified:
- My Name: https://open.spotify.com/track/4E99PWSUTRKyPK97TZkuNF (title also confirms the choir collaborator).
- Black: https://open.spotify.com/track/0H8uVUagukefzhUNp2BqBH.
- Letter to my wife (Redux): https://open.spotify.com/album/6H3XGnkh65NSCZUDOH6or5 (single/release destination).
Existing Celebration Spotify and all Apple Music destinations retained. No playback or regional availability claim is made. Deployment remains on hold.

## Client-supplied Spotify track links

The client supplied track links for My Name (4E99PWSUTRKyPK97TZkuNF), Letter to my wife (Redux) (3qrb8LnqPLEDCxRoKWLph8) and Black (0H8uVUagukefzhUNp2BqBH). My Name and Black already matched. Replaced the Redux album destination with the supplied direct track; Spotify page title and SECKY artist ID were confirmed. Omitted share-tracking query parameters while preserving each track ID. Playback was not tested.

## Client-supplied YouTube videos — 19 October 2026

The four YouTube links below were supplied for the new MP4 section. Their titles were retrieved from YouTube's public oEmbed metadata; that metadata returned the title and a 22 SANTINO channel author for each URL. No titles or videos were invented. The author field alone does not establish channel ownership or approval; the exact supplied video URLs are the source of inclusion. No video was played or availability/regional access verified.

| Video title from YouTube metadata | Supplied link | Extracted video ID |
| --- | --- | --- |
| 22 SANTINO x Secky - Why (Official Music Video) | https://youtu.be/-2fzkNE0JsM?is=9RBA_5LB4rVW4FQU | `-2fzkNE0JsM` |
| Secky x FIFA Sound - Celebration In The Air (Hola Hola) (Official Music Video) | https://youtu.be/a2AZKeTLg5g?is=z4RBKJow9F0Rq8At | `a2AZKeTLg5g` |
| Secky - Take You To Places (Official Music Video) | https://youtu.be/GgEs7aYDEjM?is=i6GJB_VpwX17lUZb | `GgEs7aYDEjM` |
| Secky x 22 SANTINO - Fire (Official Music Video) | https://youtu.be/sWppd363iGU?is=lIGYVjN-f5yokVYe | `sWppd363iGU` |

The video data lives in `src/content/videos.ts`; thumbnail images are derived from each validated ID, with `maxresdefault.jpg` falling back to `hqdefault.jpg` on image failure or a 120×90 placeholder. Browser checks loaded the first two requested max-resolution thumbnails at 1280×720. No local thumbnail files were supplied or copied. At rest, no YouTube iframe is created. A visitor's play-button activation creates an iframe using an ID-derived `youtube-nocookie.com` URL with autoplay enabled; the adjacent Watch on YouTube fallback is also built from that ID. Tracking parameters remain in the source URL only, never in the iframe or generated Watch URL. See `docs/release-management.md` for supported formats, authoring validation and maintenance steps.
