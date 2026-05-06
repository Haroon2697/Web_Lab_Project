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
import { stringify as formEncode } from 'node:querystring'

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

function mapScoreByDistance(distanceKm, difficulty) {
  // Score decreases as distance increases.
  // Exact pin (0km) -> 5000 points.
  // Past the max distance, score -> 0.
  const MAX_SCORE = 5000
  const MAX_DISTANCE_BY_DIFF = {
    easy: 8000,
    medium: 6000,
    hard: 4000,
  }
  const maxDist = MAX_DISTANCE_BY_DIFF[difficulty] ?? 6000
  const d = Math.max(0, Number(distanceKm ?? 0))
  const ratio = 1 - Math.min(d, maxDist) / maxDist
  return Math.round(MAX_SCORE * ratio)
}

function correctThresholdKm(difficulty) {
  // "Correct" for achievements/UX (separate from continuous score).
  return difficulty === 'easy' ? 500 : difficulty === 'hard' ? 250 : 350
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
      'https://restcountries.com/v3.1/all?fields=name,flags,latlng,capital,capitalInfo,region,subregion,population',
      { timeout: HTTP_TIMEOUT_MS },
    )
    countryCache = data
      .map((c) => ({
        name: c.name?.common,
        flag: c.flags?.png || c.flags?.svg || '',
        latlng: c.latlng || [0, 0], // [lat, lng]
        capital: Array.isArray(c.capital) ? c.capital[0] : (c.capital || ''),
        capitalLatlng: c.capitalInfo?.latlng || null,
        region: c.region || '',
        subregion: c.subregion || '',
        population: typeof c.population === 'number' ? c.population : null,
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

function getCountryMeta(countryName) {
  if (!countryCache) return null
  const match = countryCache.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase(),
  )
  if (!match) return null
  return {
    capital: match.capital || null,
    capitalLatlng: match.capitalLatlng || null,
    region: match.region || null,
    subregion: match.subregion || null,
    flag: match.flag || null,
    population: match.population ?? null,
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function jitterLatLng({ lat, lng }, maxDeltaDeg) {
  const dLat = (Math.random() * 2 - 1) * maxDeltaDeg
  const dLng = (Math.random() * 2 - 1) * maxDeltaDeg
  return {
    lat: clamp(lat + dLat, -85, 85),
    lng: ((lng + dLng + 540) % 360) - 180,
  }
}

function toOsvUrl(path) {
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `https://api.openstreetcam.org/${String(path).replace(/^\/+/, '')}`
}

async function fetchOpenStreetCamPhoto({ lat, lng, radiusMeters, ipp = 30 }) {
  // Public endpoint (no token): returns nearby crowd-sourced street photos.
  const url = 'https://api.openstreetcam.org/1.0/list/nearby-photos/'
  try {
    const { data } = await axios.post(
      url,
      formEncode({ lat, lng, radius: radiusMeters, ipp, page: 1 }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: HTTP_TIMEOUT_MS,
      },
    )

    const items = Array.isArray(data?.currentPageItems) ? data.currentPageItems : []
    if (items.length === 0) return null

    // Prefer large thumbnail for performance; fallback to full image.
    const pick = items[Math.floor(Math.random() * items.length)]
    const imageUrl = toOsvUrl(pick.lth_name || pick.name || pick.th_name)
    if (!imageUrl) return null

    return {
      url: imageUrl,
      credit: pick.user ? `KartaView • ${pick.user}` : 'KartaView',
    }
  } catch (err) {
    // Treat as "no coverage" and allow fallback.
    return null
  }
}

async function fetchMapillaryImage({ lat, lng, radiusMeters, limit = 40 }) {
  if (!config.MAPILLARY_ACCESS_TOKEN) return null

  // Mapillary radius search max is 25m; for a "nearby" search that works in practice,
  // we use a small bbox (Mapillary allows bbox < 0.01 degrees square).
  const metersToDeg = (m) => m / 111_320
  const d = clamp(metersToDeg(radiusMeters), 0.00015, 0.0045) // ~17m .. ~500m
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`

  try {
    const { data } = await axios.get('https://graph.mapillary.com/images', {
      params: {
        fields: 'id,thumb_2048_url,creator,is_pano',
        bbox,
        limit,
      },
      headers: {
        Authorization: `OAuth ${config.MAPILLARY_ACCESS_TOKEN}`,
      },
      timeout: HTTP_TIMEOUT_MS,
    })

    const items = Array.isArray(data?.data) ? data.data : []
    const usable = items.filter((i) => i?.thumb_2048_url && i.is_pano !== true)
    if (usable.length === 0) return null

    const pick = usable[Math.floor(Math.random() * usable.length)]
    return {
      url: pick.thumb_2048_url,
      credit: pick.creator?.username ? `Mapillary • ${pick.creator.username}` : 'Mapillary',
    }
  } catch {
    return null
  }
}

async function fetchMapillaryStreetPhotoNear(point, cfg) {
  if (!config.MAPILLARY_ACCESS_TOKEN) return null

  for (let i = 0; i < cfg.attempts; i++) {
    const p = jitterLatLng(point, cfg.jitter)
    const img = await fetchMapillaryImage({
      lat: p.lat,
      lng: p.lng,
      radiusMeters: cfg.radius,
      limit: cfg.limit,
    })
    if (img?.url) return img
  }
  return null
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

async function firstNonNull(promises) {
  try {
    // Resolve the first promise that returns a truthy value.
    return await Promise.any(
      promises.map((p) =>
        Promise.resolve(p).then((v) => (v ? v : Promise.reject(new Error('empty')))),
      ),
    )
  } catch {
    return null
  }
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
      // Bias toward street scenes + famous places + capital landmarks.
      params: {
        query,
        orientation: 'landscape',
      },
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

async function fetchUnsplashImageFromQueries(queries) {
  for (const q of queries) {
    const image = await fetchUnsplashImage(q)
    if (image?.url) return image
  }
  // Always return something deterministic.
  return fetchUnsplashImage(queries[0] || 'world')
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
    const meta = getCountryMeta(correctCountry)

    // 1) Try OpenStreetCam/KartaView street-level photos (free, if coverage exists).
    const baseLatlngArr = meta?.capitalLatlng || null
    const basePoint = baseLatlngArr
      ? { lat: baseLatlngArr[0], lng: baseLatlngArr[1] }
      : { lat: countries[correctIdx].latlng?.[0] ?? 0, lng: countries[correctIdx].latlng?.[1] ?? 0 }

    const mapillaryCfg =
      difficulty === 'easy'
        ? { attempts: 6, jitter: 0.01, radius: 350, limit: 80 }
        : difficulty === 'hard'
          ? { attempts: 7, jitter: 0.25, radius: 600, limit: 90 }
          : { attempts: 6, jitter: 0.06, radius: 450, limit: 85 }

    const osvCfg =
      difficulty === 'easy'
        ? { jitter: 0.15, radius: 450 }
        : difficulty === 'hard'
          ? { jitter: 2.5, radius: 1800 }
          : { jitter: 0.7, radius: 900 }

    // Performance: cap image selection time and run providers in parallel.
    // This avoids long waits when a provider is slow or has no coverage.
    const IMAGE_BUDGET_MS = 3500
    const mapillaryPromise = withTimeout(fetchMapillaryStreetPhotoNear(basePoint, mapillaryCfg), 2000)

    const osvPoint = jitterLatLng(basePoint, osvCfg.jitter)
    const osvPromise = withTimeout(
      fetchOpenStreetCamPhoto({
        lat: osvPoint.lat,
        lng: osvPoint.lng,
        radiusMeters: osvCfg.radius,
      }),
      2000,
    )

    const capital = meta?.capital || ''

    // Difficulty-based image specificity:
    // - easy: capital + famous landmarks (most recognizable)
    // - medium: country + landmark/street (moderately recognizable)
    // - hard: country + generic nature/streets (more vague)
    const easyQueries = [
      `${capital || correctCountry} famous landmark`,
      `${capital || correctCountry} tourist attraction`,
      `${capital || correctCountry} street`,
      `${correctCountry} capital city landmark`,
    ]
    const mediumQueries = [
      `${correctCountry} landmark`,
      `${correctCountry} downtown street`,
      `${correctCountry} city skyline`,
    ]
    const hardQueries = [
      `${correctCountry} landscape`,
      `${correctCountry} countryside`,
      `${correctCountry} nature`,
      `${correctCountry} street`,
    ]

    const queries =
      difficulty === 'easy'
        ? easyQueries
        : difficulty === 'hard'
          ? hardQueries
          : mediumQueries

    const unsplashPromise = withTimeout(fetchUnsplashImageFromQueries(queries), 1200)

    // Fetch image (best-effort within budget)
    const image =
      (await withTimeout(firstNonNull([mapillaryPromise, osvPromise, unsplashPromise]), IMAGE_BUDGET_MS)) ||
      (await fetchUnsplashImageFromQueries(queries))

    res.json({
      correctCountry,
      imageUrl: image.url,
      imageCredit: image.credit,
      difficulty,
      timeLimit,
      countryMeta: meta,
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
      userGuess = '',
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

    if (!correctCountry) {
      return res.status(400).json({ message: 'correctCountry is required' })
    }

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
    if (guessCoords && correctLatlng) {
      distance = Math.round(
        haversineDistance(guessCoords.lat, guessCoords.lng, correctLatlng.lat, correctLatlng.lng),
      )
    }

    // Continuous map scoring.
    const score = distance != null ? mapScoreByDistance(distance, difficulty) : 0
    const baseScore = score
    const distanceBonus = 0
    const isCorrect =
      distance != null ? distance <= correctThresholdKm(difficulty) : false

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

    // Update user stats, streak, and achievements
    const user = await User.findById(req.user._id)
    const now = new Date()
    const lastPlayed = user.lastPlayedDate

    let newStreak = user.currentStreak || 0
    if (lastPlayed) {
      // Calculate start of today and start of last played day
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const lastPlayDay = new Date(lastPlayed.getFullYear(), lastPlayed.getMonth(), lastPlayed.getDate())
      
      const msPerDay = 1000 * 60 * 60 * 24
      const daysDiff = Math.round((today - lastPlayDay) / msPerDay)
      
      if (daysDiff === 1) {
        newStreak += 1
      } else if (daysDiff > 1) {
        newStreak = 1
      }
    } else {
      newStreak = 1
    }

    // Achievements logic
    const newAchievements = []
    const totalGames = user.gamesPlayed + 1
    const newTotalScore = user.totalScore + score
    
    const award = (name) => {
      if (!user.achievements.includes(name)) {
        user.achievements.push(name)
        newAchievements.push(name)
      }
    }

    award('First Game')
    if (totalGames >= 10) award('Globetrotter')
    if (distance !== null && distance <= 100) award('Sharpshooter')
    if (distance !== null && distance <= 50) award('Perfect Guess')
    if (newStreak >= 3) award('On Fire 🔥')
    if (newStreak >= 7) award('Unstoppable 🌟')
    if (newTotalScore >= 1000) award('Explorer Elite')

    user.totalScore = newTotalScore
    user.gamesPlayed = totalGames
    if (score > (user.highestScore || 0)) {
      user.highestScore = score
    }
    user.currentStreak = newStreak
    user.lastPlayedDate = now
    await user.save()

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
      newAchievements,
      currentStreak: newStreak,
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
