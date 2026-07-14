# Verdara Asset Setup Guide

## Overview

The Verdara website currently runs using **procedural 3D geometry** and CSS/gradient placeholders. No external images are required for the application to run.

When you have legally licensed product images and textures, place them in the paths below and the application will automatically use them.

---

## Product Images

Place product photography in:
```
frontend/public/assets/products/
```

Expected filenames (referenced by the API seed data):
```
forest-dew-1.webp
forest-dew-2.webp
rose-veil-1.webp
rose-veil-2.webp
citrus-bloom-1.webp
citrus-bloom-2.webp
ocean-mist-1.webp
ocean-mist-2.webp
lavender-haze-1.webp
lavender-haze-2.webp
golden-oud-1.webp
golden-oud-2.webp
```

**Recommended dimensions:** 800×1067px (3:4 ratio), WebP format, under 200KB each.

---

## Brand & UI Images

```
frontend/public/assets/images/
```

Suggested assets:
- `hero-bg.webp` — Full viewport hero background
- `about-hero.webp` — About page banner
- `logo.svg` — Verdara vector logo
- `favicon.svg` — Browser favicon

---

## Botanical Textures & Overlays

```
frontend/public/assets/botanicals/
```

Suggested assets:
- `leaf-01.png` — Transparent PNG leaf for parallax
- `petal-01.png` — Rose petal overlay
- `branch-01.svg` — Botanical SVG branch

---

## Three.js Textures

```
frontend/public/assets/textures/
```

For bottle glass realism:
- `glass-normal.jpg` — Normal map for glass
- `matcap-gold.jpg` — Matcap texture for gold cap
- `env-forest.hdr` — HDR environment for Forest Dew
- `env-rose.hdr` — HDR environment for Rose Veil
- `env-ocean.hdr` — HDR environment for Ocean Mist

**Free HDR sources:** [Poly Haven](https://polyhaven.com/hdris) (CC0 licensed)

---

## 3D Models (Optional Upgrade)

```
frontend/public/assets/models/
```

If you have a custom Draco-compressed GLB bottle model:
- `verdara-bottle.glb`

Update `PerfumeBottle3D.jsx` to load it via:
```jsx
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/assets/models/verdara-bottle.glb');
```

**Free 3D model sources:** [Sketchfab](https://sketchfab.com) (filter by license)

---

## Image Sourcing Guidelines

- Never hotlink Pinterest, Instagram, or stock photo URLs in production
- Use your own product photography or properly licensed stock images
- Recommended sources: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com), [Pixabay](https://pixabay.com)
- For commercial use, consider [Shutterstock](https://shutterstock.com) or [Adobe Stock](https://stock.adobe.com)

---

## Environment Videos (Optional)

```
frontend/public/assets/videos/
frontend/public/assets/environment/
```

- `forest-loop.mp4` — Forest environment video loop
- `ocean-loop.mp4` — Ocean environment video loop
