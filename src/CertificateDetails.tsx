import { certificates } from "./certificates";
import type { Certification } from "./certificates";
import { portfolioUrl } from "./content";
import { scrollToSection } from "./motion";
import "./certificate-details.css";

export function CertificateDetails() {
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
        <p className="cert-eyebrow">[ THE CERTIFICATE COLLECTION ]</p>
      </header>
      <CertificateSection certificate={certificates[0]} index={0} />
    </div>
  );
}

function CertificateSection({
  certificate,
  index,
}: {
  certificate: Certification;
  index: number;
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
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("certificate-index", true, 120);
          }}
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
    </section>
  );
}
