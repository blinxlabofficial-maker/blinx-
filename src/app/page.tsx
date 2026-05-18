import HeroCanvas from '@/components/HeroCanvas';
import Marquee from '@/components/Marquee';
import AboutStats from '@/components/AboutStats';
import ServicesGrid from '@/components/ServicesGrid';
import CaseStudyWindow from '@/components/CaseStudyWindow';
import SprintProcess from '@/components/SprintProcess';
import Platforms from '@/components/Platforms';
import Testimonials from '@/components/Testimonials';
import CTABand from '@/components/CTABand';

export default function Home() {
  return (
    <>
      <HeroCanvas />
      <Marquee />
      <AboutStats />
      <ServicesGrid />
      <SprintProcess />
      <CaseStudyWindow />
      <Testimonials />
      <Platforms />
      <CTABand />
    </>
  );
}