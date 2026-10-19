const myNameArtwork = new URL('../assets/releases/my-name.jpg', import.meta.url).href;
const celebrationArtwork = new URL('../assets/releases/celebration-in-the-air.jpg', import.meta.url).href;
const letterArtwork = new URL('../assets/releases/letter-to-my-wife-redux.jpg', import.meta.url).href;
const blackArtwork = new URL('../assets/releases/black.jpg', import.meta.url).href;
const infatuationArtwork = new URL('../assets/releases/infatuation.jpg', import.meta.url).href;
const lagos2LondonArtwork = new URL('../assets/releases/lagos-2-london.jpg', import.meta.url).href;

export interface ReleasePlatform {
  name: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  type: 'single' | 'EP' | 'album';
  /** Calendar date in YYYY-MM-DD; omit when unknown. */
  releaseDate?: string;
  artwork?: { src: string; alt: string };
  featured: boolean;
  /** Optional editorial order after the date-sorted catalogue entries. */
  catalogueOrder?: number;
  smartLink?: string;
  /** A confirmed pre-save destination, never inferred from a listening link. */
  preSaveUrl?: string;
  platforms: ReleasePlatform[];
}

// Verified platform metadata and release-specific destinations; see docs/content-sources.md.
// Covers are official or client-supplied as recorded in docs/release-artwork-sources.json.
// Featured selection remains pending.
export const releases: Release[] = [
  {
    id: 'my-name', title: 'My Name (feat. I’ll Take You There Choir)', type: 'single',
    releaseDate: '2026-09-17', featured: false,
    artwork: { src: myNameArtwork, alt: 'Cover artwork for My Name by SECKY featuring I’ll Take You There Choir' },
    platforms: [{ name: 'Spotify', url: 'https://open.spotify.com/track/4E99PWSUTRKyPK97TZkuNF' }, { name: 'Apple Music', url: 'https://music.apple.com/us/album/my-name-feat-ill-take-you-there-choir/6811251027?i=6811251028' }],
  },
  {
    id: 'celebration-in-the-air', title: 'Celebration in the air (FIFA World Cup 2026) (feat. FIFA SOUND)', type: 'single',
    releaseDate: '2026-04-05', featured: false,
    artwork: { src: celebrationArtwork, alt: 'Cover artwork for Celebration in the air by SECKY featuring FIFA SOUND' },
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/2AoDhIQASYWEc1FjtXQv6y' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/celebration-in-the-air-fifa-world-cup-2026-feat-fifa/1888957592' },
    ],
  },
  {
    id: 'letter-to-my-wife-redux', title: 'Letter to my wife (Redux)', type: 'single',
    releaseDate: '2026-04-04', featured: false,
    artwork: { src: letterArtwork, alt: 'Cover artwork for Letter to my wife (Redux) by SECKY' },
    platforms: [{ name: 'Spotify', url: 'https://open.spotify.com/track/3qrb8LnqPLEDCxRoKWLph8' }, { name: 'Apple Music', url: 'https://music.apple.com/us/album/letter-to-my-wife-redux/1891233342?i=1891233343' }],
  },
  {
    id: 'black', title: 'Black', type: 'single', releaseDate: '2025-10-03', featured: false,
    artwork: { src: blackArtwork, alt: 'Cover artwork for Black by SECKY' },
    platforms: [{ name: 'Spotify', url: 'https://open.spotify.com/track/0H8uVUagukefzhUNp2BqBH' }, { name: 'Apple Music', url: 'https://music.apple.com/us/album/black-single/1843594841' }],
  },
  {
    id: 'infatuation', title: 'Infatuation', type: 'EP', releaseDate: '2024-07-15', featured: false, catalogueOrder: 1,
    artwork: { src: infatuationArtwork, alt: 'Cover artwork for Infatuation EP by SECKY' },
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/album/4KLrZlZcKbK55f8KbxXshk' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/infatuation-ep/1756520071?uo=4' },
    ],
  },
  {
    id: 'lagos-2-london', title: 'Lagos 2 London', type: 'EP', releaseDate: '2025-12-12', featured: false, catalogueOrder: 2,
    artwork: { src: lagos2LondonArtwork, alt: 'Cover artwork for Lagos 2 London EP by Yeye Boiz, featuring Secky' },
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/album/0mMxLf1UH34ikskq84otkg' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/lagos-2-london-ep/1858948120?uo=4' },
    ],
  },
];
