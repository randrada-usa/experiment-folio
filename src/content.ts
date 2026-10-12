export const portfolioUrl = "https://www.devbyrey.me";
export const email = "rayalejaga12@gmail.com";
export const socialLinks = [
  { label: "Email", href: `mailto:${email}` },
  { label: "GitHub", href: "https://github.com/randrada-usa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rjandrada/" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  tags: string;
  video?: string;
};
export const projects: Project[] = [
  {
    slug: "wave-and-wish",
    title: "Wave & Wish",
    category: "Computer vision game",
    summary:
      "A touchless festival game. Led a six-person team from concept to a real-world interactive experience in seven days.",
    image: "wave-and-wish",
    tags: "PYTHON / OPENCV / MEDIAPIPE",
  },
  {
    slug: "iloilo-farmers-hub",
    title: "Iloilo Farmers Hub",
    category: "Digital marketplace",
    summary:
      "Connecting local farmers and buyers. Backend systems for inventory, orders, identity verification, and media uploads.",
    image: "IFC-v3",
    tags: "REACT / TYPESCRIPT / FIREBASE",
  },
  {
    slug: "e-serbisyo-rizal",
    title: "e-Serbisyo Rizal",
    category: "Digital governance",
    summary:
      "A barangay service platform. Backend development and AI integration that bring everyday public-service workflows online.",
    image: "e-serbisyo-rizal-v3",
    tags: "BACKEND / AI / WEB APPLICATION",
  },
  {
    slug: "duely",
    title: "Duely",
    category: "Student task organizer",
    summary:
      "Assignment photos become editable tasks through on-device OCR and optional AI assistance. Founded and led a three-person team.",
    image: "duely",
    tags: "REACT NATIVE / EXPO / OCR",
  },
  {
    slug: "icslink",
    title: "ICSLink",
    category: "Event management platform",
    summary:
      "Event discovery, registration, QR ticketing, attendance, and reporting in one platform for the Institute of Computer Science.",
    image: "icslink",
    tags: "REACT / TYPESCRIPT / SUPABASE",
  },
  {
    slug: "praise-and-pray",
    title: "Praise & Pray",
    category: "Gesture-controlled experience",
    summary:
      "A commissioned touchless game for Estancia Baptist Church, designed for recurring weekend activities and reliable Windows operation.",
    image: "praise-and-pray",
    tags: "PYTHON / PYGAME / COMPUTER VISION",
  },
];
