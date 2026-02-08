import { useState } from 'react';
import type { FC } from 'react';
import './Admin.css';

const Admin: FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'dashboard' | 'events'>('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'https://script.google.com/macros/s/AKfycbzQeDdTD-XsBtrcZ52HaPm2T7r4XJTsaGPhZTbWVhsQSzqeV8CcjBRCmV6l5_nCZh2Q/exec';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'compagnia2026') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      action: 'addEvent',
      date: formData.get('date'),
      time: formData.get('time'),
      title: formData.get('title'),
      location: formData.get('location'),
      description: formData.get('description'),
      imageurl: formData.get('imageurl'),
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
      });
      alert('Event added successfully!');
      setView('dashboard');
    } catch (err) {
      alert('Error adding event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="admin-login-page">
        <div className="login-card">
          <h1>Director Admin</h1>
          <p>Please enter the secret passcode to manage the website.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Passcode"
              autoFocus
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'events') {
    return (
      <div className="admin-dashboard">
        <button onClick={() => setView('dashboard')} className="back-btn">← Back to Dashboard</button>
        <h1 className="page-title">Add New Event</h1>
        <form className="admin-form" onSubmit={handleAddEvent}>
          <div className="form-group">
            <label>Event Title</label>
            <input name="title" required placeholder="e.g., Spring Gala" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input name="date" type="date" required />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input name="time" placeholder="e.g., 7:30 PM" required />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" placeholder="e.g., Carnegie Hall" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows={4} required />
          </div>
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input name="imageurl" placeholder="https://..." />
          </div>
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Event to Website'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Management Dashboard</h1>
      <p className="welcome-msg">Welcome, Director. What would you like to update?</p>
      
      <div className="admin-actions-grid">
        <div className="admin-card">
          <h3>Upcoming Events</h3>
          <p>Update dates, locations, and descriptions for concerts.</p>
          <button className="admin-action-btn" onClick={() => setView('events')}>Manage Events</button>
        </div>
        
        <div className="admin-card">
          <h3>Musicians</h3>
          <p>Add new performers or update their bios.</p>
          <button className="admin-action-btn" disabled>Manage Musicians (Coming Soon)</button>
        </div>
        
        <div className="admin-card">
          <h3>General Content</h3>
          <p>Change the home page greeting or about text.</p>
          <button className="admin-action-btn" disabled>Edit Website Text (Coming Soon)</button>
        </div>
      </div>
      
      <button onClick={() => setIsAuthorized(false)} className="logout-btn">Lock Dashboard</button>
    </div>
  );
};

export default Admin;
