import { useEffect } from "react";
import { projects } from "./content";
import { scrollToSection } from "./motion";
import { portfolioUrl } from "./content";
import type { Project } from "./content";
import { projectStudies } from "./project-studies";
import type { ProjectStudy } from "./project-studies";
import "./project-details.css";

export function ProjectDetails() {
  useEffect(() => {
    document.title = "Selected Projects — Rey Jane Andrada";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Explore six projects by Rey Jane Andrada: computer vision games, marketplaces, public services, student tools, and event systems.",
      );
  }, []);
  return (
    <div className="project-details">
      <header className="details-intro">
        <p className="details-note">
          A closer look at the ideas, systems, and work behind each project.
        </p>
        <div className="details-title-row">
          <h1>Selected projects</h1>
          <nav aria-label="Jump to project" className="details-jumps">
            {projects.map((project, index) => (
              <a
                key={project.slug}
                href={`#${project.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  if (location.hash !== `#${project.slug}`)
                    history.pushState(null, "", `#${project.slug}`);
                  scrollToSection(project.slug, true, 120);
                }}
                title={project.title}
              >
                Project {index + 1}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {projects.map((project, index) => (
        <CaseStudy
          key={project.slug}
          project={project}
          study={projectStudies[project.slug]}
          index={index}
        />
      ))}
    </div>
  );
}

function CaseStudy({
  project,
  study,
  index,
}: {
  project: Project;
  study: ProjectStudy;
  index: number;
}) {
  return (
    <section
      id={project.slug}
      className="case-study"
      tabIndex={-1}
      aria-labelledby={`${project.slug}-title`}
    >
      <p className="detail-number">Project {index + 1}</p>
      <div className="case-columns">
        <div className="case-copy">
          <aside
            className="case-stack"
            aria-label={`${project.title} development details`}
          >
            <h3>
              Development
              <br />
              Stack
            </h3>
            <div className="case-stack-group">
              <h4>Tools</h4>
              <ul>
                {study.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
            <div className="case-stack-group">
              <h4>My role</h4>
              <p>{study.role}</p>
            </div>
            <div className="case-stack-group">
              <h4>Team</h4>
              <p>{study.team}</p>
            </div>
          </aside>
          <div className="case-story">
            <h3>The Project</h3>
            {study.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h3>About Project</h3>
            <p>{study.about}</p>
            <div className="case-links">
              <a href={`${portfolioUrl}/projects/${project.slug}`}>
                Full case study ↗
              </a>
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noreferrer">
                  View live ↗
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="case-visuals">
          <div className="case-meta">
            <h2 id={`${project.slug}-title`}>{project.title}</h2>
            <p>{study.type}</p>
            <p>{study.team}</p>
            <p>{study.timeline}</p>
          </div>
          <figure className="case-media">
            <figcaption>media_01</figcaption>
            <img
              src={`/assets/projects/${project.image}-detail-1920.webp`}
              srcSet={`/assets/projects/${project.image}-card-800.webp 800w, /assets/projects/${project.image}-detail-1920.webp 1920w`}
              sizes="(max-width:720px) 92vw, 67vw"
              alt={`${project.title} project overview`}
              width="1920"
              height="1080"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
