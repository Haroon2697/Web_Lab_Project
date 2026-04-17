import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const MOCK_HISTORY = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200&q=60', correctCountry: 'France', userGuess: 'France', isCorrect: true, score: 224, timeLeft: 12, difficulty: 'medium', date: '2026-04-17' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=60', correctCountry: 'India', userGuess: 'Pakistan', isCorrect: false, score: 0, timeLeft: 0, difficulty: 'hard', date: '2026-04-17' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=60', correctCountry: 'Switzerland', userGuess: 'Switzerland', isCorrect: true, score: 130, timeLeft: 15, difficulty: 'easy', date: '2026-04-16' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=60', correctCountry: 'Indonesia', userGuess: 'Thailand', isCorrect: false, score: 0, timeLeft: 0, difficulty: 'easy', date: '2026-04-16' },
  { id: '5', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=60', correctCountry: 'Italy', userGuess: 'Italy', isCorrect: true, score: 346, timeLeft: 8, difficulty: 'hard', date: '2026-04-15' },
  { id: '6', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=200&q=60', correctCountry: 'Japan', userGuess: 'Japan', isCorrect: true, score: 260, timeLeft: 30, difficulty: 'medium', date: '2026-04-15' },
  { id: '7', imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=60', correctCountry: 'Maldives', userGuess: 'Sri Lanka', isCorrect: false, score: 0, timeLeft: 0, difficulty: 'hard', date: '2026-04-14' },
  { id: '8', imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=200&q=60', correctCountry: 'Italy', userGuess: 'Italy', isCorrect: true, score: 118, timeLeft: 9, difficulty: 'easy', date: '2026-04-14' },
]

const DIFF_COLORS = {
  easy: 'bg-geo-success/15 text-geo-success border-geo-success/30',
  medium: 'bg-geo-warning/15 text-geo-warning border-geo-warning/30',
  hard: 'bg-geo-error/15 text-geo-error border-geo-error/30',
}

export function GameHistoryPage() {
  const [diffFilter, setDiffFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const filtered = useMemo(() => {
    let data = [...MOCK_HISTORY]
    if (diffFilter !== 'all') data = data.filter(h => h.difficulty === diffFilter)
    if (resultFilter === 'correct') data = data.filter(h => h.isCorrect)
    if (resultFilter === 'wrong') data = data.filter(h => !h.isCorrect)
    if (sortBy === 'score') data.sort((a, b) => b.score - a.score)
    else data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return data
  }, [diffFilter, resultFilter, sortBy])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const stats = {
    total: MOCK_HISTORY.length,
    correct: MOCK_HISTORY.filter(h => h.isCorrect).length,
    totalScore: MOCK_HISTORY.reduce((s, h) => s + h.score, 0),
    best: Math.max(...MOCK_HISTORY.map(h => h.score)),
  }
  const accuracy = Math.round((stats.correct / stats.total) * 100)

  return (
    <div className="w-full py-6 sm:py-10">
      <div className="mx-auto max-w-4xl">

        {/* ── Header ────────────────────────────────── */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4 animate-fade-in">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-geo-p50 mb-1">Your Progress</p>
            <h1 className="text-4xl font-black">Game History</h1>
          </div>
          <Link to="/game" className="btn-primary !py-2.5 !px-6">
            🎮 New Game
          </Link>
        </div>

        {/* ── Stats strip ───────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { label: 'Total Games', value: stats.total, icon: '🎮', color: 'text-geo-p50' },
            { label: 'Correct Guesses', value: stats.correct, icon: '✅', color: 'text-geo-success' },
            { label: 'Accuracy', value: `${accuracy}%`, icon: '🎯', color: 'text-geo-aqua' },
            { label: 'Best Score', value: stats.best, icon: '⭐', color: 'text-geo-warning' },
          ].map(s => (
            <div key={s.label} className="geo-card text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-geo-p20 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Accuracy bar ──────────────────────────── */}
        <div className="geo-card mb-8 animate-slide-up delay-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-geo-p10">Overall Accuracy</span>
            <span className="text-sm font-black text-geo-success">{accuracy}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-geo-p20/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-geo-p50 to-geo-success transition-all duration-1000"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-geo-p20">
            <span>{stats.correct} Correct</span>
            <span>{stats.total - stats.correct} Wrong</span>
          </div>
        </div>

        {/* ── Filters ───────────────────────────────── */}
        <div className="geo-card mb-6 animate-slide-up delay-200">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Difficulty filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-geo-p20 font-semibold uppercase tracking-wider">Difficulty</span>
              <div className="flex gap-1.5">
                {['all', 'easy', 'medium', 'hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => { setDiffFilter(d); setPage(1) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                      diffFilter === d
                        ? 'bg-geo-p50 border-geo-p50 text-white'
                        : 'border-geo-p20/20 text-geo-p20 hover:border-geo-p50/40 hover:text-white'
                    }`}
                  >
                    {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Result filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-geo-p20 font-semibold uppercase tracking-wider">Result</span>
              <div className="flex gap-1.5">
                {['all', 'correct', 'wrong'].map(r => (
                  <button
                    key={r}
                    onClick={() => { setResultFilter(r); setPage(1) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                      resultFilter === r
                        ? r === 'correct' ? 'bg-geo-success border-geo-success text-geo-card'
                          : r === 'wrong' ? 'bg-geo-error border-geo-error text-white'
                          : 'bg-geo-p50 border-geo-p50 text-white'
                        : 'border-geo-p20/20 text-geo-p20 hover:border-geo-p50/40 hover:text-white'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-geo-p20 font-semibold uppercase tracking-wider">Sort</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-lg border border-geo-p20/20 bg-geo-bg px-3 py-1.5 text-xs text-geo-p10 focus:border-geo-p50"
              >
                <option value="date">Latest First</option>
                <option value="score">Highest Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── History list ──────────────────────────── */}
        <div className="space-y-3 animate-slide-up delay-300">
          {paged.length === 0 ? (
            <div className="geo-card text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-xl font-bold text-geo-p10">No games match your filters</p>
              <p className="text-geo-p20 mt-2 text-sm">Try adjusting the difficulty or result filter</p>
            </div>
          ) : paged.map((entry, i) => (
            <div
              key={entry.id}
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:border-geo-p50/30 hover:-translate-y-0.5 hover:shadow-lg ${
                entry.isCorrect
                  ? 'border-geo-success/15 bg-geo-success/[0.03]'
                  : 'border-geo-error/15 bg-geo-error/[0.03]'
              } animate-fade-in`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                <img src={entry.imageUrl} alt={entry.correctCountry} className="h-full w-full object-cover" />
                <div className={`absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  entry.isCorrect ? 'bg-geo-success' : 'bg-geo-error'
                }`}>
                  {entry.isCorrect ? '✓' : '✕'}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-bold text-white">{entry.correctCountry}</span>
                  <span className={`geo-badge border text-[10px] ${DIFF_COLORS[entry.difficulty]}`}>
                    {entry.difficulty}
                  </span>
                </div>
                <div className="text-sm text-geo-p20">
                  Your guess:{' '}
                  <span className={entry.isCorrect ? 'text-geo-success font-semibold' : 'text-geo-error font-semibold'}>
                    {entry.userGuess}
                  </span>
                </div>
                <div className="text-xs text-geo-p20/70 mt-0.5">{entry.date}</div>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <span className={`text-2xl font-black ${entry.isCorrect ? 'text-geo-success' : 'text-geo-p20'}`}>
                  +{entry.score}
                </span>
                <div className="text-xs text-geo-p20 mt-0.5">
                  {entry.isCorrect ? `⏱ ${entry.timeLeft}s left` : 'No points'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-xl text-sm font-bold transition-all ${
                  p === page
                    ? 'bg-geo-p50 text-white'
                    : 'border border-geo-p20/20 text-geo-p20 hover:border-geo-p50/40 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-secondary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}

        {/* Summary total */}
        <p className="mt-4 text-center text-xs text-geo-p20">
          Showing {paged.length} of {filtered.length} games · Total Score: <span className="text-geo-warning font-bold">{stats.totalScore.toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}
