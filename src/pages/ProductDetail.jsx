import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ShoppingBag, Share2, ShieldCheck, Clock } from 'lucide-react';

const ProductDetail = ({ product, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ jam: 0, menit: 45, detik: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.detik > 0) return { ...prev, detik: prev.detik - 1 };
        if (prev.menit > 0) return { ...prev, menit: prev.menit - 1, detik: 59 };
        return { ...prev, detik: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) return null;

  const format = (num) => String(num).padStart(2, '0');
  const isShopee = product.marketplace.toLowerCase() === 'shopee';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-vogue-black/40 backdrop-blur-md p-0 sm:p-4"
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-system-bg w-full max-w-lg rounded-t-[32px] sm:rounded-apple-xl overflow-hidden shadow-floating relative max-h-[95vh] overflow-y-auto no-scrollbar"
      >
        {/* Apple-Style Close Handle (Mobile) */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 sm:hidden" onClick={onClose} />

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-premium text-vogue-black">
            <Share2 size={18} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="bg-vogue-black text-white p-2.5 rounded-full shadow-premium"
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Image Section with Vogue Gradient */}
        <div className="relative aspect-square sm:aspect-video overflow-hidden bg-white">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-system-bg via-transparent to-transparent opacity-60" />
          
          {/* Huawei-Style Flash Sale Banner */}
          {product.discount && (
            <div className="absolute bottom-0 left-0 right-0 bg-vogue-black text-white px-6 py-3 flex items-center justify-between overflow-hidden">
              <motion.div 
                animate={{ x: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 4 }}
                className="flex items-center gap-2"
              >
                <Zap size={16} className="text-brand-orange fill-brand-orange" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Priority Deal</span>
              </motion.div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-vogue-gray" />
                <div className="flex gap-1.5">
                  {[timeLeft.jam, timeLeft.menit, timeLeft.detik].map((t, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded text-[12px] font-mono font-bold">
                      {format(t)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-8 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest text-white ${isShopee ? 'bg-brand-orange' : 'bg-brand-blue'}`}>
                {product.marketplace}
              </span>
              <span className="bg-white border border-gray-200 text-vogue-gray text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {product.category}
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-vogue-black tracking-tighter leading-[0.9] italic lowercase">
              {product.name}
            </h2>
          </div>

          {/* Pricing: Vogue High Contrast */}
          <div className="flex items-end gap-4">
            <p className="text-4xl font-display font-black text-vogue-black tracking-tighter">
              {product.price}
            </p>
            {product.discount && (
              <div className="pb-1">
                <span className="text-sm text-vogue-gray line-through decoration-brand-orange block">
                  Rp {(parseInt(product.price.replace(/\D/g, '')) * 1.25).toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-black text-brand-orange uppercase">
                  Save {product.discount}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Description: Apple Cleanliness */}
          <div className="bg-white rounded-apple-md p-5 shadow-premium border border-gray-100">
             <div className="flex items-center gap-2 mb-2 text-vogue-black">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Editor's Note</span>
             </div>
             <p className="text-vogue-gray text-sm leading-relaxed font-medium italic font-serif">
               "{product.desc}"
             </p>
          </div>

          {/* Call to Action: Stripe-Style Massive Button */}
          <div className="pt-4">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 w-full text-white font-black py-5 rounded-apple-lg shadow-floating transition-all ${
                isShopee ? 'bg-brand-orange shadow-orange-200' : 'bg-brand-blue shadow-blue-200'
              }`}
            >
              <ShoppingBag size={20} />
              <span className="uppercase tracking-[0.2em] text-xs">Checkout via {product.marketplace}</span>
            </motion.a>
            
            <p className="text-center text-[9px] text-vogue-gray mt-5 font-black uppercase tracking-[0.3em] opacity-50">
               Stock Priority: <span className="text-brand-orange animate-pulse">High Demand</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;