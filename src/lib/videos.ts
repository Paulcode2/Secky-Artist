import type { MusicVideo } from '../content/videos';

const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;
const shortHosts = new Set(['youtu.be']);
const youtubeHosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com']);

/** Accept only HTTPS YouTube watch, embed, Shorts, and short-link URLs. */
export function parseYouTubeVideoId(value?: string): string | undefined {
  if (!value?.trim()) return undefined;

  let url: URL;
  try { url = new URL(value.trim()); }
  catch { return undefined; }

  if (url.protocol !== 'https:' || url.username || url.password || url.port) return undefined;

  let videoId: string | undefined;
  if (shortHosts.has(url.hostname.toLowerCase())) {
    videoId = url.pathname.match(/^\/([A-Za-z0-9_-]{11})\/?$/)?.[1];
  } else if (youtubeHosts.has(url.hostname.toLowerCase())) {
    const path = url.pathname;
    if (/^\/watch\/?$/.test(path)) {
      const values = url.searchParams.getAll('v');
      if (values.length === 1) videoId = values[0];
    } else {
      videoId = path.match(/^\/(?:shorts|embed)\/([A-Za-z0-9_-]{11})\/?$/)?.[1];
    }
  }

  return videoId && videoIdPattern.test(videoId) ? videoId : undefined;
}

/** Build a privacy-enhanced embed URL from a validated video ID, never a source URL. */
export function youtubeEmbedUrl(videoId: string): string | undefined {
  return videoIdPattern.test(videoId) ? `https://www.youtube-nocookie.com/embed/${videoId}` : undefined;
}

/** Build the external fallback destination from a validated video ID. */
export function youtubeWatchUrl(videoId: string): string | undefined {
  return videoIdPattern.test(videoId) ? `https://www.youtube.com/watch?v=${videoId}` : undefined;
}

export function youtubeThumbnailUrl(videoId: string, quality: 'maxresdefault' | 'hqdefault'): string | undefined {
  return videoIdPattern.test(videoId)
    ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
    : undefined;
}

/** Authoring check: stable IDs, titles, and unique valid video IDs. */
export function videoContentErrors(entries: MusicVideo[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const videoIds = new Set<string>();

  for (const video of entries) {
    if (!video.id.trim() || ids.has(video.id)) errors.push(`Missing or duplicate video ID: ${video.id}`);
    ids.add(video.id);
    if (!video.title.trim()) errors.push(`${video.id}: title required`);

    const videoId = parseYouTubeVideoId(video.url);
    if (!videoId) errors.push(`${video.id}: invalid YouTube video URL`);
    else if (videoIds.has(videoId)) errors.push(`${video.id}: duplicate YouTube video ID`);
    if (videoId) videoIds.add(videoId);
  }
  return errors;
}

/** Fail closed at render time too, keeping invalid URLs out of iframes and links. */
export function selectVideos(entries: MusicVideo[]): MusicVideo[] {
  const ids = new Set<string>();
  const videoIds = new Set<string>();
  return entries.filter(video => {
    const videoId = parseYouTubeVideoId(video.url);
    if (!video.id.trim() || !video.title.trim() || !videoId || ids.has(video.id) || videoIds.has(videoId)) return false;
    ids.add(video.id);
    videoIds.add(videoId);
    return true;
  });
}
