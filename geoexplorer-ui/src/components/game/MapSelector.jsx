/**
 * Interactive map component for the GeoExplorer game.
 *
 * Features:
 *   - Dark-themed CartoDB tiles
 *   - Click to place guess marker (pulsing purple pin)
 *   - After submit: shows correct location (green pin)
 *   - Animated dashed line between guess → correct
 *   - Distance label at midpoint
 *   - Auto-zoom to fit both markers
 */
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet'
import { useState, useEffect, useMemo } from 'react'
import L from 'leaflet'
import { formatDistance, getMidpoint } from '../../utils/mapUtils'

/* ── Fix Leaflet default icon paths ────────────────────────── */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/* ── Custom marker icons ───────────────────────────────────── */
function createDivIcon(color, glow, emoji, pulse = false) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        position:relative; width:38px; height:38px;
      ">
        ${pulse ? `<div style="
          position:absolute; inset:-6px; border-radius:50%;
          background:${color}33; animation:mapPulse 2s ease-out infinite;
        "></div>` : ''}
        <div style="
          width:38px; height:38px;
          background:${color};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 12px ${glow};
          border:2px solid rgba(255,255,255,0.3);
        ">
          <span style="transform:rotate(45deg); font-size:16px; line-height:1;">${emoji}</span>
        </div>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40],
  })
}

const guessIcon = createDivIcon('#7950e5', '#7950e580', '📍', true)
const correctIcon = createDivIcon('#22c55e', '#22c55e80', '✅', false)

/* ── Distance label as a divIcon marker ────────────────────── */
function createDistanceLabel(text) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        background:rgba(15,15,25,0.9); color:#3ae8bd;
        padding:6px 14px; border-radius:12px;
        font-size:13px; font-weight:800; white-space:nowrap;
        border:1px solid rgba(58,232,189,0.3);
        box-shadow:0 4px 20px rgba(0,0,0,0.4);
        backdrop-filter:blur(8px);
        transform:translate(-50%,-50%);
      ">${text}</div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

/* ── Sub-component: click handler ──────────────────────────── */
function ClickHandler({ onPositionSelect, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onPositionSelect(e.latlng)
    },
  })
  return null
}

/* ── Sub-component: auto-fit bounds ────────────────────────── */
function FitBounds({ positions }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length >= 2) {
      const bounds = L.latLngBounds(positions)
      setTimeout(() => {
        map.flyToBounds(bounds, {
          padding: [60, 60],
          maxZoom: 6,
          duration: 1.5,
        })
      }, 400)
    }
  }, [positions, map])
  return null
}

/* ── Main MapSelector component ────────────────────────────── */
export default function MapSelector({
  guessPosition = null,
  onPositionSelect = () => {},
  correctPosition = null,
  distance = null,
  showResult = false,
  disabled = false,
  height = '340px',
}) {
  const linePositions = useMemo(() => {
    if (!showResult || !guessPosition || !correctPosition) return []
    
    const lat1 = guessPosition.lat
    const lng1 = guessPosition.lng
    const lat2 = correctPosition.lat
    const lng2 = correctPosition.lng
    
    const dLat = lat2 - lat1
    let dLng = lng2 - lng1
    if (dLng > 180) dLng -= 360
    else if (dLng < -180) dLng += 360
    
    const dist = Math.sqrt(dLat * dLat + dLng * dLng)
    const midLat = (lat1 + lat2) / 2 + (dist * 0.2)
    const midLng = lng1 + (dLng / 2)
    
    const points = []
    const resolution = 50
    for (let i = 0; i <= resolution; i++) {
      const t = i / resolution
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2
      points.push([lat, lng])
    }
    return points
  }, [showResult, guessPosition, correctPosition])

  const midpoint = useMemo(() => {
    if (!guessPosition || !correctPosition) return null
    return getMidpoint(
      guessPosition.lat, guessPosition.lng,
      correctPosition.lat, correctPosition.lng,
    )
  }, [guessPosition, correctPosition])

  const distanceLabel = useMemo(() => {
    if (!showResult || distance == null || !midpoint) return null
    return createDistanceLabel(`📏 ${formatDistance(distance)}`)
  }, [showResult, distance, midpoint])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-geo-p20/20">
      {/* Header label */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
        <div className="rounded-xl bg-geo-bg/90 backdrop-blur-sm border border-geo-p20/20 px-3 py-1.5">
          <span className="text-xs font-semibold text-geo-p10">
            {showResult
              ? '📊 Result Map'
              : disabled
                ? '⏳ Submit to see result'
                : '📍 Click to pin your guess'}
          </span>
        </div>
      </div>

      {/* Legend (result mode) */}
      {showResult && (
        <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-lg bg-geo-bg/90 backdrop-blur-sm border border-geo-p20/20 px-3 py-1.5">
            <span className="h-3 w-3 rounded-full bg-[#7950e5]" />
            <span className="text-[11px] font-medium text-geo-p10">Your Guess</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-geo-bg/90 backdrop-blur-sm border border-geo-p20/20 px-3 py-1.5">
            <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
            <span className="text-[11px] font-medium text-geo-p10">Correct Location</span>
          </div>
        </div>
      )}

      {/* Distance badge (result mode) */}
      {showResult && distance != null && (
        <div className="absolute top-3 right-3 z-[1000]">
          <div className={`rounded-xl border px-3 py-1.5 backdrop-blur-sm ${
            distance < 500
              ? 'bg-geo-success/20 border-geo-success/30 text-geo-success'
              : distance < 2000
                ? 'bg-geo-warning/20 border-geo-warning/30 text-geo-warning'
                : 'bg-geo-error/20 border-geo-error/30 text-geo-error'
          }`}>
            <span className="text-xs font-black">{formatDistance(distance)} away</span>
          </div>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        style={{ height, width: '100%' }}
        className="z-0"
        attributionControl={false}
      >
        {/* Dark-themed tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Click handler */}
        <ClickHandler onPositionSelect={onPositionSelect} disabled={disabled} />

        {/* Guess marker (purple, pulsing) */}
        {guessPosition && (
          <Marker position={[guessPosition.lat, guessPosition.lng]} icon={guessIcon}>
            <Popup className="dark-popup">
              <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '13px' }}>
                📍 Your Guess
              </div>
            </Popup>
          </Marker>
        )}

        {/* Result: correct marker + line + distance label */}
        {showResult && correctPosition && (
          <>
            <Marker position={[correctPosition.lat, correctPosition.lng]} icon={correctIcon}>
              <Popup className="dark-popup">
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '13px' }}>
                  ✅ Correct Location
                </div>
              </Popup>
            </Marker>

            {/* Curved animated line between guess → correct */}
            {linePositions.length > 0 && (
              <Polyline
                positions={linePositions}
                pathOptions={{
                  color: '#3ae8bd',
                  weight: 3,
                  opacity: 0.8,
                  className: 'map-line-animate',
                }}
              />
            )}

            {/* Distance label at midpoint */}
            {midpoint && distanceLabel && (
              <Marker
                position={[midpoint.lat, midpoint.lng]}
                icon={distanceLabel}
                interactive={false}
              />
            )}

            {/* Auto-zoom to fit both markers */}
            {guessPosition && (
              <FitBounds
                positions={[
                  [guessPosition.lat, guessPosition.lng],
                  [correctPosition.lat, correctPosition.lng],
                ]}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  )
}
