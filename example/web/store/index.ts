import type { Node } from '@/type'




export const globalStore = {
  idToNode: {} as Record<number | string, Node>,
  data: [] as Node[],
  additionalNodes: [] as Node[],
  biggerNodes: [] as Node[],
}