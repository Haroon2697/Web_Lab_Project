/**
 * Auth controller — register & login.
 */
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

/**
 * POST /api/auth/register
 * @body { name, email, password }
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    // Create user (password auto-hashed by pre-save hook)
    const user = await User.create({ name, email, password })

    const token = generateToken(user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      highestScore: user.highestScore,
      avatar: user.avatar,
      createdAt: user.createdAt,
      token,
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: err.message || 'Server error during registration' })
  }
}

/**
 * POST /api/auth/login
 * @body { email, password }
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      highestScore: user.highestScore,
      avatar: user.avatar,
      createdAt: user.createdAt,
      token,
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: err.message || 'Server error during login' })
  }
}
