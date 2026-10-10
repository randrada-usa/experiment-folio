import { useRef } from 'react';
import { Logo } from './Logo';
import { portfolioUrl, socialLinks } from './content';
import { gsap, scrollToSection, useGSAP, useMotion } from './motion';
import './footer.css';

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { fine, reduced, perspective } = useMotion();
  useGSAP(() => {
    if (!fine || reduced || perspective !== 'on') return;
    const tiles = gsap.utils.toArray<HTMLElement>('.footer-art', root.current);
    const cleanups = tiles.map(tile => {
      const art = tile.querySelector<HTMLElement>('.tilt-art')!;
      const x = gsap.quickTo(art, 'rotationX', { duration: .6, ease: 'power3.out' });
      const y = gsap.quickTo(art, 'rotationY', { duration: .6, ease: 'power3.out' });
      const move = (e: PointerEvent) => { const r = tile.getBoundingClientRect(); x(-(e.clientY-r.top-r.height/2)/r.height*14); y((e.clientX-r.left-r.width/2)/r.width*14); };
      const reset = () => { x(0); y(0); };
      tile.addEventListener('pointermove',move); tile.addEventListener('pointerleave',reset);
      return () => { tile.removeEventListener('pointermove',move); tile.removeEventListener('pointerleave',reset); gsap.set(art,{clearProps:'transform'}); };
    });
    return () => cleanups.forEach(cleanup=>cleanup());
  }, { scope:root, dependencies:[fine,reduced,perspective], revertOnUpdate:true });
  return <footer className="footer section" ref={root}>
    <div className="footer-intro"><p>Rey Andrada © 2026</p><p>Curious about what we could build?<br />Let’s turn a useful idea into something real.</p></div>
    <div className="footer-grid">
      <div className="footer-art footer-identity" role="img" aria-label="RJ logo"><Logo className="tilt-art" /></div>
      <nav className="footer-links" aria-label="Footer navigation"><div><h2>Pages</h2><a href="#about" onClick={e=>{e.preventDefault();scrollToSection('about');}}>About<span>→</span></a><a href={`${portfolioUrl}/projects`}>Projects<span>→</span></a><a href="#contact" onClick={e=>{e.preventDefault();scrollToSection('contact');}}>Contact<span>→</span></a></div><div><h2>Socials</h2>{socialLinks.map(link=><a key={link.label} href={link.href}>{link.label}<span>→</span></a>)}</div></nav>
      <a className="footer-art footer-arrow" href={`${portfolioUrl}/projects`} aria-label="Explore all projects"><span className="tilt-art" aria-hidden="true">↗</span></a>
    </div>
    <a className="footer-marquee" href={`${portfolioUrl}/projects`} aria-label="Explore Rey Andrada’s projects"><div className="footer-marquee-track" aria-hidden="true">{[0,1].map(i=><span key={i}>REY ANDRADA / DEVELOPER /&nbsp;</span>)}</div></a>
    <div className="footer-utility"><a href="#home" aria-label="Return to top" onClick={e=>{e.preventDefault();scrollToSection('home');}}><Logo /></a><p>Designed & built by Rey Andrada · 2026<br /><span>Motion study inspired by <a href="https://www.trykala.com/" target="_blank" rel="noreferrer">Kala</a></span></p><a className="footer-next" href={`${portfolioUrl}/projects`}>All projects <span>→</span><i className="continuation-fill" aria-hidden="true" /></a></div>
  </footer>;
}
