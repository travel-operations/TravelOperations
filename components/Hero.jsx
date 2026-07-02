"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Map, FileCheck2, Search, Calendar, Users, MapPin, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticSlides = [
  {
    id: 1,
    image: "/images/uzbekistan-hero.jpg",
    eyebrow: "Featured · Uzbekistan Airways direct",
    title: "Uzbekistan,",
    title_accent: "along the Silk Road.",
    description: "Tashkent, Samarkand & Bukhara across 8 nights — direct Uzbekistan Airways flights, 4-star boutique stays, daily breakfast and a private driver-guide. Our most-loved journey of the year.",
    btn_text: "Explore Uzbekistan",
    href: "/tours",
  },
  {
    id: 2,
    image: "/images/azerbaijan-hero.jpg",
    eyebrow: "Discover Azerbaijan",
    title: "7 Days in Baku",
    title_accent: "and beyond.",
    description: "Explore the vibrant streets of Baku, the ancient charm of Sheki, the natural beauty of Gabala, and the unique landscapes of Gobustan with comfortable accommodations and guided tours.",
    btn_text: "View itinerary",
    href: "/tours",
  },
  {
    id: 3,
    image: "/images/tajikistan-hero.jpg",
    eyebrow: "Adventure · 6 Nights",
    title: "Explore",
    title_accent: "Tajikistan.",
    description: "Journey through the majestic Pamir Mountains, crystal-clear alpine lakes, historic Silk Road sites, and the vibrant culture of Dushanbe with comfortable stays and guided excursions.",
    btn_text: "Explore tour",
    href: "/tours",
  },
  {
    id: 4,
    image: "/images/thailand-hero.jpg",
    eyebrow: "Luxury Escape · 5 Nights",
    title: "Thailand,",
    title_accent: "reimagined.",
    description: "Private transfers, five-star resorts, tropical islands, vibrant nightlife, and curated experiences across Bangkok, Phuket, and Krabi.",
    btn_text: "Plan this trip",
    href: "/tours",
  },
];

const TABS = [
  { id: 'flights', label: 'Flights', Icon: Plane },
  { id: 'hotels', label: 'Hotels', Icon: Hotel },
  { id: 'tours', label: 'Tours', Icon: Map },
  { id: 'visa', label: 'Visa', Icon: FileCheck2 },
];

const TRIP_TYPES = ['One Way', 'Round Trip', 'Multi-City'];

const Field = ({ icon: Icon, label, placeholder, type = 'text' }) => (
  <label className="flex flex-col gap-1 bg-white hover:bg-[#fbf9f6] border border-[#e5dfd4] rounded-xl px-3 py-2.5 transition-colors cursor-pointer">
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#143656]/60">{label}</span>
    <div className="flex items-center gap-2">
      <Icon size={15} className="text-[#c7654d] shrink-0" strokeWidth={2} />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm font-semibold text-[#0e1a2b] placeholder:text-[#143656]/40"
      />
    </div>
  </label>
);

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('Round Trip');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="bg-[#fbf9f6] rounded-2xl shadow-[0_30px_60px_-20px_rgba(14,26,43,0.45)] p-4 md:p-5 w-full max-w-5xl border border-white/40"
    >
      <div className="flex flex-wrap gap-1.5 mb-4 border-b border-[#e5dfd4] pb-3">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === id
                ? 'bg-[#0e1a2b] text-[#fbf9f6]'
                : 'text-[#0e1a2b]/70 hover:bg-[#f1ece4]'
            }`}
          >
            <Icon size={15} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'flights' && (
        <div className="flex gap-2 mb-4">
          {TRIP_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTripType(t)}
              className={`px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full border transition-all ${
                tripType === t
                  ? 'bg-[#c7654d] text-white border-[#c7654d]'
                  : 'border-[#e5dfd4] text-[#143656]/70 hover:border-[#143656]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Field icon={MapPin} label={activeTab === 'visa' ? 'Destination country' : 'From'} placeholder={activeTab === 'visa' ? 'Dubai (UAE)' : 'Lahore (LHR)'} />
        {activeTab !== 'visa' && (
          <Field icon={MapPin} label="To" placeholder="Country (Any)" />
        )}
        <Field icon={Calendar} label="Departure" type="date" />
        {activeTab !== 'visa' && (
          <Field icon={Calendar} label={activeTab === 'hotels' ? 'Check-out' : 'Return'} type="date" />
        )}
        <Field icon={Users} label={activeTab === 'hotels' ? 'Guests & rooms' : activeTab === 'visa' ? 'Applicants' : 'Travellers'} placeholder="Adults" />
        {activeTab === 'visa' && (
          <Field icon={FileCheck2} label="Visa type" placeholder="Tourist / Visit" />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-5">
        <button
          type="button"
          className="bg-[#c7654d] hover:bg-[#0e1a2b] text-white px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
        >
          <Search size={16} strokeWidth={2.5} /> Search {TABS.find(t => t.id === activeTab)?.label}
        </button>
      </div>
    </motion.div>
  );
};

const HeroSlider = () => {
  const [slides, setSlides] = useState(staticSlides);
  const [current, setCurrent] = useState(0);

  const fetchSlides = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setSlides(data);
      });
  }, []);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];
  const titleAccent = slide.title_accent || slide.titleAccent;
  const description = slide.description || slide.desc;
  const btnText = slide.btn_text || slide.btnText;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0e1a2b] pt-28 md:pt-32">
      <AnimatePresence mode="wait">
        <motion.div key={current} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2b] via-[#0e1a2b]/70 to-[#0e1a2b]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b]/90 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-10 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={current}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <Compass size={16} className="text-[#e7a892]" strokeWidth={2} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e7a892]">
                  {slide.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="display-hero text-white mb-5"
              >
                {slide.title}
                {titleAccent && (
                  <span className="block italic text-[#e7a892]">{titleAccent}</span>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[15px] md:text-lg text-white/85 mb-8 leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <Link href={slide.href || '/tours'}>
                  <button
                    type="button"
                    className="bg-[#fbf9f6] text-[#0e1a2b] pl-6 pr-5 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[#c7654d] hover:text-white transition-colors shadow-xl"
                  >
                    {btnText}
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </button>
                </Link>
                <Link href="/tours">
                  <button
                    type="button"
                    className="text-white pl-2 pr-3 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:text-[#e7a892] transition-colors"
                  >
                    <Map size={16} strokeWidth={2} />
                    Browse all tours
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <SearchWidget />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 z-20 flex items-center gap-4">
        <span className="font-serif italic text-white/60 text-sm">
          {String(current + 1).padStart(2, '0')}
          <span className="mx-1.5">/</span>
          {String(slides.length).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                current === index ? "w-12 bg-[#e7a892]" : "w-6 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
