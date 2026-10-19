import test from 'node:test';
import assert from 'node:assert/strict';
import { videos } from '../src/content/videos.ts';
import { parseYouTubeVideoId, selectVideos, videoContentErrors, youtubeEmbedUrl, youtubeThumbnailUrl, youtubeWatchUrl } from '../src/lib/videos.ts';

const suppliedIds = ['-2fzkNE0JsM', 'a2AZKeTLg5g', 'GgEs7aYDEjM', 'sWppd363iGU'];

test('client-supplied music-video entries have valid unique content', () => {
  assert.equal(videos.length, 4);
  assert.deepEqual(videoContentErrors(videos), []);
  assert.deepEqual(videos.map(video => parseYouTubeVideoId(video.url)), suppliedIds);
  assert.deepEqual(selectVideos(videos), videos);
});

test('accepts YouTube watch, youtu.be, Shorts and embed URL forms', () => {
  assert.equal(parseYouTubeVideoId('https://www.youtube.com/watch?v=a2AZKeTLg5g&list=PL123'), 'a2AZKeTLg5g');
  assert.equal(parseYouTubeVideoId('https://youtu.be/-2fzkNE0JsM?is=tracking'), '-2fzkNE0JsM');
  assert.equal(parseYouTubeVideoId('https://m.youtube.com/shorts/GgEs7aYDEjM'), 'GgEs7aYDEjM');
  assert.equal(parseYouTubeVideoId('https://youtube.com/shorts/sWppd363iGU/'), 'sWppd363iGU');
  assert.equal(parseYouTubeVideoId('https://www.youtube.com/embed/a2AZKeTLg5g'), 'a2AZKeTLg5g');
  assert.equal(parseYouTubeVideoId('https://www.youtube.com/embed/a2AZKeTLg5g?start=30'), 'a2AZKeTLg5g');
});

test('rejects non-YouTube URLs, malformed forms, credentials and invalid IDs', () => {
  const invalid = [
    '', 'javascript:alert(1)', 'http://youtu.be/a2AZKeTLg5g',
    'https://youtube.com.evil.test/watch?v=a2AZKeTLg5g',
    'https://youtube.com@evil.test/watch?v=a2AZKeTLg5g',
    'https://user:secret@youtube.com/watch?v=a2AZKeTLg5g',
    'https://www.youtube.com/embed/too-short',
    'https://www.youtube.com/watch?v=a2AZKeTLg5g&v=sWppd363iGU',
    'https://youtu.be/too-short',
    'https://youtu.be/a2AZKeTLg5g.evil',
  ];
  for (const value of invalid) assert.equal(parseYouTubeVideoId(value), undefined, value);
});

test('embed and fallback URLs are canonical and accept IDs only', () => {
  assert.equal(youtubeEmbedUrl('-2fzkNE0JsM'), 'https://www.youtube-nocookie.com/embed/-2fzkNE0JsM');
  assert.equal(youtubeWatchUrl('a2AZKeTLg5g'), 'https://www.youtube.com/watch?v=a2AZKeTLg5g');
  assert.equal(youtubeThumbnailUrl('-2fzkNE0JsM', 'maxresdefault'), 'https://img.youtube.com/vi/-2fzkNE0JsM/maxresdefault.jpg');
  assert.equal(youtubeThumbnailUrl('a2AZKeTLg5g', 'hqdefault'), 'https://img.youtube.com/vi/a2AZKeTLg5g/hqdefault.jpg');
  assert.equal(youtubeThumbnailUrl('bad-id', 'maxresdefault'), undefined);
  assert.equal(youtubeEmbedUrl('https://youtube.com/watch?v=a2AZKeTLg5g'), undefined);
  assert.equal(youtubeWatchUrl('bad-id'), undefined);
});

test('authoring checks flag duplicate entries, invalid URLs and missing titles', () => {
  const base = { id: 'video', title: 'Video title', url: 'https://youtu.be/a2AZKeTLg5g' };
  assert.ok(videoContentErrors([{ ...base, title: '' }]).some(error => error.includes('title required')));
  assert.ok(videoContentErrors([{ ...base, url: 'https://example.test/video' }]).some(error => error.includes('invalid YouTube')));
  assert.ok(videoContentErrors([base, { ...base, id: 'second' }]).some(error => error.includes('duplicate YouTube video ID')));
  assert.ok(videoContentErrors([base, base]).some(error => error.includes('duplicate video ID')));
  assert.deepEqual(selectVideos([{ ...base, url: 'https://example.test/video' }]), []);
});
