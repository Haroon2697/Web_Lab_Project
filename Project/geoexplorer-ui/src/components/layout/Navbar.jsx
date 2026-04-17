import { Link, NavLink } from 'react-router-dom'
import { NAV_LINK_GROUPS, ROUTES } from '../../utils/constants'

const linkClass = ({ isActive }) =>
  `rounded-lg border px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
    isActive
      ? 'border-geo-p50 bg-geo-p50/20 text-white'
      : 'border-geo-p20/40 bg-geo-card text-geo-p10 hover:border-geo-aqua hover:text-geo-aqua'
  }`

export function Navbar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={ROUTES.home}
          className="text-lg font-black tracking-tight text-white transition hover:text-geo-aqua sm:text-xl"
        >
          GeoExplorer
        </Link>
        <p className="hidden text-xs text-geo-p20 sm:block">Geography guessing game</p>
      </div>

      {NAV_LINK_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-geo-aqua">{group.title} panel</p>
          <nav className="flex flex-wrap gap-2" aria-label={`${group.title} navigation`}>
            {group.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === ROUTES.home}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </div>
  )
}
