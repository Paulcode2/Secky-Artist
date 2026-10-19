import type { Release, ReleasePlatform } from '../content/releases';

export function externalUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function validDate(value?: string): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : undefined;
}

export function todayInLagos(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (type: string) => parts.find(part => part.type === type)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function isUpcoming(release: Release, today = todayInLagos()): boolean {
  const date = validDate(release.releaseDate);
  return !!date && date > today;
}

export type ListeningAction =
  | { kind: 'unavailable'; message: string }
  | { kind: 'direct'; url: string; label: 'Listen Now' | 'Pre-save' }
  | { kind: 'choose'; platforms: ReleasePlatform[] };

export function listeningAction(release: Release, today = todayInLagos()): ListeningAction {
  if (isUpcoming(release, today)) {
    const preSave = externalUrl(release.preSaveUrl);
    return preSave ? { kind: 'direct', url: preSave, label: 'Pre-save' }
      : { kind: 'unavailable', message: 'Coming soon — listening is not available yet.' };
  }
  const smart = externalUrl(release.smartLink);
  if (smart) return { kind: 'direct', url: smart, label: 'Listen Now' };
  const seen = new Set<string>();
  const platforms = release.platforms.flatMap(platform => {
    const url = externalUrl(platform.url);
    if (!url || !platform.name.trim() || seen.has(url)) return [];
    seen.add(url);
    return [{ name: platform.name.trim(), url }];
  });
  if (platforms.length === 1) return { kind: 'direct', url: platforms[0].url, label: 'Listen Now' };
  if (platforms.length > 1) return { kind: 'choose', platforms };
  return { kind: 'unavailable', message: 'Listening links are not available yet.' };
}

export function selectReleases(entries: Release[]) {
  const seen = new Set<string>();
  const unique = entries.filter(release => {
    if (!release.id.trim() || !release.title.trim() || seen.has(release.id)) return false;
    seen.add(release.id); return true;
  });
  const featured = unique.find(release => release.featured);
  const catalogue = unique.filter(release => release !== featured).sort((a, b) => {
    const aHasOrder = a.catalogueOrder !== undefined;
    const bHasOrder = b.catalogueOrder !== undefined;
    if (aHasOrder !== bHasOrder) return aHasOrder ? 1 : -1;
    if (aHasOrder && bHasOrder) return a.catalogueOrder! - b.catalogueOrder! || a.id.localeCompare(b.id);
    const aDate = validDate(a.releaseDate) ?? '';
    const bDate = validDate(b.releaseDate) ?? '';
    return bDate.localeCompare(aDate) || a.id.localeCompare(b.id);
  });
  return { featured, catalogue };
}

/** Authoring mistakes fail the content check; runtime still handles missing media/links. */
export function releaseErrors(entries: Release[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  if (entries.filter(r => r.featured).length > 1) errors.push('Only one release may be featured.');
  for (const release of entries) {
    if (!release.id.trim() || ids.has(release.id)) errors.push(`Missing or duplicate ID: ${release.id}`);
    ids.add(release.id);
    if (!release.title.trim()) errors.push(`${release.id}: title required`);
    if (!['single', 'EP', 'album'].includes(release.type)) errors.push(`${release.id}: invalid release type`);
    if (release.releaseDate && !validDate(release.releaseDate)) errors.push(`${release.id}: invalid date`);
    if (release.catalogueOrder !== undefined && (!Number.isInteger(release.catalogueOrder) || release.catalogueOrder < 0)) errors.push(`${release.id}: invalid catalogue order`);
    if (release.artwork && (!release.artwork.src.trim() || !release.artwork.alt.trim())) errors.push(`${release.id}: artwork needs a source and text alternative`);
    for (const url of [release.smartLink, release.preSaveUrl, ...release.platforms.map(p => p.url)]) {
      if (url !== undefined && !externalUrl(url)) errors.push(`${release.id}: invalid HTTPS destination`);
    }
    if (release.platforms.some(p => !p.name.trim())) errors.push(`${release.id}: platform name required`);
  }
  return errors;
}
