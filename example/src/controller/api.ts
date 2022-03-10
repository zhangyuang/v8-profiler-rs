import { resolve } from 'path'
import { Readable } from 'stream'
import { Inject, Controller, Provide, Get } from '@midwayjs/decorator'
import { Context } from 'egg'
import { parseSnapShot } from '~/index'
// import { parseSnapshotWithJS } from '~/snapshot.js'

@Provide()
@Controller('/api')
export class Api {
  @Inject()
  ctx: Context

  @Get('/parsesnapshot')
  async getIndexData() {
    const start = Date.now()
    const startMemory = process.memoryUsage().heapUsed
    const data = parseSnapShot(resolve(__dirname, '../../../v8.heapsnapshot'))
    console.log('memory userage', ((process.memoryUsage().heapUsed - startMemory) / 1024 / 1024).toFixed(2) + 'MB')
    console.log('execute time', Date.now() - start)
    const stream = new Readable()
    stream.push(data)
    stream.push(null)

    this.ctx.body = stream
  }
}
