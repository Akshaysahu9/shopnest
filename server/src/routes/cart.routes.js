import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart,
} from '../controllers/cart.controller.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/', getCart)
router.post('/', addToCart)
router.post('/merge', mergeCart)
router.put('/:productId', updateCartItem)
router.delete('/:productId', removeFromCart)
router.delete('/', clearCart)

export default router
