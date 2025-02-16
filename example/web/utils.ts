import { ref } from 'vue'
import { Notify } from 'vant'
import { globalStore } from '@/store'
import type { Node } from './type'
export const noRepeat = (arr: number[]) => Array.from(new Set(arr))


export enum NodeType {
  kHidden = 'hidden',         // Hidden node, may be filtered when shown to user.
  kArray = 'array',          // An array of elements.
  kString = 'string',         // A string.
  kObject = 'object',         // A JS object (except for arrays and strings).
  kCode = 'code',           // Compiled code.
  kClosure = 'closure',        // Function closure.
  kRegExp = 'regexp',         // RegExp.
  kHeapNumber = 'number',     // Number stored in the heap.
  kNative = 'native',         // Native object (not from V8 heap).
  kSynthetic = 'synthetic',      // Synthetic object, usually used for grouping
  // snapshot items together.
  kConsString = 'concatenated string',    // Concatenated string. A pair of pointers to strings.
  kSlicedString = 'sliced string',  // Sliced string. A fragment of another string.
  kSymbol = 'symbol',        // A Symbol (ES6).
  kBigInt = 'bigint',        // BigInt.
  kObjectShape = 14,   // Internal data used for tracking the shapes (or
  // "hidden classes") of JS objects.
}
export const NODE_COLORS: Record<string, string> = {
  '(system)': '#D32F2F',       // bright red for system
  'array': '#1976D2',         // bright blue for arrays
  'string': '#388E3C',        // bright green for strings
  'object': '#E65100',
  '(compiled code)': '#7B1FA2', // bright purple for compiled code
  'closure': '#FF4081',       // bright pink for closures
  'regexp': '#F57F17',        // bright goldenrod for regexps
  'number': '#2E7D32',        // bright green for numbers
  'native': '#795548',        // brown for native
  'synthetic': '#303F9F',     // bright slate blue for synthetic
  'concatenated string': '#388E3C', // same as string
  'sliced string': '#388E3C',  // same as string
  'symbol': '#A1887F',        // lighter brown for symbols
  'bigint': '#2E7D32',        // same as number
  'hidden': '#757575',         // medium gray for hidden
  'unknown': '#212121'         // dark gray for unknown
}




export const EDGE_COLORS: Record<string, string> = {
  'context': '#D32F2F',    // bright red
  'element': '#1976D2',    // bright blue 
  'property': '#388E3C',   // bright green
  'internal': '#E65100',   // bright orange
  'shortcut': '#7B1FA2',   // bright purple
  // 'hidden': '#757575',     // medium gray
  // 'weak': '#FF4081',       // bright pink
};
export const EDGE_TYPES_PROPERTY = Object.keys(EDGE_COLORS)

export const NODE_TYPES_PROPERTY = [
  "hidden",
  "array",
  "string",
  "object",
  "code",
  "closure",
  "regexp",
  "number",
  "native",
  "synthetic",
  "concatenated string",
  "sliced string",
  "symbol",
  "bigint",
];
export const CONSTRUCTOR_PROPERTY = [
  "(system)",
  "array",
  "string",
  "object",
  "(compiled code)",
  "closure",
  "regexp",
  "number",
  "native",
  "synthetic",
  "concatenated string",
  "sliced string",
  "symbol",
  "bigint",
];

export const tips = (text: string, type?: 'warning' | 'danger' | 'primary') => {
  Notify({
    type: type || 'warning',
    duration: 5000,
    message: text
  })
}
export enum Colors {
  jsNative = '#800080',
  jsNotNative = '#DA70D6',
  cNative = '#000',
  normal = '#4187f2',
  current = 'red'
}

export const renderNodeId = ref('')
export const compareName = (name: string, target: string) => {
  return new RegExp(target).test(name)
}
export const nativeNode = [NodeType.kNative, NodeType.kHidden, NodeType.kSynthetic]

export const read = async (file: any): Promise<Uint8Array> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const bytes = new Uint8Array(e.target?.result as ArrayBuffer);
      resolve(bytes);
    }
  })
}
export const readAsStr = async (file: any): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(file);
    reader.onload = function (e: any) {
      resolve(e.target.result);
    }
  })
}
export const parseOptions = [
  { text: 'Parse Method', value: 'wasm' },
  { text: 'Wasm + WebWorker', value: 'webworker' },
];
export const compareOptions = [
  { text: 'Compare Type', value: 'addtional' },
  { text: 'Additional Nodes', value: 'addtional' },
  { text: 'Growing Nodes', value: 'bigger' },
];

export const filterNodeOptions = [
  { text: 'Filter Nodes', value: 0 },
  { text: 'Show Nodes With Source Path', value: 1 },
]

export const filterConstructorOptions = ref([
  { text: 'Filter Nodes type', value: 'all' },
])

export const getNodeById = (data: Node[], idOrdinal: Record<number, number>, nodeId: number) => {
  return data[idOrdinal[nodeId]]
}

export const MAXNODESCOUNT = 50 * 1024 * 1024 // 50 mb 默认开启过滤

export const memoryPercent = (node: Node, root: Node) => {
  return ((node.retained_size / root.retained_size) * 100).toFixed(2) + '%'
}

export const calculateByConstructor = (nodes?: Node[]) => {
  if (!nodes) {
    nodes = globalStore.data
  }
  const constructorCounts: Record<string, number> = {};

  // Count nodes by constructor
  nodes.forEach(node => {
    const constructor = node.constructor || 'unknown';
    constructorCounts[constructor] = (constructorCounts[constructor] || 0) + 1;
  });

  // Sort constructors by count and get top 10
  const sortedConstructors = Object.entries(constructorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }), {});
  filterConstructorOptions.value = [{ text: 'Filter Nodes type', value: 'all' }]
    .concat(Object.keys(sortedConstructors).map(item => ({ text: item, value: item })))
  return sortedConstructors
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}