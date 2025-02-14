import type { UserConfig } from 'ssr-types'

const userConfig: UserConfig = {
  mode: 'csr',
  css: () => {
    const tailwindcss = require('tailwindcss')
    const autoprefixer = require('autoprefixer')
    return {
      loaderOptions: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer
          ]
        }
      }
    }
  },
  webpackDevServerConfig: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    }
  },
  customeFooterScript: [
    {
      tagName: 'script',
      describe: {
        type: 'module'

      },
      content: `
        import * as v8_profiler_rs  from '/v8_profiler_rs.js'
        window.v8_profiler_rs = v8_profiler_rs
        window.v8_profiler_rs.default()
      `
    }
  ]
}

export { userConfig }
