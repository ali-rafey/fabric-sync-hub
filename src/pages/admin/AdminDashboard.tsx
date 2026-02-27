import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Package, Layers, CheckCircle, Upload, Image, Video } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  /* Fetch dashboard stats */
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [articlesRes, inStockRes, categoriesRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }).eq('in_stock', true),
        supabase.from('articles').select('category'),
      ]);
      const categories = new Set(categoriesRes.data?.map(a => a.category) || []);
      return {
        totalArticles: articlesRes.count || 0,
        inStock: inStockRes.count || 0,
        categories: categories.size,
      };
    },
  });

  /* Fetch current hero media setting */
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

  /* Upload hero media (image or video) */
  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const isVideo = file.type.startsWith('video/');
      const ext = file.name.split('.').pop();
      const path = `hero/hero-media.${ext}`;

      /* Upload to storage */
      const { error: uploadError } = await supabase.storage
        .from('fabric-images')
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      /* Get public URL */
      const { data: urlData } = supabase.storage.from('fabric-images').getPublicUrl(path);

      /* Update site_settings */
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({
          value: urlData.publicUrl,
          media_type: isVideo ? 'video' : 'image',
        })
        .eq('key', 'hero_media');
      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ['site-settings', 'hero_media'] });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

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

      {/* Hero media uploader */}
      <div className="hero-upload-section">
        <h2 className="hero-upload-title">Hero Media</h2>
        <p className="hero-upload-desc">Upload an image or video for the homepage hero section.</p>

        {/* Preview current media */}
        {heroSetting?.value && (
          <div className="hero-preview">
            {heroSetting.media_type === 'video' ? (
              <video src={heroSetting.value} controls className="hero-preview-media" />
            ) : (
              <img src={heroSetting.value} alt="Hero" className="hero-preview-media" />
            )}
            <span className="hero-media-badge">
              {heroSetting.media_type === 'video' ? <><Video /> Video</> : <><Image /> Image</>}
            </span>
          </div>
        )}

        {/* Upload button */}
        <label className="hero-upload-btn">
          <Upload />
          {uploading ? 'Uploading…' : 'Upload Image or Video'}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleHeroUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </AdminLayout>
  );
}
