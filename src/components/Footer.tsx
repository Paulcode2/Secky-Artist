import { IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { validProfiles, type ArtistContent } from '../content/artist';
import { Container, Link } from './ui';

export function Footer({ artist }: { artist: ArtistContent }) {
  const socialProfiles = validProfiles(artist.footerSocialProfiles).filter(({ label }) => label === 'Instagram' || label === 'X');

  return <footer className="site-footer"><Container className="footer-content flex flex-wrap items-center justify-between gap-6">
    <Link className="wordmark" href="#home">Secky.uk</Link>
    {artist.copyrightOwner ? <p>© {new Date().getFullYear()} {artist.copyrightOwner}</p> : artist.isDraft && <p className="draft">Copyright attribution pending</p>}
    <ul className="footer-social-links" aria-label="Social profiles">
      {socialProfiles.map(({ label, url }) => <li key={`${label}-${url}`}>
        <Link className="footer-social-link" href={url} aria-label={`Visit Secky on ${label}`} title={label}>
          {label === 'Instagram'
            ? <IconBrandInstagram className="footer-social-icon" size={24} aria-hidden="true" focusable="false" />
            : <IconBrandX className="footer-social-icon" size={24} aria-hidden="true" focusable="false" />}
        </Link>
      </li>)}
    </ul>
  </Container></footer>;
}
