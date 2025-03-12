import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Server configuration
  server: {
    proxy: {
      // Proxy requests to /api to the local server for development
      '/api': 'http://localhost/road_quality',
    },
  },

  build: {
    // Set chunk size warning limit (if you want to increase it)
    chunkSizeWarningLimit: 100000, // 1000 KB (1 MB)

    // Rollup options for manual chunking (improve chunking by splitting large libraries)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example: Split node_modules into a separate 'vendor' chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
