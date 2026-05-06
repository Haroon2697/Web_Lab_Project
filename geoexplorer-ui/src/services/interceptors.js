/**
 * Attach JWT from storage to requests + handle 401 responses.
 */
export function attachAuthInterceptor(client) {
  // Request interceptor — attach Bearer token
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  })

  // Response interceptor — handle 401 Unauthorized
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        const isAdminPath = window.location.pathname.startsWith('/admin')
        const target = isAdminPath ? '/admin/login' : '/login'
        if (window.location.pathname !== target) {
          window.location.href = target
        }
      }
      return Promise.reject(error)
    },
  )
}
