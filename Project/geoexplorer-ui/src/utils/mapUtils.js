/**
 * Map utilities — Haversine distance, formatting, country coords lookup.
 */

/** Haversine distance between two lat/lng points (returns km). */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in km
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Format distance for display. */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  if (km < 100) return `${km.toFixed(1)} km`
  return `${Math.round(km).toLocaleString()} km`
}

/** Calculate map accuracy bonus based on distance. */
export function mapAccuracyBonus(distanceKm) {
  if (distanceKm <= 50) return 100
  if (distanceKm <= 150) return 75
  if (distanceKm <= 500) return 50
  if (distanceKm <= 1000) return 25
  if (distanceKm <= 2000) return 10
  return 0
}

/** Get midpoint between two coordinates for label placement. */
export function getMidpoint(lat1, lng1, lat2, lng2) {
  return {
    lat: (lat1 + lat2) / 2,
    lng: (lng1 + lng2) / 2,
  }
}
