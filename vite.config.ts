import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/apis': {
        target: 'https://rappid.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apis/, '/apis'),
      },
    },
  },
});
