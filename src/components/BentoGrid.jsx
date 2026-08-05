import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Users, Sparkles, Clock,
  CheckCircle2, Zap, ArrowUpRight, Cpu, Terminal,
  Activity, Layers, GitCommit, ChevronDown, Server,
  Code2, Database, Wifi, BarChart3, Play, Check, Share2, Box
} from 'lucide-react';

// ==========================================
// DYNAMIC MOUSE PARTICLES CANVAS (BLACK / WHITE)
// ==========================================
const InteractiveParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const updateBounds = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    const particles = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 12,
            y: mouseY + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5 - 0.5,
            size: Math.random() * 4 + 1.5,
            alpha: 0.9,
            maxLife: Math.random() * 35 + 25,
            life: 0,
            shape: Math.random() > 0.4 ? 'circle' : 'square',
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const splitY = canvas.height * 0.42 + (p.x / canvas.width) * (canvas.height * 0.33);
        const isDarkSpace = p.y >= splitY;
        const colorRgb = isDarkSpace ? '255, 255, 255' : '0, 0, 0';

        ctx.save();
        ctx.fillStyle = `rgba(${colorRgb}, ${Math.max(0, p.alpha)})`;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size * 1.5, p.size * 1.5);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-15 w-full h-full"
    />
  );
};

// ==========================================
// LOW-POLY GEOMETRIC BACKGROUND MESH
// ==========================================
const LowPolyGeometricMesh = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
    <motion.svg
      className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-90 drop-shadow-2xl"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [-12, 12, -12], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
    >
      <polygon points="400,150 520,280 380,320" fill="#27272a" stroke="#ffffff" strokeWidth="0.5" />
      <polygon points="520,280 650,220 580,360" fill="#3f3f46" stroke="#ffffff" strokeWidth="0.5" />
      <polygon points="380,320 580,360 460,480" fill="#18181b" stroke="#ffffff" strokeWidth="0.5" />
      <polygon points="580,360 700,420 560,520" fill="#52525b" stroke="#ffffff" strokeWidth="0.5" />
      <polygon points="460,480 560,520 400,620" fill="#09090b" stroke="#ffffff" strokeWidth="0.5" />

      <polygon points="400,150 300,240 380,320" fill="#e4e4e7" fillOpacity="0.85" stroke="#18181b" strokeWidth="0.5" />
      <polygon points="300,240 220,380 380,320" fill="#f4f4f5" fillOpacity="0.95" stroke="#18181b" strokeWidth="0.5" />
      <polygon points="380,320 220,380 340,500" fill="#d4d4d8" fillOpacity="0.8" stroke="#18181b" strokeWidth="0.5" />
      <polygon points="340,500 460,480 400,620" fill="#a1a1aa" fillOpacity="0.7" stroke="#18181b" strokeWidth="0.5" />

      <polygon points="260,180 310,120 340,200" fill="none" stroke="#000000" strokeWidth="1.5" />
      <polygon points="620,480 690,560 610,580" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <polygon points="180,450 240,520 160,540" fill="none" stroke="#ffffff" strokeWidth="1.5" />

      <line x1="280" y1="200" x2="160" y2="280" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="560" y1="520" x2="680" y2="600" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
    </motion.svg>
  </div>
);

// ==========================================
// CARD 1: REAL-LIFE CLOUD ARCHITECTURE VISUAL
// ==========================================
const CollaborativeArchVisual = () => (
  <div className="relative w-full bg-zinc-950 text-white rounded-2xl border border-black/20 p-5 overflow-hidden shadow-inner my-2">
    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-4 pb-2 border-b border-white/10">
      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
        SYSTEM_CANVAS // LIVE_SYNC
      </span>
      <span>US-EAST-CLUSTER</span>
    </div>

    <div className="relative flex justify-between items-center px-2 py-4">
      <div className="flex flex-col items-center gap-2 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 flex items-center justify-center shadow-lg text-white"
        >
          <Code2 size={20} />
        </motion.div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">Client_App</span>
      </div>

      <div className="flex-1 h-[1px] bg-white/20 relative mx-2">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl border-2 border-zinc-400 font-bold"
        >
          <Share2 size={24} />
        </motion.div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-white font-black bg-zinc-800 px-2 py-0.5 rounded">API_Gateway</span>
      </div>

      <div className="flex-1 h-[1px] bg-white/20 relative mx-2">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 flex items-center justify-center shadow-lg text-emerald-400"
        >
          <Database size={20} />
        </motion.div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">AI_Engine</span>
      </div>
    </div>
  </div>
);

// ==========================================
// CARD 2: REAL-LIFE TELEMETRY & SERVER MONITOR
// ==========================================
const LiveMetricsTelemetry = () => (
  <div className="w-full bg-black/60 rounded-2xl border border-white/15 p-4 mb-6 font-mono text-xs">
    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-zinc-400">
      <span className="flex items-center gap-2 text-white font-bold text-[11px]" style={{ color: '#ffffff' }}>
        <Activity size={14} className="text-emerald-400 animate-pulse" /> LIVE TELEMETRY
      </span>
      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
        99.99% UPTIME
      </span>
    </div>

    <div className="h-16 w-full relative flex items-end justify-between px-1 mb-2 overflow-hidden">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0,30 Q 20,10 40,25 T 80,15 T 100,20 L 100,40 L 0,40 Z"
          fill="url(#gradient)"
          animate={{
            d: [
              "M 0,30 Q 20,10 40,25 T 80,15 T 100,20 L 100,40 L 0,40 Z",
              "M 0,25 Q 25,35 50,15 T 75,25 T 100,10 L 100,40 L 0,40 Z",
              "M 0,30 Q 20,10 40,25 T 80,15 T 100,20 L 100,40 L 0,40 Z"
            ]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0,30 Q 20,10 40,25 T 80,15 T 100,20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          animate={{
            d: [
              "M 0,30 Q 20,10 40,25 T 80,15 T 100,20",
              "M 0,25 Q 25,35 50,15 T 75,25 T 100,10",
              "M 0,30 Q 20,10 40,25 T 80,15 T 100,20"
            ]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px]">
      <div>
        <div className="text-zinc-500 font-bold">LATENCY</div>
        <div className="text-white font-black mt-0.5" style={{ color: '#ffffff' }}>12ms</div>
      </div>
      <div>
        <div className="text-zinc-500 font-bold">REQ/SEC</div>
        <div className="text-white font-black mt-0.5" style={{ color: '#ffffff' }}>4,820</div>
      </div>
      <div>
        <div className="text-zinc-500 font-bold">ERRORS</div>
        <div className="text-emerald-400 font-black mt-0.5">0.00%</div>
      </div>
    </div>
  </div>
);

// ==========================================
// CARD 3: REAL-LIFE CI/CD TERMINAL & PIPELINE
// ==========================================
const CiCdTerminalVisual = () => {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "[11:10:48] Applying neural weight quantization... OK",
    "[11:10:49] Running unit & integration tests... 42 passed",
    "[11:10:50] Bundling microservices for edge deploy...",
    "[11:10:51] ✓ Build successful. Deploying to global CDN..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black/80 rounded-2xl border border-white/20 p-5 flex flex-col gap-4 font-mono shadow-xl">
      <div className="flex items-center justify-between text-xs pb-3 border-b border-white/15">
        <span className="flex items-center gap-2 text-white font-bold" style={{ color: '#ffffff' }}>
          <GitCommit size={16} className="text-white" style={{ color: '#ffffff' }} /> DEPLOYMENT_PIPELINE
        </span>
        <span className="font-bold flex items-center gap-2 text-emerald-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          ACTIVE_BUILD
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { step: "1. LINT", val: "PASSED", status: "ok" },
          { step: "2. BUILD", val: "2.4s", status: "ok" },
          { step: "3. TEST", val: "100%", status: "ok" },
          { step: "4. DEPLOY", val: "LIVE", status: "active" }
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900 rounded-xl p-2.5 border border-white/10 text-center relative overflow-hidden">
            <div className="text-[10px] font-bold text-zinc-400">{item.step}</div>
            <div className="text-xs font-black mt-1 text-white flex items-center justify-center gap-1" style={{ color: '#ffffff' }}>
              {item.status === 'ok' ? <Check size={12} className="text-emerald-400" /> : <Play size={10} className="text-white animate-pulse" style={{ color: '#ffffff' }} />}
              {item.val}
            </div>
            {item.status === 'active' && (
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white w-full"
                animate={{ scaleX: [0, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 rounded-xl p-3 border border-white/10 text-[11px] text-zinc-300 font-mono relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/10 text-zinc-500 text-[9px]">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-2">bash - teknara-core</span>
        </div>
        <div className="h-6 flex items-center text-emerald-400 font-semibold truncate">
          <span className="text-zinc-500 mr-2">&gt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={logIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {logs[logIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CARD 4: REAL-LIFE NEURAL NETWORK ROUTER
// ==========================================
const NeuralRoutingVisual = () => (
  <div className="w-full bg-black/60 rounded-2xl border border-white/15 p-4 mb-6 font-mono">
    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
      <span className="text-white font-bold flex items-center gap-2" style={{ color: '#ffffff' }}>
        <Cpu size={14} className="text-white" style={{ color: '#ffffff' }} /> NEURAL_ROUTING_SYNAPSE
      </span>
      <span className="text-zinc-400 text-[10px]" style={{ color: '#e4e4e7' }}>3-LAYER DEEP MODEL</span>
    </div>

    <div className="flex items-center justify-between py-2 px-4 relative">
      <div className="flex flex-col gap-3 z-10">
        {[1, 2].map((n) => (
          <motion.div
            key={`in-${n}`}
            animate={{ scale: [1, 1.2, 1], borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.2)"] }}
            transition={{ repeat: Infinity, duration: 2, delay: n * 0.4 }}
            className="w-3.5 h-3.5 rounded-full bg-zinc-800 border-2 border-white/30"
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 z-10">
        {[1, 2, 3].map((n) => (
          <motion.div
            key={`hid-${n}`}
            animate={{ scale: [1, 1.3, 1], backgroundColor: ["#18181b", "#ffffff", "#18181b"] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: n * 0.3 }}
            className="w-4 h-4 rounded-full bg-zinc-900 border border-white/50 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
          />
        ))}
      </div>

      <div className="flex flex-col justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.25, 1], boxShadow: ["0 0 0px #10b981", "0 0 12px #10b981", "0 0 0px #10b981"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center"
        />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/15" strokeWidth="1">
        <line x1="20%" y1="30%" x2="50%" y2="20%" />
        <line x1="20%" y1="30%" x2="50%" y2="50%" />
        <line x1="20%" y1="70%" x2="50%" y2="50%" />
        <line x1="20%" y1="70%" x2="50%" y2="80%" />
        <line x1="50%" y1="20%" x2="80%" y2="50%" />
        <line x1="50%" y1="50%" x2="80%" y2="50%" />
        <line x1="50%" y1="80%" x2="80%" y2="50%" />
      </svg>
    </div>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function BentoGrid() {
  return (
    <div className="relative w-full overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 bg-zinc-200" />
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{
          clipPath: "polygon(0 42%, 100% 75%, 100% 100%, 0 100%)"
        }}
      />

      <InteractiveParticles />
      <LowPolyGeometricMesh />

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 py-20 space-y-24">
        <section className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Teknara Architecture</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-black">
              There's a better way to build high-impact tech.
            </h1>

            <p className="text-base md:text-lg font-medium leading-relaxed text-zinc-800">
              Eliminating friction between complex engineering demands and production execution for ambitious teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* CARD 1: TARGET DEMOGRAPHICS */}
            <motion.div
              className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl border border-black/15 p-8 shadow-2xl flex flex-col justify-between"
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              animate={{
                rotateX: [-1.5, 1.5, -1.5],
                rotateY: [1.5, -1.5, 1.5],
                y: [-6, 6, -6]
              }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              whileHover={{ scale: 1.01, rotateX: 0, rotateY: 0 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-black">Target Demographics</span>
                  <span className="text-[11px] font-bold px-3 py-1 bg-black text-white rounded-full">Co-Creation</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-black">Engineered For Driven Builders</h3>
                <CollaborativeArchVisual />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {[
                  { title: "Academic Pioneers", desc: "Distinctive capstone builds." },
                  { title: "Early Startups", desc: "Rapid MVP deployment." },
                  { title: "Enterprises", desc: "Custom automated workflows." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-zinc-100 p-4 rounded-2xl border border-black/10 shadow-sm"
                    whileHover={{ y: -3, scale: 1.02 }}
                  >
                    <h4 className="font-bold text-xs mb-1 text-black">{item.title}</h4>
                    <p className="text-[11px] text-zinc-700">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2: METRICS & TELEMETRY */}
            <motion.div
              className="lg:col-span-5 bg-zinc-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between border border-white/20"
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              animate={{
                rotateX: [1.5, -1.5, 1.5],
                rotateY: [-2, 2, -2],
                y: [6, -6, 6]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.01, rotateX: 0, rotateY: 0 }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Metrics</span>
                <h3 className="text-2xl md:text-3xl font-black mt-2 mb-4 text-white">Proven Launchpad</h3>
                <LiveMetricsTelemetry />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "50+", desc: "High-Impact Builds" },
                  { val: "100%", desc: "Compilation Record" },
                  { val: "24/7", desc: "DevOps Support" },
                  { val: "5.0★", desc: "Partner Approval" }
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-black border border-white/15"
                    whileHover={{ scale: 1.04 }}
                  >
                    <h4 className="font-black text-xl text-white mb-0.5" style={{ color: '#ffffff' }}>{metric.val}</h4>
                    <p className="text-[9px] uppercase font-bold text-zinc-400">{metric.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="flex justify-center py-6">
          <motion.div
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-black"
            animate={{ y: [0, 8, 0], scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ChevronDown size={22} />
          </motion.div>
        </div>

        <section className="space-y-8 pt-6 text-white">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] font-black uppercase tracking-widest text-white" style={{ color: '#ffffff' }}>
              Session 02
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white" style={{ color: '#ffffff' }}>
              Architecture & Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* CARD 3: DELIVERY STANDARDS & CI/CD */}
            <motion.div
              className="lg:col-span-6 bg-zinc-950/95 rounded-3xl border border-white/20 p-8 shadow-2xl"
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              animate={{
                rotateX: [-1.8, 1.8, -1.8],
                rotateY: [-1.2, 1.2, -1.2],
                y: [-5, 5, -5]
              }}
              transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 0.2 }}
              whileHover={{ scale: 1.01, rotateX: 0, rotateY: 0 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest block mb-2 text-white" style={{ color: '#ffffff' }}>Delivery Standards</span>
              <h3 className="text-2xl font-black mb-6 text-white" style={{ color: '#ffffff' }}>Bulletproof Execution Protocol</h3>
              <CiCdTerminalVisual />
            </motion.div>

            {/* CARD 4: STACK DOMAINS & NEURAL ROUTING */}
            <motion.div
              className="lg:col-span-6 bg-zinc-950/95 rounded-3xl border border-white/20 p-8 shadow-2xl flex flex-col justify-between"
              style={{ perspective: 1000, transformStyle: "preserve-3d", color: '#ffffff' }}
              animate={{
                rotateX: [1.8, -1.8, 1.8],
                rotateY: [1.2, -1.2, 1.2],
                y: [5, -5, 5]
              }}
              transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 0.7 }}
              whileHover={{ scale: 1.01, rotateX: 0, rotateY: 0 }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2 text-white" style={{ color: '#ffffff' }}>Stack Domains</span>
                <h3 className="text-2xl font-black mb-4 text-white" style={{ color: '#ffffff' }}>Next-Gen Systems</h3>
                <NeuralRoutingVisual />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  "AI/ML & Neural LLMs",
                  "Capstone Systems",
                  "High-Throughput APIs",
                  "Full-Stack Web Apps",
                  "Mobile Cross-Platform",
                  "Microservices & Cloud"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl border border-white/15 bg-black"
                    style={{ color: '#ffffff' }}
                    whileHover={{ x: 4, scale: 1.02 }}
                  >
                    <Terminal size={15} className="text-white shrink-0" style={{ color: '#ffffff' }} />
                    <span className="text-xs font-semibold text-white" style={{ color: '#ffffff' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
