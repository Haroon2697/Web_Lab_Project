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
      <div className="overflow-hidden">
        <table className="app-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Target Country</th>
              <th>User Guess</th>
              <th>Score Earned</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game._id}>
                <td className="font-medium">{game.user?.name || 'Unknown User'}</td>
                <td className="text-geo-p20">{game.correctCountry}</td>
                <td className="font-medium">
                  <span className={game.isCorrect ? 'text-geo-success' : 'text-geo-error'}>{game.userGuess}</span>
                </td>
                <td className="font-mono text-geo-p10">+{game.score}</td>
                <td className="text-right">
                  <button onClick={() => deleteSession(game._id)} className="btn-ghost py-2! px-3! text-xs! text-geo-error hover:bg-geo-error/10 hover:text-geo-error">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {games.length === 0 && (
              <tr><td colSpan="5" className="py-10 text-center text-geo-p20">No recent game sessions recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
