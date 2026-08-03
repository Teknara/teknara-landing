import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const presetQuestions = [
  {
    q: "What domains do you work in?",
    a: "We design and build projects in Python Full Stack (Django/Flask), MERN Stack, Flutter Mobile Development, and AI/Machine Learning systems."
  },
  {
    q: "Do you support academic submissions?",
    a: "Yes! We specialize in B.Tech, MCA, BCA, and IT major/minor final-year projects, guaranteeing full compilation, comprehensive code reviews, and structured documentation handovers."
  },
  {
    q: "How can we get started?",
    a: "It's simple: reach out to us at teknaratech@gmail.com or fill out the contact form below with your requirements. We'll set up a scoping call within 24 hours."
  },
  {
    q: "Where is TEKNARA located?",
    a: "Our core innovation team is based in Thrissur, Kerala, India. We deliver solutions globally and support local hands-on mentorship programs."
  }
];

// Interactive 3D Mini Robot with Animated Limbs & Body Walk Cycle
const WalkingRobotSVG = ({ className = "w-16 h-20" }) => (
  <svg viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Glossy White Head Gradient */}
      <radialGradient id="headGradient" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </radialGradient>

      {/* Visor Gradient */}
      <linearGradient id="visorGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>

      {/* Cyan Glow for Eyes */}
      <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* BACK LEG */}
    <motion.rect
      x="23" y="50" width="5" height="11" rx="2.5" fill="#64748B"
      style={{ transformOrigin: '25.5px 50px' }}
      animate={{ rotate: [-25, 25, -25] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />

    {/* BACK ARM */}
    <motion.rect
      x="17" y="36" width="4" height="12" rx="2" fill="#94A3B8"
      style={{ transformOrigin: '19px 36px' }}
      animate={{ rotate: [20, -20, 20] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />

    {/* HEAD & TORSO GROUP */}
    <motion.g
      animate={{ y: [0, -2, 0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
    >
      {/* Antenna Stem */}
      <line x1="32" y1="12" x2="32" y2="4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      {/* Antenna Tip Light */}
      <circle cx="32" cy="3" r="2.5" fill="#38BDF8" filter="url(#cyanGlow)" />

      {/* Head */}
      <rect x="14" y="10" width="36" height="28" rx="14" fill="url(#headGradient)" />

      {/* Visor Screen */}
      <rect x="20" y="17" width="24" height="15" rx="6" fill="url(#visorGradient)" />

      {/* Digital LED Eyes */}
      <g filter="url(#cyanGlow)">
        <rect x="24" y="21" width="1.5" height="7" rx="0.75" fill="#E0F2FE" />
        <rect x="27" y="21" width="1.5" height="7" rx="0.75" fill="#E0F2FE" />
        <rect x="29.5" y="22" width="1.5" height="5" rx="0.75" fill="#BAE6FD" />

        <rect x="33" y="22" width="1.5" height="5" rx="0.75" fill="#BAE6FD" />
        <rect x="35.5" y="21" width="1.5" height="7" rx="0.75" fill="#E0F2FE" />
        <rect x="38.5" y="21" width="1.5" height="7" rx="0.75" fill="#E0F2FE" />
      </g>

      {/* Torso Body */}
      <path d="M22 39C22 37 24 36 27 36H37C40 36 42 37 42 39V47C42 50 39 51 32 51C25 51 22 50 22 47V39Z" fill="url(#headGradient)" />
    </motion.g>

    {/* FRONT LEG */}
    <motion.rect
      x="36" y="50" width="5" height="11" rx="2.5" fill="#475569"
      style={{ transformOrigin: '38.5px 50px' }}
      animate={{ rotate: [25, -25, 25] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />

    {/* FRONT ARM */}
    <motion.rect
      x="43" y="36" width="4" height="12" rx="2" fill="#CBD5E1"
      style={{ transformOrigin: '45px 36px' }}
      animate={{ rotate: [-20, 20, -20] }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />
  </svg>
);

export default function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! Welcome to TEKNARA IT SOLUTIONS. I'm your digital project assistant. How can I help you design the future today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        if (!isOpen) {
          setIsVisible(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newUserMessage = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const matchedPreset = presetQuestions.find(pq => pq.q === text);
      const botReplyText = matchedPreset
        ? matchedPreset.a
        : `Thank you for your message! Our engineering team will review your query. Please email details to teknaratech@gmail.com or leave your details in the contact section below for a direct follow-up!`;

      const newBotMessage = {
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-800 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center p-1 border border-slate-600">
                    <WalkingRobotSVG className="w-full h-full" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-800"></span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-tight">TEKNARA Assistant</h4>
                  <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-xs md:text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-slate-700 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-700 rounded-bl-none border border-gray-200'
                    }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-[8px] text-right mt-1.5 font-medium ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-400'
                      }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-100 text-gray-400 rounded-2xl rounded-bl-none border border-gray-200 p-4 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets */}
            <div className="px-6 py-2 border-t border-gray-100 flex flex-wrap gap-1.5 max-h-[88px] overflow-y-auto bg-gray-50/50">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pq.q)}
                  className="text-[10px] font-bold text-gray-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-gray-200 rounded-full px-2.5 py-1 cursor-pointer transition-colors duration-200 shadow-2xs"
                >
                  {pq.q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 border-t border-gray-100 flex gap-2 bg-white"
            >
              <input
                type="text"
                placeholder="Ask about domains, projects..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow text-xs text-slate-900 border border-gray-200 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none rounded-xl px-4 py-2 bg-gray-50"
              />
              <button
                type="submit"
                className="p-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors duration-300 flex items-center justify-center cursor-pointer shadow-sm"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Walking Robot with Floating "Talk to me!" Text Bubble */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isOpen ? { opacity: 1, scale: 1, x: 0 } : {
              opacity: 1,
              scale: 1,
              x: [-20, 20, -20] // Paces across screen (Left <-> Right)
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              x: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
            }}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer relative drop-shadow-2xl hover:scale-105 transition-transform select-none flex flex-col items-center"
          >
            {/* "Talk to me!" Floating Bubble Above Robot */}
            {!isOpen && (
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg border border-slate-700 flex items-center gap-1.5 pointer-events-none z-10"
              >
                <span>Talk to me!</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                {/* Pointer Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
              </motion.div>
            )}

            {/* Toggle Content */}
            {isOpen ? (
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-2xl border border-slate-700">
                <X size={22} />
              </div>
            ) : (
              <div className="relative pt-2">
                {/* Floor Shadow */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/15 rounded-full blur-xs"></span>

                {/* Robot Graphic with Direction Flipping */}
                <motion.div
                  animate={{ scaleX: [-1, -1, 1, 1, -1] }}
                  transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.49, 0.5, 0.99, 1] }}
                >
                  <WalkingRobotSVG className="w-16 h-20 filter drop-shadow-md" />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}