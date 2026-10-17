import type { PageKind } from "./pages";
import { nextPage, pageNavigation } from "./pages";
import { useRef } from "react";
import { Logo } from "./Logo";
import { socialLinks } from "./content";
import { gsap, scrollToSection, useGSAP, useMotion } from "./motion";
import "./footer.css";

function LinkArrow() {
  return (
    <svg
      className="footer-link-arrow"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 10h17M10 2l8 8-8 8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Footer({ page = "home" }: { page?: PageKind }) {
  const innerPage = page !== "home";
  const next = nextPage[page];
  const root = useRef<HTMLElement>(null);
  const { fine, reduced, perspective } = useMotion();
  useGSAP(
    () => {
      if (!fine || reduced || perspective !== "on") return;
      const tiles = gsap.utils.toArray<HTMLElement>(
        ".footer-art",
        root.current,
      );
      const cleanups = tiles.map((tile) => {
        const art = tile.querySelector<HTMLElement>(".tilt-art")!;
        const x = gsap.quickTo(art, "rotationX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const y = gsap.quickTo(art, "rotationY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const move = (e: PointerEvent) => {
          const r = tile.getBoundingClientRect();
          x((-(e.clientY - r.top - r.height / 2) / r.height) * 14);
          y(((e.clientX - r.left - r.width / 2) / r.width) * 14);
        };
        const reset = () => {
          x(0);
          y(0);
        };
        tile.addEventListener("pointermove", move);
        tile.addEventListener("pointerleave", reset);
        return () => {
          tile.removeEventListener("pointermove", move);
          tile.removeEventListener("pointerleave", reset);
          gsap.set(art, { clearProps: "transform" });
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    },
    {
      scope: root,
      dependencies: [fine, reduced, perspective],
      revertOnUpdate: true,
    },
  );
  return (
    <footer className="footer section" ref={root}>
      <div className="footer-intro">
        <p>Rey Andrada © 2026</p>
        <p>
          Curious about what we could build?
          <br />
          Let’s turn a useful idea into something real.
        </p>
      </div>
      <div className="footer-grid">
        <div
          className="footer-art footer-identity"
          role="img"
          aria-label="RJ logo"
        >
          <Logo className="tilt-art" />
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <div>
            <h2>Pages</h2>
            {pageNavigation(page).map(({ label, href, section }) => (
              <a
                key={label}
                href={href}
                onClick={(event) => {
                  if (!section) return;
                  event.preventDefault();
                  scrollToSection(section);
                }}
              >
                {label}
                <LinkArrow />
              </a>
            ))}
          </div>
          <div>
            <h2>Socials</h2>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
                <LinkArrow />
              </a>
            ))}
          </div>
        </nav>
        <a
          className="footer-art footer-arrow"
          href={next.href}
          aria-label={next.description}
        >
          <span className="tilt-art" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
      <a
        className="footer-marquee"
        href={next.href}
        aria-label={next.description}
      >
        <div className="footer-marquee-track" aria-hidden="true">
          {[0, 1].map((i) => (
            <span key={i}>REY ANDRADA / DEVELOPER /&nbsp;</span>
          ))}
        </div>
      </a>
      <div className="footer-utility">
        <a
          href={innerPage ? "#main" : "#home"}
          aria-label="Return to top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(innerPage ? "main" : "home");
          }}
        >
          <Logo />
        </a>
        <p>
          Designed & built by Rey Andrada · 2026
          <br />
          <span>
            Motion study inspired by{" "}
            <a href="https://www.trykala.com/" target="_blank" rel="noreferrer">
              Kala
            </a>
          </span>
        </p>
        <a className="footer-next" href={next.href}>
          {next.footerLabel} <span>→</span>
          <i className="continuation-fill" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
