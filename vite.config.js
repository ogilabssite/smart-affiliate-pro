import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi standar untuk React di Vercel
export default defineConfig({
  plugins: [react()],
  base: '/', // TAMBAHKAN BARIS INI: Mengatasi error 404 pathing di Vercel
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Memastikan build selalu bersih
  }
})