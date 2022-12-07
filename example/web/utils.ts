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

export const nativeNode: string[] = [NodeType.kHidden, NodeType.kSynthetic] as string[]

export const getColor = (node: Node, index: string | number, maxNodes: string | number) => {
  if (nativeNode.includes(node.nt)) {
    return 'black'
  } else {
    return '#4187f2'
  }
}