"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { destinationsData } from '@/data/destinations';

export default function DestinationDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const dest = destinationsData.find(d => d.slug === resolvedParams.slug);
  const popular = destinationsData.filter(d => d.slug !== resolvedParams.slug).slice(0, 4);

  if (!dest) return <div className="pt-40 text-center text-2xl font-black">Destination Not Found</div>;

  return (
    <main className="bg-white min-h-screen">
      <section className="relative h-[50vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }}>
          <div className="absolute inset-0 bg-[#003366]/40"></div>
        </div>
        <h1 className="relative z-10 text-5xl md:text-8xl font-black text-white uppercase tracking-tighter text-center px-6">
          {dest.name}
        </h1>
      </section>

      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          
          <div className="lg:w-1/2 relative pb-10 pr-10">
            <div className="relative z-20 rounded-[3rem] overflow-hidden border-[12px] md:border-[18px] border-white shadow-2xl">
              <img src={dest.image} className="w-full h-[400px] md:h-[500px] object-cover" alt={dest.name} />
            </div>
            
            <div className="absolute top-0 left-0 z-30 bg-[#F3592D] p-4 rounded-br-3xl shadow-xl">
               <Globe className="text-white" size={32} />
            </div>

            <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 z-30 w-48 h-48 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-[10px] md:border-[15px] border-white shadow-2xl">
               <img src="/images/tour2.jpg" className="w-full h-full object-cover" alt="overlap" />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black text-[#003366] mb-8 uppercase tracking-tighter">
              {dest.name}
            </h2>
            <div className="w-20 h-2 bg-[#F3592D] mb-10 rounded-full"></div>
            <div className="space-y-6 text-gray-600 text-lg md:text-xl font-medium leading-relaxed whitespace-pre-line">
              {dest.description}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-24">
          <div className="text-center mb-16">
            <span className="bg-gray-100 px-6 py-2 rounded-lg font-bold text-[#003366] text-sm uppercase">Popular Activities</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#003366] mt-6 uppercase tracking-tighter">Explore Destinations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popular.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white"
              >
                <Link href={`/destination/${item.slug}`}>
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-[#F3592D] font-black text-xs uppercase tracking-widest mb-2">Travel to</p>
                    <h3 className="text-3xl font-black uppercase mb-4 leading-tight">{item.name}</h3>
                    <div className="bg-white text-[#003366] w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[#F3592D] group-hover:text-white transition-all shadow-lg float-right">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#003366] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
           <div className="text-center md:text-left">
              <p className="text-[#F3592D] text-sm font-black uppercase tracking-[0.3em] mb-3">Your Next Adventure</p>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight max-w-2xl tracking-tighter">Ready to adventure and enjoy natural beauty?</h2>
           </div>
           <Link href="/book-now" className="bg-[#F3592D] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-[#003366] transition-all shadow-2xl whitespace-nowrap active:scale-95">
             Explore More
           </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
      </section>
    </main>
  );
}