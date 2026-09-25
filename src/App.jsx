import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Anchor,
  Globe,
  Navigation,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Radio,
} from 'lucide-react'

import { WaveCanvas } from './components/WaveCanvas'
import { SplitButton } from './components/SplitButton'
import { HorizontalScrollSection } from './components/HorizontalScrollSection'
import { RouteMap } from './components/RouteMap'
import { QuoteCalculator } from './components/QuoteCalculator'
import { ComparisonMatrix } from './components/ComparisonMatrix'
import { OrbitGlowToggle } from './components/OrbitGlowToggle'

gsap.registerPlugin(ScrollTrigger)

export const App = () => {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const lenisRef = useRef(null)

  const navItems = [
    { num: '01', label: 'Capabilities', href: '#capabilities' },
    { num: '02', label: 'Press & Missions', href: '#press' },
    { num: '03', label: 'Live Routes', href: '#routes' },
    { num: '04', label: 'Calculator', href: '#calculator' },
    { num: '05', label: 'Contact', href: '#contact', variant: 'primary' },
  ]

  // Lock smooth scroll while the mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Auto-close the drawer when jumping to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1101) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Synchronize initial theme with document data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Circle Reveal Theme Transition
  const toggleThemeWithCircleReveal = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    if (document.startViewTransition) {
      const x = e ? e.clientX : window.innerWidth - 60
      const y = e ? e.clientY : 40
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme)
        document.documentElement.setAttribute('data-theme', nextTheme)
        localStorage.setItem('theme', nextTheme)
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    } else {
      setTheme(nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
      localStorage.setItem('theme', nextTheme)
    }
  }

  // 1. Initialize Lenis Smooth Inertia Scroll & GSAP Sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      setNavScrolled(e.scroll > 50)
    })

    lenisRef.current = lenis

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  // Capabilities Showcase Data
  const capabilities = [
    {
      category: 'PRIMARY MARITIME SERVICE',
      title: 'Ocean Freight (FCL & LCL)',
      description:
        'Full container loads and consolidated freight with guaranteed space allocation on major ocean carriers operating through JNPT / Nhava Sheva.',
      image: '/assets/images/Active_Shipping_and_Logistics_Service_1.jpg',
      specs: [
        { label: 'TRANSIT RELIABILITY', value: '99.4%' },
        { label: 'CONTAINER TYPES', value: '20ft / 40ft / High-Cube / Flat-Rack' },
      ],
    },
    {
      category: 'CRITICAL EXPEDITED',
      title: 'Global Air Cargo Express',
      description:
        'Time-critical air freight forwarding connecting Mumbai International Cargo Terminal to all European, American, and Asian economic epicenters.',
      image: '/assets/images/Active_Shipping_and_Logistics_Service_2.jpg',
      specs: [
        { label: 'DOOR-TO-DOOR', value: '48 - 72 Hours' },
        { label: 'CUSTOMS FAST-TRACK', value: '24/7 Dedicated Team' },
      ],
    },
    {
      category: 'HAZMAT & COMPLIANCE',
      title: 'Dangerous Goods & IMO Cargo',
      description:
        'Specialized certified handling for Class 1 to 9 hazardous materials, industrial chemicals, and temperature-sensitive pharmaceutical shipments.',
      image: '/assets/images/Active_Shipping_and_Logistics_Service_3.jpg',
      specs: [
        { label: 'COMPLIANCE', value: 'IMO / IATA / DGCA Certified' },
        { label: 'PACKAGING', value: 'UN-Certified Spec' },
      ],
    },
    {
      category: 'HEAVY ENGINEERING',
      title: 'Project Cargo & Breakbulk',
      description:
        'End-to-end engineered logistics for oversized infrastructure, plant machinery, turbines, and industrial equipment requiring breakbulk charters.',
      image: '/assets/images/Active_Shipping_and_Logistics_Service_4.jpg',
      specs: [
        { label: 'MAX CAPACITY', value: 'Up to 500+ Metric Tons' },
        { label: 'ROUTE SURVEY', value: 'In-house Engineering' },
      ],
    },
    {
      category: 'INTEGRATED SUPPLY CHAIN',
      title: 'Customs Clearance & Warehousing',
      description:
        'Direct licensed Customs House Agency (CHA) operations combined with modern bonded and temperature-controlled multi-modal warehousing.',
      image: '/assets/images/Active_Shipping_and_Logistics_about.jpg',
      specs: [
        { label: 'CLEARANCE TIME', value: '< 24 Hours Standard' },
        { label: 'STORAGE', value: 'Bonded & Ambient Facilities' },
      ],
    },
  ]

  // Press & Mission Highlights Data (Seasats #press style)
  const pressMissions = [
    {
      category: 'OPERATIONAL MILESTONE',
      title: '10+ Years of Maritime Excellence',
      description:
        'A decade of delivering reliable ocean freight forwarding, handling over 120,000 TEUs across international corridors with zero major safety incidents.',
      image: '/assets/images/10years.jpg',
      specs: [
        { label: 'FOUNDED', value: 'Mumbai, India' },
        { label: 'ANNUAL VOLUME', value: '15,000+ TEUs' },
      ],
    },
    {
      category: 'NETWORK EXPANSION',
      title: 'Direct Trans-Suez European Corridors',
      description:
        'Established dedicated vessel charters providing direct expedited schedules between Mumbai (JNPT) and Rotterdam / Antwerp / Hamburg.',
      image: '/assets/images/banner1.jpg',
      specs: [
        { label: 'TRANSIT TIME', value: '18 Days Average' },
        { label: 'PORT COVERAGE', value: '6 Major Hubs' },
      ],
    },
    {
      category: 'INFRASTRUCTURE UPGRADE',
      title: 'Chemical & Pharma Cold-Chain Fleet',
      description:
        'Deployment of GPS-monitored reefer container services offering live temperature telemetry and humidity logging for high-value chemical exports.',
      image: '/assets/images/banner2.jpg',
      specs: [
        { label: 'TEMPERATURE RANGE', value: '-25Â°C to +25Â°C' },
        { label: 'MONITORING', value: 'Live Satellite AIS' },
      ],
    },
    {
      category: 'STRATEGIC LOGISTICS',
      title: 'Multi-Modal Gulf & Southeast Asian Feeder',
      description:
        'Expanded daily feeder loops connecting western Indian ports to Jebel Ali (UAE), Singapore, and Port Klang with same-day customs handover.',
      image: '/assets/images/banner3.jpg',
      specs: [
        { label: 'FREQUENCY', value: 'Daily Scheduled Departures' },
        { label: 'RELIABILITY', value: '99.8% On-Time' },
      ],
    },
  ]

  return (
    <>
      {/* Seasats Dynamic Ambient Background */}
      <div className="seasats-ambient-bg">
        <div className="ambient-gradient"></div>
        <div className="ambient-grid"></div>
      </div>

      {/* Modern Seasats-Inspired Glass Header */}
      <header className={`seasats-nav ${navScrolled ? 'nav-scrolled' : ''}`}>
        <a href="#hero" className="nav-brand">
          <div className="nav-logo-badge">
            <Anchor size={22} color="var(--color-primary)" />
          </div>
          <div>
            <div className="nav-title">ACTIVE SHIPPING</div>
            <div className="nav-subtitle">& LOGISTICS // MUMBAI</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <SplitButton
              key={item.num}
              text={`${item.num} ${item.label}`}
              href={item.href}
              variant={item.variant || 'default'}
            />
          ))}
        </nav>

        {/* Persistent Action Group - Always Visible (Never Hidden) */}
        <div className="nav-actions">
          <OrbitGlowToggle theme={theme} onToggle={toggleThemeWithCircleReveal} />

          {/* Mobile Menu Hamburger (Visible only on mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="orbit-toggle-core mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="drawer-kicker">
            <span className="status-dot"></span>
            NAVIGATION // ACTIVE SHIPPING
          </div>

          {navItems.map((item, idx) => (
            <a
              key={item.num}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link ${item.variant === 'primary' ? 'primary' : ''}`}
              style={{ animationDelay: `${120 + idx * 60}ms` }}
            >
              <span className="drawer-num">{item.num}</span>
              <span className="drawer-label">{item.label}</span>
              <ArrowRight size={18} className="drawer-arrow" />
            </a>
          ))}
        </div>
      )}

      {/* Floating WhatsApp Quick Connect */}
      <a
        href="https://api.whatsapp.com/send?phone=919833672298&text=Hello%20Active%20Shipping%20Team,%20I%20have%20an%20inquiry%20for%20freight%20services."
        className="floating-terminal-btn"
        target="_blank"
        rel="noreferrer"
        aria-label="Direct WhatsApp Contact"
      >
        <Radio size={18} />
        <span className="ftb-label">Direct WhatsApp HQ</span>
      </a>

      {/* 1. HERO SECTION (Seasats Style with Wave Dynamics & Telemetry HUD) */}
      <section id="hero" className="seasats-hero">
        <WaveCanvas />

        <div className="hero-grid-layout">
          {/* Left Column: Headline & Action CTAs */}
          <div className="hero-left-col">
            <div className="hero-badge-row">
              <div className="hero-pill">
                <span className="status-dot"></span>
                GLOBAL MARITIME AUTONOMY
              </div>
              <div className="hero-pill" style={{ borderColor: 'rgba(226, 177, 112, 0.4)', color: 'var(--color-copper)' }}>
                10+ YEARS PROVEN EXPERTISE
              </div>
              <div className="hero-pill">
                PORT OF MUMBAI // JNPT DIRECT
              </div>
            </div>

            <h1 className="hero-headline">
              Global Freight Forwarding.<br />
              <span className="gradient-text">Ocean Precision & Velocity.</span>
            </h1>

            <p className="hero-subtext">
              Active Shipping and Logistics connects Mumbai's primary ports to critical global trade lanes. 
              High-velocity FCL/LCL ocean freight, certified dangerous goods compliance, and licensed in-house customs clearance with zero intermediary friction.
            </p>

            <div className="hero-cta-group">
              <SplitButton
                text="Explore Capabilities"
                href="#capabilities"
                variant="primary"
                icon={<ArrowRight size={18} />}
              />
              <SplitButton
                text="Live Route Radar"
                href="#routes"
                icon={<Navigation size={18} />}
              />
              <SplitButton
                text="Calculate Rates"
                href="#calculator"
                icon={<Globe size={18} />}
              />
            </div>
          </div>

          {/* Right Column: Live Marine Flight-Deck Telemetry HUD Console */}
          <div className="hero-hud-card">
            <div className="hud-header">
              <span className="hud-title">
                <Navigation size={16} />
                PORT MUMBAI // LIVE AIS TELEMETRY
              </span>
              <span className="status-dot"></span>
            </div>

            {/* Simulated Radar Visual Scanner */}
            <div className="hud-radar-scanner">
              <div className="hud-radar-sweep"></div>
              <div style={{ position: 'absolute', textAlign: 'center', zIndex: 2 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  18Â°55'N, 72Â°50'E
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  BERTH OPTIMAL // 142 ACTIVE VESSELS
                </div>
              </div>
            </div>

            {/* Quick Live Route Dispatch Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="hud-route-item">
                <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>JNPT âž” Rotterdam Direct</span>
                <span style={{ color: 'var(--color-emerald)', fontWeight: 'bold' }}>18 Days</span>
              </div>
              <div className="hud-route-item">
                <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Mumbai âž” Singapore Express</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>5 Days</span>
              </div>
              <div className="hud-route-item">
                <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>JNPT âž” Jebel Ali Feeder</span>
                <span style={{ color: 'var(--color-copper)', fontWeight: 'bold' }}>3 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Telemetry Metrics Bar */}
        <div className="hero-telemetry-bar">
          <div className="telemetry-item">
            <span className="telemetry-label">Annual Cargo Volume</span>
            <div className="telemetry-val">
              120,000+ <span className="unit">TEU</span>
            </div>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">On-Time Arrival Rate</span>
            <div className="telemetry-val">
              99.4 <span className="unit">%</span>
            </div>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Global Ports Linked</span>
            <div className="telemetry-val">
              45+ <span className="unit">HUBS</span>
            </div>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Customs Clearance Speed</span>
            <div className="telemetry-val">
              &lt; 24 <span className="unit">HOURS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PINNED HORIZONTAL SCROLL: CORE CAPABILITIES (Seasats Style) */}
      <HorizontalScrollSection
        id="capabilities"
        label="Capabilities // 01"
        title="Engineered Freight & Logistics Operations"
        subtitle="Scroll through our specialized ocean, air, and dangerous goods logistics solutions designed for demanding international supply chains."
        items={capabilities}
      />

      {/* 3. PINNED HORIZONTAL SCROLL: PRESS & MISSION LOGS (Seasats #press Style) */}
      <HorizontalScrollSection
        id="press"
        label="Press & Missions // 02"
        title="Mission Deployments & Industry Accreditations"
        subtitle="Track record of completed multi-modal deployments, certifications, and high-capacity global supply line management."
        items={pressMissions}
      />

      {/* 4. INTERACTIVE OCEAN ROUTES & RADAR MAP */}
      <RouteMap />

      {/* 5. INSTANT FREIGHT & VOYAGE COST CALCULATOR */}
      <QuoteCalculator />

      {/* 6. COMPARISON & BENCHMARK MATRIX */}
      <ComparisonMatrix />

      {/* 7. TERMINAL FOOTER & CONTACT SECTION */}
      <footer id="contact" className="site-footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div className="nav-logo-badge" style={{ width: '36px', height: '36px' }}>
                <Anchor size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontWeight: '800', color: 'var(--text-main)' }}>
                ACTIVE SHIPPING AND LOGISTICS
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Premier freight forwarding, customs clearance, and multi-modal logistics enterprise head-quartered in Mumbai, India.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              HQ TELEMETRY: 18Â°55'N, 72Â°50'E // INBOM
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.08em' }}>
              Direct HQ Inquiries
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <a href="mailto:sales@activeshpg.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none' }}>
                <Mail size={16} color="var(--color-primary)" />
                sales@activeshpg.com
              </a>
              <a href="mailto:contact@activeshpg.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none' }}>
                <Mail size={16} color="var(--color-primary)" />
                contact@activeshpg.com
              </a>
              <a href="tel:+919833672298" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none' }}>
                <Phone size={16} color="var(--color-emerald)" />
                +91 9833672298 / +91 9821253239
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.08em' }}>
              Port Terminal Office
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <MapPin size={18} color="var(--color-copper)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                Navjeevan Co-Op, Office No. 18,<br />
                Malad East, Mumbai - 400097, Maharashtra, India.<br />
                <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>Direct Port Access: JNPT / Nhava Sheva</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>Â© {new Date().getFullYear()} ACTIVE SHIPPING AND LOGISTICS. ALL RIGHTS RESERVED.</div>
          <div className="footer-badges">
            <span>IMO CERTIFIED</span>
            <span>IATA AGENT</span>
            <span>CUSTOMS HOUSE BROKER</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
