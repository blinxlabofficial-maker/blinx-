import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactStrip from './components/ImpactStrip';
import WhyBlinx from './components/WhyBlinx';
import Approach from './components/Approach';
import FlywheelExplorer from './components/FlywheelExplorer';
import Services from './components/Services';
import CaseStudy from './components/CaseStudy';
import GrowthAudit from './components/GrowthAudit';
import BookStrategy from './components/BookStrategy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicePage from './components/ServicePage';
import { useScrollRevealMultiple } from './hooks/useScrollReveal';
import './App.css';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Activate scroll-reveal animations across all elements with the 'reveal' class
  useScrollRevealMultiple('.reveal');

  // Track URL hash updates for single page state-based routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set page titles based on open pages
  useEffect(() => {
    if (currentHash.startsWith('#/service/')) {
      const stage = currentHash.replace('#/service/', '').toUpperCase();
      document.title = `Blinx Lab | ${stage} Plan Configurator`;
    } else {
      document.title = 'Blinx Lab | Digital Growth for Real Businesses';
    }
  }, [currentHash]);

  const handleConfigureStage = (stageId) => {
    window.location.hash = `#/service/${stageId}`;
  };

  const isServicePage = currentHash.startsWith('#/service/');
  const activeStageId = isServicePage ? currentHash.replace('#/service/', '') : null;

  return (
    <div className="app-container">
      <Navbar onConfigureStage={handleConfigureStage} isServicePage={isServicePage} />
      <main id="top">
        {isServicePage && activeStageId ? (
          <ServicePage stageId={activeStageId} />
        ) : (
          <>
            <Hero />
            <ImpactStrip />
            <WhyBlinx />
            <Approach />
            <FlywheelExplorer onConfigureStage={handleConfigureStage} />
            <Services />
            <CaseStudy />
            <GrowthAudit />
            <BookStrategy />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
