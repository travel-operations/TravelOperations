"use client";
import React from 'react';
import UmrahHero from '@/components/UmrahHero';
import UmrahPackages from '@/components/UmrahPackages';
import UmrahFaq from '@/components/UmrahFaq';
import { CheckCircle2, MapPin, Bookmark } from 'lucide-react';

const rituals = [
  { t: "Ihram", d: "Enter a state of consecration by wearing the special garments." },
  { t: "Tawaf", d: "Circumambulate the Kaaba seven times, counterclockwise." },
  { t: "Sa'i", d: "Walk seven times between the hills of Safa and Marwah." },
  { t: "Tahallul", d: "Men shave or trim hair; women cut a small portion of hair." },
  { t: "Tawaf al-Wada'", d: "Conduct the Farewell Tawaf before leaving Makkah." },
];

export default function UmrahPage() {
  return (
    <main className="bg-[#fbf9f6] min-h-screen">
      <UmrahHero />

      <section className="py-20 md:py-28 bg-paper">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
            <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
            On the pilgrimage
          </p>
          <h2 className="font-serif text-[44px] md:text-6xl text-[#0e1a2b] leading-[0.95] tracking-tight mb-6">
            Cheap, considered,<br />
            <span className="italic text-[#EF5B2D]">never careless.</span>
          </h2>
          <p className="text-[#143656]/80 text-lg leading-relaxed max-w-3xl">
            A well-chosen package doesn't just save money — it ensures a stress-free pilgrimage. We've engineered our tiers around hotel distance from Haram, group size and seasonal demand, so the price you see is the trip you take.
          </p>
        </div>
      </section>

      <UmrahPackages />

      <section className="py-24 md:py-32 bg-[#0e1a2b] text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#EF5B2D]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
                <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
                Essential rituals
              </p>
              <h2 className="font-serif text-[40px] md:text-6xl text-[#fbf9f6] leading-[0.95]">
                What every pilgrim<br />
                <span className="italic text-[#EF5B2D]">should know.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-3">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                A short guide to the rituals you'll perform — your mu'allim will walk you through each in detail, in person, on the ground.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rituals.map((r, i) => (
              <div key={i} className="bg-white/5 p-7 rounded-2xl border border-white/10 hover:bg-[#EF5B2D] hover:border-[#EF5B2D] transition-colors duration-300 group">
                <span className="editorial-num text-[#EF5B2D] group-hover:text-white text-4xl mb-4 block transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl mb-2 group-hover:text-white transition-colors">{r.t}</h3>
                <p className="text-white/65 group-hover:text-white text-[14px] leading-relaxed transition-colors">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
                <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
                Choosing well
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0e1a2b] leading-[0.95] mb-6">
                The right package<br />
                <span className="italic text-[#EF5B2D]">for the right trip.</span>
              </h2>
              <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed mb-8">
                Our guide walks you through the four tiers and helps you match a package to your needs — budget-led, comfort-led, family group, or first-time pilgrim.
              </p>
              <div className="space-y-3">
                {["Royal 5-star Haram-view", "Premium 21-day journey", "Standard 21-day · 4-star", "Economy 15-day · value"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#0e1a2b] py-2.5 border-b border-[#e5dfd4]">
                    <CheckCircle2 size={16} className="text-[#EF5B2D]" strokeWidth={2} />
                    <span className="font-medium text-[15px]">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#e5dfd4] relative">
              <span className="absolute -top-4 left-8 bg-[#EF5B2D] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-1.5">
                <Bookmark size={11} strokeWidth={2.5} fill="currentColor" /> Tips
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#0e1a2b] mb-6 leading-tight">
                Essential pointers
              </h3>
              <ul className="space-y-5 text-[15px] text-[#143656]/85 leading-relaxed">
                <li><strong className="font-serif text-[#0e1a2b] text-lg block mb-1">Accommodation</strong> Choose hotels close to Haram if you're traveling with elderly companions.</li>
                <li><strong className="font-serif text-[#0e1a2b] text-lg block mb-1">Transportation</strong> Look for packages with air-conditioned private buses for ziyarat.</li>
                <li><strong className="font-serif text-[#0e1a2b] text-lg block mb-1">Meals</strong> Hotel buffet stays are most convenient on long worship days.</li>
                <li><strong className="font-serif text-[#0e1a2b] text-lg block mb-1">Guidance</strong> First-timers should pick a group that includes a scholar or mu'allim.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#f1ece4]">
        <div className="container mx-auto px-6 md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
            <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
            Holy sites
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#0e1a2b] leading-[0.95] mb-14">
            Places we'll<br />
            <span className="italic text-[#EF5B2D]">take you.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#fbf9f6] p-10 rounded-2xl border border-[#e5dfd4]">
              <h3 className="font-serif text-3xl text-[#0e1a2b] mb-8 flex items-center gap-3">
                <MapPin size={22} className="text-[#EF5B2D]" strokeWidth={2} /> Makkah
              </h3>
              <ul className="space-y-3 text-[#0e1a2b]/85 text-[15px] font-medium">
                <li>· Masjid Al Haram & Kaaba</li>
                <li>· Mina Tents City</li>
                <li>· Muzdalifah Open Sky</li>
                <li>· Cave Hira (Jabal Al Noor)</li>
                <li>· Well of Tuwa & Masjid e Aisha</li>
              </ul>
            </div>
            <div className="bg-[#fbf9f6] p-10 rounded-2xl border border-[#e5dfd4]">
              <h3 className="font-serif text-3xl text-[#0e1a2b] mb-8 flex items-center gap-3">
                <MapPin size={22} className="text-[#EF5B2D]" strokeWidth={2} /> Madinah
              </h3>
              <ul className="space-y-3 text-[#0e1a2b]/85 text-[15px] font-medium">
                <li>· Al Masjid al Nabawi (Green Dome)</li>
                <li>· Quba Mosque & Masjid Al Qiblatain</li>
                <li>· Jannat ul Baqi & Mount Uhud</li>
                <li>· Al Madinah Museum</li>
                <li>· Garden of Hazrat Salman Farsi (RA)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <UmrahFaq />
    </main>
  );
}
