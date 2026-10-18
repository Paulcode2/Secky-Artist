# Visual direction: an intimate record sleeve

18 October 2026 · Design study 01 · Local review only

## Proposal and rationale

Pair oversized editorial serif lettering with monochrome artist photography, warm ivory space and a muted rust listening button. A deep green-black featured-release band gives the artwork a distinct moment in the page. Thin rules, square edges and generous spacing reference record sleeves without borrowing another artist's identity.

The client's name, sound and brand preferences are still unknown. This is a proposed direction for review, not a claim about their genre or identity. The temporary guitar photograph demonstrates image composition only; it is not evidence that the client plays guitar. The oversized “Artist Name” is an explicitly temporary wordmark. No identity or achievements have been invented.

The [reference site](https://www.omahlay.com/) was reviewed again via accessible page content. Its artist identity, listening calls to action and catalogue hierarchy inform the structure. Its imagery, text, artwork and brand styling are not used. The reference's rendered visual behaviour was not inspected.

## Open the preview

Double-click `preview/index.html` in File Explorer to open it in a browser. It uses local CSS, local images and system fonts: no installation, server, internet connection or build is needed. The page is a static mockup with no JavaScript dependency, marked as a design study and set to `noindex, nofollow`.

Resize the browser or use its responsive device mode to review layouts. Full-page captures are also available:

- `preview/desktop-preview.png` — 1440-pixel browser viewport.
- `preview/tablet-preview.png` — 768-pixel browser viewport.
- `preview/mobile-preview.png` — 390-pixel emulated mobile viewport.

These captures are review artifacts, not separate page implementations. Open at native size for readable text.

## Structure and interactions

1. Header: temporary text wordmark and Music, About, Contact anchors. This phase's three-link navigation supersedes the earlier four-link proposal.
2. Hero: prominent stage-name placement, introduction, photograph and rust Listen Now anchor to `#latest`. The primary action works without an external listening URL.
3. Featured release: large square artwork, sample title/type, date pending and listening-action placement. The release button is visibly disabled with an explanatory note because no valid destination exists.
4. Music: three illustrative artwork-led releases. One intentionally long title demonstrates wrapping. Pending destinations are plain text, not fake links.
5. About: heading and optional atmosphere image alongside naturally flowing biography placement copy.
6. Contact: booking-email and social-link positions clearly marked as pending. Replace with a public `mailto:` address and approved labelled links once supplied.
7. Footer: temporary artist name, copyright-owner status and streaming-profile placement. Verified profile links must replace the pending text before launch.

Only the agreed seven sections appear. No additional content categories or services have been added.

## Responsive rules

| Width | Navigation and composition | Artwork, spacing and typography |
| --- | --- | --- |
| Mobile, below 640px | Always-visible navigation wraps below the wordmark when necessary; no hidden menu. Hero copy and main action precede the photograph. All content sections stack. | One-column catalogue; square covers fill available content width. Hero photograph uses a 4:5 crop. At least 20px side gutters, 64px section spacing, fluid headings. |
| Tablet, 640–1023px | Hero, featured release, About and Contact use two columns. Navigation stays visible. | Two-column catalogue; minimum-zero-width grid tracks prevent long titles stretching the layout. Gutters grow with viewport width. |
| Desktop, 1024px and above | Split hero and featured composition; wide About and Contact columns; three-column catalogue. Content width capped at 1440px. | Prominent square artwork; fluid gutters up to 80px; section spacing up to 128px. Body copy constrained for comfortable reading. |

Headings and release titles wrap without truncation, line clamping or fixed text heights. `overflow-wrap: anywhere` handles unusually long unbroken names/URLs. The sample name's deliberate line break is a composition choice to reconsider for the actual stage name. Biography containers expand for additional paragraphs, and a short biography leaves intentional breathing room. Images keep their aspect ratios; a real portrait will need its own focal-point/crop review.

## Reusable tokens

The source of truth for this mockup is `preview/styles.css`, in `:root`.

| Group | Tokens and intent |
| --- | --- |
| Colour | `--paper: #f2eee5`, `--ink: #24251f`, `--muted: #626259`, `--accent: #a34129`; feature background `--dark: #242b25`, light text `--on-dark`, secondary text `--dark-muted: #c4c8bd`. |
| Typography | `--font-display`: Georgia/Times serif, with italic accents; `--font-body`: Arial/Helvetica sans serif. `--text-small`: 12px; body: 16px; lead: fluid 22.4–32px. Heading sizes use fluid clamps. No remote fonts or font licensing dependencies. |
| Spacing | `--space-1` through `--space-8`: 8, 16, 24, 32, 48, 64, 96 and 128px. Fluid `--gutter` and `--section-space` control responsive rhythm. |
| Borders | `--line: #cbc8bc`; `--border`: 1px solid rule; `--radius: 0`. No decorative card shadows; artwork uses its own illustrative treatment. |
| Interaction | `--hover: #7f301d`, `--focus: #a34129`, `--disabled: #b8bba9`, `--duration: 160ms`. Visible 3px focus outline with offset; links have distinct hover colour; primary action is at least 52px high; navigation has 44px minimum targets. |

Abstract cover palettes are illustration-specific values, not additional UI brand colours. Replace the cover studies with approved release artwork.

## Motion and accessibility

Only short colour transitions and native smooth anchor scrolling are used. `prefers-reduced-motion: reduce` removes transitions and restores instant scrolling. There is no autoplay, scroll interception, animation loop or loading screen. Semantic landmarks, ordered headings, a skip link, labelled navigation and descriptive temporary image alternatives are included. Hero imagery loads eagerly; the supporting image loads lazily. All actual navigation uses real in-page destinations.

## Replacement register

| Temporary element | Required before launch |
| --- | --- |
| Artist Name wordmark, hero heading, footer name | Exact approved stage name; optional logo. |
| Hero tagline, introduction, section prose and biography | Approved copy, short/full biography and confirmation of editorial tone. |
| Guitar photograph | Strong approved artist portrait with usage rights, required credits and desktop/mobile crop review. |
| Microphone photograph | Optional approved supporting artist photograph, or omit the image. |
| CSS cover studies, sample release titles/types, pending dates | Actual catalogue, artwork, release dates, type and featured selection. All sample releases are illustrative, not client data. |
| Disabled release action and pending catalogue destinations | Verified release-specific listening URLs. |
| Booking, social and streaming positions | Public booking email, official social/streaming profile URLs and approved link labels. |
| Copyright-owner status | Confirmed rights-holder attribution. |
| Proposed palette/type | Artist approval or supplied brand guidelines. |
| Design-study banner and draft notes | Remove only after temporary content has been replaced and verified. |

Temporary images were downloaded from Unsplash's image CDN for local review on 18 October 2026:

- Portrait: `https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=1600&q=85&fit=crop`
- Atmosphere: `https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&q=85&fit=crop`

These are not approved client assets. Photographer credits and launch-use clearance have not been established; replace both before publication. No reference-site asset was downloaded. Artwork studies are original CSS shapes, not genuine release covers.

## Verification and limits

Edge device-emulation checks at 320, 390, 768 and 1440px found no horizontal overflow. Images loaded, all internal anchors resolved, and the hero action targets `#latest`. Grid column counts were one, one, two and three respectively. Reduced-motion emulation returned `scroll-behavior: auto`. Desktop and mobile full-page captures were visually inspected. The long catalogue title wraps and the multi-paragraph biography flows without clipping.

`preview/check-layout.mjs` records the focused browser checks and screenshot generation; it uses Node's built-in WebSocket API against a dedicated local Edge debugging session on port 9223. No test dependency was installed. This helper is for development only and is not needed to open the mockup.

No physical-device, screen-reader or cross-browser audit has been performed. Actual long artist names, final photography crops and final biographies must be checked after content delivery. External listening, email and profile destinations cannot be tested until supplied. This is a visual direction preview, not a launch-ready promotional website. Structured production content files and deployment remain later-phase work.
