import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { projects, portfolioUrl } from './content';
import type { Project } from './content';
import { gsap, ScrollTrigger, useGSAP, useMotion } from './motion';
import './projects.css';

function Preview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const { reduced } = useMotion();
  const src = `/assets/projects/${project.image}-card-1200.webp`;
  useEffect(() => {
    const element = video.current;
    if (!element || reduced) { element?.pause(); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => { /* The poster remains if autoplay is blocked. */ });
      else element.pause();
    }, { threshold: .2 });
    observer.observe(element);
    return () => { observer.disconnect(); element.pause(); };
  }, [reduced]);
  if (failed) return <div className="project-preview media-fallback">{project.title}<span>Preview unavailable · read the case study ↗</span></div>;
  if (project.video) return <video className="project-preview" ref={video} poster={src} src={project.video} muted loop playsInline preload="none" aria-label={`${project.title} demonstration`} onError={() => setFailed(true)} />;
  return <img className="project-preview" src={src} srcSet={[480,800,1200].map(w => `/assets/projects/${project.image}-card-${w}.webp ${w}w`).join(', ')} sizes="(max-width:768px) 90vw, 950px" alt={`${project.title} project preview`} width="1200" height="675" loading="lazy" onLoad={() => ScrollTrigger.refresh()} onError={() => setFailed(true)} />;
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const { reduced, fine } = useMotion();
  useGSAP(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width:769px)', () => {
      const track = root.current!.querySelector<HTMLElement>('.project-track')!;
      const title = root.current!.querySelector<HTMLElement>('.projects-heading')!;
      const travel = () => Math.max(0, track.scrollWidth + title.offsetWidth + 26 + parseFloat(getComputedStyle(root.current!).paddingLeft) * 2 - innerWidth);
      gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { id: 'project-gallery', trigger: root.current, start: 'top top', end: () => `+=${travel()/1.4}`, pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: self => { root.current!.dataset.progress = self.progress.toFixed(4); } } });
    });
    gsap.from('.projects-heading span', { yPercent: 100, stagger: .08, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top bottom', once: true } });
    return () => mm.revert();
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
  const moveCursor = (e: React.PointerEvent) => {
    if (!cursor.current || !fine || reduced) return;
    gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: .13, ease: 'power2.out', overwrite: true });
  };
  const revealCard = (element: HTMLAnchorElement) => {
    if (!element.matches(':focus-visible')) return;
    const st = ScrollTrigger.getById('project-gallery');
    if (st) st.scroll(Math.min(st.end, st.start + (element.offsetLeft + root.current!.querySelector<HTMLElement>('.projects-heading')!.offsetWidth + 26) / 1.4));
  };
  return <>
    <section className={`projects-section ${reduced ? 'projects-static' : ''}`} ref={root} id="projects" tabIndex={-1} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="projects-heading"><span>Selected</span><span>projects</span><small>[ SIX WAYS TO MAKE AN IDEA REAL ]</small></h2>
      <div className="project-track">
        {projects.map((project,index) => <a className="project" data-project={project.slug} key={project.slug} href={`${portfolioUrl}/projects/${project.slug}`} onFocus={e => revealCard(e.currentTarget)} onPointerEnter={e => { moveCursor(e); cursor.current?.classList.add('is-visible'); }} onPointerMove={moveCursor} onPointerLeave={() => cursor.current?.classList.remove('is-visible')}>
          <div className="project-media"><span className="project-number">[ 0{index+1} / 06 ]</span><Preview project={project} /></div>
          <div className="project-info"><p className="project-category">{project.category}</p><h3>{project.title} <span>↗</span></h3><p className="project-description">{project.summary}</p><p className="project-tags">{project.tags}</p></div>
        </a>)}
      </div>
    </section>
    {fine && !reduced && createPortal(<div className="project-cursor" ref={cursor} aria-hidden="true"><span>VIEW<br />PROJECT ↗</span></div>,document.body)}
  </>;
}
