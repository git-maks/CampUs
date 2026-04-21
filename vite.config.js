import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repository = process.env.GITHUB_REPOSITORY ?? ''
const repoName = repository.split('/')[1] ?? ''
const isUserOrOrgPages = repoName.endsWith('.github.io')
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const pagesBase = isGitHubActions && repoName && !isUserOrOrgPages ? `/${repoName}/` : '/'

export default defineConfig({
  base: pagesBase,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CampUs App',
        short_name: 'CampUs',
        description: 'All-in-one PWA for Erasmus students in Poland',
        theme_color: '#ad015f',
        start_url: pagesBase,
        scope: pagesBase,
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
