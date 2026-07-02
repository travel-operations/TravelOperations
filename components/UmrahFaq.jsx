"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "How early should I book my Umrah package?",
    a: "We recommend booking 2–3 weeks in advance to lock in the best hotel rates and direct flights — especially around Ramadan, Rajab and school holidays.",
  },
  {
    q: "How do I choose the right Umrah package?",
    a: "It comes down to three things: budget, hotel distance from Haram, and length of stay. Our Economy, Standard, Premium and Royal tiers cover everything from 800m walking distance to Haram-facing rooms.",
  },
  {
    q: "What should I budget beyond the package price?",
    a: "Plan for meals (if not included), ziyara tips, personal shopping in Makkah and Madinah, and roughly PKR 15,000–25,000 in pocket money per person.",
  },
  {
    q: "What's included in a Travel Operations Umrah package?",
    a: "Umrah e-visa, return airfare, hotel with breakfast, ziyara transport, airport pickups and a dedicated WhatsApp support line for the whole trip.",
  },
  {
    q: "Is the package refundable if my visa is rejected?",
    a: "If your Umrah visa is rejected for documented reasons, we refund 100% of the visa fee and any unutilised hotel and transport costs after deducting our service charge.",
  },
];

const UmrahFaq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 md:py-32 bg-[#f1ece4]">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Frequently asked
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0e1a2b] leading-[0.95]">
              Things worth<br />
              <span className="italic text-[#c7654d]">knowing.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-2">
            <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed">
              The questions our team answers most often. If yours isn't here, our WhatsApp line is open till midnight.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${open === i ? 'bg-white border-[#c7654d]/40' : 'bg-white border-[#e5dfd4]'}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 hover:bg-[#fbf9f6] transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span className="editorial-num text-[#c7654d] text-2xl md:text-3xl shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-[#0e1a2b] text-lg md:text-xl">{faq.q}</span>
                </span>
                <span className={`shrink-0 p-2 rounded-full transition-colors ${open === i ? 'bg-[#c7654d] text-white' : 'bg-[#f1ece4] text-[#0e1a2b]'}`}>
                  {open === i ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-6 pl-16 md:pl-20 text-[#143656]/80 leading-relaxed text-[15px]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UmrahFaq;
