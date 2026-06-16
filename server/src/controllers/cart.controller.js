import User from '../models/User.js'
import Product from '../models/Product.js'
import { formatProduct } from '../utils/helpers.js'
import { AppError, catchAsync } from '../utils/catchAsync.js'

async function buildCartResponse(userId) {
  const user = await User.findById(userId).populate('cart.product')
  if (!user) throw new AppError('User not found', 404)

  const cartDetails = user.cart
    .filter(item => item.product)
    .map(item => ({
      ...formatProduct(item.product),
      qty: item.qty,
    }))

  const subtotal = cartDetails.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cartDetails.reduce((sum, i) => sum + i.qty, 0)

  return { cartDetails, subtotal, cartCount, items: user.cart }
}

export const getCart = catchAsync(async (req, res) => {
  const data = await buildCartResponse(req.user._id)
  res.json({ success: true, ...data })
})

export const addToCart = catchAsync(async (req, res) => {
  const { productId, qty = 1 } = req.body
  if (!productId) throw new AppError('productId is required', 400)

  const product = await Product.findOne({ sku: productId })
  if (!product) throw new AppError('Product not found', 404)
  if (!product.inStock) throw new AppError('Product out of stock', 400)

  const user = await User.findById(req.user._id)
  const existing = user.cart.find(i => i.product.toString() === product._id.toString())

  if (existing) {
    existing.qty += Number(qty)
  } else {
    user.cart.push({ product: product._id, qty: Number(qty) })
  }

  await user.save()
  const data = await buildCartResponse(req.user._id)
  res.json({ success: true, message: 'Added to cart', ...data })
})

export const updateCartItem = catchAsync(async (req, res) => {
  const { productId } = req.params
  const { qty } = req.body

  const product = await Product.findOne({ sku: productId })
  if (!product) throw new AppError('Product not found', 404)

  const user = await User.findById(req.user._id)
  const item = user.cart.find(i => i.product.toString() === product._id.toString())

  if (!item) throw new AppError('Item not in cart', 404)

  if (Number(qty) < 1) {
    user.cart = user.cart.filter(i => i.product.toString() !== product._id.toString())
  } else {
    item.qty = Number(qty)
  }

  await user.save()
  const data = await buildCartResponse(req.user._id)
  res.json({ success: true, ...data })
})

export const removeFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params
  const product = await Product.findOne({ sku: productId })
  if (!product) throw new AppError('Product not found', 404)

  const user = await User.findById(req.user._id)
  user.cart = user.cart.filter(i => i.product.toString() !== product._id.toString())
  await user.save()

  const data = await buildCartResponse(req.user._id)
  res.json({ success: true, ...data })
})

export const clearCart = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { cart: [] })
  res.json({ success: true, cartDetails: [], subtotal: 0, cartCount: 0 })
})

export const mergeCart = catchAsync(async (req, res) => {
  const { items = [] } = req.body
  const user = await User.findById(req.user._id)

  for (const { id, qty } of items) {
    const product = await Product.findOne({ sku: id })
    if (!product) continue

    const existing = user.cart.find(i => i.product.toString() === product._id.toString())
    if (existing) {
      existing.qty += Number(qty)
    } else {
      user.cart.push({ product: product._id, qty: Number(qty) })
    }
  }

  await user.save()
  const data = await buildCartResponse(req.user._id)
  res.json({ success: true, ...data })
})
