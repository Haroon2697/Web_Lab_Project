import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

export function ChoosePanelPage() {
  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-geo-p10">Join GeoExplorer</h1>
        <p className="mt-3 text-geo-p20">
          Choose how you want to continue.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="geo-card">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-geo-p20">User panel</p>
          <h2 className="text-2xl font-bold text-geo-p10">Play as User</h2>
          <p className="mt-3 text-sm text-geo-p20">
            Full gameplay experience: guess countries, use map pinning, track history, and climb the leaderboard.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to={ROUTES.signup} className="btn-primary">Create user account</Link>
            <Link to={ROUTES.login} className="btn-secondary">User login</Link>
          </div>
        </section>

        <section className="geo-card">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-geo-p20">Admin panel</p>
          <h2 className="text-2xl font-bold text-geo-p10">Join as Admin</h2>
          <p className="mt-3 text-sm text-geo-p20">
            Admin pages are provided as template scaffolds only (as per team split) for Khizar to complete later.
          </p>
          <div className="mt-6">
            <Link to={ROUTES.admin.login} className="btn-secondary">Open admin templates</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
