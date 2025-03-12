import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'TS to JSON Schema',
    description: 'Get JSON Schema from TypeScript types without Generators/CLIs',
    base: '/ts-to-json-schema/',
    markdown: {
      config: (md) => {
        // Configuração do markdown aqui se necessário
      }
    },
    vite: {
      optimizeDeps: {
        include: ['mermaid']
      }
    },
    mermaid: {
      theme: 'dark',
      darkMode: true,
      themeVariables: {
        primaryColor: '#42b883',
        primaryTextColor: '#fff',
        primaryBorderColor: '#42b883',
        lineColor: '#F8B229',
        secondaryColor: '#33a06f',
        tertiaryColor: '#333',
        // Cores para melhorar o contraste no modo escuro
        nodeBorder: '#42b883',
        clusterBorder: '#42b883',
        edgeLabelBackground: '#333',
        // Cores de fundo para os nós
        nodeBkg: '#444',
        mainBkg: '#444',
        secondBkg: '#444',
        // Cores de texto
        textColor: '#fff',
        labelTextColor: '#fff'
      }
    },
    locales: {
      root: {
        label: 'English',
        lang: 'en',
        link: '/en/',
        themeConfig: {
          nav: [
            { text: 'Guide', link: '/en/guide/getting-started' },
            { text: 'API', link: '/en/api/core' },
            { text: 'GitHub', link: 'https://github.com/pedromdev/ts-to-json-schema' }
          ],
          sidebar: {
            '/en/guide/': [
              {
                text: 'Introduction',
                items: [
                  { text: 'Getting Started', link: '/en/guide/getting-started' },
                  { text: 'Installation', link: '/en/guide/installation' },
                  { text: 'How it Works', link: '/en/guide/how-it-works' }
                ]
              }
            ],
            '/en/api/': [
              {
                text: 'API',
                items: [
                  { text: 'Core', link: '/en/api/core' },
                  { text: 'Transform', link: '/en/api/transform' },
                  { text: 'ESBuild Plugin', link: '/en/api/esbuild-plugin' },
                  { text: 'Types', link: '/en/api/types' }
                ]
              }
            ]
          }
        }
      },
      'pt-BR': {
        label: 'Português (Brasil)',
        lang: 'pt-BR',
        link: '/pt-BR/',
        themeConfig: {
          nav: [
            { text: 'Guia', link: '/pt-BR/guide/getting-started' },
            { text: 'API', link: '/pt-BR/api/core' },
            { text: 'GitHub', link: 'https://github.com/pedromdev/ts-to-json-schema' }
          ],
          sidebar: {
            '/pt-BR/guide/': [
              {
                text: 'Introdução',
                items: [
                  { text: 'Começando', link: '/pt-BR/guide/getting-started' },
                  { text: 'Instalação', link: '/pt-BR/guide/installation' },
                  { text: 'Como Funciona', link: '/pt-BR/guide/how-it-works' }
                ]
              }
            ],
            '/pt-BR/api/': [
              {
                text: 'API',
                items: [
                  { text: 'Core', link: '/pt-BR/api/core' },
                  { text: 'Transform', link: '/pt-BR/api/transform' },
                  { text: 'ESBuild Plugin', link: '/pt-BR/api/esbuild-plugin' },
                  { text: 'Types', link: '/pt-BR/api/types' }
                ]
              }
            ]
          }
        }
      },
      'es': {
        label: 'Español',
        lang: 'es',
        link: '/es/',
        themeConfig: {
          nav: [
            { text: 'Guía', link: '/es/guide/getting-started' },
            { text: 'API', link: '/es/api/core' },
            { text: 'GitHub', link: 'https://github.com/pedromdev/ts-to-json-schema' }
          ],
          sidebar: {
            '/es/guide/': [
              {
                text: 'Introducción',
                items: [
                  { text: 'Empezando', link: '/es/guide/getting-started' },
                  { text: 'Instalación', link: '/es/guide/installation' },
                  { text: 'Cómo Funciona', link: '/es/guide/how-it-works' }
                ]
              }
            ],
            '/es/api/': [
              {
                text: 'API',
                items: [
                  { text: 'Core', link: '/es/api/core' },
                  { text: 'Transform', link: '/es/api/transform' },
                  { text: 'ESBuild Plugin', link: '/es/api/esbuild-plugin' },
                  { text: 'Types', link: '/es/api/types' }
                ]
              }
            ]
          }
        }
      }
    },
    themeConfig: {
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present Pedro Marcelo'
      }
    }
  })
) 