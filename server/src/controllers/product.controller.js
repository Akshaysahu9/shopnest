import Product from '../models/Product.js'
import { formatProduct } from '../utils/helpers.js'
import { AppError, catchAsync } from '../utils/catchAsync.js'

export const getProducts = catchAsync(async (req, res) => {
  const {
    category,
    search,
    deals,
    minPrice,
    maxPrice,
    page = 1,
    limit = 100,
    sort = 'featured',
  } = req.query

  const filter = { inStock: true }

  if (category) filter.category = category

  if (deals === 'true') {
    filter.$expr = { $gt: ['$mrp', '$price'] }
  }

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
  }

  let query = Product.find(filter)

  if (search) {
    query = Product.find({
      ...filter,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    })
  }

  const sortMap = {
    featured: { reviews: -1 },
    'price-low': { price: 1 },
    'price-high': { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 },
  }

  query = query.sort(sortMap[sort] || sortMap.featured)

  const skip = (Number(page) - 1) * Number(limit)
  const [items, total] = await Promise.all([
    query.skip(skip).limit(Number(limit)),
    Product.countDocuments(search ? {
      ...filter,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    } : filter),
  ])

  res.json({
    success: true,
    count: items.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    products: items.map(formatProduct),
  })
})

export const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ sku: id }) || await Product.findById(id)

  if (!product) throw new AppError('Product not found', 404)

  const related = await Product.find({
    category: product.category,
    sku: { $ne: product.sku },
    inStock: true,
  }).limit(6)

  res.json({
    success: true,
    product: formatProduct(product),
    related: related.map(formatProduct),
  })
})

export const getDeals = catchAsync(async (req, res) => {
  const products = await Product.find({
    inStock: true,
    $expr: { $gt: ['$mrp', '$price'] },
  })

  products.sort((a, b) => {
    const discA = (a.mrp - a.price) / a.mrp
    const discB = (b.mrp - b.price) / b.mrp
    return discB - discA
  })

  res.json({
    success: true,
    count: products.length,
    products: products.map(formatProduct),
  })
})

export const getCategories = catchAsync(async (req, res) => {
  const cats = await Product.aggregate([
    { $match: { inStock: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  res.json({
    success: true,
    categories: cats.map(c => ({ slug: c._id, count: c.count })),
  })
})
