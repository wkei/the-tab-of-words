import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Tab of Words',
    short_name: 'Tab of Words',
    description: 'Learn Japanese words in each new tab',
    theme_color: '#fff',
    icons: [
      {
        src: 'favicon.svg',
        sizes: 'any',
      },
    ],
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), VitePWA(pwaOptions)],
})
