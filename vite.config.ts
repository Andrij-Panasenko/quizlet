import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: '/src',
      components: '/components',
      pages: '/pages',
      assets: '/assets'
    }
  },
  base: '/vite-react-typescript-template' //don't forget to change this line after using template
})
