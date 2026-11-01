export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  stats: { label: string; value: string }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
}

export const profileData: ProfileData = {
  name: "Aniketh Galla",
  headline: "Backend Systems Engineer & Autonomous AI Agent Architect",
  tagline: "Building high-performance backend pipelines, resilient microservices, and autonomous multi-agent systems.",
  bio: "Software engineer with a deep passion for production distributed systems, container orchestration, real-time computer vision, and autonomous agent evaluation. Experienced in architecting robust APIs, tuning database query performance, and deploying production services with Docker and Kubernetes.",
  location: "India",
  email: "anikethgalla@gmail.com",
  github: "https://github.com/anikethgalla",
  linkedin: "https://linkedin.com/in/anikethgalla",
  resumeUrl: "#", // User can replace with actual resume PDF path
  stats: [
    { label: "Flagship Projects", value: "5+" },
    { label: "Core Stacks", value: "Python / TS / Docker" },
    { label: "Architecture", value: "Distributed & Clean" },
    { label: "Physics Toy Car", value: "60+ FPS" }
  ],
  experience: [
    {
      role: "Backend & Systems Developer",
      organization: "Independent & Open Source",
      period: "2024 — Present",
      description: "Designing end-to-end scalable backend platforms, API gateways, and autonomous LLM evaluation frameworks.",
      highlights: [
        "Architected TrueForge: An agent benchmarking engine executing isolated sandbox evaluations for coding agents.",
        "Built Robosurge: Real-time dual-camera calibration and computer vision tracking for medical surgical robotics.",
        "Engineered production FastAPI & Node/Prisma services with Dockerized deployments and automated CI/CD."
      ]
    },
    {
      role: "AI & Full-Stack Engineer",
      organization: "Innovative Projects & Hackathons",
      period: "2023 — 2024",
      description: "Developed multi-agent orchestration pipelines, real-time telemetry dashboards, and collaborative web platforms.",
      highlights: [
        "Integrated LangChain and LangGraph for recursive self-refining agent workflows with structured outputs.",
        "Implemented high-performance PostgreSQL and SQLite WAL pipelines for zero-latency video log capture."
      ]
    }
  ]
};

