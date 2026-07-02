"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plane, Phone } from 'lucide-react';

const UmrahHero = () => {
  const [index, setIndex] = useState(0);
  const images = ["/images/umrah.jpg", "/images/umrah-hero.jpg"];

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#0e1a2b] pt-28">
      <AnimatePresence mode="wait">
        <motion.div key={index} className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 8 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1a2b]/70 via-[#0e1a2b]/50 to-[#0e1a2b]/80"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-6"
        >
          <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3"></span>
          Umrah · 2026
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="display-hero max-w-4xl"
        >
          A pilgrimage,<br />
          <span className="italic text-[#e7a892]">unhurried.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-xl text-white/85 max-w-xl leading-relaxed mt-8"
        >
          Hotels close to Haram, direct Saudia flights, ziyara transport and a dedicated mu'allim. Four tiers, transparent pricing, no upsells.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center gap-3 mt-10 text-[12px] font-semibold"
        >
          <a href="tel:+923111240111">
            <button
              type="button"
              className="bg-[#fbf9f6] text-[#0e1a2b] pl-5 pr-4 py-3 rounded-full hover:bg-[#c7654d] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <Phone size={14} strokeWidth={2} /> Speak to an Umrah consultant
            </button>
          </a>
          <span className="bg-white/10 backdrop-blur border border-white/15 px-3.5 py-2 rounded-full flex items-center gap-2">
            <Plane size={13} strokeWidth={2} className="text-[#e7a892]" /> Direct flights
          </span>
          <span className="bg-white/10 backdrop-blur border border-white/15 px-3.5 py-2 rounded-full flex items-center gap-2">
            <Star size={13} strokeWidth={2} className="text-[#e7a892]" fill="currentColor" /> 5-star Haram hotels
          </span>
        </motion.div>
      </div>
    </section>
  );
};
export default UmrahHero;
