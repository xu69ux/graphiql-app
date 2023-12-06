import { defineConfig } from 'vite';
import { join } from 'path';
import alias from '@rollup/plugin-alias'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@pages', replacement: join(__dirname, 'src/pages') }
      ]
    })
  ],
});
