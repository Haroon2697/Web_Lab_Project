import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const strengthLevels = [
  { label: 'Too Short', color: 'bg-geo-error', width: 'w-1/4' },
  { label: 'Weak', color: 'bg-geo-hint', width: 'w-2/4' },
  { label: 'Good', color: 'bg-geo-warning', width: 'w-3/4' },
  { label: 'Strong', color: 'bg-geo-success', width: 'w-full' },
]

function getStrength(pw) {
  if (pw.length < 8) return 0
  let score = 1
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(score, 3)
}

export function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const strength = getStrength(form.password)
  const strengthInfo = strengthLevels[strength]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    if (!agreed) e.terms = 'You must agree to the terms'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // TODO: dispatch registerUser thunk
    setTimeout(() => { setLoading(false); navigate('/game') }, 1400)
  }

  const field = (key) =>
    `geo-input ${errors[key] ? 'border-geo-error focus:border-geo-error focus:ring-geo-error/20' : ''}`

  return (
    <div className="flex min-h-[calc(100dvh-14rem)] w-full">
      {/* ── Left decorative panel ─────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-geo-aqua/10 blur-[90px]" />
          <div className="absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full bg-geo-p50/15 blur-[90px]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(58,232,189,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(58,232,189,0.5) 1px,transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 px-16 text-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-geo-aqua/40 bg-geo-card text-7xl animate-spin-slow">
            🗺️
          </div>
          <h2 className="mb-4 text-4xl font-black leading-tight">
            Join Our<br /><span className="text-gradient">Explorer Community</span>
          </h2>
          <p className="text-geo-p10 text-lg leading-relaxed">
            Free forever. Compete globally.<br />Discover the world one photo at a time.
          </p>

          {/* Benefit list */}
          <div className="mt-10 space-y-3 text-left">
            {[
              { icon: '🎮', text: 'Unlimited game sessions' },
              { icon: '📊', text: 'Personal score & history tracking' },
              { icon: '🏆', text: 'Global leaderboard access' },
              { icon: '🌍', text: '195+ countries to discover' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-3 rounded-xl border border-geo-p20/20 bg-geo-card/50 px-4 py-3">
                <span className="text-xl">{b.icon}</span>
                <span className="text-sm font-medium text-geo-p10">{b.text}</span>
                <span className="ml-auto text-geo-success text-sm">✓</span>
              </div>
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

          <h1 className="mb-2 text-3xl font-black">Create Account</h1>
          <p className="mb-8 text-geo-p10">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-geo-p50 hover:text-geo-aqua transition-colors">
              Sign in →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-geo-p10">Full Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Haroon Aziz"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={field('name')}
              />
              {errors.name && <p className="mt-1.5 text-xs text-geo-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-geo-p10">Email Address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={field('email')}
              />
              {errors.email && <p className="mt-1.5 text-xs text-geo-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-geo-p10">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={`${field('password')} pr-12`}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-geo-p20 hover:text-white transition-colors">
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>

              {/* Strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-geo-p20">Password strength</span>
                    <span className={`text-xs font-semibold ${
                      strength === 0 ? 'text-geo-error' :
                      strength === 1 ? 'text-geo-hint' :
                      strength === 2 ? 'text-geo-warning' : 'text-geo-success'
                    }`}>{strengthInfo.label}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-geo-p20/20">
                    <div className={`h-full rounded-full transition-all duration-300 ${strengthInfo.color} ${strengthInfo.width}`} />
                  </div>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-xs text-geo-error">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-geo-p10">Confirm Password</label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  className={`${field('confirm')} pr-12`}
                />
                {form.confirm.length > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
                    {form.confirm === form.password ? '✅' : '❌'}
                  </span>
                )}
              </div>
              {errors.confirm && <p className="mt-1.5 text-xs text-geo-error">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  id="signup-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-geo-p50 shrink-0"
                />
                <label htmlFor="signup-terms" className="text-sm text-geo-p10 leading-relaxed">
                  I agree to the{' '}
                  <button type="button" className="text-geo-p50 hover:text-geo-aqua transition-colors font-medium">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-geo-p50 hover:text-geo-aqua transition-colors font-medium">Privacy Policy</button>
                </label>
              </div>
              {errors.terms && <p className="mt-1.5 text-xs text-geo-error">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-base! py-4!"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin block" />
                  Creating account…
                </span>
              ) : 'Create My Account →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
