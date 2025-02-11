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
import type { Node, RenderOptions } from '@/type'

const renderOptions = inject('renderOptions')
const { nodeSize, childDepth, filterNative, edgeCounts, nodeName,
  tooltip, force, label
} = toRefs(renderOptions as RenderOptions)
force.value = {
  repulsion: 1000,
  gravity: 0.1,
  edgeLength: 200,
  layoutAnimation: true
}
const router = useRouter()

function generate(node: Node, idToNode: Record<number | string, Node>) {
  const links: GraphSeriesOption['links'] = []
  const nodes: GraphSeriesOption['data'] = []
  let queue = [node]
  let pathStore: Record<number, number[]> = {} // 记录已经建立的指向关系
  let depth = 0
  const arr: Array<{ source: number, target: number }> = []
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
      const children = node.edges.slice(0, edgeCounts.value).map(item => item.to_node)
      for (const childId of children) {
        const childNode = idToNode[childId]
        if (!childNode) {
          continue
        }
        if (nodeName.value && !childNode.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
          continue
        }

        if (Number(filterNative.value) === 1 && nativeNode.includes(childNode.node_type as NodeType)) {
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
  arr.forEach((relationship) => {
    const { source, target } = relationship;
    [source, target].forEach(relationNodeId => {
      const node = idToNode[relationNodeId]
      if (node && !nodeStore[relationNodeId]) {
        nodes.push({
          id: String(node.id),
          // @ts-expect-error
          constructor: node.constructor,
          name: String(node.name),
          value: node.retained_size,
          symbolSize: Number(node.id) === Number(renderNodeId.value) ? nodeSize.value * 8 : nodeSize.value * 2 as any,
          itemStyle: {
            ...node,
            color: node.id === Number(renderNodeId.value) ? 'red' : NODE_COLORS[node.node_type as NodeType]
          }
        })
        nodeToIndex[node.id] = nodes.length - 1
      }
      nodeStore[relationNodeId] = 1
    })
  })
  arr.forEach((relationship) => {
    const { source, target } = relationship;
    const sourceNode = idToNode[source]
    const edge = sourceNode.edges.find(item => Number(item.to_node) === Number(target))
    edge && links.push({
      source: nodeToIndex[source],
      target: nodeToIndex[target],
      lineStyle: {
        // @ts-expect-error
        edge_type: edge!.edge_type,
        name_or_index: edge!.name_or_index,
        color: EDGE_COLORS[edge!.edge_type]
      },
    })
  })
  return [nodes, links]
}

const render = (nodes: Node[]) => {
  const idToNode: Record<number | string, Node> = {}
  for (const item of nodes) {
    idToNode[item.id] = item
  }
  const node = idToNode[Number(renderNodeId.value)]
  const [data, links] = generate(node, idToNode);
  (renderOptions as RenderOptions).nodeByConstructor = calculateByConstructor(data as any)
  const option: EChartsOption = {
    tooltip: tooltip.value,
    // @ts-expect-error
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
