import { Router } from 'express'
import {
  getProducts,
  getProductById,
  getDeals,
  getCategories,
} from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/deals/list', getDeals)
router.get('/categories/list', getCategories)
router.get('/:id', getProductById)

export default router
