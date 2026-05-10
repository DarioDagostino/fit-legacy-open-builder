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
      '@fit-legacy/shared': path.resolve(__dirname, './_consolidated_workout_nutrition/packages/shared'),
      '@fit-legacy/ai': path.resolve(__dirname, './src/lib/integrations/nvidiaFallback.ts'),
      '@fit-legacy/config': path.resolve(__dirname, './src/lib/integrations'),
      '@fit-legacy/auth': path.resolve(__dirname, './src/lib/integrations'),
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
