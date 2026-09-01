import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // configurazione test (Vitest)
  test: {
    environment: 'node',
    include: ['test/**/*.{test,spec}.{js,jsx}'],
  },
})
