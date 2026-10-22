"use client";
import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, BadgeCheck, ShieldCheck, CreditCard, ArrowUpRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { Icon: FaFacebookF, href: "https://www.facebook.com/p/Travel-Operations-61550269560647/", label: 'Facebook' },
    { Icon: FaInstagram, href: "https://www.instagram.com/travel__operations/", label: 'Instagram' },
    { Icon: FaLinkedinIn, href: "#", label: 'LinkedIn' },
    { Icon: FaTwitter, href: "#", label: 'Twitter' },
    { Icon: FaTiktok, href: "#", label: 'TikTok' },
    { Icon: FaYoutube, href: "#", label: 'YouTube' },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Umrah Packages', href: '/umrah-packages' },
    { name: 'Visa', href: '/visa' },
    { name: 'Destinations', href: '/destination' },
    { name: 'Blog', href: '/blog' },
  ];

  const services = [
    { name: 'Flight Booking', href: '/book-now' },
    { name: 'Hotel Reservations', href: '/book-now' },
    { name: 'Tour Packages', href: '/tours' },
    { name: 'Umrah Packages', href: '/umrah-packages' },
    { name: 'Visa Consultancy', href: '/visa' },
    { name: 'Travel Insurance', href: '/book-now' },
  ];

  return (
    <footer className="bg-[#0e1a2b] text-[#fbf9f6] pt-10 pb-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#F3592D]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 lg:gap-8 mb-8">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <h1 className="font-serif text-2xl text-[#fbf9f6]">
              Travel <span className="italic text-[#e7a892]">Operations</span>
            </h1>
            <p className="text-[#fbf9f6]/70 leading-relaxed text-sm max-w-md">
              A PSA-approved travel desk based in Pakistan. We do Umrah, international tours, flights, hotels, visa consultancy and corporate travel — engineered seamlessly, every time.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-semibold">
                <BadgeCheck size={11} strokeWidth={2} className="text-[#e7a892]" /> PSA Approved
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-semibold">
                <ShieldCheck size={11} strokeWidth={2} className="text-[#e7a892]" /> NTN Verified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-semibold">
                <CreditCard size={11} strokeWidth={2} className="text-[#e7a892]" /> Secure Pay
              </span>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="bg-white/5 border border-white/10 p-2.5 rounded-full text-[#fbf9f6]/80 hover:bg-[#F3592D] hover:border-[#F3592D] hover:text-white transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-serif italic text-[#e7a892] text-base mb-4">Explore</p>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#fbf9f6]/70 hover:text-[#e7a892] transition-colors flex items-center gap-2 text-[13px] font-medium group">
                    <ArrowUpRight size={12} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif italic text-[#e7a892] text-base mb-4">Services</p>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#fbf9f6]/70 hover:text-[#e7a892] transition-colors flex items-center gap-2 text-[13px] font-medium group">
                    <ArrowUpRight size={12} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif italic text-[#e7a892] text-base mb-4">Reach us</p>
            <div className="space-y-3">
              <a href="tel:+923111240111" className="flex items-start gap-3 group">
                <Phone size={14} strokeWidth={2} className="text-[#e7a892] mt-1 shrink-0" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#fbf9f6]/40">24/7</div>
                  <span className="text-[13px] font-medium group-hover:text-[#e7a892] transition-colors">+92 311 1240111</span>
                </div>
              </a>

              <a href="mailto:info@traveloperations.pk" className="flex items-start gap-3 group">
                <Mail size={14} strokeWidth={2} className="text-[#e7a892] mt-1 shrink-0" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#fbf9f6]/40">Email</div>
                  <span className="text-[13px] font-medium group-hover:text-[#e7a892] transition-colors break-all">info@traveloperations.pk</span>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={2} className="text-[#e7a892] mt-1 shrink-0" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#fbf9f6]/40">Office</div>
                  <span className="text-[13px] font-medium leading-relaxed">Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#fbf9f6]/50 text-[11px] font-medium text-center md:text-left">
            © 2026 Travel Operations.pk — All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-medium text-[#fbf9f6]/50">
            <Link href="#" className="hover:text-[#e7a892] transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#e7a892] transition-colors">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#e7a892] transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
