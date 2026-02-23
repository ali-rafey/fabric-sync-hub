import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ArticleGrid } from '@/components/shop/ArticleGrid';
import { ArrowLeft } from 'lucide-react';
import { FabricCategory, getCategoryInfo } from '@/types/fabric';
import './Shop.css';

export default function Shop() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<FabricCategory | null>(
    (location.state as any)?.category ?? null
  );
  const navigate = useNavigate();
  const savedCategoryScrollPosition = useRef(0);
  const savedArticleScrollPosition = useRef(0);

  // Restore article scroll position when returning from article detail
  useEffect(() => {
    const scrollPos = (location.state as any)?.articleScroll;
    if (scrollPos != null && selectedCategory) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' as ScrollBehavior });
      });
    }
  }, []);

  const handleCategorySelect = (category: FabricCategory) => {
    savedCategoryScrollPosition.current = window.scrollY;
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedCategoryScrollPosition.current, behavior: 'instant' as ScrollBehavior });
    });
  };

  const handleArticleClick = (id: string) => {
    savedArticleScrollPosition.current = window.scrollY;
    navigate(`/shop/article/${id}`, {
      state: { category: selectedCategory, articleScroll: savedArticleScrollPosition.current },
    });
  };

  const selectedCategoryInfo = selectedCategory
    ? getCategoryInfo(selectedCategory)
    : null;

  return (
    <MainLayout>
      <div className="shop-page">
        {/* Header */}
        <section className="shop-header">
          <div className="shop-header-inner">
            {selectedCategory ? (
              <div className="shop-header-with-back">
                <button className="shop-back-btn" onClick={handleBackToCategories}>
                  <ArrowLeft />
                </button>
                <div>
                  <span className="shop-category-label">Category</span>
                  <h1 className="shop-category-title">{selectedCategoryInfo?.name}</h1>
                </div>
              </div>
            ) : (
              <div className="shop-header-centered">
                <span className="shop-label">Our Collection</span>
                <h1 className="shop-title">Shop Fabrics</h1>
                <p className="shop-description">
                  Explore our curated selection of premium textiles, each crafted to meet
                  the highest standards of quality and performance.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="shop-content">
          <div className="shop-content-inner">
            {selectedCategory ? (
              <ArticleGrid
                category={selectedCategory}
                onArticleClick={handleArticleClick}
              />
            ) : (
              <CategoryGrid onCategorySelect={handleCategorySelect} />
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
