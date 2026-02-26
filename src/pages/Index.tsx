import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ArrowRight } from 'lucide-react';
import './Index.css';

// Stats displayed below the hero
const stats = [
  { num: '60+', label: 'Years of Excellence' },
  { num: '500+', label: 'Fabric Varieties' },
  { num: '40+', label: 'Countries Served' },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero section — full-height dark banner */}
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

          {/* CTA buttons */}
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

      {/* Stats strip */}
      <section className="features-strip">
        {stats.map((s) => (
          <div key={s.label} className="feature-item">
            <span className="feature-num">{s.num}</span>
            <span className="feature-label">{s.label}</span>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}
