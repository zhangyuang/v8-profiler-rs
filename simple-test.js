const { parseSnapShot } = require('./index')
const { parseSnapshotJs } = require('./snapshot')

let start = Date.now()
parseSnapshotJs('v8.heapsnapshot')
console.log('js parse time', Date.now() - start + 'ms')
start = Date.now()
parseSnapShot('v8.heapsnapshot')
console.log('napi parse time', Date.now() - start + 'ms')
