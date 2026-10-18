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

// Awaiting approved client catalogue. Do not publish fixture releases or URLs here.
export const releases: Release[] = [];
