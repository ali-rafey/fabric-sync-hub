import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

// Navigation links — "Home" removed, logo serves as home link
const navLinks = [
  { path: '/explore', label: 'Explore' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Brand logo — clicking goes to home */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-text">FANAAR</span>
          <span className="navbar-brand-sub">FABRICS</span>
        </Link>

        {/* Desktop navigation links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <>
          <div className="navbar-mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="navbar-mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
