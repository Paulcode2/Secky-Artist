import assert from 'node:assert/strict';
export async function auditPage({ evaluate, key }) {
  const result = await evaluate(`(() => {
    const root = getComputedStyle(document.documentElement);
    const color = name => root.getPropertyValue(name).trim();
    const lum = hex => {
      const rgb = hex.slice(1).match(/../g).map(c => parseInt(c,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
      return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
    };
    const pairs = [['--ink','--paper'],['--muted','--paper'],['--paper','--accent'],['--paper','--hover'],['--on-dark','--dark'],['--dark-muted','--dark'],['--muted', '#e7e2d7']];
    const contrast = pairs.map(([a,b]) => {const x=lum(color(a)),y=lum(b.startsWith('--')?color(b):b);return {pair:a+'/'+b, ratio: +( (Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};});
    return {
      headings: [...document.querySelectorAll('h1,h2,h3')].map(h=>({level:Number(h.tagName[1]),text:h.textContent})),
      landmarks: {main:document.querySelectorAll('main').length,header:document.querySelectorAll('header').length,footer:document.querySelectorAll('footer').length},
      unnamedActions:[...document.querySelectorAll('a,button,summary')].filter(e=>!(e.getAttribute('aria-label')||e.textContent).trim()).length,
      images:[...document.images].map(i=>({alt:i.alt,source:i.currentSrc,width:i.naturalWidth,loading:i.loading,priority:i.fetchPriority})),
      contrast,
      sharing: ['og:title','og:description','og:type'].every(p=>document.querySelector('meta[property="'+p+'"]').content),
      favicon: !!document.querySelector('link[rel="icon"]'),
      noindex:document.querySelector('meta[name="robots"]').content.includes('noindex')
    };
  })()`);
  assert.equal(result.headings.filter(h=>h.level===1).length,1);
  assert.ok(result.headings.every((h,i,a)=>i===0||h.level<=a[i-1].level+1));
  assert.deepEqual(result.landmarks,{main:1,header:1,footer:1});
  assert.equal(result.unnamedActions,0);
  assert.ok(result.images.every(i=>i.alt && i.source));
  assert.equal(await evaluate('document.querySelectorAll(".release-artwork img").length'), 4);
  assert.equal(await evaluate('document.querySelectorAll(".release-artwork .artwork-fallback").length'), 0);
  assert.ok(result.contrast.every(c=>c.ratio>=4.5));
  assert.ok(result.sharing && result.favicon && result.noindex);
  await evaluate('document.querySelector(".skip").focus()');
  await key('Tab','Tab',9);
  const focus = await evaluate('({visible:document.activeElement.matches(":focus-visible"),style:getComputedStyle(document.activeElement).outlineStyle,width:getComputedStyle(document.activeElement).outlineWidth})');
  assert.ok(focus.visible && focus.style !== 'none' && parseFloat(focus.width)>=2);
  result.keyboardFocus = focus;
  return result;
}
