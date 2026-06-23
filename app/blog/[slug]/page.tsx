"use client";
import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, MessageCircle, ChevronRight, Send, Calendar, ArrowLeft } from 'lucide-react';
import { blogsData } from '@/data/blogs';
import { supabase } from '@/lib/supabase';

export default function BlogDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [blog, setBlog]     = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticBlog   = blogsData.find((b: any) => b.slug === slug);
    const staticRecent = blogsData.slice(0, 3);

    if (supabase) {
      // fetch the single post
      supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
        .then(({ data, error }) => {
          setBlog(!error && data ? data : staticBlog || null);
        });

      // fetch 3 recent posts for sidebar
      supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)
        .then(({ data }) => {
          setRecent(data && data.length > 0 ? data : staticRecent);
          setLoading(false);
        });
    } else {
      setBlog(staticBlog || null);
      setRecent(staticRecent);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center pt-32">
        <div className="w-8 h-8 border-2 border-[#c7654d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-40 text-center min-h-screen bg-[#fbf9f6]">
        <h2 className="font-serif text-4xl text-[#0e1a2b] mb-4">Post not found</h2>
        <p className="text-[#143656]/60 mb-6">This blog post doesn't exist or may have been removed.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#c7654d] font-semibold hover:underline">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#fbf9f6] min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pt-32 pb-16 bg-[#0e1a2b]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${blog.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b] via-[#0e1a2b]/60 to-[#0e1a2b]/30" />
        </div>
        <div className="container mx-auto px-6 md:px-10 relative z-10 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-4">
            <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3" />
            {blog.category || 'Travel Blog'}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight max-w-4xl mb-6"
          >
            {blog.title}
          </motion.h1>
          <nav className="flex gap-2 text-xs font-semibold text-white/60">
            <Link href="/" className="hover:text-[#e7a892] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#e7a892] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#e7a892] line-clamp-1 max-w-[200px]">{blog.title}</span>
          </nav>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-20 md:py-28 container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-16">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-[#e5dfd4]">
              <span className="flex items-center gap-2 text-[#0e1a2b] font-semibold text-sm">
                <User size={15} className="text-[#c7654d]" strokeWidth={2} /> {blog.author || 'Travel Ops'}
              </span>
              <span className="flex items-center gap-2 text-[#143656]/60 text-sm">
                <Calendar size={15} className="text-[#c7654d]" strokeWidth={2} /> {blog.date}
              </span>
              <span className="flex items-center gap-2 text-[#143656]/60 text-sm">
                <MessageCircle size={15} className="text-[#c7654d]" strokeWidth={2} /> 0 comments
              </span>
            </div>

            {/* Cover image */}
            {blog.image && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-[#e5dfd4]">
                <img src={blog.image} alt={blog.title} className="w-full h-[320px] md:h-[460px] object-cover" />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="font-serif text-xl md:text-2xl text-[#0e1a2b] leading-relaxed mb-8 italic border-l-4 border-[#c7654d] pl-6">
                {blog.excerpt}
              </p>
            )}

            {/* Body */}
            <div className="prose prose-lg max-w-none text-[#143656]/85 leading-[1.9] whitespace-pre-line text-[15px] md:text-base">
              {blog.content || blog.excerpt}
            </div>

            {/* Comment form */}
            <div className="mt-16 p-8 md:p-10 bg-white rounded-3xl border border-[#e5dfd4]">
              <h3 className="font-serif text-3xl text-[#0e1a2b] mb-8">Leave a comment</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" placeholder="Full Name"
                  className="bg-[#f1ece4] text-[#0e1a2b] px-5 py-3.5 rounded-full font-medium placeholder:text-[#143656]/40 outline-none focus:ring-2 focus:ring-[#c7654d]" />
                <input type="email" placeholder="Email Address"
                  className="bg-[#f1ece4] text-[#0e1a2b] px-5 py-3.5 rounded-full font-medium placeholder:text-[#143656]/40 outline-none focus:ring-2 focus:ring-[#c7654d]" />
                <textarea rows={5} placeholder="Write your comment…"
                  className="md:col-span-2 bg-[#f1ece4] text-[#0e1a2b] px-5 py-4 rounded-2xl font-medium placeholder:text-[#143656]/40 outline-none focus:ring-2 focus:ring-[#c7654d] resize-none" />
                <button type="button"
                  className="w-fit bg-[#0e1a2b] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#c7654d] transition-colors flex items-center gap-2">
                  Post comment <Send size={15} strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">

            {/* Recent posts */}
            <div className="bg-white rounded-3xl border border-[#e5dfd4] p-7">
              <h3 className="font-serif text-2xl text-[#0e1a2b] mb-6 pb-4 border-b border-[#e5dfd4]">Recent posts</h3>
              <div className="space-y-5">
                {recent.map((post: any, i: number) => (
                  <Link href={`/blog/${post.slug}`} key={i}
                    className={`flex gap-4 group ${post.slug === slug ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-[#e5dfd4]">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="font-semibold text-[#0e1a2b] text-sm group-hover:text-[#c7654d] leading-tight mb-1 transition-colors line-clamp-2">{post.title}</h4>
                      <span className="text-[11px] font-bold text-[#c7654d] uppercase tracking-widest">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#0e1a2b] rounded-3xl p-7 text-white">
              <h3 className="font-serif text-2xl text-white mb-6 pb-4 border-b border-white/10">Categories</h3>
              <ul className="space-y-3">
                {['Travel Guides', 'Umrah Guide', 'Visa Updates', 'Tours & Packages', 'Top Destinations'].map((cat, i) => (
                  <li key={i} className="flex justify-between items-center group cursor-pointer py-2 border-b border-white/10">
                    <span className="font-medium text-white/70 group-hover:text-[#e7a892] transition-colors text-sm">{cat}</span>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-[#e7a892] group-hover:translate-x-1 transition-all" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Back link */}
            <Link href="/blog"
              className="flex items-center gap-2 text-[#0e1a2b] font-semibold text-sm hover:text-[#c7654d] transition-colors">
              <ArrowLeft size={16} strokeWidth={2} /> Back to all posts
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
