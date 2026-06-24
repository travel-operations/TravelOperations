"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, ImageIcon, Map, Globe, FileText, LogOut,
  Plus, Pencil, Trash2, X, Check, AlertCircle, Eye, EyeOff,
  ChevronUp, ChevronDown, Upload, Menu, ArrowLeft, ArrowUpRight, Star,
} from 'lucide-react';

type Section = {
  key: string;
  label: string;
  pageLabel: string;
  icon: any;
  table: string;
  category?: string;
  group?: string;
};

const SECTIONS: Section[] = [
  { key: 'overview',          label: 'Website Sections',  pageLabel: '',           icon: LayoutDashboard, table: '' },
  { key: 'hero',              label: 'Hero Slides',       pageLabel: 'Home Page',  icon: ImageIcon,       table: 'hero_slides' },
  { key: 'popular_tours',     label: 'Popular Tours',     pageLabel: 'Home Page',  icon: Map,             table: 'popular_tours' },
  { key: 'home_visa',         label: 'Visa Consultancy',  pageLabel: 'Home Page',  icon: Globe,           table: 'home_visa_cards' },
  { key: 'tours_asia',        label: 'Asia Tours',        pageLabel: 'Tours Page', icon: Map,             table: 'tour_cards',    category: 'asia',        group: 'tours' },
  { key: 'tours_middle_east', label: 'Middle East Tours', pageLabel: 'Tours Page', icon: Map,             table: 'tour_cards',    category: 'middle_east', group: 'tours' },
  { key: 'tours_europe',      label: 'Europe Tours',      pageLabel: 'Tours Page', icon: Map,             table: 'tour_cards',    category: 'europe',      group: 'tours' },
  { key: 'visa_cards',        label: 'Visa Cards',        pageLabel: 'Visa Page',    icon: Globe,           table: 'visa_cards' },
  { key: 'visa_countries',    label: 'Visa Countries',    pageLabel: 'Visa Page',    icon: Globe,           table: 'visa_countries' },
  { key: 'umrah',             label: 'Umrah Packages',    pageLabel: 'Umrah Page',   icon: Star,            table: 'umrah_packages' },
  { key: 'blog',              label: 'Blog Posts',        pageLabel: 'Blog Page',    icon: FileText,        table: 'blog_posts' },
];

type Field = {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  textarea?: boolean;
  isImage?: boolean;
  readonly?: boolean;
};

const FIELDS: Record<string, Field[]> = {
  hero: [
    { key: 'eyebrow',      label: 'Eyebrow Text',                    type: 'text',     required: true },
    { key: 'title',        label: 'Title',                           type: 'text',     required: true },
    { key: 'title_accent', label: 'Title Accent (italic)',           type: 'text' },
    { key: 'description',  label: 'Description',                     type: 'text',     textarea: true },
    { key: 'btn_text',     label: 'Button Text',                     type: 'text' },
    { key: 'href',         label: 'Button Link',                     type: 'text' },
    { key: 'image',        label: 'Image',                           type: 'text',     isImage: true },
    { key: 'order_index',  label: 'Order',                           type: 'number' },
    { key: 'is_active',    label: 'Active',                          type: 'checkbox' },
  ],
  popular_tours: [
    { key: 'country',     label: 'Country',                           type: 'text',    required: true },
    { key: 'title',       label: 'Tour Title',                        type: 'text',    required: true },
    { key: 'code',        label: 'Country Code (e.g. TH)',            type: 'text' },
    { key: 'price',       label: 'Price (e.g. 165,000)',              type: 'text' },
    { key: 'image',       label: 'Image',                             type: 'text',    isImage: true },
    { key: 'duration',    label: 'Duration (e.g. 4 nights)',          type: 'text' },
    { key: 'location',    label: 'Location (e.g. Bangkok • Pattaya)', type: 'text' },
    { key: 'rating',      label: 'Rating (e.g. 4.9)',                 type: 'number' },
    { key: 'group_size',  label: 'Max Group Size',                    type: 'number' },
    { key: 'badge',       label: 'Badge (e.g. Best seller)',          type: 'text' },
    { key: 'featured',    label: 'Featured Card',                     type: 'checkbox' },
    { key: 'row',         label: 'Row (1 or 2)',                      type: 'number',  required: true },
    { key: 'order_index', label: 'Order within row',                  type: 'number' },
  ],
  home_visa: [
    { key: 'country',     label: 'Country Name',                      type: 'text',    required: true },
    { key: 'code',        label: 'Country Code (e.g. UK)',            type: 'text' },
    { key: 'type',        label: 'Visa Type (e.g. Visit Visa)',       type: 'text' },
    { key: 'processing',  label: 'Processing (e.g. 15–20 working days)', type: 'text' },
    { key: 'success',     label: 'Success Rate (e.g. 94%)',           type: 'text' },
    { key: 'image',       label: 'Image',                             type: 'text',    isImage: true },
    { key: 'order_index', label: 'Order',                             type: 'number' },
  ],
  tours: [
    { key: 'country',      label: 'Country',                         type: 'text',     required: true },
    { key: 'title',        label: 'Tour Title',                      type: 'text',     required: true },
    { key: 'code',         label: 'Country Code (e.g. UZ)',          type: 'text' },
    { key: 'price',        label: 'Price (e.g. 280,000)',            type: 'text' },
    { key: 'image',        label: 'Image',                           type: 'text',     isImage: true },
    { key: 'duration',     label: 'Duration (e.g. 8 days · 7 nights)', type: 'text' },
    { key: 'rating',       label: 'Rating (e.g. 4.8)',               type: 'number' },
    { key: 'reviews',      label: 'Reviews Count',                   type: 'number' },
    { key: 'badge',        label: 'Badge (e.g. Featured)',           type: 'text' },
    { key: 'featured',     label: 'Featured Card',                   type: 'checkbox' },
    { key: 'category',     label: 'Category (auto-set)',             type: 'text',     readonly: true },
    { key: 'order_index',  label: 'Order',                           type: 'number' },
  ],
  visa_cards: [
    { key: 'name',         label: 'Country Name',                    type: 'text',     required: true },
    { key: 'code',         label: 'Country Code (e.g. UZ)',          type: 'text' },
    { key: 'type',         label: 'Visa Type (e.g. E-Visa)',         type: 'text' },
    { key: 'price',        label: 'Price (e.g. 13,000)',             type: 'text' },
    { key: 'processing',   label: 'Processing Time',                 type: 'text' },
    { key: 'validity',     label: 'Validity (e.g. 30 days)',         type: 'text' },
    { key: 'success',      label: 'Success Rate (e.g. 99%)',         type: 'text' },
    { key: 'image',        label: 'Image',                           type: 'text',     isImage: true },
    { key: 'is_featured',  label: 'Featured / Prominent',            type: 'checkbox' },
    { key: 'order_index',  label: 'Order',                           type: 'number' },
  ],
  visa_countries: [
    { key: 'name',         label: 'Country Name',                    type: 'text',     required: true },
    { key: 'code',         label: 'Country Code (e.g. UZ)',          type: 'text' },
    { key: 'price',        label: 'Price (e.g. 13K)',                type: 'text' },
    { key: 'order_index',  label: 'Order',                           type: 'number' },
  ],
  umrah: [
    { key: 'tier',         label: 'Tier (e.g. Economy)',             type: 'text',     required: true },
    { key: 'title',        label: 'Package Title (e.g. 15 Days)',    type: 'text',     required: true },
    { key: 'price',        label: 'Price (e.g. 195,000)',            type: 'text',     required: true },
    { key: 'image',        label: 'Image',                           type: 'text',     isImage: true },
    { key: 'nights',       label: 'Nights (e.g. 8N Makkah · 5N Madinah)', type: 'text' },
    { key: 'hotel',        label: 'Hotel (e.g. 3-star, 800m from Haram)', type: 'text' },
    { key: 'rating',       label: 'Rating (e.g. 4.8)',               type: 'number' },
    { key: 'popular',      label: 'Most Chosen / Popular',           type: 'checkbox' },
    { key: 'order_index',  label: 'Order',                           type: 'number' },
  ],
  blog: [
    { key: 'title',        label: 'Title',                           type: 'text',     required: true },
    { key: 'slug',         label: 'Slug (e.g. my-post)',             type: 'text',     required: true },
    { key: 'date',         label: 'Date (e.g. 10 JUL)',              type: 'text' },
    { key: 'author',       label: 'Author',                          type: 'text' },
    { key: 'category',     label: 'Category',                        type: 'text' },
    { key: 'image',        label: 'Image',                           type: 'text',     isImage: true },
    { key: 'excerpt',      label: 'Excerpt (short summary)',         type: 'text',     textarea: true },
    { key: 'content',      label: 'Description / Content',           type: 'text',     textarea: true },
  ],
};

const displayCols: Record<string, string[]> = {
  hero:           ['eyebrow', 'title', 'order_index', 'is_active'],
  popular_tours:  ['country', 'title', 'price', 'duration', 'row', 'featured'],
  home_visa:      ['country', 'code', 'type', 'processing', 'success'],
  tours:          ['country', 'title', 'price', 'featured'],
  visa_cards:     ['name', 'code', 'price', 'processing', 'is_featured'],
  visa_countries: ['name', 'code', 'price', 'order_index'],
  umrah:          ['tier', 'title', 'price', 'nights', 'popular'],
  blog:           ['title', 'date', 'author', 'category'],
};

const OVERVIEW_GROUPS = [
  { page: 'Home Page',   keys: ['hero', 'popular_tours', 'home_visa'] },
  { page: 'Tours Page',  keys: ['tours_asia', 'tours_middle_east', 'tours_europe'] },
  { page: 'Visa Page',   keys: ['visa_cards', 'visa_countries'] },
  { page: 'Umrah Page',  keys: ['umrah'] },
  { page: 'Blog Page',   keys: ['blog'] },
];

const SIDEBAR_GROUPS = [
  { label: null,    keys: ['overview'] },
  { label: 'Home',  keys: ['hero', 'popular_tours', 'home_visa'] },
  { label: 'Tours', keys: ['tours_asia', 'tours_middle_east', 'tours_europe'] },
  { label: 'Visa',  keys: ['visa_cards', 'visa_countries'] },
  { label: 'Umrah', keys: ['umrah'] },
  { label: 'Blog',  keys: ['blog'] },
];

function getSectionFields(key: string) {
  if (key.startsWith('tours_')) return FIELDS['tours'];
  if (key === 'home_visa') return FIELDS['home_visa'];
  return FIELDS[key] || [];
}

function getSectionCols(key: string) {
  if (key.startsWith('tours_')) return displayCols['tours'];
  if (key === 'home_visa') return displayCols['home_visa'];
  return displayCols[key] || [];
}


export default function AdminPage() {
  const [session, setSession]             = useState<any>(null);
  const [authLoading, setAuthLoading]     = useState(true);
  const [loginLoading, setLoginLoading]   = useState(false);
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [authError, setAuthError]         = useState('');

  const [activeSection, setActiveSection] = useState('overview');
  const [data, setData]                   = useState<Record<string, any[]>>({});
  const [overviewCounts, setOverviewCounts] = useState<Record<string, number>>({});
  const [dataLoading, setDataLoading]     = useState(false);
  const [showForm, setShowForm]           = useState(false);
  const [editId, setEditId]               = useState<string | null>(null);
  const [formData, setFormData]           = useState<Record<string, any>>({});
  const [uploading, setUploading]         = useState(false);
  const [toast, setToast]                 = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStorageFix, setShowStorageFix] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s); setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchOverviewCounts = useCallback(async () => {
    if (!supabase) return;
    const counts: Record<string, number> = {};
    await Promise.all(
      SECTIONS.filter(s => s.table).map(async (sec) => {
        const q = supabase!.from(sec.table).select('id', { count: 'exact', head: true });
        const { count } = sec.category ? await q.eq('category', sec.category) : await q;
        counts[sec.key] = count ?? 0;
      })
    );
    setOverviewCounts(counts);
  }, []);

  const fetchSection = useCallback(async (section: string) => {
    if (!supabase) return;
    const sec = SECTIONS.find(s => s.key === section);
    if (!sec || !sec.table) return;
    setDataLoading(true);
    const hasOrderIndex = getSectionFields(section).some(f => f.key === 'order_index');
    let q = supabase.from(sec.table).select('*');
    if (hasOrderIndex) q = (q as any).order('order_index', { ascending: true });
    q = (q as any).order('created_at', { ascending: false });
    const { data: rows, error } = sec.category ? await (q as any).eq('category', sec.category) : await q;
    if (!error) setData(prev => ({ ...prev, [section]: rows || [] }));
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchOverviewCounts();
    if (activeSection !== 'overview') fetchSection(activeSection);
  }, [session, activeSection, fetchSection, fetchOverviewCounts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) { setAuthError('Supabase not connected'); return; }
    setLoginLoading(true); setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setLoginLoading(false);
  };

  const handleLogout = async () => { await supabase?.auth.signOut(); setData({}); };

  const openAddForm = (sectionKey?: string) => {
    const key = sectionKey || activeSection;
    const sec = SECTIONS.find(s => s.key === key);
    setEditId(null);
    setFormData(sec?.category ? { category: sec.category } : {});
    setShowForm(true);
    setMobileMenuOpen(false);
    if (sectionKey && sectionKey !== activeSection) setActiveSection(sectionKey);
  };

  const openEditForm = (item: any) => { setEditId(item.id); setFormData({ ...item }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); setFormData({}); };
  const handleFieldChange = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleImageUpload = async (file: File, fieldKey: string) => {
    if (!supabase) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${activeSection}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('travel-images').upload(path, file, { cacheControl: '3600', upsert: true });
      if (upErr) {
        const msg = upErr.message.toLowerCase();
        if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('bucket') || msg.includes('not found')) {
          setShowStorageFix(true);
        } else {
          showToast('Upload failed: ' + upErr.message, 'error');
        }
        setUploading(false); return;
      }
      const { data: { publicUrl } } = supabase.storage.from('travel-images').getPublicUrl(path);
      handleFieldChange(fieldKey, publicUrl);
      showToast('Image uploaded!');
    } catch (err: any) {
      showToast('Upload error: ' + (err?.message || 'Unknown'), 'error');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!supabase) return showToast('Supabase not connected', 'error');
    const sec = SECTIONS.find(s => s.key === activeSection);
    if (!sec || !sec.table) return;
    const fields = getSectionFields(activeSection);
    for (const f of fields.filter(f => f.required)) {
      if (!formData[f.key]) return showToast(`${f.label} is required`, 'error');
    }
    const payload: Record<string, any> = { ...formData };
    if (sec.category) payload.category = sec.category;
    delete payload.id; delete payload.created_at;
    let error;
    if (editId) {
      ({ error } = await supabase.from(sec.table).update(payload).eq('id', editId));
    } else {
      ({ error } = await supabase.from(sec.table).insert([payload]));
    }
    if (error) return showToast(error.message, 'error');
    showToast(editId ? 'Updated!' : 'Created!');
    closeForm();
    fetchSection(activeSection);
    fetchOverviewCounts();
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !window.confirm('Delete this item permanently?')) return;
    const sec = SECTIONS.find(s => s.key === activeSection);
    if (!sec) return;
    const { error } = await supabase.from(sec.table).delete().eq('id', id);
    if (error) return showToast(error.message, 'error');
    showToast('Deleted');
    fetchSection(activeSection);
    fetchOverviewCounts();
  };

  const moveOrder = async (item: any, dir: 'up' | 'down') => {
    if (!supabase) return;
    const sec = SECTIONS.find(s => s.key === activeSection);
    if (!sec) return;
    const rows = data[activeSection] || [];
    const idx = rows.findIndex(r => r.id === item.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= rows.length) return;
    const swap = rows[swapIdx];
    await supabase.from(sec.table).update({ order_index: swap.order_index ?? swapIdx }).eq('id', item.id);
    await supabase.from(sec.table).update({ order_index: item.order_index ?? idx }).eq('id', swap.id);
    fetchSection(activeSection);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0e1a2b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e7a892] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0e1a2b] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-[#fbf9f6] rounded-3xl p-8 shadow-2xl">
            <div className="mb-7">
              <h1 className="font-serif text-4xl text-[#0e1a2b] leading-tight">
                Admin <span className="italic text-[#c7654d]">Panel</span>
              </h1>
              <p className="text-[#143656]/60 text-sm mt-1">Travel Operations · Dashboard</p>
            </div>
            {!supabase && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex gap-3">
                <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-xs font-medium">Supabase not connected — check .env.local</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/55 mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="info@traveloperations.pk" required
                  className="w-full bg-[#f1ece4] text-[#0e1a2b] px-5 py-3.5 rounded-full font-medium placeholder:text-[#143656]/35 outline-none focus:ring-2 focus:ring-[#c7654d]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/55 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full bg-[#f1ece4] text-[#0e1a2b] px-5 py-3.5 rounded-full font-medium placeholder:text-[#143656]/35 outline-none focus:ring-2 focus:ring-[#c7654d] pr-12" />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#143656]/50 hover:text-[#c7654d] transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loginLoading || !supabase}
                className="w-full bg-[#0e1a2b] text-white py-3.5 rounded-full font-semibold hover:bg-[#c7654d] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {loginLoading
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
                  : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const currentSection = SECTIONS.find(s => s.key === activeSection)!;
  const rows   = data[activeSection] || [];
  const cols   = getSectionCols(activeSection);
  const fields = getSectionFields(activeSection);

  return (
    <div className="min-h-screen bg-[#f1ece4] flex flex-col md:flex-row">

      {toast && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto z-[100] flex items-center gap-2 px-5 py-3 rounded-full shadow-xl text-sm font-semibold text-center justify-center md:justify-start ${toast.type === 'success' ? 'bg-[#0e1a2b] text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`fixed md:sticky top-0 left-0 h-full md:h-screen z-50 md:z-auto w-72 md:w-64 bg-[#0e1a2b] text-[#fbf9f6] flex flex-col transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-xl text-white leading-tight">Travel <span className="italic text-[#e7a892]">Ops</span></div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Admin Dashboard</div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-white/60 hover:text-white p-1"><X size={20} /></button>
          </div>
          <div className="mt-3 text-[11px] text-white/40 truncate">{session?.user?.email}</div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {SIDEBAR_GROUPS.map((group, gi) => (
            <div key={gi} className="mb-1">
              {group.label && (
                <div className="px-5 pt-3 pb-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{group.label}</span>
                </div>
              )}
              <div className="px-3 space-y-0.5">
                {group.keys.map(key => {
                  const sec = SECTIONS.find(s => s.key === key)!;
                  const Icon = sec.icon;
                  return (
                    <button key={key} onClick={() => { setActiveSection(key); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${activeSection === key ? 'bg-[#c7654d] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                      <Icon size={15} strokeWidth={2} className="shrink-0" />
                      {sec.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors">
            <Globe size={16} strokeWidth={2} className="shrink-0" /> View Website
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut size={16} strokeWidth={2} className="shrink-0" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="bg-white border-b border-[#e5dfd4] px-4 md:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[#0e1a2b] p-1.5 rounded-lg hover:bg-[#f1ece4] transition-colors">
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                {currentSection.pageLabel && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7654d] hidden md:inline">
                    {currentSection.pageLabel} ·
                  </span>
                )}
                <h1 className="font-serif text-xl md:text-2xl text-[#0e1a2b] leading-tight">{currentSection.label}</h1>
              </div>
              {activeSection !== 'overview' && (
                <p className="text-[#143656]/50 text-xs mt-0.5 hidden md:block">
                  {rows.length} item{rows.length !== 1 ? 's' : ''} · {currentSection.table}
                  {currentSection.category && <span className="ml-2 bg-[#f1ece4] px-2 py-0.5 rounded-full font-semibold">{currentSection.category}</span>}
                </p>
              )}
            </div>
          </div>
          {activeSection !== 'overview' && (
            <button onClick={() => openAddForm()}
              className="bg-[#c7654d] text-white px-4 md:px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[#0e1a2b] transition-colors shrink-0 shadow-md">
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Add {currentSection.label}</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </header>

        <div className="flex-1 p-4 md:p-8">
          {!supabase && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 text-sm">Supabase not configured</p>
                <p className="text-amber-700 text-xs mt-0.5">Add env vars to .env.local and run the SQL schema.</p>
              </div>
            </div>
          )}

          {activeSection === 'overview' ? (
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#0e1a2b] mb-1">Website Sections</h2>
                <p className="text-[#143656]/55 text-sm">Select a section to manage cards, or click "Add Card" to add directly.</p>
              </div>
              {OVERVIEW_GROUPS.map(group => (
                <div key={group.page}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7654d]">{group.page}</span>
                    <div className="flex-1 h-px bg-[#e5dfd4]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.keys.map(key => {
                      const sec = SECTIONS.find(s => s.key === key)!;
                      const Icon = sec.icon;
                      const count = overviewCounts[key] ?? '—';
                      return (
                        <div key={key} className="bg-white rounded-2xl border border-[#e5dfd4] p-5 flex flex-col gap-4 shadow-sm hover:border-[#c7654d]/40 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#f1ece4] flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-[#c7654d]" strokeWidth={2} />
                              </div>
                              <div>
                                <p className="font-semibold text-[#0e1a2b] text-sm">{sec.label}</p>
                                {sec.category && (
                                  <span className="text-[10px] font-semibold text-[#c7654d] uppercase tracking-wider">{sec.category.replace('_', ' ')}</span>
                                )}
                              </div>
                            </div>
                            <span className="font-serif text-3xl text-[#0e1a2b]/20 tabular-nums">{count}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setActiveSection(key)}
                              className="flex-1 py-2 rounded-full border border-[#e5dfd4] text-[#0e1a2b] text-xs font-semibold hover:bg-[#f1ece4] transition-colors flex items-center justify-center gap-1.5">
                              <Pencil size={12} strokeWidth={2} /> Manage
                            </button>
                            <button onClick={() => openAddForm(key)}
                              className="flex-1 py-2 rounded-full bg-[#c7654d] text-white text-xs font-semibold hover:bg-[#0e1a2b] transition-colors flex items-center justify-center gap-1.5">
                              <Plus size={12} strokeWidth={2.5} /> Add Card
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : dataLoading ? (
            <div className="bg-white rounded-2xl p-16 flex items-center justify-center border border-[#e5dfd4]">
              <div className="w-8 h-8 border-2 border-[#c7654d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : rows.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 md:p-20 text-center border border-[#e5dfd4]">
              <div className="w-16 h-16 bg-[#f1ece4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={24} className="text-[#143656]/40" />
              </div>
              <p className="text-[#143656]/60 text-sm mb-6">No {currentSection.label.toLowerCase()} yet.</p>
              <button onClick={() => openAddForm()}
                className="bg-[#0e1a2b] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#c7654d] transition-colors inline-flex items-center gap-2">
                <Plus size={15} /> Add first item
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-[#e5dfd4] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e5dfd4] bg-[#f1ece4]">
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/60 w-14">Order</th>
                        {cols.map(c => (
                          <th key={c} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/60">
                            {c.replace(/_/g, ' ')}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/60 w-28">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIdx) => (
                        <tr key={row.id} className="border-b border-[#e5dfd4] hover:bg-[#fbf9f6] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <button onClick={() => moveOrder(row, 'up')} disabled={rowIdx === 0}
                                className="text-[#143656]/30 hover:text-[#0e1a2b] disabled:opacity-20 transition-colors"><ChevronUp size={14} /></button>
                              <button onClick={() => moveOrder(row, 'down')} disabled={rowIdx === rows.length - 1}
                                className="text-[#143656]/30 hover:text-[#0e1a2b] disabled:opacity-20 transition-colors"><ChevronDown size={14} /></button>
                            </div>
                          </td>
                          {cols.map(c => (
                            <td key={c} className="px-4 py-3 text-[#0e1a2b] max-w-[200px]">
                              {typeof row[c] === 'boolean' ? (
                                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${row[c] ? 'bg-green-100 text-green-700' : 'bg-[#f1ece4] text-[#143656]/50'}`}>
                                  {row[c] ? <Check size={10} /> : <X size={10} />} {row[c] ? 'Yes' : 'No'}
                                </span>
                              ) : (
                                <span className="line-clamp-1 text-[13px] text-[#0e1a2b]/85">{String(row[c] ?? '—')}</span>
                              )}
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openEditForm(row)}
                                className="p-2 rounded-lg text-[#143656]/60 hover:bg-[#f1ece4] hover:text-[#0e1a2b] transition-colors" title="Edit">
                                <Pencil size={14} strokeWidth={2} />
                              </button>
                              <button onClick={() => handleDelete(row.id)}
                                className="p-2 rounded-lg text-[#143656]/60 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                                <Trash2 size={14} strokeWidth={2} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => openAddForm()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-[#c7654d] hover:bg-[#f1ece4] transition-colors border-t border-dashed border-[#e5dfd4]">
                  <Plus size={16} strokeWidth={2.5} /> Add new {currentSection.label}
                </button>
              </div>

              <div className="md:hidden space-y-3">
                {rows.map((row, rowIdx) => (
                  <div key={row.id} className="bg-white rounded-2xl border border-[#e5dfd4] overflow-hidden shadow-sm">
                    <div className="px-4 py-3 bg-[#f1ece4] flex items-center justify-between border-b border-[#e5dfd4]">
                      <div className="flex gap-1">
                        <button onClick={() => moveOrder(row, 'up')} disabled={rowIdx === 0}
                          className="p-1.5 rounded-lg text-[#143656]/40 hover:text-[#0e1a2b] disabled:opacity-20"><ChevronUp size={14} /></button>
                        <button onClick={() => moveOrder(row, 'down')} disabled={rowIdx === rows.length - 1}
                          className="p-1.5 rounded-lg text-[#143656]/40 hover:text-[#0e1a2b] disabled:opacity-20"><ChevronDown size={14} /></button>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditForm(row)} className="p-2 rounded-lg text-[#143656]/60 hover:bg-white hover:text-[#0e1a2b] transition-colors">
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button onClick={() => handleDelete(row.id)} className="p-2 rounded-lg text-[#143656]/60 hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {cols.map(c => (
                        <div key={c} className="flex items-start justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#143656]/50 shrink-0 mt-0.5">{c.replace(/_/g, ' ')}</span>
                          {typeof row[c] === 'boolean' ? (
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${row[c] ? 'bg-green-100 text-green-700' : 'bg-[#f1ece4] text-[#143656]/50'}`}>
                              {row[c] ? <Check size={9} /> : <X size={9} />} {row[c] ? 'Yes' : 'No'}
                            </span>
                          ) : (
                            <span className="text-[13px] text-[#0e1a2b] font-medium text-right line-clamp-2">{String(row[c] ?? '—')}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={() => openAddForm()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-5 rounded-2xl bg-white border-2 border-dashed border-[#c7654d]/40 text-[#c7654d] font-semibold text-sm hover:bg-[#c7654d] hover:text-white hover:border-[#c7654d] transition-colors shadow-sm">
                  <Plus size={18} strokeWidth={2.5} /> Add new {currentSection.label}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5dfd4] shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={closeForm} className="md:hidden text-[#143656]/50 hover:text-[#0e1a2b] p-1"><ArrowLeft size={20} /></button>
                <div>
                  <h2 className="font-serif text-2xl text-[#0e1a2b]">{editId ? 'Edit' : 'Add'} {currentSection.label}</h2>
                  {currentSection.pageLabel && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7654d] mt-0.5">{currentSection.pageLabel}</p>
                  )}
                </div>
              </div>
              <button onClick={closeForm} className="hidden md:block text-[#143656]/50 hover:text-[#0e1a2b] p-1"><X size={20} /></button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#143656]/60 mb-2">
                    {f.label} {f.required && <span className="text-[#c7654d]">*</span>}
                  </label>

                  {f.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-11 h-6 rounded-full transition-colors relative ${formData[f.key] ? 'bg-[#c7654d]' : 'bg-[#e5dfd4]'}`}
                        onClick={() => handleFieldChange(f.key, !formData[f.key])}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${formData[f.key] ? 'left-6' : 'left-1'}`} />
                      </div>
                      <span className="text-sm text-[#0e1a2b] font-medium">{formData[f.key] ? 'Enabled' : 'Disabled'}</span>
                    </label>

                  ) : f.isImage ? (
                    <div className="space-y-3">
                      <input type="text" value={formData[f.key] || ''} onChange={e => handleFieldChange(f.key, e.target.value)}
                        placeholder="Paste image URL or upload below"
                        className="w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm placeholder:text-[#143656]/40 outline-none focus:ring-2 focus:ring-[#c7654d]" />
                      <div className="flex items-center gap-3 flex-wrap">
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${uploading ? 'bg-[#f1ece4] text-[#143656]/50' : 'bg-[#0e1a2b] text-white hover:bg-[#c7654d]'}`}>
                          {uploading
                            ? <><div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Uploading...</>
                            : <><Upload size={13} /> Upload image</>}
                          <input type="file" accept="image/*" className="hidden" disabled={uploading}
                            ref={el => { fileInputRefs.current[f.key] = el; }}
                            onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, f.key); }} />
                        </label>
                        {formData[f.key] && (
                          <div className="flex items-center gap-2">
                            <img src={formData[f.key]} alt="preview" className="h-12 w-12 object-cover rounded-xl border border-[#e5dfd4]"
                              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <button type="button" onClick={() => handleFieldChange(f.key, '')} className="text-[#143656]/40 hover:text-red-500"><X size={14} /></button>
                          </div>
                        )}
                      </div>
                    </div>

                  ) : f.textarea ? (
                    <textarea rows={4} value={formData[f.key] || ''} onChange={e => handleFieldChange(f.key, e.target.value)}
                      className="w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-[#c7654d] resize-none" />
                  ) : (
                    <input type={f.type} value={formData[f.key] ?? ''} readOnly={f.readonly}
                      onChange={e => !f.readonly && handleFieldChange(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className={`w-full bg-[#f1ece4] text-[#0e1a2b] px-4 py-3 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-[#c7654d] ${f.readonly ? 'opacity-60 cursor-not-allowed' : ''}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 px-6 py-5 border-t border-[#e5dfd4] shrink-0">
              <button onClick={closeForm}
                className="flex-1 md:flex-none px-6 py-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] font-semibold text-sm hover:bg-[#f1ece4] transition-colors">
                Cancel
              </button>
              <button onClick={handleSave}
                className="flex-1 md:flex-none px-6 py-3 rounded-full bg-[#c7654d] text-white font-semibold text-sm hover:bg-[#0e1a2b] transition-colors flex items-center justify-center gap-2">
                <Check size={15} strokeWidth={2.5} /> {editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStorageFix && (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5dfd4]">
              <div>
                <h2 className="font-serif text-xl text-[#0e1a2b]">Storage not set up</h2>
                <p className="text-[#143656]/55 text-xs mt-0.5">Image upload is blocked by a missing policy</p>
              </div>
              <button onClick={() => setShowStorageFix(false)} className="text-[#143656]/40 hover:text-[#0e1a2b] p-1 transition-colors"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-[#143656]/80 text-sm">Go to your <strong>Supabase Dashboard → SQL Editor</strong> and run this SQL once:</p>
              <div className="bg-[#0e1a2b] rounded-2xl p-4">
                <pre className="text-[11px] text-[#fbf9f6]/85 leading-relaxed whitespace-pre-wrap break-all overflow-x-auto">{`insert into storage.buckets (id, name, public)
values ('travel-images', 'travel-images', true)
on conflict (id) do update set public = true;

drop policy if exists "travel_images_insert" on storage.objects;
drop policy if exists "travel_images_select" on storage.objects;
drop policy if exists "travel_images_update" on storage.objects;
drop policy if exists "travel_images_delete" on storage.objects;

create policy "travel_images_select" on storage.objects
  for select using (bucket_id = 'travel-images');
create policy "travel_images_insert" on storage.objects
  for insert with check (bucket_id = 'travel-images');
create policy "travel_images_update" on storage.objects
  for update using (bucket_id = 'travel-images');
create policy "travel_images_delete" on storage.objects
  for delete using (bucket_id = 'travel-images');`}</pre>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { navigator.clipboard.writeText(`insert into storage.buckets (id, name, public)\nvalues ('travel-images', 'travel-images', true)\non conflict (id) do update set public = true;\n\ndrop policy if exists "travel_images_insert" on storage.objects;\ndrop policy if exists "travel_images_select" on storage.objects;\ndrop policy if exists "travel_images_update" on storage.objects;\ndrop policy if exists "travel_images_delete" on storage.objects;\n\ncreate policy "travel_images_select" on storage.objects\n  for select using (bucket_id = 'travel-images');\ncreate policy "travel_images_insert" on storage.objects\n  for insert with check (bucket_id = 'travel-images');\ncreate policy "travel_images_update" on storage.objects\n  for update using (bucket_id = 'travel-images');\ncreate policy "travel_images_delete" on storage.objects\n  for delete using (bucket_id = 'travel-images');`); showToast('SQL copied!'); }}
                  className="flex-1 bg-[#0e1a2b] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#c7654d] transition-colors">
                  Copy SQL
                </button>
                <button onClick={() => setShowStorageFix(false)}
                  className="flex-1 border border-[#e5dfd4] text-[#0e1a2b] py-3 rounded-full font-semibold text-sm hover:bg-[#f1ece4] transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
