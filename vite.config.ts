import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy is useful for local development to make the serverless function work.
    // The Vercel CLI handles this automatically, but it's good practice.
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})