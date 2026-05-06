/**
 * Leaderboard API calls.
 */
import { api } from '../../services/axiosInstance'

const LB_URL = '/leaderboard'

/** GET /api/leaderboard */
export async function getLeaderboardAPI(limit = 20) {
  const { data } = await api.get(LB_URL, { params: { limit } })
  return data
}

/** GET /api/leaderboard/me */
export async function getMyRankAPI() {
  const { data } = await api.get(`${LB_URL}/me`)
  return data
}
