// Run against the development server and a dedicated Edge CDP session (README).
import assert from 'node:assert/strict';
import { checkReleases } from './browser-release-checks.mjs';
const response = await fetch('http://127.0.0.1:5173/');
assert.equal(response.status, 200);
const pages = await (await fetch('http://127.0.0.1:9223/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let serial = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', e => {
  const msg = JSON.parse(e.data);
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
  if (pending.has(msg.id)) { const [resolve, reject] = pending.get(msg.id); pending.delete(msg.id); msg.error ? reject(msg.error) : resolve(msg.result); }
});
function call(method, params = {}) { return new Promise((resolve, reject) => { const id = ++serial; pending.set(id, [resolve, reject]); ws.send(JSON.stringify({ id, method, params })); }); }
async function evaluate(expression) {
  const r = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
const settle = () => evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
async function key(key, code, virtualKey) {
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: virtualKey, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: virtualKey });
  await settle();
}
try {
  await call('Page.enable'); await call('Runtime.enable');
  await call('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  for (let i = 0; i < 50; i++) { if (await evaluate('!!document.querySelector(".hero")')) break; await new Promise(r => setTimeout(r, 100)); }
  await evaluate('Promise.all([...document.images].map(i => { i.loading = "eager"; return i.decode().catch(() => {}); }))');
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const layouts = [];
  for (const width of [320, 390, 768, 1440, 1920]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 640 }); await settle();
    const info = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, images: [...document.images].every(i => i.complete && i.naturalWidth), anchors: [...document.querySelectorAll('a[href^="#"]')].every(a => a.hash.length > 1 && document.getElementById(a.hash.slice(1))) })`);
    assert.ok(info.scrollWidth <= width); assert.ok(info.images); assert.ok(info.anchors); layouts.push(info);
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 320, height: 900, deviceScaleFactor: 1, mobile: true }); await settle();
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".navigation")).display'), 'none');
  await evaluate('document.querySelector(".menu-toggle").focus()');
  await call('Emulation.setFocusEmulationEnabled', { enabled: true });
  await key('Enter', 'Enter', 13);
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true');
  await key('Tab', 'Tab', 9);
  assert.equal(await evaluate('document.activeElement.textContent'), 'Music');
  await key('Escape', 'Escape', 27);
  assert.equal(await evaluate('document.activeElement.classList.contains("menu-toggle")'), true);
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
  await key('Enter', 'Enter', 13); await key('Tab', 'Tab', 9); await key('Tab', 'Tab', 9); await key('Enter', 'Enter', 13);
  assert.equal(await evaluate('document.activeElement.id'), 'about');
  assert.equal(await evaluate('location.hash'), '#about');
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
  assert.ok(await evaluate('document.querySelector("#about").getBoundingClientRect().top >= document.querySelector("header").getBoundingClientRect().bottom'));
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'), 'auto');
  assert.equal(await evaluate('document.querySelectorAll("a[href^=mailto], .profile-links").length'), 0);
  const contentChecks = await evaluate(`(async () => {
    const { bookingHref, validProfiles } = await import('/src/content/artist.ts');
    return { email: bookingHref(' bookings@example.test '), badEmail: bookingHref('bad?address'), profiles: validProfiles([{label:'Test',url:'https://example.test/artist'},{label:'Missing',url:''},{label:'Invalid',url:'#'}]).length };
  })()`);
  assert.equal(contentChecks.email, 'mailto:bookings@example.test'); assert.equal(contentChecks.badEmail, undefined); assert.equal(contentChecks.profiles, 1);
  // Render fixtures only inside the test browser; no fictitious contacts enter source content.
  const rendering = await evaluate(`(async () => {
    const { createElement, createRoot, Contact, artist } = await import('/scripts/browser-fixtures.ts');
    const host = document.createElement('div'); document.body.append(host);
    const root = createRoot(host);
    root.render(createElement(Contact, { artist: {...artist, bookingEmail:'bookings@example.test',socialProfiles:[{label:'Test profile',url:'https://example.test/artist'}]} }));
    await new Promise(r => setTimeout(r, 100));
    const passed = !!host.querySelector('a[href="mailto:bookings@example.test"]') && !!host.querySelector('a[href="https://example.test/artist"]');
    root.unmount(); host.remove(); return passed;
  })()`);
  assert.equal(rendering, true);
  const releaseChecks = await checkReleases({ evaluate, call, key, settle });
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ status: 'passed', layouts, mobileKeyboard: 'Enter, Tab, Escape, selection and focus passed', stickyAnchor: 'passed', reducedMotion: 'passed', missingLinks: 'omitted', contactFixtures: 'passed', releaseChecks, runtimeErrors: errors }, null, 2));
} finally { await call('Browser.close'); ws.close(); }
