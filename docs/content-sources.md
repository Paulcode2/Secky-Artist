# SECKY content integration sources

Reviewed 18 October 2026, after Phase 4 and before Phase 5. This is content integration, not final optimisation, launch approval or an endorsement check.

## Client copy

The attached client brief supplies SECKY's identity, hero headline/supporting text, short biography, two-paragraph full biography and two artist profile URLs. The full name is preserved as **Success Enwerem Chimezie KingsleY**, including the final capital Y. The full biography is integrated verbatim as client-provided copy. Award and FIFA-related statements have not been expanded or represented as independently verified facts.

Still needed: confirmation of name capitalisation; Top Naija Music Awards year/category and supporting announcement; evidence for the precise assertion that the song appeared on FIFA's official Spotify and Apple Music pages. A streaming credit alone is not proof of endorsement, an official relationship, or control of the associated profile. No FIFA logo or additional partnership claim is used.

## Supplied artist profiles

| Source | Check and use |
| --- | --- |
| [Spotify artist profile](https://open.spotify.com/artist/2gyg88Hy443exTHje87bKk) | Direct extraction returned a Secky title but no body. Indexed Spotify content identifies the supplied full name/background and discography. The exact supplied URL is used in hero, Music, Contact and footer. Playback/account availability was not tested. |
| [Apple Music GB artist profile](https://music.apple.com/gb/artist/secky/1756161815) | Direct fetch returned a cache miss. The exact client URL is retained in the site; not replaced with a guessed address. |
| [Apple Music US profile, same artist ID](https://music.apple.com/us/artist/secky/1756161815) | Accessible cached page identifies Secky and links to releases. Used for corroborating catalogue identity, not to replace the client's GB profile. Its older snapshot and newer search index differ, so no latest/featured designation was inferred. |

## Catalogue entries integrated

Only these four releases were added. Dates, titles and types below are metadata from the linked platform sources. The platform suffix “- Single” is represented by the separate type field. All have `featured: false`, no smart link and no artwork: image access does not grant reuse permission. This is a partial verified catalogue, not a claim of completeness.

| Entry | Type/date | Source/destination and verification limit |
| --- | --- | --- |
| My Name (feat. I’ll Take You There Choir) | Single, 2026-09-17 | [Apple Music song/release](https://music.apple.com/us/album/my-name-feat-ill-take-you-there-choir/6811251027?i=6811251028): indexed platform result identifies Secky, single and exact date; direct fetch returned cache miss. Recheck current live availability before launch. |
| Celebration in the air (FIFA World Cup 2026) (feat. FIFA SOUND) | Single, 2026-04-05 | [Apple Music release](https://music.apple.com/us/album/celebration-in-the-air-fifa-world-cup-2026-feat-fifa/1888957592): accessible cached release page confirms title, Secky credit, date and single. [Spotify track](https://open.spotify.com/track/2AoDhIQASYWEc1FjtXQv6y): indexed platform content identifies Secky/FIFA Sound and date; direct extraction returned no body. No official relationship inferred. |
| Letter to my wife (Redux) | Single, 2026-04-04 | [Apple Music song/release](https://music.apple.com/us/album/letter-to-my-wife-redux/1891233342?i=1891233343): indexed platform result confirms Secky, title/type/date; direct fetch returned cache miss. |
| Black | Single, 2025-10-03 | [Apple Music release](https://music.apple.com/us/album/black-single/1843594841): indexed platform result confirms Secky, title/type/date; direct fetch returned cache miss. |

Links retain the actual discovered US release URLs rather than inventing GB equivalents. Artist profiles are never used as release links. The existing chooser is used for Celebration's two verified platform destinations; the other three link directly to their release-specific Apple Music pages. No live playback was attempted and no sign-in was performed.

Other entries seen in profile/index snapshots (including Infatuation, Lagos to London/Lagos 2 London, Aboki Amapiano/Amapiano Aboki and Arusi/Arusi (Masquerade)) were not added. Some details differ between snapshots or lacked accessible release-page confirmation. Ask the client for the complete canonical catalogue, preferred titles and per-platform release links. No release is labelled latest or selected as featured solely from a profile snapshot or biography mention.

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
