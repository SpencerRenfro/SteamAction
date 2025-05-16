import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
    ],
    // Set site metadata
    site: {
      name: 'SteamAction Cleaning Services',
      description: 'Professional cleaning services for homes and businesses, specializing in carpet, tile, grout, and upholstery cleaning.',
    },
    server: {
      port: 3000,
      open: true,
      host: true, // Listen on all addresses
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      },
      // Configure WebSocket for HMR
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
      // Allow all hosts (including ngrok domains)
      allowedHosts: ['.ngrok-free.app']
    },
  }

  // Add production-specific configurations
  if (command === 'build') {
    config.build = {
      outDir: 'dist',
      sourcemap: false,
      // Optimize for production
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }
  }

  return config
})
