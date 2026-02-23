import { Link, useLocation } from 'react-router-dom';
import { Info, ShoppingBag, Mail } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
  { to: '/contact', label: 'Contact', icon: Mail },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-brand">
        <Link to="/" className="sidebar-brand-link" onClick={handleNavClick}>
          <h1 className="sidebar-brand-title">TEXTILE</h1>
          <span className="sidebar-brand-subtitle">Fabrics</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          © 2024 Textile Fabrics<br />
          Premium Manufacturing
        </p>
      </div>
    </aside>
  );
}
