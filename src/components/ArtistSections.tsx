import type { ArtistContent } from '../content/artist';
import { bookingHref } from '../content/artist';
import { ArrowIcon, ArtistPhoto, ButtonLink, Container, Link, ProfileLinks, SectionHeading } from './ui';

export function Hero({ artist, listeningTarget = '#music' }: { artist: ArtistContent; listeningTarget?: '#latest' | '#music' }) {
  return <section id="home" tabIndex={-1} aria-labelledby="artist-name"><Container className={`hero ${artist.heroImage ? '' : 'without-image'}`}>
    <div className="hero-copy">{artist.tagline && <p className="eyebrow">{artist.tagline}</p>}
      <h1 id="artist-name">{artist.stageName}<span className="dot">.</span></h1>
      <p className="intro">{artist.introduction}</p>
      {artist.supportingText && <p className="hero-support">{artist.supportingText}</p>}
      {artist.motto && <p className="hero-motto">{artist.motto}</p>}
      {artist.isDraft && <p className="draft">Temporary artist name and introduction — approval pending.</p>}
      <ButtonLink href={listeningTarget}>Listen Now <ArrowIcon /></ButtonLink>
      <ProfileLinks profiles={artist.streamingProfiles} label="Listen to the artist" />
    </div>
    {artist.heroImage && <ArtistPhoto image={artist.heroImage} hero />}
    <div className="hero-bottom"><span>Music, in its own words.</span><Link href="#music">Explore the music <ArrowIcon /></Link></div>
  </Container></section>;
}

export function About({ artist }: { artist: ArtistContent }) {
  return <section id="about" className="about section" tabIndex={-1} aria-labelledby="about-title"><Container className="about-grid">
    {artist.aboutImage && <ArtistPhoto image={artist.aboutImage} />}
    <div className="biography">
      <SectionHeading id="about-title" eyebrow="03 / Behind the sound">{artist.aboutHeading}</SectionHeading>
      {artist.isDraft && <p className="draft">Temporary biography — approved artist copy pending.</p>}
      {artist.biography.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>
  </Container></section>;
}

export function Contact({ artist }: { artist: ArtistContent }) {
  const emailHref = bookingHref(artist.bookingEmail);
  return <section id="contact" className="section" tabIndex={-1} aria-labelledby="contact-title"><Container>
    <div className="contact-grid"><SectionHeading id="contact-title" eyebrow="04 / Get in touch">{artist.contactHeading}</SectionHeading>
      <div className="contact-details"><p className="eyebrow">{artist.bookingLabel}</p>
        {emailHref ? <Link className="booking-email" href={emailHref}>{artist.bookingEmail?.trim()}</Link> : <p className="draft">Booking enquiries are currently unavailable.</p>}
        <ProfileLinks profiles={artist.socialProfiles} label="Social profiles" />
        <ProfileLinks profiles={artist.streamingProfiles} label="Streaming profiles" />
      </div>
    </div>
  </Container></section>;
}

