import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Package, Layers, CheckCircle } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  /* Fetch dashboard stats */
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [articlesRes, inStockRes, categoriesRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }).eq('in_stock', true),
        supabase.from('categories').select('id', { count: 'exact' }),
      ]);
      return {
        totalArticles: articlesRes.count || 0,
        inStock: inStockRes.count || 0,
        categories: categoriesRes.count || 0,
      };
    },
  });

  const statCards = [
    { label: 'Total Articles', value: stats?.totalArticles || 0, icon: Package },
    { label: 'In Stock', value: stats?.inStock || 0, icon: CheckCircle },
    { label: 'Categories', value: stats?.categories || 0, icon: Layers },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="admin-stats">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div className="stat-card-icon"><stat.icon /></div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
