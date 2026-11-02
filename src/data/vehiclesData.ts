export type VehicleId = 'pickup' | 'sports' | 'offroad' | 'kart' | 'roadster' | 'van';

export interface VehicleConfig {
  id: VehicleId;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stats: {
    speed: number;        // 0 - 100
    acceleration: number; // 0 - 100
    handling: number;     // 0 - 100
    drift: number;        // 0 - 100
  };
  physics: {
    maxSpeed: number;
    acceleration: number;
    turnSpeed: number;
    damping: number;
    bodyMass: number;
  };
  defaultColor: string;
  colorPalette: string[];
}

export const VEHICLES_DATA: Record<VehicleId, VehicleConfig> = {
  pickup: {
    id: 'pickup',
    name: 'Classic Pickup',
    category: 'Iconic Utility',
    tagline: 'The Balanced Playground Icon',
    description: 'Sturdy, all-terrain utility truck with dependable handling, responsive drifting, and legendary reliability.',
    stats: {
      speed: 78,
      acceleration: 80,
      handling: 85,
      drift: 82
    },
    physics: {
      maxSpeed: 23,
      acceleration: 42,
      turnSpeed: 2.8,
      damping: 0.96,
      bodyMass: 1.0
    },
    defaultColor: '#f97316',
    colorPalette: ['#f97316', '#ef4444', '#0284c7', '#10b981', '#facc15', '#1e293b']
  },

  sports: {
    id: 'sports',
    name: 'Apex Sports Coupe',
    category: 'Supercar Track',
    tagline: 'Pure Track Velocity & Razor Aerodynamics',
    description: 'Low-slung wedge silhouette with aggressive downforce, ferocious straight-line speed, and sharp apex cornering.',
    stats: {
      speed: 98,
      acceleration: 92,
      handling: 80,
      drift: 75
    },
    physics: {
      maxSpeed: 28,
      acceleration: 52,
      turnSpeed: 3.2,
      damping: 0.95,
      bodyMass: 0.85
    },
    defaultColor: '#dc2626',
    colorPalette: ['#dc2626', '#0284c7', '#eab308', '#18181b', '#f8fafc', '#a855f7']
  },

  offroad: {
    id: 'offroad',
    name: 'Terra 4x4 Crawler',
    category: 'All-Terrain 4x4',
    tagline: 'Heavy-Duty Mountain Ridge Dominator',
    description: 'Lifted suspension, oversized knobby tires, roof rack and bull bar built to scale slopes and crush obstacles.',
    stats: {
      speed: 68,
      acceleration: 86,
      handling: 74,
      drift: 65
    },
    physics: {
      maxSpeed: 20,
      acceleration: 46,
      turnSpeed: 2.5,
      damping: 0.94,
      bodyMass: 1.3
    },
    defaultColor: '#15803d',
    colorPalette: ['#15803d', '#ca8a04', '#475569', '#c2410c', '#0f172a', '#e2e8f0']
  },

  kart: {
    id: 'kart',
    name: 'Lightning Go-Kart',
    category: 'Formula Kart',
    tagline: 'Instantaneous Throttle & Zero-Radius Turn',
    description: 'Ultra-light open-frame racer with floor-level center of gravity, lightning steering reaction, and playful drift arcs.',
    stats: {
      speed: 84,
      acceleration: 96,
      handling: 98,
      drift: 92
    },
    physics: {
      maxSpeed: 25,
      acceleration: 58,
      turnSpeed: 3.8,
      damping: 0.97,
      bodyMass: 0.7
    },
    defaultColor: '#eab308',
    colorPalette: ['#eab308', '#06b6d4', '#ec4899', '#84cc16', '#6366f1', '#18181b']
  },

  roadster: {
    id: 'roadster',
    name: 'Monterey Roadster',
    category: 'Vintage Cruiser',
    tagline: 'Timeless Open-Cockpit Boulevard Luxury',
    description: 'Sculpted retro fenders, chrome accents, and open-air two-seater cockpit tuned for smooth boulevard cruising.',
    stats: {
      speed: 82,
      acceleration: 76,
      handling: 86,
      drift: 72
    },
    physics: {
      maxSpeed: 24,
      acceleration: 40,
      turnSpeed: 2.9,
      damping: 0.95,
      bodyMass: 0.95
    },
    defaultColor: '#0284c7',
    colorPalette: ['#0284c7', '#991b1b', '#065f46', '#f8fafc', '#78350f', '#0f172a']
  },

  van: {
    id: 'van',
    name: 'Metro Delivery Van',
    category: 'Urban Utility',
    tagline: 'Charming Retro Courier with Massive Momentum',
    description: 'Boxy delivery van with dual rear cargo doors, tall visibility visor, and robust collision momentum.',
    stats: {
      speed: 70,
      acceleration: 72,
      handling: 72,
      drift: 60
    },
    physics: {
      maxSpeed: 21,
      acceleration: 38,
      turnSpeed: 2.6,
      damping: 0.93,
      bodyMass: 1.4
    },
    defaultColor: '#8b5cf6',
    colorPalette: ['#8b5cf6', '#f97316', '#14b8a6', '#f43f5e', '#3b82f6', '#334155']
  }
};

export const VEHICLE_LIST = Object.values(VEHICLES_DATA);

