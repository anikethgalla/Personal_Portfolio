export interface SkillItem {
  id: string;
  name: string;
  category: "Backend" | "DevOps & Cloud" | "AI & Agents" | "Data & Core";
  color: string;
  level: string;
}

export const skillsList: SkillItem[] = [
  // Backend
  { id: "fastapi", name: "FastAPI", category: "Backend", color: "#009688", level: "Expert" },
  { id: "python", name: "Python", category: "Backend", color: "#3776AB", level: "Expert" },
  { id: "nodejs", name: "Node.js", category: "Backend", color: "#5FA04E", level: "Advanced" },
  { id: "typescript", name: "TypeScript", category: "Backend", color: "#3178C6", level: "Advanced" },
  { id: "postgresql", name: "PostgreSQL", category: "Backend", color: "#4169E1", level: "Advanced" },
  { id: "prisma", name: "Prisma", category: "Backend", color: "#2D3748", level: "Advanced" },
  { id: "redis", name: "Redis", category: "Backend", color: "#DC382D", level: "Intermediate" },
  
  // DevOps & Cloud
  { id: "docker", name: "Docker", category: "DevOps & Cloud", color: "#2496ED", level: "Expert" },
  { id: "kubernetes", name: "Kubernetes", category: "DevOps & Cloud", color: "#326CE5", level: "Intermediate" },
  { id: "linux", name: "Linux / Bash", category: "DevOps & Cloud", color: "#FCC624", level: "Advanced" },
  { id: "git", name: "Git & CI/CD", category: "DevOps & Cloud", color: "#F05032", level: "Expert" },
  
  // AI & Systems
  { id: "langchain", name: "LangChain", category: "AI & Agents", color: "#2E8B57", level: "Advanced" },
  { id: "agents", name: "Autonomous Agents", category: "AI & Agents", color: "#9333EA", level: "Advanced" },
  { id: "opencv", name: "OpenCV / CV", category: "AI & Agents", color: "#5C3EE8", level: "Advanced" },
  { id: "rag", name: "Vector RAG", category: "AI & Agents", color: "#E11D48", level: "Intermediate" }
];

export const skillsCategories = [
  {
    name: "Backend Architecture",
    description: "High-throughput APIs, ORM mapping, connection pools, and distributed microservices.",
    skills: ["Python", "FastAPI", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Redis Cache", "WebSockets"]
  },
  {
    name: "Autonomous AI & Agents",
    description: "Agent evaluation benchmarks, self-refining tool use, vision tracking, and structured LLMs.",
    skills: ["LangChain", "LangGraph", "Docker Sandboxes", "Agentic Benchmarking", "OpenCV", "Vector Embeddings"]
  },
  {
    name: "DevOps & Infrastructure",
    description: "Multi-stage containerization, container orchestration, CI/CD automated gates, and Linux sysadmin.",
    skills: ["Docker", "Docker Compose", "Kubernetes", "Linux / Bash", "CI/CD Pipelines", "Git Workflow"]
  }
];

