<template>
  <div v-if="route.path === '/report'">
    <router-view>

    </router-view>
  </div>
  <div v-else class="container">
    <div class="board">
      <div class="title">
        Control Panel
      </div>
      <!-- <Field class="field" v-model="nodeSize" label="Node Size"></Field> -->
      <Popover v-model:show="pop.name" placement="right-start"
        :actions="[{ text: 'Support regex pattern matching, e.g. ^start$' },]">
        <template #reference>
          <Field class="field" v-model="nodeName" label="Node Name"></Field>
        </template>
      </Popover>
      <template v-if=isIndex>
        <Field class="field" v-model="nodeId" label="Node ID"></Field>
        <Field class="field" v-model="maxNodes" label="Node Count"></Field>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="renderOptions.filterNodeByConstructor"
            :options="filterConstructorOptions" />
        </DropdownMenu>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="filterNode" :options="filterNodeOptions" />
        </DropdownMenu>
        <DropdownMenu v-if="renderOptions.analyze.type === 'compare'" class="field">
          <DropdownItem class="field" v-model="renderOptions.analyze.compare" :options="compareOptions" />
        </DropdownMenu>
      </template>
      <template v-if=!isIndex>
        <Field class="field" v-model="childDepth" label="Reference Depth"></Field>
        <Field class="field" v-model="edgeCounts" label="Max Edge Count"></Field>
        <Field class="field" v-model="filterNative" label="Filter Native Nodes"></Field>
      </template>
      <input type="file" @change="upload" ref="fileRef" accept=".heapsnapshot" class="inputFile" multiple="true">
      <Popover v-model:show="pop.snapshot" placement="right-start"
        :actions="[{ text: 'Support uploading two snapshot files for comparison' },]">
        <template #reference>
          <Button type="primary" class="btn" @click="fileRef.click()" @mouseenter="pop.snapshot = true"
            @mouseout="pop.snapshot = false" v-if="loading !== 'finish'">Upload Memory Snapshot</Button>
        </template>
      </Popover>

      <Button type="primary" class="btn" @click="confirm" v-if="loading === 'finish'">Redraw</Button>
      <Button type="primary" class="btn" @click="defaultDemo" v-if="loading === 'null'">View Default
        Example</Button>
      <Button type="primary" class="btn" @click="() => open('http://doc.ssr-fc.com/docs/features$memory')">User
        Manual</Button>

      <Button type="primary" class="btn" @click="router.push('/report')" v-if="loading === 'finish'">Generate
        Analysis
        Report</Button>
      <Button type="primary" class="btn" v-if="loading === 'null'"
        @click="open('https://github.com/zhangyuang/v8-profiler-rs')">Repository (Welcome Star✨)</Button>
      <Button type="primary" class="btn" v-if="loading === 'null'"
        @click="open('https://github.com/zhangyuang/v8-profiler-rs#contact')">Contact Author</Button>
    </div>
    <div class="chartContainer">
      <div class="loadingContainer" v-if="loading === 'loading'">
        <Loading color="#5b92f8" size="50"></Loading>
        <div class="text">
          Parsing file using WASM, depending on file size this may take
          3-20s, Firefox browser recommended, please wait...
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <component ref="children" :is="Component" />
      </router-view>
      <div v-if="loading === 'null'" class="tips">
        Please select and upload V8 heap snapshot file
      </div>
    </div>
    <div :class="`fixed ${renderOptions.isIndex ? 'right-[20px]' : 'right-[200px]'} top-[20px]`">
      <div class="flex items-center">
        <div class="text-black text-opacity-50">Node Count by Type</div>
      </div>
      <div v-for="(value, key) in renderOptions.nodeByConstructor">
        <div class="flex items-center">
          <div class="rounded-[50%] w-[10px] h-[10px]"
            :style="{ backgroundColor: NODE_COLORS[key] || NODE_COLORS['unknown'] }"></div>
          <div class="ml-[10px] text-black text-opacity-50"> {{ key }} : {{ value }}</div>
        </div>
      </div>
    </div>
    <div v-if="!renderOptions.isIndex" class="fixed right-[20px] top-[20px]">
      <div class="flex items-center">
        <div class="text-black text-opacity-50">edge_type</div>
      </div>
      <div v-for="(value, key) in EDGE_COLORS">
        <div class="flex items-center">
          <div class="rounded-[50%] w-[10px] h-[10px]" :style="{ backgroundColor: value }"></div>
          <div class="ml-[10px] text-black text-opacity-50"> {{ key }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, provide, reactive, watch, toRefs, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Field, Loading, DropdownMenu, DropdownItem, Popover } from 'vant'
import axios from 'axios'
import type { Node, RenderOptions } from '@/type'
import { globalStore } from '@/store'
import {
  compareOptions, filterNodeOptions, read,
  tips, filterConstructorOptions, NODE_COLORS, EDGE_COLORS, renderNodeId, calculateByConstructor
} from '@/utils'
import { unitConvert } from '@/analyze'
const router = useRouter()
const route = useRoute()
const path = route.path
const query = route.query
const fileRef = ref()
const children = ref()
const pop = reactive({
  name: false,
  source: false,
  snapshot: false
})
const loading = ref('null')
let worker: Worker | null = null
onMounted(async () => {
  worker = new Worker('worker.js', {
    type: "module"
  })
  if (query.heapsnapshot) {
    const heapsnapshot = query.heapsnapshot as string
    const res = await axios.get(heapsnapshot, {
      responseType: 'arraybuffer'
    })
    const uint8Array = new Uint8Array(res.data)
    const parseResult = await parse(uint8Array)
    setStore(parseResult)
    confirm()
  }
})



const renderOptions = reactive({
  isIndex: path === '/',
  maxNodes: 50,
  nodeSize: 10,
  edgeLength: 150,
  edgeCounts: 5,
  childDepth: 2,
  nodeName: '',
  nodeId: '',
  filterNative: 0,
  filterNode: 0,
  tooltip: {},
  force: {},
  label: {},
  analyze: {
    type: 'single',
    compare: 'addtional'
  },
  nodeByConstructor: {},
  filterNodeByConstructor: 'all'
} as RenderOptions)

const { maxNodes, isIndex, edgeCounts, childDepth,
  nodeName, nodeId, filterNative,
  filterNode
} = toRefs(renderOptions)

renderOptions.label = {
  show: true,
  position: 'right',
  formatter: (params: any) => {
    const { data } = params
    const { id, name, value } = data
    return `${name.length > 50 ? '' : name}@${id}@${unitConvert(value)}`
  }
}

const setStore = (data: Node[]) => {
  loading.value = 'loading'
  globalStore.data = data
  globalStore.idToNode = data.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {} as Record<number, Node>)
  loading.value = 'finish'
}
const open = (url: string) => {
  window.open(url)
}
watch(router.currentRoute, async (to) => {
  renderOptions.isIndex = to.path === '/'
  await nextTick()
  renderNodeId.value = to.params.node as string
  confirm()
})

const defaultDemo = async () => {
  const res = await axios.get('https://res.wx.qq.com/shop/public/26d3bd44-ab36-4caf-8d87-6e97f489464c.heapsnapshot', {
    responseType: 'arraybuffer'
  })
  const uint8Array = new Uint8Array(res.data)
  const parseResult = await parse(uint8Array)
  setStore(parseResult)
  confirm()
}

const upload = async (e: any) => {
  const file = Array.from((e.target as HTMLInputElement)?.files!)
  if (!file || file.length > 2) {
    tips('The maximum number of files currently supported is 2', 'danger')
    return
  }
  if (file.length == 2) {
    renderOptions.analyze.type = 'compare'
    file.sort((a, b) => a.size - b.size);
    const [small, big] = await Promise.all([read(file[0]), read(file[1])]);
    const smallRes = await parse(small)
    const bigRes = await parse(big)
    const smallIdToNode = smallRes.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {} as Record<number, Node>)
    globalStore.additionalNodes = bigRes.filter(node => !smallIdToNode[node.id])
    setStore(globalStore.additionalNodes)
    confirm()
    globalStore.biggerNodes = bigRes.filter(node => {
      if (smallIdToNode[node.id] && node.retained_size > smallIdToNode[node.id].retained_size) {
        node.bigger_number = node.retained_size - smallIdToNode[node.id].retained_size
        return true
      }
    })
    return
  }
  const result = await read(file[0])
  const parseResult = await parse(result)
  setStore(parseResult)
  confirm()
}

watch(() => renderOptions.analyze.compare, () => {
  if (renderOptions.analyze.compare === 'addtional') {
    setStore(globalStore.additionalNodes)
  } else if (renderOptions.analyze.compare === 'bigger') {
    setStore(globalStore.biggerNodes)
  }
})

const parse = async (result: Uint8Array): Promise<Node[]> => {
  console.time('parse')
  loading.value = 'loading'
  const sharedBuffer = new SharedArrayBuffer(result.byteLength)
  const sharedArray = new Uint8Array(sharedBuffer)
  sharedArray.set(result)
  worker?.postMessage(sharedArray)

  return new Promise((resolve) => {
    worker?.addEventListener('message', (e) => {
      const parseResultJSON = JSON.parse(new TextDecoder().decode(e.data))
      console.timeEnd('parse')
      loading.value = 'finish'
      resolve(parseResultJSON)
    }, { once: true })
  })
}



renderOptions.tooltip = {
  trigger: 'item',
  show: true,
  formatter: (params: any) => {
    const { data } = params
    if (!data.id) {
      if (!data.lineStyle) return
      return `<div class="tooltipText">
        <div class="item">
        <div class="name">Edge Type:  </div>
        <div class="code">${data.lineStyle.edge_type}</div>
      </div>
      <div class="item">
        <div class="name">Name or Index:  </div>
        <div class="code">${data.lineStyle.name_or_index}</div>
      </div>
      </div>`
    }
    const { compare_type, bigger_number, source, constructor, node_type, size, retained_size } = data.itemStyle as Node
    return `<div class="tooltipText">
      ${compare_type ? ` <div class="item">
          <div class="name red">Compare Type: ${compare_type === 'addtional' ? 'New Node' : 'Increased GC Size Node'} </div>
      </div>` : ''
      }
      ${bigger_number ? ` <div class="item">
        <div class="name red">GC Size Growth: ${unitConvert(bigger_number)} </div>
      </div>` : ''
      }
      <div class="item">
        <div class="name">Node ID:  </div>
        <div class="code">${data.id || ''}</div>
      </div>
      <div class="item">
        <div class="name">Node Type:  </div>
        <div class="code">${node_type}</div>
      </div>
      ${constructor ? ` <div class="item">
        <div class="name">Constructor:  </div>
        <div class="code">${constructor}</div>
      </div>` : ''
      }
      <div class="item">
        <div class="name">Node Name:  </div>
        <div class="code">${data.name}</div>
      </div>
      <div class="item">
        <div class="name">Self Size:  </div>
        <div class="code">${unitConvert(size)}</div>
      </div>
      <div class="item">
        <div class="name">GC Size:  </div>
        <div class="code">${unitConvert(retained_size)}</div>
      </div>
      ${source ? ` <div class="item">
        <div class="name">Source Location:  </div>
        <div class="code">${source}</div>
      </div>` : ''
      }
      </div>`
  },
  extraCssText: 'white-space:wrap',
  displayMode: 'multipleByCoordSys',
  position: 'right'
}

const confirm = () => {
  console.log('renderOptions', renderOptions)
  const res = globalStore.data
  const filteredNodes = renderOptions.filterNodeByConstructor === 'all' ? res :
    res.filter(item => item.constructor === renderOptions.filterNodeByConstructor)
  if (['string', 'concatenated string'].includes(renderOptions.filterNodeByConstructor ?? '')) {
    filteredNodes.sort((a, b) => b.retained_size - a.retained_size)
  }
  children.value.render(filterNode.value === 1 ? filteredNodes.filter(item => item.source) : filteredNodes)
}


provide('renderOptions', renderOptions)


</script>

<style lang="less">
@import '@/common.less';
@import './index.less';
</style>
