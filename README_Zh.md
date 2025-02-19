# 项目介绍

[v8-profiler-rs](https://github.com/zhangyuang/v8-profiler-rs) 是一个基于 `Rust` 开发的智能在线分析 `V8 堆快照` 文件的项目。它可以帮助使用 `Node.js/Chrome/Deno/Electron` 等 V8 应用的开发者更好地理解程序内存结构，辅助定位内存泄漏问题。

## 在线演示

我们部署了[在线网站](https://v8.ssr-fc.com/)，您可以实时上传并分析 V8 内存快照。推荐使用 `Safari` 或 `Firefox` 浏览器，其 `wasm` 执行性能显著优于 `Chrome` 。

## 已实现功能

🚀 表示已实现功能。本应用持续更新中，更新将同步至 README.md，敬请关注。如果本应用对您有帮助，请给它一个 Star ✨

| 功能模块 | 状态 |
|-----------|--------|
| 解析 V8 快照生成完整节点信息 | 🚀 |
| 查看节点源码位置及构造函数 | 🚀 |
| 生成分析报告 | 🚀 |
| 前端可视化支持 | 🚀 |
| 按 ID 和名称过滤节点 | 🚀 |
| 过滤节点数量并查看详细节点引用 | 🚀 |
| 过滤引用深度和引用次数 | 🚀 |
| 对比两份快照文件 | 🚀 |
| 支持两种对比类型：新增节点/GC 体积增长 | 🚀 |
| 根据节点数量自动过滤非业务节点 | 🚀 |
| 支持上传本地序列化 JSON 文件 | 🚀 |
| 实现 `Wasm + WebWorker` 解析避免站点无响应 | 🚀 |
| 优化解析性能并降低内存占用 | 🚀 |

## 为什么选择 Rust

解析 V8 内存快照涉及大量计算操作。CPU 密集型场景本就不是 JavaScript 的强项。

阅读 Chrome 官方内存分析工具源码后发现，其使用了许多技巧来保证性能，导致代码复杂度极高且难以维护。

Rust 完美契合这个场景，在提供卓越性能的同时保持代码可读性。Rust 优异的多线程能力正是我们需要的，解析计算逻辑非常适合多线程优化。我们将在后续版本持续优化计算性能。

本应用的实现思路可应用于任何带 GC 的编程语言。未来我们将努力支持更多编程语言的内存分析。

最后，Rust 官方的 WebAssembly 支持非常完善，使我们能够轻松将 Rust 代码编译为 WebAssembly 供浏览器使用。

## 处理解析超时问题

对于非常大的文件，可能会遇到 Wasm 内存溢出或解析时间过长的情况。如果出现此问题，请尝试使用 `Safari` 或 `Firefox` 浏览器。

## 联系我们

项目持续更新中，如有任何问题或建议，请提交 [issue](https://github.com/zhangyuang/v8-profiler-rs/issues)

<div style="display:flex">
<img src="https://res.wx.qq.com/op_res/Nv12X2und927FEOvJ5iflzX-WBW07GSC22kumTCiShZnudKpG0jMuRs70ecHQb3Hy1QjjaASNzyOuMgHr43Wpw" width="300">

## 赞助支持

如果您觉得本项目对您有帮助，请赞助作者一杯咖啡，您的支持是我最大的动力！

<img src="https://res.wx.qq.com/op_res/iFZOgoe_-KP8Y-EfgfZkEEQ4fU2WcAhMbubL3CFq9VbCktQyiUO5tnJouMfJhvBX4JQ2Wio1Pw04PR68MBjbwQ" width="300">
<img src="https://res.wx.qq.com/op_res/9jSx7WJn6FBlfQ0ColL4hnvX91D9MlB_XPCgLFM527qknHp0utXZkLah6MYcumdVejK4884dvgkY0NIbBLPrYg" width="300">
</div>

## 如何使用

打开[在线演示](https://v8.ssr-fc.com/)并上传 `heapsnapshot` 文件。您可以上传一个文件进行解析，或上传两个文件进行对比分析。

页面将渲染堆快照节点，节点字段说明如下：

```js
{

    "node_type": string; // 节点类型
    "name": string; // 节点名称
    "id": number; // 节点ID
    "size": number; // 节点自身大小
    "edge_count": number; // 节点边数量
    "retained_size": number; // 节点保留大小（GC 后可释放大小）
    "pt": number; // 自身大小与保留大小的比值
    "edges": {
        "edge_type": string; // 边类型
        "to_node": number; // 边指向的节点ID
        "name_or_index": string; // 边的名称或数组索引
    } [];
    "source": string; // 节点来源文件
    "constructor": string; // 节点构造函数
    "percent": string; // 节点保留大小占比

}
```

## 默认示例

点击左上角的 `Example` 按钮查看默认示例。

默认示例的代码如下：

```js
const express = require('express');
const app = express();
const fs = require('fs')
// the memory leak code
let theThing = null;
let replaceThing = function() {
    let leak = theThing;
    let unused = function() {
        if (leak)
            console.log("hi")
    };

    // 不断修改theThing的引用
    theThing = {
        bigNumber: 1,
        bigArr: [],
        longStr: new Array(1000000),
        someMethod: function() {
            console.log('a');
        }
    };
};
let index = 0
app.get('/leak', function closureLeak(req, res, next) {
    replaceThing();
    index++
    if (index === 1) {
        const stream = require('v8').getHeapSnapshot()
        stream.pipe(fs.createWriteStream('small-closure.heapsnapshot'))
    }
    if (index === 40) {
        const stream = require('v8').getHeapSnapshot()
        stream.pipe(fs.createWriteStream('medium-closure.heapsnapshot'))
    }
    if (index === 50) {
        const stream = require('v8').getHeapSnapshot()
        stream.pipe(fs.createWriteStream('big-closure.heapsnapshot'))
    }
    res.send('Hello Node');
});

app.listen(3001);
```
