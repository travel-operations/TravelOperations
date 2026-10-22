"use client";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, X, Check, Upload, ArrowLeft } from 'lucide-react';

const SECTION_CONFIG = {
  hero: {
    table: 'hero_slides',
    label: 'Hero Slide',
    fields: [
      { key: 'eyebrow',      label: 'Eyebrow Text',          type: 'text',   required: true },
      { key: 'title',        label: 'Title',                 type: 'text',   required: true },
      { key: 'title_accent', label: 'Title Accent (italic)', type: 'text' },
      { key: 'description',  label: 'Description',           type: 'text',   textarea: true },
      { key: 'btn_text',     label: 'Button Text',           type: 'text' },
      { key: 'href',         label: 'Button Link',           type: 'text' },
      { key: 'image',        label: 'Image',                 type: 'text',   isImage: true },
      { key: 'order_index',  label: 'Order',                 type: 'number' },
      { key: 'is_active',    label: 'Active',                type: 'checkbox' },
    ],
  },
  tours: {
    table: 'tour_cards',
    label: 'Tour Card',
    fields: [
      { key: 'country',     label: 'Country',                             type: 'text', required: true },
      { key: 'title',       label: 'Tour Title',                          type: 'text', required: true },
      { key: 'code',        label: 'Country Code (e.g. UZ)',              type: 'text' },
      { key: 'price',       label: 'Price (e.g. 280,000)',                type: 'text' },
      { key: 'image',       label: 'Image',                               type: 'text', isImage: true },
      { key: 'duration',    label: 'Duration (e.g. 8 days · 7 nights)',  type: 'text' },
      { key: 'rating',      label: 'Rating (e.g. 4.8)',                  type: 'number' },
      { key: 'reviews',     label: 'Reviews Count',                       type: 'number' },
      { key: 'badge',       label: 'Badge (e.g. Featured)',               type: 'text' },
      { key: 'featured',    label: 'Featured Card',                       type: 'checkbox' },
      { key: 'category',    label: 'Category (asia / middle_east / europe)', type: 'text' },
      { key: 'order_index', label: 'Order',                               type: 'number' },
    ],
  },
  visa_cards: {
    table: 'visa_cards',
    label: 'Visa Card',
    fields: [
      { key: 'name',        label: 'Country Name',           type: 'text', required: true },
      { key: 'code',        label: 'Country Code (e.g. UZ)', type: 'text' },
      { key: 'type',        label: 'Visa Type (e.g. E-Visa)',type: 'text' },
      { key: 'price',       label: 'Price (e.g. 13,000)',    type: 'text' },
      { key: 'processing',  label: 'Processing Time',         type: 'text' },
      { key: 'validity',    label: 'Validity (e.g. 30 days)',type: 'text' },
      { key: 'success',     label: 'Success Rate (e.g. 99%)',type: 'text' },
      { key: 'image',       label: 'Image',                  type: 'text', isImage: true },
      { key: 'is_featured', label: 'Featured / Prominent',   type: 'checkbox' },
      { key: 'order_index', label: 'Order',                  type: 'number' },
    ],
  },
  visa_countries: {
    table: 'visa_countries',
    label: 'Visa Country',
    fields: [
      { key: 'name',        label: 'Country Name',           type: 'text', required: true },
      { key: 'code',        label: 'Country Code (e.g. UZ)', type: 'text' },
      { key: 'price',       label: 'Price (e.g. 13K)',       type: 'text' },
      { key: 'order_index', label: 'Order',                  type: 'number' },
    ],
  },
  blog: {
    table: 'blog_posts',
    label: 'Blog Post',
    fields: [
      { key: 'title',    label: 'Title',                   type: 'text', required: true },
      { key: 'slug',     label: 'Slug (e.g. my-post)',     type: 'text', required: true },
      { key: 'date',     label: 'Date (e.g. 10 JUL)',      type: 'text' },
      { key: 'author',   label: 'Author',                  type: 'text' },
      { key: 'category', label: 'Category',                type: 'text' },
      { key: 'image',    label: 'Image',                   type: 'text', isImage: true },
      { key: 'excerpt',  label: 'Excerpt (short summary)', type: 'text', textarea: true },
      { key: 'content',  label: 'Description / Content',   type: 'text', textarea: true },
    ],
  },
};

export default function AdminAddCard({ section, onSuccess, className = '' }) {
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);
  const fileInputRef            = useRef(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => setIsAdmin(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setIsAdmin(!!s));
    return () => subscription.unsubscribe();
  }, []);

  const config = SECTION_CONFIG[section];
  if (!isAdmin || !config) return null;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleImageUpload = async (file, fieldKey) => {
    if (!supabase) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${section}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('travel-images')
        .upload(path, file, { cacheControl: '3600', upsert: true });
      if (upErr) {
        const msg = upErr.message.toLowerCase();
        if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('bucket') || msg.includes('not found')) {
          showToast('Storage not set up — go to Admin panel to get the SQL fix', 'error');
        } else {
          showToast('Upload failed: ' + upErr.message, 'error');
        }
        setUploading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('travel-images').getPublicUrl(path);
      handleFieldChange(fieldKey, publicUrl);
      showToast('Image uploaded!');
    } catch (err) {
      showToast('Upload error: ' + (err?.message || 'Unknown'), 'error');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    for (const f of config.fields.filter(f => f.required)) {
      if (!formData[f.key]) return showToast(`${f.label} is required`, 'error');
    }
    setSaving(true);
    const { error } = await supabase.from(config.table).insert([{ ...formData }]);
    setSaving(false);
    if (error) return showToast(error.message, 'error');
    showToast('Added successfully!');
    setShowForm(false);
    setFormData({});
    onSuccess?.();
  };

  const close = () => { setShowForm(false); setFormData({}); };

  return (
    <>
      {toast && (
        <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2 px-5 py-3 rounded-full shadow-xl text-sm font-semibold ${toast.type === 'success' ? 'bg-[#0e1a2b] text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className={`inline-flex items-center gap-2 bg-[#F3592D] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0e1a2b] transition-colors shadow-md ${className}`}
      >
        <Plus size={16} strokeWidth={2.5} />
        Add {config.label}
      </button>

      {showForm && (
        <div className="fixed inset-0 z-[150] bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5dfd4] shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={close} className="md:hidden text-[#143656]/50 hover:text-[#0e1a2b] p-1">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="font-serif text-2xl text-[#0e1a2b]">Add {config.label}</h2>
              </div>
              <button onClick={close} className="hidden md:block text-[#143656]/50 hover:text-[#0e1a2b] p-1">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {config.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/60 mb-2">
                    {f.label} {f.required && <span className="text-[#F3592D]">*</span>}
                  </label>

                  {f.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative ${formData[f.key] ? 'bg-[#F3592D]' : 'bg-[#e5dfd4]'}`}
                        onClick={() => handleFieldChange(f.key, !formData[f.key])}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${formData[f.key] ? 'left-6' : 'left-1'}`} />
                      </div>
                      <span className="text-sm text-[#0e1a2b] font-medium">{formData[f.key] ? 'Enabled' : 'Disabled'}</span>
                    </label>

                  ) : f.isImage ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData[f.key] || ''}
                        onChange={(e) => handleFieldChange(f.key, e.target.value)}
                        placeholder="Paste image URL or upload below"
                        className="w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm placeholder:text-[#143656]/40 outline-none focus:ring-2 focus:ring-[#F3592D]"
                      />
                      <div className="flex items-center gap-3 flex-wrap">
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${uploading ? 'bg-[#f1ece4] text-[#143656]/50' : 'bg-[#0e1a2b] text-white hover:bg-[#F3592D]'}`}>
                          {uploading ? (
                            <><div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Uploading...</>
                          ) : (
                            <><Upload size={13} /> Upload image</>
                          )}
                          <input type="file" accept="image/*" className="hidden" disabled={uploading}
                            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, f.key); }} />
                        </label>
                        {formData[f.key] && (
                          <div className="flex items-center gap-2">
                            <img src={formData[f.key]} alt="preview"
                              className="h-12 w-12 object-cover rounded-xl border border-[#e5dfd4]"
                              onError={(e) => { e.target.style.display = 'none'; }} />
                            <button type="button" onClick={() => handleFieldChange(f.key, '')} className="text-[#143656]/40 hover:text-red-500">
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  ) : f.textarea ? (
                    <textarea
                      rows={4}
                      value={formData[f.key] || ''}
                      onChange={(e) => handleFieldChange(f.key, e.target.value)}
                      className="w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-[#F3592D] resize-none"
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={formData[f.key] ?? ''}
                      onChange={(e) => handleFieldChange(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-[#F3592D]"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 px-6 py-5 border-t border-[#e5dfd4] shrink-0">
              <button onClick={close}
                className="flex-1 md:flex-none px-6 py-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] font-semibold text-sm hover:bg-[#f1ece4] transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 md:flex-none px-6 py-3 rounded-full bg-[#F3592D] text-white font-semibold text-sm hover:bg-[#0e1a2b] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {saving
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                  : <><Check size={15} strokeWidth={2.5} /> Create</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
