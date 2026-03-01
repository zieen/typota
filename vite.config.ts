import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['@monaco-editor/react', 'monaco-editor'],
          'markdown': ['react-markdown', 'remark-gfm', 'rehype-raw'],
          'vendor': ['react', 'react-dom'],
          'ui': ['lucide-react', 'zustand']
        }
      }
    }
  }
})
