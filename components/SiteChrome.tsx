"use client";
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Loader from '@/components/Loader';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Loader />}
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <WhatsAppFloat />}
      {!isAdmin && <Footer />}
    </>
  );
}
