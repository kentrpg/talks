import MarkdownItMagicLink from 'markdown-it-magic-link'
import { defineConfig } from 'vite'
import '@slidev/cli'

export default defineConfig({
  optimizeDeps: {
    include: [
      'chroma-js',
      'vis-network',
      'vis-data',
    ],
  },
  slidev: {
    markdown: {
      markdownItSetup(md) {
        md.use(MarkdownItMagicLink, {
          linksMap: {
            Slidev: 'https://github.com/slidevjs/slidev',
            Vercel: { link: 'https://vercel.com', imageUrl: 'https://github.com/vercel.png' },
            Vue: 'https://github.com/vuejs/core',
          },
        })
      },
    },
  },
})