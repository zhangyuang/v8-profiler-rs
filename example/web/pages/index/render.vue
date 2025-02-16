<template>
  <div id="main" />
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { Notify } from 'vant'
import type { EChartsOption, GraphSeriesOption } from 'echarts'
import './index.less'
import type { Node, RenderOptions } from '@/type'
import { NODE_COLORS, compareName, calculateByConstructor } from '@/utils'
const router = useRouter()
const renderOptions = inject('renderOptions')
const { maxNodes, nodeSize,
  nodeName, nodeId, tooltip, force, label
} = toRefs(renderOptions as RenderOptions)
force.value = {
  repulsion: 200,
  gravity: 0.1,
  edgeLength: 200,
  layoutAnimation: true
}
const render = (snapshort: Node[]) => {
  (renderOptions as RenderOptions).nodeByConstructor = calculateByConstructor()

  const nodes: GraphSeriesOption['data'] = []
  let sortNodes: Node[] = snapshort.filter(node => {
    if (nodeName.value && !compareName(node.name, nodeName.value)) {
      return false
    }
    if (nodeId.value && Number(nodeId.value) !== Number(node.id)) {
      return false
    }

    return true
  }).slice(0, maxNodes.value).reverse()
  if (!sortNodes?.length) {
    Notify({
      type: 'danger',
      duration: 5000,
      message: '过滤节点后没有剩余节点'
    })
    return
  }
  sortNodes.forEach((node, index) => {
    nodes.push({
      id: String(node.id),
      name: String(node.name),
      value: node.retained_size,
      symbolSize: Number(nodeSize.value) + index * 1,
      itemStyle: {
        ...node,
        color: NODE_COLORS[node.constructor || ''] || NODE_COLORS['unknown'],
      }
    })
  })
  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    tooltip: tooltip.value,
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes,
        edgeSymbol: ['arrow', 'none'],
        label: label.value,
        force: force.value,
        roam: true,
        draggable: true,
      }
    ]
  }
  myChart.setOption(option)
  myChart.on('click', 'series', function (e: any) {
    const id = e.data.id
    router.push(`/index/node/${id}`)
  });
}

defineExpose({
  render
})

</script>
