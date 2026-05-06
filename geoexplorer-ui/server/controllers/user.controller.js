/**
 * User controller — profile endpoints for user panel.
 */
import User from '../models/User.js'

/**
 * GET /api/users/me
 * Returns currently authenticated user profile.
 */
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password').lean()
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
  } catch (err) {
    console.error('getMe error:', err)
    return res.status(500).json({ message: 'Failed to fetch profile' })
  }
}

/**
 * PUT /api/users/me
 * @body { name?, avatar? }
 */
export async function updateMe(req, res) {
  try {
    const { name, avatar } = req.body

    const updates = {}
    if (typeof name === 'string' && name.trim()) updates.name = name.trim()
    if (typeof avatar === 'string') updates.avatar = avatar

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true },
    ).select('-password')

    if (!updated) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json(updated)
  } catch (err) {
    console.error('updateMe error:', err)
    return res.status(500).json({ message: 'Failed to update profile' })
  }
}
