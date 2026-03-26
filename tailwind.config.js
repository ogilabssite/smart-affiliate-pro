/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple & Huawei: Ultra-clean neutrals
        'glass': 'rgba(255, 255, 255, 0.7)',
        'system-bg': '#F5F5F7', 
        'system-card': '#FFFFFF',
        
        // Stripe: Vibrant & Professional accents
        'brand-orange': '#FF5722', 
        'brand-blue': '#635BFF', // Warna khas Stripe
        
        // Vogue: High-contrast black
        'vogue-black': '#000000',
        'vogue-gray': '#6E6E73',
      },
      // Apple-style rounded corners
      borderRadius: {
        'apple-sm': '12px',
        'apple-md': '18px',
        'apple-lg': '24px',
        'apple-xl': '32px',
      },
      // Vogue & Stripe Typography
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'display': ['Plus Jakarta Sans', 'Vogue', 'serif'], // Untuk heading berkelas
      },
      // Stripe-like Soft Shadows
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glass-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      // Animation "Bernyawa" (Custom Keyframes)
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}