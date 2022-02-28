const { parseSnapshot } = require('./index')

const start = Date.now()
parseSnapshot()
console.log(Date.now() - start)
