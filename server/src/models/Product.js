import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  rating: { type: Number, default: 4 },
  reviews: { type: Number, default: 0 },
  image: String,
  images: [String],
  badge: { type: String, default: null },
  prime: { type: Boolean, default: true },
  inStock: { type: Boolean, default: true },
  delivery: { type: String, default: 'Tomorrow' },
  description: String,
  features: [String],
  specs: { type: Map, of: String },
}, { timestamps: true })

productSchema.index({ title: 'text', description: 'text', category: 'text' })

export default mongoose.model('Product', productSchema)
