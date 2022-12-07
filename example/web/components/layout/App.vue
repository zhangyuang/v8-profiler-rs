<template>
  <onlyCsr>
    <div class="container">
      <div class="board">
        <div class="title">
          控制面板
        </div>
        <!-- <Field class="field" v-model="nodeSize" label="节点大小"></Field> -->
        <Field class="field" v-model="nodeName" label="节点名称"></Field>
        <template v-if=isIndex>
          <Field class="field" v-model="nodeId" label="节点id"></Field>
          <Field class="field" v-model="maxNodes" label="节点数量"></Field>
        </template>
        <template v-if=!isIndex>
          <Field class="field" v-model="parentDepth" label="被引用深度"></Field>
          <Field class="field" v-model="childDepth" label="引用深度"></Field>
          <Field class="field" v-model="edgeCounts" label="最大边数量"></Field>
          <Field class="field" v-model="filterNative" label="过滤原生节点"></Field>
        </template>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="parseMethod" :options="option" />
        </DropdownMenu>
        <input type="file" @change="upload" ref="fileRef" accept=".heapsnapshot" class="inputFile" multiple="true">
        <Button type="primary" class="btn" @click="fileRef.click()" v-if="store.loaded !== 'finish'">上传文件</Button>
        <Button type="primary" class="btn" @click="confirm">重新绘制</Button>
        <!-- <Button type="primary" class="btn" @click="show">查看序列化数据</Button> -->
        <Button type="primary" class="btn" @click="handbook">使用手册</Button>
        <Button type="primary" class="btn" @click="toRepo">代码仓库(欢迎 Star✨)</Button>
        <Button type="primary" class="btn" @click="defaultDemo" v-if="store.loaded === 'null'">查看默认示例</Button>
      </div>
      <div class="chartContainer">
        <div class="loadingContainer" v-if="store.loaded === 'loading'">
          <Loading color="#5b92f8" size="50" v-if="parseMethod !== 'wasm'"></Loading>
          <div class="text" v-if="parseMethod == 'wasm'">使用 Webassembly 解析文件中这大概需要
            3-10s 左右的时间，请稍后...</div>
          <div class="text" v-else>文件解析中这大概需要10s左右的时间，请稍后...</div>
        </div>

        <router-view v-slot="{ Component }">
          <component ref="children" :is="Component" />
        </router-view>
        <div v-if="store.loaded === 'null'" class="tips">
          请选择 V8 内存堆快照文件上传
        </div>
      </div>
    </div>
  </onlyCsr>
</template>

<script lang="ts" setup>
import { ref, provide, reactive, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Field, Notify, Loading, DropdownMenu, DropdownItem } from 'vant'
import { onlyCsr } from 'ssr-hoc-vue3'
import axios from 'axios'
import type { Node, RenderOptions } from '@/type'
import { useSnapShotStore } from '@/store'
import { sortByRs } from '@/utils'
const store = useSnapShotStore()
const router = useRouter()
const route = useRoute()
const path = route.path
const fileRef = ref()

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
  parseMethod: 'wasm',
  tooltip: {},
  force: {},
  label: {},
  compare: {
    addtionalIndex: -1
  }
} as RenderOptions)
defineExpose({
  renderOptions
})
renderOptions.label = {
  show: true,
  position: 'right',
  formatter: (params: any) => {
    return (params.data.name?.length < 20 && params.data.name?.length > 0) ? params.data.name : params.data.id
  }
}
const option = [
  { text: '解析方式', value: 'wasm' },
  { text: 'wasm', value: 'wasm' },
  { text: 'http', value: 'http' },
];
const defaultDemoStr = __isBrowser__ ? JSON.stringify(require('@/pages/index/closure.json')) : ''
const toRepo = () => {
  window.open('https://github.com/zhangyuang/v8-profiler-rs')
}
const handbook = () => {
  window.open('http://doc.ssr-fc.com/docs/features$memory')
}
watch(router.currentRoute, (to) => {
  renderOptions.isIndex = to.path === '/'
})
const id: Record<number | string, Node> = {}

const defaultDemo = async () => {
  await parse(defaultDemoStr)
}
const upload = async (e: any) => {
  //@ts-expect-error
  const file = Array.from((e.target as HTMLInputElement)?.files)
  if (!file || file.length > 2) {
    Notify({
      type: 'danger',
      message: '当前最大只支持选择两个文件'
    })
    return
  }
  if (file.length == 2) {
    file.sort((a, b) => a.size - b.size);
    const [small, big] = await Promise.all([read(file[0]), read(file[1])]);
    const smallRes = await parse(small)
    setTimeout(async () => {
      const bigRes = await parse(big)
      const [additionalNode, biggerNode] = await parseMultiply([smallRes, bigRes])
      renderOptions.compare.addtionalIndex = additionalNode.length
      store.setData({
        data: additionalNode.concat(biggerNode)
      })
      confirm()
    }, 1000);
    return
  }
  const result = await read(file[0])
  const parseResult = await parse(result)
  store.setData({
    data: parseResult
  })
  confirm()
}

const read = async (file: any): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = (e: any) => {
      resolve(e.target!.result?.toString())
    }
  })
}
const parseMultiply = (arr: Array<Node[]>) => {
  const additionalNode: Node[] = []
  const biggerNode: Node[] = []
  const [smallRes, bigRes] = [arr[0], arr[1]];
  const smallNodeMap: Record<number, Node> = {}
  smallRes.forEach((smallNode, index) => {
    smallNodeMap[index] = smallNode
  })
  for (const bigNode of bigRes) {
    const { id: bigNodeId } = bigNode
    if (!smallNodeMap[bigNodeId]) {
      // 新增节点
      bigNode.compareType = 'addtional'
      additionalNode.push(bigNode)
    } else {
      // 相同 id 的节点 retained_size 发生变化的
      if (bigNode.rs > smallNodeMap[bigNodeId].rs) {
        bigNode.compareType = 'bigger'
        biggerNode.push(bigNode)
      }
    }
  }
  return [additionalNode.sort(sortByRs).slice(0, Math.ceil(renderOptions.maxNodes / 2)), biggerNode.sort(sortByRs).slice(0, Math.ceil(renderOptions.maxNodes / 2))]
}

const parse = async (result: string): Promise<Node[]> => {
  try {
    let parseResult: Node[] = []
    store.setLoading('loading')
    const start = Date.now()
    if (renderOptions.parseMethod === 'wasm') {
      // use wasm
      const { parse_v8_snapshot } = process.env.NODE_ENV === 'development' ? await import(`@/pkg/v8_profiler_rs`) : await import('v8-profiler-rs')
      const snapShot = parse_v8_snapshot(result as string)
      console.log(`Complete parse time spend ${Date.now() - start}ms`)
      parseResult = JSON.parse(snapShot)
    } else {
      const url = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3000/parsev8' : `${location.protocol}//v8.ssr-fc.com/parsev8`
      const res = await axios.post(url, {
        source: result
      }, {
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
      })
      console.log(`Complete parse time spend ${Date.now() - start}ms`)
      parseResult = res.data
    }
    store.setLoading('finish')
    for (const item of store.data) {
      id[item.id] = item
    }
    return parseResult
  } catch (error) {
    console.log(error)
    store.setLoading('finish')
    Notify({
      type: 'danger',
      message: '请确认当前上传的文件内容是否正确'
    })
    return []
  }
}
const oneKb = 1024
const oneMb = 1024 * 1024

const unitConvert = (byte: number | string) => {
  const val = Number(byte)
  if (val > 5 * oneMb) {
    return byteToMb(byte)
  }
  if (val > oneKb) {
    return (val / oneKb).toFixed(2) + 'Kb'
  } else {
    return val + 'Byte'
  }
}
const byteToMb = (byte: number | string) => {
  const val = Number(byte)
  return (val / oneMb).toFixed(2) + 'Mb'
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
        <div class="code">${data.lineStyle.edge_type || ''}</div>
      </div>
      <div class="item">
        <div class="name">名称或下标:  </div>
        <div class="code">${data.lineStyle.name_or_index}</div>
      </div>
      </div>`
    }
    const edges = data.itemStyle.edges as Node['edges']
    const sharedEdge = edges.find(item => item.ni === 'shared')
    let source = ''
    if (sharedEdge) {
      const sharedEdgeNode = id[sharedEdge?.tn]
      if (sharedEdgeNode) {
        const edge = sharedEdgeNode.edges.find(item => item.ni === 'script_or_debug_info')
        if (edge) {
          source = id[id[edge.tn]?.edges.find(item => item.ni === 'name')?.tn ?? Number.MAX_SAFE_INTEGER]?.name
        }
      }
    }
    const { compareType } = data.itemStyle
    return `<div class="tooltipText">
      ${compareType ? ` <div class="item">
        <div class="name">比较类型: ${compareType === 'addtional' ? '新增节点' : '可GC大小增大节点'} </div>
      </div>` : ''
      }
      <div class="item">
        <div class="name">节点ID:  </div>
        <div class="code">${data.id || ''}</div>
      </div>
      <div class="item">
        <div class="name">节点类型:  </div>
        <div class="code">${data.itemStyle.type || ''}</div>
      </div>
      <div class="item">
        <div class="name">节点名称:  </div>
        <div class="code">${data.name || ''}</div>
      </div>
      <div class="item">
        <div class="name">自身大小:  </div>
        <div class="code">${unitConvert(data.itemStyle.self_size)}</div>
      </div>
      <div class="item">
        <div class="name">可GC大小:  </div>
        <div class="code">${unitConvert(data.value)}</div>
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
renderOptions.force = {
  initLayout: 'circular',
  gravity: 0.1,
  repulsion: 200,
  edgeLength: 150
}
const children = ref()
const confirm = () => {
  console.log('renderOptions', renderOptions)
  children.value.render(store.data)
}

provide('renderOptions', renderOptions)

const { maxNodes, isIndex, edgeCounts, parentDepth, childDepth,
  nodeName, nodeId, filterNative, parseMethod,
} = toRefs(renderOptions)
</script>

<style lang="less">
@import '@/common.less';

.container {
  height: 100%;
  display: flex;

  .board {
    display: flex;
    padding: 20px 20px;

    flex-direction: column;
    align-items: center;
    background-color: #eee;
    min-width: 200px;
    box-sizing: border-box;
  }

  .title {
    color: rgba(0, 0green, 0, .5);
    margin-bottom: 20px;
  }

  .inputFile {
    position: fixed;
    top: -100px;
  }

  .field {
    width: 100%;
    margin-bottom: 20px;
  }

  .tips {
    .verticalLevelCenter;
    color: rgba(0, 0green, 0, .5);
  }

  .btn {
    width: 100%;
    margin-bottom: 20px;
  }

  .relative {
    position: relative;

  }

  .formatBtn {
    .verticalCenter;
    width: 80%;

  }

  .chartContainer {
    width: 100%;
    position: relative;
  }

  .refText {
    display: flex;
    justify-content: center;
    color: #646566;
    margin-bottom: 10px;
  }
}
</style>
