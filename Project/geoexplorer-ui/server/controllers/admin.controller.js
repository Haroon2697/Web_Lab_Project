import User from '../models/User.js'
import GameSession from '../models/GameSession.js'
import { generateToken } from '../utils/generateToken.js'

// Admin Login
export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || user.role !== 'admin') return res.status(401).json({ message: 'Invalid admin credentials' })

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid admin credentials' })

    res.json({
      _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id)
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error during admin login' })
  }
}

// User Management
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({ role: 'user' }).select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' })
  }
}

export async function toggleBlockUser(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.isBlocked = !user.isBlocked
    await user.save()
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}`, isBlocked: user.isBlocked })
  } catch (err) {
    res.status(500).json({ message: 'Error toggling block status' })
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    await GameSession.deleteMany({ user: req.params.id })
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' })
  }
}

// Game Data
export async function getGameStats(req, res) {
  try {
    const totalSessions = await GameSession.countDocuments()
    const sessions = await GameSession.find().sort('-createdAt').limit(50).populate('user', 'name email')
    res.json({ totalSessions, sessions })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching game stats' })
  }
}

export async function deleteGameSession(req, res) {
  try {
    await GameSession.findByIdAndDelete(req.params.id)
    res.json({ message: 'Session deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting session' })
  }
}

// Analytics
export async function getAnalytics(req, res) {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' })
    const totalGames = await GameSession.countDocuments()
    
    const mostGuessed = await GameSession.aggregate([
      { $group: { _id: '$correctCountry', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    res.json({ totalUsers, totalGames, mostGuessed })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' })
  }
}

// Leaderboard control
export async function resetLeaderboard(req, res) {
  try {
    await User.updateMany({ role: 'user' }, { $set: { totalScore: 0, gamesPlayed: 0, highestScore: 0 } })
    res.json({ message: 'Leaderboard reset successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error resetting leaderboard' })
  }
}
