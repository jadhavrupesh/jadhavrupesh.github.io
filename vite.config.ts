import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // ✅ Root — because jadhavrupesh.github.io is a user site repo
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});