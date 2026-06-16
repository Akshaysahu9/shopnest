import { Router } from 'express'
import { createOrder, getMyOrders, getOrderById } from '../controllers/order.controller.js'
import { protect } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { orderRules } from '../middleware/rules.js'

const router = Router()

router.use(protect)

router.post('/', orderRules, validate, createOrder)
router.get('/', getMyOrders)
router.get('/:id', getOrderById)

export default router
