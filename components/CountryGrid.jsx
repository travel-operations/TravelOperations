"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticCountries = [
  { code: "MY", name: "Malaysia", price: "15K" },
  { code: "SG", name: "Singapore", price: "22K" },
  { code: "AZ", name: "Azerbaijan", price: "12K" },
  { code: "KH", name: "Cambodia", price: "10K" },
  { code: "AE", name: "United Arab Emirates", price: "35K" },
  { code: "ID", name: "Indonesia", price: "14K" },
  { code: "EG", name: "Egypt", price: "20K" },
  { code: "LK", name: "Sri Lanka", price: "9K" },
  { code: "TH", name: "Thailand", price: "18K" },
  { code: "TR", name: "Turkey", price: "45K" },
  { code: "UZ", name: "Uzbekistan", price: "13K" },
  { code: "VN", name: "Vietnam", price: "17K" },
  { code: "SA", name: "Saudi Arabia", price: "25K" },
  { code: "EU", name: "Schengen Area", price: "55K" },
  { code: "UK", name: "United Kingdom", price: "65K" },
  { code: "CA", name: "Canada", price: "70K" },
];

const CountryGrid = () => {
  const [countries, setCountries] = useState(staticCountries);

  const fetchCountries = useCallback(() => {
    if (!supabase) return;
    supabase
      .from('visa_countries')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setCountries(data);
      });
  }, []);

  useEffect(() => { fetchCountries(); }, [fetchCountries]);

  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Worldwide coverage
            </p>
            <h2 className="font-serif text-[40px] md:text-6xl text-[#0e1a2b] leading-[0.95]">
              We offers these {countries.length} countries<br />
              <span className="italic text-[#c7654d]">for visas file.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-2">
            <p className="text-[#143656]/80 text-base leading-relaxed">
              Tap any destination to view requirements, documents and pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {countries.map((c, i) => (
            <motion.div
              key={c.id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link href="/book-now">
                <div className="bg-white p-5 rounded-2xl border border-[#e5dfd4] hover:border-[#c7654d] hover:bg-[#0e1a2b] transition-colors duration-300 group cursor-pointer h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0e1a2b] group-hover:text-[#e7a892] transition-colors">
                      {c.code}
                    </span>
                    <ArrowUpRight size={14} strokeWidth={2} className="text-[#143656]/30 group-hover:text-[#e7a892] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="font-serif text-xl text-[#0e1a2b] group-hover:text-white leading-tight mb-1 transition-colors">
                    {c.name}
                  </div>
                  <div className="text-[11px] font-medium text-[#143656]/60 group-hover:text-white/50 transition-colors">
                    From PKR {c.price}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryGrid;
