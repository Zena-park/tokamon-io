import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/index.tsx'
import './Hero.css'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const description = t('hero.description') as string

  return (
    <section className="hero">
      <div className="hero-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <div className="hero-mascot-wrapper">
          <div className="hero-mascot-glow" />
          <img
            src="/images/tokamak_dino_friendly.png"
            alt="Tokamon Dinosaur"
            className="hero-mascot"
          />
          <div className="hero-coin-orbit">
            <div className="orbit-coin coin-1">
              <span>T</span>
            </div>
            <div className="orbit-coin coin-2">
              <span>O</span>
            </div>
            <div className="orbit-coin coin-3">
              <span>N</span>
            </div>
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-tagline">{t('hero.tagline') as string}</p>
          <h1 className="hero-title">
            <span className="title-line">{t('hero.titleLine') as string}</span>
            <span className="title-highlight">{t('hero.titleHighlight') as string}</span>
          </h1>
          <p className="hero-description">
            {description.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn-primary">
              <span>{t('hero.ctaPrimary') as string}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a href="#about" className="btn-secondary">{t('hero.ctaSecondary') as string}</a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  )
}
