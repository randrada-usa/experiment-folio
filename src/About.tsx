import { useEffect, useRef } from "react";
import { useMotion } from "./motion";
import { portfolioUrl } from "./content";
import "./about.css";

function Words({ parts }: { parts: Array<[string, boolean?]> }) {
  return (
    <>
      {parts.flatMap(([text, accent], index) =>
        text.split(" ").map((word, i) => (
          <span className="word-wrap" key={`${index}-${i}`}>
            <span className={`reveal-word ${accent ? "accent" : ""}`}>
              {word}
            </span>{" "}
          </span>
        )),
      )}
    </>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  useEffect(() => {
    const section = root.current!;
    const words = [...section.querySelectorAll<HTMLElement>(".reveal-word")];
    if (reduced || !("IntersectionObserver" in window)) {
      section.classList.remove("word-reveal-active");
      return;
    }
    section.classList.add("word-reveal-active");
    words.forEach((word, i) => {
      word.style.transitionDelay = `${(i % 5) * 20}ms`;
    });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.4 },
    );
    words.forEach((word) => observer.observe(word));
    return () => {
      observer.disconnect();
      section.classList.remove("word-reveal-active");
    };
  }, [reduced]);
  return (
    <section
      id="about"
      ref={root}
      className="about section"
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="sr-only">
        A little about me
      </h2>
      <div className="about-statement corner-frame">
        <p>
          <Words
            parts={[
              ["I like building the parts that keep everything else"],
              ["reliable.", true],
              ["I’m a Computer Science student and"],
              ["backend-focused developer", true],
              ["based in the Philippines. My work spans"],
              ["database design,", true],
              ["serverless functions,"],
              ["API integrations,", true],
              ["secure workflows, and real-world interactive systems."],
            ]}
          />
        </p>
        <hr />
        <p>
          <Words
            parts={[
              [
                "I build reliable backend systems and practical applications—then keep learning toward the",
              ],
              ["data platforms", true],
              [
                "behind them. I’m now deepening that foundation as I work toward",
              ],
              ["data engineering.", true],
            ]}
          />
        </p>
      </div>
      <a className="outline-link" href={`${portfolioUrl}/certifications`}>
        View all certs <span>↗</span>
      </a>
    </section>
  );
}
