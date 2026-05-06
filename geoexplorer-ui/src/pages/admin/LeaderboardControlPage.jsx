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
      <div className="geo-card max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-geo-p10 mb-2">Danger Zone</h2>
          <p className="text-geo-p20 text-sm">These actions affect the global state of the game for all players.</p>
        </div>
        
        {message && (
          <div className="mb-6 rounded-xl border border-[#e2e8f0] bg-slate-50 p-4 text-geo-p10 font-medium text-sm">
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-geo-error/20 bg-geo-error/5 p-6 gap-4">
          <div>
            <h3 className="text-geo-p10 font-bold mb-1">Reset Global Leaderboard</h3>
            <p className="text-geo-p20 text-sm max-w-xs">Sets all users' total scores, highest scores, and games played back to 0. Use only for new seasons.</p>
          </div>
          <button 
            onClick={resetLeaderboard}
            disabled={loading}
            className="btn-danger whitespace-nowrap px-6!"
          >
            {loading ? 'Processing...' : 'Wipe Leaderboard'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
