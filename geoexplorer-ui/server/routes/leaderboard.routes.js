/**
 * Leaderboard routes — /api/leaderboard
 */
import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import { getLeaderboard, getMyRank } from '../controllers/leaderboard.controller.js'

const router = Router()

router.get('/', getLeaderboard)
router.get('/me', protect, getMyRank)

export default router
