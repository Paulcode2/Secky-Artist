export interface MusicVideo {
  id: string;
  title: string;
  url: string;
}

// Titles were read from YouTube's metadata for the client-supplied links.
// Thumbnail URLs are derived from each validated YouTube ID in the component.
export const videos: MusicVideo[] = [
  {
    id: 'why',
    title: '22 SANTINO x Secky - Why (Official Music Video)',
    url: 'https://youtu.be/-2fzkNE0JsM?is=9RBA_5LB4rVW4FQU',
  },
  {
    id: 'celebration-in-the-air',
    title: 'Secky x FIFA Sound - Celebration In The Air (Hola Hola) (Official Music Video)',
    url: 'https://youtu.be/a2AZKeTLg5g?is=z4RBKJow9F0Rq8At',
  },
  {
    id: 'take-you-to-places',
    title: 'Secky - Take You To Places (Official Music Video)',
    url: 'https://youtu.be/GgEs7aYDEjM?is=i6GJB_VpwX17lUZb',
  },
  {
    id: 'fire',
    title: 'Secky x 22 SANTINO - Fire (Official Music Video)',
    url: 'https://youtu.be/sWppd363iGU?is=lIGYVjN-f5yokVYe',
  },
];
