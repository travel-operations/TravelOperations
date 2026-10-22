// app/page.tsx
import Hero from "@/components/Hero";
import PopularTours from "@/components/PopularTours";

import UmrahPackages from "@/components/UmrahPackages";
import VisaConsultancy from "@/components/VisaConsultancy";
import CustomerHelp from "@/components/CustomerHelp";
import PartnersMarquee from "@/components/PartnersMarquee";


export default function Home() {
  return (
    <main>
      <Hero />
      <PopularTours />
      <UmrahPackages featured />
      <VisaConsultancy />
      <CustomerHelp />
      <PartnersMarquee />
      
    </main>
  );
}
