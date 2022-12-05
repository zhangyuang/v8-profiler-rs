import { defineStore } from 'pinia'
import type { Node } from '@/type'


export const useSnapShotStore = defineStore('snapShotStore', {
  state: () => {
    return { data: [] as Node[], loaded: 'null' } 
  },
  actions: {
    setData (payload: {data: any}) {
      this.data = payload.data
      this.loaded = 'finish'
    },
    setLoading (text: string) {
      this.loaded = text
    }
  }
})