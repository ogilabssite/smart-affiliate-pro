import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles.css';

/**
 * LOGIKA BOOTING (Apple-Style)
 * Memberikan jeda mikro agar CSS termuat sempurna sebelum konten muncul
 * Menghindari "Flash of Unstyled Content" (FUNC)
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      {/* App.jsx membungkus semua komponen (Navbar, Home, Detail) 
        yang sudah kita buat dengan desain premium sebelumnya.
      */}
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element 'id=root' tidak ditemukan di index.html. Periksa kembali index.html Anda.");
}

/**
 * PWA REGISTRATION (Huawei Style)
 * Agar aplikasi bisa di-install di layar HP dengan ikon profesional.
 */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}