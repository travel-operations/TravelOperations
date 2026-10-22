"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarCheck } from 'lucide-react';
import DestinationHero from '@/components/DestinationHero';
import { destinationsData } from '@/data/destinations';

export default function DestinationPage() {
  return (
    <main className="bg-[#fbf9f6] min-h-screen">
      <DestinationHero />

      <section className="py-24 md:py-32 container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-4">
              <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
              Destination index
            </p>
            <h2 className="font-serif text-[44px] md:text-7xl text-[#0e1a2b] leading-[0.95] tracking-tight">
              Explore<br />
              <span className="italic text-[#F3592D]">destinations.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-3">
            <p className="text-[#143656]/80 text-base leading-relaxed">
              Field-tested trips across the UK, Canada, Singapore, the US, Turkey, Dubai, Thailand, Italy and Sri Lanka — picked, refined and routed by our team.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinationsData.map((dest, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden group relative h-[520px] border border-[#e5dfd4] bg-white"
            >
              <Link href={`/destination/${dest.slug}`} className="h-full w-full block">
                <img
                  src={dest.image}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  alt={dest.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a2b] via-[#0e1a2b]/40 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e7a892] mb-3">Travel to</p>
                  <h3 className="font-serif text-4xl leading-tight mb-5">
                    {dest.name}
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-white/80 text-[12px] font-semibold group-hover:text-[#e7a892] transition-colors inline-flex items-center gap-1.5">
                      View details
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0e1a2b] text-white relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#F3592D]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 items-end relative">
          <div className="md:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-4">
              <span className="inline-block w-8 h-px bg-[#e7a892] align-middle mr-3"></span>
              Ready when you are
            </p>
            <h2 className="font-serif text-[44px] md:text-7xl leading-[0.92] tracking-tight">
              Plan your next<br />
              <span className="italic text-[#e7a892]">grand adventure.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link href="/book-now">
              <button
                type="button"
                className="bg-[#fbf9f6] text-[#0e1a2b] pl-6 pr-5 py-4 rounded-full font-semibold text-sm hover:bg-[#F3592D] hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <CalendarCheck size={16} strokeWidth={2} />
                Book now
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
