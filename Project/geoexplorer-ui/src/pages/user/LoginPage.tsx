import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // TODO: dispatch loginUser thunk
    setTimeout(() => { setLoading(false); navigate('/game') }, 1200)
  }

  return (
    <div className="min-h-screen bg-geo-bg flex">
      {/* ── Left decorative panel ─────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        {/* Background glows */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-geo-p50/20 blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-geo-aqua/10 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(121,80,229,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(121,80,229,0.6) 1px,transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 px-16 text-center">
          {/* Globe */}
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-geo-p50/40 bg-geo-card text-7xl animate-spin-slow">
            🌐
          </div>
          <h2 className="mb-4 text-4xl font-black leading-tight">
            Welcome Back,<br /><span className="text-gradient">Explorer</span>
          </h2>
          <p className="text-geo-p10 text-lg leading-relaxed">
            Continue your journey.<br />The world is waiting to be guessed.
          </p>

          {/* Mini leaderboard teaser */}
          <div className="mt-10 rounded-2xl border border-geo-p20/20 bg-geo-card/60 p-5 text-left backdrop-blur-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-geo-p50">Top Player Today</p>
            {['🥇 GlobeChampion — 12,450 pts', '🥈 WorldWanderer — 11,820 pts', '🥉 MapMaster99 — 10,300 pts'].map(t => (
              <div key={t} className="mb-2 rounded-lg bg-geo-bg/50 px-3 py-2 text-sm text-geo-p10">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────── */}
      <div className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link to="/" className="mb-10 flex items-center gap-3 group w-fit">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-geo-p50 text-lg group-hover:bg-geo-p80 transition-colors">🌐</div>
            <span className="text-xl font-black">Geo<span className="text-gradient">Explorer</span></span>
          </Link>

          <h1 className="mb-2 text-3xl font-black">Sign In</h1>
          <p className="mb-8 text-geo-p10">Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-geo-p50 hover:text-geo-aqua transition-colors">
              Create one free →
            </Link>
          </p>

          {/* General error */}
          {errors.general && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-geo-error/30 bg-geo-error/10 px-4 py-3">
              <span className="text-geo-error text-lg">⚠</span>
              <span className="text-sm text-geo-error">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-geo-p10">Email Address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={`geo-input ${errors.email ? 'border-geo-error focus:border-geo-error focus:ring-geo-error/20' : ''}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-geo-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-geo-p10">Password</label>
                <button type="button" className="text-xs text-geo-p50 hover:text-geo-aqua transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={`geo-input pr-12 ${errors.password ? 'border-geo-error focus:border-geo-error focus:ring-geo-error/20' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-geo-p20 hover:text-white transition-colors"
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-geo-error">{errors.password}</p>}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <input id="remember" type="checkbox" className="h-4 w-4 rounded border-geo-p20/40 accent-geo-p50" />
              <label htmlFor="remember" className="text-sm text-geo-p10">Remember me for 7 days</label>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full !text-base !py-4 relative"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin block" />
                  Signing in…
                </span>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="geo-divider flex-1" />
            <span className="text-xs text-geo-p20">OR CONTINUE AS</span>
            <div className="geo-divider flex-1" />
          </div>

          {/* Admin link */}
          <Link
            to="/admin/login"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-geo-info/30 bg-geo-info/5 py-3 text-sm font-medium text-geo-info hover:bg-geo-info/10 transition-colors"
          >
            🛠 Admin Panel Login
          </Link>
        </div>
      </div>
    </div>
  )
}
