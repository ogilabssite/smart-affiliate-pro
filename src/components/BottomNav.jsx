import { motion } from 'framer-motion';
import { Home, Grid, Zap, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: <Home/>, path: '/' },
    { name: 'Categories', icon: <Grid/>, path: '/categories' },
    { name: 'Hot Deals', icon: <Zap/>, path: '/flash-sale' },
    { name: 'Saved', icon: <Heart/>, path: '/wishlist' },
    { name: 'Me', icon: <User/>, path: '/admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-apple-gray/80 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center py-3 pb-safe z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            to={item.path} 
            key={item.name}
            className="flex flex-col items-center gap-1 relative"
          >
            {/* Animasi Ikon */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 1,
                y: isActive ? -2 : 0,
              }}
              className={`${isActive ? 'text-accent' : 'text-gray-500'}`}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {item.icon}
            </motion.div>
            
            {/* Indikator Titik Aktif */}
            {isActive && (
              <motion.div 
                layoutId="navIndicator"
                className="absolute -bottom-1.5 w-1 h-1 bg-accent rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;