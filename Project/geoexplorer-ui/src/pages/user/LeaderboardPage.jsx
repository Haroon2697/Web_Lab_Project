import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard, fetchMyRank } from '../../features/leaderboard/leaderboardSlice'

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' }
const TOP3_GLOW = {
  1: 'border-geo-warning/40 bg-geo-warning/5 shadow-lg shadow-geo-warning/10',
  2: 'border-geo-p20/40 bg-white/[0.02]',
  3: 'border-geo-hint/30 bg-geo-hint/5',
}

export function LeaderboardPage() {
  const dispatch = useDispatch()
  const { players, myRank, loading } = useSelector((state) => state.leaderboard)
  const { user } = useSelector((state) => state.auth)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  useEffect(() => {
    dispatch(fetchLeaderboard(50))
    if (user) dispatch(fetchMyRank())
  }, [dispatch, user])

  const filtered = useMemo(() => {
    if (!search.trim()) return players
    return players.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, players])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const top3 = players.slice(0, 3)

  return (
    <div className="w-full py-6 sm:py-10">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-geo-warning/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">

        {/* ── Header ────────────────────────────────── */}
        <div className="mb-10 text-center animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-geo-warning mb-2">Rankings</p>
          <h1 className="text-5xl font-black mb-3">🏆 Leaderboard</h1>
          <p className="text-geo-p10 text-lg">Top explorers competing for global geography supremacy.</p>
        </div>

        {/* ── Loading skeleton ────────────────────────── */}
        {loading && players.length === 0 && (
          <div className="text-center py-20">
            <div className="h-10 w-10 rounded-full border-2 border-geo-p50/30 border-t-geo-p50 animate-spin mx-auto mb-4" />
            <p className="text-geo-p20">Loading leaderboard...</p>
          </div>
        )}

        {/* ── Top 3 podium ──────────────────────────── */}
        {top3.length >= 3 && (
          <div className="mb-10 grid grid-cols-3 gap-4 animate-slide-up">
            {/* 2nd place */}
            <div className={`flex flex-col items-center rounded-2xl border p-5 pt-8 ${TOP3_GLOW[2]} mt-6`}>
              <div className="text-3xl mb-2">🥈</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-geo-p20/20 text-xl font-black text-geo-p20 mb-2">
                {top3[1].name[0]}
              </div>
              <p className="font-bold text-sm text-center leading-tight">{top3[1].name}</p>
              <p className="text-geo-p20 text-xs mt-1">{top3[1].totalScore?.toLocaleString()} pts</p>
            </div>

            {/* 1st place */}
            <div className={`flex flex-col items-center rounded-2xl border p-5 ${TOP3_GLOW[1]} relative overflow-hidden`}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-geo-warning/30 blur-xl" />
              <div className="relative text-4xl mb-2">🥇</div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-geo-warning bg-geo-warning/20 text-2xl font-black text-geo-warning mb-2">
                {top3[0].name[0]}
              </div>
              <p className="font-black text-base text-center text-geo-warning leading-tight">{top3[0].name}</p>
              <p className="text-geo-warning/70 text-sm mt-1 font-bold">{top3[0].totalScore?.toLocaleString()} pts</p>
              <span className="mt-2 geo-badge bg-geo-warning/20 text-geo-warning border border-geo-warning/30 text-[10px]">CHAMPION</span>
            </div>

            {/* 3rd place */}
            <div className={`flex flex-col items-center rounded-2xl border p-5 pt-8 ${TOP3_GLOW[3]} mt-6`}>
              <div className="text-3xl mb-2">🥉</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-geo-hint/20 text-xl font-black text-geo-hint mb-2">
                {top3[2].name[0]}
              </div>
              <p className="font-bold text-sm text-center leading-tight">{top3[2].name}</p>
              <p className="text-geo-p20 text-xs mt-1">{top3[2].totalScore?.toLocaleString()} pts</p>
            </div>
          </div>
        )}

        {/* ── Your position highlight ───────────────── */}
        {myRank && (
          <div className="mb-6 animate-slide-up delay-100 rounded-2xl border border-geo-p50/30 bg-geo-p50/10 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-geo-p50 font-black text-white">{user?.name?.[0] || 'H'}</div>
              <div>
                <p className="font-bold text-white">Your Rank</p>
                <p className="text-xs text-geo-p20">Keep playing to move up!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-geo-p50">#{myRank.rank}</p>
              <p className="text-sm text-geo-p20">{myRank.totalScore?.toLocaleString()} pts</p>
            </div>
          </div>
        )}

        {/* ── Search bar ────────────────────────────── */}
        <div className="mb-6 animate-slide-up delay-200">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-geo-p20 text-lg">🔍</span>
            <input
              id="leaderboard-search"
              type="text"
              placeholder="Search player name…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="geo-input pl-12"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-geo-p20 hover:text-white transition-colors text-sm"
              >✕</button>
            )}
          </div>
        </div>

        {/* ── Table ─────────────────────────────────── */}
        <div className="geo-card animate-slide-up delay-300 overflow-hidden !p-0">
          {/* Table header */}
          <div className="grid grid-cols-12 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-geo-p20 border-b border-geo-p20/10">
            <span className="col-span-1">Rank</span>
            <span className="col-span-5">Player</span>
            <span className="col-span-2 text-center">Games</span>
            <span className="col-span-2 text-center">Avg</span>
            <span className="col-span-2 text-right">Score</span>
          </div>

          {/* Rows */}
          {paged.length === 0 ? (
            <div className="py-16 text-center text-geo-p20">
              {players.length === 0 ? 'No players yet — be the first!' : `No players match "${search}"`}
            </div>
          ) : paged.map((entry, i) => {
            const isMe = user && entry._id === user._id
            const avg = entry.gamesPlayed > 0 ? Math.round(entry.totalScore / entry.gamesPlayed) : 0
            return (
              <div
                key={entry._id || i}
                className={`grid grid-cols-12 items-center px-6 py-4 border-b border-geo-p20/10 last:border-0 transition-colors hover:bg-geo-p50/5 ${
                  isMe ? 'bg-geo-p50/10' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Rank */}
                <div className="col-span-1">
                  {entry.rank <= 3 ? (
                    <span className="text-xl">{MEDAL[entry.rank]}</span>
                  ) : (
                    <span className={`text-sm font-bold ${isMe ? 'text-geo-p50' : 'text-geo-p20'}`}>
                      #{entry.rank}
                    </span>
                  )}
                </div>

                {/* Player */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black flex-shrink-0 ${
                    entry.rank === 1 ? 'bg-geo-warning/20 text-geo-warning border border-geo-warning/40' :
                    isMe ? 'bg-geo-p50 text-white' :
                    'bg-geo-p20/10 text-geo-p20'
                  }`}>
                    {entry.name[0]}
                  </div>
                  <div>
                    <span className={`font-semibold text-sm ${isMe ? 'text-geo-p50' : entry.rank <= 3 ? 'text-white' : 'text-geo-p10'}`}>
                      {entry.name}
                    </span>
                    {isMe && (
                      <span className="ml-2 geo-badge bg-geo-p50/20 text-geo-p50 border border-geo-p50/30 text-[10px]">You</span>
                    )}
                  </div>
                </div>

                {/* Games */}
                <div className="col-span-2 text-center text-sm text-geo-p20">{entry.gamesPlayed}</div>

                {/* Avg score */}
                <div className="col-span-2 text-center">
                  <span className="text-sm font-semibold text-geo-p10">{avg}</span>
                </div>

                {/* Score */}
                <div className={`col-span-2 text-right font-black text-base ${
                  entry.rank === 1 ? 'text-geo-warning' :
                  isMe ? 'text-geo-p50' : 'text-white'
                }`}>
                  {entry.totalScore?.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Pagination ────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="btn-secondary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-xl text-sm font-bold transition-all ${
                  p === page ? 'bg-geo-p50 text-white' : 'border border-geo-p20/20 text-geo-p20 hover:border-geo-p50/40 hover:text-white'
                }`}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="btn-secondary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              Next →
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-geo-p20 mb-4">Want to climb the leaderboard?</p>
          <Link to="/game" className="btn-primary !px-10 !py-3">🎮 Play Now</Link>
        </div>
      </div>
    </div>
  )
}
