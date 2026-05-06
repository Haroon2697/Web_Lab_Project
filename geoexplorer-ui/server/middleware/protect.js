/**
 * JWT authentication middleware.
 * Verifies the Bearer token and attaches req.user = { id, email }.
 */
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'
import User from '../models/User.js'

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized — no token' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.JWT_SECRET)

    // Attach user (without password) to request
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Not authorized — user not found' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized — token invalid' })
  }
}
