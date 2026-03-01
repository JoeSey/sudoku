import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Enhanced plugin to fix MIME type issues for .ts and .tsx files
const fixMimeTypes = () => ({
  name: 'fix-mime-types',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0] || '';
      if (url.endsWith('.ts') || url.endsWith('.tsx')) {
        res.setHeader('Content-Type', 'application/javascript')
      }
      next()
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fixMimeTypes()],
  server: {
    host: true,
    port: 8000,
    strictPort: true,
  },
  // Ensure that .ts and .tsx files are not treated as static assets
  assetsInclude: [],
})
