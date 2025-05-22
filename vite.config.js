import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sistemrekomendasidosenpembimbing/', 
  server: {
    cors: true
  }
});
