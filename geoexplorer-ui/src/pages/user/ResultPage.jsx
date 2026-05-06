import { useLocation, Link, useNavigate } from 'react-router-dom'
import MapSelector from '../../components/game/MapSelector'
import { formatDistance, mapAccuracyBonus } from '../../utils/mapUtils'
import { getCountryCoordinates } from '../../utils/countryCoords'

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
  const isCorrect =
    typeof state?.isCorrect === 'boolean'
      ? state.isCorrect
      : userGuess === correctCountry
  const guessPosition = state?.guessPosition ?? null
  const correctPosition = state?.correctPosition ?? getCountryCoordinates(correctCountry)
  const distanceKm = typeof state?.distanceKm === 'number' ? state.distanceKm : null
  const mapBonus = typeof state?.mapBonus === 'number'
    ? state.mapBonus
    : distanceKm != null ? mapAccuracyBonus(distanceKm) : 0

  const base = BASE_SCORE[difficulty] ?? 100
  const bonus = isCorrect ? timeLeft * 2 : 0
  const backendScore = typeof state?.score === 'number' ? state.score : null
  const computedScore = (isCorrect ? base + bonus : 0) + mapBonus
  const totalScore = backendScore ?? computedScore

  const newAchievements = Array.isArray(state?.newAchievements) ? state.newAchievements : []
  const currentStreak = typeof state?.currentStreak === 'number' ? state.currentStreak : null

  const meta = state?.countryMeta || null
  const capital = meta?.capital || '—'
  const region = meta?.region || meta?.subregion || '—'
  const population =
    typeof meta?.population === 'number'
      ? meta.population.toLocaleString()
      : '—'

  return (
    <div className="w-full py-6 sm:py-10">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-[100px] opacity-20 ${
          isCorrect ? 'bg-geo-success' : 'bg-geo-error'
        }`} />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* ── Achievements / streak feedback ───────────── */}
        {(newAchievements.length > 0 || currentStreak != null) && (
          <div className="mb-6 animate-slide-up">
            <div className="geo-card p-4! border-geo-warning/30 bg-geo-warning/5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  {newAchievements.length > 0 ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-geo-warning mb-1">Achievement Unlocked</p>
                      <div className="flex flex-wrap gap-2">
                        {newAchievements.map((a) => (
                          <span key={a} className="geo-badge bg-geo-warning/20 text-geo-warning border border-geo-warning/30 text-[11px]">
                            🏆 {a}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-geo-p10 font-semibold">Progress updated.</p>
                  )}
                </div>
                {currentStreak != null && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-geo-p20">Current streak</span>
                    <span className="text-lg font-black text-geo-hint">🔥 {currentStreak}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
                  {mapBonus > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-geo-p20">Map accuracy bonus</span>
                      <span className="font-semibold text-geo-success">+{mapBonus}</span>
                    </div>
                  )}
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

        {(guessPosition && correctPosition) && (
          <div className="animate-slide-up delay-100 geo-card mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black">Map Result</h2>
              {distanceKm != null && (
                <span className="text-sm font-semibold text-geo-aqua">
                  Distance: {formatDistance(distanceKm)}
                </span>
              )}
            </div>
            <MapSelector
              guessPosition={guessPosition}
              correctPosition={correctPosition}
              distance={distanceKm}
              showResult
              disabled
              height="320px"
            />
          </div>
        )}

        {/* ── Country Info card ─────────────────────── */}
        <div className="animate-slide-up delay-100 geo-card mb-6">
          <div className="flex items-center gap-3 mb-5">
            {meta?.flag ? (
              <img src={meta.flag} alt={`${correctCountry} flag`} className="h-10 w-10 rounded-full object-cover border border-geo-p20/20" />
            ) : (
              <span className="text-4xl">🌍</span>
            )}
            <div>
              <h2 className="text-xl font-black">{correctCountry}</h2>
              <p className="text-geo-p20 text-sm">{region}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Capital', value: capital, icon: '🏛️' },
              { label: 'Region', value: region, icon: '🌐' },
              { label: 'Population', value: population, icon: '👥' },
              { label: 'Difficulty', value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1), icon: '⚡' },
            ].map(item => (
              <div key={item.label} className="rounded-xl bg-geo-bg px-4 py-3">
                <p className="text-xs text-geo-p20 mb-1">{item.icon} {item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Hint / note */}
          <div className="rounded-xl border border-geo-info/20 bg-geo-info/5 px-4 py-3">
            <p className="text-xs font-semibold text-geo-info uppercase tracking-widest mb-1">💡 Hint</p>
            <p className="text-sm text-geo-p10 leading-relaxed">
              Closer pin = higher score. Try to get within a few hundred kilometers on Easy.
            </p>
          </div>
        </div>

        {/* ── Action buttons ────────────────────────── */}
        <div className="animate-slide-up delay-200 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            id="play-again-btn"
            onClick={() => navigate('/game')}
            className="btn-primary col-span-2 py-4! text-base!"
          >
            🔁 Play Again
          </button>
          <Link to="/leaderboard" className="btn-secondary py-4! text-sm! text-center">
            🏆 Leaderboard
          </Link>
          <Link to="/history" className="btn-secondary py-4! text-sm! text-center">
            📊 My History
          </Link>
        </div>
      </div>
    </div>
  )
}
