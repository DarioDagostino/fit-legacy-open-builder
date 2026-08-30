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
      // Keep the standalone repo compatible with Builder's guide-aware
      // imports even though the optional guide package is not installed here.
      '@fit-legacy/shared/builder': path.resolve(__dirname, './src/lib/builderShared.ts'),
      // Shared package alias. Keep this repo self-contained for Vercel builds.
      '@fit-legacy/shared': path.resolve(__dirname, './_consolidated_workout_nutrition/packages/shared/index.ts'),
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('/react@') || id.includes('/react-dom@') || id.includes('/scheduler@')) return 'react-core'

          if (id.includes('@supabase/supabase-js') || id.includes('/@supabase+')) return 'backend-clients'
          if (id.includes('@neondatabase/serverless') || id.includes('/@neondatabase+')) return 'backend-clients'
          if (id.includes('/openai@')) return 'ai-clients'

          if (id.includes('/@mui+') || id.includes('/@emotion+')) return 'mui'
          if (id.includes('/@radix-ui+')) return 'radix'

          if (id.includes('/recharts@')) return 'charts'
          if (id.includes('/react-dnd@') || id.includes('/dnd-core@') || id.includes('/react-dnd-html5-backend@')) return 'dnd'
          if (id.includes('/framer-motion@') || id.includes('/motion@')) return 'motion'

          return 'vendor'
        },
      },
    },
  },
})
