import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import FadeIn from '../components/FadeIn';
import './Contact.css';

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

const Subscribe: FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Subscribe | Compagnia';

    // Set robots meta tag to noindex for private page
    let metaRobots = document.querySelector('meta[name="robots"]');
    const created = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const prevRobots = metaRobots.getAttribute('content');
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = prevTitle;
      if (created && metaRobots?.parentNode) {
        metaRobots.parentNode.removeChild(metaRobots);
      } else if (prevRobots) {
        metaRobots.setAttribute('content', prevRobots);
      } else if (metaRobots) {
        metaRobots.removeAttribute('content');
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setStatus('submitting');
    console.info('Subscribe form submission attempt:', formData.get('email'));
    
    // Track attempt in Umami
    if (window.umami) {
      window.umami.track('subscribe-form-attempt', { email: formData.get('email') });
    }

    // Create hidden iframe for submission
    const iframeName = 'hidden_iframe_subscribe';
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeName;
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeCL9U1PRgsHrgeEzIakfX6vkx9OO5wNcg16SSdwFv4dTrfCg/formResponse';
    
    // Create a temporary form to submit to the iframe
    const tempForm = document.createElement('form');
    tempForm.action = GOOGLE_FORM_ACTION;
    tempForm.method = 'POST';
    tempForm.target = iframeName;

    const fields = {
      'entry.730403727': (formData.get('firstName') || '').toString().trim(),
      'entry.1816276036': (formData.get('lastName') || '').toString().trim(),
      'entry.365665735': (formData.get('email') || '').toString().trim(),
      'entry.1236900277': 'Subscribe Page',
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    
    try {
      tempForm.submit();
      // Since we can't easily detect iframe load success cross-origin, 
      // we'll assume success after a short delay
      setTimeout(() => {
        // Track successful subscribe form submission in Umami
        if (window.umami) {
          window.umami.track('subscribe-form-success', { email: formData.get('email') });
        }

        setStatus('success');
        form.reset();
        document.body.removeChild(tempForm);
        // Reset form status after 10 seconds
        setTimeout(() => setStatus('idle'), 10000);
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);

      // Track error in Umami
      if (window.umami) {
        window.umami.track('subscribe-form-error', { 
          error: error instanceof Error ? error.message : 'Unknown error',
          email: formData.get('email')
        });
      }

      setStatus('error');
      if (tempForm.parentNode) document.body.removeChild(tempForm);
    }
  };

  return (
    <div className="contact-page">
      <FadeIn>
        <h1 className="page-title">Subscribe</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="contact-form-container">
          {status === 'success' ? (
            <div className="success-notification">
              <h2>Thank You!</h2>
              <p>Your subscription has been received. Welcome to Compagnia!</p>
              <button onClick={() => setStatus('idle')} className="back-to-form-button">
                Subscribe Another Email
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input type="text" id="firstName" name="firstName" required disabled={status === 'submitting'} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" required disabled={status === 'submitting'} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required disabled={status === 'submitting'} />
              </div>
              
              {status === 'error' && (
                <div className="error-message" role="alert">
                  <p>There was an error processing your subscription. Please try again later or email us directly at iona@compagnia.org.</p>
                </div>
              )}

              <button type="submit" className="submit-button" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default Subscribe;
