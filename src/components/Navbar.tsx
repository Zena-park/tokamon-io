import { useLanguage } from '../i18n/index.tsx'
import './Navbar.css'

interface NavbarProps {
  scrollY: number
}

export default function Navbar({ scrollY }: NavbarProps) {
  const isScrolled = scrollY > 50
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img src="/images/logo-1.png" alt="Tokamon" className="navbar-logo-img" />
          <span className="navbar-brand">Tokamon</span>
        </a>
        <div className="navbar-links">
          <a href="#about">{t('navbar.about') as string}</a>
          <a href="#services">{t('navbar.services') as string}</a>
          <button
            className="lang-toggle"
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            title={language === 'en' ? '한국어로 전환' : 'Switch to English'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
