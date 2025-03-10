import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TS to JSON Schema',
  description: 'Get JSON Schema from TypeScript types without Generators/CLIs',
  base: '/ts-to-json-schema/',
  themeConfig: {
    nav: [
      { text: 'Guia', link: '/guide/getting-started' },
      { text: 'API', link: '/api/core' },
      { text: 'GitHub', link: 'https://github.com/pedromdev/ts-to-json-schema' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introdução',
          items: [
            { text: 'Começando', link: '/guide/getting-started' },
            { text: 'Instalação', link: '/guide/installation' },
            { text: 'Como Funciona', link: '/guide/how-it-works' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'Core', link: '/api/core' },
            { text: 'Transform', link: '/api/transform' },
            { text: 'ESBuild Plugin', link: '/api/esbuild-plugin' },
            { text: 'Types', link: '/api/types' }
          ]
        }
      ]
    },
    footer: {
      message: 'Lançado sob a Licença MIT.',
      copyright: 'Copyright © 2024-presente Pedro Medeiros'
    }
  }
}) 