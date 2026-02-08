import { useState } from 'react';
import type { FC } from 'react';
import './Admin.css';

const Admin: FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  // Note: For a real production app, this would be a real auth system.
  // For this project, we'll use a simple "secret key" approach.
  const ADMIN_PASSCODE = 'compagnia2026'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSCODE) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect passcode. Please try again.');
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

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Management Dashboard</h1>
      <p className="welcome-msg">Welcome, Director. What would you like to update?</p>
      
      <div className="admin-actions-grid">
        <div className="admin-card">
          <h3>Upcoming Events</h3>
          <p>Update dates, locations, and descriptions for concerts.</p>
          <button className="admin-action-btn">Manage Events</button>
        </div>
        
        <div className="admin-card">
          <h3>Musicians</h3>
          <p>Add new performers or update their bios.</p>
          <button className="admin-action-btn">Manage Musicians</button>
        </div>
        
        <div className="admin-card">
          <h3>General Content</h3>
          <p>Change the home page greeting or about text.</p>
          <button className="admin-action-btn">Edit Website Text</button>
        </div>
      </div>
      
      <button onClick={() => setIsAuthorized(false)} className="logout-btn">Lock Dashboard</button>
    </div>
  );
};

export default Admin;
