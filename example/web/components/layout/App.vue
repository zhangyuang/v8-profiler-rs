<template>
  <div class="container">
    <div class="board">
      <div class="title">
        控制面板
      </div>
      <!-- <Field class="field" v-model="nodeSize" label="节点大小"></Field> -->
      <Popover v-model:show="pop.name" placement="right-start" :actions="[{ text: '支持正则模式匹配，例如^start$' },]">
        <template #reference>
          <Field class="field" v-model="nodeName" label="节点名称"></Field>
        </template>
      </Popover>
      <template v-if=isIndex>
        <Field class="field" v-model="nodeId" label="节点id"></Field>
        <Field class="field" v-model="maxNodes" label="节点数量"></Field>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="renderOptions.filterNodeByConstructor"
            :options="filterConstructorOptions" />
        </DropdownMenu>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="filterNode" :options="filterNodeOptions" />
        </DropdownMenu>
      </template>
      <template v-if=!isIndex>
        <Field class="field" v-model="parentDepth" label="被引用深度"></Field>
        <Field class="field" v-model="childDepth" label="引用深度"></Field>
        <Field class="field" v-model="edgeCounts" label="最大边数量"></Field>
        <Field class="field" v-model="filterNative" label="过滤原生节点"></Field>
      </template>
      <DropdownMenu class="field" v-if="compare.is">
        <DropdownItem class="field" v-model="compare.mode" :options="compareOptions" />
      </DropdownMenu>
      <input type="file" @change="upload" ref="fileRef" accept=".heapsnapshot" class="inputFile" multiple="true">
      <Popover v-model:show="pop.snapshot" placement="right-start" :actions="[{ text: '支持同时上传两个快照文件进行比较' },]">
        <template #reference>
          <Button type="primary" class="btn" @click="fileRef.click()" @mouseenter="pop.snapshot = true"
            @mouseout="pop.snapshot = false" v-if="store.loaded !== 'finish'">上传内存快照文件</Button>
        </template>
      </Popover>

      <Button type="primary" class="btn" @click="confirm" v-if="store.loaded === 'finish'">重新绘制</Button>
      <Button type="primary" class="btn" @click="defaultDemo" v-if="store.loaded === 'null'">查看默认示例</Button>
      <Button type="primary" class="btn" @click="open('http://doc.ssr-fc.com/docs/features$memory')">使用手册</Button>
      <Button type="primary" class="btn" v-if="store.loaded === 'null'"
        @click="open('https://github.com/zhangyuang/v8-profiler-rs#%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95')">更新日志</Button>
      <Button type="primary" class="btn" @click="analyzeFn" v-if="store.loaded === 'finish'">生成分析报告</Button>
      <Button type="primary" class="btn" v-if="store.loaded === 'null'"
        @click="open('https://github.com/zhangyuang/v8-profiler-rs')">代码仓库(欢迎 Star✨)</Button>
      <Button type="primary" class="btn" v-if="store.loaded === 'null'"
        @click="open('https://github.com/zhangyuang/v8-profiler-rs#%E7%AD%94%E7%96%91%E7%BE%A4')">联系作者</Button>
    </div>
    <div class="chartContainer">
      <div class="loadingContainer" v-if="store.loaded === 'loading'">
        <Loading color="#5b92f8" size="50"></Loading>
        <div class="text" v-if="parseMethod == 'wasm'">
          使用 WASM 解析文件中，根据文件大小这大概需要
          3-20s 左右的时间，建议使用 firefox 浏览器，请稍后...
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <component ref="children" :is="Component" />
      </router-view>
      <div v-if="store.loaded === 'null'" class="tips">
        请选择 V8 内存堆快照文件上传
      </div>
    </div>
    <div :class="`fixed ${renderOptions.isIndex ? 'right-[20px]' : 'right-[200px]'} top-[20px]`">
      <div class="flex items-center">
        <div class="text-black text-opacity-50">不同类型节点数量</div>
      </div>
      <div v-for="(value, key) in renderOptions.nodeByConstructor">
        <div class="flex items-center">
          <div class="rounded-[50%] w-[10px] h-[10px]"
            :style="{ backgroundColor: NODE_COLORS[key] || NODE_COLORS['unknown'] }"></div>
          <div class="ml-[10px] text-black text-opacity-50"> {{ key }} 数量: {{ value }}</div>
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
    <div
      class="fixed right-[0px] top-[0px] analyze px-[20px] pt-[40px] pb-[20px] flex flex-col min-w-[300px] max-w-[500px] overflow-scroll box-border z-10"
      v-if="analyze.show">
      <div class="flex items-center text-[20px] fixed top-0 bg-white py-[10px] z-20 w-full">
        <img class="w-[20px] h-[20px]" src="/close.svg" alt="" @click="analyze.show = false">
        分析报告
      </div>
      <div class=" mb-[20px]">

      </div>
      <template v-if="compare.is">
        <div class="flex items-center">
          <div class="bg-[#DB7093] rounded-[50%] w-[10px] h-[10px]"></div>
          <div class="ml-[10px] text-black text-opacity-50">新增节点数量</div>
          <div class="ml-[10px] font-mono">{{ compare.addtionalLen }}</div>
        </div>
        <div class="flex items-center mb-[10px]">
          <div class="bg-[#800080] rounded-[50%] w-[10px] h-[10px]"></div>
          <div class="ml-[10px] text-black text-opacity-50">增大节点数量</div>
          <div class="ml-[10px] font-mono">{{ compare.biggerLen }}</div>
        </div>
        <div v-if="analyze.additional?.sortByCount?.length">
          <div class="mb-[10px]">
            新增节点中JS层重复节点：
          </div>
          <div v-for="item in analyze.additional.sortByCount" class="text-black text-opacity-50 mb-[10px]">
            新增节点名称: <span class="font-bold">{{ item.name }} </span>， 新增次数达到 <span class="font-bold">{{
              item.count
            }}</span>，共占用内存 <span class="font-bold">{{ unitConvert(item.shallowSize) }}</span>
            <template v-if="item.sourceString.includes('<br />')">
              位于多个文件 <div class="" v-html="item.sourceString"></div>
            </template>
            <template v-else>
              仅存在于文件 <div class="" v-html="item.sourceString"></div> <span class="text-red-500">疑似存在内存泄漏</span>
            </template>
          </div>
        </div>
        <div v-if="analyze.additional?.sortRetainedSize?.length">
          <div class="mb-[10px]">
            新增节点中JS层占用内存最大节点：
          </div>
          <div v-for="item in analyze.additional?.sortRetainedSize" class="text-black text-opacity-50 mb-[10px]">
            新增节点: <span class="font-bold">{{ item.name }}@{{ item.id }} </span> 可释放大小 <span class="font-bold">{{
              unitConvert(item.retained_size)
            }}</span>， 占总内存<span class="font-bold">{{ item.percent }}</span> 位于文件 {{ item.source }}
          </div>
        </div>
        <div v-if="analyze.bigger?.sortRetainedSize?.length">
          <div class="mb-[10px]">
            增大节点中JS层占用内存最大节点：
          </div>
          <div v-for="item in analyze.bigger?.sortRetainedSize" class="text-black text-opacity-50 mb-[10px]">
            增大节点: <span class="font-bold">{{ item.name }}@{{ item.id }} </span> 增长大小 <span class="font-bold">{{
              unitConvert(item.bigger_number ?? 0)
            }}</span>， 可释放大小占总内存<span class="font-bold">{{ item.percent }}</span> 位于文件 {{ item.source }}
          </div>
        </div>
      </template>
      <template v-else>
        <!-- single heapsnapshot analyze -->
        <div v-if="analyze.sortByCount?.length">
          <div class="mb-[10px]">
            JS层重复节点：
          </div>
          <div v-for="item in analyze.sortByCount" class="text-black text-opacity-50 mb-[10px]">
            节点名称: <span class="font-bold">{{ item.name }} </span>， 重复次数达到 <span class="font-bold">{{
              item.count
            }}</span>，共占用内存 <span class="font-bold">{{ unitConvert(item.shallowSize) }}</span>
            <template v-if="item.sourceString.includes('<br />')">
              位于多个文件 <div class="" v-html="item.sourceString"></div>
            </template>
            <template v-else>
              仅存在于文件 <div class="" v-html="item.sourceString"></div> <span class="text-red-500">疑似存在内存泄漏</span>
            </template>
          </div>
        </div>
        <div v-if="analyze.sortRetainedSize?.length">
          <div class="mb-[10px]">
            JS层自身内存比可GC内存比例最大节点：
          </div>
          <div v-for="item in analyze.sortRetainedSize" class="text-black text-opacity-50 mb-[10px]">
            节点: <span class="font-bold">{{ item.name }}@{{ item.id }} </span>
            可GC内存倍数<span class="font-bold">{{ item.pt }}倍 </span> GC后可释放大小 <span class="font-bold">{{
              unitConvert(item.retained_size)
            }}</span>， 占总内存<span class="font-bold">{{ item.percent }}</span> 位于文件 {{ item.source }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, reactive, watch, toRefs, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Field, Loading, DropdownMenu, DropdownItem, Popover } from 'vant'
import axios from 'axios'
import type { Node, RenderOptions } from '@/type'
import { useSnapShotStore } from '@/store'
import {
  compareOptions, filterNodeOptions, read,
  tips, filterConstructorOptions, NODE_COLORS, EDGE_COLORS, renderNodeId
} from '@/utils'
import { analyzeSingle, analyzeCompare, unitConvert } from '@/analyze'
const store = useSnapShotStore()
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
let worker: Worker | null = null
onMounted(async () => {
  worker = new Worker('worker.js', {
    type: "module"
  })
  if (query.heapsnapshot) {
    const heapsnapshot = query.heapsnapshot as string
    store.setLoading('loading')
    const res = await axios.get(heapsnapshot, {
      responseType: 'arraybuffer'
    })
    const uint8Array = new Uint8Array(res.data)
    const parseResult = await parse(uint8Array)
    store.setData({
      data: parseResult,
    })
    store.setLoading('finish')
    confirm()
  }
})



const renderOptions = reactive({
  isIndex: path === '/',
  maxNodes: 50,
  nodeSize: 10,
  edgeLength: 150,
  edgeCounts: 5,
  parentDepth: 2,
  childDepth: 2,
  weakOrStrong: '0',
  nodeName: '',
  nodeId: '',
  filterNative: 0,
  filterNode: 0,
  parseMethod: 'wasm',
  tooltip: {},
  force: {},
  label: {},
  compare: {
    is: false,
    mode: 'addtional',
    addtionalLen: -1
  },
  analyze: {
    show: false,
  },
  nodeByConstructor: {},
  filterNodeByConstructor: 'all'
} as RenderOptions)

const { maxNodes, isIndex, edgeCounts, parentDepth, childDepth,
  nodeName, nodeId, filterNative, parseMethod, compare, analyze,
  filterNode
} = toRefs(renderOptions)

renderOptions.label = {
  show: true,
  position: 'right',
  formatter: (params: any) => {
    const { data } = params
    const { id, name } = data
    return `${name.length > 50 ? '' : name}@${id}`
  }
}


const open = (url: string) => {
  window.open(url)
}
watch(router.currentRoute, async (to) => {
  renderOptions.isIndex = to.path === '/'
  await nextTick()
  renderNodeId.value = to.params.node as string
  children.value.render(store.data)
})

const defaultDemo = async () => {
  store.setLoading('loading')
  const res = await axios.get('https://res.wx.qq.com/shop/public/26d3bd44-ab36-4caf-8d87-6e97f489464c.heapsnapshot', {
    responseType: 'arraybuffer'
  })
  const uint8Array = new Uint8Array(res.data)
  const parseResult = await parse(uint8Array)
  store.setData({
    data: parseResult,
  })
  store.setLoading('finish')
  confirm()
}
const analyzeFn = async () => {
  const { data } = store
  if (compare.value.is) {
    // 多快照
  } else {
    renderOptions.analyze = await analyzeSingle({
      data,
      type: 'panel'
    })
  }
  renderOptions.analyze.show = true
}
const upload = async (e: any) => {
  const file = Array.from((e.target as HTMLInputElement)?.files!)
  if (!file || file.length > 2) {
    tips('当前最大只支持选择两个文件', 'danger')
    return
  }
  if (file.length == 2) {
    file.sort((a, b) => a.size - b.size);
    const [small, big] = await Promise.all([read(file[0]), read(file[1])]);
    const smallRes = await parse(small)
    const bigRes = await parse(big)
    const { additionalStatistic, biggerStatistic, additionalNode, biggerNode } = analyzeCompare(smallRes, bigRes, 'panel')
    compare.value.is = true
    compare.value.addtionalLen = additionalNode.length
    compare.value.biggerLen = biggerNode.length

    renderOptions.analyze.additional = additionalStatistic
    renderOptions.analyze.bigger = biggerStatistic
    store.setData({
      data: bigRes,
      compareData: additionalNode.concat(biggerNode),
    })
    confirm()
    return
  }
  const result = await read(file[0])
  const parseResult = await parse(result)

  store.setData({
    data: parseResult,
  })
  confirm()
}



const parse = async (result: Uint8Array): Promise<Node[]> => {
  console.time('parse')
  store.setLoading('loading')
  const sharedBuffer = new SharedArrayBuffer(result.byteLength)
  const sharedArray = new Uint8Array(sharedBuffer)
  sharedArray.set(result)
  worker?.postMessage(sharedArray)

  return new Promise((resolve) => {
    worker?.addEventListener('message', (e) => {
      const parseResultJSON = JSON.parse(new TextDecoder().decode(e.data))
      console.timeEnd('parse')
      store.setLoading('finish')
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
        <div class="name">边类型:  </div>
        <div class="code">${data.lineStyle.edge_type}</div>
      </div>
      <div class="item">
        <div class="name">名称或下标:  </div>
        <div class="code">${data.lineStyle.name_or_index}</div>
      </div>
      </div>`
    }
    const { compare_type, bigger_number, source, constructor, node_type, size, retained_size } = data.itemStyle as Node
    return `<div class="tooltipText">
      ${compare_type ? ` <div class="item">
          <div class="name red">比较类型: ${compare_type === 'addtional' ? '新增节点' : '可GC大小增大节点'} </div>
      </div>` : ''
      }
      ${bigger_number ? ` <div class="item">
        <div class="name red">可GC大小增长: ${unitConvert(bigger_number)} </div>
      </div>` : ''
      }
      <div class="item">
        <div class="name">节点ID:  </div>
        <div class="code">${data.id || ''}</div>
      </div>
      <div class="item">
        <div class="name">节点类型:  </div>
        <div class="code">${node_type}</div>
      </div>
      ${constructor ? ` <div class="item">
        <div class="name">构造函数:  </div>
        <div class="code">${constructor}</div>
      </div>` : ''
      }
      <div class="item">
        <div class="name">节点名称:  </div>
        <div class="code">${data.name}</div>
      </div>
      <div class="item">
        <div class="name">自身大小:  </div>
        <div class="code">${unitConvert(size)}</div>
      </div>
      <div class="item">
        <div class="name">可GC大小:  </div>
        <div class="code">${unitConvert(retained_size)}</div>
      </div>
      ${source ? ` <div class="item">
        <div class="name">源文件位置:  </div>
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
  let res: Node[] = []
  if (compare.value.is) {
    const { addtionalLen, mode } = compare.value
    res = mode === 'addtional' ? store.compareData.slice(0, addtionalLen) : store.compareData.slice(addtionalLen)
  } else {
    res = store.data
  }
  children.value.render(res.filter(item => item.constructor === renderOptions.filterNodeByConstructor || renderOptions.filterNodeByConstructor === 'all'))
}


provide('renderOptions', renderOptions)


</script>

<style lang="less">
@import '@/common.less';
@import './index.less';
</style>
