import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Index.css';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-page">
      <main className="hero-section">
        <div className="hero-background" />
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <Sparkles style={{ width: '1rem', height: '1rem', color: 'hsl(15, 65%, 50%)' }} />
            <span className="hero-badge">Premium B2B Textile Manufacturing</span>
          </div>

          <h1 className="hero-title">
            Textile<br />
            <span style={{ color: 'hsl(15, 65%, 50%)' }}>Fabrics</span>
          </h1>

          <p className="hero-description">
            Three generations of excellence in fabric manufacturing.
            Discover our collection of premium textiles, crafted for the world's finest garment makers.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/shop')} className="hero-cta">
              Explore Collection
              <ArrowRight />
            </button>
            <button onClick={() => navigate('/about')} className="hero-cta-secondary">
              Our Story
            </button>
          </div>
        </div>
      </main>

      <footer className="hero-footer">
        <p>© 2024 Textile Fabrics · Premium Manufacturing Since 1962</p>
      </footer>
    </div>
  );
}
