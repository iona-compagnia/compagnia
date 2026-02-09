import { useState } from 'react';
import type { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if About or any sub-page (like Director) is active
  const isAboutActive = location.pathname === '/about' || location.pathname === '/director';

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <Link to="/" onClick={closeMenu}>
            <img 
              src="/images/logo-full.png" 
              alt="Compagnia" 
              className="logo"
            />
          </Link>
        </div>

        <button type="button" className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li className="nav-item dropdown">
              <NavLink 
                to="/about" 
                className={`dropdown-trigger ${isAboutActive ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                About
              </NavLink>
              <div className="dropdown-content">
                <NavLink to="/director" onClick={closeMenu}>Director</NavLink>
              </div>
            </li>
            <li className="nav-item"><NavLink to="/events" onClick={closeMenu}>Events</NavLink></li>
            <li className="nav-item"><NavLink to="/musicians" onClick={closeMenu}>Musicians</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
            <li className="nav-item"><a href="https://fundraising.fracturedatlas.org/compagnia" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Donate</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
