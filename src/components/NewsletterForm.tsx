import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsletterForm.css';

const NewsletterForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const location = useLocation();

  // Close form on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Automatically close form when navigating to a new page
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setIsOpen(false);
  }, [location.pathname, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Simple Honeypot Check
    if (formData.get('website')) {
      // Simulate success for bots without sending data
      setStatus('success');
      return;
    }

    setStatus('submitting');
    
    const data = {
      firstName: (formData.get('firstName') as string).trim(),
      lastName: (formData.get('lastName') as string).trim(),
      email: (formData.get('email') as string).trim(),
      message: 'Newsletter Signup',
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwbAceArKq7HZVfESpo2pvX2gQb_c5ktJS4mN5Gz6cQZVSEZoAXEC0Y9CdvpoL1XYT6/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setStatus('success');
      (e.target as HTMLFormElement).reset();
      
      // Close form after success
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Newsletter error:', error);
      alert('There was an error. Please try again later.');
      setStatus('idle');
    }
  };

  if (!isOpen) {
    return (
      <button className="newsletter-trigger" onClick={() => setIsOpen(true)}>
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
            {/* Honeypot field - hidden from users */}
            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            
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
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
