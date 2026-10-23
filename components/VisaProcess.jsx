"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, FileText, ClipboardCheck, Send } from 'lucide-react';

const VisaProcess = () => {
  const steps = [
    { icon: MapPin, t: "Pick destination", d: "Tell us where you want to go. We share the full requirement list, success rate and timeline upfront — no surprises." },
    { icon: FileText, t: "Share documents", d: "Send passport, CNIC, photographs and bank statement. We review every document for embassy compliance before submission." },
    { icon: ClipboardCheck, t: "We handle the application", d: "We draft your form, write the cover letter, build the financial profile and book your embassy appointment." },
    { icon: Send, t: "Receive your visa", d: "Once approved, we ship your passport with the visa and a travel briefing pack — itinerary, currency tips, emergency contacts." },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#f1ece4]">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
              <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
              How it works
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0e1a2b] leading-[0.95]">
              Four steps,<br />
              <span className="italic text-[#EF5B2D]">about fifteen days.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed">
              Most clients are visa-ready in under 15 working days. Here's the exact route from "where do I start" to passport-in-hand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#fbf9f6] p-7 rounded-2xl border border-[#e5dfd4] hover:border-[#EF5B2D]/40 transition-colors flex flex-col text-left group relative h-full"
            >
              <span className="editorial-num text-[#EF5B2D] text-5xl md:text-6xl mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <s.icon size={24} className="text-[#0e1a2b] mb-4 mt-2" strokeWidth={1.75} />
              <h3 className="font-serif text-2xl text-[#0e1a2b] mb-3 leading-tight">{s.t}</h3>
              <p className="text-[#143656]/75 text-[14px] leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaProcess;
