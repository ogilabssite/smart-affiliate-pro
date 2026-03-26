import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, LayoutGrid, Sparkles, Search, Bell } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AdminPanel from '../components/AdminPanel';

const Home = ({ products, categories, onAddProduct }) => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic: Stripe-Style Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-system-bg font-sans pb-32">
      {/* 1. TOP NAV: Huawei-Style Glossy Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-display font-black tracking-tighter text-vogue-black leading-none">
              SMART<span className="text-brand-blue italic">CART</span>
            </h1>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-vogue-gray mt-1">
              Curated Selection
            </span>
          </div>
          <div className="flex items-center gap-4">
             <motion.button whileTap={{ scale: 0.9 }} className="p-2 text-vogue-black relative">
               <Bell size={20} strokeWidth={2.5}/>
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-white"></span>
             </motion.button>
             {/* Tombol Rahasia Admin: Apple-Style Icon */}
             <motion.button 
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsAdminOpen(true)}
               className="w-10 h-10 bg-vogue-black rounded-full flex items-center justify-center text-white shadow-lg"
             >
               <LayoutGrid size={18} />
             </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 pt-6 space-y-8">
        
        {/* 2. SEARCH BAR: Stripe-Style Minimalist */}
        <div className="relative group animate-scale-in">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-vogue-gray group-focus-within:text-brand-blue transition-colors" size={18}/>
          <input 
            type="text"
            placeholder="Search premium collections..."
            className="w-full bg-white border-none py-4 pl-12 pr-4 rounded-apple-md shadow-premium focus:ring-2 focus:ring-brand-blue outline-none text-sm font-medium transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 3. HERO: Vogue-Style Typography Promo */}
        <section className="relative overflow-hidden bg-vogue-black rounded-apple-lg p-8 text-white min-h-[180px] flex flex-col justify-center">
          <motion.div 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="fill-brand-orange text-brand-orange"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Limited Edition</span>
            </div>
            <h2 className="text-3xl font-display font-black tracking-tighter leading-none mb-2 italic">
              FLASH SALE <br/> <span className="text-brand-blue">UP TO 50%</span>
            </h2>
            <p className="text-[10px] text-vogue-gray font-bold tracking-widest uppercase">Ends in 02:45:10</p>
          </motion.div>
          {/* Decorative Huawei Element */}
          <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl"></div>
        </section>

        {/* 4. CATEGORY: Apple-Style Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-vogue-black flex items-center gap-2">
              <Sparkles size={14} className="text-brand-blue"/> Explore Categories
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-tight transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat 
                  ? 'bg-vogue-black text-white border-vogue-black shadow-lg shadow-black/20' 
                  : 'bg-white text-vogue-gray border-gray-100 shadow-premium'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </section>

        {/* 5. PRODUCT GRID: Huawei AppGallery Style (2 Columns Mobile) */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard 
                  product={product} 
                  onOpen={() => window.open(product.affiliateLink, '_blank')}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* 6. ADMIN PANEL OVERLAY */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel 
            categories={categories}
            onClose={() => setIsAdminOpen(false)}
            onAddProduct={onAddProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;