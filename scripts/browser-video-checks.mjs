import assert from 'node:assert/strict';

export async function checkVideos({ evaluate, call, key, settle, includeFixtures }) {
  assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('#main-navigation a'), a => [a.hash, a.textContent.trim()])`), [
    ['#music', 'MP3'], ['#mp4', 'MP4'], ['#about', 'INFO'], ['#contact', 'Contact'],
  ]);
  assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('main > section'), section => section.id)`), ['home', 'latest', 'music', 'mp4', 'about', 'contact']);
  assert.equal(await evaluate('document.querySelector("#music-title").textContent.trim()'), 'MP3');
  assert.equal(await evaluate('document.querySelector("#about-title").textContent.trim()'), 'INFO');
  assert.equal(await evaluate('document.querySelector("#artist-name").textContent'), 'SECKY');
  assert.equal(await evaluate('document.querySelector(".hero").innerText.includes("Nigerian roots. Global rhythms.")'), false);
  assert.equal(await evaluate('document.querySelectorAll("#mp4 [data-video-preview] iframe").length'), 0);
  assert.equal(await evaluate('document.querySelectorAll("#mp4 [data-video-card]").length'), 4);
  assert.equal(await evaluate('Array.from(document.querySelectorAll("#mp4 [data-video-preview]"), preview => Math.abs(preview.getBoundingClientRect().width / preview.getBoundingClientRect().height - 16 / 9) < .03).every(Boolean)'), true);
  assert.equal(await evaluate('Array.from(document.querySelectorAll("#mp4 [data-video-card] h3"), title => title.textContent.trim()).length'), 4);
  assert.equal(await evaluate('Array.from(document.querySelectorAll("#mp4 [data-video-thumbnail]"), image => image.alt.trim().length > 0).every(Boolean)'), true);
  assert.equal(await evaluate('Array.from(document.querySelectorAll("#mp4 [data-video-thumbnail]" )).slice(0, 2).every(image => image.complete && image.naturalWidth > 120 && image.naturalHeight > 90)'), true);
  assert.equal(await evaluate('document.querySelectorAll("#mp4 [data-video-thumbnail]")[2].getAttribute("data-thumbnail-quality")'), 'hqdefault');
  assert.ok(await evaluate('document.querySelectorAll("#mp4 [data-video-thumbnail]")[2].src.endsWith("/hqdefault.jpg")'));
  assert.equal(await evaluate('Array.from(document.querySelectorAll("#mp4 button[aria-label^=\\"Play video: \\"]")).length'), 4);
  assert.equal(await evaluate(`(() => { const preview = document.querySelector('#mp4 [data-video-preview]'); const control = preview.querySelector('[data-video-play-control]').getBoundingClientRect(); const box = preview.getBoundingClientRect(); const expectedSize = innerWidth < 640 ? 56 : 72; return Math.abs(control.left + control.width / 2 - (box.left + box.width / 2)) < 1 && Math.abs(control.top + control.height / 2 - (box.top + box.height / 2)) < 1 && control.width === expectedSize; })()`), true);

  await evaluate('document.querySelector("#mp4 button[aria-label^=\\"Play video: 22 SANTINO x Secky - Why\\"]").click()');
  await settle();
  assert.equal(await evaluate('document.querySelector("#mp4 iframe")?.src'), 'https://www.youtube-nocookie.com/embed/-2fzkNE0JsM?autoplay=1');
  assert.equal(await evaluate('document.querySelector("#mp4 iframe")?.title'), 'Watch 22 SANTINO x Secky - Why (Official Music Video) on YouTube');
  assert.equal(await evaluate('document.querySelector("#mp4 iframe")?.hasAttribute("allowfullscreen")'), true);
  assert.ok(await evaluate('document.querySelector("#mp4 iframe")?.getAttribute("allow").includes("autoplay")'));
  assert.equal(await evaluate('document.querySelector("#mp4 [data-watch-on-youtube]")?.href'), 'https://www.youtube.com/watch?v=-2fzkNE0JsM');
  assert.equal(await evaluate('document.querySelector("#mp4 [data-watch-on-youtube]")?.target'), '_blank');
  assert.equal(await evaluate('document.querySelector("#mp4 [data-watch-on-youtube]")?.relList.contains("noreferrer")'), true);
  await evaluate('document.querySelector("#mp4 button[aria-label^=\\"Play video: Secky x FIFA Sound\\"]").focus()');
  await key('Enter', 'Enter', 13);
  assert.equal(await evaluate('document.querySelectorAll("#mp4 iframe").length'), 2);
  assert.equal(await evaluate('document.querySelectorAll("#mp4 iframe")[1].src'), 'https://www.youtube-nocookie.com/embed/a2AZKeTLg5g?autoplay=1');
  assert.equal(await evaluate('document.querySelectorAll("#mp4 iframe")[1].title'), 'Watch Secky x FIFA Sound - Celebration In The Air (Hola Hola) (Official Music Video) on YouTube');

  for (const width of [320, 390, 768, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 640 });
    await settle();
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= ${width}`));
    assert.equal(await evaluate('getComputedStyle(document.querySelector("#mp4 [data-video-grid]")).gridTemplateColumns.split(" ").length'), width < 640 ? 1 : 2);
    assert.equal(await evaluate('document.querySelector("#mp4 [data-video-card] [data-video-play-control]")?.getBoundingClientRect().width'), width < 640 ? 56 : 72);
  }

  if (includeFixtures) {
    const emptyState = await evaluate(`(async () => {
      const { createElement, createRoot, VideoSection } = await import('/scripts/browser-fixtures.ts');
      document.getElementById('root').style.display = 'none';
      const host = document.createElement('div'); host.id = 'video-test-fixture'; document.body.append(host);
      window.videoFixtureRoot = createRoot(host);
      window.videoFixtureRoot.render(createElement(VideoSection, { entries: [] }));
      await new Promise(resolve => setTimeout(resolve, 50));
      const passed = host.textContent.includes('Videos coming soon') && host.querySelectorAll('iframe').length === 0 && !!host.querySelector('[data-video-empty]');
      window.videoFixtureRoot.unmount(); host.remove(); document.getElementById('root').style.display = '';
      return passed;
    })()`);
    assert.equal(emptyState, true);
  }
  return 'MP3/MP4/INFO navigation, section order, deferred privacy-enhanced embed, fallback link, responsive 16:9 grid and empty state passed';
}
