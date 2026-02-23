// Category is now dynamic - stored in database
export type FabricCategory = string;

export interface Category {
  id: string;
  name: string;
  image_url: string | null;
  created_at: string;
}

export interface FabricSpecs {
  id: string;
  article_id: string;
  gsm: number;
  tear_strength: string;
  tensile_strength: string;
  dye_class: string;
  thread_count: string;
}

export interface FabricArticle {
  id: string;
  name: string;
  description: string | null;
  category: FabricCategory;
  price_aed: number;
  price_usd: number | null;
  price_pkr: number | null;
  hero_image_url: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  fabric_specs?: FabricSpecs;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  image: string | null;
}

// Helper function to get category display info
export function getCategoryInfo(categoryName: string, imageUrl?: string | null): CategoryInfo {
  return {
    id: categoryName,
    name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
    description: 'Quality fabric materials',
    image: imageUrl || null,
  };
}
