export interface SkillItem {
  id: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend & APIs" | "Databases" | "Cloud & DevOps" | "AI & ML";
  color: string;
  level: string;
}

export const skillsList: SkillItem[] = [
  // Languages & Core
  { id: "golang", name: "Go (Golang)", category: "Languages", color: "#00ADD8", level: "Advanced" },
  { id: "typescript", name: "TypeScript", category: "Languages", color: "#3178C6", level: "Expert" },
  { id: "python", name: "Python", category: "Languages", color: "#3776AB", level: "Expert" },
  { id: "javascript", name: "JavaScript", category: "Languages", color: "#F7DF1E", level: "Advanced" },
  { id: "sql", name: "SQL", category: "Languages", color: "#E38C00", level: "Advanced" },
  { id: "cpp", name: "C / C++", category: "Languages", color: "#00599C", level: "Proficient" },

  // Frontend
  { id: "nextjs", name: "Next.js", category: "Frontend", color: "#000000", level: "Expert" },
  { id: "react", name: "React", category: "Frontend", color: "#61DAFB", level: "Expert" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", level: "Expert" },
  { id: "gsap", name: "GSAP (60 FPS)", category: "Frontend", color: "#88CE02", level: "Advanced" },
  { id: "tanstack", name: "TanStack Query", category: "Frontend", color: "#FF4154", level: "Advanced" },

  // Backend & APIs
  { id: "fastapi", name: "FastAPI", category: "Backend & APIs", color: "#009688", level: "Expert" },
  { id: "nodejs", name: "Node.js", category: "Backend & APIs", color: "#5FA04E", level: "Advanced" },
  { id: "rest", name: "REST APIs", category: "Backend & APIs", color: "#0284C7", level: "Expert" },
  { id: "microservices", name: "Microservices", category: "Backend & APIs", color: "#8B5CF6", level: "Advanced" },
  { id: "graphql", name: "GraphQL", category: "Backend & APIs", color: "#E10098", level: "Intermediate" },

  // Databases
  { id: "postgresql", name: "PostgreSQL", category: "Databases", color: "#4169E1", level: "Advanced" },
  { id: "redis", name: "Redis Caching", category: "Databases", color: "#DC382D", level: "Advanced" },
  { id: "neo4j", name: "Neo4j Graph DB", category: "Databases", color: "#008CC1", level: "Advanced" },
  { id: "mongodb", name: "MongoDB", category: "Databases", color: "#47A248", level: "Intermediate" },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "Cloud & DevOps", color: "#2496ED", level: "Expert" },
  { id: "kubernetes", name: "Kubernetes", category: "Cloud & DevOps", color: "#326CE5", level: "Intermediate" },
  { id: "aws", name: "AWS Cloud", category: "Cloud & DevOps", color: "#FF9900", level: "Intermediate" },
  { id: "gcp", name: "Google Cloud (GCP)", category: "Cloud & DevOps", color: "#4285F4", level: "Intermediate" },
  { id: "git", name: "Git & CI/CD", category: "Cloud & DevOps", color: "#F05032", level: "Expert" },
  { id: "linux", name: "Linux / Bash", category: "Cloud & DevOps", color: "#FCC624", level: "Advanced" },

  // AI & Machine Learning
  { id: "rag", name: "Clinical & Vector RAG", category: "AI & ML", color: "#E11D48", level: "Advanced" },
  { id: "pytorch", name: "PyTorch", category: "AI & ML", color: "#EE4C2C", level: "Advanced" },
  { id: "diffusion", name: "Diffusion Models", category: "AI & ML", color: "#A855F7", level: "Advanced" },
  { id: "yolo", name: "YOLOv8 & OpenCV", category: "AI & ML", color: "#10B981", level: "Advanced" },
  { id: "llms", name: "Agentic LLMs", category: "AI & ML", color: "#F59E0B", level: "Advanced" }
];

export const skillsCategories = [
  {
    name: "Languages & Core Systems",
    description: "High-performance systems programming, object-oriented design, and type-safe architecture.",
    skills: ["Go (Golang)", "TypeScript", "Python", "JavaScript", "SQL", "C / C++", "Java"]
  },
  {
    name: "Full Stack & Modern Web",
    description: "Responsive 60 FPS interfaces, accessible design systems, and resilient SSR/ISR event portals.",
    skills: ["React", "Next.js", "Tailwind CSS", "GSAP Animations", "TanStack Query", "Lenis Scroll", "HTML5/CSS3"]
  },
  {
    name: "Backend, APIs & Databases",
    description: "Scalable microservices, multi-column indexing, low-latency Redis caching, and graph engines.",
    skills: ["Go REST APIs", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Neo4j Knowledge Graph", "GraphQL", "Microservices"]
  },
  {
    name: "AI, Vision & Robotics",
    description: "Clinical reasoning pipelines, diffusion generative warping, YOLOv8 pose tracking, and real-time IK.",
    skills: ["LLM RAG Pipelines", "PyTorch", "Diffusion Models", "YOLOv8-Pose", "OpenCV", "Inverse Kinematics", "ESP32 Streaming"]
  },
  {
    name: "Cloud, Containers & DevOps",
    description: "Containerized environments, cloud infrastructure, automated CI/CD gating, and Linux systems.",
    skills: ["Docker", "Kubernetes", "AWS", "Google Cloud (GCP)", "CI/CD Pipelines", "Git & GitHub", "Linux / Bash", "Postman", "pytest"]
  }
];
