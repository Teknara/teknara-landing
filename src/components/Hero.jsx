import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false); // State for the floating arrow nav
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // 1. Scroll-driven animations for cinematic depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Text moves down slightly and fades out on scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // Background video slowly scales up to create a zoom effect
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // 2. Mouse tracking for live interactive parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized mouse coordinates (-1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ensure local video plays correctly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented or video loading issue:", error);
      });
    }
  }, []);

  // Smooth scroll helper (closes mobile menu automatically)
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setNavExpanded(false);
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Target section "#${id}" not found on page.`);
    }
  };

  // Animation variants for kinetic text reveal
  const titleLetters = "TEKNARA".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  // List of sections for the floating Quick Nav
  const pageSections = [
    { id: 'top', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'integration', label: 'Integration' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <section
        ref={heroRef}
        id="top"
        className="relative w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center overflow-hidden overflow-x-hidden text-white"
      >
        {/* Background Video with Scroll Zoom & Bottom Blend */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            autoPlay
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          >
            <source src="/videos/wav.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>
        </motion.div>

        {/* Floating Header Navbar */}
        <header className="absolute top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-12 py-6 flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Logo Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white transition-all duration-300 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.png"
              alt="Teknara Logo"
              className="w-16 sm:w-20 h-8 sm:h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-['Orbitron'] font-bold text-xs sm:text-sm tracking-widest text-black pr-1 sm:pr-2">
              TEKNARA
            </span>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center gap-1 bg-[#0d131f]/80 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 text-xs font-['Inter'] font-medium text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('expertise')}
              className="px-4 py-2 text-xs font-['Inter'] font-medium text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            >
              EXPERTISE
            </button>
            <button
              onClick={() => scrollToSection('workflow')}
              className="px-4 py-2 text-xs font-['Inter'] font-medium text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            >
              WORKFLOW
            </button>
            <button
              onClick={() => scrollToSection('integration')}
              className="px-4 py-2 text-xs font-['Inter'] font-medium text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            >
              INTEGRATION
            </button>

            <div className="pl-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white text-black font-['Inter'] font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(103,232,249,0.5)] transition-all duration-300 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </motion.nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-full bg-[#0d131f]/80 backdrop-blur-md border border-white/15 text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-4 right-4 mt-3 bg-[#0d131f]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-5 flex flex-col gap-3 shadow-2xl md:hidden z-50"
              >
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left py-2 px-3 text-sm font-['Inter'] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => scrollToSection('expertise')}
                  className="text-left py-2 px-3 text-sm font-['Inter'] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  EXPERTISE
                </button>
                <button
                  onClick={() => scrollToSection('workflow')}
                  className="text-left py-2 px-3 text-sm font-['Inter'] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  WORKFLOW
                </button>
                <button
                  onClick={() => scrollToSection('integration')}
                  className="text-left py-2 px-3 text-sm font-['Inter'] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  INTEGRATION
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-2 text-center py-2.5 px-4 bg-white text-black font-['Inter'] font-semibold text-sm rounded-xl hover:bg-cyan-300 transition-colors"
                >
                  Contact Us
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content with Kinetic Typography Reveal */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            x: mousePosition.x * 10, // scaled down slightly for safer boundaries on resize/zoom
          }}
          className="relative z-10 flex flex-col items-center justify-center space-y-2 md:space-y-3 text-center px-4 max-w-full"
        >
          {/* Kinetic Text Animation Container */}
          <div className="relative py-4 flex items-center justify-center max-w-full">
            {/* Sweeping Horizontal Laser Line */}
            <motion.div
              initial={{ left: "0%", width: "0%", opacity: 1 }}
              animate={{
                left: ["0%", "0%", "100%"],
                width: ["0%", "40%", "0%"],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_15px_#22d3ee] z-20 pointer-events-none"
            />

            {/* Sweeping Vertical Intersecting Line */}
            <motion.div
              initial={{ left: "0%", top: "-20%", height: "0%", opacity: 1 }}
              animate={{
                left: ["0%", "100%"],
                top: ["-20%", "20%"],
                height: ["0%", "140%", "0%"],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.1, delay: 0.1, ease: "easeInOut" }}
              className="absolute w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-white shadow-[0_0_15px_#c084fc] z-20 pointer-events-none"
            />

            {/* Staggered Letter Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center font-['Orbitron'] font-light text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none text-white drop-shadow-2xl"
            >
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={`inline-block ${index !== titleLetters.length - 1
                      ? "mr-[0.15em] sm:mr-[0.35em] md:mr-[0.566em]"
                      : ""
                    }`}
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 60%, #93c5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-['Inter'] font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.593em] leading-none text-white drop-shadow-2xl mr-0 sm:mr-[-0.593em]"
            style={{
              background: 'linear-gradient(180deg, #ffffff 70%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            IT SOLUTIONS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-['Playfair_Display'] font-medium text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] uppercase text-white/80 drop-shadow-lg pt-2"
            style={{
              background: 'linear-gradient(180deg, #ffffff 70%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TECHNOLOGY FOR THE NEXT ERA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-['Inter'] font-light text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 drop-shadow-lg px-4"
          >
            INNOVATE · INTEGRATE · ELEVATE
          </motion.p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-4 sm:bottom-8 z-10 w-full flex justify-center"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center text-[10px] font-['Inter'] font-extralight uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors cursor-pointer drop-shadow-lg"
          >
            <span>Scroll Down</span>
            <div className="w-px h-8 sm:h-10 mt-2 bg-gradient-to-b from-white/40 via-white/10 to-transparent group-hover:from-cyan-400 group-hover:h-10 sm:group-hover:h-12 transition-all duration-300"></div>
          </button>
        </motion.div>
      </section>

      {/* Persistent Floating Quick Navigation (Visible across the whole page) */}
      <div 
        className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-2"
        onMouseEnter={() => setNavExpanded(true)}
        onMouseLeave={() => setNavExpanded(false)}
      >
        <AnimatePresence>
          {navExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col-reverse gap-2 mb-2"
            >
              {pageSections.map((section, idx) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className="px-4 py-2 bg-[#0d131f]/90 backdrop-blur-md border border-white/10 text-white/80 hover:text-white text-xs font-['Inter'] tracking-wider uppercase rounded-xl shadow-lg hover:bg-white/10 hover:border-cyan-400/50 transition-all text-left w-max"
                >
                  {section.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Floating Button */}
        <button
          onClick={() => {
            if (!navExpanded) setNavExpanded(true);
            else scrollToSection('top');
          }}
          className="w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-white hover:bg-slate-800 hover:border-cyan-400/50 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: navExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp size={24} className={navExpanded ? "text-cyan-400" : "text-white"} />
          </motion.div>
        </button>
      </div>
    </>
  );
}