<template>
  <onlyCsr>
    <div class="container">
      <div class="board">
        <div class="title">
          控制面板
        </div>
        <!-- <Field class="field" v-model="nodeSize" label="节点大小"></Field> -->
        <Field class="field" v-model="nodeName" label="节点名称"></Field>
        <Field class="field" v-model="nodeId" label="节点id"></Field>
        <template v-if=isIndex>
          <Field class="field" v-model="maxNodes" label="节点数量"></Field>
        </template>
        <template v-if=!isIndex>
          <Field class="field" v-model="parentDepth" label="被引用深度"></Field>
          <Field class="field" v-model="childDepth" label="引用深度"></Field>
          <Field class="field" v-model="edgeCounts" label="最大边数量"></Field>
          <Field class="field" v-model="filterNative" label="过滤原生节点"></Field>
          <!-- <div>
            <div class="refText">
              all-0 strong-1 weak-2
            </div>
            <Field class="field" v-model="weakOrStrong" label="过滤引用关系"></Field>
          </div> -->
        </template>
        <DropdownMenu class="field">
          <DropdownItem class="field" v-model="parseMethod" :options="option" />
        </DropdownMenu>
        <input type="file" @change="upload" ref="fileRef" accept=".heapsnapshot" class="inputFile">
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
import { ref, provide, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Field, Notify, Loading, DropdownMenu, DropdownItem } from 'vant'
import { onlyCsr } from 'ssr-hoc-vue3'
import axios from 'axios'
import type { TooltipComponentOption } from 'echarts'
import type { Node } from '@/type'
import { useSnapShotStore } from '@/store'
const store = useSnapShotStore()
const router = useRouter()
const route = useRoute()
const path = route.path
const isIndex = ref(path === '/')
const maxNodes = ref(50)
const nodeSize = ref(10)
const edgeLength = ref(150)
const edgeCounts = ref(5)
const parentDepth = ref(2)
const childDepth = ref(2)
const weakOrStrong = ref('0')
const fileRef = ref()
const nodeName = ref('')
const nodeId = ref('')
const filterNative = ref('0')
const parseMethod = ref('wasm')
const label = reactive({
  show: true,
  position: 'right',
  formatter: (params: any) => {
    return (params.data.name?.length < 20 && params.data.name?.length > 0) ? params.data.name : params.data.id
  }
})
const option = [
  { text: '解析方式', value: 'wasm' },
  { text: 'wasm', value: 'wasm' },
  { text: 'http', value: 'http' },
];
const defaultDemoStr = __isBrowser__ ? JSON.stringify(require('@/pages/index/closure.json')) : {}
const toRepo = () => {
  window.open('https://github.com/zhangyuang/v8-profiler-rs')
}
const handbook = () => {
  window.open('http://doc.ssr-fc.com/docs/features$memory')
}
watch(router.currentRoute, (to) => {
  isIndex.value = to.path === '/'
})
const id: Record<number | string, Node> = {}

const defaultDemo = async () => {
  await parse({
    target: {
      result: defaultDemoStr
    }
  })
}
const upload = async (e: any) => {
  const reader = new FileReader()
  const file = e.target?.files?.[0]
  if (!file) {
    return
  }
  reader.readAsText(file, 'utf-8')
  reader.onload = (e: any) => {
    parse(e)
  }
}
const parse = async (e: any) => {
  try {
    store.setLoading('loading')
    const start = Date.now()
    if (parseMethod.value === 'wasm') {
      // use wasm
      const { parse_v8_snapshot } = process.env.NODE_ENV === 'development' ? await import('@/pkg/v8_profiler_rs') : await import('v8-profiler-rs')
      const result = e.target!.result?.toString()
      const snapShot = parse_v8_snapshot(result as string)
      console.log(`Parse Time spend ${Date.now() - start}ms`)
      store.setData({
        data: JSON.parse(snapShot)
      })
    } else {
      const url = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3000/parsev8' : `${location.protocol}//v8.ssr-fc.com/parsev8`
      const res = await axios.post(url, {
        source: e.target!.result?.toString()
      }, {
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
      })
      console.log(`Parse Time spend ${Date.now() - start}ms`)
      store.setData({
        data: res.data
      })
    }
    store.setLoading('finish')
    for (const item of store.data) {
      id[item.id] = item
    }
    confirm()
  } catch (error) {
    console.log(error)
    store.setLoading('finish')
    Notify({
      type: 'danger',
      message: '请确认当前上传的文件内容是否正确'
    })
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
const tooltip: TooltipComponentOption = {
  trigger: 'item',
  show: true,
  formatter: (params: any) => {
    const { data } = params
    if (!data.id) {
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
    return `<div class="tooltipText">
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
const force = reactive({
  initLayout: 'circular',
  gravity: 0.1,
  repulsion: 200,
  edgeLength: 150
})
const children = ref()

// const show = () => {
//   window.open('/format')
// }
const confirm = () => {
  children.value.render(store.data)
}

provide('maxNodes', maxNodes)
provide('nodeSize', nodeSize)
provide('edgeLength', edgeLength)
provide('force', force)
provide('edgeCounts', edgeCounts)
provide('parentDepth', parentDepth)
provide('childDepth', childDepth)
provide('label', label)
provide('tooltip', tooltip)
provide('weakOrStrong', weakOrStrong)
provide('nodeName', nodeName)
provide('nodeId', nodeId)
provide('filterNative', filterNative)


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
