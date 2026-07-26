import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import MeaningBehindTeknara from './components/MeaningBehindTeknara';
import ProjectDomains from './components/ProjectDomains';
import DevelopmentProcess from './components/DevelopmentProcess';
import BentoGrid from './components/BentoGrid';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
function App() {
  // Global smooth scroll / inertial scrolling using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      delete window.lenis;
      lenis.destroy();
    };
  }, []);

  return (
    /* FIXED: Changed to bg-black text-white and added overflow-x-hidden w-full */
    <div className="relative min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black overflow-x-hidden w-full">
      {/* 1. Hero & Navbar Area */}
      <Hero />

      {/* 2. Meaning Behind TEKNARA -> matches 'about' */}
      <section id="about">
        <MeaningBehindTeknara />
      </section>

      {/* 3. Project Domains -> matches 'expertise' */}
      <section id="expertise">
        <ProjectDomains />
      </section>

      {/* 4. Development Process -> matches 'workflow' */}
      <section id="workflow">
        <DevelopmentProcess />
      </section>

      {/* 5. Bento Grid -> matches 'integration' */}
      <section id="integration">
        <BentoGrid />
      </section>

      {/* 6. Footer -> matches 'contact' */}
      <section id="contact">
        <Footer />
      </section>

      {/* 7. Floating Chatbot widget */}
      <Chatbot />
    </div>
  );
}

export default App;