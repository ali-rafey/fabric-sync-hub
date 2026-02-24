import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ArticleGrid } from '@/components/shop/ArticleGrid';
import { ArrowLeft } from 'lucide-react';
import { getCategoryInfo } from '@/types/fabric';
import './Explore.css';

export default function Explore() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const categoryInfo = category ? getCategoryInfo(category) : null;

  return (
    <MainLayout>
      <div className="explore-page">
        <section className="explore-header">
          <div className="explore-header-inner">
            {category ? (
              <div className="explore-with-back">
                <button className="explore-back-btn" onClick={() => navigate('/explore')}>
                  <ArrowLeft />
                </button>
                <div>
                  <span className="explore-label">Category</span>
                  <h1 className="explore-cat-title">{categoryInfo?.name}</h1>
                </div>
              </div>
            ) : (
              <div className="explore-centered">
                <span className="explore-label">Our Collection</span>
                <h1 className="explore-title">Explore Fabrics</h1>
                <p className="explore-desc">
                  Browse categories and discover premium textiles crafted to meet the highest standards.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="explore-content">
          <div className="explore-content-inner">
            {category ? (
              <ArticleGrid
                category={category}
                onArticleClick={(id) => navigate(`/article/${id}`)}
              />
            ) : (
              <CategoryGrid onCategorySelect={(cat) => navigate(`/explore/${cat}`)} />
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
