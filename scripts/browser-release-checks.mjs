import assert from 'node:assert/strict';

export async function checkReleases({ evaluate, call, key, settle }) {
  await evaluate(`(async () => {
    const { createElement, createRoot, ReleaseSections } = await import('/scripts/browser-fixtures.ts');
    const base = { type:'single',featured:false, platforms:[] };
    const one = {name:'Spotify',url:'https://example.test/track'};
    const two = {name:'Apple Music',url:'https://example.test/album'};
    const entries = [
      {...base,id:'feature',title:'Featured test release',featured:true,smartLink:'https://example.test/smart',platforms:[one,two],artwork:{src:'/preview/assets/temporary-portrait.jpg',alt:'Test artwork'}},
      {...base,id:'chooser',title:'A very long release title that wraps across several lines on mobile screens',releaseDate:'2020-01-01',platforms:[one,two]},
      {...base,id:'single',title:'Direct platform test',releaseDate:'2019-01-01',platforms:[one]},
      {...base,id:'empty',title:'Unavailable test',artwork:{src:'data:image/png;base64,broken',alt:'Broken fixture artwork'}},
      {...base,id:'future',title:'Future test',releaseDate:'2099-01-01',preSaveUrl:'https://example.test/save'},
    ];
    document.getElementById('root').style.display='none';
    const host=document.createElement('div');host.id='release-test-fixture';document.body.append(host);
    window.releaseFixtureRoot=createRoot(host);
    window.releaseFixtureRoot.render(createElement(ReleaseSections,{entries}));
    await new Promise(r=>setTimeout(r,150));
    await Promise.all([...host.querySelectorAll('img')].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));
  })()`);
  await settle();
  assert.deepEqual(await evaluate(`({
    featured: document.querySelector('#release-test-fixture #latest-title').textContent,
    count: document.querySelectorAll('#release-test-fixture article').length,
    direct: document.querySelector('#release-test-fixture .feature-copy a').href,
    noDuplicate: ![...document.querySelectorAll('#release-test-fixture article h3')].some(h=>h.textContent==='Featured test release'),
    fallbacks: document.querySelectorAll('#release-test-fixture .artwork-fallback').length,
    unavailable: [...document.querySelectorAll('#release-test-fixture article')].find(a=>a.textContent.includes('Unavailable test')).querySelectorAll('a,button,summary').length,
    presave: [...document.querySelectorAll('#release-test-fixture a')].some(a=>a.textContent.includes('Pre-save') && a.href==='https://example.test/save'),
    single: [...document.querySelectorAll('#release-test-fixture article')].find(a=>a.textContent.includes('Direct platform test')).querySelector('a').href
  })`), { featured:'Featured test release',count:4,direct:'https://example.test/track',noDuplicate:true,fallbacks:4,unavailable:0,presave:true,single:'https://example.test/track' });
  for (const width of [320, 390, 768, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 640 }); await settle();
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= ${width}`));
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('#release-test-fixture .release-grid')).gridTemplateColumns.split(' ').length`), width < 640 ? 1 : width < 1024 ? 2 : 3);
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true }); await settle();
  await evaluate(`document.querySelector('#release-test-fixture .release-listening-links a').focus()`);
  assert.equal(await evaluate('document.activeElement.getAttribute("aria-label").startsWith("Listen on Spotify")'), true);
  await key('Tab', 'Tab', 9);
  assert.equal(await evaluate('document.activeElement.getAttribute("aria-label").startsWith("Listen on Apple Music")'), true);
  assert.equal(await evaluate(`document.querySelectorAll('#release-test-fixture summary').length`), 0);
  await evaluate(`window.releaseFixtureRoot.unmount();document.getElementById('release-test-fixture').remove();document.getElementById('root').style.display='';`);
  return 'Featured/grid, visible platform links, unavailable/pre-save, artwork fallback, responsive columns and keyboard navigation passed';
}
