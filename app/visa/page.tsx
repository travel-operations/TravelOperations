"use client";
import React from 'react';
import VisaHero from '@/components/VisaHero';
import VisaCountryCards from '@/components/VisaCountryCards';
import CountryGrid from '@/components/CountryGrid';
import VisaProcess from '@/components/VisaProcess';
import Link from 'next/link';
import { ArrowUpRight, Phone, MessagesSquare } from 'lucide-react';

const editorialCards = [
  { t: "Pakistan tourist visa", d: "Your starting reference is NADRA — the National Database & Registration Authority. We'll walk you through every step." },
  { t: "Northern destinations", d: "Hunza, Skardu, Naltar — exploring the highlands of Pakistan during the warm season window." },
  { t: "Hidden gems", d: "Pakistan — a country with deep heritage and threads from many faiths woven through its fabric." },
];

export default function VisaPage() {
  return (
    <main className="min-h-screen bg-[#fbf9f6]">
      <VisaHero />
      <VisaCountryCards />
      <CountryGrid />
      <VisaProcess />

      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-4">
                <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
                Field guides
              </p>
              <h2 className="font-serif text-[40px] md:text-6xl text-[#0e1a2b] leading-[0.95]">
                Read before<br />
                <span className="italic text-[#F3592D]">you travel.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorialCards.map((card, i) => (
              <div key={i} className="bg-[#0e1a2b] text-white p-8 md:p-10 rounded-2xl hover:bg-[#F3592D] transition-colors duration-500 group flex flex-col">
                <span className="editorial-num text-[#e7a892] group-hover:text-white text-5xl mb-6 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">{card.t}</h3>
                <p className="text-white/75 group-hover:text-white text-[14px] leading-relaxed mb-8">{card.d}</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-[12px] font-semibold border-b border-[#e7a892] group-hover:border-white pb-1 self-start hover:gap-3 transition-all"
                >
                  Read article
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#0e1a2b] text-white relative overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#F3592D]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-6">
              <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3"></span>
              Start the conversation
            </p>
            <h2 className="font-serif text-[44px] md:text-7xl leading-[0.92] tracking-tight mb-8">
              Begin your<br />
              <span className="italic text-[#e7a892]">journey, today.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/book-now">
                <button
                  type="button"
                  className="bg-[#fbf9f6] text-[#0e1a2b] pl-6 pr-5 py-4 rounded-full font-semibold text-sm hover:bg-[#F3592D] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <MessagesSquare size={15} strokeWidth={2} /> Contact our experts
                </button>
              </Link>
              <a href="tel:+923111240111">
                <button
                  type="button"
                  className="border border-white/30 text-white px-5 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-[#0e1a2b] transition-colors inline-flex items-center gap-2"
                >
                  <Phone size={15} strokeWidth={2} /> +92 311 1240111
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
