import React from 'react';
import ToursHero from '@/components/ToursHero';
import ToursListing from '@/components/ToursListing';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function ToursPage() {
  return (
    <main className="bg-[#fbf9f6] min-h-screen">
      <ToursHero />

      <section className="py-20 md:py-28 bg-paper">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F3592D] mb-4">
            <span className="inline-block w-8 h-px bg-[#F3592D] align-middle mr-3"></span>
            International tours · 2026
          </p>
          <h2 className="font-serif text-[44px] md:text-7xl text-[#0e1a2b] leading-[0.95] tracking-tight mb-6">
            Top tour packages,<br />
            <span className="italic text-[#F3592D]">straight from Pakistan.</span>
          </h2>
          <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed max-w-3xl">
            From street food in Bangkok to balloon mornings in Cappadocia, tea trails in Sri Lanka and desert nights in Dubai — every route in our catalogue is one we've travelled ourselves, refined with feedback from thousands of guests.
          </p>
        </div>
      </section>

      <ToursListing />
      <WhyChooseUs />
    </main>
  );
}
