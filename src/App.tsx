import { useEffect } from 'react';
import { artist } from './content/artist';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero, About, Contact } from './components/ArtistSections';
import { ReleaseSections } from './components/Releases';

export default function App() {
  useEffect(() => { document.title = `${artist.stageName} — ${artist.isDraft ? 'development preview' : 'official website'}`; }, []);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    {artist.isDraft && <aside className="preview-note">Development preview <span>Temporary name, copy & imagery · not for publication</span></aside>}
    <Header artist={artist} />
    <main id="main" tabIndex={-1}><Hero artist={artist} /><ReleaseSections /><About artist={artist} /><Contact artist={artist} /></main>
    <Footer artist={artist} />
  </>;
}
