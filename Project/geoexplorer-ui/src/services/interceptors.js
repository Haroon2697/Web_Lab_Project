/** Attach JWT from storage to requests (implement when auth is wired). */
export function attachAuthInterceptor(client) {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  })
}
