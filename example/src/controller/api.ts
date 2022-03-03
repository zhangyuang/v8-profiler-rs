import { resolve } from 'path'
import { Inject, Controller, Provide, Get } from '@midwayjs/decorator'
import { Context } from 'egg'
import { parseSnapShotWithMap } from '../../../index'

import { Readable } from 'stream'
@Provide()
@Controller('/api')
export class Api {
  @Inject()
  ctx: Context

  @Get('/parsesnapshot')
  async getIndexData() {
    const data = parseSnapShotWithMap(resolve(__dirname, '../../../v8.heapsnapshot'))
    const stream = new Readable()
    stream.push(data)
    stream.push(null)

    this.ctx.body = stream
  }
}
