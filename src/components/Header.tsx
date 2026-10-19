import { useEffect, useRef, useState } from 'react';
import type { ArtistContent } from '../content/artist';
import { Button, Container, Link } from './ui';

const navigation = [{ id: 'music', label: 'MP3' }, { id: 'mp4', label: 'MP4' }, { id: 'about', label: 'INFO' }, { id: 'contact', label: 'Contact' }];

export function Header({ artist }: { artist: ArtistContent }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const reset = () => setOpen(false);
    media.addEventListener('change', reset);
    return () => media.removeEventListener('change', reset);
  }, []);

  // Measure the actual sticky header, including wrapped stage names and browser zoom.
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', `${element.getBoundingClientRect().height}px`);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function navigate(id: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.focus({ preventScroll: true });
      target?.scrollIntoView();
    });
  }

  return <header ref={header} className="header-shell" onKeyDown={event => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
  }} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <Container className="site-header">
      <Link className="wordmark" href="#home" onClick={() => navigate('home')} aria-label={`${artist.headerWordmark ?? artist.stageName}, back to top`}>
        {artist.headerWordmark ?? (artist.logo ? <img className="artist-logo" src={artist.logo.src} alt={artist.stageName} width={artist.logo.width} height={artist.logo.height} /> : <>{artist.stageName}<span className="dot">.</span></>)}
      </Link>
      <Button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></Button>
      <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {navigation.map(({ id, label }) => <Link key={id} href={`#${id}`} onClick={() => navigate(id)}>{label}</Link>)}
      </nav>
    </Container>
  </header>;
}
