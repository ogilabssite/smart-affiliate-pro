import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as initialProducts, categories } from './data/products';
import SalesNotifier from './components/SalesNotifier';

// Import Components Premium
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './components/AdminPanel'; // Import Admin Panel
import { ShoppingBag, Sparkles, ArrowRight, X, ChevronUp, ChevronDown, Zap, ArrowUpRight } from 'lucide-react';

// --- 1. IMMERSIVE EXPLORE PAGE ---
const ImmersiveExplore = ({ products, onClose, onSelectProduct }) => {
  const displayProducts = useMemo(() => {
    // Alur: Mengutamakan produk promo, jika tidak ada tampilkan semua
    const promos = products.filter(p => p.isPromo || p.oldPrice);
    return promos.length > 0 ? promos : products;
  }, [products]);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentProduct = displayProducts[index];
  const AUTO_PLAY_DURATION = 6000;

  const nextProduct = useCallback(() => {
    setIndex((prev) => (prev + 1) % displayProducts.length);
  }, [displayProducts.length]);

  const prevProduct = () => {
    setIndex((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
  };

  useEffect(() => {
    let interval;
    if (!isPaused && displayProducts.length > 1) {
      interval = setInterval(nextProduct, AUTO_PLAY_DURATION);
    }
    return () => clearInterval(interval);
  }, [nextProduct, isPaused, displayProducts.length]);

  if (!currentProduct) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex items-center justify-center overflow-hidden font-sans"
    >
      {/* HUAWEI AURA BG */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-brand-blue/20 blur-[120px] rounded-full" />
      </motion.div>

      {/* APPLE MINIMALIST HEADER */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Zap size={14} className="text-brand-blue animate-pulse" />
            <span className="text-brand-blue font-black text-[10px] uppercase tracking-[0.6em]">Live Showcase</span>
          </div>
          <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold ml-6 italic">
            Perspective {index + 1} // {displayProducts.length}
          </p>
        </div>
        <button onClick={onClose} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center backdrop-blur-md border border-white/10">
          <X size={24} />
        </button>
      </div>

      <div className="relative w-full max-w-7xl px-8 md:px-20 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE: Fluid Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 60, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -60, rotateY: 10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] md:h-[580px] rounded-[50px] overflow-hidden shadow-2xl border border-white/5"
          >
            <img src={currentProduct.imageUrl} className="w-full h-full object-cover" alt="" />
          </motion.div>
        </AnimatePresence>

        {/* INFO: Vogue Typography */}
        <div className="flex flex-col items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentProduct.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full"
            >
              <h2 className="text-6xl md:text-[90px] font-display font-black italic uppercase leading-[0.8] mb-10 tracking-tighter">
                {currentProduct.name}
              </h2>
              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-5xl font-mono font-bold text-brand-blue italic">Rp {currentProduct.price.toLocaleString()}</span>
                {currentProduct.oldPrice && (
                  <span className="text-xl font-mono text-white/20 line-through italic">Rp {currentProduct.oldPrice.toLocaleString()}</span>
                )}
              </div>
              <button 
                onClick={() => onSelectProduct(currentProduct)}
                className="bg-white text-black px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-blue hover:text-white transition-all flex items-center gap-4"
              >
                View Detail <ArrowUpRight size={18} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* STRIPE NAVIGATION */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
        <button onClick={prevProduct} className="text-white/30 hover:text-white transition-colors"><ChevronUp size={28}/></button>
        <div className="h-32 w-[1px] bg-white/10 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-brand-blue shadow-[0_0_10px_#007AFF]"
            animate={{ height: `${((index + 1) / displayProducts.length) * 100}%` }}
          />
        </div>
        <button onClick={nextProduct} className="text-white/30 hover:text-white transition-colors"><ChevronDown size={28}/></button>
      </div>
    </motion.div>
  );
};

// --- 2. HERO BANNER ---
const HeroBanner = ({ onExplore }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative w-full h-[600px] rounded-[50px] overflow-hidden mb-16 group"
  >
    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    <div className="absolute inset-0 p-16 flex flex-col justify-end items-start pointer-events-none">
      <h1 className="text-8xl md:text-[120px] font-display font-black text-white italic tracking-tighter leading-[0.8] mb-10">
        CURATED <br /> <span className="text-brand-blue not-italic font-sans">STORY.</span>
      </h1>
      <button onClick={onExplore} className="pointer-events-auto bg-white text-black px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-transform">
        Explore Collection <ArrowRight size={18} />
      </button>
    </div>
  </motion.div>
);

// --- 3. MAIN APPLICATION ---
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false); // State Admin

  // State Produk dengan LocalStorage Sync
  const [allProducts, setAllProducts] = useState(() => {
    const saved = localStorage.getItem('smartcart_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Shortcut Keyboard: Alt + A untuk buka Admin
  useEffect(() => {
    const handleKey = (e) => { if (e.altKey && e.key === 'a') setIsAdminOpen(true); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === "Semua" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...allProducts];
    setAllProducts(updated);
    localStorage.setItem('smartcart_products', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black selection:bg-brand-blue selection:text-white font-sans">
      
      {/* ADMIN PANEL OVERLAY */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel 
            categories={categories} 
            onClose={() => setIsAdminOpen(false)} 
            onAddProduct={handleAddProduct}
          />
        )}
      </AnimatePresence>

      {/* EXPLORE OVERLAY */}
      <AnimatePresence>
        {isExploreMode && (
          <ImmersiveExplore 
            products={allProducts} 
            onClose={() => setIsExploreMode(false)}
            onSelectProduct={(p) => { setSelectedProduct(p); setIsExploreMode(false); }}
          />
        )}
      </AnimatePresence>

      <Navbar onSearch={setSearchTerm} onOpenAdmin={() => setIsAdminOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <CategoryBar categories={categories} active={selectedCategory} onSelect={setSelectedCategory} />

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {selectedCategory === "Semua" && searchTerm === "" && (
              <HeroBanner key="hero" onExplore={() => setIsExploreMode(true)} />
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex flex-col">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-blue mb-2">Portfolio</h3>
            <h2 className="text-5xl font-display font-black italic tracking-tighter uppercase">Selected Works</h2>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={() => setSelectedProduct(product)} />
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
      <SalesNotifier /> {/* Panggil di sini */}
    </div>
  );
}

export default App;