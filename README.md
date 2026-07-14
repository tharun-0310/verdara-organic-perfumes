# VERDARA ORGANIC PERFUMES

> Premium 3D interactive organic fragrance e-commerce website.  
> Built with React + Three.js (frontend) and Node.js + MongoDB (backend).

---

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env          # Edit MongoDB URI and JWT secret
npm install
npm run seed                  # Seeds 6 Verdara perfumes into MongoDB
npm run dev                   # Start API server (port 5000)
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env          # Confirm VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                   # Start dev server (port 5173)
```

Open: **http://localhost:5173**

---

## Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 + Vite | UI framework + build tool |
| Three.js + R3F | WebGL 3D rendering |
| @react-three/drei | Three.js helpers |
| GSAP + ScrollTrigger | Scroll-based animations |
| Framer Motion | Component transitions |
| Lenis | Smooth scrolling |
| Tailwind CSS | Utility styling |
| Zustand | State management |
| Axios | API client |
| React Router DOM | Client-side routing |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database + ODM |
| JWT + bcryptjs | Authentication |
| Helmet | Security headers |
| Morgan | HTTP logging |
| Express Rate Limit | Rate limiting |
| Multer | File uploads |

---

## Folder Structure

```
verdara-organic-perfumes/
├── frontend/
│   ├── public/assets/         ← Static images, textures, models
│   ├── src/
│   │   ├── components/        ← Reusable UI components
│   │   ├── pages/             ← Route-level pages
│   │   ├── sections/          ← Homepage sections
│   │   ├── three/             ← All WebGL / Three.js code
│   │   ├── context/           ← Zustand stores
│   │   ├── data/              ← Fragrance definitions
│   │   ├── services/          ← Axios API client
│   │   └── utils/             ← Helpers, Lenis, ScrollToTop
│   └── ...
├── backend/
│   ├── src/
│   │   ├── config/            ← MongoDB connection
│   │   ├── controllers/       ← Route handlers
│   │   ├── middleware/        ← Auth, validators
│   │   ├── models/            ← Mongoose schemas
│   │   └── routes/            ← Express routers
│   ├── scripts/seedProducts.js
│   └── ...
├── ASSET_SETUP.md             ← Asset placement guide
└── README.md
```

---

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/verdara-organic-perfumes
JWT_SECRET=replace_with_a_very_long_secure_random_secret_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## MongoDB Setup

### Local MongoDB
1. Install [MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start `mongod` service
3. Set `MONGODB_URI=mongodb://127.0.0.1:27017/verdara-organic-perfumes`

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (M0 tier)
3. Under **Database Access** — create a user with read/write permissions
4. Under **Network Access** — add your IP address (or `0.0.0.0/0` for development)
5. Click **Connect → Drivers → Node.js** — copy the connection string
6. Replace `<password>` in the string, add `/verdara-organic-perfumes` before the `?`
7. Paste the full URI as `MONGODB_URI` in `backend/.env`

```
mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/verdara-organic-perfumes?retryWrites=true&w=majority&appName=Cluster0
```

---

## API Routes

| Method | Route | Auth |
|--------|-------|------|
| GET | /api/health | — |
| POST | /api/auth/register | — |
| POST | /api/auth/login | — |
| GET | /api/auth/profile | JWT |
| GET | /api/products | — |
| GET | /api/products/featured | — |
| GET | /api/products/:slug | — |
| POST | /api/products | Admin |
| GET | /api/products/:id/reviews | — |
| POST | /api/products/:id/reviews | JWT |
| POST | /api/orders | JWT |
| GET | /api/orders/my-orders | JWT |
| POST | /api/newsletter/subscribe | — |
| POST | /api/contact | — |

---

## Asset Setup

See **ASSET_SETUP.md** for instructions on where to place product images, textures, HDR environments, and 3D models.

The application ships with **procedural 3D bottle geometry** and gradient placeholders, so it runs without any external assets.

---

## Development Commands

```bash
# Backend
npm run dev          # Nodemon dev server
npm start            # Production server
npm run seed         # Seed database

# Frontend
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
```

---

## Production Build

```bash
# Frontend
cd frontend && npm run build   # Output: frontend/dist/

# Backend — set NODE_ENV=production in .env
cd backend && npm start
```

Serve `frontend/dist/` via Nginx, Vercel, or Netlify.  
Deploy backend to Railway, Render, or a VPS.
