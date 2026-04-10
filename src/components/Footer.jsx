import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const FPT_FOOTER_LOGO = '/images/fpt-logo.svg'

const sponsorLogos = [
  { src: '/images/sponsor-rdape.png', alt: 'Saibro', height: 85 },
  { src: '/images/sponsor-tribo-fpt.png', alt: 'BAZX', height: 110 },
  { src: '/images/sponsor-3.png', alt: 'Triboo Marketing', height: 126 },
  { src: '/images/sponsor-4.png', alt: 'Copel', height: 108 },
  { src: '/images/sponsor-5.png', alt: 'Pro Esporte', height: 110 },
  { src: '/images/sponsor-6.png', alt: 'Governo do Paraná', height: 70 },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={FPT_FOOTER_LOGO} alt="FPT" width="58" height="27" style={{ objectFit: 'contain' }} />
        <div className="social-icons-row">
          <a href="#" aria-label="Instagram" className="social-icon-link">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" aria-label="Facebook" className="social-icon-link">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" aria-label="X (Twitter)" className="social-icon-link">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>
      </div>

      <div className="footer-logos">
        {sponsorLogos.map((logo) => (
          <img key={logo.src} src={logo.src} alt={logo.alt} style={{ height: logo.height }} onError={(e) => { e.target.style.display = 'none' }} />
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a href="#">POLÍTICAS DE PRIVACIDADE</a>
          <a href="#">TERMOS DE SERVIÇO</a>
          <a href="#">TRANSPARÊNCIA</a>
        </div>
        <p className="copyright">Copyright 2026 - Todos os direitos reservados</p>
      </div>
    </footer>
  )
}
