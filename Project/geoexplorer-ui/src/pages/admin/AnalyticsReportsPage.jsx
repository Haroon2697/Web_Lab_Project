import { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { api } from '../../services/axiosInstance'

export function AnalyticsReportsPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/admin/analytics').then(res => setStats(res.data)).catch(console.error)
  }, [])

  return (
    <AdminLayout title="Analytics & Reports">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-geo-card/40 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-geo-p10 mb-2">Platform Engagement</h2>
            <p className="text-geo-p20 text-sm mb-8">Weekly synthetic engagement overview</p>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-3 border-b border-white/10 pb-4">
            {[40, 60, 30, 80, 50, 90, 100].map((h, i) => (
              <div key={i} className="w-full relative group">
                <div 
                  className="w-full bg-gradient-to-t from-geo-p50 to-geo-aqua rounded-t-md transition-all duration-1000 ease-out group-hover:opacity-80 cursor-pointer" 
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-xs px-2 py-1 rounded text-white font-mono pointer-events-none">
                  {h}k
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-geo-p20">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-geo-card/40 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-geo-p10 mb-2">Country Popularity</h2>
          <p className="text-geo-p20 text-sm mb-8">Most frequently guessed destinations</p>
          
          <div className="space-y-6">
            {stats?.mostGuessed?.map((item, i) => (
              <div key={item._id} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-medium flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-xs text-geo-p20">{i + 1}</span>
                    {item._id}
                  </span>
                  <span className="text-geo-aqua font-mono">{item.count}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-geo-p50 to-geo-aqua h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(item.count / (stats.mostGuessed[0]?.count || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {(!stats || stats.mostGuessed?.length === 0) && (
              <div className="py-10 text-center border-2 border-dashed border-white/10 rounded-xl">
                <p className="text-geo-p20">Gathering geographical data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
