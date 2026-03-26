import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, ShoppingBag, Bell } from 'lucide-react';

const Navbar = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek Apple: Deteksi scroll untuk mengubah opacity navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        isScrolled 
        ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-3 shadow-glass-shadow' 
        : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* LOGO: Vogue High-Contrast Style */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <div className="relative w-10 h-10 bg-vogue-black rounded-apple-sm flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95 shadow-premium">
            <motion.div 
              className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            />
            <ShoppingBag className="relative z-10 text-white w-5 h-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-2xl tracking-tighter text-vogue-black uppercase italic">
              Smart<span className="text-brand-blue not-italic">Cart</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.4em] text-vogue-gray uppercase">Collection</span>
          </div>
        </motion.div>

        {/* SEARCH: Stripe-Style Expanding Search */}
        <motion.div 
          className="relative flex-1 max-w-lg hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="group relative">
            <input
              type="text"
              placeholder="Search aesthetics..."
              className="w-full bg-white/50 border border-gray-100 rounded-full py-2.5 pl-11 pr-4 focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all duration-500 text-sm outline-none shadow-premium placeholder:italic placeholder:text-vogue-gray/40"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-2.5 text-vogue-gray group-focus-within:text-brand-blue transition-colors duration-300" size={18} />
          </div>
        </motion.div>

        {/* ACTIONS: Huawei-Style Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-2.5 text-vogue-black hover:bg-white rounded-full transition-all hover:shadow-premium relative"
          >
            <Bell size={20} strokeWidth={2.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-white animate-pulse" />
          </motion.button>

          {/* Menu Button (Vogue Black) */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-vogue-black text-white px-4 py-2 rounded-full shadow-floating group"
          >
            <Menu size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Explore</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;