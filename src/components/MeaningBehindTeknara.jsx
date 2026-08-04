import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Sparkles, Layers, Zap, Shield,
  Award, Target, TrendingUp, Rocket
} from 'lucide-react';

// --- TINY SHARP 3D STARDUST TUNNEL BACKGROUND (NON-ROUND, ULTRA-TINY) ---
function TinyStardustTunnelBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // High density of ultra-tiny particles for a deep warp effect
    const particleCount = 280;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 3.5,
      y: (Math.random() - 0.5) * height * 3.5,
      z: Math.random() * width,
      size: Math.random() * 0.8 + 0.3, // Extremely tiny base size
      speed: Math.random() * 4 + 2.5,   // Fast forward motion
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.03,
    }));

    const render = () => {
      // Clean clear for crisp motion trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 350;

      particles.forEach((p) => {
        // Move closer to camera
        p.z -= p.speed;
        p.rotation += p.rotSpeed;

        // Reset particle to far back when it passes screen
        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width * 3.5;
          p.y = (Math.random() - 0.5) * height * 3.5;
        }

        // Perspective projection
        const scale = focalLength / p.z;
        const screenX = centerX + p.x * scale;
        const screenY = centerY + p.y * scale;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const depthProgress = 1 - p.z / width;
          const alpha = Math.min(1, depthProgress * 1.5 + 0.1);
          // Keep them tiny ("too tiny") even when close
          const currentSize = Math.max(0.4, p.size * scale * 0.9);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

          // Draw tiny crisp non-round shape (Rotated sharp diamond/square)
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(p.rotation);

          // Sharp diamond pixel shape instead of a circle
          ctx.beginPath();
          ctx.moveTo(0, -currentSize * 1.5);
          ctx.lineTo(currentSize * 1.5, 0);
          ctx.lineTo(0, currentSize * 1.5);
          ctx.lineTo(-currentSize * 1.5, 0);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full block bg-black"
    />
  );
}

const acronymData = [
  {
    letter: "T",
    title: "Tech Innovation Hub",
    subtitle: "BUILDING DIGITAL FUTURE",
    description: "Leading digital transformation through cutting-edge web and mobile solutions. We craft scalable, high-performance applications that drive business growth and market leadership.",
    icon: <Cpu className="w-6 h-6 text-white" />,
    stats: "500+ Projects Delivered",
    geo: "Global Innovation Center",
    shortTitle: "TECH"
  },
  {
    letter: "E",
    title: "Enterprise Excellence",
    subtitle: "SCALABLE SOLUTIONS",
    description: "Empowering enterprises with robust, enterprise-grade architectures. Our solutions ensure seamless operations, data security, and unparalleled performance for businesses worldwide.",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    stats: "98% Client Satisfaction",
    geo: "Serving 50+ Countries",
    shortTitle: "ENTERPRISE"
  },
  {
    letter: "K",
    title: "Knowledge Ecosystem",
    subtitle: "EMPOWERING MINDS",
    description: "Bridging academia and industry through premium mentorship programs. We nurture the next generation of tech leaders with real-world project experience and cutting-edge skills.",
    icon: <Layers className="w-6 h-6 text-white" />,
    stats: "1000+ Students Trained",
    geo: "Global Education Network",
    shortTitle: "KNOWLEDGE"
  },
  {
    letter: "N",
    title: "Next-Gen Technologies",
    subtitle: "FUTURE INNOVATIONS",
    description: "Pioneering the future with AI, machine learning, and cloud-native solutions. We transform ideas into intelligent systems that redefine industry standards.",
    icon: <Zap className="w-6 h-6 text-white" />,
    stats: "AI-Powered Solutions",
    geo: "Future-Ready Platform",
    shortTitle: "NEXT-GEN"
  },
  {
    letter: "A",
    title: "Advanced Analytics",
    subtitle: "SMART DECISIONS",
    description: "Leveraging data-driven insights and business intelligence to create competitive advantages. Our analytics solutions turn raw data into strategic gold.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    stats: "Data-Driven Success",
    geo: "Global Intelligence",
    shortTitle: "ADVANCED"
  },
  {
    letter: "R",
    title: "Robust Reliability",
    subtitle: "UNCOMPROMISING QUALITY",
    description: "Delivering mission-critical systems with 100% reliability. Our rigorous testing, security protocols, and quality standards ensure zero-compromise performance.",
    icon: <Shield className="w-6 h-6 text-white" />,
    stats: "99.99% Uptime Guarantee",
    geo: "Trusted Worldwide",
    shortTitle: "ROBUST"
  },
  {
    letter: "A",
    title: "Agile Acceleration",
    subtitle: "RAPID DEPLOYMENT",
    description: "Accelerating digital transformation with agile development, CI/CD pipelines, and rapid deployment strategies that deliver results in record time.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    stats: "Rapid Delivery",
    geo: "Global Acceleration",
    shortTitle: "AGILE"
  }
];

export default function MeaningBehindTeknara() {
  const [step, setStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const totalItems = acronymData.length;
  const angleStep = 360 / totalItems;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % totalItems);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, totalItems]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayStep(step);
    }, 800);
    return () => clearInterval(timeoutRef.current);
  }, [step]);

  const rotationAngle = -step * angleStep;
  const handleItemClick = (index) => setStep(index);
  const displayActiveIndex = displayStep;

  return (
    <section
      id="about"
      className="relative min-h-screen pt-16 pb-20 md:pt-20 md:pb-24 px-6 md:px-12 overflow-hidden bg-black text-white antialiased"
    >
      {/* Tiny Sharp Stardust Tunnel Background */}
      <TinyStardustTunnelBackground />

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="font-['Orbitron'] text-sm sm:text-base tracking-[0.4em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            THE MEANING BEHIND TEKNARA
          </h2>
          <p className="text-white text-xs font-['Inter'] mt-2 opacity-80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Interactive Ecosystem Pillars
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left: 3D Ring */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div
              className="relative w-full max-w-[650px] h-[520px] md:h-[600px] flex items-center justify-center perspective-[2000px] overflow-visible"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Neutral ambient light beam */}
              <div className="absolute w-80 h-80 bg-white/5 blur-[120px] pointer-events-none rounded-full z-10 animate-pulse"></div>

              {/* 3D ANIMATED CENTER LOGO */}
              <motion.div
                animate={{
                  y: [-12, 12, -12],
                  rotateY: [-12, 12, -12],
                  rotateX: [6, -6, 6],
                  scale: [1, 1.04, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 flex items-center justify-center pointer-events-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <div className="absolute -bottom-8 w-3/4 h-8 bg-white/10 blur-xl rounded-full transform rotateX(80deg)"></div>
                  <img
                    src="/logo.png"
                    alt="TEKNARA IT SOLUTIONS Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  />
                </div>
              </motion.div>

              {/* Rotating Ring Container */}
              <div
                className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(-40deg) rotateY(${rotationAngle}deg)`,
                }}
              >
                {acronymData.map((item, index) => {
                  const itemAngle = index * angleStep;
                  const isDisplayActive = index === displayActiveIndex;
                  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 280;

                  return (
                    <div
                      key={index}
                      onClick={() => handleItemClick(index)}
                      className="absolute cursor-pointer select-none group"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                      }}
                    >
                      {/* Counter-rotation to keep letters facing forward */}
                      <div
                        style={{ transform: `rotateY(${-itemAngle - rotationAngle}deg) rotateX(40deg)` }}
                        className="relative z-20 flex items-center justify-center"
                      >
                        {/* CRISP NORMAL LETTERS */}
                        <motion.div
                          animate={{
                            scale: isDisplayActive ? 1.8 : 1,
                            opacity: isDisplayActive ? 1 : 0.65,
                            y: isDisplayActive ? [-4, 4, -4] : 0,
                          }}
                          whileHover={!isDisplayActive ? { scale: 1.2, opacity: 1 } : {}}
                          transition={{
                            scale: { type: "spring", stiffness: 300, damping: 20 },
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                          }}
                          className="flex flex-col items-center justify-center"
                        >
                          <span className="font-['Orbitron'] font-black text-3xl md:text-4xl lg:text-5xl tracking-widest text-white">
                            {item.letter}
                          </span>

                          <span className={`font-['Inter'] text-[7px] md:text-[9px] uppercase tracking-[0.25em] mt-1 text-white ${isDisplayActive ? 'font-bold' : 'font-semibold'}`}>
                            {item.shortTitle}
                          </span>

                          {isDisplayActive && (
                            <motion.div
                              layoutId="activeDot"
                              className="w-1.5 h-1.5 rounded-full bg-white mt-1"
                              transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-10 bg-gradient-to-t from-white/10 to-transparent blur-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Right: Solid Laptop 3D Stack */}
          <div className="w-full lg:w-1/2 max-w-2xl relative h-[500px] md:h-[600px] perspective-[1500px]">
            <div className="relative w-full h-full flex items-center justify-center mt-6 lg:mt-0" style={{ transformStyle: 'preserve-3d' }}>
              {acronymData.map((item, cardIdx) => {
                const diff = cardIdx - step;
                const isActive = diff === 0;
                const isPast = diff < 0;
                const isFuture = diff > 0;

                let animateState = {};

                if (isActive) {
                  animateState = { rotateX: 0, y: 0, z: 0, opacity: 1, scale: 1 };
                } else if (isPast) {
                  animateState = {
                    rotateX: -90,
                    y: 250,
                    z: 100,
                    opacity: 0,
                    scale: 0.9
                  };
                } else {
                  animateState = {
                    rotateX: 0,
                    y: diff * -35,
                    z: diff * -80,
                    opacity: Math.max(1 - diff * 0.15, 0),
                    scale: 1 - diff * 0.04
                  };
                }

                return (
                  <motion.div
                    key={cardIdx}
                    initial={false}
                    animate={animateState}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                    style={{
                      transformOrigin: "bottom center",
                      zIndex: isActive ? 50 : isFuture ? 40 - diff : 10 + diff,
                    }}
                    className={`absolute w-full top-[5%] sm:top-[10%] ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    {/* Solid White Card Design */}
                    <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="relative z-10">
                        {/* Related Acronym Letters Navigation Strip */}
                        <div className="mb-6 pb-4 border-b border-gray-100">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block font-['Inter'] mb-3">
                            ACRONYM LETTERS :
                          </span>
                          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                            {acronymData.map((navItem, navIdx) => {
                              const isLetterActive = navIdx === step;
                              return (
                                <button
                                  key={navIdx}
                                  onClick={() => handleItemClick(navIdx)}
                                  className={`flex-1 py-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${isLetterActive
                                    ? 'bg-white border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.06)] scale-105 z-10'
                                    : 'bg-gray-50 border-gray-100 hover:border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                  <span className={`font-['Orbitron'] font-bold text-sm sm:text-base transition-colors ${isLetterActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {navItem.letter}
                                  </span>
                                  <span className={`text-[8px] font-['Inter'] uppercase hidden sm:block mt-0.5 transition-colors ${isLetterActive ? 'text-gray-700 font-bold' : 'text-gray-400'}`}>
                                    {navItem.shortTitle}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Icon & Subtitle Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-900 shadow-md shrink-0">
                            {item.icon}
                          </div>

                          <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 block font-['Inter'] mb-1">
                              {item.subtitle}
                            </span>
                            <h3 className="font-['Orbitron'] text-xl md:text-2xl text-gray-900 font-bold leading-tight tracking-wide">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-normal font-['Inter'] mb-6">
                          {item.description}
                        </p>

                        {/* Pillar Indicator Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-900 shadow-sm w-fit mb-6">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          <span className="text-[11px] font-['Orbitron'] text-gray-100 font-semibold">
                            PILLAR {cardIdx + 1} OF {totalItems} : <strong className="text-white font-bold">{item.letter}</strong>
                          </span>
                        </div>

                        {/* Stats & Geo Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 shadow-sm cursor-default transition-transform hover:scale-102">
                            <Award className="w-4 h-4 text-gray-600 shrink-0" />
                            <span className="text-xs text-gray-700 font-['Inter'] font-semibold">
                              {item.stats}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 shadow-sm cursor-default transition-transform hover:scale-102">
                            <Target className="w-4 h-4 text-gray-600 shrink-0" />
                            <span className="text-xs text-gray-700 font-['Inter'] font-semibold">
                              {item.geo}
                            </span>
                          </div>
                        </div>

                        {/* Progress Line */}
                        <div className="flex justify-end pt-2">
                          <div className="flex gap-1.5">
                            {acronymData.map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === step
                                  ? 'w-8 bg-gray-900 shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                                  : 'w-3 bg-gray-200'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
