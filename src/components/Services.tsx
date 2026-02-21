import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/index.tsx'
import './Services.css'

interface FlowStep {
  icon: string
  title: string
  desc: string
}

interface Network {
  name: string
  type: 'mainnet' | 'testnet'
  status?: 'live' | 'coming'
}

interface ServiceStructure {
  id: string
  name: string
  subdomain: string
  url: string
  status: 'live' | 'coming'
  icon: string
  color: string
  heroImage: string
  networks: Network[]
}

const serviceStructure: ServiceStructure[] = [
  {
    id: 'go',
    name: 'Tokamon Go',
    subdomain: 'go.tokamon.io',
    url: 'https://tokamon-go.web.app/',
    status: 'live',
    icon: '\ud83d\udccd',
    color: '#ec4899',
    heroImage: '/images/tokamak_dino_hq.png',
    networks: [
      { name: 'Thanos', type: 'mainnet', status: 'coming' },
      { name: 'Thanos Sepolia', type: 'testnet' },
    ],
  },
  {
    id: 'drop',
    name: 'Tokamon Drop',
    subdomain: 'drop.tokamon.io',
    url: '#',
    status: 'coming',
    icon: '\ud83e\ude82',
    color: '#4ade80',
    heroImage: '/images/tokamak_dino.png',
    networks: [
      { name: 'Thanos', type: 'mainnet', status: 'coming' },
      { name: 'Thanos Sepolia', type: 'testnet' },
    ],
  },
  {
    id: 'play',
    name: 'Tokamon Play',
    subdomain: 'play.tokamon.io',
    url: '#',
    status: 'coming',
    icon: '\ud83c\udfae',
    color: '#8b5cf6',
    heroImage: '/images/tokamon_gaming.png',
    networks: [
      { name: 'Thanos', type: 'mainnet', status: 'coming' },
      { name: 'Thanos Sepolia', type: 'testnet' },
    ],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const services = serviceStructure.map(s => ({
    ...s,
    description: t(`services.${s.id}.description`) as string,
    tagline: t(`services.${s.id}.tagline`) as string,
    detailDesc: t(`services.${s.id}.detailDesc`) as string,
    flow: t(`services.${s.id}.flow`) as FlowStep[],
    features: t(`services.${s.id}.features`) as string[],
  }))

  const selected = services.find(s => s.id === selectedId) ?? null

  const handleClick = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
      setTimeout(() => {
        if (window.innerWidth <= 900 && detailRef.current) {
          detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          const el = document.querySelector(`[data-service-id="${id}"]`)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <section id="services" ref={sectionRef} className={`services ${visible ? 'visible' : ''}`}>
      <div className="services-inner">
        <div className="services-header">
          <span className="section-label">{t('services.label') as string}</span>
          <h2 className="section-title">
            {t('services.titlePrefix') as string}<span className="highlight">{t('services.titleHighlight') as string}</span>
          </h2>
          <p className="section-subtitle">
            {t('services.subtitle') as string}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`service-card ${service.status} ${selectedId === service.id ? 'active' : ''}`}
              data-service-id={service.id}
              style={{ animationDelay: `${i * 0.1}s`, '--accent': service.color } as React.CSSProperties}
              onClick={() => handleClick(service.id)}
            >
              <div className="service-card-header">
                <div className="service-icon">{service.icon}</div>
                <span className={`service-status ${service.status}`}>
                  {service.status === 'live' ? t('services.statusLive') as string : t('services.statusComing') as string}
                </span>
              </div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-subdomain">{service.status === 'live' ? service.subdomain : '\u00A0'}</p>
              <p className="service-desc">{service.description}</p>
              <div className="service-networks">
                {service.networks.map((net) => (
                  <span key={net.name} className={`network-badge ${net.type}`}>{net.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={detailRef} className={`service-expand ${selected ? 'open' : ''}`} style={selected ? { '--accent': selected.color } as React.CSSProperties : undefined}>
          {selected && (
            <div className="service-expand-inner">
              <div className="expand-top">
                <img src={selected.heroImage} alt={selected.name} className="expand-image" />
                <div className="expand-intro">
                  <p className="expand-tagline">{selected.tagline}</p>
                  <p className="expand-desc">{selected.detailDesc}</p>
                  {selected.status === 'live' ? (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className="expand-cta">
                      {t('services.ctaStart', { name: selected.name }) as string}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </a>
                  ) : (
                    <span className="expand-coming-badge">{t('services.statusComing') as string}</span>
                  )}
                </div>
                {selected.id === 'go' && (
                  <div className="app-download-side">
                    <span className="download-title">{t('services.downloadApp') as string}</span>
                    <div className="app-download-items">
                    <a className="download-item android" href="https://expo.dev/accounts/zena.p/projects/tokamon/builds/6c7e5042-003d-4a20-8d5b-0b67a0f89b33" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <img src="/images/qr-code/tokamon-go-android.png" alt="Tokamon Go Android QR" className="download-qr" />
                      <span className="download-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.237a.625.625 0 0 0-.803.364l-1.09 2.9a8.37 8.37 0 0 0-7.26 0l-1.09-2.9a.625.625 0 1 0-1.167.44l1.06 2.822A8.332 8.332 0 0 0 3 12.993v.632h18v-.632a8.332 8.332 0 0 0-4.173-6.13l1.06-2.822a.625.625 0 0 0-.364-.804zM8.5 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM3 14.625h18V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5.375z"/></svg>
                        Android
                      </span>
                    </a>
                    <div className="download-item iphone">
                      <div className="download-iphone-soon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                        <span>iPhone</span>
                      </div>
                      <span className="download-soon-text">{t('services.iphoneComingSoon') as string}</span>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="expand-flow">
                <h4 className="expand-section-title">{t('services.flowTitle') as string}</h4>
                <div className="flow-steps">
                  {selected.flow.map((step, j) => (
                    <div key={j} className="flow-step">
                      <div className="flow-step-num">{j + 1}</div>
                      <div className="flow-step-icon">{step.icon}</div>
                      <h5>{step.title}</h5>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="expand-networks">
                <h4 className="expand-section-title">{t('services.multiverseTitle') as string}</h4>
                <div className="networks-list">
                  {selected.networks.map((net) => (
                    <span key={net.name} className={`network-badge ${net.type}${net.status === 'coming' ? ' coming' : ''}`}>{net.name}{net.status === 'coming' ? ' - Coming Soon' : ''}</span>
                  ))}
                </div>
              </div>

              <div className="expand-features">
                <h4 className="expand-section-title">{t('services.featuresTitle') as string}</h4>
                <div className="features-grid">
                  {selected.features.map((feat, j) => (
                    <div key={j} className="feature-chip">{feat}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
