import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';
import './Footer.css';

const InstagramIcon = () => (
  <svg className="sqs-svg-icon--social" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.355 2.618 6.778 6.98 6.978 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="sqs-svg-icon--social" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.81.47-1.37 1.29-1.47 2.21-.16.8.13 1.63.75 2.16.5.45 1.16.68 1.82.7 1.14.06 2.21-.58 2.75-1.55.29-.51.4-1.11.4-1.71-.02-4.57-.01-9.13-.01-13.7Z" />
  </svg>
);

const Footer: FC = () => {
  const location = useLocation();

  const trackClick = (name: string, data?: Record<string, unknown>) => {
    if (window.umami) {
      window.umami.track(name, data);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="social-links">
          <div className="social-item">
            <a 
              href="https://www.instagram.com/compagnia.nyc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link"
              onClick={() => trackClick('social-instagram-click')}
            >
              <InstagramIcon />
            </a>
            <a 
              href="https://www.instagram.com/compagnia.nyc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-text-link"
              onClick={() => trackClick('social-instagram-click')}
            >
              @compagnia.nyc
            </a>
          </div>
          <div className="social-item">
            <a 
              href="https://www.tiktok.com/@compagnia.nyc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link"
              onClick={() => trackClick('social-tiktok-click')}
            >
              <TikTokIcon />
            </a>
            <a 
              href="https://www.tiktok.com/@compagnia.nyc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-text-link"
              onClick={() => trackClick('social-tiktok-click')}
            >
              @compagnia.nyc
            </a>
          </div>
        </div>
        
        <div className="footer-newsletter">
          <NewsletterForm key={location.pathname} />
        </div>

        <div className="contact-info">
          <p>Contact: <a href="mailto:iona@compagnia.org" onClick={() => trackClick('contact-email-click')}>iona@compagnia.org</a></p>
          <p>
            <a 
              href="https://fundraising.fracturedatlas.org/compagnia" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackClick('donate-button-click', { location: 'footer' })}
            >
              Donate
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
