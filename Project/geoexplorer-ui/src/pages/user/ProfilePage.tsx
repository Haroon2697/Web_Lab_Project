import { useState } from 'react'
import { Link } from 'react-router-dom'

const MOCK_USER = {
  name: 'Haroon Aziz',
  email: 'i222697@nu.edu.pk',
  totalScore: 7240,
  gamesPlayed: 38,
  rank: 7,
  bestScore: 346,
  winRate: 65,
  joinDate: 'April 2026',
  recentGames: [
    { country: 'France', correct: true, score: 224, diff: 'medium', date: 'Today' },
    { country: 'India', correct: false, score: 0, diff: 'hard', date: 'Today' },
    { country: 'Switzerland', correct: true, score: 130, diff: 'easy', date: 'Yesterday' },
    { country: 'Italy', correct: true, score: 346, diff: 'hard', date: '2 days ago' },
    { country: 'Japan', correct: true, score: 260, diff: 'medium', date: '2 days ago' },
  ],
}

const DIFF_COLORS: Record<string, string> = {
  easy: 'bg-geo-success/15 text-geo-success',
  medium: 'bg-geo-warning/15 text-geo-warning',
  hard: 'bg-geo-error/15 text-geo-error',
}

export function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(MOCK_USER.name)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: dispatch updateProfile thunk
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const avgScore = Math.round(MOCK_USER.totalScore / MOCK_USER.gamesPlayed)

  return (
    <div className="min-h-screen bg-geo-bg px-6 py-16">
      {/* Glow */}
      <div className="pointer-events-none fixed top-0 right-0 h-96 w-96 rounded-full bg-geo-aqua/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">

        {/* ── Header ────────────────────────────────── */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4 animate-fade-in">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-geo-aqua mb-1">Your Account</p>
            <h1 className="text-4xl font-black">Profile</h1>
          </div>
          <Link to="/game" className="btn-primary !py-2.5 !px-6">🎮 New Game</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Identity card ─────────────────── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Avatar + name */}
            <div className="geo-card text-center animate-slide-up">
              <div className="relative mx-auto mb-4 w-fit">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-geo-p50 to-geo-aqua text-4xl font-black text-white shadow-xl">
                  {MOCK_USER.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-geo-bg bg-geo-success text-xs text-white">
                  ✓
                </div>
              </div>

              {editing ? (
                <div className="mb-3">
                  <input
                    id="profile-name-input"
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    className="geo-input text-center text-lg font-bold mb-3"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-primary flex-1 !py-2 !text-sm">
                      Save
                    </button>
                    <button onClick={() => { setEditing(false); setNameInput(MOCK_USER.name) }}
                      className="btn-secondary flex-1 !py-2 !text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <h2 className="text-xl font-black">{nameInput}</h2>
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-1 text-xs text-geo-p50 hover:text-geo-aqua transition-colors"
                  >
                    ✏️ Edit Name
                  </button>
                </div>
              )}

              {saved && (
                <div className="mb-3 rounded-xl border border-geo-success/30 bg-geo-success/10 px-3 py-2 text-sm text-geo-success animate-bounce-in">
                  ✅ Profile updated!
                </div>
              )}

              <div className="text-sm text-geo-p20 mb-4">{MOCK_USER.email}</div>

              <div className="geo-divider mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-geo-p20">Member since</span>
                  <span className="font-medium">{MOCK_USER.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-geo-p20">Global Rank</span>
                  <span className="font-bold text-geo-p50">#{MOCK_USER.rank}</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="geo-card animate-slide-up delay-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-geo-p20 mb-3">Quick Links</p>
              <div className="space-y-2">
                {[
                  { to: '/history', icon: '📊', label: 'Game History' },
                  { to: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
                  { to: '/game', icon: '🎮', label: 'Play Game' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 rounded-xl bg-geo-bg px-4 py-2.5 text-sm text-geo-p10 hover:text-white hover:bg-geo-p50/10 transition-all"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                    <span className="ml-auto text-geo-p20">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Stats + activity ─────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up delay-100">
              {[
                { label: 'Total Score', value: MOCK_USER.totalScore.toLocaleString(), icon: '⭐', color: 'text-geo-warning', bg: 'bg-geo-warning/10' },
                { label: 'Games Played', value: MOCK_USER.gamesPlayed, icon: '🎮', color: 'text-geo-p50', bg: 'bg-geo-p50/10' },
                { label: 'Win Rate', value: `${MOCK_USER.winRate}%`, icon: '🎯', color: 'text-geo-success', bg: 'bg-geo-success/10' },
                { label: 'Best Score', value: MOCK_USER.bestScore, icon: '🏅', color: 'text-geo-aqua', bg: 'bg-geo-aqua/10' },
              ].map(s => (
                <div key={s.label} className="geo-card-hover flex items-center gap-4">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl ${s.bg}`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-geo-p20">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Average score */}
            <div className="geo-card animate-slide-up delay-200">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold">Average Score per Game</p>
                <span className="text-2xl font-black text-geo-aqua">{avgScore}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-geo-p20/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-geo-p50 to-geo-aqua"
                  style={{ width: `${Math.min((avgScore / 400) * 100, 100)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-geo-p20">
                <span>0</span>
                <span>Max possible: 400+</span>
              </div>
            </div>

            {/* Win rate breakdown */}
            <div className="geo-card animate-slide-up delay-200">
              <p className="font-bold mb-4">Performance Breakdown</p>
              <div className="space-y-3">
                {[
                  { label: 'Correct Guesses', value: MOCK_USER.gamesPlayed * (MOCK_USER.winRate / 100), max: MOCK_USER.gamesPlayed, color: 'from-geo-success to-geo-success-dark', textColor: 'text-geo-success' },
                  { label: 'Wrong Guesses', value: MOCK_USER.gamesPlayed * (1 - MOCK_USER.winRate / 100), max: MOCK_USER.gamesPlayed, color: 'from-geo-error to-geo-error/60', textColor: 'text-geo-error' },
                ].map(bar => {
                  const count = Math.round(bar.value)
                  const pct = Math.round((count / bar.max) * 100)
                  return (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1.5 text-sm">
                        <span className="text-geo-p10">{bar.label}</span>
                        <span className={`font-bold ${bar.textColor}`}>{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-geo-p20/20 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color} transition-all duration-1000`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent activity */}
            <div className="geo-card animate-slide-up delay-300">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold">Recent Activity</p>
                <Link to="/history" className="text-xs text-geo-p50 hover:text-geo-aqua transition-colors">
                  View All →
                </Link>
              </div>
              <div className="space-y-2">
                {MOCK_USER.recentGames.map((g, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                      g.correct ? 'border border-geo-success/15 bg-geo-success/[0.03]' : 'border border-geo-error/15 bg-geo-error/[0.03]'
                    }`}
                  >
                    <span className="text-xl">{g.correct ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{g.country}</span>
                      <span className={`ml-2 geo-badge text-[10px] ${DIFF_COLORS[g.diff]}`}>{g.diff}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-black ${g.correct ? 'text-geo-success' : 'text-geo-p20'}`}>
                        +{g.score}
                      </div>
                      <div className="text-[10px] text-geo-p20">{g.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
