const fs = require('fs')


global.bigArr = 1
global.bigArr2 = '2'
global.bigArr3 = []
global.bigArr4 = new Array(10000)
global.bigArr5 = new Object()

// const bar = {
//   1:2
// }
// global.bigNumber222 = {
//   a: bar
// }
// // for (let i =0;i<1000;i++) {
// //   bigArr.push(new Array(100000))
// // }
const stream = require('v8').getHeapSnapshot()

stream.pipe(fs.createWriteStream('bigData.heapsnapshot'))