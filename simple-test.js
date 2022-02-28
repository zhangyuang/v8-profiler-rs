const { parseSnapShot } = require('./index')
const { parseSnapshotJs } = require('./snapshot')

let start = Date.now()
parseSnapshotJs()
console.log('js parse time', Date.now() - start)
start = Date.now()
parseSnapShot()
console.log('napi parse time', Date.now() - start)
