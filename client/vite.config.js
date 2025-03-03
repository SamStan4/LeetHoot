import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './../common'),
      '@utility' : path.resolve(__dirname, './src/utility'),
      '@backgrounds' : path.resolve(__dirname, './src/backgrounds'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@components' : path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});