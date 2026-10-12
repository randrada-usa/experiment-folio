import { useRef } from "react";
import { gsap, scrollToSection, useGSAP, useMotion } from "./motion";
import "./hero.css";
import { Logo } from "./Logo";
import { bindPointerPerspective } from "./pointer-perspective";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { reduced, perspective, fine } = useMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(".hero-small-nav", {
        y: -60,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-emblem", {
        y: -40,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-titlebar", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      if (reduced || !fine || perspective !== "on") return;
      const section = root.current!;
      return bindPointerPerspective(section, [
        {
          element: section.querySelector<HTMLElement>(".hero-art")!,
          travel: 14,
          tilt: 1.4,
        },
        {
          element: section.querySelector<HTMLElement>(".hero-left")!,
          travel: 28,
          tilt: 2.8,
        },
        {
          element: section.querySelector<HTMLElement>(".hero-right")!,
          travel: 28,
          tilt: 0.7,
        },
      ]);
    },
    {
      scope: root,
      dependencies: [reduced, fine, perspective],
      revertOnUpdate: true,
    },
  );
  return (
    <section
      className="hero section"
      ref={root}
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-heading"
    >
      <h1 className="sr-only" id="hero-heading">
        Rey Jane Andrada — Backend-Focused Developer &amp; Aspiring Data
        Engineer
      </h1>
      <div className="ambient-lines" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="hero-upper">
        <nav className="hero-small-nav" aria-label="Main navigation">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact
          </a>
        </nav>
        <span className="hero-emblem" aria-hidden="true">
          ✳
        </span>
        <p className="hero-location">
          ILOILO CITY, PH
          <br />
          <span>10°43′ N · 122°34′ E</span>
        </p>
      </div>
      <div className="hero-titlebar">
        <p>
          Reliable systems.
          <br className="phone-break" /> Practical applications.
        </p>
        <Logo className="hero-wordmark" />
      </div>
      <div className="hero-art corner-frame">
        <svg
          className="lightning"
          viewBox="0 0 1400 650"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-50 380 70 330 114 365 220 240 192 207 345 124 415 160 525 55M-10 606 195 505 270 520 390 412 482 426 550 326 636 345 748 200 854 224 917 127 970 148 1180 10M818 680 900 518 991 557 1060 440 1170 470 1211 330 1328 234 1450 250" />
        </svg>
        <div className="hero-side hero-left">
          <a
            className="side-art side-art-game"
            href="https://www.devbyrey.me/projects/wave-and-wish"
            aria-label="Explore Wave and Wish"
          >
            <span className="art-index">01 / PLAY IN MOTION</span>
            <img
              src="/assets/projects/wave-and-wish-card-480.webp"
              alt="Wave and Wish gesture-controlled game"
              width="480"
              height="270"
            />
            <span className="art-code">
              [ HANDS → INPUT ]<br />
              REAL-WORLD EXPERIENCES
            </span>
          </a>
          <p>
            I build the parts <br />
            that keep everything <br />
            <span className="accent">else reliable.</span>
          </p>
        </div>
        <div className="portrait-art">
          <div className="portrait-cross" aria-hidden="true" />
          <span className="portrait-topline">
            REY JANE ANDRADA <span>© 2026</span>
          </span>
          <span className="portrait-background-type" aria-hidden="true">
            BUILD
            <br />
            WITH
            <br />
            PURPOSE.
          </span>
          <img
            className="hero-portrait"
            src="/assets/photos/hero-768.webp"
            srcSet="/assets/photos/hero-480.webp 480w, /assets/photos/hero-768.webp 768w, /assets/photos/hero-1024.webp 1024w"
            sizes="(max-width:640px) 92vw, 44vw"
            width="768"
            height="876"
            fetchPriority="high"
            alt="Rey Jane Andrada holding a laptop"
          />
          <span className="portrait-stamp">
            BACKEND / DATA /<br />A WORK IN PROGRESS ↗
          </span>
        </div>
        <div className="hero-side hero-right">
          <a
            className="side-art side-art-web"
            href="https://www.devbyrey.me/projects/iloilo-farmers-hub"
            aria-label="Explore Iloilo Farmers Hub"
          >
            <span className="art-index">02 / SYSTEMS THAT CONNECT</span>
            <span className="art-symbol" aria-hidden="true">
              ↗
            </span>
            <img
              src="/assets/projects/IFC-v3-card-480.webp"
              alt="Iloilo Farmers Hub marketplace interface"
              width="480"
              height="270"
            />
            <span className="art-code">
              LOCAL ROOTS.
              <br />
              CONNECTED POSSIBILITIES.
            </span>
          </a>
          <p>
            Backend-focused developer. <br />
            Always learning toward <br />
            <span className="accent">data engineering.</span>
          </p>
        </div>
      </div>
      <div className="ticker" aria-label="Explore the portfolio">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <div className="ticker-group" key={i} aria-hidden={i === 1}>
              {[
                ["SELECTED WORK", "https://www.devbyrey.me/projects"],
                ["A LITTLE ABOUT ME", "https://www.devbyrey.me/#about"],
                ["VIEW MY CV", "https://www.devbyrey.me/cv"],
                ["LET’S TALK", "mailto:rayalejaga12@gmail.com"],
              ].map(([label, href]) => (
                <a key={label} href={href} tabIndex={i === 1 ? -1 : undefined}>
                  {label} <span>↗</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
