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
// Dev-friendly CORS: allow both Vite defaults and configured CLIENT_URL.
const DEV_ALLOWED_ORIGINS = new Set([
  config.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5175',
])

app.use(
  cors({
    origin(origin, cb) {
      // allow non-browser tools (no Origin header)
      if (!origin) return cb(null, true)
      // Allow any localhost/127.0.0.1 port in development (Vite can auto-bump ports).
      if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true)
      if (DEV_ALLOWED_ORIGINS.has(origin)) return cb(null, true)
      return cb(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  }),
)
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
