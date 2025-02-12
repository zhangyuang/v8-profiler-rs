import { Configuration, App } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'
import { join } from 'path'
import { initialSSRDevProxy, getCwd } from 'ssr-common-utils'

const koaStatic = require('koa-static')
const cwd = getCwd()

@Configuration({
  imports: [
    koa
  ],
  importConfigs: [join(__dirname, './config')]
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application

  async onReady() {
    const commonConfig = {
      maxage: 31536000,
      setHeaders: (res) => {
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      }
    }
    this.app.use(koaStatic(join(cwd, './build'), commonConfig))
    this.app.use(koaStatic(join(cwd, './public'), commonConfig))
    this.app.use(koaStatic(join(cwd, './build/client'), commonConfig))
    this.app.use(koaStatic(join(cwd, './pkg'), {
      ...commonConfig,
      maxage: 'no-cache'
    }))
    await initialSSRDevProxy(this.app)
  }
}
