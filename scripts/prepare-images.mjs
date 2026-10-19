// Re-encode supplied originals without retouching. Requires dev:5173 and dedicated Edge CDP:9223.
import { writeFile } from 'node:fs/promises';
const pages = await (await fetch('http://127.0.0.1:9223/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const call = (method, params) => new Promise(resolve => { const key = ++id; pending.set(key, resolve); ws.send(JSON.stringify({ id: key, method, params })); });
try {
  const outputs = [];
  await call('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  await new Promise(r => setTimeout(r, 1000));
  for (const [name, widths] of [['studio', [480, 800, 1047]], ['outdoor', [480, 800, 1080]]]) {
    for (const width of widths) {
      const result = await call('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: `(async () => {
        const img = new Image(); img.src = '/src/assets/artist/secky-${name}.jpeg'; await img.decode();
        const canvas = document.createElement('canvas'); canvas.width = ${width}; canvas.height = Math.round(img.height * ${width} / img.width);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/webp', .82);
      })()` });
      const data = result.result?.result?.value;
      if (!data?.startsWith('data:image/webp;base64,')) throw new Error(JSON.stringify(result));
      const bytes = Buffer.from(data.split(',')[1], 'base64');
      outputs.push([`src/assets/artist/secky-${name}-${width}.webp`, bytes]);
      console.log(`${name} ${width}px: ${bytes.length} bytes`);
    }
  }
  // Write only after all browser work, avoiding Vite reloads during encoding.
  for (const [path, bytes] of outputs) await writeFile(path, bytes);
} finally { ws.close(); }
