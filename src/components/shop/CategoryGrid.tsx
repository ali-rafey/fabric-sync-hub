import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FabricCategory, Category, getCategoryInfo } from '@/types/fabric';
import './CategoryGrid.css';

interface CategoryGridProps {
  onCategorySelect: (category: FabricCategory) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Category[];
    },
  });

  if (isLoading) {
    return (
      <div className="category-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="category-card category-skeleton">
            <div className="category-image-wrap skeleton-image" />
            <div className="skeleton-text" />
            <div className="skeleton-text short" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="category-grid">
      {categories.map((category) => {
        const info = getCategoryInfo(category.name, category.image_url);
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className="category-card"
          >
            <div className="category-image-wrap">
              <div className="category-image-overlay" />
              {info.image ? (
                <img
                  src={info.image}
                  alt={info.name}
                  className="category-image"
                  loading="lazy"
                />
              ) : (
                <div className="category-placeholder">
                  <span>{info.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <h3 className="category-name">{info.name}</h3>
            <p className="category-desc">{info.description}</p>
          </button>
        );
      })}
    </div>
  );
}
