import { useState } from 'react';
import styles from './Videos.module.css';
import { videos, type MusicVideo } from '../content/videos';
import { parseYouTubeVideoId, selectVideos, youtubeEmbedUrl, youtubeThumbnailUrl, youtubeWatchUrl } from '../lib/videos';
import { ArrowIcon, Button, Container, Link, SectionHeading } from './ui';

type ThumbnailQuality = 'maxresdefault' | 'hqdefault';

function VideoCard({ video }: { video: MusicVideo }) {
  const [loaded, setLoaded] = useState(false);
  const [thumbnailQuality, setThumbnailQuality] = useState<ThumbnailQuality>('maxresdefault');
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const videoId = parseYouTubeVideoId(video.url);
  const embedUrl = videoId ? youtubeEmbedUrl(videoId) : undefined;
  const autoplayEmbedUrl = embedUrl ? `${embedUrl}?autoplay=1` : undefined;
  const thumbnailUrl = videoId ? youtubeThumbnailUrl(videoId, thumbnailQuality) : undefined;
  const watchUrl = videoId ? youtubeWatchUrl(videoId) : undefined;

  function useFallbackThumbnail() {
    if (thumbnailQuality === 'maxresdefault') setThumbnailQuality('hqdefault');
    else setThumbnailFailed(true);
  }

  return <article className={styles.videoCard} data-video-card>
    <div className={styles.videoPreview} data-video-preview>
      {loaded && autoplayEmbedUrl ? <iframe
        src={autoplayEmbedUrl}
        title={`Watch ${video.title} on YouTube`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      /> : <Button
        className={styles.videoLoad}
        aria-label={`Play video: ${video.title}`}
        onClick={() => { if (autoplayEmbedUrl) setLoaded(true); }}
      >
        {!thumbnailFailed && thumbnailUrl && <img
          className={styles.videoThumbnail}
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          data-video-thumbnail
          data-thumbnail-quality={thumbnailQuality}
          onLoad={event => {
            const image = event.currentTarget;
            if (thumbnailQuality === 'maxresdefault' && image.naturalWidth === 120 && image.naturalHeight === 90) {
              setThumbnailQuality('hqdefault');
            }
          }}
          onError={useFallbackThumbnail}
        />}
        <span className={styles.videoPlayControl} data-video-play-control aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" focusable="false" aria-hidden="true">
            <path d="M10 6.8c0-.76.83-1.22 1.47-.81l13.18 8.39c.6.39.6 1.26 0 1.64l-13.18 8.4c-.64.4-1.47-.05-1.47-.82V6.8z" />
          </svg>
        </span>
      </Button>}
    </div>
    <h3>{video.title}</h3>
    {watchUrl && <Link className={styles.videoWatchLink} href={watchUrl} data-watch-on-youtube>Watch on YouTube <ArrowIcon /></Link>}
  </article>;
}

export function VideoSection({ entries = videos }: { entries?: MusicVideo[] }) {
  const validVideos = selectVideos(entries);
  return <section id="mp4" className="section" tabIndex={-1} aria-labelledby="mp4-title">
    <Container>
      <SectionHeading id="mp4-title" eyebrow="03 / Music videos">MP4</SectionHeading>
      {validVideos.length
        ? <div className={styles.videoGrid} data-video-grid>{validVideos.map(video => <VideoCard key={video.id} video={video} />)}</div>
        : <p className={styles.videoEmpty} data-video-empty>Videos coming soon</p>}
    </Container>
  </section>;
}
