// First ten entries, in the same order as the existing portfolio collection.
export const featuredCertificates = [
  [
    "Data Analyst Associate",
    "DataCamp",
    "DataCamp Data Analyst Associate Certification-v2.webp",
  ],
  ["SQL Associate", "DataCamp", "DataCamp SQL Associate Certification-v2.webp"],
  [
    "Introduction to Data Engineering",
    "DataCamp",
    "DataCamp Intro to Data Engineering Course-v2.webp",
  ],
  [
    "Introduction to Data Science",
    "Cisco",
    "CISCO Intro to Data Science Course.webp",
  ],
  ["AI Fundamentals", "DataCamp", "DataCamp AI Fundamentals-v2.webp"],
  ["AI Fluency", "Anthropic", "Anthropic AI Fluency.webp"],
  ["Claude 101", "Anthropic", "Anthropic Claude 101.webp"],
  ["Claude Code 101", "Anthropic", "Anthropic Claude Code 101.webp"],
  [
    "Foundations of Prompt Engineering",
    "AWS",
    "AWS Foundations of Prompt Engineering.webp",
  ],
  [
    "Python Developer Associate",
    "DataCamp",
    "DataCamp Python Developer Associate.webp",
  ],
].map(([title, issuer, filename]) => ({
  title,
  issuer,
  image: `/assets/certs/${filename}`,
  slug: title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
}));
