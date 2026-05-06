/**
 * Leaderboard controller — global rankings & user rank.
 */
import User from '../models/User.js'

/**
 * GET /api/leaderboard
 * @query limit (default 20)
 */
export async function getLeaderboard(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100)

    const players = await User.find({ role: 'user', gamesPlayed: { $gt: 0 } })
      .select('name email totalScore gamesPlayed highestScore avatar')
      .sort({ totalScore: -1 })
      .limit(limit)
      .lean()

    // Attach rank
    const leaderboard = players.map((p, i) => ({
      rank: i + 1,
      ...p,
    }))

    res.json({ leaderboard })
  } catch (err) {
    console.error('getLeaderboard error:', err)
    res.status(500).json({ message: 'Failed to fetch leaderboard' })
  }
}

/**
 * GET /api/leaderboard/me   (protected)
 * Returns current user's rank and stats.
 */
export async function getMyRank(req, res) {
  try {
    const userId = req.user._id

    const user = await User.findById(userId)
      .select('name totalScore gamesPlayed highestScore')
      .lean()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Count how many users have a higher total score
    const rank =
      (await User.countDocuments({
        role: 'user',
        totalScore: { $gt: user.totalScore },
      })) + 1

    res.json({ rank, ...user })
  } catch (err) {
    console.error('getMyRank error:', err)
    res.status(500).json({ message: 'Failed to fetch rank' })
  }
}
