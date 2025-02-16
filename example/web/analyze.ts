import type { Node } from './type'



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
export const byteToMb = (byte: number | string) => {
  const val = Number(byte)
  return (val / oneMb).toFixed(2) + 'mb'
}

export const isNativeSource = (source: string) => source.startsWith('node:') || source.startsWith('internal/')


export const memoryPercent = (node: Node, root: Node) => {
  return ((node.retained_size / root.retained_size) * 100).toFixed(2) + '%'
}

