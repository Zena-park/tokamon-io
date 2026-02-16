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
          <img src="/images/tokamak_dino_logo_1_1.png" alt="Tokamon" className="navbar-logo-img" />
          <span className="navbar-brand">Tokamon</span>
        </a>
        <div className="navbar-links">
          <a href="#about">{t('navbar.about') as string}</a>
          <a href="#services">{t('navbar.services') as string}</a>
          <button
            className="lang-toggle"
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
          >
            {language === 'en' ? '한국어' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}
