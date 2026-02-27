import { Navbar } from './Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
  /** Enable full-page snap scrolling */
  snap?: boolean;
}

/* Wraps every page with navbar + optional snap scroll container */
export function MainLayout({ children, snap = false }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Navbar />
      {snap ? (
        <div className="snap-container">
          {children}
          <footer className="site-footer">
            <p>© 2024 Fanaar Fabrics · Premium Textile Manufacturing</p>
          </footer>
        </div>
      ) : (
        <>
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <p>© 2024 Fanaar Fabrics · Premium Textile Manufacturing</p>
          </footer>
        </>
      )}
    </div>
  );
}
