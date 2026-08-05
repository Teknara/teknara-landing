import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Plus } from 'lucide-react';

const techItems = [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Core" },
  { name: "AI / ML", category: "Intelligence" },
  { name: "Express", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "Firebase", category: "Cloud" },
  { name: "Django", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Cloud", category: "Infrastructure" },
  { name: "Cyber", category: "Security" },
  { name: "UI / UX", category: "Design" },
];

const carouselItems = [
  {
    tag: "Intelligence",
    title: "AI & Machine Learning",
    desc: "NLP, computer vision, model deployment.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
  },
  {
    tag: "Engineering",
    title: "Full-stack Engineering",
    desc: "Python, MERN, Flutter ecosystem integration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  },
  {
    tag: "Defense",
    title: "Security & Auditing",
    desc: "Hardening, penetration testing, best practices.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    tag: "Insights",
    title: "Data & Analytics",
    desc: "Pipelines, warehousing and BI execution.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  },
  {
    tag: "Infrastructure",
    title: "Cloud-native Systems",
    desc: "Containers, serverless architectures, DevOps.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop",
  },
  {
    tag: "Experience",
    title: "Product Design",
    desc: "Intuitive, high-accessibility UI/UX interfaces.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
  }
];

export default function ProjectDomains() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x / 30);
    mouseY.set(y / 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const backgroundX = useTransform(mouseX, (val) => val * -0.5);
  const backgroundY = useTransform(mouseY, (val) => val * -0.5);
  const cardTiltX = useTransform(mouseY, (val) => val * 0.8);
  const cardTiltY = useTransform(mouseX, (val) => val * -0.8);

  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 2200);

    return () => clearInterval(autoPlayInterval);
  }, []);

  const activeTechIndex = activeIndex % techItems.length;
  const activeCardIndex = activeIndex % carouselItems.length;

  const getCardStyle = (index) => {
    const total = carouselItems.length;
    let offset = (index - activeCardIndex) % total;

    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    if (offset === 0) {
      return { x: 0, scale: 1, zIndex: 30, opacity: 1, rotateY: 0 };
    } else if (offset === 1) {
      return { x: 130, scale: 0.85, zIndex: 20, opacity: 0.75, rotateY: -8 };
    } else if (offset === -1) {
      return { x: -130, scale: 0.85, zIndex: 20, opacity: 0.75, rotateY: 8 };
    } else {
      return { x: 0, scale: 0.6, zIndex: 10, opacity: 0, rotateY: 0 };
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="domains"
      className="relative min-h-screen py-12 px-4 md:px-12 flex flex-col justify-center overflow-hidden bg-black"
      style={{ perspective: 1400 }}
    >
      {/* DIAGONAL SPLIT BACKGROUND */}
      <div
        className="absolute inset-0 bg-white pointer-events-none z-0 transition-all duration-700"
        style={{
          clipPath: 'polygon(0 0, 44% 0, 56% 100%, 0 100%)'
        }}
      />

      {/* BACKGROUND AMBIENT GLOW */}
      <motion.div
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-black/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-white/5 blur-3xl" />
      </motion.div>

      <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col justify-center my-auto">

        {/* TOP SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/20 bg-white/80 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase mb-3 shadow-sm text-black">
            <Sparkles size={12} className="text-zinc-800" />
            <span>ENTERPRISE ECOSYSTEM</span>
          </div>

          {/* High-Contrast Split Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-black">Software </span>
            <span className="text-white">Development &</span>
            <br className="hidden sm:inline" />
            <span className="font-light">
              <span className="text-black">Custom </span>
              <span className="text-white">AI Solutions</span>
            </span>
          </h2>
        </motion.div>

        {/* TWO-COLUMN MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-center">

          {/* LEFT COLUMN: Tech Stack Menu */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6 h-[380px] sm:h-[420px] relative">

            <div className="absolute top-0 left-0 text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
              // DEVELOPMENT STACK
            </div>

            <div className="relative w-full h-full flex items-center">
              {techItems.map((item, index) => {
                const offset = index - activeTechIndex;
                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;

                const spacing = 72;
                const maxVisibleOffset = 3;

                if (absOffset > maxVisibleOffset) return null;

                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={false}
                    animate={{
                      y: offset * spacing,
                      scale: isCenter ? 1 : 0.88 - (absOffset * 0.05),
                      opacity: isCenter ? 1 : Math.max(0.2, 0.65 - (absOffset * 0.15)),
                      filter: `blur(${isCenter ? 0 : absOffset * 1.5}px)`,
                      zIndex: 50 - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    className="absolute left-0 w-full flex items-center pointer-events-none"
                    style={{ originX: 0 }}
                  >
                    <motion.div
                      className="flex items-center gap-3 sm:gap-4"
                      animate={{ x: isCenter ? 0 : -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-6 flex justify-end overflow-hidden">
                        <motion.span
                          animate={{
                            opacity: isCenter ? 1 : 0,
                            x: isCenter ? 0 : -15
                          }}
                          className="text-black text-2xl sm:text-3xl font-light"
                        >
                          →
                        </motion.span>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-colors duration-300 ${isCenter ? 'text-black opacity-100' : 'text-zinc-400 opacity-70'
                          }`}>
                          {item.name}
                        </span>

                        {isCenter && (
                          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 bg-zinc-200/80 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Card Carousel */}
          <motion.div
            style={{ rotateX: cardTiltX, rotateY: cardTiltY }}
            className="lg:col-span-7 relative h-[420px] sm:h-[460px] flex items-center justify-center perspective-[1200px]"
          >
            <div className="relative w-full h-full flex items-center justify-center [isolation:isolate]">
              {carouselItems.map((item, index) => {
                const styles = getCardStyle(index);

                return (
                  <motion.div
                    key={`card-${index}`}
                    initial={false}
                    animate={{
                      x: styles.x,
                      scale: styles.scale,
                      zIndex: styles.zIndex,
                      opacity: styles.opacity,
                      rotateY: styles.rotateY
                    }}
                    transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.8 }}
                    className="absolute inset-0 m-auto w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] rounded-[28px] p-5 flex flex-col justify-between overflow-hidden bg-white shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-zinc-200/80"
                  >
                    <div className="flex items-center justify-between z-20">
                      <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-900 shadow-sm">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">
                        0{index + 1} / 0{carouselItems.length}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center z-10 w-full relative my-2">
                      <img
                        src={item.image}
                        alt="Software Development Project Domains by TEKNARA IT SOLUTIONS"
                        className="w-40 h-40 sm:w-44 sm:h-44 object-cover rounded-2xl shadow-md transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="relative z-20 flex justify-between items-end w-full">
                      <div className="bg-zinc-100/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-sm border border-zinc-200/60 max-w-[78%]">
                        <h4 className="text-[12px] font-bold text-zinc-900 tracking-tight leading-tight mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-medium text-zinc-500 leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <button className="w-10 h-10 flex-shrink-0 bg-zinc-900 text-white rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:bg-zinc-800 transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
