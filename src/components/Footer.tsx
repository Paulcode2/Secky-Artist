import type { ArtistContent } from '../content/artist';
import { Container, Link, ProfileLinks } from './ui';

export function Footer({ artist }: { artist: ArtistContent }) {
  return <footer><Container className="footer-content flex flex-wrap items-center justify-between gap-6">
    <Link className="wordmark" href="#home">Secky.uk</Link>
    {artist.copyrightOwner ? <p>© {new Date().getFullYear()} {artist.copyrightOwner}</p> : artist.isDraft && <p className="draft">Copyright attribution pending</p>}
    <ProfileLinks profiles={[...artist.socialProfiles, ...artist.streamingProfiles]} label="Artist profiles" />
  </Container></footer>;
}
