import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import './NewsletterForm.css';

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
    
    const data = {
      firstName: (formData.get('firstName') || '').toString().trim(),
      lastName: (formData.get('lastName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      message: 'Newsletter Signup',
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzQeDdTD-XsBtrcZ52HaPm2T7r4XJTsaGPhZTbWVhsQSzqeV8CcjBRCmV6l5_nCZh2Q/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('success');
      form.reset();
      
      // Close form after success
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
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
