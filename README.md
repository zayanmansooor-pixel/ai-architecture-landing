# The Architecture of Machine Mind

An immersive, interactive 3D landing page exploring the cognition, capacity, and evolution of Artificial Intelligence. Built with React 19, Vite, Tailwind CSS, and React Three Fiber (Three.js).

![3D AI Landing Page](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-black?logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)

## Features

- **Immersive 3D Background** - Interactive brain network visualization with 300 particle nodes and dynamic connections
- **Scroll-Driven Camera** - 4 distinct visual phases with smooth camera transitions as you scroll
- **Glassmorphic Bento Grid** - Hero section with frosted glass cards and neon cyan/violet accents
- **Historical Timeline** - Vertical scroll timeline of AI milestones (1950-2012)
- **Workflow Mechanics** - Core AI operational loops with animated connections
- **Generations Matrix** - Interactive multi-tab component showcasing AI 1.0 through 4.0
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **60fps Performance** - Optimized with InstancedMesh, requestAnimationFrame, and efficient scroll tracking

## Tech Stack

- **React 19** + TypeScript + Vite
- **React Three Fiber** - 3D rendering engine
- **Tailwind CSS** - Utility-first styling with glassmorphism
- **Lucide React** - Icon library
- **shadcn/ui** - UI component foundation

## 3D Visual Phases

| Phase | Section | 3D Behavior |
|-------|---------|-------------|
| 1 | Hero | Wide view, slow Y-axis rotation |
| 2 | Timeline | Zoomed in, focused on clusters |
| 3 | Workflow | Side angle, pulsing scale effect |
| 4 | Generations | Geometry morph from network to sphere |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/zayanmansooor-pixel/ai-architecture-landing.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/
    BrainNetwork.tsx    # 3D scene with particles & connections
    SceneCanvas.tsx     # React Three Fiber canvas wrapper
  sections/
    HeroSection.tsx     # Hero with Bento Grid cards
    TimelineSection.tsx # Historical timeline
    WorkflowSection.tsx # AI workflow mechanics
    GenerationsSection.tsx # AI generations matrix
  hooks/
    useScrollPhase.ts   # Scroll tracking & phase detection
  App.tsx               # Root component
  index.css             # Global styles & glassmorphism
```

## Performance Optimizations

- `useFrame` hook for smooth camera lerping based on scroll position
- Efficient scroll tracking with `requestAnimationFrame` throttling
- Lazy-loaded 3D canvas via React `Suspense`
- Additive blending and depth write optimizations for particles
- Code-split Three.js bundle (loaded on demand)

## License

MIT
