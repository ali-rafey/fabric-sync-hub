import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ArticleGrid } from '@/components/shop/ArticleGrid';
import { BestArticlesCarousel } from '@/components/shop/BestArticlesCarousel';
import { ProcessSection } from '@/components/shop/ProcessSection';
import { ArrowLeft } from 'lucide-react';
import { getCategoryInfo } from '@/types/fabric';
import './Explore.css';

export default function Explore() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const categoryInfo = category ? getCategoryInfo(category) : null;

  const { data: heroSetting } = useQuery({
    queryKey: ['site-settings', 'hero_media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'hero_media')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const heroUrl = heroSetting?.value;
  const heroType = heroSetting?.media_type || 'image';

  if (category) {
    return (
      <MainLayout>
        <div className="explore-page">
          <section className="explore-cat-header">
            <div className="explore-cat-header-inner">
              <button className="explore-back-btn" onClick={() => navigate('/explore')}>
                <ArrowLeft />
              </button>
              <div>
                <span className="explore-label">Category</span>
                <h1 className="explore-cat-title">{categoryInfo?.name}</h1>
              </div>
            </div>
          </section>
          <section className="explore-cat-content">
            <div className="explore-cat-content-inner">
              <ArticleGrid category={category} onArticleClick={(id) => navigate(`/article/${id}`)} />
            </div>
          </section>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout snap>
      {/* Section 1: Full-screen Hero */}
      <section className="snap-section explore-hero">
        <div className="explore-hero-media">
          {heroUrl ? (
            heroType === 'video' ? (
              <video
                src={heroUrl}
                autoPlay
                muted
                loop
                playsInline
                className="explore-hero-video"
                style={{ background: '#000' }}
              />
            ) : (
              <img src={heroUrl} alt="Hero" className="explore-hero-img" />
            )
          ) : (
            <div className="explore-hero-fallback" />
          )}
          <div className="explore-hero-overlay" />
        </div>
        <div className="explore-hero-content">
          <span className="explore-hero-label">Premium Textiles</span>
          <h1 className="explore-hero-title">Crafted for Excellence</h1>
          <p className="explore-hero-desc">Discover fabrics that define quality, precision, and luxury.</p>
          <div className="explore-scroll-hint">
            <span>Scroll to explore</span>
            <div className="explore-scroll-line" />
          </div>
        </div>
      </section>

      {/* Section 2: Description Bar (4:1 ratio) */}
      <section className="snap-section explore-desc-section">
        <div className="explore-desc-inner">
          <span className="explore-desc-label">Since 1990</span>
          <h2 className="explore-desc-title">Where Tradition Meets Innovation</h2>
          <p className="explore-desc-text">
            For over three decades, Fanaar Fabrics has been at the forefront of premium textile
            manufacturing. We blend time-honoured craftsmanship with cutting-edge technology to
            deliver fabrics that exceed the highest international standards.
          </p>
        </div>
      </section>

      {/* Section 3: Process – 4-step snap scroll (Sourcing / Purpose / Testing / Sampling) */}
      <section className="snap-section explore-process-section">
        <ProcessSection />
      </section>

      {/* Section 4: Category Cards */}
      <section className="snap-section explore-categories-section">
        <div className="explore-categories-inner">
          <div className="explore-section-header">
            <span className="explore-label">Our Collection</span>
            <h2 className="explore-section-title">Browse by Category</h2>
          </div>
          <CategoryGrid onCategorySelect={(cat) => navigate(`/explore/${cat}`)} limit={3} />
        </div>
      </section>

      {/* Section 5: Best Articles Carousel */}
      <section className="snap-section explore-carousel-section">
        <BestArticlesCarousel onArticleClick={(id) => navigate(`/article/${id}`)} />
      </section>
    </MainLayout>
  );
}
