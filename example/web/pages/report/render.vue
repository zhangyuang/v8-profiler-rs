<template>
  <div class="p-[20px]">
    <h1 class="pb-[20px]">Analyze Report</h1>
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
//@ts-expect-error
import markdown from 'markdown-it';
import { globalStore } from '@/store'
import type { Node } from '@/type'
const md = markdown({
  html: true,
  linkify: true,
  typographer: true,
})
const minCount = 20
const snapShotStore = globalStore.data
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
  const constructor = node.constructor || 'unknown'
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



const content = md.render(markdownContent)
</script>