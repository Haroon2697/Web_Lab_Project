import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Mock — in real flow this comes from GamePage navigation state
const MOCK = {
  sessionId: 'mock_001',
  imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
  selectedCountry: 'France',
  options: ['France', 'Germany', 'Italy', 'Spain'],
  correctCountry: 'France',
  timeLeft: 14,
  difficulty: 'medium' as const,
}

export function GuessSubmissionPage() {
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)
  const [changing, setChanging] = useState(false)
  const [newGuess, setNewGuess] = useState('')

  const currentGuess = newGuess || MOCK.selectedCountry

  const handleConfirm = () => {
    setConfirming(true)
    // TODO: dispatch submitAnswer thunk
    setTimeout(() => {
      navigate('/result', {
        state: {
          sessionId: MOCK.sessionId,
          userGuess: currentGuess,
          correctCountry: MOCK.correctCountry,
          score: 0,
          timeLeft: MOCK.timeLeft,
          difficulty: MOCK.difficulty,
        },
      })
    }, 800)
  }

  return (
    <div className="min-h-screen bg-geo-bg flex items-center justify-center px-6 py-16">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-geo-p50/10 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-xl animate-fade-in">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-geo-p50 mb-2">Confirm Your Answer</p>
          <h1 className="text-4xl font-black">Final Answer?</h1>
          <p className="mt-2 text-geo-p10">Review your selection before submitting. You cannot change after confirming.</p>
        </div>

        {/* Location image thumbnail */}
        <div className="geo-card mb-5 overflow-hidden !p-0">
          <div className="relative h-48">
            <img src={MOCK.imageUrl} alt="Location" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-geo-card/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs text-geo-p20 uppercase tracking-widest mb-1">Mystery Location</p>
              <p className="text-sm font-medium">Study it one last time</p>
            </div>
            {/* Timer badge */}
            <div className={`absolute top-3 right-3 glass rounded-xl px-3 py-1.5 ${
              MOCK.timeLeft <= 10 ? 'border border-geo-error/40' : 'border border-geo-warning/30'
            }`}>
              <span className={`text-lg font-black tabular-nums ${MOCK.timeLeft <= 10 ? 'text-geo-error animate-timer-pulse' : 'text-geo-warning'}`}>
                ⏱ {MOCK.timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Selected answer card */}
        <div className="geo-card mb-5">
          <p className="text-xs text-geo-p20 uppercase tracking-widest mb-3">Your Selected Answer</p>
          <div className="flex items-center justify-between rounded-xl border border-geo-p50 bg-geo-p50/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-geo-p50 text-lg font-black text-white">
                ✓
              </div>
              <div>
                <p className="text-xl font-black">{currentGuess}</p>
                <p className="text-xs text-geo-p20 capitalize">Difficulty: {MOCK.difficulty}</p>
              </div>
            </div>
            <button
              onClick={() => setChanging(v => !v)}
              className="text-sm text-geo-aqua hover:text-white transition-colors font-medium"
            >
              ✏️ Change
            </button>
          </div>

          {/* Change dropdown */}
          {changing && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <p className="text-xs text-geo-p20 mb-2">Select a different answer:</p>
              {MOCK.options.filter(o => o !== currentGuess).map(opt => (
                <button
                  key={opt}
                  onClick={() => { setNewGuess(opt); setChanging(false) }}
                  className="w-full flex items-center gap-3 rounded-xl border border-geo-p20/20 bg-geo-bg px-4 py-3 text-left text-sm font-medium text-geo-p10 hover:border-geo-p50/50 hover:text-white transition-all"
                >
                  <span className="h-4 w-4 rounded-full border-2 border-geo-p20/40" />
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Round info strip */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Round', value: '1 / 5' },
            { label: 'Difficulty', value: MOCK.difficulty.charAt(0).toUpperCase() + MOCK.difficulty.slice(1) },
            { label: 'Time Left', value: `${MOCK.timeLeft}s` },
          ].map(item => (
            <div key={item.label} className="rounded-xl border border-geo-p20/20 bg-geo-card px-4 py-3 text-center">
              <p className="text-xs text-geo-p20 mb-1">{item.label}</p>
              <p className="font-black text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/game"
            className="btn-secondary !py-4 !text-base text-center"
          >
            ← Back to Game
          </Link>
          <button
            id="confirm-submit-btn"
            onClick={handleConfirm}
            disabled={confirming}
            className="btn-primary !py-4 !text-base"
          >
            {confirming ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin block" />
                Submitting…
              </span>
            ) : `Confirm — ${currentGuess} ✓`}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-geo-p20">
          Answer locks in immediately on confirm. Good luck! 🍀
        </p>
      </div>
    </div>
  )
}
