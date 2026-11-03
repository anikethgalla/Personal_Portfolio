export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  category: "Industry Internship" | "Technical Society" | "University Leadership" | "Academic";
  badgeColor: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  logoLabel?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "healthplix",
    role: "AI Engineering Intern",
    organization: "HealthPlix",
    category: "Industry Internship",
    badgeColor: "#0284c7",
    period: "May 2026 – August 2026",
    location: "Bangalore, India",
    description: "Engineered LLM-powered clinical reasoning and biomedical knowledge graph retrieval pipelines for healthcare intelligence and drug repurposing.",
    highlights: [
      "Deployed LLM-powered RAG clinical reasoning pipelines, improving patient wellness insight relevance by 38%.",
      "Architected a Neo4j biomedical knowledge graph integrating ChEMBL, Open Targets, and PubMed for drug repurposing.",
      "Engineered graph reasoning algorithms using direct target overlap and 2-hop PPI proximity with weighted edge scoring.",
      "Optimized retrieval pipelines, cutting API latency 45% to sub-120ms with zero-hallucination guardrails."
    ],
    skills: ["Python", "Neo4j", "PyTorch", "LangChain", "Clinical RAG", "FastAPI", "Docker", "pgvector"]
  },
  {
    id: "gdg-vit",
    role: "Full Stack Developer",
    organization: "Google Developer Groups On Campus - VIT",
    category: "Technical Society",
    badgeColor: "#10b981",
    period: "January 2026 – Present",
    location: "Vellore, India",
    description: "Core full-stack developer on the GDG-VIT engineering team, architecting flagship hackathon portals and community technology platforms.",
    highlights: [
      "Selected out of 300+ candidates who applied to join the specialized GDG-VIT Full Stack development division.",
      "Architected and deployed the official DevJams'26 hackathon portal supporting 4,000+ registrations and live review dashboard.",
      "Developed high-performance 60 FPS animated user flows using React, Next.js, GSAP, and Lenis smooth scrolling.",
      "Organized and coordinated premier campus technical symposiums including WomenTechies'26 and national hackathons."
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Node.js", "PostgreSQL"]
  },
  {
    id: "gravitas-fest",
    role: "Web & Tech Volunteer",
    organization: "graVITas'26 International Tech Fest",
    category: "University Leadership",
    badgeColor: "#f59e0b",
    period: "2026",
    location: "VIT Vellore",
    description: "Built the high-throughput flagship registration, ticketing, and event scheduling system for 25,000+ international participants.",
    highlights: [
      "Architected Go (Golang) microservices handling 25,000+ concurrent attendees with sub-100ms API response latency.",
      "Engineered multi-column PostgreSQL indexing and Redis distributed caching, reducing database load by ~40%.",
      "Built resilient rate-limiting, transaction safety, and live schedule broadcast websockets under peak load.",
      "Crafted responsive, accessible UI modules using Next.js and Tailwind CSS for mobile and desktop attendees."
    ],
    skills: ["Go (Golang)", "PostgreSQL", "Redis", "Next.js", "Docker", "Microservices", "REST APIs"]
  },
  {
    id: "vit-cse",
    role: "Undergraduate(CGPA 9.51)",
    organization: "Vellore Institute of Technology",
    category: "Academic",
    badgeColor: "#8b5cf6",
    period: "2025 – Present",
    location: "Vellore, India",
    description: "Pursuing B.Tech in Computer Science and Engineering with an exceptional 9.51 / 10.0 CGPA, focused on systems, AI, and distributed software engineering.",
    highlights: [
      "Ranked in top academic percentile of the Computer Science and Engineering department with 9.51/10.0 CGPA.",
      "Advanced coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, and Software Architecture.",
      "Active competitive coder and hackathon innovator, building production-grade agentic and robotics systems.",
      "Peer mentor conducting architectural code reviews and workshops on modern full-stack development."
    ],
    skills: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "System Design", "C++", "Python"]
  }
];
