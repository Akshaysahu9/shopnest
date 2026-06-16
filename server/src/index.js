import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/validate.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import Product from './models/Product.js'
import User from './models/User.js'
import { products } from '../../src/data/products.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, try again later' },
}))

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ShopNest API is running', time: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

async function autoSeed() {
  const docs = products.map(p => ({
    sku: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    mrp: p.mrp,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    images: p.images || [],
    badge: p.badge,
    prime: p.prime,
    inStock: p.inStock,
    delivery: p.delivery,
    description: p.description,
    features: p.features || [],
    specs: p.specs || {},
  }))

  for (const doc of docs) {
    await Product.findOneAndUpdate({ sku: doc.sku }, { $set: doc }, { upsert: true })
  }
  console.log(`Catalog synced: ${docs.length} products`)

  const demo = await User.findOne({ email: 'demo@shopnest.com' })
  if (!demo) {
    await User.create({ name: 'Demo User', email: 'demo@shopnest.com', password: 'demo123' })
    console.log('Demo account: demo@shopnest.com / demo123')
  }
}

async function start() {
  await connectDB()
  await autoSeed()

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Health check: http://localhost:${PORT}/api/health`)
  })
}

start().catch(err => {
  console.error('Failed to start server:', err.message)
  process.exit(1)
})
