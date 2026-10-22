"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, BadgeCheck, Plane, Star } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticCards = [
  { id: "uz", code: "UZ", name: "Uzbekistan", image: "/images/tour4.jpg", price: "13,000", type: "E-Visa", processing: "1–3 days", validity: "30 days", success: "99%", is_featured: true },
  { id: "my", code: "MY", name: "Malaysia", image: "/images/tour1.jpg", price: "15,000", type: "Tourist Visa", processing: "5–7 days", validity: "30 days", success: "98%", is_featured: false },
  { id: "sg", code: "SG", name: "Singapore", image: "/images/tour2.jpg", price: "22,000", type: "E-Visa", processing: "7–10 days", validity: "30 days", success: "95%", is_featured: false },
  { id: "th", code: "TH", name: "Thailand", image: "/images/tour3.jpg", price: "18,500", type: "Tourist Visa", processing: "5–7 days", validity: "60 days", success: "97%", is_featured: false },
  { id: "tr", code: "TR", name: "Turkey", image: "/images/tour4.jpg", price: "45,000", type: "Sticker Visa", processing: "10–15 days", validity: "90 days", success: "94%", is_featured: false },
  { id: "ae", code: "AE", name: "Dubai (UAE)", image: "/images/tour6.jpg", price: "35,000", type: "30-Day E-Visa", processing: "3–5 days", validity: "30 days", success: "99%", is_featured: false },
  { id: "az", code: "AZ", name: "Azerbaijan", image: "/images/tour1.jpg", price: "12,000", type: "E-Visa", processing: "3–5 days", validity: "30 days", success: "99%", is_featured: false },
  { id: "uk", code: "UK", name: "United Kingdom", image: "/images/tour2.jpg", price: "65,000", type: "Standard Visitor", processing: "15–20 days", validity: "6 months", success: "92%", is_featured: false },
];

const VisaCountryCards = () => {
  const [cards, setCards] = useState(staticCards);

  const fetchCards = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('visa_cards')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setCards(data);
      });
  }, []);

  useEffect(() => { fetchCards(); }, [fetchCards]);

  const featured = cards.filter((c) => c.is_featured);
  const regular = cards.filter((c) => !c.is_featured);

  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-4">
              <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
              Pick your next destination
            </p>
            <h2 className="font-serif text-[44px] md:text-7xl leading-[0.95] text-[#0e1a2b] tracking-tight">
              Transparent pricing,<br />
              <span className="italic text-[#F3592D]">live success rates.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-2">
            <p className="text-[#143656]/80 text-base leading-relaxed">
              Pick a country to see the full requirements, current processing time and what we charge — all on one page.
            </p>
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-6">
              <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
              Featured destination
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featured.map((country, index) => (
                <motion.article
                  key={country.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-[#0e1a2b] rounded-2xl overflow-hidden border-2 border-[#F3592D] shadow-[0_20px_60px_-20px_rgba(243,89,45,0.5)] group flex flex-col h-full col-span-1 md:col-span-2 lg:col-span-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b]/80 to-transparent"></div>

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-[#F3592D] text-white text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
                        ★ Featured
                      </span>
                      <span className="bg-[#fbf9f6] text-[#0e1a2b] text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
                        {country.code}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#0e1a2b]/55 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm">
                        <BadgeCheck size={10} strokeWidth={2.5} /> {country.success}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7a892] mb-1">{country.type}</p>
                      <h3 className="font-serif text-3xl leading-tight">{country.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <div className="flex items-center gap-1.5 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} className="text-[#e7a892]" fill="currentColor" />
                      ))}
                      <span className="text-[#e7a892] text-xs font-semibold ml-1">Top Pick 2026</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 text-[12px] text-[#fbf9f6]/70">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#e7a892]" strokeWidth={2} /> {country.processing}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Plane size={13} className="text-[#e7a892]" strokeWidth={2} /> {country.validity}
                      </div>
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-4">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-[#fbf9f6]/50 font-semibold">From</div>
                          <div className="font-serif text-2xl text-[#e7a892] leading-none mt-1">
                            PKR {country.price}
                          </div>
                        </div>
                      </div>

                      <Link href="/book-now">
                        <button
                          type="button"
                          className="w-full bg-[#F3592D] text-white py-3 rounded-full font-semibold text-xs hover:bg-[#e7a892] hover:text-[#0e1a2b] transition-colors flex items-center justify-center gap-2"
                        >
                          Apply now <ArrowUpRight size={13} strokeWidth={2.5} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {regular.map((country, index) => (
            <motion.article
              key={country.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-[#fbf9f6] rounded-2xl overflow-hidden border border-[#e5dfd4] group flex flex-col h-full hover:border-[#F3592D]/40 transition-colors"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b]/70 to-transparent"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#fbf9f6] text-[#0e1a2b] text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
                    {country.code}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#0e1a2b]/55 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm">
                    <BadgeCheck size={10} strokeWidth={2.5} /> {country.success}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7a892] mb-1">{country.type}</p>
                  <h3 className="font-serif text-2xl leading-tight">{country.name}</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col grow">
                <div className="grid grid-cols-2 gap-3 mb-5 text-[12px] text-[#143656]/75">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-[#F3592D]" strokeWidth={2} /> {country.processing}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Plane size={13} className="text-[#F3592D]" strokeWidth={2} /> {country.validity}
                  </div>
                </div>

                <div className="mt-auto border-t border-[#e5dfd4] pt-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#143656]/55 font-semibold">From</div>
                      <div className="font-serif text-2xl text-[#0e1a2b] leading-none mt-1">
                        PKR {country.price}
                      </div>
                    </div>
                  </div>

                  <Link href="/book-now">
                    <button
                      type="button"
                      className="w-full bg-[#0e1a2b] text-white py-3 rounded-full font-semibold text-xs hover:bg-[#F3592D] transition-colors flex items-center justify-center gap-2"
                    >
                      Apply now <ArrowUpRight size={13} strokeWidth={2.5} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaCountryCards;
