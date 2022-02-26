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
#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum JsValueType {
    JsString(String),
    JsNumber(usize),
}
```

执行后将会生成如下 `json` 结构

```json
{
"node_type": "closure",
"name": "testMemoryLeak",
"id": 4611,
"self_size": 64,
"edge_count": 6,
"trace_node_id": 0,
"edges": [
    {
        "edge_type": "property",
        "name_or_index": "__proto__",
        "to_node": 9963
    },
    {
        "edge_type": "internal",
        "name_or_index": "feedback_cell",
        "to_node": 36845
    },
    {
        "edge_type": "internal",
        "name_or_index": "shared",
        "to_node": 28423
    },
    {
        "edge_type": "internal",
        "name_or_index": "context",
        "to_node": 4605
    },
    {
        "edge_type": "internal",
        "name_or_index": "code",
        "to_node": 1407
    },
    {
        "edge_type": "internal",
        "name_or_index": "map",
        "to_node": 10171
    }
]
}
```

![](https://res.wx.qq.com/op_res/Y5Q2_lFtQykw-l0qdKfQU9tnBjSTPwThxmQBkkG09KUwZTSe9L8oI5tGyHzE7gZZKqUo856zkSBZ3HC-q7BDkQ)
