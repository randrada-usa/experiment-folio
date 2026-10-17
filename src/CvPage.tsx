import "./standalone-pages.css";

const cvPdf = "/assets/cv/Rey-Jane-Andrada-CV-2026-08.pdf";

export function CvPage() {
  return (
    <article className="standalone-page cv-page">
      <a className="standalone-back" href="/#about">
        ← Back to about
      </a>
      <header className="standalone-hero">
        <p className="eyebrow">CURRICULUM VITAE / AUGUST 2026</p>
        <h1>
          Experience.
          <br />
          <em>On paper.</em>
        </h1>
        <div className="standalone-intro">
          <p>
            A concise overview of my backend-focused development work,
            leadership experience, and growing data-engineering foundation.
          </p>
          <div className="standalone-actions">
            <a href={cvPdf} download="Rey-Jane-Andrada-CV.pdf">
              Download PDF ↓
            </a>
            <a href={cvPdf} target="_blank" rel="noreferrer">
              Open PDF ↗
            </a>
          </div>
        </div>
        <dl className="standalone-meta">
          <div>
            <dt>Format</dt>
            <dd>PDF</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>One page</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>August 2026</dd>
          </div>
        </dl>
      </header>
      <section className="cv-document" aria-labelledby="cv-preview-title">
        <div className="standalone-section-title">
          <h2 id="cv-preview-title">Document preview</h2>
          <span>01 / 01</span>
        </div>
        <a
          href={cvPdf}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Rey Jane Andrada's CV PDF"
        >
          <img
            src="/assets/cv/rey-jane-andrada-cv-preview-2026-08-v3.webp"
            width="1530"
            height="1980"
            alt="Rey Jane Andrada’s one-page CV: projects, leadership, education, technical skills, and certifications. Open the PDF for readable text."
          />
        </a>
      </section>
    </article>
  );
}
