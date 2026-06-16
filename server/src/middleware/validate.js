import { validationResult } from 'express-validator'
import { AppError } from '../utils/catchAsync.js'

export function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join(', ')
    return next(new AppError(msg, 400))
  }
  next()
}

export function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500
  let message = err.message || 'Something went wrong'

  if (err.code === 11000) {
    status = 400
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    message = `${field} already exists`
  }

  if (err.name === 'ValidationError') {
    status = 400
    message = Object.values(err.errors).map(e => e.message).join(', ')
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  res.status(status).json({
    success: false,
    message,
  })
}

export function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404))
}
