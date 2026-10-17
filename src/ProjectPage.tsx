import { useEffect } from "react";
import { projects } from "./content";
import { getProjectSlug } from "./pages";
import { projectStudies } from "./project-studies";
import { projectCaseContent } from "./project-case-content";
import { scrollToSection } from "./motion";
import "./standalone-pages.css";

export function ProjectPage() {
  const project = projects.find(
    (item) => item.slug === getProjectSlug(location.pathname),
  );
  useEffect(() => {
    document.title = `${project?.title ?? "Project not found"} — Rey Jane Andrada`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        project?.summary ?? "Explore projects by Rey Jane Andrada.",
      );
  }, [project]);
  if (!project)
    return (
      <div className="standalone-page">
        <h1>Project not found.</h1>
        <a href="/projects/">Back to all projects →</a>
      </div>
    );

  const study = projectStudies[project.slug];
  const content = projectCaseContent[project.slug];
  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);
  const privateNotice = ["wave-and-wish", "praise-and-pray"].includes(
    project.slug,
  )
    ? "Private commission. The source code and playable game are not publicly available."
    : project.slug === "duely"
      ? "Active Android beta. The source repository is private, and no public beta download is available yet."
      : project.slug === "icslink"
        ? "The source repository is private. The deployed platform is available through View live."
        : undefined;

  return (
    <article className="standalone-page project-page">
      <a className="standalone-back" href={`/projects/#${project.slug}`}>
        ← Back to all projects
      </a>
      <header className="standalone-hero">
        <p className="eyebrow">
          {study.type} / {study.team}
        </p>
        <h1>{project.title}</h1>
        <div className="standalone-intro">
          <p>{project.summary}</p>
          <div className="standalone-actions">
            <a
              href="#case-study"
              onClick={(event) => {
                event.preventDefault();
                history.pushState(null, "", "#case-study");
                scrollToSection("case-study", true, 120);
              }}
            >
              Read case study ↓
            </a>
            {study.liveUrl && (
              <a href={study.liveUrl} target="_blank" rel="noreferrer">
                View live ↗
              </a>
            )}
          </div>
        </div>
        {privateNotice && (
          <p className="project-availability">{privateNotice}</p>
        )}
        <dl className="standalone-meta">
          <div>
            <dt>My role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{study.timeline}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{study.tools.join(" · ")}</dd>
          </div>
        </dl>
      </header>
      <figure className="project-page-media">
        <figcaption>01 / Project overview</figcaption>
        <img
          src={`/assets/projects/${project.image}-detail-1920.webp`}
          srcSet={`/assets/projects/${project.image}-card-800.webp 800w, /assets/projects/${project.image}-detail-1920.webp 1920w`}
          sizes="92vw"
          width="1920"
          height="1080"
          alt={`${project.title} project overview`}
          fetchPriority="high"
        />
      </figure>
      <section
        id="case-study"
        className="project-full-story"
        tabIndex={-1}
        aria-labelledby="case-study-title"
      >
        <h2 id="case-study-title">
          Behind
          <br />
          <em>the build.</em>
        </h2>
        <div>
          <section className="project-story-block">
            <p className="eyebrow">01 / CONTEXT</p>
            <h3>The challenge</h3>
            <p>{content.challenge}</p>
          </section>
          <section className="project-story-block">
            <p className="eyebrow">02 / PROCESS</p>
            <h3>Technical approach</h3>
            <ol>
              {content.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section className="project-story-block">
            <p className="eyebrow">03 / OUTCOMES</p>
            <h3>Results</h3>
            <ul className="project-results">
              {content.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="project-results-note">
              Results reflect the documented project and evaluation at the time
              of this case study.
            </p>
          </section>
        </div>
      </section>
      <nav className="project-related" aria-label="More projects">
        <div className="standalone-section-title">
          <h2>Keep exploring</h2>
          <a href="/projects/">All projects ↗</a>
        </div>
        {related.map((item, index) => (
          <a
            className="project-related-link"
            href={`/projects/${item.slug}/`}
            key={item.slug}
          >
            <span>0{index + 1}</span>
            <span>
              {item.title}
              <small>{item.category}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </article>
  );
}
