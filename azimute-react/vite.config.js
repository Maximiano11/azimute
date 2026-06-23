import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5181,
    host: true,
    strictPort: true,
    proxy: {
      // Encaminha as chamadas de API para o backend Express em dev.
      '/api': { target: 'http://localhost:4100', changeOrigin: true },
    },
  },
});
