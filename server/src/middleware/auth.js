import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { AppError } from '../utils/catchAsync.js'

export function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

export function protect(req, res, next) {
  const header = req.headers.authorization
  let token

  if (header?.startsWith('Bearer ')) {
    token = header.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Please log in to continue', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    User.findById(decoded.id)
      .then(user => {
        if (!user) return next(new AppError('User no longer exists', 401))
        req.user = user
        next()
      })
      .catch(next)
  } catch {
    next(new AppError('Invalid or expired token', 401))
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return next()

  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    User.findById(decoded.id)
      .then(user => {
        if (user) req.user = user
        next()
      })
      .catch(() => next())
  } catch {
    next()
  }
}
