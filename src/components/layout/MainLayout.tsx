import { Navbar } from './Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Wraps every page with navbar + footer
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      {/* Top navigation bar */}
      <Navbar />

      {/* Page content */}
      <main className="main-content">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="site-footer">
        <p>© 2024 Fanaar Fabrics · Premium Textile Manufacturing</p>
      </footer>
    </div>
  );
}
