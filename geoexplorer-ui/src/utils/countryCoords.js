/**
 * Approximate country center coordinates used as fallback when backend
 * does not provide exact lat/lng for the answer.
 */
const COUNTRY_COORDS = {
  france: { lat: 46.2276, lng: 2.2137 },
  germany: { lat: 51.1657, lng: 10.4515 },
  italy: { lat: 41.8719, lng: 12.5674 },
  spain: { lat: 40.4637, lng: -3.7492 },
  pakistan: { lat: 30.3753, lng: 69.3451 },
  india: { lat: 20.5937, lng: 78.9629 },
  japan: { lat: 36.2048, lng: 138.2529 },
  switzerland: { lat: 46.8182, lng: 8.2275 },
  indonesia: { lat: -0.7893, lng: 113.9213 },
  thailand: { lat: 15.87, lng: 100.9925 },
  maldives: { lat: 3.2028, lng: 73.2207 },
  'sri lanka': { lat: 7.8731, lng: 80.7718 },
  usa: { lat: 39.8283, lng: -98.5795 },
  'united states': { lat: 39.8283, lng: -98.5795 },
  canada: { lat: 56.1304, lng: -106.3468 },
  brazil: { lat: -14.235, lng: -51.9253 },
  australia: { lat: -25.2744, lng: 133.7751 },
  china: { lat: 35.8617, lng: 104.1954 },
  russia: { lat: 61.524, lng: 105.3188 },
  uk: { lat: 55.3781, lng: -3.436 },
  'united kingdom': { lat: 55.3781, lng: -3.436 },
}

export function getCountryCoordinates(countryName) {
  if (!countryName) return null
  const key = String(countryName).trim().toLowerCase()
  return COUNTRY_COORDS[key] ?? null
}
