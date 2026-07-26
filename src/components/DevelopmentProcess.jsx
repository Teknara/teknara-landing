import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FileText, Layout, Code2, ShieldCheck, Rocket,
  Headphones, Sparkles
} from 'lucide-react';

const processSteps = [
  {
    id: 1,
    num: "01",
    title: "Requirement Analysis",
    subtitle: "Discovery & Scoping",
    description: "Deep dive workshops to scope functional targets, stack parameters, and final project deliverables with precision.",
    icon: <FileText className="w-6 h-6 text-white" />,
    tag: "Strategy",
    metric: "100% Alignment"
  },
  {
    id: 2,
    num: "02",
    title: "Design & Wireframing",
    subtitle: "Architecture & UI/UX",
    description: "Architecting interactive user flows, modern wireframes, and secure, scalable modular database schemas.",
    icon: <Layout className="w-6 h-6 text-white" />,
    tag: "Design",
    metric: "Figma & ERD"
  },
  {
    id: 3,
    num: "03",
    title: "Agile Development",
    subtitle: "Sprint Execution",
    description: "Writing clean, production-grade, unit-tested code in rapid sprints with live staging server updates.",
    icon: <Code2 className="w-6 h-6 text-white" />,
    tag: "Engineering",
    metric: "CI/CD Pipeline"
  },
  {
    id: 4,
    num: "04",
    title: "Testing & QA",
    subtitle: "Verification & Security",
    description: "Rigorous automated and manual verification cycles checking edge cases, security compliance, and responsiveness.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    tag: "Quality",
    metric: "Zero-Bug Policy"
  },
  {
    id: 5,
    num: "05",
    title: "Production Launch",
    subtitle: "Deployment Protocol",
    description: "Staging final assets, configuring DNS/SSL certificates, and launching high-availability production systems.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    tag: "DevOps",
    metric: "99.99% Uptime"
  },
  {
    id: 6,
    num: "06",
    title: "Support & Handover",
    subtitle: "Scaling & Maintenance",
    description: "Providing complete codebase documentation, team knowledge transfer, and proactive 24/7 maintenance support.",
    icon: <Headphones className="w-6 h-6 text-white" />,
    tag: "Growth",
    metric: "24/7 Monitoring"
  }
];

export default function DevelopmentProcessSpace3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSteps = processSteps.length;

  // --- MOUSE TRACKING SETUP ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normalizedMouseX = useMotionValue(0);
  const normalizedMouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothNormX = useSpring(normalizedMouseX, springConfig);
  const smoothNormY = useSpring(normalizedMouseY, springConfig);

  const parallaxRotateX = useTransform(smoothNormY, [-0.5, 0.5], [55, 75]);
  const parallaxRotateY = useTransform(smoothNormX, [-0.5, 0.5], [-5, -25]);
  const parallaxX = useTransform(smoothNormX, [-0.5, 0.5], [30, -30]);
  const parallaxY = useTransform(smoothNormY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    const { innerWidth, innerHeight } = window;
    normalizedMouseX.set((e.clientX / innerWidth) - 0.5);
    normalizedMouseY.set((e.clientY / innerHeight) - 0.5);
  };

  // 4-Second Rotation Cycle with direct loop from 6th -> 1st
  useEffect(() => {
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === totalSteps - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, totalSteps, mouseX, mouseY]);

  // Generate Orbiting Rings of Particles
  const orbitRings = useMemo(() => [
    { size: 500, duration: 40, particles: 25, reverse: false },
    { size: 750, duration: 55, particles: 40, reverse: true },
    { size: 1000, duration: 70, particles: 55, reverse: false },
    { size: 1300, duration: 90, particles: 70, reverse: true },
  ], []);

  const getNodeCoordinates = (index) => {
    const startAngle = 165;
    const endAngle = 15;
    const stepAngle = (startAngle - endAngle) / (totalSteps - 1);
    const angleInDegrees = startAngle - index * stepAngle;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const radiusX = 42;
    const radiusY = 52;

    const x = 50 + radiusX * Math.cos(angleInRadians);
    const y = 62 - radiusY * Math.sin(angleInRadians);

    return { x, y };
  };

  return (
    <section
      id="process"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-20 md:py-28 px-6 md:px-12 bg-black border-t border-b border-white/10 overflow-hidden text-white"
    >
      {/* ================= INTERACTIVE MOUSE GLOW ================= */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full pointer-events-none z-0"
      />

      {/* ================= 3D SPACE ORBIT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full"></div>

        <motion.div
          style={{
            rotateX: parallaxRotateX,
            rotateY: parallaxRotateY,
            x: parallaxX,
            y: parallaxY
          }}
          className="absolute w-full h-full flex items-center justify-center transform-gpu"
        >
          {orbitRings.map((ring, i) => (
            <motion.div
              key={`ring-${i}`}
              animate={{ rotate: ring.reverse ? -360 : 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-white/5"
              style={{ width: ring.size, height: ring.size }}
            >
              {Array.from({ length: ring.particles }).map((_, j) => {
                const angle = (j / ring.particles) * 360 + (Math.random() * 20);
                const particleSize = Math.random() * 2 + 1;

                return (
                  <div
                    key={`particle-${i}-${j}`}
                    className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    style={{
                      width: `${particleSize}px`,
                      height: `${particleSize}px`,
                      top: '50%',
                      left: '50%',
                      opacity: Math.random() * 0.5 + 0.3,
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${ring.size / 2}px)`
                    }}
                  />
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-['Inter'] tracking-[0.25em] uppercase mb-4 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="!text-white font-semibold">OUR DEVELOPMENT PROCESS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider !text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)] max-w-3xl mx-auto"
          >
            Always We Offer The Best Process For Success!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="!text-white text-xs md:text-sm font-['Inter'] mt-3 opacity-80 max-w-2xl mx-auto leading-relaxed"
          >
            A structured, iterative workflow designed to transform complex ideas into high-performance digital solutions.
          </motion.p>
        </div>

        {/* Arch Container */}
        <div
          className="relative w-full max-w-4xl mx-auto min-h-[480px] md:min-h-[540px] flex flex-col items-center justify-start pt-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated SVG Arch with Rotating Flowing Light */}
          <div className="absolute inset-0 w-full h-[320px] md:h-[360px] pointer-events-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 360" fill="none">
              <defs>
                <linearGradient id="spaceArchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                <filter id="spaceGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <path
                d="M 60 280 A 340 210 0 0 1 740 280"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
              />

              <motion.path
                d="M 60 280 A 340 210 0 0 1 740 280"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="2"
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
              />

              <motion.path
                d="M 60 280 A 340 210 0 0 1 740 280"
                stroke="url(#spaceArchGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#spaceGlow)"
                strokeDasharray="160 640"
                animate={{ strokeDashoffset: [800, -160] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 2.0 }}
              />
            </svg>
          </div>

          {/* Arch Nodes */}
          <div className="absolute inset-0 w-full h-[320px] md:h-[360px]">
            {processSteps.map((step, idx) => {
              const { x, y } = getNodeCoordinates(idx);
              const isActive = idx === activeIndex;

              return (
                <div
                  key={step.id}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className="absolute cursor-pointer select-none z-20 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    animate={{
                      scale: isActive ? 1.35 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                      ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,1)] border-2 border-white'
                      : 'bg-black/90 border border-white/30 text-white hover:border-white hover:bg-white/20'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/40 animate-ping -z-10"></span>
                    )}

                    <div className={isActive ? 'text-black' : 'text-white'}>
                      {React.cloneElement(step.icon, {
                        className: `w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-black' : 'text-white'}`
                      })}
                    </div>
                  </motion.div>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <span
                      className={`font-['Orbitron'] text-[11px] font-extrabold !text-white tracking-widest ${isActive ? 'opacity-100 scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]' : 'opacity-60 group-hover:opacity-100'
                        }`}
                    >
                      {step.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Card - White Glassy Design */}
          <div className="mt-[180px] md:mt-[200px] w-full max-w-xl z-30 px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-gradient-to-br from-white/95 via-white/85 to-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white shadow-[0_12px_45px_rgba(0,0,0,0.25)] text-center relative overflow-hidden text-gray-900"
              >
                {/* Premium subtle light reflection */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>

                {/* Active Step Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center shadow-lg">
                  {React.cloneElement(processSteps[activeIndex].icon, { className: "w-6 h-6 text-white" })}
                </div>

                <span className="text-[10px] md:text-xs font-['Orbitron'] font-bold tracking-[0.25em] uppercase text-gray-500 block mb-1">
                  {processSteps[activeIndex].subtitle} • STEP {processSteps[activeIndex].num}
                </span>

                <h3 className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-gray-900 tracking-wide mb-3">
                  {processSteps[activeIndex].title}
                </h3>

                <p className="text-gray-700 text-xs md:text-sm font-['Inter'] leading-relaxed max-w-lg mx-auto mb-6">
                  {processSteps[activeIndex].description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-200">
                  <span className="px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-['Inter'] font-semibold text-gray-800">
                    Deliverable: <strong className="text-gray-900 font-bold ml-1">{processSteps[activeIndex].metric}</strong>
                  </span>

                  <button className="px-6 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 font-['Orbitron'] text-xs font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer">
                    Read More
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-8 z-30">
            {processSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex
                  ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,1)]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}