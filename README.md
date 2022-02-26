# 简介

一个可以在线更加智能化的分析 v8 `heapsnapshot` 堆快照的项目，目前还在使用 `Rust` 开发中，欢迎 `watch & star`

```bash
$ cargo run # 通过 heapsnapshot 文件解析为 node 对象信息存储在 bar.json
```

## Node Struct

```rs
pub struct Node {
    pub node_type: JsValueType,
    pub name: JsValueType,
    pub id: JsValueType,
    pub self_size: JsValueType,
    pub edge_count: JsValueType,
    pub trace_node_id: JsValueType,
    pub edges: Option<Vec<Edge>>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Edge {
    pub edge_type: JsValueType,
    pub name_or_index: JsValueType,
    pub to_node: JsValueType,
}
```