// Local design review helper. Requires a dedicated Edge debugging instance on port 9223.
import { writeFile } from 'node:fs/promises';
const pages = await (await fetch('http://127.0.0.1:9223/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let serial = 0;
const pending = new Map();
ws.addEventListener('message', e => { const msg = JSON.parse(e.data); if (pending.has(msg.id)) { const [resolve, reject] = pending.get(msg.id); pending.delete(msg.id); msg.error ? reject(msg.error) : resolve(msg.result); } });
function call(method, params = {}) { return new Promise((resolve, reject) => { const id = ++serial; pending.set(id, [resolve, reject]); ws.send(JSON.stringify({ id, method, params })); }); }
await call('Page.enable');
await call('Page.navigate', { url: new URL('./index.html', import.meta.url).href });
await call('Runtime.evaluate', { expression: 'Promise.all(Array.from(document.images, i => i.decode().catch(() => {})))', awaitPromise: true });
const results = [];
for (const width of [320, 390, 768, 1440]) {
  await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 640 });
  await call('Runtime.evaluate', { expression: 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))', awaitPromise: true });
  const { result } = await call('Runtime.evaluate', { expression: `JSON.stringify({width: innerWidth, documentWidth: document.documentElement.scrollWidth, columns: getComputedStyle(document.querySelector('.release-grid')).gridTemplateColumns, imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0), anchorsValid: [...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1))), heroDestination: document.querySelector('.hero .button').hash})` });
  const info = JSON.parse(result.value); results.push(info);
  if (info.documentWidth > width || !info.imagesLoaded || !info.anchorsValid) throw new Error(JSON.stringify(info));
  if (width !== 320) {
    const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    await writeFile(new URL(`./${width === 390 ? 'mobile' : width === 768 ? 'tablet' : 'desktop'}-preview.png`, import.meta.url), Buffer.from(shot.data, 'base64'));
  }
}
await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const reduced = await call('Runtime.evaluate', { expression: `getComputedStyle(document.documentElement).scrollBehavior` });
console.log(JSON.stringify({ layouts: results, reducedMotionScroll: reduced.result.value }, null, 2));
await call('Browser.close');
ws.close();
