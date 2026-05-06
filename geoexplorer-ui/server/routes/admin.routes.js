import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import { adminOnly } from '../middleware/adminOnly.js'
import * as adminCtrl from '../controllers/admin.controller.js'

const router = Router()

router.post('/login', adminCtrl.adminLogin)

router.use(protect, adminOnly)

router.get('/users', adminCtrl.getAllUsers)
router.put('/users/:id/block', adminCtrl.toggleBlockUser)
router.delete('/users/:id', adminCtrl.deleteUser)

router.get('/games', adminCtrl.getGameStats)
router.delete('/games/:id', adminCtrl.deleteGameSession)

router.get('/analytics', adminCtrl.getAnalytics)

router.post('/leaderboard/reset', adminCtrl.resetLeaderboard)

export default router
