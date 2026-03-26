import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, ChevronDown, ShoppingBag, Sparkles, Zap, ArrowUpRight, ShieldCheck, Star, Trophy, Globe, LayoutGrid } from 'lucide-react';
// Pastikan anda sudah membuat file productData.js atau menyatukannya di product.js
import { getProductDetail } from './productData'; 

const ExplorePage = ({ products, onClose, onSelectProduct }) => {
  const allDisplayProducts = useMemo(() => products, [products]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentProduct = allDisplayProducts[index];
  
  const AUTO_PLAY_DURATION = 7000; 

  // Mengambil data penjelasan otomatis
  const detail = getProductDetail(currentProduct?.name);

  const nextProduct = useCallback(() => {
    setIndex((prev) => (prev + 1) % allDisplayProducts.length);
  }, [allDisplayProducts.length]);

  const prevProduct = () => {
    setIndex((prev) => (prev - 1 + allDisplayProducts.length) % allDisplayProducts.length);
  };

  useEffect(() => {
    let interval;
    if (!isPaused && allDisplayProducts.length > 1) {
      interval = setInterval(nextProduct, AUTO_PLAY_DURATION);
    }
    return () => clearInterval(interval);
  }, [nextProduct, isPaused, allDisplayProducts.length]);

  if (!currentProduct) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-[#fafafa] text-black flex flex-col overflow-hidden font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. HUAWEI DYNAMIC AURA (Background bergerak hidup) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[80vw] h-[80vw] bg-brand-blue/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* 2. APPLE FLOATING NAVBAR */}
      <nav className="relative z-[100] px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/60 backdrop-blur-xl border border-black/5 rounded-full px-8 py-3 shadow-sm">
          <div className="flex items-center gap-4">
            <Trophy size={16} className="text-brand-blue" />
            <div className="h-4 w-[1px] bg-black/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">SmartCart Studio 2026</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Overview', 'Philosophy', 'Specs'].map((item) => (
              <span key={item} className="text-[9px] font-bold uppercase tracking-widest text-black/40 hover:text-black cursor-pointer transition-colors">{item}</span>
            ))}
          </div>

          <button onClick={onClose} className="flex items-center gap-3 group">
            <span className="text-[9px] font-black uppercase tracking-widest">Close</span>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-500">
              <X size={14} />
            </div>
          </button>
        </div>
      </nav>

      {/* 3. VOGUE MAIN LAYOUT */}
      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-10 grid md:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="md:col-span-5 space-y-8 order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentProduct.id}`}
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} className="text-brand-blue" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">{currentProduct.category}</span>
                </div>

                <h2 className="text-5xl md:text-[85px] font-display font-black leading-[0.85] tracking-tighter uppercase mb-6">
                  {currentProduct.name}
                </h2>

                <div className="flex items-center gap-6 mb-8">
                   <div className="flex flex-col">
                      <span className="text-5xl font-mono font-bold tracking-tighter">Rp {Number(currentProduct.price).toLocaleString()}</span>
                      {currentProduct.oldPrice && <span className="text-lg text-gray-300 line-through">Rp {Number(currentProduct.oldPrice).toLocaleString()}</span>}
                   </div>
                   <div className="h-12 w-[1px] bg-black/5" />
                   <div className="flex flex-col">
                      <div className="flex text-brand-blue mb-1"><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/></div>
                      <span className="text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap">Top Rated Choice</span>
                   </div>
                </div>

                <motion.button 
                  onClick={() => onSelectProduct(currentProduct)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="group relative bg-black text-white px-10 py-6 rounded-2xl flex items-center gap-6 overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-brand-blue -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">Cek Detail Produk</span>
                  <ArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 transition-transform" />
                </motion.button>

                {/* --- AUTOMATIC EXPLANATION SECTION (Bagian Bawah) --- */}
                <div className="mt-16 grid grid-cols-2 gap-8 border-t border-black/5 pt-10">
                   <div className="space-y-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue">Philosophy</span>
                      <p className="text-xs text-gray-500 font-serif italic leading-relaxed">"{detail.philosophy}"</p>
                   </div>
                   <div className="space-y-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Specifications</span>
                      <div className="space-y-1">
                        {Object.entries(detail.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-[10px] border-b border-black/[0.03] pb-1">
                            <span className="uppercase text-gray-400">{key}</span>
                            <span className="font-bold">{val}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: IMAGE CANVAS (Huawei Float) */}
          <div className="md:col-span-7 relative order-1 md:order-2">
             <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -15, filter: "blur(20px)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-square md:h-[600px] rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] group"
                >
                  <img src={currentProduct.imageUrl} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating Stripe Badges */}
                  <div className="absolute top-8 right-8 flex flex-col gap-2">
                     <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-black/5 flex items-center gap-2 shadow-sm">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span className="text-[9px] font-black uppercase">Official Store</span>
                     </div>
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </main>

      {/* 4. STRIPE-STYLE NAVIGATION FOOTER */}
      <footer className="relative z-50 w-full px-8 md:px-12 py-6 bg-white/80 backdrop-blur-md border-t border-black/5 flex justify-between items-center">
        <div className="flex items-center gap-8">
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">Catalogue index</span>
              <div className="flex gap-1.5">
                 {allDisplayProducts.map((_, i) => (
                   <motion.div 
                     key={i}
                     onClick={() => setIndex(i)}
                     animate={{ 
                       width: i === index ? 40 : 12, 
                       backgroundColor: i === index ? "#007AFF" : "#E5E5E5" 
                     }}
                     className="h-1.5 rounded-full cursor-pointer transition-all"
                   />
                 ))}
              </div>
           </div>
           <div className="hidden md:block h-8 w-[1px] bg-black/5" />
           <div className="hidden md:flex flex-col">
              <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">Current Story</span>
              <span className="text-[10px] font-mono font-bold italic text-brand-blue">{detail.story}</span>
           </div>
        </div>

        <div className="flex gap-3">
           <button onClick={prevProduct} className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronUp size={18} /></button>
           <button onClick={nextProduct} className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronDown size={18} /></button>
        </div>

        {/* Real-time Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-100">
           {!isPaused && (
             <motion.div 
               key={index}
               initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
               transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
               className="h-full bg-brand-blue origin-left shadow-[0_0_10px_#007AFF]"
             />
           )}
        </div>
      </footer>
    </motion.div>
  );
};

export default ExplorePage;