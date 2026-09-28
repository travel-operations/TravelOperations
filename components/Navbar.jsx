"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, CalendarCheck, Mail, ArrowUpRight } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Umrah', href: '/umrah-packages' },
    { name: 'Visa', href: '/visa' },
    { name: 'Destinations', href: '/destination' },
    { name: 'Blog', href: '/blog' },
  ];

  if (!mounted) return null;

  return (
    <>
     

      <nav 
        className={`fixed inset-x-0 z-50 transition-all duration-300 
        ${scrolled 
          ? 'top-0 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_0_rgba(14,26,43,0.08)]' 
          : 'top-0 md:top-9 bg-[#fbf9f6] border-b border-[#e5dfd4]'}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between h-20">
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Travel Operations"
                className="h-9 md:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-[13px] font-semibold text-[#0e1a2b] transition-colors duration-300 group-hover:text-[#c7654d]"
                >
                  {link.name}
                </Link>
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#c7654d] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="/book-now" className="hidden md:flex">
              <button
                type="button"
                className="bg-[#0e1a2b] text-white pl-5 pr-4 py-2.5 rounded-full flex items-center gap-2 font-semibold text-xs hover:bg-[#c7654d] transition-colors"
              >
                <CalendarCheck size={14} strokeWidth={2} />
                Book now
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </button>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-[#0e1a2b] hover:bg-[#f1ece4] rounded-lg transition-colors"
            >
              <Menu size={26} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0e1a2b]/60 z-[60] backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#fbf9f6] z-[70] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#e5dfd4]">
                <span className="font-serif italic text-[#0e1a2b] text-2xl">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-[#143656]/60 hover:text-[#c7654d] transition-colors"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="flex flex-col px-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-semibold text-[#0e1a2b] hover:text-[#c7654d] transition-colors py-4 border-b border-[#e5dfd4] last:border-0 flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowUpRight size={16} strokeWidth={2} className="text-[#143656]/40 group-hover:text-[#c7654d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-[#e5dfd4] bg-[#f1ece4]">
                <Link href="/book-now" onClick={() => setIsOpen(false)}>
                  <button
                    type="button"
                    className="w-full bg-[#0e1a2b] text-white py-3.5 rounded-full flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <CalendarCheck size={16} strokeWidth={2} />
                    Book now
                  </button>
                </Link>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
