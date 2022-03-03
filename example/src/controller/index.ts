import { Readable } from 'stream'
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
import { Context } from 'egg'
import { render } from 'ssr-core-vue3'

interface IEggContext extends Context {

}

@Provide()
@Controller('/')
export class Index {
  @Inject()
  ctx: IEggContext

  @Get('/')
  async handler(): Promise<void> {
    try {
      const stream = await render<Readable>(this.ctx, {
        stream: true
      })
      this.ctx.body = stream
    } catch (error) {
      console.log(error)
      this.ctx.body = error
    }
  }
}
