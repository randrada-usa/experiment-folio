import { useEffect, useRef } from "react";
import { email, portfolioUrl, socialLinks } from "./content";
import { InquiryForm } from "./Inquiry";
import { gsap, ScrollSmoother, scrollToSection, useMotion } from "./motion";
import "./menu.css";
import { Logo } from "./Logo";

export function Menu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const afterClose = useRef<(() => void) | undefined>(undefined);
  const closeHandler = useRef(onClose);
  closeHandler.current = onClose;
  const motion = useMotion();
  const reduced = useRef(motion.reduced);
  reduced.current = motion.reduced;

  useEffect(() => {
    if (!open || !dialog.current || !panel.current) return;
    const element = dialog.current;
    const sheet = panel.current;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    closing.current = false;
    ScrollSmoother.get()?.paused(true);
    document.documentElement.style.overflow = "hidden";
    element.showModal();
    element.scrollTop = 0;
    gsap.fromTo(
      sheet,
      { y: reduced.current ? 0 : innerHeight / 2 },
      { y: 0, duration: reduced.current ? 0 : 0.4, ease: "power3.out" },
    );
    gsap.fromTo(
      element,
      { "--shade": 0 },
      { "--shade": 0.65, duration: reduced.current ? 0 : 0.2 },
    );
    return () => {
      gsap.killTweensOf([sheet, element]);
      element.close();
      document.documentElement.style.overflow = previousOverflow;
      ScrollSmoother.get()?.paused(false);
      opener?.focus({ preventScroll: true });
      const next = afterClose.current;
      afterClose.current = undefined;
      if (next) requestAnimationFrame(next);
    };
  }, [open]);

  const close = (next?: () => void) => {
    if (closing.current) return;
    closing.current = true;
    afterClose.current = next;
    gsap.to(dialog.current, {
      "--shade": 0,
      duration: motion.reduced ? 0 : 0.2,
    });
    const exitDistance =
      innerHeight - (panel.current?.getBoundingClientRect().top ?? 0);
    gsap.to(panel.current, {
      y: exitDistance,
      duration: motion.reduced ? 0 : 0.3,
      ease: "power2.in",
      onComplete: () => closeHandler.current(),
    });
  };

  return (
    <dialog
      ref={dialog}
      id="navigation-menu"
      className="menu-dialog"
      aria-labelledby="menu-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const controls = [
          ...e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button, input, textarea, select, summary, [tabindex="0"]',
          ),
        ].filter(
          (control) =>
            !control.hasAttribute("disabled") &&
            control.getClientRects().length > 0,
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (!panel.current?.contains(e.target as Node)) close();
      }}
    >
      <div className="menu-stage">
        <div className="menu-panel" ref={panel}>
          <div className="menu-top">
            <h2 id="menu-title">
              <Logo />
              <span>
                Rey Andrada
                <br />
                [Developer]
              </span>
              <span className="sr-only"> — navigation menu</span>
            </h2>
            <button
              type="button"
              className="menu-close"
              onClick={() => close()}
              autoFocus
            >
              Close ×
            </button>
          </div>
          <div className="menu-intro">
            <p>Practical ideas. Thoughtful systems.</p>
            <p>
              I’m Rey, a developer in Iloilo building reliable backends and
              applications that solve real problems. Have a project or
              opportunity in mind? Let’s talk.
            </p>
            <p>
              Say <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
          <nav className="menu-links" aria-label="Menu navigation">
            <div>
              {["About", "Projects", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    close(() => scrollToSection(label.toLowerCase()));
                  }}
                >
                  {label}
                  <span>↗</span>
                </a>
              ))}
              <a href={`${portfolioUrl}/cv`}>
                Curriculum vitae<span>↗</span>
              </a>
              <a href={`${portfolioUrl}/certifications`}>
                Certifications<span>↗</span>
              </a>
            </div>
            <div>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </nav>
          <div className="menu-preferences">
            <label>
              <input
                type="checkbox"
                checked={motion.reduced}
                disabled={motion.systemReduced}
                onChange={(e) =>
                  motion.setMotionPreference(
                    e.target.checked ? "reduced" : "system",
                  )
                }
              />{" "}
              Reduce motion
            </label>
            <p>
              {motion.systemReduced
                ? "Following your device’s reduced-motion setting."
                : "Use a static layout, native scrolling, and no decorative motion."}
            </p>
          </div>
          <InquiryForm instance="menu" />
          <p className="menu-credit">Designed & built by Rey Andrada · 2026</p>
        </div>
      </div>
    </dialog>
  );
}
