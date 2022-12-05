<template>
  <div id="main" />
</template>

<script lang="ts" setup>
import { inject, Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { Notify } from 'vant'
import type { EChartsOption, GraphSeriesOption } from 'echarts'
import { useSnapShotStore } from '@/store'
import './index.less'
import type { Node } from '@/type'
import { nativeNode } from '@/utils'

const store = useSnapShotStore()
const router = useRouter()
const maxNodes: Ref<number> = inject('maxNodes')!
const nodeSize: Ref<number> = inject('nodeSize')!
const force = inject('force')
const label = inject('label')
const tooltip = inject('tooltip')
const nodeName: Ref<string> = inject('nodeName')!
const nodeId: Ref<string> = inject('nodeId')!

const render = (snapshort: Node[]) => {
  const nodes: GraphSeriesOption['data'] = []
  let sortNodes: Node[] = snapshort
  if (nodeName.value) {
    sortNodes = sortNodes.filter(node => node.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())).sort((a, b) => b.retained_size - a.retained_size).slice(0, maxNodes.value).reverse()
    if (!sortNodes) {
      Notify({
        type: 'danger',
        message: '不存在该节点'
      })
      return
    }
    if (nodeId.value) {
      sortNodes = [sortNodes.find(node => Number(node.id) === Number(nodeId.value))!]
      if (!sortNodes.length) {
        Notify({
          type: 'danger',
          message: '不存在该节点'
        })
        return
      }
    }
  } else {
    sortNodes = sortNodes.sort((a, b) => b.retained_size - a.retained_size).slice(0, maxNodes.value).reverse()
  }
  sortNodes.forEach((node, index) => {
    if (node.node_type !== 'hidden' && node.node_type !== 'native') {
      nodes.push({
        id: String(node.id),
        name: String(node.name),
        value: node.retained_size,
        symbolSize: Number(nodeSize.value) + index * 2,
        itemStyle: {
          // @ts-expect-error
          type: node.node_type,
          self_size: node.self_size,
          edges: node.edges,
          color: nativeNode.includes(node.node_type) ? 'black' : `#4187f2`
        }
      })
    }
  })
  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    tooltip: tooltip as any,
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes,
        label: label as any,
        force: force as any,
        // roam: true,
        // draggable: true,
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
