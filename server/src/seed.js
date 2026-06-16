import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import Product from './models/Product.js'
import User from './models/User.js'
import { products } from '../../src/data/products.js'

dotenv.config()

async function seed() {
  await connectDB()

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
  console.log(`Synced ${docs.length} products`)

  const demo = await User.findOne({ email: 'demo@shopnest.com' })
  if (!demo) {
    await User.create({
      name: 'Demo User',
      email: 'demo@shopnest.com',
      password: 'demo123',
    })
    console.log('Demo user created: demo@shopnest.com / demo123')
  }

  await mongoose.disconnect()
  console.log('Seed complete')
}

seed().catch(err => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
