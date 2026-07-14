# Verdara Organic Perfumes — Backend API

Node.js + Express.js + MongoDB REST API powering the Verdara e-commerce platform.

## Quick Start

```bash
cd backend
cp .env.example .env      # Paste your Atlas URI into MONGODB_URI
npm install
npm run seed              # Populate database with 6 perfumes
npm run dev               # Start dev server with nodemon
```

Server runs on: http://localhost:5000  
Health check: http://localhost:5000/api/health

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0)
3. Under **Database Access** → create a user with read/write permissions
4. Under **Network Access** → add your IP (or `0.0.0.0/0` for dev)
5. Click **Connect** → **Drivers** → copy the Node.js connection string
6. Paste it into your `.env` as `MONGODB_URI`, replacing `<password>` and adding `/verdara-organic-perfumes` before the `?`

Example URI format:
```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/verdara-organic-perfumes?retryWrites=true&w=majority&appName=Cluster0
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/health | — | Server health status |
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Login |
| GET | /api/auth/profile | JWT | Get user profile |
| PUT | /api/auth/profile | JWT | Update profile |
| GET | /api/products | — | List products (search, filter, sort, paginate) |
| GET | /api/products/featured | — | Featured products |
| GET | /api/products/:slug | — | Single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| GET | /api/products/:id/reviews | — | Product reviews |
| POST | /api/products/:id/reviews | JWT | Submit review |
| POST | /api/orders | JWT | Place order |
| GET | /api/orders/my-orders | JWT | User's orders |
| GET | /api/orders/:id | JWT | Single order |
| POST | /api/newsletter/subscribe | — | Newsletter signup |
| POST | /api/contact | — | Contact form |

## Environment Variables

See `.env.example` for all required variables.
