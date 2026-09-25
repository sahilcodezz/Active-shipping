import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const HorizontalScrollSection = ({ id, label, title, subtitle, items }) => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    // Desktop / tablet-landscape: pinned horizontal scroll driven by vertical scroll
    mm.add('(min-width: 1101px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        return -(trackWidth - window.innerWidth + window.innerWidth * 0.12)
      }

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.kill()
    })

    // Mobile / tablet: native touch swipe (see CSS media queries)
    mm.add('(max-width: 1100px)', () => {
      gsap.set(track, { x: 0 })
      return () => gsap.set(track, { x: 0 })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [items])

  return (
    <section id={id} ref={sectionRef} className="horizontal-scroll-section">
      <div className="horizontal-scroll-inner">
        <div className="horizontal-header-row">
          <div>
            <div className="section-label-chip">
              <span className="status-dot"></span>
              {label}
            </div>
            <h2 className="section-title-large">{title}</h2>
          </div>
          {subtitle && <p className="horizontal-subtitle">{subtitle}</p>}
        </div>

        <div className="horizontal-track-container">
          <div ref={trackRef} className="horizontal-track">
            {items.map((item, index) => (
              <div key={index} className="showcase-card">
                <div className="card-img-wrapper">
                  <span className="card-index-pill">0{index + 1}</span>
                  <img src={item.image} alt={item.title} className="card-img" />
                </div>
                <div className="card-body">
                  <span className="card-tag">{item.category}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                  
                  {item.specs && (
                    <div className="card-specs">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="card-spec-item">
                          <span>{spec.label}</span>
                          <span>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
