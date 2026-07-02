"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const toursSlides = [
  { id: 1, image: "/images/tour1.jpg", eyebrow: "Tour catalogue · 2026", title: "Global adventures,", accent: "carefully composed." },
  { id: 2, image: "/images/tour2.jpg", eyebrow: "Hand-crafted itineraries", title: "Unforgettable", accent: "trips, only." },
  { id: 3, image: "/images/tour3.jpg", eyebrow: "Pakistan to the world", title: "Discover", accent: "new horizons." },
];

const ToursHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === toursSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-[#0e1a2b] pt-28">
      <AnimatePresence mode="wait">
        <motion.div key={current} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${toursSlides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b] via-[#0e1a2b]/55 to-[#0e1a2b]/20"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-6"
            >
              <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3"></span>
              {toursSlides[current].eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="display-hero text-white"
            >
              {toursSlides[current].title}
              <span className="block italic text-[#e7a892]">{toursSlides[current].accent}</span>
            </motion.h1>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#fbf9f6] rounded-2xl shadow-[0_30px_60px_-20px_rgba(14,26,43,0.45)] mt-12 w-full max-w-4xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <label className="flex items-center gap-3 bg-white border border-[#e5dfd4] rounded-xl px-3 py-2.5 cursor-pointer">
            <MapPin size={16} className="text-[#c7654d]" strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#143656]/60">Destination</div>
              <input className="w-full bg-transparent text-sm font-semibold text-[#0e1a2b] outline-none placeholder:text-[#143656]/40" placeholder="All Countries …" />
            </div>
          </label>
          <label className="flex items-center gap-3 bg-white border border-[#e5dfd4] rounded-xl px-3 py-2.5 cursor-pointer">
            <Calendar size={16} className="text-[#c7654d]" strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#143656]/60">Departure</div>
              <input type="date" className="w-full bg-transparent text-sm font-semibold text-[#0e1a2b] outline-none" />
            </div>
          </label>
          <label className="flex items-center gap-3 bg-white border border-[#e5dfd4] rounded-xl px-3 py-2.5 cursor-pointer">
            <Users size={16} className="text-[#c7654d]" strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#143656]/60">Travellers</div>
              <input className="w-full bg-transparent text-sm font-semibold text-[#0e1a2b] outline-none placeholder:text-[#143656]/40" placeholder="adults" />
            </div>
          </label>
          <button
            type="button"
            className="bg-[#0e1a2b] hover:bg-[#c7654d] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={15} strokeWidth={2.5} /> Find tours
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 z-20 flex items-center gap-4">
        <span className="font-serif italic text-white/60 text-sm">
          {String(current + 1).padStart(2, '0')}<span className="mx-1.5">/</span>{String(toursSlides.length).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {toursSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Slide ${index + 1}`}
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

export default ToursHero;
