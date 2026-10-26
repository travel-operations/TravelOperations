"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock, Star, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticAsia = [
  { id: "4", code: "UZ", country: "Uzbekistan", title: "Tashkent, Samarkand & Bukhara", price: "280,000", image: "/images/tour4.jpg", duration: "8 days · 7 nights", rating: 4.8, reviews: 174, badge: "Featured", featured: true },
  { id: "1", code: "TH", country: "Thailand", title: "Bangkok & Pattaya | Premium", price: "195,000", image: "/images/tour1.jpg", duration: "5 days · 4 nights", rating: 4.9, reviews: 213, badge: "Best seller" },
  { id: "2", code: "MY", country: "Malaysia", title: "Kuala Lumpur & Genting", price: "185,000", image: "/images/tour2.jpg", duration: "5 days · 4 nights", rating: 4.7, reviews: 156, badge: "Family" },
  { id: "3", code: "LK", country: "Sri Lanka", title: "Colombo & Kandy Heritage", price: "175,000", image: "/images/tour3.jpg", duration: "6 days · 5 nights", rating: 4.6, reviews: 98, badge: "Honeymoon" },
  { id: "5", code: "VN", country: "Vietnam", title: "Ha Long Bay Adventure", price: "230,000", image: "/images/tour6.jpg", duration: "6 days · 5 nights", rating: 4.7, reviews: 87, badge: "Adventure" },
  { id: "11", code: "SG", country: "Singapore", title: "Modern City Escape", price: "210,000", image: "/images/tour1.jpg", duration: "4 days · 3 nights", rating: 4.8, reviews: 119, badge: "City break" },
];

const staticMiddleEast = [
  { id: "6", code: "TR", country: "Turkey", title: "Istanbul & Cappadocia Honeymoon", price: "350,000", image: "/images/tour4.jpg", duration: "7 days · 6 nights", rating: 4.9, reviews: 247, badge: "Honeymoon" },
  { id: "7", code: "AE", country: "UAE", title: "Luxury City & Desert Safari", price: "220,000", image: "/images/tour1.jpg", duration: "5 days · 4 nights", rating: 4.9, reviews: 312, badge: "Luxury" },
  { id: "8", code: "AZ", country: "Azerbaijan", title: "Baku Modern City Tour", price: "215,000", image: "/images/tour2.jpg", duration: "6 days · 5 nights", rating: 4.6, reviews: 78, badge: "New" },
  { id: "9", code: "EG", country: "Egypt", title: "Pyramids & Nile Cruise", price: "390,000", image: "/images/tour3.jpg", duration: "7 days · 6 nights", rating: 4.8, reviews: 165, badge: "History" },
  { id: "10", code: "QA", country: "Qatar", title: "Doha Heritage Luxury", price: "160,000", image: "/images/tour6.jpg", duration: "4 days · 3 nights", rating: 4.7, reviews: 92, badge: "Weekend" },
  { id: "12", code: "SA", country: "Saudi Arabia", title: "Al Ula Historical Wonders", price: "410,000", image: "/images/tour4.jpg", duration: "5 days · 4 nights", rating: 4.9, reviews: 134, badge: "Premium" },
];

const sectionMeta = {
  asia: { title: "Asia", accent: "best sellers", subtitle: "Tropical beaches, ancient cities, vibrant markets." },
  middle_east: { title: "Middle East", accent: "& beyond", subtitle: "Desert luxury, modern skylines, ancient wonders." },
  europe: { title: "Europe", accent: "essentials", subtitle: "Historic cities, stunning coastlines, world-class cuisine." },
  africa: { title: "Africa", accent: "adventures", subtitle: "Wildlife safaris, ancient civilizations, breathtaking landscapes." },
};

const TourCard = ({ tour, delay = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-colors group h-full ${
      tour.featured
        ? 'border-2 border-[#EF5B2D] shadow-[0_20px_60px_-30px_rgba(239,91,45,0.7)]'
        : 'border border-[#e5dfd4] hover:border-[#EF5B2D]/40'
    }`}
  >
    <div className="relative h-56 md:h-60 overflow-hidden">
      <img
        src={tour.image}
        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms]"
        alt={tour.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b]/40 via-transparent to-transparent"></div>

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="bg-[#fbf9f6] text-[#0e1a2b] text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
          {tour.code || tour.country?.slice(0, 2)}
        </span>
        {tour.badge && (
          <span className={`text-white text-[10px] font-semibold tracking-wide backdrop-blur px-2.5 py-1 rounded-sm ${tour.featured ? 'bg-[#EF5B2D]' : 'bg-[#0e1a2b]/55'}`}>
            {tour.featured ? '★ Featured' : tour.badge}
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label="Save"
        className="absolute top-4 right-4 bg-white/95 backdrop-blur p-2 rounded-full text-[#EF5B2D] hover:scale-110 transition-all"
      >
        <Heart size={14} strokeWidth={2} />
      </button>

      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full">
        <Star size={12} className="text-[#EF5B2D]" fill="currentColor" />
        <span className="text-[11px] font-bold text-[#0e1a2b]">{tour.rating || 4.9}</span>
        <span className="text-[10px] text-[#143656]/50">({tour.reviews || 124})</span>
      </div>
    </div>

    <div className="p-5 md:p-6 grow flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#EF5B2D] mb-2">
        {tour.country}
      </p>
      <h3 className="font-serif text-[22px] text-[#0e1a2b] leading-tight mb-4">
        {tour.title}
      </h3>

      <div className="space-y-2 mb-5 text-[12px] text-[#143656]/75">
        <div className="flex items-start gap-2">
          <Clock size={14} className="text-[#EF5B2D] shrink-0 mt-0.5" strokeWidth={2.2} /> <span>{tour.duration}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-[#EF5B2D] shrink-0 mt-0.5" strokeWidth={2.2} /> <span>{tour.country}</span>
        </div>
      </div>

      <div className="mt-auto border-t border-[#e5dfd4] pt-4 flex justify-between items-end gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/50 font-semibold">From</div>
          <div className="font-serif text-2xl text-[#0e1a2b] leading-none mt-1">
            PKR {tour.price}
          </div>
        </div>
        <Link href={`/tours/${tour.id}`}>
          <button
            type="button"
            className="bg-[#0e1a2b] text-white px-4 py-2.5 rounded-full hover:bg-[#EF5B2D] transition-colors flex items-center gap-1.5 text-[11px] font-semibold"
          >
            View trip
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </button>
        </Link>
      </div>
    </div>
  </motion.article>
);

const TourRow = ({ title, accent, subtitle, data }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1 > data.length - 4 ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev === 0 ? Math.max(0, data.length - 4) : prev - 1));

  return (
    <div className="mb-20 md:mb-28 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h3 className="font-serif text-4xl md:text-5xl text-[#0e1a2b] leading-tight">
            {title} <span className="italic text-[#EF5B2D]">{accent}</span>
          </h3>
          {subtitle && <p className="text-sm md:text-base text-[#143656]/70 mt-2 max-w-md">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {data.slice(index, index + 4).map((tour, ci) => (
            <TourCard key={tour.id} tour={tour} delay={ci * 0.08} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ToursListing = () => {
  const [grouped, setGrouped] = useState({
    asia: staticAsia,
    middle_east: staticMiddleEast,
  });

  const fetchTours = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('tour_cards')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const groups = {};
        data.forEach((card) => {
          const key = card.category || 'asia';
          if (!groups[key]) groups[key] = [];
          groups[key].push(card);
        });
        setGrouped(groups);
      });
  }, []);

  useEffect(() => { fetchTours(); }, [fetchTours]);

  const categoryKeys = Object.keys(grouped);

  return (
    <section className="py-16 md:py-24 bg-paper overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {categoryKeys.map((key) => {
          const meta = sectionMeta[key] || { title: key.replace(/_/g, ' '), accent: '', subtitle: '' };
          return (
            <TourRow
              key={key}
              title={meta.title}
              accent={meta.accent}
              subtitle={meta.subtitle}
              data={grouped[key]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToursListing;
