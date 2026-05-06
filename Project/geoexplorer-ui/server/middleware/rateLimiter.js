const rateLimitCache = new Map()

export function rateLimiter(req, res, next) {
  const ip = req.ip
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100

  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, { count: 1, startTime: now })
    return next()
  }

  const record = rateLimitCache.get(ip)
  if (now - record.startTime > windowMs) {
    record.count = 1
    record.startTime = now
    return next()
  }

  record.count++
  if (record.count > maxRequests) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' })
  }
  
  next()
}
