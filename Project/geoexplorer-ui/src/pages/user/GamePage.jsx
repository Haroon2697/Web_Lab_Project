import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Mock data — replace with Redux dispatch(startGame()) when backend is ready
const MOCK_SESSION = {
  sessionId: 'mock_001',
  imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
  options: ['France', 'Germany', 'Italy', 'Spain'],
  correctCountry: 'France',
  difficulty: 'medium',
  timeLimit: 30,
}

const DIFFICULTY_OPTS = [
  { value: 'easy', label: '🟢 Easy', time: 45, points: '100 pts' },
  { value: 'medium', label: '🟡 Medium', time: 30, points: '200 pts' },
  { value: 'hard', label: '🔴 Hard', time: 15, points: '300 pts' },
]

export function GamePage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('select')
  const [difficulty, setDifficulty] = useState('medium')
  const [session] = useState(MOCK_SESSION)
  const [guess, setGuess] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hoveredOption, setHoveredOption] = useState(null)
  const intervalRef = useRef(null)

  const diffCfg = DIFFICULTY_OPTS.find(d => d.value === difficulty) ?? DIFFICULTY_OPTS[1]

  // Start timer when playing
  useEffect(() => {
    if (phase !== 'playing') return
    setTimeLeft(diffCfg.time)
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          navigate('/result', { state: { sessionId: session.sessionId, userGuess: guess || '', correctCountry: session.correctCountry, score: 0, timeLeft: 0, difficulty } })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [phase])

  const timerPct = (timeLeft / diffCfg.time) * 100
  const timerColor = timerPct > 50 ? 'bg-geo-success' : timerPct > 25 ? 'bg-geo-warning animate-timer-pulse' : 'bg-geo-error animate-timer-pulse'

  const handleSubmit = () => {
    if (!guess) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    navigate('/result', {
      state: { sessionId: session.sessionId, userGuess: guess, correctCountry: session.correctCountry, score: 0, timeLeft, difficulty },
    })
  }

  /* ── DIFFICULTY SELECTOR ─────────────────────────────────────── */
  if (phase === 'select') {
    return (
      <div className="flex min-h-[calc(100dvh-14rem)] w-full items-center justify-center py-8">
        <div className="w-full max-w-lg animate-fade-in">
          {/* Back */}
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-geo-p20 hover:text-white transition-colors">
            ← Back to Home
          </Link>

          <div className="geo-card">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-geo-p50/20 text-4xl">🎮</div>
              <h1 className="text-3xl font-black">Choose Difficulty</h1>
              <p className="mt-2 text-geo-p10">Higher difficulty = more points. Can you handle Hard mode?</p>
            </div>

            <div className="space-y-3 mb-8">
              {DIFFICULTY_OPTS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`w-full flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                    difficulty === opt.value
                      ? 'border-geo-p50 bg-geo-p50/10 text-white'
                      : 'border-geo-p20/20 bg-geo-bg hover:border-geo-p50/40 text-geo-p10'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base">{opt.label}</div>
                    <div className="text-sm text-geo-p20 mt-0.5">⏱ {opt.time}s per round</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="geo-badge bg-geo-p50/20 text-geo-p50">{opt.points}</span>
                    {difficulty === opt.value && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-geo-p50 text-xs text-white">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              id="start-game-btn"
              onClick={() => { setPhase('playing'); setImgLoaded(false) }}
              className="btn-primary w-full !py-4 !text-lg"
            >
              🚀 Start Game
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── PLAYING ─────────────────────────────────────────────────── */
  return (
    <div className="flex w-full flex-col py-4">
      {/* ── Top HUD Bar ─────────────────────────────── */}
      <header className="glass border-b border-geo-p20/10 px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Score */}
          <div className="flex items-center gap-2">
            <span className="text-geo-p20 text-sm">Score</span>
            <span className="text-xl font-black text-geo-warning">1,240</span>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center gap-1 min-w-[120px]">
            <div className={`text-3xl font-black tabular-nums ${
              timeLeft <= 10 ? 'text-geo-error animate-timer-pulse' :
              timeLeft <= 20 ? 'text-geo-warning' : 'text-white'
            }`}>
              {String(timeLeft).padStart(2, '0')}s
            </div>
            <div className="h-1.5 w-32 rounded-full bg-geo-p20/20 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          {/* Player */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-geo-p50 text-sm font-bold">H</div>
            <span className="text-sm font-medium text-geo-p10 hidden sm:block">Haroon</span>
            <span className={`geo-badge ${
              difficulty === 'easy' ? 'bg-geo-success/20 text-geo-success' :
              difficulty === 'medium' ? 'bg-geo-warning/20 text-geo-warning' :
              'bg-geo-error/20 text-geo-error'
            }`}>{difficulty}</span>
          </div>
        </div>
      </header>

      {/* ── Main Game Area ───────────────────────────── */}
      <div className="flex flex-1 flex-col lg:flex-row gap-0">

        {/* Left — Location Image (70%) */}
        <div className="relative flex-1 lg:w-[70%] min-h-[400px] lg:min-h-0 bg-geo-card overflow-hidden">
          {/* Skeleton while loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="skeleton absolute inset-0" />
              <div className="relative z-10 text-center">
                <div className="h-10 w-10 rounded-full border-2 border-geo-p50/30 border-t-geo-p50 animate-spin mx-auto mb-3" />
                <p className="text-geo-p20 text-sm">Loading location...</p>
              </div>
            </div>
          )}

          <img
            src={session.imageUrl}
            alt="Mystery Location"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Image overlay info */}
          {imgLoaded && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-geo-p20 mb-1">Mystery Location</p>
                  <p className="text-white font-semibold">📸 Photo from Unsplash · Study the clues</p>
                </div>
                <button className="glass rounded-xl px-3 py-2 text-xs font-medium text-geo-aqua hover:text-white transition-colors">
                  💡 Use Hint
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Controls Panel (30%) */}
        <div className="lg:w-[30%] flex flex-col border-l border-geo-p20/10 bg-geo-card">
          <div className="flex flex-1 flex-col p-6 gap-5">

            {/* Round info */}
            <div className="rounded-xl border border-geo-p20/20 bg-geo-bg px-4 py-3">
              <p className="text-xs text-geo-p20 uppercase tracking-widest mb-1">Round</p>
              <p className="text-xl font-black">1 / 5</p>
            </div>

            {/* Country options */}
            <div>
              <p className="mb-3 text-sm font-semibold text-geo-p10 uppercase tracking-wider">Select Country</p>
              <div className="grid grid-cols-1 gap-2">
                {session.options.map((opt) => (
                  <button
                    key={opt}
                    id={`option-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setGuess(opt)}
                    onMouseEnter={() => setHoveredOption(opt)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 overflow-hidden ${
                      guess === opt
                        ? 'border-geo-p50 bg-geo-p50/20 text-white shadow-lg shadow-geo-p50/10'
                        : 'border-geo-p20/20 bg-geo-bg hover:border-geo-p50/50 hover:bg-geo-p50/5 text-geo-p10'
                    }`}
                  >
                    {/* Selection indicator */}
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      guess === opt
                        ? 'border-geo-p50 bg-geo-p50'
                        : 'border-geo-p20/40'
                    }`}>
                      {guess === opt && <span className="text-white text-xs">✓</span>}
                    </span>
                    <span>{opt}</span>

                    {/* Hover wave */}
                    {hoveredOption === opt && guess !== opt && (
                      <span className="absolute inset-0 bg-geo-p50/5 rounded-xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-auto space-y-3">
              <button
                id="submit-answer-btn"
                onClick={handleSubmit}
                disabled={!guess}
                className={`w-full rounded-xl py-4 text-base font-bold transition-all duration-200 ${
                  guess
                    ? 'btn-primary'
                    : 'cursor-not-allowed bg-geo-p20/10 text-geo-p20 border border-geo-p20/20'
                }`}
              >
                {guess ? `Submit — ${guess} →` : 'Select a Country First'}
              </button>

              <Link to="/" className="block text-center text-sm text-geo-p20 hover:text-white transition-colors">
                ✕ Quit Game
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
