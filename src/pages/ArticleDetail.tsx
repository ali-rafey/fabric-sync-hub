import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MainLayout } from '@/components/layout/MainLayout';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { FabricArticle, FabricSpecs } from '@/types/fabric';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: article, isLoading: articleLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FabricArticle | null;
    },
    enabled: !!id,
  });

  const { data: specs } = useQuery({
    queryKey: ['fabric-specs', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fabric_specs')
        .select('*')
        .eq('article_id', id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FabricSpecs | null;
    },
    enabled: !!id,
  });

  if (articleLoading) {
    return (
      <MainLayout>
        <div className="article-loading">
          <div className="skeleton skeleton-hero" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-price" />
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="article-not-found">
          <p>Article not found</p>
          <button onClick={() => navigate('/explore')} className="article-not-found-btn">
            Back to Explore
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="article-detail-page">
        <div className="article-back-section">
          <button className="article-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Back
          </button>
        </div>

        <div className="article-detail-grid">
          {/* Image */}
          <div className="article-hero-wrap">
            <div className="article-hero-card">
              {article.hero_image_url ? (
                <img src={article.hero_image_url} alt={article.name} className="article-hero-img" />
              ) : (
                <div className="article-hero-placeholder">
                  <span>{article.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="article-info">
            <div className="article-meta">
              <span className="article-badge">{article.category}</span>
              <div className={`article-stock ${article.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                {article.in_stock ? <><CheckCircle /><span>In Stock</span></> : <><XCircle /><span>Out of Stock</span></>}
              </div>
            </div>

            <h1 className="article-title">{article.name}</h1>

            <div className="article-prices">
              <p className="article-price">AED {Number(article.price_aed).toFixed(2)}<span className="article-price-unit"> / meter</span></p>
              {article.price_usd != null && article.price_usd > 0 && (
                <p className="article-price">USD {Number(article.price_usd).toFixed(2)}<span className="article-price-unit"> / meter</span></p>
              )}
              {article.price_pkr != null && article.price_pkr > 0 && (
                <p className="article-price">PKR {Number(article.price_pkr).toFixed(0)}<span className="article-price-unit"> / meter</span></p>
              )}
            </div>

            {article.description && <p className="article-description">{article.description}</p>}

            {/* Specs */}
            {specs && (
              <div className="article-specs">
                <h2 className="article-specs-title">Technical Specifications</h2>
                <div className="specs-grid">
                  <div className="spec-item"><span className="spec-label">GSM</span><span className="spec-value">{specs.gsm} g/m²</span></div>
                  <div className="spec-item"><span className="spec-label">Tear Strength</span><span className="spec-value">{specs.tear_strength}</span></div>
                  <div className="spec-item"><span className="spec-label">Tensile Strength</span><span className="spec-value">{specs.tensile_strength}</span></div>
                  <div className="spec-item"><span className="spec-label">Dye Class</span><span className="spec-value">{specs.dye_class}</span></div>
                  <div className="spec-item"><span className="spec-label">Thread Count</span><span className="spec-value">{specs.thread_count}</span></div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="article-cta">
              <h3 className="article-cta-title">Interested in this fabric?</h3>
              <p className="article-cta-text">Contact us for samples, bulk pricing, or custom requirements</p>
              <button onClick={() => navigate('/contact')} className="article-cta-btn">Request Information</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
