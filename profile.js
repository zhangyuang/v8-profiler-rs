var fs = require('fs');
// const { takeHeapSnapShot, initial } = require('./index')
let leakObject = null
let count = 0
// initial()
// takeHeapSnapShot('snapshot.heapsnapshot')
// console.log(process.memoryUsage())
const _cached = [];

// const { writeHeapSnapshot } = require('v8')
setInterval(function testMemoryLeak() {
  console.log(count)
  const originLeakObject = leakObject
  const unused = function () {
    if (originLeakObject) {
      console.log('originLeakObject')
    }
  }
  if (count === 30) {
    // require('heapdump').writeSnapshot('snapshotheapdump.heapsnapshot');
    const stream = require('v8').getHeapSnapshot();
    stream.pipe(fs.createWriteStream('heapdump.heapsnapshot'))
    // process.exit()
  }
  leakObject = {
    count: String(count++),
    leakStr: new Array(1e7).join('*'),
    leakMethod: function () {
      console.log('leakMessage')
    }
  }
}, 20)