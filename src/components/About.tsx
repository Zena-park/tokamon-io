import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/index.tsx'
import './About.css'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = t('about.features') as Array<{ icon: string; title: string; desc: string }>

  return (
    <section id="about" ref={sectionRef} className={`about ${visible ? 'visible' : ''}`}>
      <div className="about-inner">
        <div className="about-header">
          <span className="section-label">{t('about.label') as string}</span>
          <h2 className="section-title">
            {t('about.titleLine') as string}<br />
            <span className="highlight">{t('about.titleHighlight') as string}</span>
          </h2>
          <p className="section-subtitle">
            {t('about.subtitle') as string}
          </p>
        </div>

        <div className="about-image-area">
          <img
            src="/images/tokamak_dino_hq.png"
            alt="Tokamon with coins"
            className="about-image"
          />
        </div>

        <div className="about-features">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
