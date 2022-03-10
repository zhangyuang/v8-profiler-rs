const { parseSnapShot, parseSnapShotWithMap } = require('./index')
const { parseSnapshotWithJS, parseSnapshotWithJSMap } = require('./snapshot')

let start = Date.now()
parseSnapshotWithJS('v8.heapsnapshot')
console.log('js parse time', Date.now() - start + 'ms')
start = Date.now()
parseSnapShot('v8.heapsnapshot')
console.log('napi parse time', Date.now() - start + 'ms')
