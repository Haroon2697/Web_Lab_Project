import axios from 'axios'
import { API_BASE_URL } from '../utils/constants.ts'
import { attachAuthInterceptor } from './interceptors.ts'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

attachAuthInterceptor(api)
