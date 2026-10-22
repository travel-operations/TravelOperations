
"use client";
import React, { use } from 'react'; 
import Link from 'next/link';
import { motion } from 'framer-motion'; 
import { allToursData } from '../data/toursData'; 
import { Phone, Utensils, Bus, Hotel, CheckCircle2, ShieldCheck, Clock, Star } from 'lucide-react';

export default function TourDetails({ params }: { params: Promise<{ id: string }> }) {
  

  const resolvedParams = use(params);
  const tourId = resolvedParams.id;

  const tour = allToursData.find((item) => item.id === tourId);

  if (!tour) {
    return (
      <div className="pt-40 text-center min-h-screen bg-white">
        <h2 className="text-3xl font-black text-[#003366]">TOUR NOT FOUND!</h2>
        <Link href="/tours" className="text-[#D4AF37] font-bold underline mt-4 inline-block italic">
          Back to Tours Page
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-24">
    
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        <img src={tour.image} className="w-full h-full object-cover" alt={tour.title} />
        <div className="absolute inset-0 bg-[#003366]/60 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl"
          >
            {tour.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#D4AF37] text-[#003366] px-10 py-3 rounded-full font-black text-2xl shadow-2xl"
          >
            PKR {tour.price}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
       
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] uppercase tracking-tighter">Tour Overview</h2>
            <div className="h-1.5 grow bg-[#D4AF37] rounded-full hidden md:block"></div>
          </div>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 font-medium">
            {tour.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
            <div className="bg-gray-50 p-8 rounded-3xl border-t-8 border-[#003366] shadow-lg">
              <h3 className="text-2xl font-black text-[#003366] mb-6 flex items-center gap-3 uppercase italic">
                <Hotel className="text-[#D4AF37]" size={28} /> Facilities
              </h3>
              <ul className="space-y-4">
                {tour.facilities?.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-base md:text-lg">
                    <CheckCircle2 className="text-green-500 shrink-0" size={22} /> {f}
                  </li>
                ))}
              </ul>
            </div>

         
            <div className="bg-gray-50 p-8 rounded-3xl border-t-8 border-[#D4AF37] shadow-lg">
              <h3 className="text-2xl font-black text-[#003366] mb-6 flex items-center gap-3 uppercase italic">
                <ShieldCheck className="text-[#003366]" size={28} /> Inclusions
              </h3>
              <ul className="space-y-4">
                {tour.includes?.map((inc, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-base md:text-lg">
                    <CheckCircle2 className="text-[#D4AF37] shrink-0" size={22} /> {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

       
        <div className="lg:col-span-1">
          <div className="bg-[#003366] text-white p-10 rounded-[3rem] sticky top-32 shadow-[0_20px_50px_rgba(0,51,102,0.3)] border-b-8 border-[#D4AF37]">
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Ready to Explore?</h3>
            <p className="text-gray-300 mb-10 leading-relaxed font-bold text-lg">
              Don't miss out on this amazing opportunity. Book this {tour.country} trip now!
            </p>
            
            <Link href="/book-now">
              <button className="w-full bg-[#D4AF37] text-[#003366] py-5 rounded-2xl font-black text-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl active:scale-95 uppercase tracking-tight">
                Confirm Booking
              </button>
            </Link>

            <div className="mt-10 pt-8 border-t border-white/20 space-y-5">
               <div className="flex items-center gap-4 text-lg font-bold"><Phone className="text-[#D4AF37]" size={24} /> 0300 7800017</div>
               <div className="flex items-center gap-4 text-lg font-bold"><Utensils className="text-[#D4AF37]" size={24} /> Full Board Meals</div>
               <div className="flex items-center gap-4 text-lg font-bold"><Bus className="text-[#D4AF37]" size={24} /> Luxury Transport</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}