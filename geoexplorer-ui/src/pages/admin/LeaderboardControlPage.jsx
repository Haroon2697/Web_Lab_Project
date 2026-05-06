import { AdminLayout } from '../../components/admin/AdminLayout'
import { api } from '../../services/axiosInstance'
import { useState } from 'react'

export function LeaderboardControlPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const resetLeaderboard = async () => {
    if (!confirm('WARNING: This will reset ALL user scores and game stats to 0. This cannot be undone. Continue?')) return
    
    setLoading(true)
    setMessage('')
    try {
      await api.post('/admin/leaderboard/reset')
      setMessage('✅ Leaderboard has been successfully reset.')
    } catch (err) {
      setMessage('❌ Failed to reset leaderboard.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Leaderboard Controls">
      <div className="bg-geo-card/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-geo-p10 mb-2">Danger Zone</h2>
          <p className="text-geo-p20 text-sm">These actions affect the global state of the game for all players.</p>
        </div>
        
        {message && (
          <div className="mb-6 p-4 bg-slate-800 rounded-xl border border-white/10 text-white font-medium text-sm animate-pulse">
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-geo-error/5 border border-geo-error/20 rounded-xl gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">Reset Global Leaderboard</h3>
            <p className="text-slate-400 text-sm max-w-xs">Sets all users' total scores, highest scores, and games played back to 0. Use only for new seasons.</p>
          </div>
          <button 
            onClick={resetLeaderboard}
            disabled={loading}
            className="whitespace-nowrap px-6 py-3 bg-geo-error/20 hover:bg-geo-error text-geo-error hover:text-white rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Processing...' : 'Wipe Leaderboard'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
