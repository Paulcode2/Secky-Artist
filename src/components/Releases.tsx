import { useEffect, useRef, useState } from 'react';
import { releases, type Release } from '../content/releases';
import { isUpcoming, listeningAction, selectReleases, todayInLagos, validDate } from '../lib/releases';
import { ButtonLink, Container, Link, SectionHeading } from './ui';

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
  const chooser = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  if (action.kind === 'unavailable') return <p className="listening-unavailable">{action.message}</p>;
  if (action.kind === 'direct') return <ButtonLink href={action.url} aria-label={`${action.label}: ${release.title}`}>{action.label} <span aria-hidden="true">↗</span></ButtonLink>;
  return <details className="platform-chooser" ref={chooser} onKeyDown={event => {
    if (event.key === 'Escape' && chooser.current?.open) {
      event.preventDefault(); chooser.current.open = false; summary.current?.focus();
    }
  }}>
    <summary ref={summary} className="button" aria-label={`Listen Now: choose a platform for ${release.title}`}>Listen Now <span aria-hidden="true">+</span></summary>
    <div className="platform-options"><p>Choose a platform</p><ul>
      {action.platforms.map(platform => <li key={platform.url}><Link href={platform.url} aria-label={`Listen to ${release.title} on ${platform.name}`}>{platform.name} <span aria-hidden="true">↗</span></Link></li>)}
    </ul></div>
  </details>;
}

function ReleaseMeta({ release, today }: { release: Release; today: string }) {
  const date = validDate(release.releaseDate);
  const formatted = date && new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
  return <p className="release-meta">{release.type === 'EP' ? 'EP' : release.type === 'single' ? 'Single' : 'Album'} · {date
    ? <>{isUpcoming(release, today) ? 'Coming ' : 'Released '}<time dateTime={date}>{formatted}</time></>
    : 'Release date not supplied'}</p>;
}

export function ReleaseSections({ entries = releases }: { entries?: Release[] }) {
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
      </div></> : <><SectionHeading id="latest-title" eyebrow="01 / Featured release">Featured release</SectionHeading><p className="draft">No featured release has been announced yet.</p></>}
    </Container></section>
    <section id="music" className="section" tabIndex={-1} aria-labelledby="music-title"><Container>
      <SectionHeading id="music-title" eyebrow="02 / The catalogue">Music<span className="dot">.</span></SectionHeading>
      {catalogue.length ? <div className="release-grid">{catalogue.map(release => <article className="release" key={release.id}>
        <ReleaseArtwork release={release} /><ReleaseMeta release={release} today={today} />
        <h3>{release.title}</h3><ListeningControl release={release} today={today} />
      </article>)}</div> : <p className="draft">{featured ? 'More releases will appear here when announced.' : 'The music catalogue will appear here when releases are announced.'}</p>}
    </Container></section>
  </>;
}
