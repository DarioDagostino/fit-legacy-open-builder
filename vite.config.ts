import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
      'utils': path.resolve(__dirname, './utils'),
      // Shared package alias
      '@fit-legacy/shared': path.resolve(__dirname, '../../packages/shared'),
      '@fit-legacy/ai': path.resolve(__dirname, '../../packages/ai/src'),
      '@fit-legacy/config': path.resolve(__dirname, '../../packages/config/src'),
      '@fit-legacy/auth': path.resolve(__dirname, '../../packages/auth/src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    include: ['statsig-js', 'statsig-react'],
  },
  server: {
    port: 5178,
    strictPort: true,
  },
})
