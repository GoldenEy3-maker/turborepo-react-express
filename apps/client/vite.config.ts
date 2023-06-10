import path from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
  },
  build: {
    target: 'esnext',
  },
})
