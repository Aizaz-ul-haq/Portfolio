export const PROFILE = {
  name: "Aizaz Ulhaq",
  role: "Senior Software Engineer",
  location: "Islamabad, Pakistan",
  email: "aizazulhaq14@gmail.com",
  linkedin: {
    label: "aizaz-ulhaq-312169153",
    url: "https://www.linkedin.com/in/aizaz-ulhaq-312169153/",
  },
  phone: "+92 313 9744116",
  yearsExperience: 5,
  manifesto:
    "I architect cloud-native systems used by tens of thousands of people daily — from Angular frontends to AWS-backed NestJS services.",
  summary:
    "Full-Stack Software Engineer with 5+ years of experience building scalable web applications that serve tens of thousands of users daily. Specialized in modern JavaScript/TypeScript ecosystems with deep expertise in Angular frontend development and NestJS backend architecture.",
} as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "MUST services Pvt. Ltd.",
    role: "Senior Software Engineer & Technical Team Lead",
    location: "Islamabad, Pakistan",
    start: "Sept 2025",
    end: "Present",
    current: true,
    highlights: [
      "Lead cross-functional frontend and backend teams to ship production-ready applications.",
      "Initiated and built multiple Angular projects serving tens of thousands of users.",
      "Designed AWS infrastructure: EC2, CodePipeline, CodeBuild, Route 53, DocumentDB, Lambda.",
      "Built NestJS services backed by MongoDB and PostgreSQL.",
      "Engaged directly with clients to gather requirements and steer technical direction.",
    ],
  },
  {
    company: "MicroMerger Pvt. Ltd.",
    role: "Senior Software Engineer",
    location: "Islamabad, Pakistan",
    start: "Jan 2021",
    end: "Aug 2025",
    highlights: [
      "Led teams of frontend and backend developers to deliver applications at scale.",
      "Kickstarted multiple Angular projects, full-stack solutions used by tens of thousands.",
      "Architected AWS infrastructure: EC2, CodePipeline, CodeBuild, Route 53, DocumentDB, Lambda.",
      "Built NestJS + MongoDB / DocumentDB backends with CloudSearch integration.",
      "Ran agile sprints — story points, planning, stakeholder alignment.",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  client: string;
  stack: string[];
  year: string;
  blurb: string;
  highlights: string[];
  metric: { label: string; value: string };
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "falaya",
    name: "Falaya",
    client: "MicroMerger",
    stack: ["NestJS", "MongoDB", "DocumentDB", "Angular", "AWS"],
    year: "2021 — 2025",
    blurb:
      "A real estate listings platform that placed 2nd at Nexus Tech 2023. Built end-to-end with real-time search, digital contracts, and microservice architecture.",
    highlights: [
      "Angular 13 frontend with real-time property search, auth, and interactive maps.",
      "Dropbox Sign (HelloSign) integration for compliant digital contracts.",
      "NestJS + AWS DocumentDB microservices with CloudSearch for advanced filtering.",
      "ML model deployed on ECS as part of the recommendation pipeline.",
    ],
    metric: { label: "Uptime over 4 years", value: "99.9%" },
    accent: "#ff5b22",
  },
  {
    id: "aims",
    name: "AIMS",
    client: "MicroMerger",
    stack: ["NestJS", "PostgreSQL", "Angular", "AWS"],
    year: "2022 — 2024",
    blurb:
      "Migration from Angular 7 to Angular 13 with a complete frontend overhaul and a backend optimization pass that meaningfully improved customer experience.",
    highlights: [
      "Led the Angular 7 → 13 migration, eliminating long-standing memory leaks.",
      "Cut average page load times by half.",
      "Worked with the design team to bring a refreshed UI to life.",
      "Optimized legacy queries with the backend team for a 20% response-time win.",
    ],
    metric: { label: "Load time reduction", value: "−50%" },
    accent: "#5ad1ff",
  },
  {
    id: "xpertcoin",
    name: "XpertCoin",
    client: "MicroMerger",
    stack: ["NestJS", "DynamoDB", "React.js", "AWS"],
    year: "2022 — 2023",
    blurb:
      "Bridge engineering between frontend and backend systems, with a migration from monolith to a microservice architecture on AWS.",
    highlights: [
      "Support backend developer connecting frontend and backend systems.",
      "Migrated functionality from monolith to microservices.",
      "Worked across AWS Cognito and DynamoDB.",
    ],
    metric: { label: "Architecture", value: "Monolith → Microservices" },
    accent: "#b681ff",
  },
  {
    id: "ssmis",
    name: "SSMIS / HRMIS",
    client: "MicroMerger",
    stack: ["NestJS", "PostgreSQL", "React.js", "Keycloak"],
    year: "2021 — 2022",
    blurb:
      "Initiated backend services for an internal HR/management platform, with full schema design, auth, and CRUD APIs deployed on internal infrastructure.",
    highlights: [
      "Initiated backend services for the project from scratch.",
      "Designed schema and implemented Keycloak authentication.",
      "Built RESTful endpoints for projects, tasks, and user management with input validation.",
      "Deployed on internal company servers with proper environment configuration.",
    ],
    metric: { label: "Auth", value: "Keycloak SSO" },
    accent: "#7cf08a",
  },
];

export const STACK = [
  {
    label: "Frontend",
    items: ["Angular", "React.js", "Vue.js", "TypeScript", "JavaScript", "Ant Design", "NG-ZORRO", "Angular Material"],
  },
  {
    label: "Backend",
    items: ["NestJS", "Node.js", "PostgreSQL", "MongoDB", "DocumentDB", "DynamoDB", "REST APIs", "Microservices"],
  },
  {
    label: "Cloud",
    items: ["AWS", "EC2", "Lambda", "CodePipeline", "CodeBuild", "CloudSearch", "Route 53", "DocumentDB", "Cognito", "ECS"],
  },
  {
    label: "Craft",
    items: ["Git", "Jira", "Trello", "Agile", "Scrum", "Code Review", "Mentoring"],
  },
];

export const EDUCATION = {
  school: "University of Engineering and Technology, Peshawar",
  degree: "B.Sc. Computer Software Engineering",
  years: "2016 — 2020",
  location: "Peshawar, Pakistan",
};

export const NAV = [
  { id: "hero", label: "Index" },
  { id: "manifesto", label: "Manifesto" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
  { id: "stack", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];
