import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { generateOrderNumber } from '../utils/helpers.js'
import { AppError, catchAsync } from '../utils/catchAsync.js'

export const createOrder = catchAsync(async (req, res) => {
  const { shippingAddress, paymentMethod = 'cod' } = req.body

  const user = await User.findById(req.user._id).populate('cart.product')
  if (!user.cart.length) throw new AppError('Cart is empty', 400)

  const orderItems = user.cart
    .filter(item => item.product)
    .map(item => ({
      product: item.product._id,
      sku: item.product.sku,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      qty: item.qty,
    }))

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const total = subtotal + deliveryFee

  const order = await Order.create({
    user: user._id,
    orderNumber: generateOrderNumber(),
    items: orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    deliveryFee,
    total,
    status: 'placed',
  })

  user.cart = []
  await user.save()

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    order: {
      id: order._id,
      orderNumber: order.orderNumber,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    },
  })
})

export const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select('-__v')

  res.json({ success: true, count: orders.length, orders })
})

export const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  })

  if (!order) throw new AppError('Order not found', 404)

  res.json({ success: true, order })
})
