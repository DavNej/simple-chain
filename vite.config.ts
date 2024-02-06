/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'tests/test-utils/setup',
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'istanbul',
    },
  },
  server: { port: 3000 },
})
