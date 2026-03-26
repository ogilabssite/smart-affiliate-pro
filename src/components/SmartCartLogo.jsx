import React from 'react';
import { motion } from 'framer-motion';

const SmartCartLogo = ({ className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
    >
      {/* Container Ikon: Apple-Huawei Glass Style */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-vogue-black rounded-apple-sm flex items-center justify-center shadow-premium overflow-hidden relative"
        >
          {/* Efek Kilatan Stripe saat Hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-brand-blue/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          />
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5 relative z-10"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </motion.div>
        
        {/* Dekorasi Huawei Dot */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-orange border-2 border-system-bg rounded-full shadow-sm animate-pulse" />
      </div>

      {/* Teks Logo: Vogue Typography */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-display font-black tracking-tighter text-vogue-black italic lowercase">
          Smart<span className="text-brand-blue not-italic">Cart</span>
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[7px] font-black tracking-[0.5em] text-vogue-gray uppercase opacity-60">
            Premium Selection
          </span>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-1 bg-brand-blue rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SmartCartLogo;