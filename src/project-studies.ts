export type ProjectStudy = {
  role: string;
  team: string;
  timeline: string;
  type: string;
  tools: string[];
  paragraphs: string[];
  about: string;
  liveUrl?: string;
};

// Public portfolio copy adapted from CleanPortfolio/app/data/site.ts.
// Keep private source repositories and unreleased builds out of public actions.
export const projectStudies: Record<string, ProjectStudy> = {
  "wave-and-wish": {
    role: "Development Lead & Overall Team Lead",
    team: "6-BYTE Studios · 6-person team",
    timeline: "7-day build · Capiztahan 2026",
    type: "Commissioned festival game",
    tools: ["Python", "Pygame", "OpenCV", "MediaPipe"],
    paragraphs: [
      "Built a camera-controlled festival game for a seven-hour public event, difficult lighting, rapid player turnover, and a fixed physical-prize inventory.",
      "Mapped MediaPipe palm landmarks to screen coordinates with exponential smoothing, a deadzone, and position prediction for brief tracking loss. Dynamic difficulty, anti-streak spawn rules, and three themed content sets kept the experience varied.",
      "Built an auditable prize system with configurable win rates, unique claim codes, and result logging, then packaged the application for Windows with its tracking models and camera dependencies.",
    ],
    about:
      "Led a six-person team to deliver Wave & Wish in seven days for Capiztahan 2026. The public event served 280+ players and distributed 170 physical prizes, with zero crashes during seven hours of operation.",
  },
  "iloilo-farmers-hub": {
    role: "Backend Lead & Frontend Contributor",
    team: "4-person academic team",
    timeline: "Oct 2025–Apr 2026",
    type: "Digital marketplace",
    tools: ["React", "TypeScript", "Firebase", "Computer Vision"],
    paragraphs: [
      "Built a marketplace connecting local farmers and buyers, coordinating inventory, orders, identity verification, and media uploads on a serverless stack designed to work on low-end Android devices.",
      "Designed the Firestore schema and transaction flows to prevent overselling. Built AI-assisted identity verification with Google Vision and Face++, with secrets protected by Cloud Functions.",
      "Implemented chunked image and video uploads, security rules, authentication flows, and deployment infrastructure. Development testing covered five end-to-end orders and uploads up to 15 MB.",
    ],
    about:
      "Led backend development in a four-person academic team. Interviews with more than 20 farmers in Oton, Iloilo informed the requirements and grounded the marketplace in the needs of its intended users.",
    liveUrl: "https://iloilo-farmers-hub.web.app/",
  },
  "e-serbisyo-rizal": {
    role: "Backend Lead & API Integration Owner",
    team: "4-person academic team",
    timeline: "Feb–May 2025",
    type: "Digital governance platform",
    tools: ["React", "TypeScript", "Firebase", "Gemini API"],
    paragraphs: [
      "Developed a barangay service platform that brings public-service workflows online. The challenge was to deliver useful AI-assisted services within free-tier limits while handling public access and protecting administrative data.",
      "Built a direct REST integration for Gemini when the SDK conflicted with the application environment. Designed Tagalog and English prompt routing with language detection and constrained public chatbot access.",
      "Configured Firebase rules to permit public conversations while protecting administrative audit logs. All five service workflows were validated with 15 test participants at a barangay hall.",
    ],
    about:
      "Led backend development and AI integration for a four-person academic team. The platform supported English, Filipino, and basic Hiligaynon interactions using Firebase Spark and Gemini free tiers during the project.",
    liveUrl: "https://eserbisyorizalv2.web.app/",
  },
  duely: {
    role: "Founder, Product & Technical Lead",
    team: "Independent product · 3-person team",
    timeline: "Aug 2026–present · Active beta",
    type: "Student task organizer",
    tools: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Google ML Kit",
      "Gemini",
      "RevenueCat",
    ],
    paragraphs: [
      "An Android-first student organizer that turns assignment photos into editable tasks. The goal is to organize handouts, screenshots, and photos without hiding recognition mistakes or sending every image to the cloud.",
      "Built offline tasks, reminders, smart prioritization, and calendar views. On-device Google ML Kit OCR shows uncertainty per field and requires an editable review before a task is saved.",
      "Added optional AI-assisted extraction with explicit consent, usage limits, timeout recovery, and local OCR fallback. Sign-in, cloud backup and restore, and simulated Plus purchase flows support the developing beta.",
    ],
    about:
      "Founded and led a three-person team building Duely as an independent mobile product. It remains an active Android beta; its source repository is private and no public beta download is available yet.",
  },
  icslink: {
    role: "Development Lead",
    team: "Institute of Computer Science · 3-person team",
    timeline: "2-week sprint · September 2026",
    type: "Event management platform",
    tools: ["React 19", "TypeScript", "Supabase", "Cloudflare Pages"],
    paragraphs: [
      "An internal event platform bringing discovery, registration, QR ticketing, attendance, and reporting into one system. It replaces disconnected forms, paper attendance, and manually maintained spreadsheets.",
      "Led the architecture and implementation of a React and TypeScript interface with role-based access. Built registration, QR tickets, attendance scanning, duplicate prevention, check-in and checkout, and exportable reports.",
      "Coordinated a three-person team, reviewed contributions, and established continuous integration. The first live workshop supported 22 attendees and processed 44 check-in and checkout scans.",
    ],
    about:
      "Built in a two-week sprint for the Institute of Computer Science. ICSLink supports students, guests, and organizers while keeping access control and attendance integrity central to its workflow.",
    liveUrl: "https://icslink.pages.dev/",
  },
  "praise-and-pray": {
    role: "Development Lead & Overall Team Lead",
    team: "6-BYTE Studios · 6-person team",
    timeline: "3-week commissioned build",
    type: "Gesture-controlled church game",
    tools: ["Python", "Pygame", "OpenCV", "MediaPipe"],
    paragraphs: [
      "A commissioned touchless game for recurring activities at Estancia Baptist Church. The experience combines reliable hand tracking, a client-specific visual identity, and a setup suited to weekend programs.",
      "Adapted the gesture-control architecture from Wave & Wish, mapping MediaPipe hand landmarks to responsive in-game movement through OpenCV. Led the team in tailoring gameplay and presentation to the church and its participants.",
      "Prepared the application for dependable Windows operation so church staff could run it during recurring activities. The paid commission was delivered in three weeks.",
    ],
    about:
      "Led a six-person team to deliver Praise & Pray for Estancia Baptist Church. The game serves approximately 20–40 participants per weekend day. Both the source and live game remain private commission deliverables.",
  },
};
