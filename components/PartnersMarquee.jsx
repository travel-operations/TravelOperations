"use client";
import React from 'react';
import { motion } from 'framer-motion';

// Featured carriers shown larger & first
const featured = [
  { src: "/images/uzbekistan-logo.png", name: "Uzbekistan Airways" },
];

const partners = [
  "/images/emirates.png",
  "/images/qatar.png",
  "/images/saudi.png",
  "/images/turkish.png",
  "/images/malaysia.png",
  "/images/centrumair.png",
  "/images/iraq-airline.png",
  "/images/air kazakhstan.png",
  "/images/kyrgyzstan.png",
  "/images/tajik.png",
];

const PartnersMarquee = () => {
  return (
    <section className="py-16 md:py-24 bg-[#fbf9f6] overflow-hidden border-t border-[#e5dfd4]">
      <div className="container mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-3">
              <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
              Trusted by
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#0e1a2b] leading-tight">
              Our airline <span className="italic text-[#F3592D]">partners.</span>
            </h2>
          </div>
          <p className="font-sans text-[#143656]/70 text-sm md:text-base max-w-sm md:text-right">
            Direct contracts with 30+ carriers — led by <span className="font-semibold text-[#0e1a2b]">Uzbekistan Airways</span> .
          </p>
        </div>
      </div>

      {/* Featured carriers - Updated to flex and justify-center */}
      <div className="container mx-auto px-6 md:px-10 mb-10">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-2xl mx-auto">
          {featured.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white rounded-2xl border border-[#e5dfd4] shadow-[0_12px_40px_-20px_rgba(14,26,43,0.4)] p-6 md:p-8 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform w-full max-w-xs md:max-w-sm"
            >
              <div className="h-20 md:h-28 flex items-center justify-center">
                <img src={f.src} alt={f.name} className="h-full w-auto max-w-full object-contain" />
              </div>
              <span className="text-[11px] md:text-sm font-semibold uppercase tracking-[0.2em] text-[#0e1a2b] text-center">
                {f.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continuous marquee */}
      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-32 z-10 bg-gradient-to-r from-[#fbf9f6] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-32 z-10 bg-gradient-to-l from-[#fbf9f6] to-transparent" />

        <div className="flex items-center space-x-12 md:space-x-20 animate-marquee py-5 whitespace-nowrap">
          {[...partners, ...partners].map((logo, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center h-16 md:h-20 w-32 md:w-44">
              <img
                src={logo}
                alt="Airline partner"
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnersMarquee;