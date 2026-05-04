/**
 * Auth API calls — uses axios instance from `services/`.
 */
import { api } from '../../services/axiosInstance'

const AUTH_URL = '/auth'

/** POST /api/auth/register */
export async function registerAPI(userData) {
  const { data } = await api.post(`${AUTH_URL}/register`, userData)
  if (data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
  }
  return data
}

/** POST /api/auth/login */
export async function loginAPI(credentials) {
  const { data } = await api.post(`${AUTH_URL}/login`, credentials)
  if (data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
  }
  return data
}

/** Clear stored auth data */
export function logoutLocal() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
