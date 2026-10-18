import { useEffect } from 'react';
import { artist } from './content/artist';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero, About, Contact } from './components/ArtistSections';
import { ReleaseSections } from './components/Releases';
import { releases } from './content/releases';
import { listeningAction, selectReleases } from './lib/releases';

export default function App() {
  const { featured } = selectReleases(releases);
  const listeningTarget = featured && listeningAction(featured).kind !== 'unavailable' ? '#latest' : '#music';
  useEffect(() => {
    document.title = artist.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', artist.metaDescription);
  }, []);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    {artist.isDraft && <aside className="preview-note">Development preview <span>Temporary name, copy & imagery · not for publication</span></aside>}
    <Header artist={artist} />
    <main id="main" tabIndex={-1}><Hero artist={artist} listeningTarget={listeningTarget} /><ReleaseSections profiles={artist.streamingProfiles} /><About artist={artist} /><Contact artist={artist} /></main>
    <Footer artist={artist} />
  </>;
}
