import { useState, useRef } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FabricArticle, FabricSpecs, Category } from '@/types/fabric';
import { X, Upload, Trash2, Plus, Image } from 'lucide-react';
import './ArticleForm.css';

interface ArticleFormProps {
  article?: FabricArticle | null;
  onClose: () => void;
}

export function ArticleForm({ article, onClose }: ArticleFormProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: article?.name || '',
    description: article?.description || '',
    category: article?.category || '',
    price_aed: article?.price_aed || 0,
    price_usd: article?.price_usd || 0,
    price_pkr: article?.price_pkr || 0,
    in_stock: article?.in_stock ?? true,
    hero_image_url: article?.hero_image_url || '',
  });

  const [specs, setSpecs] = useState({ gsm: 0, tear_strength: '', tensile_strength: '', dye_class: '', thread_count: '' });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(article?.hero_image_url || null);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      return data as Category[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (article) {
        const { error } = await supabase.from('articles').update(formData).eq('id', article.id);
        if (error) throw error;
        if (specs.gsm > 0) {
          const { data: existingSpec } = await supabase.from('fabric_specs').select('id').eq('article_id', article.id).maybeSingle();
          if (existingSpec) {
            await supabase.from('fabric_specs').update(specs).eq('article_id', article.id);
          } else {
            await supabase.from('fabric_specs').insert({ ...specs, article_id: article.id });
          }
        }
      } else {
        const { data: newArticle, error } = await supabase.from('articles').insert(formData).select().single();
        if (error) throw error;
        if (specs.gsm > 0 && newArticle) {
          await supabase.from('fabric_specs').insert({ ...specs, article_id: newArticle.id });
        }
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-articles'] }); onClose(); },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      const fileExt = file.name.split('.').pop();
      const filePath = `articles/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('fabric-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('fabric-images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, hero_image_url: publicUrl }));
    } catch (error) { console.error('Upload error:', error); alert('Failed to upload image'); }
    finally { setUploading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{article ? 'Edit Article' : 'Add New Article'}</h2>
          <button className="modal-close" onClick={onClose}><X /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(); }}>
          <div className="modal-body">
            <div className="article-form">
              <div className="form-group full-width">
                <label className="form-label">Hero Image</label>
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="image-preview-remove" onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, hero_image_url: '' })); }}><Trash2 /></button>
                  </div>
                ) : (
                  <div className="image-upload" onClick={() => fileInputRef.current?.click()}>
                    <Upload />
                    <p>Click to upload</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </div>
                )}
                {uploading && <p style={{ fontSize: '0.875rem', color: 'hsl(30,8%,45%)' }}>Uploading...</p>}
              </div>
              <div className="form-group full-width">
                <label className="form-label">Article Name</label>
                <input type="text" className="form-input" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={formData.category} onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}>
                    <option value="">Select...</option>
                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price AED</label>
                  <input type="number" step="0.01" className="form-input" value={formData.price_aed} onChange={e => setFormData(prev => ({ ...prev, price_aed: parseFloat(e.target.value) }))} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price USD</label>
                  <input type="number" step="0.01" className="form-input" value={formData.price_usd} onChange={e => setFormData(prev => ({ ...prev, price_usd: parseFloat(e.target.value) }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Price PKR</label>
                  <input type="number" step="0.01" className="form-input" value={formData.price_pkr} onChange={e => setFormData(prev => ({ ...prev, price_pkr: parseFloat(e.target.value) }))} />
                </div>
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} />
              </div>
              <div className="form-group full-width">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={formData.in_stock} onChange={e => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))} />
                  In Stock
                </label>
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', marginTop: '1rem' }}>Specs (Optional)</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">GSM</label><input type="number" className="form-input" value={specs.gsm || ''} onChange={e => setSpecs(prev => ({ ...prev, gsm: parseInt(e.target.value) || 0 }))} /></div>
                <div className="form-group"><label className="form-label">Dye Class</label><input type="text" className="form-input" value={specs.dye_class} onChange={e => setSpecs(prev => ({ ...prev, dye_class: e.target.value }))} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Tear Strength</label><input type="text" className="form-input" value={specs.tear_strength} onChange={e => setSpecs(prev => ({ ...prev, tear_strength: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Tensile Strength</label><input type="text" className="form-input" value={specs.tensile_strength} onChange={e => setSpecs(prev => ({ ...prev, tensile_strength: e.target.value }))} /></div>
              </div>
              <div className="form-group full-width"><label className="form-label">Thread Count</label><input type="text" className="form-input" value={specs.thread_count} onChange={e => setSpecs(prev => ({ ...prev, thread_count: e.target.value }))} /></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel-modal" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-add-btn" disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Saving...' : 'Save Article'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
