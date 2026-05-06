import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NAV_LINK_GROUPS, ROUTES } from '../../utils/constants'
import { logout } from '../../features/auth/authSlice'

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-geo-p50/10 text-geo-p80'
      : 'text-geo-p20 hover:bg-slate-100 hover:text-geo-p10'
  }`

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const mainLinks = NAV_LINK_GROUPS.find((group) => group.title === 'User')?.links ?? []

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.home)
  }

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-8">
        <Link
          to={ROUTES.home}
          className="text-xl font-extrabold tracking-tight text-geo-p10"
        >
          GeoExplorer
        </Link>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {mainLinks.slice(0, 5).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === ROUTES.home} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-geo-p20/20 bg-geo-bg px-3 py-1.5">
              <span className="text-sm font-bold text-geo-p10">{user?.name || 'User'}</span>
              <span className="text-xs text-geo-p20">{user?.email || ''}</span>
              {user?.role === 'admin' && (
                <span className="geo-badge bg-geo-warning/15 text-geo-warning border border-geo-warning/30 text-[10px]">Admin</span>
              )}
            </div>
            {user.currentStreak > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-sm font-bold text-orange-500 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                🔥 <span className="hidden sm:inline">Streak:</span> {user.currentStreak}
              </div>
            )}
            {user.role === 'admin' ? (
              <NavLink to={ROUTES.admin.dashboard} className="btn-secondary">Admin</NavLink>
            ) : null}
            <button type="button" onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <NavLink to={ROUTES.login} className="btn-secondary">
            Login
          </NavLink>
        )}
        <NavLink to={ROUTES.game} className="btn-primary shadow-lg shadow-geo-p50/20">
          Start Game
        </NavLink>
      </div>
    </div>
  )
}
