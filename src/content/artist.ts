import portrait from '../../preview/assets/temporary-portrait.jpg';
import atmosphere from '../../preview/assets/temporary-performance.jpg';

export interface ArtistImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
export interface ProfileLink {
  label: string;
  url: string;
}
export interface ArtistContent {
  isDraft: boolean;
  stageName: string;
  tagline?: string;
  introduction: string;
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

// Temporary content only. Replace with approved client material before launch.
// Leave unavailable email, images and links undefined/empty; never invent values.
export const artist: ArtistContent = {
  isDraft: true,
  stageName: 'Artist Name',
  tagline: 'Independent sound. Individual spirit.',
  introduction: 'A sound of your own. A world to get lost in.',
  heroImage: {
    src: portrait,
    alt: 'Temporary stock photograph of a person carrying a guitar; not the client artist',
    width: 1600, height: 1600,
    caption: 'Portrait direction / temporary stock image',
  },
  aboutHeading: 'A voice. A whole world.',
  shortBio: 'Every artist has a story. This is where yours begins.',
  biography: [
    'The opening paragraph will introduce the artist in their own words: the sound, the perspective, and what they want a listener to feel. This is temporary biography placement copy, awaiting approval.',
    'A second paragraph can explore the creative process and the music’s context. Include only details supplied and approved by the artist. Longer biographies flow naturally; no text is cropped.',
  ],
  aboutImage: {
    src: atmosphere,
    alt: 'Temporary atmosphere photograph of a microphone against blurred stage lights',
    width: 1600, height: 1067,
    caption: 'Atmosphere study / temporary stock image',
  },
  bookingLabel: 'Bookings & enquiries',
  contactHeading: 'Let’s make something matter.',
  socialProfiles: [],
  streamingProfiles: [],
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
