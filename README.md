# 简介

一个可以在线更加智能化的分析 v8 `heapsnapshot` 堆快照的项目，目前还在使用 `Rust` 开发中，欢迎 `watch & star`

## 开发环境

需要安装 `Rust & Node.js` 环境

## 本地调试

```bash
$ node memoryleak.js # 生成 v8.heapsnapshot
$ yarn build # 生成 .node 二进制文件 通过 index.js 可直接调用
$ yarn bench # benchmark compare rust napi with origin javascript
yarn run v1.22.10
$ node -r @swc-node/register benchmark/bench.ts
Running "parseSnapShot" suite...
Progress: 100%

  Native parseSnapShot:
    16 ops/s, ±1.28%   | fastest

  JavaScript parseSnapShot:
    1 ops/s, ±38.28%    | slowest, 93.75% slower

Finished 2 cases!
  Fastest: Native parseSnapShot
  Slowest: JavaScript parseSnapShot
✨  Done in 15.78s.
$ node simple-test.js
js parse time 225ms
napi parse time 108ms
```

## 开发进度

记录已完成和待开发 features

### 已完成

* [x] 根据 `snapshot` 解析出标准化的 `Node` 节点以及结点 `Edges` 边之间的关系

### 开发中

* [ ] 计算每个节点的 `retained_size`

* [ ] 前端可视化展示节点气泡图，根据气泡图定位节点依赖

## Node Struct

通过源文件解析出节点与边之间的关联关系

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
