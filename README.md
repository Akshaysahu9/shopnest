# ShopNest — Full-Stack E-Commerce

React frontend + Node.js/Express REST API + MongoDB.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |

## Features

- User registration & login
- Product catalog from database (search, category, deals)
- Server-side cart (logged-in users)
- Guest cart (localStorage fallback)
- Order placement & order history
- Input validation, rate limiting, helmet security

## Setup

### 1. MongoDB

**Option A — Local:** Install [MongoDB Community](https://www.mongodb.com/try/download/community) and run it.

**Option B — Cloud (free):** [MongoDB Atlas](https://www.mongodb.com/atlas) → create cluster → copy connection string into `server/.env`:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopnest
```

### 2. Install & Run

**Easiest:** Double-click `START.bat`

**Or manually:**
```bash
npm install
cd server && npm install && cd ..
npm run dev:all
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health

### Demo Login
```
Email: demo@shopnest.com
Password: demo123
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Login, get JWT |
| GET | /api/auth/me | ✓ | Current user |
| GET | /api/products | — | List/search products |
| GET | /api/products/:id | — | Product detail |
| GET | /api/products/deals/list | — | Deals |
| GET | /api/cart | ✓ | Get cart |
| POST | /api/cart | ✓ | Add to cart |
| POST | /api/orders | ✓ | Place order |
| GET | /api/orders | ✓ | My orders |

## Project Structure

```
shopnest/
├── src/              # React frontend
├── server/
│   └── src/
│       ├── models/   # User, Product, Order
│       ├── routes/
│       ├── controllers/
│       └── middleware/
└── START.bat
```

## Resume Line

> Built a full-stack e-commerce platform with React, Node.js/Express REST API, MongoDB, and JWT authentication — featuring product catalog, cart management, and order processing.
