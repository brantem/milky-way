import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
