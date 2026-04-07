import { useState } from 'react';
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

const Contact: FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setStatus('submitting');
    console.info('Contact form submission attempt:', formData.get('email'));
    
    // Track attempt in Umami
    if (window.umami) {
      window.umami.track('contact-form-attempt', { email: formData.get('email') });
    }

    // Create hidden iframe for submission
    const iframeName = 'hidden_iframe_contact';
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
      'entry.1236900277': (formData.get('message') || '').toString().trim(),
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
        // Track successful contact form submission in Umami
        if (window.umami) {
          window.umami.track('contact-form-success', { email: formData.get('email') });
        }

        setStatus('success');
        form.reset();
        document.body.removeChild(tempForm);
        // Reset form status after 10 seconds
        setTimeout(() => setStatus('idle'), 10000);
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      if (tempForm.parentNode) document.body.removeChild(tempForm);
    }
  };

  return (
    <div className="contact-page">
      <FadeIn>
        <h1 className="page-title">Contact</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="contact-form-container">
          {status === 'success' ? (
            <div className="success-notification">
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
              <button onClick={() => setStatus('idle')} className="back-to-form-button">
                Send Another Message
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
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows={6} required disabled={status === 'submitting'}></textarea>
              </div>
              
              {status === 'error' && (
                <div className="error-message" role="alert">
                  <p>There was an error sending your message. Please try again later or email us directly at iona@compagnia.org.</p>
                </div>
              )}

              <button type="submit" className="submit-button" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default Contact;
