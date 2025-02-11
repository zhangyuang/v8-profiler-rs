import { IWindow } from 'ssr-types'
import * as v8_profiler_rs from '~/pkg/v8_profiler_rs'

declare global {
  interface Window {
    __USE_SSR__?: IWindow['__USE_SSR__']
    __INITIAL_DATA__?: IWindow['__INITIAL_DATA__']
    v8_profiler_rs?: typeof v8_profiler_rs
  }
  const __isBrowser__: Boolean
}
