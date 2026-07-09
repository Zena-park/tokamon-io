import { useLanguage } from '../i18n/index.tsx'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/logo-1.png" alt="Tokamon" className="footer-logo" />
          <div>
            <h3 className="footer-title">Tokamon</h3>
            <p className="footer-tagline">{t('footer.tagline') as string}</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>{t('footer.services') as string}</h4>
            <a href="https://github.com/tokamak-network/tokamon" target="_blank" rel="noopener noreferrer">Tokamon Go</a>
            <span className="footer-coming">Tokamon Drop</span>
            <span className="footer-coming">Tokamon Play</span>
          </div>
          <div className="footer-col">
            <h4>{t('footer.community') as string}</h4>
            <a href="https://t.me/tokamak_network" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://github.com/tokamak-network/tokamon-io" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Tokamon. Built on <a href="https://tokamak.network" target="_blank" rel="noopener noreferrer">Tokamak Network</a>.</p>
        </div>
      </div>
    </footer>
  )
}
