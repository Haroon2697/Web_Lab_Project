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
        <div className="stat-card">
          <div className="text-xs font-bold uppercase tracking-wider text-geo-p20">Total Users</div>
          <div className="mt-2 text-4xl font-extrabold text-geo-p10">{stats?.totalUsers || 0}</div>
          <div className="mt-3 inline-flex items-center rounded-full bg-geo-p50/10 px-3 py-1 text-xs font-semibold text-geo-p50">
            Active accounts
          </div>
        </div>
        <div className="stat-card">
          <div className="text-xs font-bold uppercase tracking-wider text-geo-p20">Games Played</div>
          <div className="mt-2 text-4xl font-extrabold text-geo-p10">{stats?.totalGames || 0}</div>
          <div className="mt-3 inline-flex items-center rounded-full bg-geo-info/10 px-3 py-1 text-xs font-semibold text-geo-info">
            Sessions recorded
          </div>
        </div>
        <div className="stat-card">
          <div className="text-xs font-bold uppercase tracking-wider text-geo-p20">System Health</div>
          <div className="mt-2 text-4xl font-extrabold text-geo-success">Optimal</div>
          <div className="mt-3 inline-flex items-center rounded-full bg-geo-success/10 px-3 py-1 text-xs font-semibold text-geo-success">
            All services OK
          </div>
        </div>
      </div>

      <div className="geo-card">
        <h2 className="text-xl font-bold text-geo-p10 mb-6">Most Guessed Countries</h2>
        {stats?.mostGuessed?.length > 0 ? (
          <div className="space-y-5">
            {stats.mostGuessed.map((item, i) => (
              <div key={item._id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-geo-p50/20 flex items-center justify-center text-geo-p10 font-bold text-sm">
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-geo-p10 font-medium">{item._id}</span>
                    <span className="text-geo-p20 text-sm">{item.count} games</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
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
