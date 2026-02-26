import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

// Dropdown menu structure — left side navigation
const navMenus = [
  {
    label: 'About Us',
    items: [
      { label: 'Our Story', path: '/about' },
      { label: 'Our Process', path: '/about' },
      { label: 'Our Team', path: '/about' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { label: 'All Categories', path: '/explore' },
      { label: 'New Arrivals', path: '/explore' },
      { label: 'Best Sellers', path: '/explore' },
    ],
  },
  {
    label: 'Contact Us',
    items: [
      { label: 'Get in Touch', path: '/contact' },
      { label: 'Book Consultation', path: '/contact' },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Toggle a dropdown open/closed
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Navigate and close everything
  const handleNav = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Left side: dropdown menus (desktop) */}
        <ul className="navbar-links" ref={dropdownRef}>
          {navMenus.map((menu) => (
            <li key={menu.label} className="navbar-dropdown-wrap">
              <button
                className={`navbar-link navbar-dropdown-trigger ${openDropdown === menu.label ? 'active' : ''}`}
                onClick={() => toggleDropdown(menu.label)}
              >
                {menu.label}
                <ChevronDown className={`navbar-chevron ${openDropdown === menu.label ? 'rotated' : ''}`} />
              </button>

              {/* Dropdown panel */}
              {openDropdown === menu.label && (
                <div className="navbar-dropdown">
                  {menu.items.map((item) => (
                    <button
                      key={item.label}
                      className="navbar-dropdown-item"
                      onClick={() => handleNav(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
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

        {/* Right side: brand logo */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-text">FANAAR</span>
          <span className="navbar-brand-sub">FABRICS</span>
        </Link>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <>
          <div className="navbar-mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="navbar-mobile-menu">
            {navMenus.map((menu) => (
              <div key={menu.label} className="mobile-menu-group">
                <button
                  className="mobile-menu-group-label"
                  onClick={() => toggleDropdown(menu.label)}
                >
                  {menu.label}
                  <ChevronDown className={`navbar-chevron ${openDropdown === menu.label ? 'rotated' : ''}`} />
                </button>

                {/* Mobile sub-items */}
                {openDropdown === menu.label && (
                  <div className="mobile-menu-sub">
                    {menu.items.map((item) => (
                      <button
                        key={item.label}
                        className="mobile-menu-sub-item"
                        onClick={() => handleNav(item.path)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
