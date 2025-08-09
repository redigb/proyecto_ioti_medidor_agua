import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() ],
   define: {
    global: {},
  },
  server: {
    host: true,
    hmr: false,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/canal-interno': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        ws: true,
      },
    },
  }
})
