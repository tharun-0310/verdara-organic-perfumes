# Verdara Organic Perfumes — Frontend

React + Vite + Three.js premium 3D e-commerce frontend.

## Quick Start

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs on: http://localhost:5173

## Tech Stack

- React 18 + Vite
- Three.js + React Three Fiber + @react-three/drei
- GSAP + ScrollTrigger (scroll animations)
- Framer Motion (component transitions)
- Lenis (smooth scrolling)
- Tailwind CSS
- Zustand (state management)
- Axios (API client)
- React Router DOM

## Key Files

| Path | Purpose |
|------|---------|
| src/three/models/PerfumeBottle3D.jsx | Reusable procedural 3D bottle |
| src/three/scenes/MainCanvas.jsx | Global persistent WebGL canvas |
| src/three/scenes/ProductBottleCanvas.jsx | Per-product page canvas |
| src/context/StoreContext.jsx | Zustand stores (auth, cart, scene, UI) |
| src/data/fragrances.js | All 6 fragrance definitions + 3D colors |
| src/services/api.js | Axios API client |
| src/utils/LenisProvider.jsx | Smooth scroll setup |
