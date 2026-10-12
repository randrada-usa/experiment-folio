import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
export { gsap, ScrollTrigger, ScrollSmoother, useGSAP };

export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener("change", update);
    update();
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function saved(key: string, fallback: string) {
  try {
    return localStorage.getItem(`rj-showcase:${key}`) ?? fallback;
  } catch {
    return fallback;
  }
}

function usePreference(key: string, initial: string) {
  const [value, setValue] = useState(() => saved(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(`rj-showcase:${key}`, value);
    } catch {
      /* Storage is optional. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

const MotionContext = createContext<ReturnType<typeof useSettings> | null>(
  null,
);
function useSettings() {
  const [theme, setTheme] = usePreference("theme", "red");
  const [perspective, setPerspective] = usePreference("perspective", "on");
  const [smoothing, setSmoothing] = usePreference("smoothing", "on");
  const [hints, setHints] = useState(false);
  const [motionPreference, setMotionPreference] = usePreference(
    "motion",
    "system",
  );
  const systemReduced = useMedia("(prefers-reduced-motion: reduce)");
  const reduced = systemReduced || motionPreference === "reduced";
  const fine = useMedia(
    "(min-width: 769px) and (hover: hover) and (pointer: fine)",
  );
  return {
    theme,
    setTheme,
    perspective,
    setPerspective,
    smoothing,
    setSmoothing,
    hints,
    setHints,
    reduced,
    fine,
    systemReduced,
    motionPreference,
    setMotionPreference,
  };
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const settings = useSettings();
  useEffect(() => {
    document.documentElement.dataset.theme =
      settings.theme === "purple" ? "purple" : "red";
    document.documentElement.dataset.reducedMotion = String(settings.reduced);
  }, [settings.theme, settings.reduced]);
  return (
    <MotionContext.Provider value={settings}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("MotionProvider is required");
  return context;
}

export function SmoothPage({ children }: { children: ReactNode }) {
  const { smoothing, reduced, fine } = useMotion();
  useGSAP(
    () => {
      let smoother: ScrollSmoother | undefined;
      if (fine && !reduced && smoothing === "on") {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1,
          effects: false,
          onFocusIn: (_self, event) => {
            if (
              event.target instanceof HTMLElement &&
              event.target.getAttribute("tabindex") === "-1"
            )
              return false;
          },
        });
        if (document.querySelector("dialog[open]")) smoother.paused(true);
      }
      let live = true;
      document.fonts.ready.then(() => {
        if (live) ScrollTrigger.refresh();
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        live = false;
        window.removeEventListener("load", refresh);
        smoother?.kill();
      };
    },
    { dependencies: [smoothing, reduced, fine], revertOnUpdate: true },
  );
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  // Focus first: ScrollSmoother's focus handler must not override our anchor offset.
  target.focus({ preventScroll: true });
  const smoother = ScrollSmoother.get();
  const top =
    id === "home" || id === "main"
      ? 0
      : Math.max(
          0,
          target.getBoundingClientRect().top +
            (smoother?.scrollTop() ?? window.scrollY) -
            110,
        );
  if (smoother) smoother.scrollTo(top, true);
  else
    window.scrollTo({
      top,
      behavior:
        document.documentElement.dataset.reducedMotion === "true"
          ? "instant"
          : "smooth",
    });
}
