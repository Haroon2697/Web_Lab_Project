import { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { api } from '../../services/axiosInstance'

export function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  const fetchUsers = () => {
    api.get('/admin/users').then(res => setUsers(res.data)).catch(console.error)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleBlock = async (id) => {
    await api.put(`/admin/users/${id}/block`)
    fetchUsers()
  }

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await api.delete(`/admin/users/${id}`)
      fetchUsers()
    }
  }

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <AdminLayout title="User Management">
      <div className="mb-6 flex gap-4">
        <input 
          type="text" 
          placeholder="Search users..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-geo-p50 transition-all"
        />
      </div>

      <div className="bg-geo-card/40 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-geo-p20 text-sm">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Score</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(user => (
              <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-geo-p10 font-medium">{user.name}</td>
                <td className="p-4 text-slate-300">{user.email}</td>
                <td className="p-4 text-slate-300 font-mono">{user.totalScore}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${user.isBlocked ? 'bg-geo-error/20 text-geo-error' : 'bg-geo-success/20 text-geo-success'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-4 flex gap-2 justify-end">
                  <button onClick={() => toggleBlock(user._id)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors text-white">
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button onClick={() => deleteUser(user._id)} className="px-3 py-1.5 bg-geo-error/20 hover:bg-geo-error/40 rounded-lg text-sm transition-colors text-geo-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-geo-p20">No users found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
