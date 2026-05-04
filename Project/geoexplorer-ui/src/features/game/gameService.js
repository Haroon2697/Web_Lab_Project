/**
 * Game API calls.
 */
import { api } from '../../services/axiosInstance'

const GAME_URL = '/game'

/** POST /api/game/start */
export async function startGameAPI(difficulty = 'medium') {
  const { data } = await api.post(`${GAME_URL}/start`, { difficulty })
  return data
}

/** POST /api/game/submit */
export async function submitGuessAPI(payload) {
  const { data } = await api.post(`${GAME_URL}/submit`, payload)
  return data
}

/** GET /api/game/history */
export async function getHistoryAPI(params = {}) {
  const { data } = await api.get(`${GAME_URL}/history`, { params })
  return data
}
