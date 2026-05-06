/**
 * Score calculation based on difficulty and remaining time.
 *
 * Scoring formula:
 *   base  = { easy: 100, medium: 200, hard: 300 }
 *   bonus = Math.round((timeLeft / timeLimit) * base * 0.5)
 *   total = correct ? base + bonus : 0
 */
const BASE_POINTS = { easy: 100, medium: 200, hard: 300 }
const TIME_LIMITS = { easy: 60, medium: 45, hard: 30 }

/**
 * @param {object} opts
 * @param {boolean} opts.isCorrect
 * @param {string}  opts.difficulty  — 'easy' | 'medium' | 'hard'
 * @param {number}  opts.timeLeft    — seconds remaining
 * @returns {number} calculated score
 */
export function calcScore({ isCorrect, difficulty, timeLeft }) {
  if (!isCorrect) return 0
  const base = BASE_POINTS[difficulty] ?? 200
  const limit = TIME_LIMITS[difficulty] ?? 30
  const bonus = Math.round((timeLeft / limit) * base * 0.5)
  return base + bonus
}

export { TIME_LIMITS }
