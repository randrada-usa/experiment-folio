import { useRef } from "react";
import { socialLinks } from "./content";
import { featuredCertificates } from "./certificates";
import { gsap, ScrollTrigger, useGSAP, useMotion } from "./motion";
import "./contact.css";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".contact-heading span", {
        yPercent: -110,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width:1080px)", () => {
        ScrollTrigger.create({
          id: "contact-pin",
          trigger: ".contact-intro",
          start: "top 8%",
          endTrigger: ".certificate-collection",
          end: "bottom 80%",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      className="contact section"
      id="contact"
      ref={root}
      tabIndex={-1}
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="contact-heading">
        <span>Certificates</span>
      </h2>
      <div className="contact-intro">
        <div className="contact-name">
          Rey Jane
          <br />
          Andrada<span>Backend-focused developer.</span>
        </div>
        <p className="contact-copy">
          Learning is part of how I build. These certificates trace my work
          across data, development, and AI—{" "}
          <span className="accent">a foundation I keep growing.</span> Explore
          ten highlights here, or browse the full collection.
        </p>
        <ul className="social-list">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a href={s.href}>
                {s.label === "Email" ? "rayalejaga12@gmail.com" : s.label}
                <span>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="certificate-collection" id="certificates" tabIndex={-1}>
        <p className="certificate-count">[ 10 SELECTED CERTIFICATES ]</p>
        <ul className="certificate-grid">
          {featuredCertificates.map((certificate) => (
            <li key={certificate.slug}>
              <a
                className="certificate-card"
                href={`/certifications/#${certificate.slug}`}
              >
                <div className="certificate-image">
                  <img
                    src={certificate.image}
                    width={certificate.width}
                    height={certificate.height}
                    alt={`${certificate.title} certificate`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <h3>
                  {certificate.title}
                  <span aria-hidden="true">↗</span>
                </h3>
              </a>
            </li>
          ))}
        </ul>
        <a className="outline-link certificate-all" href="/certifications/">
          View all certs <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
