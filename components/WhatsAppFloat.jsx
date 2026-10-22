"use client";
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const handleSend = () => {
    window.open("https://wa.me/923111240111?text=Hi%20Travel%20Operations%2C%20I'd%20like%20a%20quote%20for%20a%20trip.", "_blank");
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 md:right-8 z-[100] w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <FaWhatsapp size={22} />
            </div>
            <div className="flex-1">
              <div className="font-black text-sm">Travel Operations</div>
              <div className="text-[11px] text-green-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span> Online · Replies in mins
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/70 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 bg-[#E5DDD5] min-h-[120px]">
            <div className="bg-white inline-block px-3 py-2 rounded-lg text-xs text-gray-700 shadow max-w-[230px]">
              <strong className="block text-[#075E54] text-[11px] mb-0.5">Travel Operations</strong>
              Salam! How can we help — flight, hotel, tour or visa?
            </div>
          </div>
          <button
            onClick={handleSend}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} /> Start Chat
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.5)] hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 group flex items-center gap-3"
      >
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40"></span>
        )}
        <span className="hidden md:inline-block max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 font-black uppercase tracking-widest text-xs whitespace-nowrap">
          Chat with us
        </span>
        <FaWhatsapp size={28} />
      </button>
    </>
  );
};

export default WhatsAppFloat;
