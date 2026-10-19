export function PlatformLogo({ name }: { name: string }) {
  if (name === 'Spotify') return <svg className="platform-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <g fill="none" stroke="var(--logo-cutout)" strokeLinecap="round">
      <path d="M6 9c4-1.2 8-1 12 1" strokeWidth="1.8" />
      <path d="M6.7 12.3c3.5-1 7-.7 10.4 1" strokeWidth="1.6" />
      <path d="M7.5 15.5c2.8-.7 5.6-.4 8.3.8" strokeWidth="1.4" />
    </g>
  </svg>;
  if (name === 'Apple Music') return <svg className="platform-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
    <path d="M10 7.5v9.1c0 1.2-1.4 2.1-2.7 2.1-1 0-1.8-.6-1.8-1.5 0-1.2 1.4-2.1 3-2.1V6.5L18 4.6v10.2c0 1.2-1.4 2.1-2.7 2.1-1 0-1.8-.6-1.8-1.5 0-1.2 1.4-2.1 3-2.1V6.2Z" fill="var(--logo-cutout)" />
  </svg>;
  return <span>{name}</span>;
}
