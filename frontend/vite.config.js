// 📁 vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()

  ],
  resolve: {
    alias: {
      '@fullcalendar': '/node_modules/@fullcalendar'
    }
  },
  server: {
    port: 5173,
  }
});