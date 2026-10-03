"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Hotel, FileCheck2, Star, Calendar, BadgeCheck, ArrowUpRight, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Home page par zyada se zyada kitne cards (4 per row x 2 rows)
const HOME_LIMIT = 8;

const staticPackages = [
  {
    id: 1,
    tier: "Economy",
    title: "15 Days · Considered",
    price: "195,000",
    image: "/images/umrah.jpg",
    nights: "8N Makkah · 5N Madinah",
    hotel: "3-star, 800m from Haram",
    rating: 4.6,
    popular: false,
    order_index: 1,
  },
  {
    id: 2,
    tier: "Standard",
    title: "21 Days · Most chosen",
    price: "206,300",
    image: "/images/hajj.jpg",
    nights: "12N Makkah · 7N Madinah",
    hotel: "4-star, 400m from Haram",
    rating: 4.8,
    popular: true,
    order_index: 2,
  },
  {
    id: 3,
    tier: "Premium",
    title: "21 Days · Pullman view",
    price: "217,600",
    image: "/images/tour1.jpg",
    nights: "12N Makkah · 7N Madinah",
    hotel: "5-star, 200m from Haram",
    rating: 4.9,
    popular: false,
    order_index: 3,
  },
  {
    id: 4,
    tier: "Royal",
    title: "21 Days · Haram-facing",
    price: "295,200",
    image: "/images/tour2.jpg",
    nights: "12N Makkah · 7N Madinah",
    hotel: "Hilton / Pullman, Haram view",
    rating: 5.0,
    popular: false,
    order_index: 4,
  },
];

const UmrahPackages = ({ featured = false }) => {
  const [packages, setPackages] = useState(
    featured ? staticPackages.filter((p) => p.popular).slice(0, HOME_LIMIT) : staticPackages
  );

  const fetchPackages = useCallback(() => {
    if (!supabase) return;

    let query = supabase
      .from('umrah_packages')
      .select('*')
      .order('order_index', { ascending: true });

    if (featured) {
      query = query.eq('popular', true).limit(HOME_LIMIT);
    }

    query.then(({ data }) => {
      if (data && data.length > 0) setPackages(data);
    });
  }, [featured]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  return (
    <section className="py-24 md:py-32 bg-[#fbf9f6] grain">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="md:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Umrah Packages 2026
            </p>
            <h2 className="font-serif text-[44px] md:text-6xl leading-[0.95] text-[#0e1a2b] tracking-tight">
              A sacred journey,<br />
              <span className="italic text-[#143656]">handled start to end.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-4">
            <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed">
              Hotels within walking distance of Haram. Direct Saudia flights. A dedicated mu'allim for every group. Four tiers, transparent pricing, no upsell games.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-[#143656]">
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5dfd4] px-3 py-1.5 rounded-full">
                <ShieldCheck size={13} className="text-[#c7654d]" strokeWidth={2} /> PSA-licensed
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5dfd4] px-3 py-1.5 rounded-full">
                <BadgeCheck size={13} className="text-[#c7654d]" strokeWidth={2} /> 20,000+ pilgrims served
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5dfd4] px-3 py-1.5 rounded-full">
                <Phone size={13} className="text-[#c7654d]" strokeWidth={2} /> 24/7 in-trip line
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => {
            // Home page par sab cards popular hain, is liye wahan highlight/badge nahi dikhate
            const highlight = pkg.popular;

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white rounded-2xl overflow-hidden border ${highlight ? 'border-[#c7654d] shadow-[0_20px_60px_-30px_rgba(199,101,77,0.6)]' : 'border-[#e5dfd4]'} flex flex-col group`}
              >
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover"
                  />

                  {highlight && (
                    <span className="absolute top-4 right-4 bg-[#c7654d] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm">
                      Most chosen
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="mb-5">
                    <span className="font-serif italic text-[#c7654d] text-sm">{pkg.tier}</span>
                    <h3 className="font-semibold text-lg leading-tight text-[#0e1a2b]">{pkg.title}</h3>
                  </div>

                  <div className="space-y-2.5 text-[12px] text-[#143656]/80 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#c7654d] shrink-0" strokeWidth={2} /> {pkg.nights}
                    </div>
                    <div className="flex items-center gap-2">
                      <Hotel size={14} className="text-[#c7654d] shrink-0" strokeWidth={2} /> {pkg.hotel}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-[#c7654d] shrink-0" fill="currentColor" /> {pkg.rating} guest rating
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#f1ece4] pt-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/50 font-semibold mb-1">Per person from</div>
                    <div className="flex items-baseline gap-1.5 mb-5">
                      <span className="font-serif text-3xl text-[#0e1a2b] leading-none">PKR</span>
                      <span className="font-serif text-3xl text-[#c7654d] leading-none">{pkg.price}</span>
                    </div>

                    <Link href="/book-now">
                      <button
                        type="button"
                        className="w-full bg-[#0e1a2b] text-white py-3 rounded-full font-semibold text-xs hover:bg-[#c7654d] transition-colors flex items-center justify-center gap-2"
                      >
                        Reserve seat
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {featured && (
          <div className="text-center mt-16">
            <Link href="/umrah-packages">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-transparent border border-[#0e1a2b] text-[#0e1a2b] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#0e1a2b] hover:text-white transition-colors"
              >
                <FileCheck2 size={16} strokeWidth={2} />
                View all Umrah packages
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default UmrahPackages;
