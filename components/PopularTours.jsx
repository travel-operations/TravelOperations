"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, ArrowUpRight, ChevronLeft, ChevronRight, Clock, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticRow1 = [
  { id: 1, code: "TH", country: "Thailand",    title: "Bangkok & Pattaya Beach Escape",    price: "165,000", duration: "4 nights", location: "Bangkok • Pattaya",        image: "/images/travel1.jpg", rating: 4.9, group_size: 12, badge: "Best seller", featured: false, row: 1, order_index: 1 },
  { id: 2, code: "AZ", country: "Azerbaijan",   title: "Baku Cultural City Tour",            price: "215,000", duration: "4 nights", location: "Baku • Gabala",           image: "/images/travel2.jpg", rating: 4.8, group_size: 15, badge: "Featured",    featured: false, row: 1, order_index: 2 },
  { id: 3, code: "LK", country: "Sri Lanka",    title: "Colombo, Kandy & Tea Trails",        price: "175,000", duration: "4 nights", location: "Colombo • Kandy",         image: "/images/tour3.jpg",   rating: 4.7, group_size: 14, badge: "Honeymoon",   featured: false, row: 1, order_index: 3 },
  { id: 4, code: "MV", country: "Maldives",     title: "All-Inclusive Luxury Resort",        price: "690,000", duration: "4 nights", location: "Malé • Maafushi",         image: "/images/tour2.jpg",   rating: 5.0, group_size: 8,  badge: "Luxury",      featured: false, row: 1, order_index: 4 },
];

const staticRow2 = [
  { id: 7, code: "UZ", country: "Uzbekistan",   title: "Tashkent, Samarkand & Bukhara",      price: "280,000", duration: "7 nights", location: "Tashkent • Samarkand",   image: "/images/tour6.jpg",   rating: 4.8, group_size: 12, badge: "Featured",    featured: true,  row: 2, order_index: 1 },
  { id: 5, code: "TR", country: "Turkey",        title: "Istanbul & Cappadocia Honeymoon",    price: "350,000", duration: "6 nights", location: "Istanbul • Cappadocia",  image: "/images/tour3.jpg",   rating: 4.9, group_size: 14, badge: "Hot deal",    featured: false, row: 2, order_index: 2 },
  { id: 6, code: "MY", country: "Malaysia",      title: "Kuala Lumpur & Genting Highlands",   price: "185,000", duration: "4 nights", location: "Kuala Lumpur • Genting", image: "/images/tour4.jpg",   rating: 4.6, group_size: 16, badge: "Family",      featured: false, row: 2, order_index: 3 },
  { id: 8, code: "AE", country: "UAE",           title: "Dubai City & Desert Safari",         price: "220,000", duration: "4 nights", location: "Dubai • Abu Dhabi",       image: "/images/tour6.jpg",   rating: 4.9, group_size: 18, badge: "Luxury",      featured: false, row: 2, order_index: 4 },
];

const TourRow = ({ toursData }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 3 >= toursData.length ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev === 0 ? Math.max(0, toursData.length - 3) : prev - 1));
  const visibleTours = toursData.slice(index, index + 3);

  return (
    <div className="relative mb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {visibleTours.map((tour, ci) => (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-[#fbf9f6] rounded-2xl overflow-hidden flex flex-col group transition-colors ${
                tour.featured
                  ? 'border-2 border-[#c7654d] shadow-[0_20px_60px_-30px_rgba(199,101,77,0.7)]'
                  : 'border border-[#e5dfd4] hover:border-[#c7654d]/40'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1200ms]" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#fbf9f6] text-[#0e1a2b] text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
                    {tour.code}
                  </span>
                  <span className={`text-white text-[11px] font-semibold tracking-wide backdrop-blur-sm px-2.5 py-1 rounded-sm ${tour.featured ? 'bg-[#c7654d]' : 'bg-[#0e1a2b]/55'}`}>
                    {tour.featured ? '★ Featured' : tour.badge}
                  </span>
                </div>
                <button type="button" aria-label="Save"
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur p-2 rounded-full text-[#0e1a2b]/40 hover:text-[#c7654d] transition-colors">
                  <Heart size={15} strokeWidth={2} />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full">
                  <Star size={11} className="text-[#c7654d]" fill="currentColor" />
                  <span className="text-[11px] font-bold text-[#0e1a2b]">{tour.rating}</span>
                </div>
              </div>

              <div className="p-6 grow flex flex-col">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c7654d] mb-2">{tour.country}</p>
                <h3 className="font-serif text-2xl text-[#0e1a2b] mb-4 leading-tight">{tour.title}</h3>
                <div className="grid grid-cols-2 gap-y-2 mb-5 text-[12px] text-[#143656]/70">
                  <div className="flex items-center gap-1.5"><Clock size={13} className="text-[#c7654d]" strokeWidth={2} /> {tour.duration}</div>
                  <div className="flex items-center gap-1.5"><Users size={13} className="text-[#c7654d]" strokeWidth={2} /> Max {tour.group_size}</div>
                  <div className="flex items-center gap-1.5 col-span-2"><MapPin size={13} className="text-[#c7654d]" strokeWidth={2} /> {tour.location}</div>
                </div>
                <div className="flex justify-between items-end border-t border-[#e5dfd4] pt-4 mt-auto">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/50 font-semibold">From</div>
                    <div className="text-[#0e1a2b] font-serif text-2xl md:text-3xl leading-none mt-1 whitespace-nowrap">
                      <span className="text-base align-[2px]">PKR</span> {tour.price}
                    </div>
                    <div className="text-[10px] text-[#143656]/50 mt-1">per traveller</div>
                  </div>
                  <Link href="/book-now">
                    <button type="button"
                      className="bg-[#0e1a2b] text-white px-4 py-3 rounded-full hover:bg-[#c7654d] transition-colors flex items-center gap-2 text-xs font-semibold">
                      Reserve <ArrowUpRight size={14} strokeWidth={2.5} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-3 mt-8">
        <button type="button" onClick={prev} aria-label="Previous"
          className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors">
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button type="button" onClick={next} aria-label="Next"
          className="p-3 rounded-full border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors">
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

const PopularTours = () => {
  const [row1, setRow1] = useState(staticRow1);
  const [row2, setRow2] = useState(staticRow2);

  const fetchTours = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('popular_tours')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const r1 = data.filter(t => t.row === 1 || t.row === '1');
        const r2 = data.filter(t => t.row === 2 || t.row === '2');
        if (r1.length > 0) setRow1(r1);
        if (r2.length > 0) setRow2(r2);
      });
  }, []);

  useEffect(() => { fetchTours(); }, [fetchTours]);

  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Hand-picked journeys
              
            </p>
            <h2 className="font-serif text-[44px] md:text-7xl leading-[0.95] text-[#0e1a2b] tracking-tight">
              Special offers, <span className="italic text-[#c7654d]">carefully composed.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[#143656]/75 text-base leading-relaxed mb-5">
              Flights, hotels, transfers and curated activities — bundled into seamless trips. We negotiate, you arrive.
            </p>
            <Link href="/tours">
              <button type="button"
                className="inline-flex items-center gap-2 text-[#0e1a2b] font-semibold text-sm border-b border-[#0e1a2b] pb-1 hover:border-[#c7654d] hover:text-[#c7654d] transition-colors">
                View the full catalogue <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </div>

        <TourRow toursData={row1} />
        <TourRow toursData={row2} />
      </div>
    </section>
  );
};

export default PopularTours;
