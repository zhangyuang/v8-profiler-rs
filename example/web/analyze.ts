import type { Node, SortDetail, Params } from './type'

export const NAME_PROPERTY = [
  "system / Map", 
  "Array",
  "Object",
  "symbol"
];

export const analyzeSingle = (params: Params) => {
  const { type, data } = params
  if (type === 'panel') {
    return analyzeStatistic(data)
  } else {
    const { sortByCount, sortRetainedSize } = analyzeStatistic(data)
    const text = `
              JS 层重复节点
      ${sortByCount.map(item => {
      return `节点名称: ${item.name}, 重复次数: ${item.count},共占用内存 ${unitConvert(item.shallowSize)}
              ${getSource(item.sourceString)}
              `
    }).join(`
      `)}
              JS层自身内存比可GC内存比例最大节点：
      ${sortRetainedSize.map(item => {
      return `节点名称: ${item.name}@${item.id},GC后可释放 ${unitConvert(item.retained_size)}，占用内存${item.percent}, 可GC内存倍数${item.pt}倍
              存在于文件 ${item.source}
              `
    }).join(`
      `)}
      `
    return text
  }
}

const getSource = (sourceString: string) => {
  if (sourceString.includes('<br />')) {
    return `
            存在于多个文件 ${sourceString.split('<br />').join(`
    `).replace('<br/>', '')}
    `
  } else {
    return `
            仅存在于文件 ${sourceString}，疑似存在内存泄漏
    `
  }
}

const oneKb = 1024
const oneMb = 1024 * 1024
export const unitConvert = (byte: number | string) => {
  const val = Number(byte)
  if (val > 5 * oneMb) {
    return byteToMb(byte)
  }
  if (val > oneKb) {
    return (val / oneKb).toFixed(2) + 'kb'
  } else {
    return val + 'byte'
  }
}
const byteToMb = (byte: number | string) => {
  const val = Number(byte)
  return (val / oneMb).toFixed(2) + 'mb'
}
export const analyzeCompare = (before: Node[], now: Node[], type: string) => {
  const [additionalNode, biggerNode] = parseMultiply([before, now])
  const additionalStatistic = analyzeStatistic(additionalNode)
  const biggerStatistic = analyzeStatistic(biggerNode)

  if (type === 'panel') {
    return {
      additionalNode,
      biggerNode,
      additionalStatistic,
      biggerStatistic
    }
  } else {
    const { sortByCount, sortRetainedSize } = additionalStatistic
    const { sortRetainedSize: biggerSortRetainedSize } = biggerStatistic
    const text = `
              新增节点中JS层重复节点
      ${sortByCount.map(item => {
      return `
              节点名称: ${item.name}, 新增次数 ${item.count}，共占用内存 ${unitConvert(item.shallowSize)}
              ${getSource(item.sourceString)}
              `
    }).join(`
      `)}
              新增节点中JS层占用内存最大节点
      ${sortRetainedSize.map(item => {
      return `
              节点名称: ${item.name}@${item.id},可释放大小大小${unitConvert(item.retained_size)}, 可释放大小占总内存${item.percent}
              位于文件 ${item.source}
              `
    }).join(`
      `)}
              增大节点中JS层占用内存最大节点
      ${biggerSortRetainedSize.map(item => {
      return `
              节点名称: ${item.name}@${item.id},增长大小${unitConvert(item.bigger_number ?? 0)}, 可释放大小占总内存${item.percent}
              位于文件 ${item.source}
              `
    }).join(`
      `)}
      `
    console.log(text)
    return text
  }
}

const parseMultiply = (arr: Array<Node[]>) => {
  const additionalNode: Node[] = []
  const biggerNode: Node[] = []
  const [smallRes, bigRes] = [arr[0], arr[1]];
  const smallNodeMap: Record<number, number> = {}
  smallRes.forEach((smallNode) => {
    smallNodeMap[smallNode.id] = smallNode.retained_size
  })
  for (const bigNode of bigRes) {
    const { id: bigNodeId } = bigNode
    if (!smallNodeMap[bigNodeId]) {
      // 新增节点
      bigNode.compare_type = 'addtional'
      additionalNode.push(bigNode)
    } else {
      // 相同 id 的节点 retained_size 发生变化的
      if (bigNode.retained_size > smallNodeMap[bigNodeId]) {
        bigNode.compare_type = 'bigger'
        bigNode.bigger_number = bigNode.retained_size - smallNodeMap[bigNodeId]
        biggerNode.push(bigNode)
      }
    }
  }
  return [additionalNode, biggerNode]
}
export const isNativeSource = (source: string) => source.startsWith('node:') || source.startsWith('internal/')
const pushDetail = (obj: Record<string, SortDetail>, node: Node, type: 'name') => {
  const key = node[type]
  const source = obj[key].source ?? []
  if (!source.includes(node.source!)) {
    obj[key].source?.push(node.source!)
  }
  obj[key].count = obj[key].count + 1
  obj[key].shallowSize = obj[key].shallowSize + node.size
  obj[key].retainedSize = obj[key].retainedSize + node.retained_size
}

export const memoryPercent = (node: Node, root: Node) => {
  return ((node.retained_size / root.retained_size) * 100).toFixed(2) + '%'
}

const analyzeStatistic = (data: Node[]) => {
  const countObj: Record<string, SortDetail> = {}
  data.forEach((node) => {
    if (node.source && node.name && !isNativeSource(node.source)) {
      if (!countObj[node.name]) {
        countObj[node.name] = {
          name: node.name,
          source: [node.source],
          sourceString: '',
          count: 1,
          shallowSize: node.size,
          retainedSize: node.retained_size
        }
      } else {
        pushDetail(countObj, node, 'name')
      }
    }
  })
  const arr: SortDetail[] = []
  Object.values(countObj).forEach(item => {
    if (item.source && item.source.length > 5) {
      item.source = item.source.slice(0, 5)
      item.sourceString = item.source.join('<br />') + '<br/>...'
    } else {
      item.sourceString = item.source?.join('<br />') ?? ''
    }
    delete item.source
    arr.push(item)
  })
  return {
    is: true,
    sortByCount: arr.sort((a, b) => b.count - a.count).slice(0, 5),
    sortRetainedSize: data.filter(item => item.source?.length && !isNativeSource(item.source)).slice(0, 5).map(item => {
      item.percent = memoryPercent(item, data[0])
      return item
    })
  }
}