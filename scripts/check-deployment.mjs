import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
for (const key of ['dependencies', 'devDependencies']) {
  assert.deepEqual(lock.packages[''][key], pkg[key], `${key}: package/lock mismatch`);
}
const html = await readFile('dist/index.html', 'utf8');
assert.ok(html.includes('SECKY | Official Website'));
assert.ok(html.includes('noindex, nofollow'), 'Review artifact must remain noindex until approved launch');
for (const attribute of ['og:title', 'og:description', 'twitter:title', 'twitter:description']) assert.ok(html.includes(attribute));
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  assert.ok((await stat(join('dist', match[1]))).isFile(), `Missing asset ${match[1]}`);
}
async function inspect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    assert.ok(!/^(?:\.env(?:\.|$)|\.git$|node_modules$)|\.(?:pem|key|map)$/i.test(entry.name), `Unexpected deployment file: ${path}`);
    if (entry.isDirectory()) await inspect(path);
    else assert.ok(/\.(?:html|js|css|svg|webp|jpe?g|png|ico|txt|xml)$/i.test(entry.name), `Unexpected file type: ${path}`);
  }
}
await inspect('dist');
console.log('Deployment checks passed: lockfile, initial metadata, local assets and static artifact allowlist. Review-only noindex retained.');
