import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Zap, ChevronRight, MapPin } from 'lucide-react';

const ProductCard = ({ product, onOpen }) => {
  const isShopee = product.marketplace?.toLowerCase() === 'shopee';

  // PERBAIKAN: Fungsi harga yang aman dari crash
  const getOriginalPrice = (priceStr) => {
    if (!priceStr) return ""; // Jika harga kosong, jangan di-replace
    
    // Pastikan priceStr adalah string sebelum di-replace
    const cleanStr = String(priceStr).replace(/\D/g, '');
    const num = parseInt(cleanStr);
    
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
      className="group cursor-pointer bg-white rounded-[20px] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full relative border border-gray-100/50"
    >
      {/* Container Gambar */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <motion.img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Premium+Collection'; }}
        />
        
        {/* Badges Overlay */}
        <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className={`backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/30 ${
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
                className="bg-black text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-xl tracking-tighter"
              >
                -{product.discount}%
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20 flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isShopee ? 'bg-orange-500' : 'bg-emerald-500'}`} />
              <span className="text-[9px] font-black text-black uppercase tracking-widest">
                {product.discount ? 'Limited Deal' : 'New Arrival'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Teks */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin size={10} />
            <span className="text-[9px] font-bold tracking-tight">Indonesia</span>
          </div>
        </div>
        
        <h3 className="font-sans text-sm font-bold text-black leading-tight mb-3 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            <span className="text-[11px] font-black text-black">4.9</span>
          </div>
          <div className="h-3 w-[1px] bg-gray-200" />
          <span className="text-[11px] font-bold text-gray-400 tracking-tight">2.5k+ Sold</span>
        </div>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-black tracking-tighter italic">
              {product.price || "Rp 0"}
            </p>
            {product.discount && (
              <span className="text-[10px] text-gray-400 line-through">
                {getOriginalPrice(product.price)}
              </span>
            )}
          </div>

          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="relative w-full bg-black group-hover:bg-blue-600 text-white text-[11px] font-black py-3 rounded-xl text-center transition-all duration-500 flex items-center justify-center gap-2 shadow-lg overflow-hidden"
          >
            <span className="uppercase tracking-widest">Shop Now</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;