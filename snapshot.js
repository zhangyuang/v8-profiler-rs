const fs = require('fs')

function node_value({ heap, node, node_start, field }) {
  const meta = heap.snapshot.meta
  const strings = heap.strings

  const node_fields = meta.node_fields
  const node_field_count = node_fields.length
  const node_field_types = meta.node_types
  const node_field_values = heap.nodes

  node_start = node_start || node * node_field_count
  const value = node_field_values[node_start + field]
  const type = node_field_types[field]
  if (type === 'string') {

    return strings[value]
  }
  if (type === 'number') return value
  if (Array.isArray(type)) return type[value]
  throw new Error('unsupported type: ' + type)
}
const node_rows = []

function insertNodes(heap) {
  const meta = heap.snapshot.meta
  const node_count = heap.snapshot.node_count

  const node_fields = meta.node_fields
  const node_field_count = node_fields.length

  for (let i = 0; i < node_count; ++i) {
    const values = {
      type: node_value({ heap, node: i, field: 0 }),
      node_name: node_value({ heap, node: i, field: 1 }),
      id: node_value({ heap, node: i, field: 2 }),
      self_size: node_value({ heap, node: i, field: 3 }),
      edge_count: node_value({ heap, node: i, field: 4 }),
      trace_node_id: node_value({ heap, node: i, field: 5 }),
      edges: []

    }
    node_rows.push(values)
  }
}

function edge_value({ heap, edge, field, resolvers }) {
  const meta = heap.snapshot.meta
  const strings = heap.strings

  const edge_field_values = heap.edges
  const edge_field_types = meta.edge_types

  const value = edge_field_values[edge + field]
  const type = edge_field_types[field]
  if (type === 'string' || type === 'string_or_number') {
    return strings[value]
  }
  if (type === 'number') return value
  if (Array.isArray(type)) return type[value]
  else if (resolvers[type]) return resolvers[type](value)
  throw new Error('unsupported type: ' + type)
}

function insertEdges(heap) {
  const meta = heap.snapshot.meta

  const node_fields = meta.node_fields

  const edge_fields = meta.edge_fields
  const edge_field_count = edge_fields.length

  const node_id_ofst = node_fields.indexOf('id')
  let edge = 0
  for (let i = 0; i < node_rows.length; ++i) {
    const node = node_rows[i]
    const node_edge_count = node.edge_count
    for (let j = 0; j < node_edge_count; ++j) {
      const values = {
        type: edge_value({
          heap,
          edge,
          field: 0,
          resolvers: {
            node(to_node) {
              return node_value({ heap, node_start: to_node, field: node_id_ofst })
            }
          }
        }),
        name_or_index: edge_value({
          heap,
          edge,
          field: 1,
          resolvers: {
            node(to_node) {
              return node_value({ heap, node_start: to_node, field: node_id_ofst })
            }
          }
        }),
        to_node: edge_value({
          heap,
          edge,
          field: 2,
          resolvers: {
            node(to_node) {
              return node_value({ heap, node_start: to_node, field: node_id_ofst })
            }
          }
        })
      }
      edge += edge_field_count
      node.edges.push(values)
    }
  }
}

exports.parseSnapshotJs = function parseSnapshotJs(path) {
  const heap = JSON.parse(fs.readFileSync(path).toString())
  insertNodes(heap)
  insertEdges(heap)
  return JSON.stringify(node_rows)
}