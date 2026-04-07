import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import './NewsletterForm.css';

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

const NewsletterForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Close form on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setStatus('submitting');
    console.info('Newsletter signup attempt:', formData.get('email'));
    
    // Create hidden iframe for submission
    const iframeName = 'hidden_iframe_newsletter';
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
      'entry.1236900277': 'Newsletter Signup',
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
        // Track successful signup in Umami
        if (window.umami) {
          window.umami.track('newsletter-signup-success', { email: formData.get('email') });
        }

        setStatus('success');
        form.reset();
        document.body.removeChild(tempForm);
        
        // Close form after success
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      if (tempForm.parentNode) document.body.removeChild(tempForm);
    }
  };

  if (!isOpen) {
    return (
      <button type="button" className="newsletter-trigger" onClick={() => setIsOpen(true)}>
        Stay Updated!
      </button>
    );
  }

  return (
    <div className="newsletter-form-container">
      {status === 'success' ? (
        <p className="newsletter-success" role="alert">You're on the list!</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-fields">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              aria-label="First Name"
              required 
              disabled={status === 'submitting'} 
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              aria-label="Last Name"
              required 
              disabled={status === 'submitting'} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              aria-label="Email Address"
              required 
              disabled={status === 'submitting'} 
            />
            <button type="submit" className="newsletter-submit" disabled={status === 'submitting'} aria-label="Submit newsletter">
              {status === 'submitting' ? '...' : '→'}
            </button>
            <button type="button" className="newsletter-close" onClick={() => setIsOpen(false)} aria-label="Close form">×</button>
          </div>
          {status === 'error' && (
            <p className="newsletter-error-text" role="alert">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
