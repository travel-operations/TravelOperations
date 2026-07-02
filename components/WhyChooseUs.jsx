"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Tag, Headphones, CalendarCheck, ShieldCheck, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { icon: Award, title: "PSA certified", sub: "Trusted agency" },
    { icon: Tag, title: "Best fares", sub: "Lowest-price guarantee" },
    { icon: Headphones, title: "24/7 support", sub: "Always on call" },
    { icon: CalendarCheck, title: "Fast booking", sub: "Confirmed in minutes" },
    { icon: ShieldCheck, title: "Safe & secure", sub: "100% protected" },
    { icon: Users, title: "Expert team", sub: "10+ years in travel" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#fbf9f6]">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0e1a2b] text-white p-10 md:p-16 rounded-3xl mb-20 relative overflow-hidden grain"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c7654d]/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#e7a892] mb-6">
              Our promise
            </p>
            <p className="font-serif text-2xl md:text-4xl leading-[1.15] text-[#fbf9f6]">
              "A full-service travel desk with one job: to deliver outstanding service at market-competitive rates. The freedom we give our customers is what makes this work feel <span className="italic text-[#e7a892]">meaningful</span>."
            </p>
            <p className="text-[12px] mt-8 uppercase tracking-[0.3em] text-white/50">
              Travel Operations · Founded 2015
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-12">
          <div className="md:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7654d] mb-4">
              <span className="inline-block w-8 h-px bg-[#c7654d] align-middle mr-3"></span>
              Why choose us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0e1a2b] leading-[0.95]">
              Six reasons<br />
              <span className="italic text-[#c7654d]">people stay.</span>
            </h2>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white hover:bg-[#0e1a2b] border border-[#e5dfd4] rounded-2xl p-5 flex flex-col group cursor-default transition-colors"
              >
                <item.icon size={20} className="text-[#c7654d] group-hover:text-[#e7a892] mb-4 transition-colors" strokeWidth={1.75} />
                <h4 className="font-serif text-xl text-[#0e1a2b] group-hover:text-white leading-tight mb-1 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[12px] text-[#143656]/60 group-hover:text-white/60 transition-colors">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#143656]/75 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto border-t border-[#e5dfd4] pt-10"
        >
          From the fastest visa processing to the lowest airfares, luxury stays and ground transport — every trip is engineered with the same care that built our <span className="text-[#0e1a2b] font-semibold">85% repeat-customer rate</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
