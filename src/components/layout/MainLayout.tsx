import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="main-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        <h1 className="mobile-brand">TEXTILE</h1>
      </header>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
