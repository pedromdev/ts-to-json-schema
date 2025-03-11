<!-- Mermaid.vue -->
<template>
  <div class="mermaid" v-html="svg"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  graph: {
    type: String,
    required: true
  }
})

const svg = ref('')

onMounted(async () => {
  try {
    const { svg: renderedSvg } = await mermaid.render('mermaid', props.graph)
    svg.value = renderedSvg
  } catch (error) {
    console.error('Error rendering mermaid graph:', error)
  }
})
</script>

<style>
.mermaid {
  text-align: center;
  margin: 1rem 0;
}
</style> 