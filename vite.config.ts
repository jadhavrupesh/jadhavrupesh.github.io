import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // ✅ Root — because jadhavrupesh.github.io is a user site repo
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});