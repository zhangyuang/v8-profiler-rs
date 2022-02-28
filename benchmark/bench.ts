import b from 'benny'

import { parseSnapshot } from '../index'
//@ts-expect-error
import { parseSnapshotJs } from '../snapshot.js'

async function run() {
  await b.suite(
    'parseSnapShot',

    b.add('Native parseSnapShot', () => {
      parseSnapshot()
    }),

    b.add('JavaScript parseSnapShot', async () => {
      await parseSnapshotJs()
    }),

    b.cycle(),
    b.complete(),
  )
}

run().catch((e) => {
  console.error(e)
})
