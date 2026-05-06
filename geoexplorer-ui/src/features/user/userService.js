/**
 * User profile API calls.
 */
import { api } from '../../services/axiosInstance'

/** GET /api/users/me */
export async function getProfileAPI() {
  const { data } = await api.get('/users/me')
  return data
}

/** PUT /api/users/me */
export async function updateProfileAPI(updates) {
  const { data } = await api.put('/users/me', updates)
  const authUser = JSON.parse(localStorage.getItem('user') || '{}')
  localStorage.setItem('user', JSON.stringify({ ...authUser, ...data }))
  return data
}
