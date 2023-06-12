import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  appType: "mpa",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // target: "https://solid-express-api.vercel.app",
        target: process.env.SERVER_ORIGIN_URL ?? "http://localhost:9000",
        changeOrigin: true,
      }
    }
  }
})
