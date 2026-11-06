'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Mail, MapPin, AtSign, ExternalLink,
  ArrowUpRight, Copy, Check, MessageSquare,
  MessageCircle, Rocket, Sparkles
} from 'lucide-react';

// Brand Inline SVG Fallbacks
const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 120 };
  const rocketX = useSpring(mouseX, springConfig);
  const rocketY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 300);

    const handleResize = () => {
      if (!canvas) return;

      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 50;
    const particles = [];
    const mousePos = { x: -1000, y: -1000 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;

      mouseX.set(e.clientX - 60);
      mouseY.set(e.clientY - 60);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        const mdx = p.x - mousePos.x;
        const mdy = p.y - mousePos.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - mdist / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  const handleCopyEmail = (e) => {
    e.preventDefault();

    if (navigator?.clipboard) {
      navigator.clipboard.writeText('teknaratech@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-black text-white font-sans selection:bg-white selection:text-black relative z-10 overflow-hidden"
    >

      {/* SEO LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TEKNARA IT SOLUTIONS",
            "image": "/logo.png",
            "url": "https://www.linkedin.com/in/teknara-it-solutions-4aa986418",
            "email": "teknaratech@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Thrissur",
              "addressRegion": "Kerala",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 10.5276,
              "longitude": 76.2144
            },
            "sameAs": [
              "https://www.linkedin.com/in/teknara-it-solutions-4aa986418"
            ]
          })
        }}
      />

      {/* Realtime Canvas Dynamic Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />

        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-dashed border-white/10 border-t-white/30 pointer-events-none opacity-60"
        />

        <motion.div
          style={{ x: rocketX, y: rocketY }}
          className="absolute top-0 left-0 z-10 flex items-center gap-1.5 pointer-events-none"
        >
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-white rounded-full blur-[1px] opacity-80" />

          <div className="relative">
            <Rocket
              size={26}
              className="text-white fill-white transform -rotate-45 drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            />
            <Sparkles
              size={12}
              className="text-white/90 absolute -bottom-1 -left-2 animate-ping"
            />
          </div>
        </motion.div>
      </div>

      {/* SVG Skyline Divider */}
      <div className="w-full bg-white text-black overflow-hidden leading-none select-none pointer-events-none relative z-20">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-36 sm:h-48 md:h-60 lg:h-72 object-cover object-bottom block"
          preserveAspectRatio="none"
        >
          <rect x="0" y="160" width="1440" height="40" fill="currentColor" />
          <rect x="0" y="130" width="25" height="40" fill="currentColor" />
          <rect x="20" y="140" width="35" height="30" fill="currentColor" />
          <rect x="50" y="115" width="20" height="55" fill="currentColor" />
          <rect x="65" y="125" width="40" height="45" fill="currentColor" />
          <rect x="100" y="105" width="25" height="65" fill="currentColor" />
          <polygon points="100,105 112.5,90 125,105" fill="currentColor" />
          <rect x="120" y="120" width="45" height="50" fill="currentColor" />
          <rect x="160" y="95" width="30" height="75" fill="currentColor" />
          <rect x="185" y="110" width="50" height="60" fill="currentColor" />
          <rect x="230" y="85" width="35" height="85" fill="currentColor" />
          <rect x="260" y="105" width="30" height="65" fill="currentColor" />
          <rect x="285" y="70" width="40" height="100" fill="currentColor" />
          <polygon points="285,70 305,55 325,70" fill="currentColor" />
          <line x1="305" y1="35" x2="305" y2="55" stroke="currentColor" strokeWidth="2" />
          <rect x="320" y="90" width="35" height="80" fill="currentColor" />
          <rect x="350" y="80" width="30" height="90" fill="currentColor" />
          <rect x="420" y="60" width="45" height="110" fill="currentColor" />
          <rect x="435" y="35" width="15" height="25" fill="currentColor" />
          <line x1="442" y1="10" x2="442" y2="35" stroke="currentColor" strokeWidth="2.5" />
          <rect x="480" y="30" width="38" height="140" fill="currentColor" />
          <polygon points="480,30 499,10 518,30" fill="currentColor" />
          <line x1="499" y1="0" x2="499" y2="10" stroke="currentColor" strokeWidth="3" />
          <rect x="525" y="35" width="38" height="135" fill="currentColor" />
          <polygon points="525,35 544,15 563,35" fill="currentColor" />
          <line x1="544" y1="5" x2="544" y2="15" stroke="currentColor" strokeWidth="3" />
          <rect x="570" y="65" width="35" height="105" fill="currentColor" />
          <line x1="587" y1="40" x2="587" y2="65" stroke="currentColor" strokeWidth="2" />
          <rect x="620" y="85" width="50" height="85" fill="currentColor" />
          <rect x="665" y="105" width="30" height="65" fill="currentColor" />
          <rect x="690" y="75" width="55" height="95" fill="currentColor" />
          <rect x="740" y="90" width="35" height="80" fill="currentColor" />
          <rect x="770" y="65" width="45" height="105" fill="currentColor" />
          <polygon points="770,65 792.5,45 815,65" fill="currentColor" />
          <rect x="810" y="95" width="40" height="75" fill="currentColor" />
          <path
            d="M 870 160 Q 980 110 1120 50 L 1440 25 L 1440 200 L 870 200 Z"
            fill="currentColor"
          />
          <rect x="910" y="125" width="16" height="45" fill="currentColor" />
          <rect x="980" y="100" width="18" height="70" fill="currentColor" />
          <rect x="1070" y="75" width="20" height="95" fill="currentColor" />
          <rect x="1170" y="50" width="22" height="120" fill="currentColor" />
          <rect x="1280" y="35" width="24" height="135" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="pb-12 px-6 md:px-12 max-w-[1400px] mx-auto relative z-20 -mt-16 sm:-mt-24 md:-mt-36">

        {/* Hero Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.12] hover:border-white/40 transition-all duration-500"
          >
            <div className="relative z-10">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-[0.2em] mb-6 w-fit shadow-lg shadow-white/10"
              >
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span>Available for Immediate Kickoff</span>
              </motion.div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6 drop-shadow-sm text-white">
                <span style={{ color: '#ffffff' }}>Let’s Build</span>
                <br />
                <span className="text-zinc-300 underline decoration-white decoration-4 underline-offset-8">
                  Something Extraordinary.
                </span>
              </h2>

              <p className="text-zinc-200 text-sm md:text-base max-w-lg leading-relaxed font-normal">
                Operating directly out of Kerala's tech corridor. Whether you are aiming for academic distinction or launching an enterprise-grade MVP, we turn complex blueprints into live reality.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 relative z-10 flex flex-wrap gap-4 items-center justify-between">

              <a
                href="mailto:teknaratech@gmail.com?subject=Project Inquiry - TEKNARA"
                className="inline-flex items-center gap-3 px-7 py-4 bg-white text-black rounded-xl text-xs font-black uppercase tracking-wider hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 shadow-xl"
              >
                <span>Start Project Dialog</span>
                <ArrowUpRight size={18} />
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl border border-white/30 bg-black/60 backdrop-blur-md text-zinc-200 hover:text-white hover:border-white hover:bg-black transition-all text-xs font-mono flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-400" />
                    <span className="text-white font-bold">Copied Email!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-zinc-400" />
                    <span>teknaratech@gmail.com</span>
                  </>
                )}
              </motion.button>

            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-3 border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col h-[380px] lg:h-auto min-h-[340px] relative overflow-hidden group hover:bg-white/[0.12] hover:border-white/40 transition-all duration-500"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 flex flex-col">

              <iframe
                title="TEKNARA Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125533.82885913459!2d76.152431!3d10.5276416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed42d1bb%3A0x82e4e08eddd4923e!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full grayscale contrast-200 invert-[.90] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out border-0 min-h-[280px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-xl border border-white/30 flex items-center gap-2.5 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <MapPin size={14} className="text-white" />
                <span>Thrissur, Kerala Hub</span>
              </div>

              <a
                href="https://maps.google.com/?q=Thrissur,+Kerala"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 bg-white text-black text-[11px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-zinc-200 transition-all transform hover:scale-105"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>

            </div>
          </motion.div>

        </div>

        {/* Center Circular Social Badges */}
        <div className="flex flex-col items-center justify-center text-center my-12 pb-8">
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/teknara-it-solutions-4aa986418"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors"
            >
              <LinkedInIcon />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/919061263977"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp 9061263977"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors"
            >
              <WhatsAppIcon />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/916282584076"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp 6282584076"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors"
            >
              <WhatsAppIcon />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:teknaratech@gmail.com"
              aria-label="Email"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors"
            >
              <AtSign size={20} />
            </motion.a>

            {/* Chat Icon linked to your floating chatbot */}
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="#chat"
              onClick={(e) => {
                e.preventDefault();

                const botTrigger =
                  document.querySelector('.fixed.bottom-6.right-6') ||
                  document.querySelector('[class*="chatbot"]') ||
                  document.querySelector('button[aria-label*="chat"]');

                if (botTrigger) {
                  const clickable =
                    botTrigger.querySelector('button') ||
                    botTrigger.firstElementChild ||
                    botTrigger;

                  clickable.click();
                }
              }}
              aria-label="Live Chat"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <MessageCircle size={20} />
            </motion.a>

          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="relative z-10 bg-white/[0.06] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.6)] my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

            {/* TEKNARA Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/logo.png"
                    alt="TEKNARA IT SOLUTIONS Logo"
                    className="h-16 w-16 object-contain"
                  />

                  <span className="font-black text-2xl tracking-tight text-white">
                    TEKNARA
                  </span>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-white">
                  INNOVATE • INTEGRATE • ELEVATE
                </p>

                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                  Architecting modern digital solutions for students, early startups, and growing enterprises with structural integrity and clean-code principles.
                </p>

              </div>
            </div>

            {/* Get In Touch */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="font-bold text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-2 !text-white">
                Get In Touch
              </h4>

              <div className="flex flex-col gap-3.5 text-xs md:text-sm text-white">

                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={16}
                    className="text-white shrink-0 mt-0.5"
                  />
                  <span>Thrissur, Kerala, India</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail
                    size={16}
                    className="text-white shrink-0"
                  />

                  <a
                    href="mailto:teknaratech@gmail.com"
                    className="hover:text-white underline underline-offset-4 transition-colors"
                  >
                    teknaratech@gmail.com
                  </a>
                </div>

                {/* WhatsApp Number 1 */}
                <a
                  href="https://wa.me/919061263977"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors"
                  aria-label="WhatsApp 9061263977"
                >
                  <WhatsAppIcon />
                  <span>9061263977</span>
                </a>

                {/* WhatsApp Number 2 */}
                <a
                  href="https://wa.me/916282584076"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors"
                  aria-label="WhatsApp 6282584076"
                >
                  <WhatsAppIcon />
                  <span>6282584076</span>
                </a>

                <div className="flex items-center gap-2.5">
                  <MessageSquare
                    size={16}
                    className="text-white shrink-0"
                  />
                  <span className="font-medium">
                    Direct Chat / Mail Ready
                  </span>
                </div>

              </div>
            </div>

            {/* Project Inquiries */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="font-bold text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-2 !text-white">
                Project Inquiries
              </h4>

              <p className="text-white text-xs md:text-sm leading-relaxed font-light">
                Are you a student preparing for Capstone submission, or a startup looking to deploy a high-speed MVP?
              </p>

              <div className="pt-2">
                <a
                  href="mailto:teknaratech@gmail.com?subject=Project Inquiry - TEKNARA"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:underline underline-offset-4 uppercase tracking-wider"
                >
                  <span>Direct Mailbox</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-medium uppercase tracking-widest text-center relative z-20">

          <div>
            <span>
              © {currentYear} TEKNARA IT SOLUTIONS. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>

            <span>|</span>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
