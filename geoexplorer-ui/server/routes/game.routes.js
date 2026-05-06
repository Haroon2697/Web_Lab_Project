/**
 * Game routes — /api/game
 */
import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import { startGame, submitGuess, getHistory } from '../controllers/game.controller.js'

const router = Router()

router.post('/start', protect, startGame)
router.post('/submit', protect, submitGuess)
router.get('/history', protect, getHistory)

export default router
