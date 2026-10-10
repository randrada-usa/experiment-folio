import { useRef } from 'react';
import { socialLinks } from './content';
import { InquiryForm } from './Inquiry';
import { gsap, ScrollTrigger, useGSAP, useMotion } from './motion';
import './contact.css';

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  useGSAP(()=>{
    if (reduced) return;
    gsap.from('.contact-heading span', {yPercent:-110,duration:.6,stagger:.05,ease:'power3.out',scrollTrigger:{trigger:'.contact-heading',start:'top 90%',toggleActions:'play none none reverse'}});
    const mm=gsap.matchMedia();
    mm.add('(min-width:1080px)',()=>{
      ScrollTrigger.create({id:'contact-pin',trigger:'.contact-intro',start:'top 8%',endTrigger:'.contact .inquiry-form',end:'bottom 80%',pin:true,pinSpacing:false,invalidateOnRefresh:true});
    });
    return ()=>mm.revert();
  },{scope:root,dependencies:[reduced],revertOnUpdate:true});
  return <section className="contact section" id="contact" ref={root} tabIndex={-1} aria-labelledby="contact-heading">
    <h2 id="contact-heading" className="contact-heading"><span>Get</span>{' '}<span>in</span>{' '}<span>touch.</span></h2>
    <div className="contact-intro"><div className="contact-name">Rey Jane<br />Andrada<span>Backend-focused developer.</span></div><p className="contact-copy">Have a project, an opportunity, or an idea worth exploring? <span className="accent">I’d love to hear about it.</span> Find me on the links below or start a conversation here.</p><ul className="social-list">{socialLinks.map(s=><li key={s.label}><a href={s.href}>{s.label==='Email'?'rayalejaga12@gmail.com':s.label}<span>↗</span></a></li>)}</ul></div>
    <InquiryForm instance="contact"/>
  </section>;
}
