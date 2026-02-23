import { MainLayout } from '@/components/layout/MainLayout';
import './About.css';

export default function About() {
  return (
    <MainLayout>
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-bg" />
          <div className="about-hero-content">
            <h1 className="about-hero-title">Crafted with Heritage</h1>
            <p className="about-hero-subtitle">
              Three generations of excellence in textile manufacturing
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="about-story-inner">
            <div className="story-block">
              <span className="story-label">Our Story</span>
              <h2 className="story-title">A Legacy of Quality</h2>
              <p className="story-text">
                Founded in 1962, our mill has been at the forefront of textile innovation for over six decades.
                What began as a small family operation has grown into one of the region's most respected fabric
                manufacturers, serving prestigious fashion houses and garment makers worldwide.
              </p>
            </div>

            <div className="stats-grid">
              {[
                { number: '60+', label: 'Years of Excellence' },
                { number: '500+', label: 'Fabric Varieties' },
                { number: '40+', label: 'Countries Served' },
              ].map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <span className="story-label">Our Process</span>
              <h2 className="story-title">From Fiber to Fabric</h2>
              <p className="story-text" style={{ marginBottom: '2rem' }}>
                Every bolt of fabric that leaves our facility undergoes rigorous quality testing. Our in-house
                laboratory conducts comprehensive analyses including GSM verification, tear and tensile strength
                testing, and colorfastness evaluation to ensure each product meets the highest industry standards.
              </p>

              <div className="process-grid">
                {[
                  { title: 'Quality Testing', desc: 'Every batch tested for GSM, tear strength, and tensile durability' },
                  { title: 'Color Mastery', desc: 'Advanced dyeing with Reactive, VAT, and Indanthrene processes' },
                  { title: 'Sustainable Practices', desc: 'Water recycling and eco-friendly dye solutions' },
                  { title: 'Custom Development', desc: 'Bespoke fabric creation for your unique requirements' },
                ].map((item) => (
                  <div key={item.title} className="process-card">
                    <h3 className="process-title">{item.title}</h3>
                    <p className="process-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
