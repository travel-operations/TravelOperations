import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import React from "react";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Travel Operations | Premium Travel Agency in Pakistan",
    template: "%s | Travel Operations",
  },
  description:
    "Travel Operations is a PSA-approved premium travel agency in Pakistan. Book Umrah packages, Uzbekistan & international tours, flights, hotels and visa services with expert support.",
  keywords: [
    "Travel Operations",
    "Umrah Packages 2026",
    "Uzbekistan Tour Packages",
    "Uzbekistan Airways Pakistan",
    "Cheap Flights Pakistan",
    "Hotels in Lahore",
    "Dubai Tour Packages",
    "Visa Consultancy Pakistan",
    "Turkey Tour Pakistan",
    "Hunza Travel Guide",
    "Skardu Tours",
  ],
  openGraph: {
    type: "website",
    title: "Travel Operations | Premium Travel Agency in Pakistan",
    description:
      "Umrah, tours, flights, hotels and visa services from Pakistan's trusted travel agency.",
    siteName: "Travel Operations",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased text-[#0e1a2b] bg-[#fbf9f6]">
        <SiteChrome>
          <main>{children}</main>
        </SiteChrome>
      </body>
    </html>
  );
}
