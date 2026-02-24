import { Navbar } from './Navbar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="site-footer">
        <p>© 2024 Fanaar Fabrics · Premium Textile Manufacturing</p>
      </footer>
    </div>
  );
}
