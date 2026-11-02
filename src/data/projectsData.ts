export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "Full Stack" | "AI & Agents" | "Robotics & CV" | "Backend & Cloud";
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
    id: "gravitas",
    title: "graVITas'26 Flagship Festival Portal",
    shortDesc: "Scalable Event Architecture for 25,000+ International Participants",
    fullDesc: "Developed core full-stack features for VIT's flagship international fest portal scaling to 25,000+ participants. Built high-throughput Go (Golang) event services with optimized REST API endpoints for discovery, categories, and schedules. Optimized PostgreSQL multi-column indexing and Redis caching, cutting DB load ~40% at < 100ms latency. Crafted responsive, accessible React/Next.js, Tailwind CSS, and GSAP UI modules for seamless cross-device performance.",
    category: "Full Stack",
    tags: ["Go (Golang)", "React", "Next.js", "PostgreSQL", "Redis", "GSAP", "Tailwind CSS"],
    metrics: [
      "Supported 25,000+ fest participants seamlessly",
      "Cut database load ~40% with Redis caching",
      "Sub-100ms API response latency under peak concurrency",
      "High-performance 60 FPS GSAP UI modules"
    ],
    liveUrl: "https://gravitas.vit.ac.in",
    githubUrl: "https://github.com/anikethgalla",
    color: "#0284c7", // rich azure
    accentColor: "#38bdf8",
    spawnPosition: [20, 0, -16] // Drive-In Cinema parking bay
  },

  {
    id: "devjams",
    title: "DevJams'26 Hackathon Platform",
    shortDesc: "GDG-VIT Flagship 48-Hour Hackathon Portal Supporting 4,000+ Hackers",
    fullDesc: "Architected the GDG-VIT flagship 48-hour hackathon platform, scaling to support 4,000+ registrations. Engineered an interactive submission portal and live review dashboard with multi-stage form validation. Implemented high-performance 60 FPS visual storytelling using GSAP animations and Lenis smooth scrolling.",
    category: "Full Stack",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis Scroll"],
    metrics: [
      "Handled 4,000+ hacker registrations and team submissions",
      "Fluid 60 FPS visual storytelling with Lenis & GSAP",
      "Multi-stage live review dashboard for jury evaluations",
      "Zero-downtime 48-hour continuous hackathon operation"
    ],
    liveUrl: "https://devjams.gdgvit.com",
    githubUrl: "https://github.com/anikethgalla",
    color: "#ea580c", // GDG signature orange/amber
    accentColor: "#f97316",
    spawnPosition: [23, 0, 0] // Food Truck customer bay
  },

  {
    id: "mira",
    title: "Mira 2.0: AI Virtual Garment Try-On",
    shortDesc: "Diffusion-Based Neural Garment Warping & Real-Time Pose Fitting",
    fullDesc: "Engineered a generative AI try-on engine using diffusion-based garment warping and pose estimation with PyTorch and OpenPose. Preserved fine fabric textures and spatial draping, reducing geometric distortion artifacts by 40%. Deployed an asynchronous FastAPI REST API microservice with GPU batching, generating high-res previews in < 3s.",
    category: "AI & Agents",
    tags: ["PyTorch", "Diffusion Models", "OpenPose", "FastAPI", "React", "GPU Batching"],
    metrics: [
      "Reduced geometric distortion artifacts by 40%",
      "Sub-3 second high-res photorealistic previews",
      "Asynchronous FastAPI microservice with GPU batching",
      "Precise spatial draping and fine fabric texture preservation"
    ],
    githubUrl: "https://github.com/anikethgalla",
    color: "#8b5cf6", // vibrant purple
    accentColor: "#a855f7",
    spawnPosition: [20, 0, 16] // Classic Diner drive-up bay
  },

  {
    id: "robosurge",
    title: "RoboSurge: Agentic Surgical Robot",
    shortDesc: "Dual-Arm Robotic System with LLM Planning & YOLOv8-Pose Vision",
    fullDesc: "Built an agentic dual-arm robotic system translating natural-language commands into validated surgical trajectories. Engineered a real-time vision pipeline using YOLOv8-pose and HSV fiducial detection. Integrated an LLM planning agent with a mathematical ProcedureValidator for workspace safety. Streamed 10 Hz waypoints to ESP32 microcontrollers executing real-time inverse kinematics.",
    category: "Robotics & CV",
    tags: ["Python", "YOLOv8-Pose", "Groq LLM", "OpenCV", "ESP32", "Inverse Kinematics"],
    metrics: [
      "10 Hz real-time waypoint streaming to ESP32 microcontrollers",
      "Mathematical ProcedureValidator workspace safety boundaries",
      "Sub-millimeter optical fiducial and YOLOv8-pose tracking",
      "Natural-language surgical command decomposition"
    ],
    githubUrl: "https://github.com/anikethgalla/Robosurge",
    color: "#10b981", // surgical emerald
    accentColor: "#059669",
    spawnPosition: [20, 0, 24] // Robotics Concourse Bay
  },

  {
    id: "healthplix-rag",
    title: "HealthPlix Clinical RAG & Neo4j Graph",
    shortDesc: "Biomedical Drug Repurposing & Sub-120ms Clinical Reasoning Engine",
    fullDesc: "Engineered during AI Engineering Internship at HealthPlix (Bangalore). Deployed LLM-powered RAG clinical reasoning pipelines, improving patient wellness insight relevance by 38%. Architected a Neo4j knowledge graph integrating ChEMBL, Open Targets, and PubMed for drug repurposing with direct target overlap and 2-hop PPI proximity scoring. Optimized retrieval pipelines, cutting API latency 45% to sub-120ms with hallucination guardrails.",
    category: "AI & Agents",
    tags: ["Neo4j", "Python", "RAG", "LLMs", "ChEMBL", "Open Targets", "PubMed", "FastAPI"],
    metrics: [
      "38% improvement in patient wellness insight relevance",
      "45% API latency reduction to sub-120ms",
      "2-hop PPI proximity & target overlap weighted scoring",
      "Hallucination guardrails with biomedical knowledge graph grounding"
    ],
    githubUrl: "https://github.com/anikethgalla",
    color: "#3b82f6", // clinical blue
    accentColor: "#60a5fa",
    spawnPosition: [20, 0, -24] // North Cinema Concourse Bay
  }
];
