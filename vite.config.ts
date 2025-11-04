import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// No Node types required

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      // Allow any ngrok free subdomain and specific current ones
      '.ngrok-free.app',
      'da9baa186d2f.ngrok-free.app',
      'eddd7ce710b0.ngrok-free.app',
    ],
    hmr: false,
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'animation': ['framer-motion', 'lenis'],
        },
      },
    },
  },
})

