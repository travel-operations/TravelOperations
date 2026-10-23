"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock, FileCheck2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticVisas = [
  { id: 1, country: "United Kingdom", type: "Visit Visa",       processing: "15–20 working days", success: "94%", image: "/images/travel1.jpg", code: "UK", order_index: 1 },
  { id: 2, country: "United States",  type: "B1 / B2 Visa",     processing: "30–45 working days", success: "88%", image: "/images/travel2.jpg", code: "US", order_index: 2 },
  { id: 3, country: "Dubai (UAE)",    type: "30-Day E-Visa",     processing: "3–5 working days",   success: "99%", image: "/images/umrah.jpg",   code: "AE", order_index: 3 },
  { id: 4, country: "Canada",         type: "Visitor Visa",      processing: "20–30 working days", success: "91%", image: "/images/tour1.jpg",   code: "CA", order_index: 4 },
  { id: 5, country: "Schengen",       type: "Multi-Country",     processing: "12–18 working days", success: "92%", image: "/images/tour2.jpg",   code: "EU", order_index: 5 },
  { id: 6, country: "Turkey",         type: "Sticker Visa",      processing: "10–15 working days", success: "95%", image: "/images/tour3.jpg",   code: "TR", order_index: 6 },
];

const VisaConsultancy = () => {
  const [visaData, setVisaData] = useState(staticVisas);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchVisas = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('home_visa_cards')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setVisaData(data);
      });
  }, []);

  useEffect(() => { fetchVisas(); }, [fetchVisas]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3 >= visaData.length ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, visaData.length]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 3 >= visaData.length ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? Math.max(0, visaData.length - 3) : prev - 1));

  const visibleVisas = visaData.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-24 md:py-32 bg-[#f1ece4] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
              <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
              Visa consultancy
            </p>
            <h2 className="font-serif text-[44px] md:text-6xl leading-[0.95] text-[#0e1a2b] tracking-tight">
              Embassy-grade paperwork,<br />
              <span className="italic text-[#EF5B2D]">drafted by people who've done it 15,000 times.</span>
            </h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={handlePrev} aria-label="Previous"
              className="p-3 rounded-full bg-white border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors">
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button type="button" onClick={handleNext} aria-label="Next"
              className="p-3 rounded-full bg-white border border-[#e5dfd4] text-[#0e1a2b] hover:bg-[#0e1a2b] hover:text-white hover:border-[#0e1a2b] transition-colors">
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleVisas.map((visa, ci) => (
              <motion.article
                key={visa.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={visa.image} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" alt={visa.country} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b] via-[#0e1a2b]/50 to-transparent"></div>

                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="bg-white text-[#0e1a2b] text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
                    {visa.code}
                  </span>
                  <span className="text-white text-[10px] font-semibold tracking-wide bg-[#0e1a2b]/45 backdrop-blur px-2.5 py-1 rounded-sm">
                    {visa.success} success
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EF5B2D] mb-2">{visa.type}</p>
                  <h3 className="font-serif text-3xl md:text-4xl leading-[0.95] mb-3">{visa.country}</h3>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-white/85 mb-5">
                    <Clock size={13} className="text-[#EF5B2D]" strokeWidth={2} /> {visa.processing}
                  </div>
                  <Link href="/visa">
                    <button type="button"
                      className="inline-flex items-center gap-2 bg-white text-[#0e1a2b] pl-4 pr-3 py-2 rounded-full text-xs font-semibold hover:bg-[#EF5B2D] hover:text-white transition-colors">
                      Check eligibility <ArrowUpRight size={14} strokeWidth={2.5} />
                    </button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#e5dfd4] rounded-2xl px-6 py-5">
          <div>
            <p className="font-serif text-2xl text-[#0e1a2b] leading-tight">Not sure which visa fits your travel plan?</p>
            <p className="text-[#143656]/70 text-sm mt-1">A 10-minute call with our consultants will sort it.</p>
          </div>
          <Link href="/visa">
            <button type="button"
              className="bg-[#0e1a2b] text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#EF5B2D] transition-colors inline-flex items-center gap-2 shrink-0">
              <FileCheck2 size={16} strokeWidth={2} /> Book free consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisaConsultancy;
