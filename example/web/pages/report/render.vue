<template>
  <div class="p-[20px]">
    <h1 class="pb-[20px]">Analyze Report with {{ analyzeType === 'compare' ? 'compare' : 'single' }}</h1>
    <div class="text-sm text-gray-500 pb-[20px]">Only show nodes with more than {{ minCount }} occurrences</div>
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
//@ts-expect-error
import markdown from 'markdown-it';
import { ref } from 'vue';
import { globalStore } from '@/store'
import type { Node } from '@/type'
const md = markdown({
  html: true,
  linkify: true,
  typographer: true,
})
const content = ref('')
const analyzeType = ref('single')
const minCount = 20
const minSize = 1024 * 1024
const snapShotStore = globalStore.data
const { additionalNodes, biggerNodes } = globalStore
if (additionalNodes.length > 0) {
  analyzeType.value = 'compare'
  const additionalConstructorCount = additionalNodes.reduce((acc: Record<string, number>, node) => {
    const constructor = node.constructor!
    acc[constructor] = (acc[constructor] || 0) + 1
    return acc
  }, {})

  const biggerConstructorCount = biggerNodes.reduce((acc: Record<string, number>, node) => {
    const constructor = node.constructor!
    acc[constructor] = (acc[constructor] || 0) + 1
    return acc
  }, {})

  const additionalReport = Object.entries(additionalConstructorCount)
    .filter(([_, count]) => count > minCount)
    .sort(([_, countA], [__, countB]) => countB - countA)
    .map(([constructor, count]) => `- ${constructor}: ${count}`)
    .join('\n')

  const biggerReport = Object.entries(biggerConstructorCount)
    .filter(([_, count]) => count > minCount)
    .sort(([_, countA], [__, countB]) => countB - countA)
    .map(([constructor, count]) => `- ${constructor}: ${count}`)
    .join('\n')
  const biggerNodesBySize = biggerNodes
    .filter(node => node.bigger_number! > minSize)
    .sort((a, b) => b.bigger_number! - a.bigger_number!)
    .map(node => {
      const increasedSizeMB = (node.bigger_number! / (minSize)).toFixed(2)
      return `- ${node.name}@${node.id}: +${increasedSizeMB}MB ${node.source ? `(<text class="!text-blue-500">${node.source.replace(/^http(s)?:\/\//, '')}</text>)` : ''}`
    })
    .join('\n')

  const markdownContent = `
  ### Additional nodes by constructor type
 
  ${additionalReport}
    
  ### Bigger nodes by constructor type
  
  ${biggerReport}

  ### Bigger nodes by increased size
  
  ${biggerNodesBySize}
  `
  content.value = md.render(markdownContent)

}
else {

  const nodeNameCount = snapShotStore.reduce((acc: Record<string, { count: number } & Node>, node) => {
    const name = node.name
    acc[name] = {
      count: (acc[name]?.count || 0) + 1,
      ...node
    }
    return acc
  }, {})

  const duplicateNodes = Object.entries(nodeNameCount)
    .filter(([name, info]) => name && info.count > minCount && info.source && !info.source?.startsWith('node:'))
    .sort(([_, infoA], [__, infoB]) => infoB.count - infoA.count)
    .map(([name, info]) => `- ${name}@${info.id}: ${info.count} ${info.source ? `(<text class="!text-blue-500">${info.source.replace(/^http(s)?:\/\//, '')}</text>)` : ''}`)
    .join('\n')

  const constructorRetainedSize = snapShotStore.reduce((acc: Record<string, number>, node) => {
    const constructor = node.constructor!
    acc[constructor] = (acc[constructor] || 0) + (node.retained_size || 0)
    return acc
  }, {})

  const constructorSizeReport = Object.entries(constructorRetainedSize)
    .filter(([_, size]) => size > 1024 * 1024)
    .sort(([_, sizeA], [__, sizeB]) => sizeB - sizeA)
    .map(([constructor, size]) => {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2)
      return `- ${constructor}: ${sizeInMB}MB`
    })
    .join('\n')

  const markdownContent = `
   ### Memory retained by constructor type
   
   ${constructorSizeReport}
   
   ### There are some nodes that are duplicated too many times
   
   ${duplicateNodes}
   `
  content.value = md.render(markdownContent)
}



</script>