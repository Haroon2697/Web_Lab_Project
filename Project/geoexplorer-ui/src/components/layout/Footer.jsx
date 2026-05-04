import { Link, NavLink } from 'react-router-dom'
import { NAV_LINK_GROUPS, PROJECT_REPO_URL, ROUTES } from '../../utils/constants'

const footerLink = ({ isActive }) =>
  `text-sm transition ${isActive ? 'text-geo-p50' : 'text-geo-p20 hover:text-geo-p10'}`

export function Footer() {
  const year = new Date().getFullYear()
  const mainLinks = NAV_LINK_GROUPS.find((group) => group.title === 'User')?.links ?? []

  return (
    <footer className="border-t border-[#e2e8f0] bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-20">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-base font-extrabold text-geo-p10">GeoExplorer</p>
            <p className="mt-2 max-w-sm text-sm text-geo-p20">
              Interactive geography guessing with modern gameplay, map-based answers, and competitive leaderboards.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <NavLink to={ROUTES.home} className={footerLink}>Home</NavLink>
            <NavLink to={ROUTES.leaderboard} className={footerLink}>Leaderboard</NavLink>
            <NavLink to={ROUTES.profile} className={footerLink}>About</NavLink>
            <Link to={ROUTES.login} className="text-sm text-geo-p20 hover:text-geo-p10">Login</Link>
            <a href={PROJECT_REPO_URL} target="_blank" rel="noreferrer" className="text-sm text-geo-p20 hover:text-geo-p10">Repository</a>
          </div>
        </div>

        <div className="mb-8 border-t border-[#e2e8f0] pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-geo-p20">All routes</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="All footer links">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === ROUTES.home} className={footerLink}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <p className="border-t border-[#e2e8f0] pt-6 text-center text-xs text-geo-p20">
          © {year} GeoExplorer — FAST-NUCES Software Engineering
        </p>
      </div>
    </footer>
  )
}
