import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  certificates,
  certificationCategories,
  certificateFilters,
  filterCertificates,
} from "./certificates";
import type { Certification } from "./certificates";
import { portfolioUrl } from "./content";
import { ScrollTrigger, scrollToSection } from "./motion";
import "./certificate-details.css";

export function CertificateDetails() {
  const [filters, setFilters] = useState(() => {
    const initial = certificateFilters(location.search);
    const slug = location.hash.slice(1);
    if (
      certificates.some((item) => item.slug === slug) &&
      !filterCertificates(initial.query, initial.category).some(
        (item) => item.slug === slug,
      )
    ) {
      return { query: "", category: "All" };
    }
    return initial;
  });
  const [pendingJump, setPendingJump] = useState<{
    slug: string;
    smooth: boolean;
  } | null>(() =>
    location.hash ? { slug: location.hash.slice(1), smooth: false } : null,
  );
  const search = useRef<HTMLInputElement>(null);
  const results = filterCertificates(filters.query, filters.category);

  useEffect(() => {
    const followLocation = () => {
      let next = certificateFilters(location.search);
      const slug = location.hash.slice(1);
      if (
        certificates.some((item) => item.slug === slug) &&
        !filterCertificates(next.query, next.category).some(
          (item) => item.slug === slug,
        )
      ) {
        next = { query: "", category: "All" };
        const url = new URL(location.href);
        url.searchParams.delete("q");
        url.searchParams.delete("category");
        history.replaceState(null, "", url);
      }
      setFilters(next);
      setPendingJump({ slug: slug || "certificate-index", smooth: false });
    };
    window.addEventListener("popstate", followLocation);
    window.addEventListener("hashchange", followLocation);
    followLocation();
    return () => {
      window.removeEventListener("popstate", followLocation);
      window.removeEventListener("hashchange", followLocation);
    };
  }, []);

  useEffect(() => {
    let live = true;
    let frame = 0;
    document.fonts.ready.then(() => {
      if (!live) return;
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (pendingJump) {
          scrollToSection(pendingJump.slug, pendingJump.smooth, 120);
        }
      });
    });
    return () => {
      live = false;
      cancelAnimationFrame(frame);
    };
  }, [filters, pendingJump]);

  const updateFilters = (next: typeof filters) => {
    setFilters(next);
    setPendingJump(null);
    const url = new URL(location.href);
    if (next.query) url.searchParams.set("q", next.query);
    else url.searchParams.delete("q");
    if (next.category !== "All")
      url.searchParams.set("category", next.category);
    else url.searchParams.delete("category");
    url.hash = "";
    history.replaceState(null, "", url);
  };
  const jump = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    const url = new URL(location.href);
    if (
      slug !== "certificate-index" &&
      !results.some((item) => item.slug === slug)
    ) {
      setFilters({ query: "", category: "All" });
      url.searchParams.delete("q");
      url.searchParams.delete("category");
    }
    url.hash = slug;
    if (url.href !== location.href) history.pushState(null, "", url);
    setPendingJump({ slug, smooth: true });
  };
  return (
    <div className="certificate-details">
      <header className="cert-intro" id="certificate-index" tabIndex={-1}>
        <a className="cert-back" href="/#certificates">
          ← Back to portfolio
        </a>
        <div className="cert-title-row">
          <h1>
            Always
            <br />
            <em>learning.</em>
          </h1>
          <p>
            Certificates, courses and experiences that shape how I build. A
            growing collection across data, AI and development.
          </p>
        </div>
        <p className="cert-eyebrow">
          [ {certificates.length} CERTIFICATES /{" "}
          {certificationCategories.length} AREAS OF LEARNING ]
        </p>
      </header>
      <section className="cert-browser" aria-label="Find a certificate">
        <div className="cert-search-row">
          <label className="cert-search-label" htmlFor="certificate-search">
            Find a certificate
          </label>
          <div className="cert-search-field">
            <span aria-hidden="true">⌕</span>
            <input
              ref={search}
              id="certificate-search"
              type="search"
              value={filters.query}
              placeholder="Search title, issuer or topic…"
              onChange={(event) =>
                updateFilters({ ...filters, query: event.target.value })
              }
              aria-controls="certificate-results"
            />
          </div>
        </div>
        <div
          className="cert-filters"
          role="group"
          aria-label="Filter by category"
        >
          {["All", ...certificationCategories].map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filters.category === category}
              onClick={() => updateFilters({ ...filters, category })}
            >
              {category}
              <span>
                {category === "All"
                  ? certificates.length
                  : certificates.filter((item) => item.category === category)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <div className="cert-result-summary">
          <p role="status" aria-live="polite" aria-atomic="true">
            {results.length} of {certificates.length} certificates
            {filters.category !== "All" ? ` · ${filters.category}` : ""}
          </p>
          <button
            type="button"
            disabled={!filters.query && filters.category === "All"}
            onClick={() => {
              updateFilters({ query: "", category: "All" });
              search.current?.focus({ preventScroll: true });
            }}
          >
            Reset filters ↺
          </button>
        </div>
        <nav
          id="certificate-results"
          className="cert-index-grid"
          aria-label="Certificate results"
        >
          {results.map((certificate) => (
            <a
              key={certificate.slug}
              href={`#${certificate.slug}`}
              onClick={(event) => jump(event, certificate.slug)}
            >
              <span className="cert-index-number">
                {String(certificates.indexOf(certificate) + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{certificate.title}</strong>
                <small>{certificate.issuer}</small>
              </span>
              <span className="cert-index-arrow" aria-hidden="true">
                ↘
              </span>
            </a>
          ))}
        </nav>
        {results.length === 0 && (
          <div className="cert-empty">
            <h2>No certificates found.</h2>
            <p>
              Try another title, issuer or topic, or reset the filters to
              explore the full collection.
            </p>
          </div>
        )}
      </section>
      <div className="cert-detail-list">
        {results.map((certificate) => (
          <CertificateSection
            key={certificate.slug}
            certificate={certificate}
            index={certificates.indexOf(certificate)}
            onJump={jump}
          />
        ))}
      </div>
    </div>
  );
}

function CertificateSection({
  certificate,
  index,
  onJump,
}: {
  certificate: Certification;
  index: number;
  onJump: (event: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) {
  return (
    <section
      className="cert-detail"
      id={certificate.slug}
      tabIndex={-1}
      aria-labelledby={`${certificate.slug}-title`}
    >
      <div className="cert-section-top">
        <span className="cert-eyebrow">
          [ {String(index + 1).padStart(2, "0")} / {certificate.category} ]
        </span>
        <a
          href="#certificate-index"
          onClick={(event) => onJump(event, "certificate-index")}
        >
          Back to index ↑
        </a>
      </div>
      <div className="cert-detail-heading">
        <div>
          <h2 id={`${certificate.slug}-title`}>{certificate.title}</h2>
          <p className="cert-description">{certificate.description}</p>
        </div>
        <dl className="cert-meta">
          <div>
            <dt>Issuer</dt>
            <dd>{certificate.issuer}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{certificate.category}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{certificate.year}</dd>
          </div>
        </dl>
      </div>
      <figure className="cert-document">
        <img
          src={certificate.image}
          width={certificate.width}
          height={certificate.height}
          alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <figcaption>
          <span>
            {certificate.issuer} · {certificate.year}
          </span>
          <a
            href={`${portfolioUrl}/certifications/${certificate.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            Original portfolio entry ↗
          </a>
        </figcaption>
      </figure>
      <nav
        className="cert-related"
        aria-label={`Related to ${certificate.title}`}
      >
        <p>Keep exploring</p>
        {certificates
          .filter(
            (item) =>
              item.category === certificate.category &&
              item.slug !== certificate.slug,
          )
          .slice(0, 2)
          .map((item) => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              onClick={(event) => onJump(event, item.slug)}
            >
              {item.title}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
      </nav>
    </section>
  );
}
