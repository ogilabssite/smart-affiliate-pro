import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 group">
      {/* Container Utama: Stripe-Style Minimalist */}
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative flex items-center bg-white rounded-apple-md border transition-all duration-500 ${
          isFocused ? 'border-brand-blue ring-4 ring-brand-blue/5' : 'border-gray-100'
        }`}
      >
        {/* Ikon Pencarian: Apple Style Animated */}
        <div className="pl-5 text-vogue-gray group-focus-within:text-brand-blue transition-colors duration-300">
          <motion.div
            animate={isFocused ? { rotate: 90, scale: 1.2 } : { rotate: 0, scale: 1 }}
          >
            <Search size={20} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Input Text: Vogue Typography Style */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Find your next aesthetic collection..."
          className="w-full bg-transparent py-5 px-4 outline-none text-[15px] font-medium text-vogue-black placeholder:text-vogue-gray/50 placeholder:italic tracking-tight"
        />

        {/* Action Buttons: Huawei UI Depth */}
        <div className="pr-3 flex items-center gap-2">
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => onSearch("")}
                className="p-2 hover:bg-system-bg rounded-full text-vogue-gray transition-colors"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2.5 rounded-apple-sm transition-all duration-500 ${
              isFocused ? 'bg-vogue-black text-white' : 'bg-system-bg text-vogue-gray'
            }`}
          >
            <ArrowRight size={18} strokeWidth={3} />
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Suggestions: Apple-Style Glassmorphism */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-4 right-4 mt-3 p-4 bg-white/80 backdrop-blur-xl rounded-apple-lg border border-white/20 shadow-floating z-50"
          >
            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-vogue-gray">
              <Sparkles size={12} className="text-brand-orange" />
              <span>Trending Now</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Mechanical Keyboard', 'Desk Mat', 'iPhone 15', 'Aesthetic Lamp'].map((tag) => (
                <button
                  key={tag}
                  onMouseDown={() => onSearch(tag)}
                  className="px-3 py-1.5 bg-white border border-gray-100 rounded-full text-[11px] font-bold text-vogue-black hover:border-brand-blue hover:text-brand-blue transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;