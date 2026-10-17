// Public certificate records mirrored from the existing portfolio, 2026-10-17.
export type CertificationCategory =
  | "Data & Analytics"
  | "Artificial Intelligence"
  | "Cloud & Development"
  | "Software & Tools"
  | "Hackathons & Events";
export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  category: CertificationCategory;
  image: string;
  year: string;
  description: string;
  width: number;
  height: number;
}
const certificateDimensions: Record<string, { width: number; height: number }> =
  {
    "DataCamp Data Analyst Associate Certification-v2.webp": {
      width: 860,
      height: 495,
    },
    "DataCamp SQL Associate Certification-v2.webp": {
      width: 864,
      height: 495,
    },
    "DataCamp Intro to Data Engineering Course-v2.webp": {
      width: 858,
      height: 493,
    },
    "CISCO Intro to Data Science Course.webp": {
      width: 1200,
      height: 900,
    },
    "DataCamp AI Fundamentals-v2.webp": {
      width: 862,
      height: 495,
    },
    "Anthropic AI Fluency.webp": {
      width: 1200,
      height: 900,
    },
    "Anthropic Claude 101.webp": {
      width: 1200,
      height: 900,
    },
    "Anthropic Claude Code 101.webp": {
      width: 1200,
      height: 900,
    },
    "AWS Foundations of Prompt Engineering.webp": {
      width: 1200,
      height: 900,
    },
    "DataCamp Python Developer Associate.webp": {
      width: 2197,
      height: 1261,
    },
    "AI on the Cloud_ Training Models Without a GPU using AWS and Google Cloud_certificate.webp":
      {
        width: 2000,
        height: 1414,
      },
    "CISCO Python Essentials 1.webp": {
      width: 1200,
      height: 900,
    },
    "CISCO Networking Basics.webp": {
      width: 1317,
      height: 1017,
    },
    "CISCO Introduction to Cybersecurity.webp": {
      width: 1582,
      height: 1222,
    },
    "Containerization and Virtualization with Docker and Kubernetes-v2.webp": {
      width: 858,
      height: 493,
    },
    "GitHub Foundations Certification.webp": {
      width: 1176,
      height: 859,
    },
    "A.IGNITE.webp": {
      width: 1200,
      height: 900,
    },
    "AWS Community Day Philippines 2026.webp": {
      width: 1711,
      height: 1210,
    },
    "Thanks I Hate It.webp": {
      width: 1432,
      height: 1072,
    },
    "AIFEST.webp": {
      width: 1200,
      height: 900,
    },
    "Chain of Thought.webp": {
      width: 1200,
      height: 900,
    },
    "SIKAPTALA National Hackathon.webp": {
      width: 1200,
      height: 900,
    },
    "Ready, Spark, Charge 2026 Hackathon.webp": {
      width: 1200,
      height: 900,
    },
    "AI Hackathon Workshop 1.webp": {
      width: 1200,
      height: 900,
    },
    "AI Hackathon Workshop 2.webp": {
      width: 1200,
      height: 900,
    },
    "UIUX.webp": {
      width: 1200,
      height: 900,
    },
    "GDSC.webp": {
      width: 1200,
      height: 900,
    },
  };

const cert = (
  title: string,
  issuer: string,
  category: CertificationCategory,
  filename: string,
  description: string,
  year = "2026",
): Certification => ({
  slug: title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  title,
  issuer,
  category,
  image: `/assets/certs/${filename}`,
  ...certificateDimensions[filename],
  year,
  description,
});

export const certificates: Certification[] = [
  cert(
    "Data Analyst Associate",
    "DataCamp",
    "Data & Analytics",
    "DataCamp Data Analyst Associate Certification-v2.webp",
    "Associate-level validation of practical data analysis skills.",
  ),
  cert(
    "SQL Associate",
    "DataCamp",
    "Data & Analytics",
    "DataCamp SQL Associate Certification-v2.webp",
    "Associate-level validation of SQL querying and data analysis.",
  ),
  cert(
    "Introduction to Data Engineering",
    "DataCamp",
    "Data & Analytics",
    "DataCamp Intro to Data Engineering Course-v2.webp",
    "Foundations of data engineering systems, workflows, and responsibilities.",
  ),
  cert(
    "Introduction to Data Science",
    "Cisco",
    "Data & Analytics",
    "CISCO Intro to Data Science Course.webp",
    "An introduction to the data science lifecycle and real-world applications.",
  ),
  cert(
    "AI Fundamentals",
    "DataCamp",
    "Artificial Intelligence",
    "DataCamp AI Fundamentals-v2.webp",
    "Credential covering essential artificial-intelligence concepts and applications.",
  ),
  cert(
    "AI Fluency",
    "Anthropic",
    "Artificial Intelligence",
    "Anthropic AI Fluency.webp",
    "Practical foundations for working effectively and responsibly with AI.",
  ),
  cert(
    "Claude 101",
    "Anthropic",
    "Artificial Intelligence",
    "Anthropic Claude 101.webp",
    "Foundational use of Claude for structured knowledge work.",
  ),
  cert(
    "Claude Code 101",
    "Anthropic",
    "Artificial Intelligence",
    "Anthropic Claude Code 101.webp",
    "Agentic coding workflows with Claude Code.",
  ),
  cert(
    "Foundations of Prompt Engineering",
    "AWS",
    "Cloud & Development",
    "AWS Foundations of Prompt Engineering.webp",
    "Prompt-engineering foundations for generative AI applications.",
  ),
  cert(
    "Python Developer Associate",
    "DataCamp",
    "Cloud & Development",
    "DataCamp Python Developer Associate.webp",
    "Associate-level certification in Python software development.",
  ),
  cert(
    "AI on the Cloud",
    "AWS & Google Cloud",
    "Cloud & Development",
    "AI on the Cloud_ Training Models Without a GPU using AWS and Google Cloud_certificate.webp",
    "Training AI models with managed cloud resources rather than local GPUs.",
  ),
  cert(
    "Python Essentials 1",
    "Cisco",
    "Cloud & Development",
    "CISCO Python Essentials 1.webp",
    "Core Python syntax, control flow, data structures, and functions.",
  ),
  cert(
    "Networking Basics",
    "Cisco Networking Academy",
    "Cloud & Development",
    "CISCO Networking Basics.webp",
    "Foundations of network communication, protocols, Ethernet, IP addressing, routing, connectivity troubleshooting, and secure wired and wireless networks.",
  ),
  cert(
    "Introduction to Cybersecurity",
    "Cisco Networking Academy",
    "Cloud & Development",
    "CISCO Introduction to Cybersecurity.webp",
    "Foundations of online safety, common cyber threats and vulnerabilities, personal protection, and organizational cybersecurity practices.",
  ),
  cert(
    "Docker & Kubernetes",
    "Course Certificate",
    "Cloud & Development",
    "Containerization and Virtualization with Docker and Kubernetes-v2.webp",
    "Containerization, virtualization, and orchestration foundations.",
  ),
  cert(
    "GitHub Foundations Certification",
    "GitHub",
    "Software & Tools",
    "GitHub Foundations Certification.webp",
    "Industry-recognized validation of foundational GitHub concepts, collaborative development, repositories, and project management.",
  ),
  cert(
    "A.IGNITE",
    "Event Certificate",
    "Artificial Intelligence",
    "A.IGNITE.webp",
    "Participation in an applied AI learning event.",
  ),
  cert(
    "AWS Community Day Philippines 2026",
    "AWS User Group Philippines",
    "Hackathons & Events",
    "AWS Community Day Philippines 2026.webp",
    "Participation in the second day of AWS Community Day Philippines 2026, centered on the Build, Break, Repeat theme.",
  ),
  cert(
    "Thanks, I Hate It - Graphic Design",
    "Event Certificate",
    "Hackathons & Events",
    "Thanks I Hate It.webp",
    "Participation in The Good, The Bad, and The Ugly of Graphic Design event at the University of San Agustin.",
  ),
  cert(
    "AIFEST",
    "Event Certificate",
    "Hackathons & Events",
    "AIFEST.webp",
    "Participation in an artificial-intelligence festival and challenge.",
  ),
  cert(
    "Chain of Thought",
    "Event Certificate",
    "Artificial Intelligence",
    "Chain of Thought.webp",
    "Participation in a technology and AI learning program.",
  ),
  cert(
    "SIKAPTALA National Hackathon",
    "SIKAPTALA",
    "Hackathons & Events",
    "SIKAPTALA National Hackathon.webp",
    "National hackathon participation and collaborative product building.",
  ),
  cert(
    "Ready, Spark, Charge 2026",
    "Hackathon",
    "Hackathons & Events",
    "Ready, Spark, Charge 2026 Hackathon.webp",
    "Rapid team-based ideation and software prototyping.",
  ),
  cert(
    "AI Workshop: Human Centric AI & Problem Solving",
    "Workshop",
    "Hackathons & Events",
    "AI Hackathon Workshop 1.webp",
    "Hands-on preparation for AI-focused hackathon development.",
  ),
  cert(
    "AI Workshop: Technical Architecture & Data Ethics",
    "Workshop",
    "Hackathons & Events",
    "AI Hackathon Workshop 2.webp",
    "Advanced applied preparation for AI-focused hackathon work.",
  ),
  cert(
    "UX Western Visayas",
    "UX Western Visayas",
    "Software & Tools",
    "UIUX.webp",
    "Community learning in user experience and interface design.",
  ),
  cert(
    "Augustinian Developers Society",
    "Developer Community",
    "Cloud & Development",
    "GDSC.webp",
    "Participation and contribution within a student developer community.",
  ),
];

export const certificationCategories: CertificationCategory[] = [
  "Data & Analytics",
  "Artificial Intelligence",
  "Cloud & Development",
  "Software & Tools",
  "Hackathons & Events",
];
export const featuredCertificates = certificates.slice(0, 10);

export function filterCertificates(query: string, category = "All") {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return certificates.filter((certificate) => {
    const text =
      `${certificate.title} ${certificate.issuer} ${certificate.description}`.toLocaleLowerCase();
    return (
      (category === "All" || certificate.category === category) &&
      terms.every((term) => text.includes(term))
    );
  });
}

export function certificateFilters(search: string) {
  const params = new URLSearchParams(search);
  const category = params.get("category") ?? "All";
  return {
    query: params.get("q") ?? "",
    category: certificationCategories.includes(
      category as CertificationCategory,
    )
      ? category
      : "All",
  };
}
