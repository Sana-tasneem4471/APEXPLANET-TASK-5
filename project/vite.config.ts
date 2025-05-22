import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          quiz: ['./src/components/Quiz.tsx'],
          weather: ['./src/components/WeatherDashboard.tsx'],
        },
      },
    },
    sourcemap: true,
    target: 'esnext',
    minify: 'terser',
  },
});