import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env.API_KEY for the browser environment
    // Use || '' to ensure JSON.stringify doesn't return undefined if the env var is missing
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Treat these imports as external (they will be resolved by the browser via importmap)
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'lucide-react',
        '@google/genai',
        'howler'
      ]
    }
  },
});