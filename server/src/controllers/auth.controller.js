import User from '../models/User.js'
import { signToken } from '../middleware/auth.js'
import { AppError, catchAsync } from '../utils/catchAsync.js'

function sendUser(user, res, status = 200, token) {
  const payload = {
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
  if (token) payload.token = token
  res.status(status).json(payload)
}

export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body

  const exists = await User.findOne({ email })
  if (exists) throw new AppError('Email already registered', 400)

  const user = await User.create({ name, email, password })
  const token = signToken(user._id)
  sendUser(user, res, 201, token)
})

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = signToken(user._id)
  sendUser(user, res, 200, token)
})

export const getMe = catchAsync(async (req, res) => {
  sendUser(req.user, res)
})

export const updateProfile = catchAsync(async (req, res) => {
  const { name } = req.body
  if (name) req.user.name = name
  await req.user.save()
  sendUser(req.user, res)
})
