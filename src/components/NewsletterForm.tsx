import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import './NewsletterForm.css';

const NewsletterForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: 'Newsletter Signup', // Default message for newsletter signups
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzQeDdTD-XsBtrcZ52HaPm2T7r4XJTsaGPhZTbWVhsQSzqeV8CcjBRCmV6l5_nCZh2Q/exec', {
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
        <p className="newsletter-success">You're on the list!</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-fields">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              required 
              disabled={status === 'submitting'} 
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              required 
              disabled={status === 'submitting'} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              disabled={status === 'submitting'} 
            />
            <button type="submit" className="newsletter-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? '...' : '→'}
            </button>
            <button type="button" className="newsletter-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
