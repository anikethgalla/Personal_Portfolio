# Aniketh Galla — 3D Physics Playground & Portfolio

A Bruno Simon-inspired 3D physics playground portfolio built with **React**, **Three.js / React Three Fiber (R3F)**, **Rapier Physics**, and **Tailwind CSS**.

Featuring a driveable low-poly toy car across a warm-clay studio terrain, 4 interactive exploration zones, tactile procedural sound synthesis via Web Audio API, mobile touch controls, and a dedicated 1-click **2D Recruiter View** drawer.

---

## 🕹️ Controls & Navigation

### Desktop
- **Drive / Steer**: `W`, `A`, `S`, `D` or `Arrow Keys`
- **Brake**: `Spacebar`
- **Flip Recovery / Reset Car**: `R` key or the "Reset Car" button in HUD
- **Inspect Project**: Drive into any glowing project pedestal ring and press `E` or click the prompt
- **Quick Teleport**: Click any zone (`Spawn`, `Projects`, `Skills`, `Contact`) in the top navigation bar to glide there instantly

### Mobile / Tablet
- On-screen touch D-Pad for steering
- Gas (Forward), Reverse, and Brake pedals
- Full responsive canvas DPR scaling

---

## 🗺️ The 4 Interactive Zones

1. **Hero / Spawn Plaza (Center)**
   - 3D Extruded typography: **ANIKETH GALLA**
   - Physics launch ramp with landing targets
   - Knockable bowling pins / pillars with hull collision dynamics

2. **Projects Quarry (North-East)**
   - Pedestals and holographic gems for flagship systems:
     - **TrueForge**: Autonomous Coding Agent Benchmarking & Evaluation Engine
     - **Robosurge**: Real-time Multi-Camera Vision & Surgical Robotics Calibration
     - **Distributed Backend Platform**: High-Throughput Microservice Architecture & API Gateway
     - **LangChain Multi-Agent Systems**: Self-Refining Autonomous Reasoning Pipelines
   - Drive-in proximity detection triggers an interactive deep-dive modal (`ProjectModal`) with technical highlights and repo links.

3. **Tech Stack Playground (North-West)**
   - Knockable 3D brick wall (`FastAPI`, `Python`, `Docker`, `TypeScript`, `Kubernetes`, `PostgreSQL`, `Prisma`, `LangChain`, etc.)
   - Smash through the wall with the car and watch the physics scatter!
   - 1-click **"Rebuild Wall"** button in the HUD to instantly restore the wall.

4. **Contact Garage (South)**
   - Low-poly garage with open service bays
   - Interactive pedestals to open GitHub, send an email, and inspect the resume dossier.

---

## 👔 2D Recruiter View

Clicking **"2D Recruiter View"** in the top-right header slides out a recruiter-friendly drawer containing:
- Executive summary & bio
- Key engineering metrics
- Deep-dive technical project breakdowns with architecture notes
- Grouped skill proficiencies (Backend, AI/Agents, DevOps & Cloud)
- Work & hackathon history
- Direct contact actions (Email, GitHub, LinkedIn, Resume)

---

## 🛠️ Tech Stack

- **3D & Rendering**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Physics**: `@react-three/rapier` (WebAssembly-powered Rapier physics)
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Audio**: Web Audio API (procedural engine pitch, collision pops, and harmonic discovery chimes)
- **Celebration**: `canvas-confetti`

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

