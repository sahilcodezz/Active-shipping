import { useState } from 'react'
import { Navigation } from 'lucide-react'

const routes = [
  {
    id: 'rotterdam',
    name: 'Mumbai ➔ Rotterdam Corridor',
    origin: 'Mumbai (INBOM)',
    destination: 'Rotterdam (NLRTM)',
    transit: '18 - 21 Days',
    frequency: 'Bi-Weekly Direct',
    status: 'ACTIVE EN ROUTE',
    vessel: 'Active Carrier IX',
    coordinates: '18.9°N, 72.8°E ➔ 51.9°N, 4.4°E',
    pathD: 'M 380 280 Q 300 240 220 220 T 150 140',
  },
  {
    id: 'singapore',
    name: 'Mumbai ➔ Singapore Hub',
    origin: 'Mumbai (INBOM)',
    destination: 'Singapore (SGSIN)',
    transit: '5 - 7 Days',
    frequency: 'Tri-Weekly Express',
    status: 'OPTIMAL CLEARANCE',
    vessel: 'Active Oceanic Voyager',
    coordinates: '18.9°N, 72.8°E ➔ 1.3°N, 103.8°E',
    pathD: 'M 380 280 Q 450 310 520 340 T 560 380',
  },
  {
    id: 'dubai',
    name: 'Mumbai ➔ Jebel Ali (Dubai)',
    origin: 'Mumbai (INBOM)',
    destination: 'Jebel Ali (AEJEA)',
    transit: '3 - 4 Days',
    frequency: 'Daily Feeder',
    status: 'PORT READY',
    vessel: 'Active Gulf Express',
    coordinates: '18.9°N, 72.8°E ➔ 25.0°N, 55.1°E',
    pathD: 'M 380 280 Q 340 260 300 250',
  },
  {
    id: 'newyork',
    name: 'Mumbai ➔ New York Express',
    origin: 'Mumbai (INBOM)',
    destination: 'New York (USNYC)',
    transit: '22 - 26 Days',
    frequency: 'Weekly Multi-modal',
    status: 'SCHEDULED VOYAGE',
    vessel: 'Active Atlantic Leader',
    coordinates: '18.9°N, 72.8°E ➔ 40.7°N, 74.0°W',
    pathD: 'M 380 280 Q 250 200 120 180 T 60 160',
  },
]

export const RouteMap = () => {
  const [activeRoute, setActiveRoute] = useState(routes[0])

  return (
    <section id="routes" className="ocean-routes-section">
      <div className="section-label-chip">
        <Navigation size={14} />
        Live Fleet & Corridors
      </div>
      <h2 className="section-title-large" style={{ marginBottom: '32px' }}>
        Global Autonomous & Scheduled Ocean Lanes
      </h2>

      <div className="map-container">
        <div className="route-selector-grid">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoute(r)}
              style={{
                background: activeRoute.id === r.id ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${activeRoute.id === r.id ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: activeRoute.id === r.id ? 'var(--color-primary)' : 'var(--text-dim)' }}>
                {r.status}
              </span>
              <span className="status-dot"></span>
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{r.name}</div>
          </button>
        ))}
      </div>

      {/* Interactive Radar & Map Display */}
      <div className="map-svg-wrapper">
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%' }}>
          {/* World Grid Lines */}
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-emerald)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Radar Rings */}
          <circle cx="380" cy="280" r="100" fill="none" stroke="var(--border-glow)" strokeOpacity="0.15" strokeDasharray="4 4" />
          <circle cx="380" cy="280" r="200" fill="none" stroke="var(--border-glow)" strokeOpacity="0.1" strokeDasharray="6 6" />
          <circle cx="380" cy="280" r="320" fill="none" stroke="var(--border-glow)" strokeOpacity="0.08" />

          {/* Static decorative trade routes */}
          <path d="M 150 140 Q 250 200 380 280" fill="none" stroke="var(--border-subtle)" strokeWidth="1.5" />
          <path d="M 380 280 Q 450 310 560 380" fill="none" stroke="var(--border-subtle)" strokeWidth="1.5" />
          <path d="M 380 280 Q 340 260 300 250" fill="none" stroke="var(--border-subtle)" strokeWidth="1.5" />

          {/* Active Selected Route Glowing Path */}
          <path
            d={activeRoute.pathD}
            fill="none"
            stroke="url(#lineGlow)"
            strokeWidth="3.5"
            filter="url(#glow)"
            strokeDasharray="8 6"
            style={{ animation: 'dashAnimation 30s linear infinite' }}
          />

          {/* Hub Node: Mumbai */}
          <g transform="translate(380, 280)" className="port-node">
            <circle r="12" fill="var(--color-primary)" fillOpacity="0.2" />
            <circle r="5" fill="var(--color-primary)" />
            <text x="14" y="5" fill="var(--color-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">
              MUMBAI HQ (INBOM)
            </text>
          </g>

          {/* Rotterdam Node */}
          <g transform="translate(150, 140)" className="port-node">
            <circle r="4" fill="var(--text-dim)" />
            <text x="-80" y="-10" fill="var(--text-dim)" fontSize="10" fontFamily="var(--font-mono)">
              ROTTERDAM
            </text>
          </g>

          {/* Singapore Node */}
          <g transform="translate(560, 380)" className="port-node">
            <circle r="4" fill="var(--text-dim)" />
            <text x="12" y="5" fill="var(--text-dim)" fontSize="10" fontFamily="var(--font-mono)">
              SINGAPORE
            </text>
          </g>

          {/* Dubai Node */}
          <g transform="translate(300, 250)" className="port-node">
            <circle r="4" fill="var(--text-dim)" />
            <text x="-65" y="-8" fill="var(--text-dim)" fontSize="10" fontFamily="var(--font-mono)">
              JEBEL ALI
            </text>
          </g>
        </svg>

        {/* Active Route Telemetry Overlay Box */}
        <div className="map-overlay">
          <div className="map-overlay-vessel">{activeRoute.vessel}</div>
          <div style={{ color: 'var(--text-muted)' }}>Transit Time: <span style={{ color: 'var(--text-main)' }}>{activeRoute.transit}</span></div>
          <div style={{ color: 'var(--text-muted)' }}>Frequency: <span style={{ color: 'var(--text-main)' }}>{activeRoute.frequency}</span></div>
          <div className="map-overlay-gps">GPS: {activeRoute.coordinates}</div>
        </div>
      </div>
    </div>
  </section>
)
}
