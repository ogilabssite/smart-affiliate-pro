import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

const HeroBanner = ({ onExplore }) => {
  const containerRef = useRef(null);

  // Apple-style Smooth Spring Physics
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Huawei Depth Parallax Effect (pergeseran halus)
    x.set((mouseX - centerX) / 25);
    y.set((mouseY - centerY) / 25);
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-[500px] md:h-[650px] rounded-[60px] overflow-hidden mb-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group bg-black"
    >
      {/* BACKGROUND LAYER: Parallax Image */}
      <motion.div 
        style={{ x, y, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600" 
          alt="Luxury" 
          className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
        {/* Vogue Noir Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 via-transparent to-transparent" />
      </motion.div>

      {/* STRIPE DECORATION: Animated Path (Bernyawa) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M-100,500 C100,400 300,600 500,500 C700,400 900,600 1100,500"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 z-20 p-12 md:p-24 flex flex-col justify-end items-start pointer-events-none">
        
        {/* Huawei Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-5 py-2 rounded-full border border-white/10 mb-8"
        >
          <Sparkles size={14} className="text-brand-blue animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80">Edition 2026</span>
        </motion.div>

        {/* Vogue Typography: Staggered Reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-7xl md:text-[120px] font-display font-black text-white italic tracking-tighter leading-[0.8]"
          >
            BEYOND <br />
            <span className="text-brand-blue not-italic font-sans tracking-[-0.07em]">LIMITS.</span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/40 text-sm md:text-base max-w-md font-medium mb-12 leading-relaxed"
        >
          Discover a curated collection where high-end aesthetics meet functional perfection. 
          Your journey to premium lifestyle starts here.
        </motion.p>

        {/* Apple-Stripe Hybrid Button (Z-Index Fixed) */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onExplore();
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto group relative bg-white text-black px-12 py-6 rounded-full overflow-hidden transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        >
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-brand-blue translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
          
          <div className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-500">
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Start Exploring</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
          </div>
        </motion.button>
      </div>

      {/* Huawei Breathing Aura */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none" 
      />
    </motion.div>
  );
};

export default HeroBanner;