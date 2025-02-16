
export type Handlers = (params: string | Uint8Array, type: 'single', filterEdge: boolean) => { data: string }
export type SortDetail = {
  name: string
  source?: string[]
  sourceString: string
  count: number
  shallowSize: number
  retainedSize: number
}

export type Params = {
  data: Node[]
  type?: string
  write?: boolean
}
export type Node = {
  node_type: string;
  name: string;
  id: number;
  size: number;
  edge_count: number;
  retained_size: number;
  pt: number;
  edges: {
    edge_type: string;
    to_node: number;
    name_or_index: string;
    is_weak: boolean;
    is_ref: boolean;
  }[];
  parents: number[];
  bigger_number?: number;
  source?: string;
  constructor: string;
  percent?: string;
  retainer: number
}

export type Analyze = {
  sortByCount?: SortDetail[]
  sortRetainedSize?: Node[],
}
export type RenderOptions = {
  isIndex: boolean;
  maxNodes: number;
  nodeSize: number;
  edgeLength: number;
  edgeCounts: number;
  childDepth: number;
  nodeName: string;
  nodeId: string;
  filterNative: number,
  tooltip: {},
  force: {},
  label: {},
  analyze: {
    type: 'single' | 'compare',
    compare: 'addtional' | 'bigger'
  },
  filterNode: number
  nodeByConstructor?: Record<string, number>
  filterNodeByConstructor?: string
}