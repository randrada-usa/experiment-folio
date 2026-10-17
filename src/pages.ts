export type PageKind = "home" | "projects" | "project" | "certificates" | "cv";

export function getProjectSlug(pathname: string) {
  return /^\/projects\/([a-z0-9-]+)(?:\/|\/index\.html)?$/.exec(pathname)?.[1];
}

export function getPageKind(pathname: string): PageKind {
  if (getProjectSlug(pathname)) return "project";
  if (/^\/cv(?:\/|\/index\.html)?$/.test(pathname)) return "cv";
  if (/^\/projects(?:\/|\/index\.html)?$/.test(pathname)) return "projects";
  if (/^\/certifications(?:\/|\/index\.html)?$/.test(pathname))
    return "certificates";
  return "home";
}

export const nextPage = {
  project: {
    href: "/projects/",
    label: "Projects",
    description: "Back to all projects",
    footerLabel: "More projects",
  },
  cv: {
    href: "/projects/",
    label: "Projects",
    description: "Explore my projects",
    footerLabel: "Explore the work",
  },
  home: {
    href: "/projects/",
    label: "Projects",
    description: "All portfolio projects",
    footerLabel: "All projects",
  },
  projects: {
    href: "/certifications/",
    label: "Certificates",
    description: "All certificates",
    footerLabel: "All certificates",
  },
  certificates: {
    href: "/#contact",
    label: "Contact",
    description: "Contact Rey Andrada",
    footerLabel: "Let’s connect",
  },
} satisfies Record<
  PageKind,
  { href: string; label: string; description: string; footerLabel: string }
>;

export function pageNavigation(
  page: PageKind,
): { label: string; href: string; section?: string }[] {
  return [
    ...(page !== "home" ? [{ label: "Home", href: "/" }] : []),
    {
      label: "About",
      href: page === "home" ? "#about" : "/#about",
      section: page === "home" ? "about" : undefined,
    },
    {
      label: "Projects",
      href: page === "projects" ? "#main" : "/projects/",
      section: page === "projects" ? "main" : undefined,
    },
    {
      label: "Certificates",
      href: page === "certificates" ? "#certificate-index" : "/certifications/",
      section: page === "certificates" ? "certificate-index" : undefined,
    },
    {
      label: "Contact",
      href: page === "home" ? "#contact" : "/#contact",
      section: page === "home" ? "contact" : undefined,
    },
  ];
}
