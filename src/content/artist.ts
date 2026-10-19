import studioPortrait from '../assets/artist/secky-studio.jpeg';
import outdoorPortrait from '../assets/artist/secky-outdoor.jpeg';
import studio480 from '../assets/artist/secky-studio-480.webp';
import studio800 from '../assets/artist/secky-studio-800.webp';
import studioFull from '../assets/artist/secky-studio-1047.webp';
import outdoor480 from '../assets/artist/secky-outdoor-480.webp';
import outdoor800 from '../assets/artist/secky-outdoor-800.webp';
import outdoorFull from '../assets/artist/secky-outdoor-1080.webp';

export interface ArtistImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  webpSrcSet?: string;
  sizes?: string;
}
export interface ProfileLink {
  label: string;
  url: string;
}
export interface ArtistContent {
  isDraft: boolean;
  stageName: string;
  headerWordmark?: string;
  fullName: string;
  pageTitle: string;
  metaDescription: string;
  tagline?: string;
  introduction: string;
  supportingText?: string;
  motto?: string;
  heroImage?: ArtistImage;
  logo?: ArtistImage;
  aboutHeading: string;
  shortBio: string;
  biography: string[];
  aboutImage?: ArtistImage;
  bookingEmail?: string;
  bookingLabel: string;
  contactHeading: string;
  copyrightOwner?: string;
  socialProfiles: ProfileLink[];
  streamingProfiles: ProfileLink[];
}

// Identity and biography are client-provided copy, not independently verified claims.
// Preserve the supplied full-name spelling pending confirmation of the final capital Y.
// Photographs and booking address supplied by the client; social handles remain absent.
export const artist: ArtistContent = {
  isDraft: false,
  stageName: 'SECKY',
  headerWordmark: 'ArUsi’',
  fullName: 'Success Enwerem Chimezie KingsleY',
  pageTitle: 'SECKY | Official Website',
  metaDescription: 'Discover SECKY, a Nigerian Afrobeat and pop artist based in the United Kingdom. Explore his music and listen on Spotify and Apple Music.',
  introduction: 'Nigerian roots. Global rhythms.',
  motto: 'Welcome to Arusi’Nation! Become an ARUSINATOR & embrace Arusinthesis!',
  supportingText: 'A Nigerian Afrobeat and pop artist based in the United Kingdom, SECKY brings vibrant rhythms, heartfelt storytelling, and uplifting energy to his music.',
  heroImage: {
    src: studioPortrait,
    webpSrcSet: `${studio480} 480w, ${studio800} 800w, ${studioFull} 1047w`,
    sizes: '(max-width: 639px) 90vw, (max-width: 1440px) 44vw, 624px',
    alt: 'Black-and-white studio portrait of SECKY in a patterned suit, looking to the side',
    width: 1047, height: 1143,
  },
  aboutImage: {
    src: outdoorPortrait,
    webpSrcSet: `${outdoor480} 480w, ${outdoor800} 800w, ${outdoorFull} 1080w`,
    sizes: '(max-width: 639px) 90vw, (max-width: 1440px) 41vw, 600px',
    alt: 'SECKY beside a brick wall outdoors, wearing a white shirt and colourful neck scarf',
    width: 1080, height: 720,
  },
  aboutHeading: 'About SECKY',
  shortBio: 'SECKY is a Nigerian Afrobeat and pop artist based in the United Kingdom. Blending African influences with global rhythms, he creates vibrant, uplifting music that celebrates creativity, identity, and unity.',
  biography: [
    'Secky (Success Enwerem Chimezie KingsleY) is a Nigerian Afrobeat and pop artist based in the United Kingdom. His stage name, SECKY, is derived from his initials. Known for his vibrant, uplifting sound, Secky blends African influences with global rhythms, delivering heartfelt storytelling and music that celebrates creativity, identity and unity.',
    'A winner of the Top Naija Music Awards, Secky has also achieved a notable milestone by contributing to ‘Celebration in the Air’ featuring FIFA Sound, with the song appearing on FIFA’s official Spotify and Apple Music pages. This achievement reflects his growing presence in the international music scene as he continues to share his sound with audiences worldwide.',
  ],
  bookingLabel: 'Bookings & enquiries',
  bookingEmail: 'Info@seckyworldwide.com',
  contactHeading: 'Contact',
  socialProfiles: [],
  streamingProfiles: [
    { label: 'Spotify', url: 'https://open.spotify.com/artist/2gyg88Hy443exTHje87bKk' },
    { label: 'Apple Music', url: 'https://music.apple.com/gb/artist/secky/1756161815' },
  ],
};

export function validProfiles(profiles: ProfileLink[]): ProfileLink[] {
  return profiles.filter(({ label, url }) => {
    if (!label.trim()) return false;
    try { const parsed = new URL(url); return parsed.protocol === 'https:' && !parsed.username && !parsed.password; }
    catch { return false; }
  });
}

export function bookingHref(email?: string): string | undefined {
  const value = email?.trim();
  return value && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value)
    ? `mailto:${value}` : undefined;
}
