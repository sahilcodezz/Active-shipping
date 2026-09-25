import { useState } from 'react'
import { Ship, Plane, Truck, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { SplitButton } from './SplitButton'

export const QuoteCalculator = () => {
  const [mode, setMode] = useState('ocean')
  const [origin, setOrigin] = useState('mumbai')
  const [destination, setDestination] = useState('rotterdam')
  const [weight, setWeight] = useState(1500)

  const rates = {
    ocean: { base: 450, perKg: 0.45, days: '18 - 22 Days', co2: '85% Lower Carbon' },
    air: { base: 850, perKg: 2.1, days: '3 - 5 Days', co2: 'Priority Express' },
    multimodal: { base: 600, perKg: 0.95, days: '10 - 14 Days', co2: 'Balanced Efficiency' },
  }

  const selectedRate = rates[mode]
  const estimatedCost = Math.round(selectedRate.base + weight * selectedRate.perKg)

  const handleCalculate = (e) => {
    e.preventDefault()
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00e5ff', '#10b981', '#ffffff'],
    })
  }

  return (
    <section id="calculator" className="quote-calc-section">
      <div className="quote-grid">
        <div className="calc-card">
          <div className="section-label-chip">
            <span className="status-dot"></span>
            Instant Telemetry Estimation
          </div>
          <h2 className="section-title-large" style={{ marginBottom: '24px' }}>
            Instant Freight & Voyage Terminal
          </h2>

          <form onSubmit={handleCalculate}>
            <label className="input-label">Select Shipping Mode</label>
            <div className="mode-selector-grid">
              <div
                className={`mode-card ${mode === 'ocean' ? 'active' : ''}`}
                onClick={() => setMode('ocean')}
              >
                <Ship size={22} color={mode === 'ocean' ? '#00e5ff' : '#8b9bb4'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Ocean Freight</div>
              </div>

              <div
                className={`mode-card ${mode === 'air' ? 'active' : ''}`}
                onClick={() => setMode('air')}
              >
                <Plane size={22} color={mode === 'air' ? '#00e5ff' : '#8b9bb4'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Air Express</div>
              </div>

              <div
                className={`mode-card ${mode === 'multimodal' ? 'active' : ''}`}
                onClick={() => setMode('multimodal')}
              >
                <Truck size={22} color={mode === 'multimodal' ? '#00e5ff' : '#8b9bb4'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Multi-Modal</div>
              </div>
            </div>

            <div className="port-grid">
              <div className="input-group">
                <label className="input-label">Origin Port</label>
                <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="calc-select">
                  <option value="mumbai">Mumbai (JNPT / Nhava Sheva)</option>
                  <option value="mundra">Mundra Port, Gujarat</option>
                  <option value="chennai">Chennai Port</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Destination</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="calc-select">
                  <option value="rotterdam">Rotterdam (Europe Hub)</option>
                  <option value="singapore">Singapore Hub</option>
                  <option value="dubai">Jebel Ali, UAE</option>
                  <option value="newyork">New York, USA</option>
                  <option value="hamburg">Hamburg, Germany</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="input-label" style={{ margin: 0 }}>Cargo Weight</label>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                  {weight.toLocaleString()} kg
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="25000"
                step="100"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <SplitButton text="Calculate Live Logistics Rate" variant="primary" icon={<ArrowRight size={16} />} />
          </form>
        </div>

        {/* Live Estimate Summary Terminal */}
        <div className="quote-summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              QUOTE TERMINAL // ASL-2026
            </span>
            <span className="status-dot"></span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Rate Breakdown</span>
            <div className="quote-price">
              ${estimatedCost.toLocaleString()}
              <span style={{ fontSize: '1rem', color: 'var(--color-primary)', marginLeft: '8px' }}>USD</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '28px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div className="quote-row">
              <span style={{ color: 'var(--text-dim)' }}>Transit Duration</span>
              <span style={{ color: 'var(--text-main)' }}>{selectedRate.days}</span>
            </div>
            <div className="quote-row">
              <span style={{ color: 'var(--text-dim)' }}>Customs & Port Fees</span>
              <span style={{ color: 'var(--color-emerald)' }}>Included (DDP/DAP)</span>
            </div>
            <div className="quote-row">
              <span style={{ color: 'var(--text-dim)' }}>Carbon Profile</span>
              <span style={{ color: 'var(--text-main)' }}>{selectedRate.co2}</span>
            </div>
          </div>

          <a
            href={`https://api.whatsapp.com/send?phone=919833672298&text=Hi,%20I%20would%20like%20to%20book%20a%20shipment%20from%20${origin}%20to%20${destination}%20with%20weight%20${weight}kg%20(Estimated%20$${estimatedCost})`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 20px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'transform 0.2s',
            }}
          >
            Confirm & Lock Rate on WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
