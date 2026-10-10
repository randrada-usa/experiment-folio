import { useEffect, useRef } from 'react';
import { portfolioUrl } from './content';
import { continuationProgress, wheelPixels } from './navigation-model';
import { gsap, ScrollSmoother, scrollToSection, useMotion } from './motion';
import './global-motion.css';

export function GlobalMotion({ menuOpen }: { menuOpen: boolean }) {
  const { fine, reduced } = useMotion();
  const range = useRef<HTMLInputElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const timers = useRef<number[]>([]);
  const go = useRef<(href:string)=>void>(()=>{});

  useEffect(() => {
    const reset = () => { navigating.current=false; gsap.set('#root',{clearProps:'opacity'}); timers.current.forEach(clearTimeout); timers.current=[]; };
    go.current = href => {
      if (navigating.current) return;
      navigating.current=true;
      if (reduced) { location.assign(href); return; }
      gsap.to('#root',{opacity:0,duration:.6,ease:'power2.inOut',onComplete:()=>location.assign(href)});
      timers.current.push(window.setTimeout(()=>location.assign(href),700));
    };
    const click = (event:MouseEvent) => {
      if (event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download') || !anchor.href.startsWith(`${portfolioUrl}/`)) return;
      event.preventDefault(); go.current(anchor.href);
    };
    document.addEventListener('click',click);
    window.addEventListener('pageshow',reset);
    return () => { document.removeEventListener('click',click); window.removeEventListener('pageshow',reset); gsap.killTweensOf('#root'); reset(); };
  },[reduced]);

  useEffect(() => {
    let frame=0;
    const update = () => {
      frame=0;
      const maximum=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const value=Math.min(1,Math.max(0,scrollY/maximum));
      if(range.current) { range.current.value=String(Math.round(value*1000)); range.current.setAttribute('aria-valuetext',`${Math.round(value*100)}% of page`); }
      if(progress.current) progress.current.dataset.bottom=String(value>=.999);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',schedule,{passive:true}); window.addEventListener('resize',schedule); update();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[reduced,fine]);

  useEffect(() => {
    if(!fine || reduced || menuOpen) return;
    let accumulated=0, idle=0;
    const draw=()=>document.documentElement.style.setProperty('--continue-progress',String(accumulated/6000));
    const reset=()=>{accumulated=0;draw();};
    const wheel=(event:WheelEvent)=>{
      if ((event.target as Element).closest('input,textarea,select,dialog')) return;
      const bottom=scrollY>=document.documentElement.scrollHeight-innerHeight-3;
      accumulated=continuationProgress(accumulated,wheelPixels(event.deltaY,event.deltaMode,innerHeight),bottom);
      draw();clearTimeout(idle);idle=window.setTimeout(reset,800);
      if(accumulated>=6000)go.current(`${portfolioUrl}/projects`);
    };
    window.addEventListener('wheel',wheel,{passive:true});
    return()=>{window.removeEventListener('wheel',wheel);clearTimeout(idle);reset();};
  },[fine,reduced,menuOpen]);

  useEffect(()=>{
    if(!fine || reduced || menuOpen || !trail.current) return;
    const dots=[...trail.current.children] as HTMLElement[];
    const points=dots.map(()=>({x:0,y:0}));let mouse={x:0,y:0},frame=0,active=false;
    const animate=()=>{
      let target=mouse, remaining=0;
      dots.forEach((dot,i)=>{const p=points[i];p.x+=(target.x-p.x)*.45;p.y+=(target.y-p.y)*.45;remaining+=Math.abs(target.x-p.x)+Math.abs(target.y-p.y);dot.style.transform=`translate3d(${p.x}px,${p.y}px,0) scale(${(dots.length-i)/dots.length})`;target=p;});
      frame=remaining>.2?requestAnimationFrame(animate):0;
    };
    const move=(e:PointerEvent)=>{mouse={x:e.clientX,y:e.clientY};if(!active){points.forEach(p=>Object.assign(p,mouse));active=true;trail.current!.style.opacity='1';}if(!frame)frame=requestAnimationFrame(animate);};
    const leave=()=>{active=false;if(trail.current)trail.current.style.opacity='0';};
    window.addEventListener('pointermove',move);document.documentElement.addEventListener('pointerleave',leave);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave);leave();};
  },[fine,reduced,menuOpen]);

  return <>
    <div className="page-progress" ref={progress} hidden={menuOpen}><a href="#contact" onClick={e=>{e.preventDefault();scrollToSection('contact');}}>Skip <span>→</span><span className="sr-only"> to contact</span></a><input ref={range} aria-label="Page progress" type="range" min="0" max="1000" defaultValue="0" onChange={e=>{const top=Number(e.target.value)/1000*(document.documentElement.scrollHeight-innerHeight);const smoother=ScrollSmoother.get();if(smoother)smoother.scrollTo(top,false);else window.scrollTo({top,behavior:'instant'});}} /></div>
    {fine&&!reduced&&!menuOpen&&<div ref={trail} className="pointer-trail" aria-hidden="true">{Array.from({length:20},(_,i)=><i key={i}/>)}</div>}
  </>;
}
