<template>
  <div id="main" />
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import type { EChartsOption, GraphSeriesOption } from 'echarts'
import { EDGE_COLORS, NODE_COLORS, nativeNode, NodeType, calculateByConstructor, renderNodeId } from '@/utils'
import '@/pages/index/index.less'
import { globalStore } from '@/store'
import type { Node, RenderOptions } from '@/type'
const renderOptions = inject('renderOptions')
const { nodeSize, childDepth, filterNative, edgeCounts, nodeName,
  tooltip, force, label
} = toRefs(renderOptions as RenderOptions)
console.log(globalStore)
force.value = {
  repulsion: 1000,
  gravity: 0.1,
  edgeLength: 200,
  layoutAnimation: true
}
const router = useRouter()

function generate(node: Node) {
  const idToNode = globalStore.idToNode
  const links: GraphSeriesOption['links'] = []
  let queue = [node]
  const pathStore: Record<number, number[]> = {} // 记录已经建立的指向关系
  let depth = 0
  const arr: Array<{ source: number, target: number }> = []
  while (queue.length) {
    if (depth === Number(childDepth.value)) break
    depth++
    const currentNode = queue.shift()!
    const children = currentNode.edges.slice(0, edgeCounts.value).map(item => item.to_node)
    for (const childId of children) {
      const childNode = idToNode[childId]
      if (!childNode) {
        continue
      }
      if (nodeName.value && !childNode.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
        continue
      }
      if (!pathStore[currentNode.id]) pathStore[currentNode.id] = []
      if (!pathStore[currentNode.id].includes(childId)) {
        arr.push({
          source: currentNode.id,
          target: childId,
        })
        pathStore[currentNode.id].push(childId)
        queue.push(childNode)
      }
    }
  }

  const retainers = []
  let currentNode = idToNode[renderNodeId.value]
  console.log('currentNode', currentNode)
  for (let i = 0; i < 3; i++) {
    currentNode = idToNode[currentNode.retainer]
    retainers.push(currentNode)
  }
  const nodes = Array.from(new Map(arr.map(item => [idToNode[item.source], idToNode[item.target]]).flat().map(node => [node.id, node])).values())
    .concat(retainers)
    .map(node => {
      return {
        id: node.id,
        constructor: node.constructor,
        name: node.name,
        value: node.retained_size,
        retainer: node.retainer,
        symbolSize: Number(node.id) === Number(renderNodeId.value) ? nodeSize.value * 8 : nodeSize.value * 2 as any,
        itemStyle: {
          ...node,
          color: node.id === Number(renderNodeId.value) ? 'red' : NODE_COLORS[node.node_type as NodeType]
        }
      }
    })
  console.log('边关系', arr)
  arr.forEach((relationship) => {
    const { source, target } = relationship;
    const edge = idToNode[source].edges.find(item => Number(item.to_node) === Number(target))
    edge && links.push({
      source: nodes.findIndex(item => item.id === source),
      target: nodes.findIndex(item => item.id === target),
      lineStyle: {
        // @ts-expect-error
        edge_type: edge!.edge_type,
        name_or_index: edge!.name_or_index,
        color: EDGE_COLORS[edge!.edge_type]
      },
    })
  })
  retainers.forEach((retainer) => {
    links.push({
      source: nodes.findIndex(item => item.id === retainer.id),
      target: nodes.findIndex(item => item.retainer === retainer.id),
      lineStyle: {
        // @ts-expect-error
        edge_type: 'retainer',
        name_or_index: 'retainer',
        color: 'red'
      },
    })
  })
  return [nodes, links]
}

const render = () => {
  const [data, links] = generate(globalStore.idToNode[renderNodeId.value]);
  (renderOptions as RenderOptions).nodeByConstructor = calculateByConstructor(data as any)
  const option: EChartsOption = {
    tooltip: tooltip.value,
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: data as any,
        edgeSymbol: ['none', 'arrow'],
        edgeLabel: {
          show: true,
          color: 'black',
          position: 'middle',
          formatter: (params: any) => {
            const { data } = params
            const { name_or_index } = data.lineStyle
            return name_or_index
          }
        },

        edges: links,
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
    if (id === renderNodeId.value) return
    router.push(`/index/node/${id}`)
  });
}

defineExpose({
  render
})

</script>
