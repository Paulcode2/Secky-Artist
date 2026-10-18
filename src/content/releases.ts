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
  smartLink?: string;
  /** A confirmed pre-save destination, never inferred from a listening link. */
  preSaveUrl?: string;
  platforms: ReleasePlatform[];
}

// Verified platform metadata and release-specific destinations; see docs/content-sources.md.
// Artwork reuse permission and client featured selection remain outstanding.
export const releases: Release[] = [
  {
    id: 'my-name', title: 'My Name (feat. I’ll Take You There Choir)', type: 'single',
    releaseDate: '2026-09-17', featured: false,
    platforms: [{ name: 'Apple Music', url: 'https://music.apple.com/us/album/my-name-feat-ill-take-you-there-choir/6811251027?i=6811251028' }],
  },
  {
    id: 'celebration-in-the-air', title: 'Celebration in the air (FIFA World Cup 2026) (feat. FIFA SOUND)', type: 'single',
    releaseDate: '2026-04-05', featured: false,
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/2AoDhIQASYWEc1FjtXQv6y' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/celebration-in-the-air-fifa-world-cup-2026-feat-fifa/1888957592' },
    ],
  },
  {
    id: 'letter-to-my-wife-redux', title: 'Letter to my wife (Redux)', type: 'single',
    releaseDate: '2026-04-04', featured: false,
    platforms: [{ name: 'Apple Music', url: 'https://music.apple.com/us/album/letter-to-my-wife-redux/1891233342?i=1891233343' }],
  },
  {
    id: 'black', title: 'Black', type: 'single', releaseDate: '2025-10-03', featured: false,
    platforms: [{ name: 'Apple Music', url: 'https://music.apple.com/us/album/black-single/1843594841' }],
  },
];
