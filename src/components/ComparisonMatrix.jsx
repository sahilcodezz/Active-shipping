import { Check, Compass } from 'lucide-react'

export const ComparisonMatrix = () => {
  const specs = [
    {
      feature: 'Full Container Load (FCL)',
      activeShipping: 'Direct Priority Berth (Nhava Sheva / JNPT)',
      standardBroker: 'Standard queue / third-party brokerage',
      advantage: '48hr Fast-Track Clearance',
    },
    {
      feature: 'Dangerous Goods & Chemical Handling',
      activeShipping: 'Certified IMO / DG Class 1-9 Specialists',
      standardBroker: 'Limited licensing / sub-contracted',
      advantage: '100% Zero-Violation Track Record',
    },
    {
      feature: 'Real-Time Ocean Telemetry & Milestones',
      activeShipping: 'Live Satellite AIS Vessel Tracking & API',
      standardBroker: 'Manual email reports',
      advantage: 'Instant Milestone Notifications',
    },
    {
      feature: 'Customs & Port Agency (In-House)',
      activeShipping: 'Direct Registered CHA Licenses in Mumbai',
      standardBroker: 'External broker handoffs',
      advantage: 'Zero Intermediary Delays',
    },
    {
      feature: 'Temperature-Controlled Pharma/Cold Chain',
      activeShipping: 'Active reefer data-logging & battery backup',
      standardBroker: 'Passive dry ice / standard containers',
      advantage: '±0.5°C Verified Stability',
    },
  ]

  return (
    <section id="comparison" className="comparison-section">
      <div className="section-label-chip">
        <Compass size={14} />
        Performance Benchmarks
      </div>
      <h2 className="section-title-large" style={{ marginBottom: '36px' }}>
        Active Shipping vs. Conventional Freight Handlers
      </h2>

      <div className="matrix-card">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>LOGISTICS CAPABILITY</th>
              <th>ACTIVE SHIPPING &amp; LOGISTICS</th>
              <th>TRADITIONAL FREIGHT BROKER</th>
              <th>SPEED ADVANTAGE</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((row, idx) => (
              <tr key={idx}>
                <td className="matrix-feature">{row.feature}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    {row.activeShipping}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{row.standardBroker}</td>
                <td className="matrix-advantage">{row.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="matrix-swipe-hint">Swipe horizontally to compare all columns →</div>
    </section>
  )
}
