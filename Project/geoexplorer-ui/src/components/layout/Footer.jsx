import { Link, NavLink } from 'react-router-dom'
import { NAV_LINK_GROUPS, PROJECT_REPO_URL, ROUTES } from '../../utils/constants'

const footerLink = ({ isActive }) =>
  `text-xs transition sm:text-sm ${isActive ? 'text-geo-aqua' : 'text-geo-p10 hover:text-white'}`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-geo-p20/30 bg-geo-card/80">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-bold text-white">GeoExplorer</p>
            <p className="mt-1 max-w-xs text-xs text-geo-p10">
              MERN semester project — interactive geography guessing. Navigation matches the header on every page.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link to={ROUTES.home} className="text-geo-p50 hover:text-geo-aqua">
              Back to home
            </Link>
            <a href={PROJECT_REPO_URL} target="_blank" rel="noreferrer" className="text-geo-p50 hover:text-geo-aqua">
              Repository
            </a>
          </div>
        </div>

        {NAV_LINK_GROUPS.map((group) => (
          <div key={`footer-${group.title}`} className="mb-6 border-t border-geo-p20/20 pt-6 first:border-t-0 first:pt-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-geo-p20">{group.title}</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label={`${group.title} footer links`}>
              {group.links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === ROUTES.home} className={footerLink}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}

        <p className="border-t border-geo-p20/20 pt-6 text-center text-xs text-geo-p20">
          © {year} GeoExplorer — FAST-NUCES Software Engineering
        </p>
      </div>
    </footer>
  )
}
