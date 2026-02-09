import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import './Contact.css';

const Contact: FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
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
      // Reset form status after 10 seconds
      setTimeout(() => setStatus('idle'), 10000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error sending your message. Please try again later.');
      setStatus('idle');
    }
  };

  return (
    <div className="contact-page">
      <h1 className="page-title">Contact</h1>
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
            <button type="submit" className="submit-button" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
