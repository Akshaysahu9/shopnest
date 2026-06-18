# 🛒 ShopNest – Full-Stack E-Commerce Platform

ShopNest is a modern full-stack e-commerce platform inspired by leading online marketplaces. It provides a complete shopping experience with secure authentication, product discovery, cart management, and order processing.

Built using React, Node.js, Express, MongoDB, and JWT Authentication, the platform demonstrates real-world full-stack development practices and scalable application architecture.

---

## 🌐 Live Demo

🔗 https://shopnest-omega.vercel.app/

---

## 🚀 Key Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT-Based Authentication
* Password Hashing with bcrypt
* Protected Routes
* Rate Limiting
* Helmet Security Middleware
* Input Validation & Sanitization

### 🛍️ Product Catalog

* Dynamic Product Listing
* Product Details Page
* Category-Based Browsing
* Product Search Functionality
* Special Deals & Offers
* Database-Driven Product Management

### 🛒 Shopping Cart

* Server-Side Cart for Authenticated Users
* Guest Cart using Local Storage
* Add/Remove Products
* Quantity Management
* Persistent Shopping Experience

### 📦 Order Management

* Order Placement
* Order History Tracking
* User Order Dashboard
* Purchase Summary

### 📱 User Experience

* Responsive Design
* Fast Navigation
* Modern UI Components
* Mobile-Friendly Layout

---

## 🎯 Project Highlights

* Full Stack MERN Application
* RESTful API Architecture
* JWT Authentication System
* MongoDB Database Integration
* Cart & Order Management System
* Secure Backend Implementation
* Responsive Frontend Design
* Production Deployment

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Security

* Helmet
* Express Rate Limit
* Input Validation

### Deployment

* Vercel (Frontend)

---

## 🏗️ System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express REST API
 │
 ├──────────────┬──────────────┬──────────────┐
 ▼              ▼              ▼              ▼
Auth         Products        Cart         Orders
 │              │              │              │
 └──────────────┴──────────────┴──────────────┘
                     │
                     ▼
                  MongoDB
```

---

## 📷 Screenshots

### 🏠 Homepage



### 🛍️ Product Catalog



### 📦 Product Details



### 🛒 Shopping Cart



### 📋 Order History



### 🔐 Authentication

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Akshaysahu9/shopnest.git
```

### Install Dependencies

```bash
npm install
```

### Backend Setup

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Start Development Server

```bash
npm run dev:all
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000/api/health
```

---

## 🧪 Demo Credentials

```text
Email: demo@shopnest.com
Password: demo123
```

---

## 📡 REST API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Products

* GET `/api/products`
* GET `/api/products/:id`
* GET `/api/products/deals/list`

### Cart

* GET `/api/cart`
* POST `/api/cart`

### Orders

* POST `/api/orders`
* GET `/api/orders`

---

## 📂 Project Structure

```text
shopnest/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
│
├── server/
│   └── src/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       └── config/
│
└── START.bat
```

---

## 🎓 Learning Outcomes

* Full Stack Development
* REST API Design
* Authentication & Authorization
* MongoDB Database Design
* Secure Backend Development
* State Management
* Deployment & Production Practices

---

## 🔮 Future Enhancements

* Payment Gateway Integration
* Admin Dashboard
* Product Reviews & Ratings
* Wishlist Functionality
* Inventory Management
* Order Tracking
* Recommendation Engine
* AI Product Search

---

## 👨‍💻 Author

**Akshay Sahu**

B.Tech Computer Science Engineering

📧 [Akshayguptasahu@gmail.com](mailto:Akshayguptasahu@gmail.com)

💼 LinkedIn: https://linkedin.com/in/akshay-gupta-97b6323a7

🐙 GitHub: https://github.com/Akshaysahu9

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

### Built with ❤️ using React, Node.js, Express, MongoDB, and Modern Web Technologies.
