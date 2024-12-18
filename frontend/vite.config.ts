import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint2'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import type { PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  process.env = { ...process.env, ...env }

  return {
    optimizeDeps: {
      include: [],
    },
    build: {
      commonjsOptions: {
        exclude: [],
        include: [/node_modules/],
      },
    },
    base: '/',
    plugins: [
      react(),
      eslint({ fix: true }) as PluginOption,
      tsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Shimoe Koharu',
          short_name: 'Koharu',
          theme_color: '#1c1c1c',
          icons: [
            {
              src: 'icon.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: [{ find: 'src', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      port: 3000,
    },
    preview: {
      host: '0.0.0.0',
      port: 8000,
    },
  }
})
