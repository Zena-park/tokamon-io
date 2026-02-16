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
    subdomain: 'go.tokamak.io',
    url: 'https://go.tokamak.io',
    status: 'live',
    icon: '\ud83d\udccd',
    color: '#4ade80',
    heroImage: '/images/tokamak_dino_hq.png',
    networks: [
      { name: 'Thanos', type: 'mainnet', status: 'coming' },
      { name: 'Thanos Sepolia', type: 'testnet' },
    ],
  },
  {
    id: 'drop',
    name: 'Tokamon Drop',
    subdomain: 'drop.tokamak.io',
    url: '#',
    status: 'coming',
    icon: '\ud83e\ude82',
    color: '#8b5cf6',
    heroImage: '/images/tokamak_dino_friendly.png',
    networks: [
      { name: 'Thanos', type: 'mainnet', status: 'coming' },
      { name: 'Thanos Sepolia', type: 'testnet' },
    ],
  },
  {
    id: 'play',
    name: 'Tokamon Play',
    subdomain: 'play.tokamak.io',
    url: '#',
    status: 'coming',
    icon: '\ud83c\udfae',
    color: '#ec4899',
    heroImage: '/images/tokamak_dino.png',
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
        const el = document.querySelector(`[data-service-id="${id}"]`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
              <p className="service-subdomain">{service.subdomain}</p>
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
