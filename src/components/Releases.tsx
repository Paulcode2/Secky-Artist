import { useEffect, useState } from 'react';
import { PlatformLogo } from './PlatformLogo';
import { releases, type Release } from '../content/releases';
import type { ProfileLink } from '../content/artist';
import { externalUrl, isUpcoming, listeningAction, selectReleases, todayInLagos, validDate } from '../lib/releases';
import { ArrowIcon, ButtonLink, Container, Link, ProfileLinks, SectionHeading } from './ui';

export function ReleaseArtwork({ release, prominent = false }: { release: Release; prominent?: boolean }) {
  const [failedSource, setFailedSource] = useState<string>();
  const artwork = release.artwork;
  return <div className="release-artwork">
    {artwork?.src && artwork.src !== failedSource
      ? <img src={artwork.src} alt={artwork.alt || `Cover artwork for ${release.title}`} width={800} height={800}
          loading={prominent ? 'eager' : 'lazy'} onError={() => setFailedSource(artwork.src)} />
      : <div className="artwork-fallback" role="img" aria-label={`Artwork unavailable for ${release.title}`}><span aria-hidden="true">Artwork unavailable</span></div>}
  </div>;
}

export function ListeningControl({ release, today }: { release: Release; today?: string }) {
  const action = listeningAction(release, today);
  if (action.kind === 'unavailable') return <p className="listening-unavailable">{action.message}</p>;
  const platforms = release.platforms.filter((platform, index, all) =>
    platform.name.trim() && externalUrl(platform.url) && all.findIndex(p => p.url === platform.url) === index);
  if (!isUpcoming(release, today) && platforms.length) return <div className="release-listening-links">
    {platforms.map(platform => <ButtonLink key={platform.url} href={platform.url} title={`Listen on ${platform.name}`} aria-label={`Listen on ${platform.name}: ${release.title}`}>
      Listen on <PlatformLogo name={platform.name} />
    </ButtonLink>)}
  </div>;
  if (action.kind === 'direct') return <ButtonLink href={action.url} aria-label={`${action.label}: ${release.title}`}>{action.label === 'Pre-save' ? 'Pre-save' : 'Choose listening platform'} <ArrowIcon /></ButtonLink>;
  return null;
}
function ReleaseMeta({ release, today }: { release: Release; today: string }) {
  const date = validDate(release.releaseDate);
  const formatted = date && new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
  return <p className="release-meta">{release.type === 'EP' ? 'EP' : release.type === 'single' ? 'Single' : 'Album'} · {date
    ? <>{isUpcoming(release, today) ? 'Coming ' : 'Released '}<time dateTime={date}>{formatted}</time></>
    : 'Release date not supplied'}</p>;
}

export function ReleaseSections({ entries = releases, profiles = [] }: { entries?: Release[]; profiles?: ProfileLink[] }) {
  const { featured, catalogue } = selectReleases(entries);
  const [today, setToday] = useState(todayInLagos);
  useEffect(() => {
    const update = () => setToday(todayInLagos());
    const timer = window.setInterval(update, 60_000);
    window.addEventListener('focus', update);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', update); };
  }, []);
  return <>
    <section id="latest" className="section featured" tabIndex={-1} aria-labelledby="latest-title"><Container className={featured ? 'feature-grid' : ''}>
      {featured ? <><ReleaseArtwork key={`${featured.id}-${featured.artwork?.src}`} release={featured} prominent /><div className="feature-copy">
        <SectionHeading id="latest-title" eyebrow="01 / Featured release">{featured.title}</SectionHeading>
        <ReleaseMeta release={featured} today={today} /><ListeningControl release={featured} today={today} />
      </div></> : <><SectionHeading id="latest-title" eyebrow="01 / Featured release">Explore MP3</SectionHeading><Link href="#music">Browse the MP3 catalogue <ArrowIcon /></Link></>}
    </Container></section>
    <section id="music" className="section" tabIndex={-1} aria-labelledby="music-title"><Container>
      <SectionHeading id="music-title" eyebrow="02 / The catalogue">MP3</SectionHeading>
      {profiles.length > 0 && <div className="music-profiles"><p>Explore the full artist catalogue</p><ProfileLinks profiles={profiles} label="Artist streaming profiles" /></div>}
      {catalogue.length ? <div className="release-grid">{catalogue.map(release => <article className="release" key={release.id}>
        <ReleaseArtwork release={release} /><ReleaseMeta release={release} today={today} />
        <h3>{release.title}</h3><ListeningControl release={release} today={today} />
      </article>)}</div> : <p className="draft">{featured ? 'More releases will appear here when announced.' : 'The music catalogue will appear here when releases are announced.'}</p>}
    </Container></section>
  </>;
}
