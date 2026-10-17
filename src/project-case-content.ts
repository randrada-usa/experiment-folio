// Public case-study text from CleanPortfolio/app/data/site.ts, copied 2026-10-17.
// Results describe the documented project evaluation, not new production measurements.
export type CaseContent = {
  challenge: string;
  approach: string[];
  results: string[];
};

export const projectCaseContent: Record<string, CaseContent> = {
  duely: {
    challenge:
      "Make it easier for students to turn handouts, screenshots, and photos into organized tasks without hiding OCR mistakes or sending every assignment image to the cloud.",
    approach: [
      "Built the Android app with React Native, Expo Router, and TypeScript, including offline tasks, reminders, smart prioritization, calendar views, and local source-image retention.",
      "Designed an on-device Google ML Kit OCR flow that shows uncertainty per field and requires an editable review before a task is saved.",
      "Added optional Gemini-assisted extraction through an authenticated Supabase Edge Function with explicit consent, monthly limits, cancellation recovery, timeouts, and local OCR fallback.",
      "Implemented Google sign-in, Row Level Security, cloud backup and restore, accessibility improvements, and a RevenueCat Test Store flow for simulated Duely Plus purchases.",
    ],
    results: [
      "320 automated tests passing across 62 test files",
      "24-case English, Filipino, and mixed-language parser evaluation",
      "99.5% token accuracy across a controlled 12-image synthetic OCR pack",
      "12/12 controlled scans produced parser-ready text",
      "6/6 clear deadlines extracted, 3/3 missing deadlines avoided, and 3/3 ambiguous deadlines flagged",
      "Android demo verified for OCR, optional AI review, task saving, and simulated Plus purchase and restore",
    ],
  },
  icslink: {
    challenge:
      "Replace disconnected event forms, paper attendance sheets, and manually maintained spreadsheets with one responsive system for students, guests, and organizers—without sacrificing access control or attendance integrity.",
    approach: [
      "Led the architecture and implementation of a React 19 and TypeScript interface backed by Supabase PostgreSQL, Google OAuth, role-based access, Edge Functions, and Storage.",
      "Built event management, registration, QR ticket generation, attendance scanning, duplicate prevention, check-in and checkout flows, and exportable reporting.",
      "Coordinated the three-person team, reviewed contributions before merge, and established continuous integration with 75 automated tests plus 44 Playwright desktop and mobile browser scenarios.",
    ],
    results: [
      "22 attendees supported in first live workshop",
      "44 check-in and checkout scans processed",
      "4 additional workshops scheduled",
      "Projected 100+ attendee visits across workshop series",
      "Designed for 150 potential organization members",
      "75 automated tests and 44 Playwright browser scenarios",
    ],
  },
  "wave-and-wish": {
    challenge:
      "Build a camera-controlled festival game that could survive a seven-hour public event, difficult lighting, rapid player turnover, and a fixed physical-prize inventory.",
    approach: [
      "Mapped MediaPipe palm landmarks to screen coordinates with exponential smoothing, a deadzone, and position prediction for brief tracking loss.",
      "Designed a dynamic difficulty system, anti-streak spawn rules, three fully themed content sets, and an event-driven mascot HUD.",
      "Built an auditable gacha system with configurable win rates, multiple wishes, unique claim codes, and JSONL result logging.",
      "Packaged the Python application for Windows with a custom PyInstaller specification covering MediaPipe models and OpenCV dependencies.",
    ],
    results: [
      "Event-ready game delivered in seven days",
      "280+ players served in seven hours",
      "170 physical prizes distributed",
      "0 crashes during the event",
    ],
  },
  "praise-and-pray": {
    challenge:
      "Create an engaging touchless game for recurring church activities, combining reliable hand tracking with a client-specific visual identity and a setup that could run smoothly during weekend programs.",
    approach: [
      "Adapted the gesture-control architecture used for Wave & Wish, mapping MediaPipe hand landmarks to responsive in-game movement through OpenCV.",
      "Led the team in tailoring the gameplay, interface, and visual presentation to Estancia Baptist Church and its participants.",
      "Prepared the Python game for dependable Windows operation so church staff could run it during recurring weekend activities.",
    ],
    results: [
      "Paid commission delivered in three weeks",
      "Approximately 20–40 participants per weekend day",
      "Touchless gameplay tailored for Estancia Baptist Church",
      "Recurring use during weekend church activities",
    ],
  },
  "iloilo-farmers-hub": {
    challenge:
      "Coordinate inventory, orders, identity verification, and media uploads on a serverless stack while remaining reliable on low-end Android devices.",
    approach: [
      "Designed the Firestore schema and transaction flows that prevent overselling across inventory and order systems.",
      "Built AI-assisted KYC using Google Vision for ID extraction and Face++ for face matching, with secrets protected by Cloud Functions.",
      "Implemented chunked image and video uploads, Firestore security rules, authentication flows, and deployment infrastructure.",
    ],
    results: [
      "Requirements informed by interviews with 20+ farmers in Oton, Iloilo",
      "Five end-to-end test orders completed during development",
      "Image and video uploads validated up to 15 MB",
    ],
  },
  "e-serbisyo-rizal": {
    challenge:
      "Deliver useful AI-assisted public services within free-tier limits while navigating CORS, SDK conflicts, public access, and protected audit data.",
    approach: [
      "Built a direct REST integration for Gemini after the official SDK conflicted with the application environment.",
      "Designed Tagalog and English prompt routing with automatic language detection and constrained public chatbot access.",
      "Configured Firebase rules that permit public conversations while protecting administrative audit logs.",
    ],
    results: [
      "All five service workflows validated with 15 test participants at a barangay hall",
      "Zero-cost operating model using Firebase Spark and Gemini free tiers",
      "English, Filipino, and basic Hiligaynon interactions supported",
    ],
  },
};
