"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageCircle, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogsData as staticBlogs } from '@/data/blogs';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [allBlogs, setAllBlogs] = useState(staticBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchBlogs = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setAllBlogs(data);
      });
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#fbf9f6] min-h-screen">
      <section className="relative min-h-[55vh] flex items-end pt-32 pb-16 bg-[#0e1a2b]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/travel-blog.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b] via-[#0e1a2b]/55 to-[#0e1a2b]/30"></div>
        </div>
        <div className="container mx-auto px-6 md:px-10 relative z-10 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-4">
            <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3"></span>
            Travel Operations · Blog
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-hero"
          >
            Travel<br />
            <span className="italic text-[#e7a892]">blog.</span>
          </motion.h1>
          <nav className="flex gap-2 text-xs font-semibold mt-6 text-white/60">
            <Link href="/" className="hover:text-[#e7a892] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#e7a892]">Blog</span>
          </nav>
        </div>
      </section>

      <section className="py-20 md:py-28 container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Recent stories
            </p>
            <h2 className="font-serif text-[40px] md:text-6xl text-[#0e1a2b] leading-[0.95]">
              Travel guides<br />
              <span className="italic text-[#c7654d]">straight from the trip.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-3">
            <p className="text-[#143656]/80 text-base leading-relaxed">
              Itineraries, visa updates and field notes from our trips — written by people who travelled them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentBlogs.map((blog) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5dfd4] group flex flex-col h-full hover:border-[#c7654d]/40 transition-colors"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={blog.image} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]" alt={blog.title} />
                  <div className="absolute top-4 left-4 bg-[#fbf9f6] text-[#0e1a2b] px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase">
                    {blog.date}
                  </div>
                </div>

                <div className="p-7 grow flex flex-col">
                  <div className="flex gap-4 text-[11px] font-semibold text-[#143656]/60 mb-3">
                    <span className="flex items-center gap-1.5"><User size={12} strokeWidth={2} /> {blog.author}</span>
                    <span className="flex items-center gap-1.5"><MessageCircle size={12} strokeWidth={2} /> 0 comments</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#0e1a2b] mb-3 leading-tight group-hover:text-[#c7654d] transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-[#143656]/75 text-[14px] mb-6 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`} className="mt-auto inline-flex items-center gap-2 text-[#0e1a2b] hover:text-[#c7654d] text-[12px] font-semibold border-b border-[#0e1a2b] hover:border-[#c7654d] pb-1 self-start transition-colors">
                    Read article <ArrowUpRight size={13} strokeWidth={2.5} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              type="button"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              aria-label="Previous page"
              className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => paginate(number)}
                className={`w-12 h-12 rounded-full font-semibold text-sm transition-colors ${
                  currentPage === number
                  ? 'bg-[#0e1a2b] text-white'
                  : 'bg-transparent border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b]'
                }`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              aria-label="Next page"
              className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
