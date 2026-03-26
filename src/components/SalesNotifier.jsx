import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap, CheckCircle } from 'lucide-react';

const SalesNotifier = () => {
  const [visible, setVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);

  // Data dummy penjualan (Bisa diganti data asli dari database nanti)
  const salesData = [
    { name: "Andi dari Jakarta", product: "Magic Keyboard 3", time: "2 menit yang lalu" },
    { name: "Siti dari Surabaya", product: "iPhone 15 Pro Case", time: "5 menit yang lalu" },
    { name: "Budi dari Bandung", product: "Ultra Wide Monitor", time: "Baru saja" },
    { name: "Rizky dari Medan", product: "Sony WH-1000XM5", time: "1 menit yang lalu" }
  ];

  useEffect(() => {
    const showRandomSale = () => {
      const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
      setCurrentSale(randomSale);
      setVisible(true);

      // Sembunyikan setelah 5 detik
      setTimeout(() => setVisible(false), 5000);
    };

    // Munculkan pertama kali setelah 3 detik
    const initialTimeout = setTimeout(showRandomSale, 3000);

    // Interval acak antara 15-25 detik
    const interval = setInterval(showRandomSale, Math.floor(Math.random() * 10000) + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && currentSale && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-8 left-8 z-[99999] pointer-events-none"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 rounded-[24px] flex items-center gap-4 max-w-sm group">
            {/* Animated Icon Container */}
            <div className="relative">
              <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white relative z-10 overflow-hidden">
                <ShoppingBag size={20} className="animate-bounce" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" 
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-20" />
            </div>

            {/* Sales Content */}
            <div className="flex flex-col pr-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue flex items-center gap-1">
                  <Zap size={10} fill="currentColor" /> Verified Purchase
                </span>
              </div>
              <h5 className="text-[13px] font-bold text-black leading-tight">
                {currentSale.name} <span className="font-normal text-gray-500 italic">baru saja membeli</span>
              </h5>
              <p className="text-[12px] font-display font-black tracking-tight text-gray-400 uppercase mt-0.5">
                {currentSale.product}
              </p>
              <span className="text-[9px] text-gray-300 font-medium mt-1 uppercase tracking-tighter">
                {currentSale.time}
              </span>
            </div>

            {/* Subtle Stripe-style line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[3px] bg-brand-blue/20 rounded-t-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalesNotifier;