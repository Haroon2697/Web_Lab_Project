import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/axiosInstance'
import { ROUTES } from '../../utils/constants'

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/admin/login', { email: email.trim(), password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate(ROUTES.admin.dashboard)
    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.message || err.message || 'Login failed'
      setError(status ? `${msg} (HTTP ${status})` : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md geo-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-geo-p10 mb-2">Admin Portal</h1>
          <p className="text-geo-p20 text-sm">Secure access for administrators</p>
        </div>
        
        {error && (
          <div className="mb-6 rounded-xl border border-geo-error/30 bg-geo-error/10 p-4 text-geo-error text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-geo-p20 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="geo-input"
              placeholder="admin@geoexplorer.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-geo-p20 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="geo-input"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Authenticate'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
