"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Clock, Phone, FileCheck2 } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { v: '70+', l: 'countries' },
  { v: '92%', l: 'success rate' },
  { v: '15k', l: 'visas filed' },
  { v: '24/7', l: 'helpline' },
];

const VisaHero = () => {
  return (
    <section className="pt-32 pb-20 md:pb-28 bg-paper overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-5">
            <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
            Visa consultancy · Pakistan
          </p>
          <h1 className="display-xl text-[#0e1a2b] mb-6">
            Your journey to <br />
            Muslim countries,<br />
            <span className="italic text-[#c7654d]">starts with the right visa.</span>
          </h1>
          <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed mb-9 max-w-2xl">
            We provide professional visa assistance for travelers from Pakistan visiting Muslim countries across Asia, the Middle East and beyond. Get support with eligibility, documentation, application preparation and appointment guidance.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link href="/book-now">
              <button
                type="button"
                className="bg-[#0e1a2b] text-white pl-5 pr-4 py-3.5 rounded-full font-semibold text-sm hover:bg-[#c7654d] transition-colors inline-flex items-center gap-2"
              >
                <FileCheck2 size={15} strokeWidth={2} /> Get free consultation
              </button>
            </Link>
            <a href="tel:+923111240111">
              <button
                type="button"
                className="border border-[#0e1a2b] text-[#0e1a2b] px-5 py-3.5 rounded-full font-semibold text-sm hover:bg-[#0e1a2b] hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <Phone size={14} strokeWidth={2} /> Call expert
              </button>
            </a>
          </div>

          <div className="grid grid-cols-4 gap-0 max-w-xl border-t border-[#e5dfd4]">
            {stats.map((s, i) => (
              <div key={s.l} className={`py-4 ${i > 0 ? 'border-l border-[#e5dfd4]' : ''} pl-4`}>
                <div className="font-serif text-2xl md:text-3xl text-[#0e1a2b] leading-none">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/55 mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 relative"
        >
          <img src="/images/International Travelers.jpg" alt="Visa Consultant" className="rounded-2xl shadow-2xl w-full object-cover h-[420px] md:h-[560px]" />

          <div className="hidden md:flex absolute -bottom-6 -left-6 bg-[#fbf9f6] rounded-2xl shadow-xl p-4 items-center gap-3 border border-[#e5dfd4]">
            <BadgeCheck size={24} className="text-[#c7654d]" strokeWidth={2} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/55">Embassy approved</div>
              <div className="font-serif text-lg text-[#0e1a2b]">Documentation</div>
            </div>
          </div>

          <div className="hidden md:flex absolute -top-6 -right-6 bg-[#fbf9f6] rounded-2xl shadow-xl p-4 items-center gap-3 border border-[#e5dfd4]">
            <Clock size={24} className="text-[#c7654d]" strokeWidth={2} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/55">Avg. processing</div>
              <div className="font-serif text-lg text-[#0e1a2b]">7–15 days</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisaHero;
