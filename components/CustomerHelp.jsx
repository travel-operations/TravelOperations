"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, BadgeCheck, CreditCard, Star } from 'lucide-react';

const helpPoints = [
  "Personalised trip planning",
  "Expert destination advice",
  "Hassle-free online booking",
  "Budget & luxury options",
  "24/7 on-trip customer support",
  "Local guides & insider tips",
  "Member-only fare deals",
  "Visa & documentation help",
  "English & Urdu language desk",
  "Group & corporate travel",
  "Curated, memorable experiences",
  "Honeymoon & family specialists",
];

const stats = [
  { v: "50,000", suffix: "+", l: "travellers" },
  { v: "20,000", suffix: "+", l: "bookings" },
  { v: "100", suffix: "+", l: "destinations" },
  { v: "98", suffix: "%", l: "satisfaction" },
];

const trust = [
  { icon: BadgeCheck, label: "PSA Approved" },
  { icon: ShieldCheck, label: "PSA Verified" },
  { icon: CreditCard, label: "Secure Payments" },
  { icon: Star, label: "4.9 on Google" },
];

const CustomerHelp = () => {
  return (
    <section className="py-24 md:py-32 bg-paper">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-16">
          <div className="md:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
              <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
              How we help
            </p>
            <h2 className="font-serif text-[44px] md:text-6xl leading-[0.95] text-[#0e1a2b] tracking-tight">
              From the first idea<br />
              <span className="italic text-[#EF5B2D]">to the last boarding pass.</span>
            </h2>
            <p className="text-[#143656]/75 text-base md:text-lg leading-relaxed mt-6 max-w-md">
              Travel Operations is a full-service desk. We engineer trips that feel effortless, and stay on call the entire way.
            </p>
          </div>

          <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {helpPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 py-3 border-b border-[#e5dfd4]"
              >
                <span className="bg-[#0e1a2b] text-white rounded-full p-1">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="text-[15px] text-[#0e1a2b]">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0e1a2b] rounded-3xl p-10 md:p-16 mb-12 relative overflow-hidden grain">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#EF5B2D]/30 rounded-full blur-3xl"></div>
          <p className="relative text-[#EF5B2D] text-[11px] font-bold uppercase tracking-[0.4em] mb-6">
            By the numbers
          </p>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-white"
              >
                <div className="font-serif text-5xl md:text-7xl leading-none text-[#fbf9f6]">
                  {s.v}<span className="text-[#EF5B2D]">{s.suffix}</span>
                </div>
                <div className="text-[12px] uppercase tracking-[0.25em] text-white/60 mt-3">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 bg-white border border-[#e5dfd4] rounded-full px-4 py-3">
              <Icon size={16} className="text-[#EF5B2D]" strokeWidth={2} />
              <span className="text-[12px] font-semibold text-[#0e1a2b]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerHelp;
