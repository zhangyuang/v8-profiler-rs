import { defineStore } from 'pinia'
import type { Node } from '@/type'


export const useSnapShotStore = defineStore('snapShotStore', {
  state: () => {
    return {
      data: [] as Node[],
      loaded: 'null',
      idOrdinal: {} as Record<number | string, number>,
      compareData: [] as Node[]
    }
  },
  actions: {
    setData(payload: { data: Node[], compareData?: Node[] }) {
      const { data = [], compareData = [] } = payload
      this.compareData = compareData
      this.data = data
      this.loaded = 'finish'
    },
    setLoading(text: string) {
      this.loaded = text
    }
  }
})