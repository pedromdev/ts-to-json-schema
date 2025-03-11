import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import mermaid from 'mermaid'
import Mermaid from './Mermaid.vue'

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark'
})

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid)
  }
} 