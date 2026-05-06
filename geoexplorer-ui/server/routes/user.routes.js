/**
 * User routes — /api/users
 */
import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import { getMe, updateMe } from '../controllers/user.controller.js'

const router = Router()

router.get('/me', protect, getMe)
router.put('/me', protect, updateMe)

export default router
