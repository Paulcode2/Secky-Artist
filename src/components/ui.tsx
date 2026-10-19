import type { AnchorHTMLAttributes, ComponentPropsWithRef, ReactNode } from 'react';
import type { ArtistImage, ProfileLink } from '../content/artist';
import { validProfiles } from '../content/artist';

export function ArrowIcon() {
  return <svg className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>;
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`wrap ${className}`}>{children}</div>;
}
export function SectionHeading({ id, eyebrow, children }: { id: string; eyebrow?: string; children: ReactNode }) {
  return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 id={id}>{children}</h2></div></div>;
}
export function Button({ className = '', type = 'button', ...props }: ComponentPropsWithRef<'button'>) {
  return <button type={type} className={`button ${className}`} {...props} />;
}
export function Link({ className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^(https?:)?\/\//i.test(props.href ?? '');
  return <a className={className} {...props}
    target={external ? '_blank' : props.target}
    rel={external ? `${props.rel ?? ''} noopener noreferrer`.trim() : props.rel} />;
}
export function ButtonLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <Link {...props} className={`button ${props.className ?? ''}`} />;
}
export function ArtistPhoto({ image, hero = false }: { image: ArtistImage; hero?: boolean }) {
  return <figure className={hero ? 'hero-image' : 'about-image'}>
    <picture>
      {image.webpSrcSet && <source type="image/webp" srcSet={image.webpSrcSet} sizes={image.sizes} />}
      <img src={image.src} alt={image.alt} width={image.width} height={image.height}
        decoding="async" loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} />
    </picture>
    {image.caption && <figcaption>{image.caption}</figcaption>}
  </figure>;
}
export function ProfileLinks({ profiles, label }: { profiles: ProfileLink[]; label: string }) {
  const links = validProfiles(profiles);
  if (!links.length) return null;
  return <ul className="profile-links flex flex-wrap gap-x-6 gap-y-2" aria-label={label}>
    {links.map(({ label: name, url }) => <li key={`${name}-${url}`}><Link href={url}>{name} <ArrowIcon /></Link></li>)}
  </ul>;
}
