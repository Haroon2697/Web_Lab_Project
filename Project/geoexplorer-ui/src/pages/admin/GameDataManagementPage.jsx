import { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { api } from '../../services/axiosInstance'

export function GameDataManagementPage() {
  const [games, setGames] = useState([])

  const fetchGames = () => {
    api.get('/admin/games').then(res => setGames(res.data.sessions)).catch(console.error)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const deleteSession = async (id) => {
    if (confirm('Are you sure you want to delete this game session?')) {
      await api.delete(`/admin/games/${id}`)
      fetchGames()
    }
  }

  return (
    <AdminLayout title="Game Sessions Tracker">
      <div className="bg-geo-card/40 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-geo-p20 text-sm">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Target Country</th>
              <th className="p-4 font-medium">User Guess</th>
              <th className="p-4 font-medium">Score Earned</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {games.map(game => (
              <tr key={game._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-geo-p10 font-medium">{game.user?.name || 'Unknown User'}</td>
                <td className="p-4 text-slate-300">{game.correctCountry}</td>
                <td className="p-4 font-medium">
                  <span className={game.isCorrect ? 'text-geo-success' : 'text-geo-error'}>{game.userGuess}</span>
                </td>
                <td className="p-4 font-mono text-geo-aqua">+{game.score}</td>
                <td className="p-4 flex justify-end">
                  <button onClick={() => deleteSession(game._id)} className="px-3 py-1 text-geo-error hover:bg-geo-error/10 rounded-lg text-sm transition-colors">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {games.length === 0 && (
              <tr><td colSpan="5" className="p-8 text-center text-geo-p20">No recent game sessions recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
