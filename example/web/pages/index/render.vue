<template>
  <div id="main" />
</template>

<script lang="ts" setup>
import { inject, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { Notify } from 'vant'
import type { EChartsOption, GraphSeriesOption } from 'echarts'
import { useSnapShotStore } from '@/store'
import './index.less'
import type { Node, RenderOptions } from '@/type'
import { getColor } from '@/utils'

const store = useSnapShotStore()
const router = useRouter()
const renderOptions = inject('renderOptions')
const { maxNodes, nodeSize,
  nodeName, nodeId, tooltip, force, label
} = toRefs(renderOptions as RenderOptions)

const render = (snapshort: Node[]) => {
  const nodes: GraphSeriesOption['data'] = []
  let sortNodes: Node[] = snapshort.filter(node => {
    if (nodeName.value && !node.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
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
      message: '不存在该节点'
    })
    return
  }

  sortNodes.forEach((node, index) => {
    nodes.push({
      id: String(node.id),
      name: String(node.name),
      value: node.rs,
      symbolSize: Number(nodeSize.value) + index * 1,
      itemStyle: {
        // @ts-expect-error
        type: node.nt,
        self_size: node.size,
        edges: node.edges,
        color: getColor(node, index, maxNodes.value),
        compareType: node.compareType,
        biggerNumber: node.biggerNumber
      }
    })
  })
  const links = sortNodes.map((_, index) => {
    return {
      source: index,
      target: index + 1
    }
  })
  links.pop()

  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    tooltip: tooltip.value,
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes,
        edges: links as any,
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
    router.push(`/node/${id}`)
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
