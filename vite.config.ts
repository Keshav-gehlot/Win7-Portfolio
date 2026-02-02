import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env.API_KEY for the browser environment
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Treat these imports as external (they will be resolved by the browser via importmap)
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'lucide-react',
        '@google/genai',
        'howler'
      ]
    }
  },
});