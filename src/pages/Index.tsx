import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ArrowRight } from 'lucide-react';
import './Index.css';

export default function Index() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-tag">Premium B2B Textile Manufacturing</span>
          <h1 className="hero-title">
            Crafting Excellence<br />
            in Every <span className="hero-accent">Thread</span>
          </h1>
          <p className="hero-description">
            Three generations of heritage in fabric manufacturing. Discover our collection
            of premium textiles, crafted for the world's finest garment makers.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate('/explore')} className="hero-cta-primary">
              Explore Collection
              <ArrowRight />
            </button>
            <button onClick={() => navigate('/about')} className="hero-cta-ghost">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip">
        {[
          { num: '60+', label: 'Years of Excellence' },
          { num: '500+', label: 'Fabric Varieties' },
          { num: '40+', label: 'Countries Served' },
        ].map((f) => (
          <div key={f.label} className="feature-item">
            <span className="feature-num">{f.num}</span>
            <span className="feature-label">{f.label}</span>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}
