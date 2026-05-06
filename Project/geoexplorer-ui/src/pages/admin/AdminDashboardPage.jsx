import { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { api } from '../../services/axiosInstance'

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/admin/analytics').then(res => setStats(res.data)).catch(console.error)
  }, [])

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-geo-p80/50 to-slate-800 p-6 rounded-2xl border border-white/5 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1">
          <h3 className="text-geo-p20 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-4xl font-bold text-white">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-geo-aquaDark/50 to-slate-800 p-6 rounded-2xl border border-white/5 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1">
          <h3 className="text-geo-p20 text-sm font-medium mb-1">Games Played</h3>
          <p className="text-4xl font-bold text-white">{stats?.totalGames || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-geo-hintDark/50 to-slate-800 p-6 rounded-2xl border border-white/5 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1">
          <h3 className="text-geo-p20 text-sm font-medium mb-1">System Health</h3>
          <p className="text-4xl font-bold text-geo-success">Optimal</p>
        </div>
      </div>

      <div className="bg-geo-card/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-geo-p10 mb-6">Most Guessed Countries</h2>
        {stats?.mostGuessed?.length > 0 ? (
          <div className="space-y-5">
            {stats.mostGuessed.map((item, i) => (
              <div key={item._id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-geo-p50/20 flex items-center justify-center text-geo-p20 font-bold text-sm">
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-geo-p10 font-medium">{item._id}</span>
                    <span className="text-geo-p20 text-sm">{item.count} games</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-geo-aqua h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${(item.count / stats.mostGuessed[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-geo-p20">No data available yet.</p>
        )}
      </div>
    </AdminLayout>
  )
}
