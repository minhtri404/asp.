import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiOrigin = process.env.VITE_API_ORIGIN || 'http://localhost:13767'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiOrigin,
        changeOrigin: true,
      },
    },
  },
})
