import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Link2, Image as ImageIcon, Tag, ShoppingBag, Zap, Layout, Eye, Globe, Layers } from 'lucide-react';

const AdminPanel = ({ onAddProduct, onClose, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'Gadget',
    marketplace: 'Shopee',
    affiliateLink: '',
    imageUrl: '',
    desc: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const generateSEODesc = () => {
    if (!formData.name) return alert("Tuliskan Nama Produk terlebih dahulu!");
    const seoTemplates = [
      `Elevate your style with ${formData.name}. Desain minimalis nan mewah untuk koleksi ${formData.category} Anda.`,
      `${formData.name}: Definisi estetika modern. Sempurnakan kebutuhan ${formData.category} Anda sekarang.`,
      `Temukan esensi kenyamanan dalam ${formData.name}. Produk ${formData.category} paling dicari musim ini.`
    ];
    const randomDesc = seoTemplates[Math.floor(Math.random() * seoTemplates.length)];
    setFormData({ ...formData, desc: randomDesc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl) return alert("Nama dan Foto wajib diisi!");
    
    const finalProduct = { 
      ...formData, 
      id: Date.now(),
      price: Number(formData.price.toString().replace(/[^0-9.-]+/g,"")),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice.toString().replace(/[^0-9.-]+/g,"")) : null,
      isPromo: !!formData.oldPrice
    };
    
    onAddProduct(finalProduct);
    onClose();
  };

  return (
    <motion.div 
      initial={{ x: "100%", borderRadius: "80px 0 0 80px" }}
      animate={{ x: 0, borderRadius: "0px" }}
      exit={{ x: "100%", transition: { duration: 0.5 } }}
      transition={{ type: "spring", damping: 35, stiffness: 250 }}
      className="fixed inset-0 z-[100000] bg-[#FBFBFB] flex flex-col md:flex-row font-sans overflow-hidden text-black"
    >
      {/* LEFT SIDE: FORM */}
      <div className="flex-1 h-full overflow-y-auto bg-white border-r border-gray-100 pb-32 scrollbar-hide">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 bg-white/80 backdrop-blur-2xl px-8 py-6 flex justify-between items-center border-b border-gray-50"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Inventory Studio</span>
            </div>
            <h2 className="text-2xl font-display font-black tracking-tighter uppercase leading-none">Management</h2>
          </div>
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-3 bg-gray-50 rounded-full"><X size={20}/></motion.button>
        </motion.header>

        <motion.form variants={containerVariants} initial="hidden" animate="show" onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto space-y-10">
          
          {/* 1. IDENTITY SECTION */}
          <motion.div variants={itemVariants} className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Tag size={12}/> Basic Info</label>
            <input 
              type="text" placeholder="Product Name" 
              className="w-full bg-gray-50 p-5 rounded-2xl focus:bg-white border-2 border-transparent focus:border-brand-blue/10 outline-none transition-all font-medium text-lg shadow-sm"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Price (e.g. 500000)" 
                className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-mono"
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required
              />
              <input 
                type="text" placeholder="Old Price (Optional)" 
                className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-mono"
                value={formData.oldPrice} onChange={e => setFormData({...formData, oldPrice: e.target.value})}
              />
            </div>
          </motion.div>

          {/* 2. CATEGORY SELECTOR (THE MISSING PIECE) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Layers size={12}/> Select Collection</label>
            <div className="flex flex-wrap gap-2 p-1.5 bg-gray-50 rounded-[24px]">
              {categories.filter(c => c !== "Semua").map((cat) => (
                <button
                  key={cat} type="button" onClick={() => setFormData({...formData, category: cat})}
                  className="relative px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
                >
                  {formData.category === cat && (
                    <motion.div layoutId="activeCat" className="absolute inset-0 bg-white shadow-sm rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  <span className={`relative z-10 ${formData.category === cat ? 'text-brand-blue' : 'text-gray-400'}`}>{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 3. LOGISTICS & AFFILIATE */}
          <motion.div variants={itemVariants} className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Globe size={12}/> Connection & Media</label>
            <div className="space-y-4">
              <div className="flex bg-gray-100 p-1 rounded-2xl">
                {['Shopee', 'Tokopedia'].map((m) => (
                  <button
                    key={m} type="button" onClick={() => setFormData({...formData, marketplace: m})}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.marketplace === m ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text" placeholder="Image URL (Unsplash/Pinterest)" 
                  className="w-full bg-gray-50 p-4 pl-12 rounded-2xl outline-none text-sm"
                  value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                />
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="relative">
                <input 
                  type="text" placeholder="Paste Affiliate Link Here..." 
                  className="w-full bg-gray-50 p-4 pl-12 rounded-2xl outline-none text-sm border-2 border-brand-blue/5 focus:border-brand-blue/20"
                  value={formData.affiliateLink} onChange={e => setFormData({...formData, affiliateLink: e.target.value})} 
                />
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={18} />
              </div>
            </div>
          </motion.div>

          {/* 4. AI DESCRIPTION */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
              <motion.button 
                type="button" onClick={generateSEODesc} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-[9px] font-black uppercase flex items-center gap-2"
              >
                <Sparkles size={12} /> AI Magic
              </motion.button>
            </div>
            <textarea 
              rows="3" className="w-full bg-gray-50 p-5 rounded-[24px] outline-none italic font-serif text-lg resize-none shadow-inner" 
              value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}
            />
          </motion.div>

          <motion.button 
            variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" 
            className="w-full bg-black text-white py-6 rounded-[30px] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 shadow-2xl overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">Deploy Product <Send size={18} /></span>
          </motion.button>
        </motion.form>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW (VOGUE STAGE) */}
      <div className="hidden lg:flex flex-1 bg-[#050505] items-center justify-center p-20 relative">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#007AFF_0%,transparent_70%)]" />
        <div className="relative w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div 
              key={formData.imageUrl + formData.category}
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" /> : <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon size={60} /></div>}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{formData.category}</span>
                </div>
              </div>
              <div className="p-10 space-y-4">
                <h4 className="text-3xl font-display font-black tracking-tighter italic uppercase leading-none">{formData.name || "Product Name"}</h4>
                <div className="flex items-center gap-3 font-mono font-bold text-xl">
                  <span>Rp {Number(formData.price || 0).toLocaleString()}</span>
                  {formData.oldPrice && <span className="text-sm text-gray-300 line-through">Rp {Number(formData.oldPrice).toLocaleString()}</span>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;