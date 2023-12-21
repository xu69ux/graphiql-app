import { defineConfig } from 'vite';
import { join } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@components': join(__dirname, 'src/components'),
      '@pages': join(__dirname, 'src/pages'),
      '@styles': join(__dirname, 'src/styles'),
    },
  },
});