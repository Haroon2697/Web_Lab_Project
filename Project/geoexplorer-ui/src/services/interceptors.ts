import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

/** Attach JWT from storage to requests (implement when auth is wired). */
export function attachAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  })
}
