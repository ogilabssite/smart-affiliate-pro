import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, Tv, Smartphone, Shirt, ShoppingBag, 
  Home, Sparkles, HeartPulse, Car, Gamepad2, 
  Dumbbell, Baby, Coffee, Monitor, Ticket 
} from 'lucide-react';

const categoryIcons = {
  "Semua": <LayoutGrid size={18} />,
  "Elektronik": <Tv size={18} />,
  "Gadget": <Smartphone size={18} />,
  "Fashion Pria": <Shirt size={18} />,
  "Fashion Wanita": <ShoppingBag size={18} />,
  "Home & Living": <Home size={18} />,
  "Kecantikan": <Sparkles size={18} />,
  "Kesehatan": <HeartPulse size={18} />,
  "Otomotif": <Car size={18} />,
  "Hobi & Koleksi": <Gamepad2 size={18} />,
  "Olahraga": <Dumbbell size={18} />,
  "Ibu & Bayi": <Baby size={18} />,
  "Makanan & Minuman": <Coffee size={18} />,
  "Komputer & Aksesoris": <Monitor size={18} />,
  "Voucher & Game": <Ticket size={18} />,
};

const CategoryBar = ({ categories, active, onSelect }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full py-4 overflow-hidden select-none group">
      {/* Huawei-Style Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-system-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-system-bg to-transparent z-10 pointer-events-none" />

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`
          flex overflow-x-auto gap-4 px-10 no-scrollbar items-start
          ${isDragging ? "cursor-grabbing" : "cursor-grab"} 
          snap-x snap-mandatory scroll-smooth touch-pan-x
        `}
      >
        {categories.map((cat, index) => {
          const isActive = active === cat;
          const icon = categoryIcons[cat] || <LayoutGrid size={18} />;

          return (
            <motion.button
              key={cat}
              onClick={() => !isDragging && onSelect(cat)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 snap-center min-w-[60px] max-w-[60px] outline-none group"
            >
              {/* Icon Container: Lebih Ringkas & Elegan */}
              <div className={`
                relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-500
                ${isActive 
                  ? "text-white shadow-floating scale-105" 
                  : "bg-white text-vogue-gray shadow-premium border border-gray-50 group-hover:border-brand-blue/30"}
              `}>
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-vogue-black rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-100' : 'group-hover:scale-110'}`}>
                  {icon}
                </div>
              </div>

              {/* Typography: Ultra Small & Anti-Overlapping */}
              <div className="h-7 flex items-start justify-center overflow-visible">
                <span className={`
                  text-[7.5px] font-black uppercase tracking-[0.25em] text-center leading-[1.3]
                  transition-colors duration-300 break-words w-full
                  ${isActive ? "text-vogue-black" : "text-vogue-gray opacity-40 group-hover:opacity-100"}
                `}>
                  {/* Logika pemecah kata otomatis agar tidak melebar kesamping */}
                  {cat.includes('&') ? (
                    <>
                      {cat.split('&')[0]} &<br />{cat.split('&')[1]}
                    </>
                  ) : cat.includes(' ') && cat.length > 10 ? (
                    <>
                      {cat.split(' ')[0]}<br />{cat.split(' ')[1]}
                    </>
                  ) : (
                    cat
                  )}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;