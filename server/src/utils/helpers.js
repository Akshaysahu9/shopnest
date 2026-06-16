export function formatProduct(doc) {
  if (!doc) return null
  const p = doc.toObject ? doc.toObject() : doc
  const specs = p.specs instanceof Map ? Object.fromEntries(p.specs) : (p.specs || {})
  return {
    id: p.sku,
    _id: p._id?.toString(),
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
    specs,
  }
}

export function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `SN${ts}${rand}`
}
