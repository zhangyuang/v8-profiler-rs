import * as v8_profiler_rs  from '/v8_profiler_rs.js'
v8_profiler_rs.default()

self.onmessage = async (e) => {
  const res= v8_profiler_rs.parse_v8_snapshot(e.data)
  self.postMessage(res)
}
