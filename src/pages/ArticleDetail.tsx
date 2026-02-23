import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MainLayout } from '@/components/layout/MainLayout';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { FabricArticle, FabricSpecs } from '@/types/fabric';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = location.state as { category?: string; articleScroll?: number } | null;

  const handleBack = () => {
    if (fromState?.category) {
      navigate('/shop', {
        state: { category: fromState.category, articleScroll: fromState.articleScroll ?? 0 },
      });
    } else {
      navigate('/shop');
    }
  };

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
          <div className="skeleton skeleton-back" />
          <div className="skeleton skeleton-hero" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-specs" />
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="article-not-found">
          <p>Article not found</p>
          <button onClick={() => navigate('/shop')} className="article-not-found-btn">
            Back to Shop
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="article-detail-page">
        {/* Back Button */}
        <div className="article-back-section">
          <button className="article-back-btn" onClick={handleBack}>
            <ArrowLeft />
            {fromState?.category ? 'Back to Articles' : 'Back to Shop'}
          </button>
        </div>

        <div className="article-content">
          {/* Hero Image */}
          <div className="article-hero-wrap">
            <div className="article-hero-card">
              {article.hero_image_url ? (
                <img
                  src={article.hero_image_url}
                  alt={article.name}
                  className="article-hero-img"
                />
              ) : (
                <div className="article-hero-placeholder">
                  <span>{article.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Header */}
          <div className="article-header">
            <div className="article-meta">
              <span className="article-badge">{article.category}</span>
              <div className={`article-stock ${article.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                {article.in_stock ? (
                  <>
                    <CheckCircle />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle />
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            </div>
            <h1 className="article-title">{article.name}</h1>
            <div className="article-prices">
              <p className="article-price">
                AED {Number(article.price_aed).toFixed(2)}
                <span className="article-price-unit"> / meter</span>
              </p>
              {article.price_usd != null && article.price_usd > 0 && (
                <p className="article-price">
                  USD {Number(article.price_usd).toFixed(2)}
                  <span className="article-price-unit"> / meter</span>
                </p>
              )}
              {article.price_pkr != null && article.price_pkr > 0 && (
                <p className="article-price">
                  PKR {Number(article.price_pkr).toFixed(0)}
                  <span className="article-price-unit"> / meter</span>
                </p>
              )}
            </div>
            {article.description && (
              <p className="article-description">{article.description}</p>
            )}
          </div>

          {/* Technical Specifications */}
          {specs && (
            <div className="article-specs">
              <h2 className="article-specs-title">Technical Specifications</h2>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <th>GSM (Weight)</th>
                    <td>{specs.gsm} g/m²</td>
                  </tr>
                  <tr>
                    <th>Tear Strength</th>
                    <td>{specs.tear_strength}</td>
                  </tr>
                  <tr>
                    <th>Tensile Strength</th>
                    <td>{specs.tensile_strength}</td>
                  </tr>
                  <tr>
                    <th>Dye Class</th>
                    <td>{specs.dye_class}</td>
                  </tr>
                  <tr>
                    <th>Thread Count / Construction</th>
                    <td>{specs.thread_count}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Contact CTA */}
          <div className="article-cta">
            <h3 className="article-cta-title">Interested in this fabric?</h3>
            <p className="article-cta-text">
              Contact us for samples, bulk pricing, or custom requirements
            </p>
            <button onClick={() => navigate('/contact')} className="article-cta-btn">
              Request Information
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
