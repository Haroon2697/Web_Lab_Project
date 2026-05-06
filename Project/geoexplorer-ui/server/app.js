/**
 * Express application setup.
 * Mounts JSON parser, CORS, all route groups, and error handler.
 */
import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import gameRoutes from './routes/game.routes.js'
import leaderboardRoutes from './routes/leaderboard.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { rateLimiter } from './middleware/rateLimiter.js'

const app = express()

/* ── Middleware ─────────────────────────────────────────────── */
app.use(cors({ origin: config.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(rateLimiter)

/* ── Health check ──────────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'geoexplorer-server' })
})

/* ── API routes ────────────────────────────────────────────── */
app.use('/api/auth', authRoutes)
app.use('/api/game', gameRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

/* ── Error handler (must be last) ──────────────────────────── */
app.use(errorHandler)

export default app
