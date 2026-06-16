import { Router } from 'express'
import { register, login, getMe, updateProfile } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { registerRules, loginRules } from '../middleware/rules.js'

const router = Router()

router.post('/register', registerRules, validate, register)
router.post('/login', loginRules, validate, login)
router.get('/me', protect, getMe)
router.patch('/me', protect, updateProfile)

export default router
