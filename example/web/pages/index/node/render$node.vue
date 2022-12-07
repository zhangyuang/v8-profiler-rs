<template>
  <div id="main" />
</template>

<script lang="ts" setup>
import {  inject, onMounted, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as echarts from 'echarts'
import type { EChartsOption, GraphSeriesOption } from 'echarts'
import { useSnapShotStore } from '@/store'
import { noRepeat, nativeNode } from '@/utils'
import '@/pages/index/index.less'
import type { Node, RenderOptions } from '@/type'

const store = useSnapShotStore()
const renderOptions = inject('renderOptions')
const { nodeSize, childDepth, parentDepth, filterNative, edgeCounts,nodeName,weakOrStrong,
  tooltip, force, label
} = toRefs(renderOptions as RenderOptions)
const router = useRouter()
const route = useRoute()
const { node: rawNodeId } = route.params
const nodeId = ref(rawNodeId)

function generate(node: Node, id: Record<number | string, Node>) {
  const links: GraphSeriesOption['links'] = []
  const nodes: GraphSeriesOption['data'] = []
  let queue = [node]
  let pathStore: Record<number, number[]> = {} // 记录已经建立的指向关系
  let depth = 0

  const arr: Array<{ source: number, target: number }> = []
  while (queue.length) {
    if (depth === Number(parentDepth.value)) break
    depth++
    const tempArr = queue
    queue = []
    tempArr.forEach(node => {
      const parents = noRepeat(node.parents).slice(0, edgeCounts.value)
      for (const parentId of parents) {
        const parentNode = id[parentId]
        if (nodeName.value && !parentNode.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
          continue
        }
        if (Number(filterNative.value) === 1 && nativeNode.includes(parentNode.nt)) {
          continue
        }
        if (!pathStore[parentId]) pathStore[parentId] = []
        if (!pathStore[parentId].includes(node.id)) {
          arr.push({
            source: parentId,
            target: node.id,
          })
          pathStore[parentId].push(node.id)
          queue.push(parentNode)
        }
      }
    })
  }
  // 引用深度
  queue = [node]
  pathStore = {}
  depth = 0

  while (queue.length) {
    if (depth === Number(childDepth.value)) break
    depth++
    const tempArr = queue
    queue = []
    tempArr.forEach(node => {
      const children = node.edges.slice(0, edgeCounts.value).map(item => item.tn)
      for (const childId of children) {
        const childNode = id[childId]
        if (nodeName.value && !childNode.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
          continue
        }

        if (Number(filterNative.value) === 1 && nativeNode.includes(childNode.nt)) {
          continue
        }
        if (!pathStore[node.id]) pathStore[node.id] = []
        if (!pathStore[node.id].includes(childId)) {
          arr.push({
            source: node.id,
            target: childId,
          })
          pathStore[node.id].push(childId)
          queue.push(childNode)
        }
      }
    })
  }

  const nodeStore: Record<number, 1 | undefined> = {}
  console.log('边关系', arr)
  const nodeToIndex: Record<number, number> = {} // 记录每一个节点在 nodes 里面的下标
  console.log(nodeId.value)
  arr.forEach((relationship) => {
    const { source, target } = relationship;
    [source, target].forEach(nodeIndex => {
      const node = id[nodeIndex]
      if (!nodeStore[nodeIndex]) {
        nodes.push({
          id: String(node.id),
          name: String(node.name),
          value: node.rs,
          symbolSize: Number(node.id) === Number(nodeId.value) ? nodeSize.value * 4 : nodeSize.value as any,
          itemStyle: {
            // @ts-expect-error
            type: node.node_type,
            self_size: node.size,
            edges: node.edges,
            color: Number(node.id) === Number(nodeId.value) ? 'red' : '#5e6eba'
          }
        })
        nodeToIndex[node.id] = nodes.length - 1
      }
      nodeStore[nodeIndex] = 1
    })
  })
  arr.forEach((relationship) => {
    const { source, target } = relationship;
    const sourceNode = id[source]
    const edge = sourceNode.edges.find(item => Number(item.tn) === Number(target))
    links.push({
      source: nodeToIndex[source],
      target: nodeToIndex[target],
      lineStyle: {
        // @ts-expect-error
        edge_type: edge!.edge_type,
        name_or_index: edge!.ni,
        color: edge!.isr ? 'red' : 'black'
      }
    })
  })
  const newLinks = links.filter(item => {
    if (weakOrStrong.value === '0') {
      return true
    } else if (weakOrStrong.value === '1') {
      return item.lineStyle?.color === 'red'
    } else {
      return item.lineStyle?.color === 'black'
    }
  })
  return [nodes, newLinks]
}

const render = (nodes: Node[]) => {
  const id: Record<number | string, Node> = {}
  for (const item of nodes) {
    id[item.id] = item
  }
  const node = id[Number(nodeId.value)]

  const [data, links] = generate(node, id)
  const option: EChartsOption = {
    tooltip: tooltip as any,
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: data as any,
        edgeSymbol: ['none', 'arrow'],
        edges: links as any,
        label: label.value,
        force: force.value,
        roam: true,
        draggable: true
      },
    ]
  }

  const chart = echarts.init(document.getElementById('main')!)
  chart.setOption(option)
  chart.on('click', 'series', function (e: any) {
    const id = e.data.id
    nodeId.value = id
    router.push(`/node/${id}`)
    render(store.data)
  });
}
onMounted(() => {
  if (store.loaded === 'finish') {
    render(store.data)
  }
})
defineExpose({
  render
})

</script>

