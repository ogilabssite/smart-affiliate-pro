import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Zap, ChevronRight, MapPin } from 'lucide-react';

const ProductCard = ({ product, onOpen }) => {
  const isShopee = product.marketplace?.toLowerCase() === 'shopee';

  const getOriginalPrice = (priceStr) => {
    const num = parseInt(priceStr.replace(/\D/g, ''));
    if (isNaN(num)) return "";
    const original = Math.ceil((num * 1.25) / 1000) * 1000;
    return `Rp ${original.toLocaleString('id-ID')}`;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onOpen}
      className="group cursor-pointer bg-white rounded-apple-lg shadow-premium hover:shadow-floating transition-all duration-500 overflow-hidden flex flex-col h-full relative border border-gray-100/50"
    >
      {/* Container Gambar: Apple Minimalist Style */}
      <div className="relative aspect-[4/5] overflow-hidden bg-system-bg">
        <motion.img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Premium+Collection'; }}
        />
        
        {/* Overlay Vogue-Style Badges */}
        <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            {/* Marketplace Badge: Stripe-Style Cleanliness */}
            <div className={`backdrop-blur-md px-2.5 py-1 rounded-apple-sm flex items-center gap-1.5 shadow-glass-shadow border border-white/30 ${
              isShopee ? 'bg-orange-500/80' : 'bg-emerald-500/80'
            }`}>
              <span className="text-[10px] font-black text-white tracking-widest uppercase">
                {isShopee ? 'Shopee' : 'Tokopedia'}
              </span>
            </div>

            {product.discount && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-vogue-black text-white text-[10px] font-black px-2 py-1 rounded-apple-sm shadow-xl tracking-tighter"
              >
                -{product.discount}%
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start">
            {/* Status Badge: Apple System Style */}
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20 flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isShopee ? 'bg-orange-500' : 'bg-emerald-500'}`} />
              <span className="text-[9px] font-black text-vogue-black uppercase tracking-widest">
                {product.discount ? 'Limited Deal' : 'New Arrival'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Teks: Vogue Typography & Stripe Layout */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-black tracking-[0.2em] text-vogue-gray uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-vogue-gray">
            <MapPin size={10} />
            <span className="text-[9px] font-bold tracking-tight">Tangerang</span>
          </div>
        </div>
        
        <h3 className="font-display text-sm font-bold text-vogue-black leading-tight mb-3 line-clamp-2 h-10 group-hover:text-brand-blue transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating & Sales: Clean Stripe Look */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-brand-orange text-brand-orange" />
            <span className="text-[11px] font-black text-vogue-black">4.9</span>
          </div>
          <div className="h-3 w-[1px] bg-gray-200" />
          <span className="text-[11px] font-bold text-vogue-gray tracking-tight">2.5k+ Sold</span>
        </div>
        
        <div className="mt-auto space-y-4">
          {/* Harga: High Contrast Vogue Look */}
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-display font-black text-vogue-black tracking-tighter italic">
              {product.price}
            </p>
            {product.discount && (
              <span className="text-[10px] text-vogue-gray line-through decoration-brand-orange/50">
                {getOriginalPrice(product.price)}
              </span>
            )}
          </div>

          {/* Button: Huawei/Apple Fluid Action */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="relative w-full bg-vogue-black group-hover:bg-brand-blue text-white text-[11px] font-black py-3 rounded-apple-md text-center transition-all duration-500 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-brand-blue/30 overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"
            />
            <span className="uppercase tracking-widest">Shop Now</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;