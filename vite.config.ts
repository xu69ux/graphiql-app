import { defineConfig } from 'vite';
import { join } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@appTypes': join(__dirname, 'src/types'),
      '@assets': join(__dirname, 'src/assets'),
      '@components': join(__dirname, 'src/components'),
      '@constants': join(__dirname, 'src/constants'),
      '@contexts': join(__dirname, 'src/contexts'),
      '@hooks': join(__dirname, 'src/hooks'),
      '@pages': join(__dirname, 'src/pages'),
      '@services': join(__dirname, 'src/services'),
      '@styles': join(__dirname, 'src/styles'),
      '@utils': join(__dirname, 'src/utils'),
    },
  },
});