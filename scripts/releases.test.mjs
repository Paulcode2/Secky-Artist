import test from 'node:test';
import assert from 'node:assert/strict';
import { releases } from '../src/content/releases.ts';
import { externalUrl, validDate, todayInLagos, listeningAction, selectReleases, releaseErrors } from '../src/lib/releases.ts';

const base = { id: 'test', title: 'Test release', type: 'single', featured: false, platforms: [] };
const one = { name: 'Spotify', url: 'https://example.test/track' };
const two = { name: 'Apple Music', url: 'https://example.test/album' };
const today = '2026-10-18';

test('authored catalogue has valid IDs, dates, artwork descriptions and URL syntax', () => {
  assert.deepEqual(releaseErrors(releases), []);
});
test('smart link wins; invalid smart link falls back to a single valid platform', () => {
  assert.deepEqual(listeningAction({ ...base, smartLink: 'https://example.test/smart', platforms: [one, two] }, today), { kind: 'direct', label: 'Listen Now', url: 'https://example.test/smart' });
  assert.equal(listeningAction({ ...base, smartLink: '#', platforms: [one] }, today).url, one.url);
});
test('multiple unique valid destinations choose; duplicates and invalid links are removed', () => {
  assert.equal(listeningAction({ ...base, platforms: [one, two] }, today).kind, 'choose');
  assert.equal(listeningAction({ ...base, platforms: [one, one, { name: 'Bad', url: 'javascript:alert(1)' }] }, today).kind, 'direct');
  assert.equal(listeningAction({ ...base, platforms: [{ name: '', url: one.url }] }, today).kind, 'unavailable');
});
test('missing links produce an unavailable action', () => {
  assert.equal(listeningAction(base, today).kind, 'unavailable');
  for (const url of ['', '#', 'javascript:alert(1)', 'http://example.test', 'https://name:secret@example.test']) assert.equal(externalUrl(url), undefined);
});
test('future releases require explicit pre-save; release day switches to listening', () => {
  const future = { ...base, releaseDate: '2026-10-19', platforms: [one] };
  assert.equal(listeningAction(future, today).kind, 'unavailable');
  assert.equal(listeningAction({ ...future, preSaveUrl: 'https://example.test/save' }, today).label, 'Pre-save');
  assert.equal(listeningAction({ ...future, preSaveUrl: '#' }, today).kind, 'unavailable');
  assert.equal(listeningAction(future, '2026-10-19').label, 'Listen Now');
});
test('calendar validation and Lagos day boundary are deterministic', () => {
  assert.equal(validDate('2025-02-29'), undefined);
  assert.equal(validDate('2024-02-29'), '2024-02-29');
  assert.equal(validDate('2026-13-01'), undefined);
  assert.equal(todayInLagos(new Date('2026-10-18T23:30:00Z')), '2026-10-19');
});
test('explicit feature excluded from descending catalogue; undated last and ID tie-break stable', () => {
  const entries = [
    { ...base, id: 'undated' }, { ...base, id: 'old', releaseDate: '2020-01-01' },
    { ...base, id: 'featured', featured: true, releaseDate: '2019-01-01' },
    { ...base, id: 'b', releaseDate: '2026-01-01' }, { ...base, id: 'a', releaseDate: '2026-01-01' },
  ];
  const result = selectReleases(entries);
  assert.equal(result.featured.id, 'featured');
  assert.deepEqual(result.catalogue.map(r => r.id), ['a', 'b', 'old', 'undated']);
  assert.equal(selectReleases([base]).featured, undefined);
  assert.equal(selectReleases([base, base, { ...base, id: 'blank', title: '' }]).catalogue.length, 1);
});
test('authoring validation catches ambiguous feature, duplicates, blank cards and malformed content', () => {
  assert.ok(releaseErrors([{ ...base, featured: true }, { ...base, featured: true }]).length >= 2);
  assert.ok(releaseErrors([{ ...base, title: '', releaseDate: 'bad', artwork: { src: '', alt: '' }, smartLink: '#' }]).length >= 4);
});
