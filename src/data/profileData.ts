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
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    cgpa: string;
    coursework: string[];
  };
  stats: { label: string; value: string }[];
  experience: {
    role: string;
    organization: string;
    location?: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
}

export const profileData: ProfileData = {
  name: "Aniketh Galla",
  headline: "Full Stack & AI Engineer | Go, React, Next.js, PyTorch & Distributed Systems",
  tagline: "Architecting high-throughput Go/Next.js platforms for 25,000+ users, clinical RAG pipelines, and agentic surgical robotics.",
  bio: "Computer Science undergraduate at Vellore Institute of Technology (CGPA 9.51) and Full Stack Developer at Google Developer Groups (GDG) VIT. Experienced in deploying clinical reasoning RAG pipelines and Neo4j biomedical knowledge graphs at HealthPlix, engineering fest architectures scaling to 25,000+ attendees (graVITas'26) and 4,000+ hackers (DevJams'26), and developing generative AI virtual try-on and surgical robotics pipelines.",
  location: "Bangalore, India",
  email: "anikethgalla@outlook.com",
  phone: "+91 9902550343",
  github: "https://github.com/anikethgalla",
  linkedin: "https://www.linkedin.com/in/aniketh-galla-5b23611bb/",
  resumeUrl: "/AnikethGallaResumev4.pdf",
  education: {
    institution: "Vellore Institute of Technology",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2025 – Present",
    cgpa: "9.51 / 10.0",
    coursework: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering"
    ]
  },
  stats: [
    { label: "graVITas Users", value: "25,000+" },
    { label: "DevJams Hackers", value: "4,000+" },
    { label: "Clinical RAG Latency", value: "< 120ms" },
    { label: "Academic CGPA", value: "9.51" }
  ],
  experience: [
    {
      role: "AI Engineering Intern",
      organization: "HealthPlix",
      location: "Bangalore, Karnataka",
      period: "May 2026 – August 2026",
      description: "Engineered LLM-powered clinical reasoning and biomedical knowledge graph retrieval pipelines for healthcare intelligence.",
      highlights: [
        "Deployed LLM-powered RAG clinical reasoning pipelines, improving patient wellness insight relevance by 38%.",
        "Architected a Neo4j knowledge graph integrating ChEMBL, Open Targets, and PubMed for drug repurposing.",
        "Built a graph reasoning engine using direct target overlap and 2-hop PPI proximity with weighted scoring.",
        "Optimized retrieval pipelines, cutting API latency 45% to sub-120ms with hallucination guardrails."
      ]
    },
    {
      role: "Full Stack Developer",
      organization: "Google Developer Groups On Campus - VIT Vellore",
      location: "Vellore, Tamil Nadu",
      period: "January 2026 – Present",
      description: "Core developer on the GDG-VIT full stack development team driving flagship portals and community initiatives.",
      highlights: [
        "Selected out of 300+ candidates who applied to join the Full Stack development team.",
        "Developed the official portals for DevJams'26 and the upcoming GDG recruitments platform.",
        "Hosted and coordinated flagship campus technology events, including WomenTechies'26 and DevJams'26."
      ]
    }
  ]
};
