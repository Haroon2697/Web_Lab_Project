/**
 * Game controller — start game, submit guess, get history.
 *
 * startGame:
 *   1. Picks a random country from REST Countries API
 *   2. Fetches a landscape photo from Unsplash for that country
 *   3. Generates 3 wrong options + the correct one
 *   4. Returns image + shuffled options to frontend
 *
 * submitGuess:
 *   1. Evaluates the user's guess
 *   2. Calculates score (country match + distance bonus)
 *   3. Saves the GameSession
 *   4. Updates user stats
 *   5. Returns correctLatlng + distance for map visualization
 */
import axios from 'axios'
import GameSession from '../models/GameSession.js'
import User from '../models/User.js'
import { calcScore, TIME_LIMITS } from '../utils/scoreCalc.js'
import { config } from '../config/env.js'

const HTTP_TIMEOUT_MS = 6000
const IMAGE_CACHE_TTL_MS = 1000 * 60 * 60 * 6 // 6 hours
const IMAGE_CACHE_MAX = 300

/* ── Helper: Shuffle array (Fisher-Yates) ──────────────────── */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ── Haversine distance (km) ───────────────────────────────── */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/* ── Map distance bonus ────────────────────────────────────── */
function mapDistanceBonus(distanceKm) {
  if (distanceKm <= 50) return 100
  if (distanceKm <= 150) return 75
  if (distanceKm <= 500) return 50
  if (distanceKm <= 1000) return 25
  if (distanceKm <= 2000) return 10
  return 0
}

/* ── Cached country list (fetched once, now includes latlng) ── */
let countryCache = null
const imageCache = new Map()

function getCachedImage(queryKey) {
  const record = imageCache.get(queryKey)
  if (!record) return null

  if (Date.now() - record.cachedAt > IMAGE_CACHE_TTL_MS) {
    imageCache.delete(queryKey)
    return null
  }
  return record.image
}

function setCachedImage(queryKey, image) {
  if (imageCache.size >= IMAGE_CACHE_MAX) {
    // Evict oldest cached entry first.
    const oldestKey = imageCache.keys().next().value
    if (oldestKey) imageCache.delete(oldestKey)
  }
  imageCache.set(queryKey, { image, cachedAt: Date.now() })
}

async function getAllCountries() {
  if (countryCache) return countryCache
  try {
    const { data } = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,flags,latlng',
      { timeout: HTTP_TIMEOUT_MS },
    )
    countryCache = data
      .map((c) => ({
        name: c.name?.common,
        flag: c.flags?.png || c.flags?.svg || '',
        latlng: c.latlng || [0, 0], // [lat, lng]
      }))
      .filter((c) => c.name)
    return countryCache
  } catch (err) {
    console.error('REST Countries API error:', err.message)
    // Fallback list so game still works offline (with approximate coords)
    countryCache = [
      { name: 'France', flag: '', latlng: [46.0, 2.0] },
      { name: 'Japan', flag: '', latlng: [36.0, 138.0] },
      { name: 'Brazil', flag: '', latlng: [-14.0, -51.0] },
      { name: 'Australia', flag: '', latlng: [-25.0, 133.0] },
      { name: 'Egypt', flag: '', latlng: [27.0, 30.0] },
      { name: 'Canada', flag: '', latlng: [56.0, -106.0] },
      { name: 'Italy', flag: '', latlng: [42.8, 12.8] },
      { name: 'India', flag: '', latlng: [20.6, 79.0] },
      { name: 'Germany', flag: '', latlng: [51.2, 10.5] },
      { name: 'Mexico', flag: '', latlng: [23.6, -102.6] },
      { name: 'Turkey', flag: '', latlng: [39.0, 35.2] },
      { name: 'Thailand', flag: '', latlng: [15.9, 100.9] },
      { name: 'Spain', flag: '', latlng: [40.5, -3.7] },
      { name: 'Kenya', flag: '', latlng: [-0.02, 37.9] },
      { name: 'Argentina', flag: '', latlng: [-38.4, -63.6] },
      { name: 'South Korea', flag: '', latlng: [35.9, 127.8] },
      { name: 'United Kingdom', flag: '', latlng: [55.4, -3.4] },
      { name: 'United States', flag: '', latlng: [37.1, -95.7] },
      { name: 'China', flag: '', latlng: [35.9, 104.2] },
      { name: 'South Africa', flag: '', latlng: [-30.6, 22.9] },
    ]
    return countryCache
  }
}

/** Look up coordinates for a country name. */
async function getCountryCoords(countryName) {
  const countries = await getAllCountries()
  const match = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase(),
  )
  return match ? { lat: match.latlng[0], lng: match.latlng[1] } : null
}

/* ── Fetch image from Unsplash ─────────────────────────────── */
async function fetchUnsplashImage(query) {
  const queryKey = query.trim().toLowerCase()
  const cached = getCachedImage(queryKey)
  if (cached) return cached

  const fallback = {
    // Deterministic and fast fallback image source
    url: `https://picsum.photos/seed/${encodeURIComponent(query)}/1200/800`,
    credit: 'Picsum',
  }

  if (!config.UNSPLASH_ACCESS_KEY) {
    setCachedImage(queryKey, fallback)
    return fallback
  }
  try {
    const { data } = await axios.get('https://api.unsplash.com/photos/random', {
      params: { query: `${query} landmark landscape`, orientation: 'landscape' },
      headers: { Authorization: `Client-ID ${config.UNSPLASH_ACCESS_KEY}` },
      timeout: HTTP_TIMEOUT_MS,
    })
    const image = {
      url: data.urls?.regular || data.urls?.full || '',
      credit: data.user?.name || 'Unsplash',
    }
    setCachedImage(queryKey, image.url ? image : fallback)
    return image.url ? image : fallback
  } catch (err) {
    console.error('Unsplash API error:', err.message)
    setCachedImage(queryKey, fallback)
    return fallback
  }
}

/**
 * POST /api/game/start
 * @body { difficulty: 'easy' | 'medium' | 'hard' }
 */
export async function startGame(req, res) {
  try {
    const { difficulty = 'medium' } = req.body
    const timeLimit = TIME_LIMITS[difficulty] ?? 30

    const countries = await getAllCountries()

    // Pick a random correct country
    const correctIdx = Math.floor(Math.random() * countries.length)
    const correctCountry = countries[correctIdx].name

    // Pick 3 unique wrong options
    const wrongOptions = []
    const usedIndices = new Set([correctIdx])
    while (wrongOptions.length < 3 && usedIndices.size < countries.length) {
      const idx = Math.floor(Math.random() * countries.length)
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx)
        wrongOptions.push(countries[idx].name)
      }
    }

    const options = shuffle([correctCountry, ...wrongOptions])

    // Fetch image
    const image = await fetchUnsplashImage(correctCountry)

    res.json({
      correctCountry,
      imageUrl: image.url,
      imageCredit: image.credit,
      options,
      difficulty,
      timeLimit,
    })
  } catch (err) {
    console.error('startGame error:', err)
    res.status(500).json({ message: 'Failed to start game session' })
  }
}

/**
 * POST /api/game/submit
 * @body { correctCountry, userGuess, imageUrl, imageCredit, options,
 *         difficulty, timeLimit, timeLeft, guessLatlng? }
 */
export async function submitGuess(req, res) {
  try {
    const {
      correctCountry,
      userGuess,
      imageUrl,
      imageCredit = '',
      options = [],
      difficulty = 'medium',
      timeLimit = 30,
      timeLeft = 0,
      guessLatlng = null,
      guessPosition = null,
      correctPosition = null,
    } = req.body

    if (!correctCountry || !userGuess) {
      return res.status(400).json({ message: 'correctCountry and userGuess are required' })
    }

    const isCorrect = userGuess.trim().toLowerCase() === correctCountry.trim().toLowerCase()

    // Look up correct country coordinates (allow frontend-provided fallback)
    const lookupCoords = await getCountryCoords(correctCountry)
    const correctLatlng =
      (correctPosition && correctPosition.lat != null && correctPosition.lng != null
        ? correctPosition
        : lookupCoords)

    const guessCoords =
      (guessLatlng && guessLatlng.lat != null && guessLatlng.lng != null
        ? guessLatlng
        : guessPosition && guessPosition.lat != null && guessPosition.lng != null
          ? guessPosition
          : null)

    // Calculate distance if user placed a map pin
    let distance = null
    let distanceBonus = 0
    if (guessCoords && correctLatlng) {
      distance = Math.round(
        haversineDistance(guessCoords.lat, guessCoords.lng, correctLatlng.lat, correctLatlng.lng),
      )
      distanceBonus = mapDistanceBonus(distance)
    }

    // Score = base country score + map distance bonus
    const baseScore = calcScore({ isCorrect, difficulty, timeLeft })
    const score = baseScore + distanceBonus

    // Save game session
    const session = await GameSession.create({
      user: req.user._id,
      imageUrl,
      imageCredit,
      options,
      correctCountry,
      userGuess,
      isCorrect,
      score,
      timeLimit,
      timeLeft,
      difficulty,
      guessLatlng: guessCoords || undefined,
      correctLatlng: correctLatlng || undefined,
      distance: distance ?? undefined,
    })

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalScore: score, gamesPlayed: 1 },
      ...(score > (req.user.highestScore || 0) ? { highestScore: score } : {}),
    })

    res.json({
      sessionId: session._id,
      isCorrect,
      correctCountry,
      userGuess,
      score,
      baseScore,
      distanceBonus,
      mapBonus: distanceBonus,
      timeLeft,
      difficulty,
      correctLatlng,
      guessLatlng: guessCoords,
      distance,
      distanceKm: distance,
      correctPosition: correctLatlng,
      guessPosition: guessCoords,
    })
  } catch (err) {
    console.error('submitGuess error:', err)
    res.status(500).json({ message: 'Failed to submit guess' })
  }
}

/**
 * GET /api/game/history
 * @query page, limit, difficulty, sort
 */
export async function getHistory(req, res) {
  try {
    const { page = 1, limit = 10, difficulty, sort = '-createdAt' } = req.query

    const filter = { user: req.user._id }
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      filter.difficulty = difficulty
    }

    const total = await GameSession.countDocuments(filter)
    const sessions = await GameSession.find(filter)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean()

    res.json({
      sessions,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      total,
    })
  } catch (err) {
    console.error('getHistory error:', err)
    res.status(500).json({ message: 'Failed to fetch game history' })
  }
}
