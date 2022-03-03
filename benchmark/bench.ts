import b from 'benny'

import { parseSnapShot } from '../index'
// @ts-expect-error
import { parseSnapshotWithJS } from '../snapshot.js'

async function run() {

  await b.suite(
    'parseSnapShot',

    b.add('Native parseSnapShot', () => {
      parseSnapShot('v8.heapsnapshot')
    }),

    b.add('JavaScript parseSnapShot', () => {
      parseSnapshotWithJS('v8.heapsnapshot')
    }),

    b.cycle(),
    b.complete()

  )
}

run().catch((e) => {
  console.error(e)
})
