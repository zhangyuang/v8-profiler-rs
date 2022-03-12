const fs = require('fs')
// let leakObject = null
// let count = 0
// setInterval(function testMemoryLeak() {
//   console.log(count)
//   const originLeakObject = leakObject
//   const unused = function () {
//     if (originLeakObject) {
//       console.log('originLeakObject')
//     }
//   }
//   if (count === 30) {
//     const stream = require('v8').getHeapSnapshot()
//     stream.pipe(fs.createWriteStream('v8.heapsnapshot'))
//     stream.on('end', () => {
//       process.exit()
//     })
//   }
//   leakObject = {
//     count: String(count++),
//     leakStr: new Array(1e7).join('*'),
//     leakMethod: function () {
//       console.log('leakMessage')
//     }
//   }
// }, 20)

function Student() {
  this.name = 'lll';
}

var a = new Student();

var b = new String("ccccc");
const stream = require('v8').getHeapSnapshot()
stream.pipe(fs.createWriteStream('v8.heapsnapshot'))