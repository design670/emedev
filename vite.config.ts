import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // en el build de prerender se empaquetan GSAP y Lenis (sus módulos no cargan directo en Node)
  ssr: { noExternal: ['gsap', 'lenis'] },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: { gsap: ['gsap', 'gsap/ScrollTrigger', 'lenis'] },
          },
        },
  },
}));
