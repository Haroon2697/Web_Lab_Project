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
          className="geo-input flex-1 max-w-md"
        />
      </div>

      <div className="overflow-hidden">
        <table className="app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user._id}>
                <td className="font-medium">{user.name}</td>
                <td className="text-geo-p20">{user.email}</td>
                <td className="font-mono text-geo-p20">{user.totalScore}</td>
                <td>
                  <span className={`geo-badge ${user.isBlocked ? 'bg-geo-error/10 text-geo-error' : 'bg-geo-success/10 text-geo-success'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                  <button onClick={() => toggleBlock(user._id)} className="btn-secondary py-2! px-3! text-xs!">
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button onClick={() => deleteUser(user._id)} className="btn-danger py-2! px-3! text-xs!">
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-10 text-center text-geo-p20">No users found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
