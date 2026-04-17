import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🌍',
    title: 'Visual Exploration',
    desc: 'Explore stunning real-world location photos sourced from Unsplash and sharpen your geography eye.',
    color: 'geo-p50',
  },
  {
    icon: '🏆',
    title: 'Compete Globally',
    desc: 'Climb the global leaderboard. Challenge players worldwide and prove your geography mastery.',
    color: 'geo-success',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    desc: 'Review every game session. Filter by difficulty, date, and score — see how far you\'ve come.',
    color: 'geo-aqua',
  },
]

const steps = [
  { number: '01', title: 'View the Image', desc: 'A mystery location photo appears on your screen — study every visual clue carefully.' },
  { number: '02', title: 'Guess the Country', desc: 'Select the country from the dropdown before the timer runs out. Speed earns bonus points.' },
  { number: '03', title: 'Score & Climb', desc: 'Correct answers score points. Difficulty multiplies your rewards. Rise up the leaderboard.' },
]

const stats = [
  { value: '195+', label: 'Countries' },
  { value: '10K+', label: 'Games Played' },
  { value: '3', label: 'Difficulty Levels' },
  { value: '∞', label: 'Replayability' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-geo-bg font-inter">
      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-geo-p20/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-geo-p50 text-lg shadow-lg group-hover:bg-geo-p80 transition-colors">
              🌐
            </div>
            <span className="text-xl font-black tracking-tight">
              Geo<span className="text-gradient">Explorer</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-geo-p10 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-sm text-geo-p10 hover:text-white transition-colors">Features</a>
            <a href="#leaderboard-preview" className="text-sm text-geo-p10 hover:text-white transition-colors">Leaderboard</a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-secondary !py-2 !px-5 !text-sm">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary !py-2 !px-5 !text-sm">
              Play Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 pt-20">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-geo-p50/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-geo-aqua/5 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-geo-p80/10 blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(121,80,229,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(121,80,229,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-geo-p50/30 bg-geo-p50/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-geo-success animate-pulse" />
            <span className="text-sm font-medium text-geo-p10">
              The Geography Game That Challenges Your World Knowledge
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in delay-100 mb-6 text-6xl font-black leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            Can You Guess<br />
            <span className="text-gradient">Every Country?</span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-in delay-200 mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-geo-p10">
            Real location photos. Real countries. A countdown timer that doesn't forgive.
            Climb the global leaderboard and prove you know the world.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in delay-300 flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary !px-10 !py-4 !text-lg !rounded-2xl">
              🎮 Start Playing — It's Free
            </Link>
            <Link to="/leaderboard" className="btn-secondary !px-10 !py-4 !text-lg !rounded-2xl">
              🏆 View Leaderboard
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-in delay-400 mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-geo-p20/20 bg-geo-card/60 py-5 backdrop-blur-sm">
                <div className="text-3xl font-black text-gradient">{s.value}</div>
                <div className="mt-1 text-sm text-geo-p20">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-geo-p20">Scroll down</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-geo-p50 to-transparent" />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-geo-p50">Why GeoExplorer</p>
            <h2 className="text-4xl font-black md:text-5xl">Built for Curious Minds</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`geo-card-hover animate-slide-up delay-${(i + 1) * 100} group relative overflow-hidden`}
              >
                {/* Glow bg on hover */}
                <div className="absolute inset-0 rounded-2xl bg-geo-p50/0 transition-all duration-300 group-hover:bg-geo-p50/5" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-geo-bg text-3xl">
                    {f.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                  <p className="leading-relaxed text-geo-p10">{f.desc}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-geo-p50 to-geo-aqua transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-geo-aqua">Gameplay</p>
            <h2 className="text-4xl font-black md:text-5xl">How It Works</h2>
            <p className="mt-4 text-geo-p10 text-lg">Three steps between you and leaderboard glory.</p>
          </div>

          {/* Steps */}
          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] hidden h-[2px] bg-gradient-to-r from-geo-p50 via-geo-aqua to-geo-success md:block opacity-30" />

            {steps.map((step, i) => (
              <div key={step.number} className={`animate-slide-up delay-${(i + 1) * 100} text-center`}>
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-geo-p50/20 animate-ping opacity-30" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-geo-p50 bg-geo-card text-2xl font-black text-geo-p50">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="leading-relaxed text-geo-p10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERBOARD PREVIEW ──────────────────────────────────────── */}
      <section id="leaderboard-preview" className="py-24 px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-geo-warning">Rankings</p>
            <h2 className="text-4xl font-black md:text-5xl">Top Players This Week</h2>
          </div>

          <div className="geo-card overflow-hidden">
            {/* Header */}
            <div className="mb-4 grid grid-cols-12 px-4 text-xs font-semibold uppercase tracking-widest text-geo-p20">
              <span className="col-span-1">Rank</span>
              <span className="col-span-7">Player</span>
              <span className="col-span-4 text-right">Score</span>
            </div>

            {[
              { rank: 1, name: 'GlobeChampion', score: 12450, medal: '🥇' },
              { rank: 2, name: 'WorldWanderer', score: 11820, medal: '🥈' },
              { rank: 3, name: 'MapMaster99', score: 10300, medal: '🥉' },
              { rank: 4, name: 'TerraTracker', score: 9870, medal: null },
              { rank: 5, name: 'GeoNinja', score: 8540, medal: null },
            ].map((p, i) => (
              <div
                key={p.rank}
                className={`grid grid-cols-12 items-center rounded-xl px-4 py-4 transition-colors hover:bg-geo-p50/5 ${
                  i === 0 ? 'border border-geo-warning/30 bg-geo-warning/5 mb-2' :
                  i === 1 ? 'border border-geo-p20/20 bg-white/[0.02] mb-2' :
                  i === 2 ? 'border border-geo-hint/20 bg-geo-hint/5 mb-2' : 'mb-1'
                }`}
              >
                <span className="col-span-1 text-lg font-black text-geo-p20">
                  {p.medal ?? `#${p.rank}`}
                </span>
                <div className="col-span-7 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-geo-p50/20 text-sm font-bold text-geo-p50">
                    {p.name[0]}
                  </div>
                  <span className={`font-semibold ${i === 0 ? 'text-geo-warning' : i < 3 ? 'text-white' : 'text-geo-p10'}`}>
                    {p.name}
                  </span>
                </div>
                <span className={`col-span-4 text-right font-black ${i === 0 ? 'text-geo-warning' : 'text-white'}`}>
                  {p.score.toLocaleString()}
                </span>
              </div>
            ))}

            <div className="mt-6 text-center">
              <Link to="/leaderboard" className="btn-secondary !py-2 !px-8">
                View Full Leaderboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-geo-p50/30 bg-gradient-to-br from-geo-p50/20 via-geo-card to-geo-p80/10 p-16 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-geo-p50/20 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-geo-aqua/10 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="mb-4 text-4xl font-black md:text-5xl">
                Ready to Test Your <span className="text-gradient">World Knowledge?</span>
              </h2>
              <p className="mb-8 text-xl text-geo-p10">
                Join thousands of players. Free to play. Hard to master.
              </p>
              <Link to="/signup" className="btn-primary !px-12 !py-4 !text-lg !rounded-2xl">
                Create Free Account →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t border-geo-p20/10 py-10 px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="font-black">Geo<span className="text-gradient">Explorer</span></span>
          </div>
          <p className="text-sm text-geo-p20">© 2026 GeoExplorer · FAST NUCES Software Engineering</p>
          <div className="flex gap-6 text-sm text-geo-p20">
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
