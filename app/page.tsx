import { Navbar, Footer } from '@/components/ui';
import {
  Hero,
  BrandLogos,
  HowItWorks,
  FeatureGrid,
  ComparisonShowcase,
  TryOnDemo,
  Testimonials,
  Pricing,
  FAQ,
  ContactSection,
} from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <BrandLogos />
      <HowItWorks />
      <FeatureGrid />
      <ComparisonShowcase />
      <TryOnDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}
