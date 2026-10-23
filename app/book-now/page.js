"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Check, Loader2, Plane, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { sendEmail, CONTACT_EMAIL } from '@/lib/email';

const EMPTY = {
  tourPackage: '',
  fullName: '',
  phone: '',
  email: '',
  cnic: '',
  departureCity: '',
  travelDate: '',
  numTravelers: '',
  additionalNotes: '',
};

export default function BookNow() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tourPackage) return;

    setStatus('sending');
    const res = await sendEmail(formData, {
      subject: `New Booking — ${formData.tourPackage}`,
    });

    if (res.ok) {
      setStatus('sent');
      setFormData(EMPTY);
      setTimeout(() => setStatus('idle'), 6000);
    } else if (res.fallback) {
      setStatus('sent');
    } else {
      setStatus('error');
    }
  };

  const inputCls =
    "w-full px-4 py-3.5 border border-[#e5dfd4] rounded-xl bg-white focus:border-[#EF5B2D] focus:ring-2 focus:ring-[#EF5B2D]/20 outline-none transition-all font-medium text-[#0e1a2b] placeholder:text-[#143656]/40";
  const labelCls =
    "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#143656]/70 mb-1.5 ml-0.5";

  return (
    <section className="pt-28 md:pt-36 pb-20 md:pb-28 bg-paper min-h-screen">
      <div className="container mx-auto px-5 md:px-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#EF5B2D] mb-4">
            <span className="inline-block w-8 h-px bg-[#EF5B2D] align-middle mr-3"></span>
            Reserve your trip
          </p>
          <h1 className="font-serif text-[44px] md:text-7xl text-[#0e1a2b] leading-[0.95] tracking-tight">
            Booking <span className="italic text-[#EF5B2D]">desk.</span>
          </h1>
          <p className="text-[#143656]/80 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">
            Fill in the details below and our team will confirm availability and pricing within hours. Every enquiry reaches us at <span className="font-semibold text-[#0e1a2b]">{CONTACT_EMAIL}</span>.
          </p>
        </motion.div>

        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#e5dfd4] rounded-3xl p-10 md:p-16 text-center shadow-[0_30px_80px_-40px_rgba(14,26,43,0.4)]"
          >
            <div className="w-16 h-16 rounded-full bg-[#EF5B2D] text-white flex items-center justify-center mx-auto mb-6">
              <Check size={30} strokeWidth={3} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#0e1a2b] mb-4">Request received.</h2>
            <p className="text-[#143656]/80 text-base md:text-lg max-w-md mx-auto mb-8">
              Thank you — our travel consultants will reach out shortly to confirm your booking and answer any questions.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-2 bg-[#0e1a2b] text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#EF5B2D] transition-colors"
            >
              Make another booking <ArrowUpRight size={15} strokeWidth={2.5} />
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white p-5 md:p-10 rounded-3xl shadow-[0_30px_80px_-40px_rgba(14,26,43,0.4)] border border-[#e5dfd4] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
          >
            <div className="md:col-span-2 bg-[#fbf9f6] p-5 md:p-6 rounded-2xl border border-[#e5dfd4]">
              <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EF5B2D] mb-2">
                <Plane size={14} strokeWidth={2} /> Select your package
              </label>
              <div className="relative">
                <select
                  name="tourPackage"
                  value={formData.tourPackage}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent font-serif text-xl md:text-3xl text-[#0e1a2b] outline-none cursor-pointer appearance-none pr-10"
                >
                  <option value="" disabled>Choose a package…</option>
                  <optgroup label="Featured">
                    <option value="Uzbekistan Cultural Tour">Uzbekistan Cultural Tour ★</option>
                  </optgroup>
                  <optgroup label="Umrah Packages">
                    <option value="15 Days Umrah Package">15 Days Umrah Package</option>
                    <option value="21 Days Umrah Package">21 Days Umrah Package</option>
                    <option value="Standard Umrah Package">Standard Umrah Package</option>
                    <option value="Premium Umrah Package">Premium Umrah Package</option>
                  </optgroup>
                  <optgroup label="International Tours">
                    <option value="Thailand Tour">Thailand Tour</option>
                    <option value="Malaysia Special">Malaysia Special</option>
                    <option value="Turkey Honeymoon">Turkey Honeymoon</option>
                    <option value="Dubai Desert Safari">Dubai Desert Safari</option>
                    <option value="Sri Lanka Nature Tour">Sri Lanka Nature Tour</option>
                  </optgroup>
                  <optgroup label="Other Services">
                    <option value="Flight Booking">Flight Booking</option>
                    <option value="Hotel Reservation">Hotel Reservation</option>
                    <option value="Visa Consultancy">Visa Consultancy</option>
                  </optgroup>
                </select>
                <ChevronDown size={24} strokeWidth={2.5} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#EF5B2D]" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>Full name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" className={inputCls} />
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>Email address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className={inputCls} />
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>Phone number *</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03xx xxxxxxx" className={inputCls} />
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>CNIC / Passport *</label>
              <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} required placeholder="Identity number" className={inputCls} />
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>Departure city *</label>
              <input type="text" name="departureCity" value={formData.departureCity} onChange={handleChange} required placeholder="e.g. Lahore, Karachi" className={inputCls} />
            </div>

            <div className="flex flex-col">
              <label className={labelCls}>Travel date *</label>
              <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required className={inputCls} />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelCls}>Number of travellers *</label>
              <input type="number" min="1" name="numTravelers" value={formData.numTravelers} onChange={handleChange} required placeholder="How many people?" className={inputCls} />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelCls}>Additional notes</label>
              <textarea name="additionalNotes" rows={4} value={formData.additionalNotes} onChange={handleChange} placeholder="Any special requirements or messages…" className={`${inputCls} resize-none`}></textarea>
            </div>

            {status === 'error' && (
              <p className="md:col-span-2 text-[#EF5B2D] text-sm font-semibold">
                Something went wrong. Please call us at +92 311 1240111 or email {CONTACT_EMAIL}.
              </p>
            )}

            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="flex items-center gap-2 text-[12px] font-medium text-[#143656]/70">
                <ShieldCheck size={15} className="text-[#EF5B2D]" strokeWidth={2} /> Your details are kept private &amp; secure.
              </span>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto bg-[#0e1a2b] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#EF5B2D] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : (
                  <>Confirm booking <ArrowUpRight size={15} strokeWidth={2.5} /></>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
