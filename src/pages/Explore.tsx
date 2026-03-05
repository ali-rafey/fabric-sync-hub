import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ArticleGrid } from '@/components/shop/ArticleGrid';
import { BlogsSection } from '@/components/shop/BlogsSection';
import { ProcessSection } from '@/components/shop/ProcessSection';
import { ArrowLeft } from 'lucide-react';
import { getCategoryInfo } from '@/types/fabric';
import './Explore.css';

export default function Explore() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const categoryInfo = category ? getCategoryInfo(category) : null;

  // Restore scroll position when returning from blog detail
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.sessionStorage.getItem('explore_scroll_y');
    if (stored) {
      const offset = parseFloat(stored);
      if (!Number.isNaN(offset)) {
        const container = document.querySelector('.snap-container');
        if (container instanceof HTMLElement) {
          container.scrollTo({ top: offset, behavior: 'instant' as ScrollBehavior });
        } else {
          window.scrollTo({ top: offset });
        }
      }
      window.sessionStorage.removeItem('explore_scroll_y');
      return;
    }

  }, []);

  const { data: heroSettings } = useQuery({
    queryKey: ['site-settings-hero'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['hero_media', 'hero_video_muted']);
      if (error) throw error;
      const map = new Map((data || []).map((r) => [r.key, r]));
      return { hero_media: map.get('hero_media'), hero_video_muted: map.get('hero_video_muted') };
    },
  });

  const heroSetting = heroSettings?.hero_media;
  const heroUrl = heroSetting?.value;
  const heroType = heroSetting?.media_type || 'image';
  // Sound on when value is '0'; otherwise muted (default for autoplay)
  const heroMuted = heroSettings?.hero_video_muted?.value !== '0';
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Handle video autoplay gracefully to prevent browser stuttering/blocking on unmuted videos
  useEffect(() => {
    if (heroType === 'video' && heroUrl && heroVideoRef.current) {
      const video = heroVideoRef.current;
      video.load();
      video.muted = heroMuted;

      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn('Autoplay failed with current audio settings. Falling back to muted playback.', error);
          video.muted = true;
          video.play().catch(e => console.error('Fallback muted playback also failed.', e));
        }
      };

      attemptPlay();
    }
  }, [heroUrl, heroType, heroMuted]);

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
                ref={heroVideoRef}
                src={heroUrl}
                muted={heroMuted}
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="explore-hero-video"
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

      {/* Section 2: Process – 4-step snap scroll (Sourcing / Purpose / Testing / Sampling) */}
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

      {/* Section 5: Articles & Blogs */}
      <section className="snap-section explore-blogs-section">
        <BlogsSection />
      </section>
    </MainLayout>
  );
}
