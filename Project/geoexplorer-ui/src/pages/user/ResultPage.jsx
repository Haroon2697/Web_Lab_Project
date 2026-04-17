import { useLocation, Link, useNavigate } from 'react-router-dom'

// Country info mock — replace with backend countryData when wired
const COUNTRY_INFO = {
  France: { flag: '🇫🇷', capital: 'Paris', region: 'Western Europe', population: '68 million', fun: 'France is the most visited country in the world.' },
  Germany: { flag: '🇩🇪', capital: 'Berlin', region: 'Western Europe', population: '84 million', fun: 'Germany has over 1,500 types of beer brewed within its borders.' },
  Italy: { flag: '🇮🇹', capital: 'Rome', region: 'Southern Europe', population: '60 million', fun: 'Italy has more UNESCO World Heritage Sites than any other country.' },
  Spain: { flag: '🇪🇸', capital: 'Madrid', region: 'Southern Europe', population: '47 million', fun: 'Spain is home to La Tomatina, the world\'s biggest food fight.' },
}

const FALLBACK = { flag: '🌍', capital: '—', region: '—', population: '—', fun: '—' }

const BASE_SCORE = { easy: 100, medium: 200, hard: 300 }

export function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state

  // Defaults for when navigating directly (no state)
  const userGuess = state?.userGuess ?? 'Germany'
  const correctCountry = state?.correctCountry ?? 'France'
  const difficulty = state?.difficulty ?? 'medium'
  const timeLeft = state?.timeLeft ?? 12
  const isCorrect = userGuess === correctCountry

  const base = BASE_SCORE[difficulty] ?? 100
  const bonus = isCorrect ? timeLeft * 2 : 0
  const totalScore = isCorrect ? base + bonus : 0

  const info = COUNTRY_INFO[correctCountry] ?? FALLBACK

  return (
    <div className="w-full py-6 sm:py-10">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-[100px] opacity-20 ${
          isCorrect ? 'bg-geo-success' : 'bg-geo-error'
        }`} />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* ── Result hero ──────────────────────────── */}
        <div className={`animate-bounce-in geo-card mb-6 text-center overflow-hidden relative ${
          isCorrect ? 'border-geo-success/30' : 'border-geo-error/30'
        }`}>
          {/* Top accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${isCorrect ? 'bg-geo-success' : 'bg-geo-error'}`} />

          <div className="pt-8">
            {/* Result icon */}
            <div className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-5xl border-4 ${
              isCorrect
                ? 'border-geo-success bg-geo-success/10 animate-bounce-in'
                : 'border-geo-error bg-geo-error/10'
            }`}>
              {isCorrect ? '✅' : '❌'}
            </div>

            <h1 className={`text-4xl font-black mb-2 ${isCorrect ? 'text-geo-success' : 'text-geo-error'}`}>
              {isCorrect ? 'Correct! 🎉' : 'Not Quite!'}
            </h1>

            <p className="text-geo-p10 text-lg mb-6">
              {isCorrect
                ? 'Great geography knowledge! You nailed it.'
                : `The correct answer was ${correctCountry}.`}
            </p>

            {/* Score breakdown */}
            <div className={`mx-auto max-w-xs rounded-xl border px-6 py-4 mb-6 ${
              isCorrect ? 'border-geo-success/20 bg-geo-success/5' : 'border-geo-error/20 bg-geo-error/5'
            }`}>
              <div className="text-5xl font-black text-white mb-1">+{totalScore}</div>
              <div className="text-geo-p20 text-sm">Points Earned</div>

              {isCorrect && (
                <div className="mt-3 space-y-1 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-geo-p20">Base score ({difficulty})</span>
                    <span className="font-semibold">+{base}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-geo-p20">Speed bonus ({timeLeft}s left)</span>
                    <span className="font-semibold text-geo-aqua">+{bonus}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Guess comparison */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className={`rounded-xl border px-4 py-3 ${
                isCorrect ? 'border-geo-success/30 bg-geo-success/5' : 'border-geo-error/30 bg-geo-error/5'
              }`}>
                <p className="text-xs text-geo-p20 uppercase tracking-widest mb-1">Your Guess</p>
                <p className="font-bold text-lg">{userGuess || 'No Answer'}</p>
                <span className="text-sm">{isCorrect ? '✅ Correct' : '❌ Wrong'}</span>
              </div>
              <div className="rounded-xl border border-geo-success/30 bg-geo-success/5 px-4 py-3">
                <p className="text-xs text-geo-p20 uppercase tracking-widest mb-1">Correct Answer</p>
                <p className="font-bold text-lg">{correctCountry}</p>
                <span className="text-sm text-geo-success">✓ Answer</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Country Info card ─────────────────────── */}
        <div className="animate-slide-up delay-100 geo-card mb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{info.flag}</span>
            <div>
              <h2 className="text-xl font-black">{correctCountry}</h2>
              <p className="text-geo-p20 text-sm">{info.region}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Capital', value: info.capital, icon: '🏛️' },
              { label: 'Region', value: info.region, icon: '🌐' },
              { label: 'Population', value: info.population, icon: '👥' },
              { label: 'Difficulty', value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1), icon: '⚡' },
            ].map(item => (
              <div key={item.label} className="rounded-xl bg-geo-bg px-4 py-3">
                <p className="text-xs text-geo-p20 mb-1">{item.icon} {item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Fun fact */}
          <div className="rounded-xl border border-geo-info/20 bg-geo-info/5 px-4 py-3">
            <p className="text-xs font-semibold text-geo-info uppercase tracking-widest mb-1">💡 Did You Know?</p>
            <p className="text-sm text-geo-p10 leading-relaxed">{info.fun}</p>
          </div>
        </div>

        {/* ── Action buttons ────────────────────────── */}
        <div className="animate-slide-up delay-200 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            id="play-again-btn"
            onClick={() => navigate('/game')}
            className="btn-primary col-span-2 !py-4 !text-base"
          >
            🔁 Play Again
          </button>
          <Link to="/leaderboard" className="btn-secondary !py-4 !text-sm text-center">
            🏆 Leaderboard
          </Link>
          <Link to="/history" className="btn-secondary !py-4 !text-sm text-center">
            📊 My History
          </Link>
        </div>
      </div>
    </div>
  )
}
