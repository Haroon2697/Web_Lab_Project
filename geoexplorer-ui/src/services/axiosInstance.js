import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { attachAuthInterceptor } from './interceptors'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

attachAuthInterceptor(api)
