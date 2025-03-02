import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './../common'),
      '@fonts' : path.resolve(__dirname, './src/fonts'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});