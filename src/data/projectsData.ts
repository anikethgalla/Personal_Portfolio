export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "AI & Agents" | "Robotics & CV" | "Backend & Cloud" | "Full Stack";
  tags: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  color: string;
  accentColor: string;
  spawnPosition: [number, number, number]; // 3D coordinates for parking bay in Projects Zone
}

export const projectsData: Project[] = [
  {
    id: "trueforge",
    title: "TrueForge",
    shortDesc: "Autonomous Coding Agent Benchmarking & Evaluation Engine",
    fullDesc: "Designed and engineered for the TrueFoundry Forge-a-thon. TrueForge provides a rigorous benchmarking suite that runs autonomous LLM coding agents across real-world software repositories in sandboxed containers, validating test suites, patch accuracy, and execution traces with quantitative scoring.",
    category: "AI & Agents",
    tags: ["TypeScript", "Docker Sandboxes", "Agentic Protocols", "CLI", "esbuild"],
    metrics: ["Isolated container execution", "Multi-repo automated evaluation", "Zero-leakage scoring"],
    githubUrl: "https://github.com/anikethgalla/TrueForge",
    color: "#e06c4b", // warm rust clay
    accentColor: "#ea580c",
    spawnPosition: [10, 0, -12] // Drive-In Cinema parking bay
  },
  {
    id: "robosurge",
    title: "Robosurge",
    shortDesc: "Real-time Multi-Camera Vision & Surgical Robotics Tracking",
    fullDesc: "An advanced computer vision and telemetry system engineered for real-time surgical tool tracking, dual-camera synchronization, live video stream calibration, and sub-millimeter positional estimation with SQLite WAL event recording.",
    category: "Robotics & CV",
    tags: ["Python", "OpenCV", "Multi-Camera Sync", "FastAPI", "SQLite WAL"],
    metrics: ["60 FPS live video pipeline", "Dual-camera optical calibration", "Sub-millisecond trace logging"],
    githubUrl: "https://github.com/anikethgalla/Robosurge",
    color: "#4a7c82", // warm teal clay
    accentColor: "#0284c7",
    spawnPosition: [14, 0, -2] // Food Truck customer bay
  },
  {
    id: "distributed-backend",
    title: "Distributed Backend Tier",
    shortDesc: "High-Throughput Microservice Architecture & API Gateway",
    fullDesc: "Enterprise-grade backend architecture applying Domain-Driven Design, Hexagonal Boundaries, and Prisma ORM with connection pooling. Built for low latency, idempotent REST APIs, JWT authentication rotation, and containerized deployment across Docker Compose and Kubernetes.",
    category: "Backend & Cloud",
    tags: ["FastAPI", "Node.js", "PostgreSQL", "Prisma", "Docker", "Kubernetes"],
    metrics: ["Sub-25ms P99 API response", "Connection pool optimization", "Automated health reconciler"],
    githubUrl: "https://github.com/anikethgalla/Backend",
    color: "#7e6c9a", // muted plum clay
    accentColor: "#7c3aed",
    spawnPosition: [12, 0, 10] // Classic Diner drive-up bay
  },
  {
    id: "langchain-agents",
    title: "LangChain Multi-Agent Systems",
    shortDesc: "Autonomous Multi-Agent Workflow & Knowledge Retrieval Engine",
    fullDesc: "Recursive autonomous agent framework leveraging tool use, structured JSON validation, vector embeddings, and persistent conversation memory. Orchestrates multi-stage planning, code verification, and external tool execution without human in the loop.",
    category: "AI & Agents",
    tags: ["LangChain", "Python", "Vector Databases", "Function Calling", "RAG"],
    metrics: ["Multi-step reasoning loops", "Deterministic structured schema", "Dynamic tool invocation"],
    githubUrl: "https://github.com/anikethgalla/langchain",
    color: "#b08958", // warm ochre clay
    accentColor: "#d97706",
    spawnPosition: [12, 0, 18]
  }
];
