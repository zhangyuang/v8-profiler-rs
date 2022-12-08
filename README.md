# 简介

[v8-profiler-rs](https://github.com/zhangyuang/v8-profiler-rs) 是一个使用 `Rust` 开发的用于在线智能化的分析 `V8 heapsnapshot` 堆快照的项目。帮助使用到 `V8` 引擎的应用开发者，例如 `Node.js/Chrome/Deno/Electron` 等程序，旨在帮助开发者更直观的理解程序内存结构以及辅助定位内存泄漏问题。

## 在线地址

我们部署了一个[在线网站](https://v8.ssr-fc.com/)可以实时上传 `V8` 内存快照结果并分析

## 已实现的功能

🚀 表示已经实现的功能

| 里程碑                                                                                                                                                                                                                                          | 状态 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 解析V8快照生成完善的节点信息                                                                                                                                         | 🚀    |
| 提供 Webassembly 和 Rust Http 两种调用方式                                                                                                                                                | 🚀    |
| 支持前端可视化能力                                                                                                                                                                                                           | 🚀    |
|支持根据节点 id 和节点名称筛节点选                                                                                                                                                                                                                 | 🚀    |
| 支持筛选节点数量                                                                                                                                       支持查看具体节点的详细引用关系                            | 🚀    |
|  支持查看节点对应的源码位置                                                                                                                                | 🚀    |
| 支持筛选节点的引用深度和过滤引用个数                                                                                                                                                                                         | 🚀    |
| 支持对比两个快照文件                                                                                                                                                              | 🚀    |
| 支持两种对比类型筛选新增节点/筛选GC大小增大节点      | 🚀    |


## 为什么用 Rust

解析 `V8` 内存快照中涉及到大量的计算操作。而 `CPU` 密集型场景天生是 `js` 所不擅长的。在阅读完 `Chrome` 官方分析内存工具的完整源码后，发现其中为了保证性能使用了大量的奇技淫巧，代码可读性不高且不利于二次开发。而 `Rust` 非常适合这种场景能够在保证代码可读性的同时拥有优秀的性能。同时 `Rust` 在多线程并发场景优秀的能力是我们所需要的，这个解析计算逻辑用多线程来优化是再也适合不过的了。最后 `Rust` 官方对 `Webassembly` 的支持非常优秀，我们可以轻易的将 `Rust` 代码编译为  `Webassembly` 在浏览器中调用。

## 前置知识

在使用本工具之前，我们将会向你介绍下面的一些前置基础知识。如果你发现本手册所写的内容有偏差请及时提 `Issue` 纠正

### GC 算法

主流的垃圾回收算法分为 `引用计数` 和 `标记清除` 两种。由于 `引用计数` 算法会存在循环引用的问题。所以目前主流的具备 `GC` 的语言几乎都是采用 `标记清除` 算法来进行垃圾回收。

即每次执行 `GC` 时从 `GC Roots` 根节点(注意这里说的根节点不是浏览器环境的 window 或是 node 环境的 global）所不能访问的节点将会被回收掉。

内存节点一般是以有向有环图的结构在内存中存在的。

![](https://res.wx.qq.com/shop/public/7a8bced7-dba5-4a45-afe8-0975427e3507.png)

如上图所示，9，10节点无法从 `Root 1` 节点访问，所以 9，10节点将会被回收。

### 支配树

上面的图是我们可以直接从内存快照中得到的直接内存关系图，我们将其称之为生成图。在进行实际 `GC` 分析的时候我们一般会使用支配树算法，来进行生成图转换为支配树结构来更好的进行分析。

<img src="https://res.wx.qq.com/shop/public/8a4b4e3c-569c-4a3d-bed8-02b3325e2675.png" style="width:300px">

如上图所示，我们可以发现，从根节点1到达节点5有两条道路，也就是说无论是删除节点3还是节点4，我们仍然可以从节点1访问到节点5，此时节点5并不能被回收。只有删除节点2才能够回收节点5，所以我们将节点2称之为节点5的直接支配节点。

明白了上面的含义，我们就可以通过支配树算法生成支配树。

![](https://res.wx.qq.com/shop/public/e3386c18-ac84-48b7-956d-b7f9ad180e0f.png)

支配树对我们计算节点的 `retained_size` 属性非常有帮助。即一个节点被 `GC` 后总共能释放的内存大小。了解更多的详细信息可以查看[Chrome文档手册](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/)

## 使用手册

具备上面的基础知识之后，接下来该介绍本工具具体做了什么以及应该怎么使用了。

### 定义节点结构

首先我们定义一个 `V8` 内存节点的数据结构如下

```rust
pub enum JsValueType {
    // 在 Rust 中表示  JS 类型，可能有 String 和 Number 两种类型
    JsString(String),
    JsNumber(usize),
}
pub struct Node {
    pub node_type: JsValueType, // 节点类型
    pub name: JsValueType, // 节点名称
    pub id: JsValueType, // 节点 id
    pub self_size: JsValueType, // 节点自身大小
    pub edge_count: JsValueType, // 节点的子节点数量
    pub retained_size: Option<usize>, // 节点被 GC 后可完全释放的大小
    pub edges: Vec<Edge>, // 节点的子节点
    pub parents: Vec<usize>, // 节点的父节点
}
```

在 `V8` 中所有可能的节点类型如下

```js
export enum NodeType {
    kHidden = 'hidde', // Hidden node, may be filtered when shown to user.
        kArray = 'array', // An array of elements.
        kString = 'string', // A string.
        kObject = 'object', // A JS object (except for arrays and strings).
        kCode = 'code', // Compiled code.
        kClosure = 'closure', // Function closure.
        kRegExp = 'regexp', // RegExp.
        kHeapNumber = 'number', // Number stored in the heap.
        kNative = 'native', // Native object (not from V8 heap).
        kSynthetic = 'synthetic', // Synthetic object, usually used for grouping
        // snapshot items together.
        kConsString = 'concatenated string', // Concatenated string. A pair of pointers to strings.
        kSlicedString = 'sliced string', // Sliced string. A fragment of another string.
        kSymbol = 'symbol', // A Symbol (ES6).
        kBigInt = 'bigint', // BigInt.
        kObjectShape = 14, // Internal data used for tracking the shapes (or
        // "hidden classes") of JS objects.
}
```

在上面的结构体中，除了 `retained_size` 之外其余的信息我们都可以直接通过 `V8 HeapSnapShot` 计算得到。

`retained_size` 是我们最需要关注的属性，通过上面的内存图结构可以看到。一个节点被删除后，其所支配的节点也将一并被删除。也就是此时可回收的内存大小为所有被释放的节点大小总和。

通过上述介绍我们可以发现，容易产生内存泄漏的节点往往具有比较大的 `retained_size` , 或是 `self_size` 与 `retained_size` 差距很大的节点。

注意：这里还有一个非常重要的信息是， `Node` 与 `Edge` 的关系存在 `weak retainer` 的关系，也就是弱引用，在进行 `GC` 时，不会将弱引用关系计算在内。类似于 `JS` 中的 `WeakMap` 数据结构。如何计算强弱引用关系在这里不赘述。

### 代码实战

以下列经典的内存泄漏代码为例子，下面来讲述如何运用本工具来发现内存泄漏。

```js
const express = require('express');
const app = express();
const fs = require('fs')
//以下是产生泄漏的代码
let theThing = null;
let replaceThing = function () {
  let leak = theThing;
  let unused = function () {
    if (leak)
      console.log("hi")
  };

  // 不断修改theThing的引用
  theThing = {
    bigNumber: 1,
    bigArr: [],
    longStr: new Array(1000000),
    someMethod: function () {
      console.log('a');
    }
  };
};
let index = 0
app.get('/leak', function closureLeak(req, res, next) {
  replaceThing();
  index++
  if (index === 1) {
    // 生成初始态快照
    const stream = require('v8').getHeapSnapshot()
    stream.pipe(fs.createWriteStream('small-closure.heapsnapshot'))
  }
  if (index === 40) {
     // 生成中间态快照
    const stream = require('v8').getHeapSnapshot()
    stream.pipe(fs.createWriteStream('medium-closure.heapsnapshot'))
  }
  if (index === 50) {
    // 生成最终态快照
    const stream = require('v8').getHeapSnapshot()
    stream.pipe(fs.createWriteStream('big-closure.heapsnapshot'))
  }
  res.send('Hello');
});

app.listen(3001);
```

### 生成 heapsnapshot 文件

如何生成 `heapsnapshot` 文件，在 `Node.js >= 11.13.0` 中我们可以直接通过内置的 `V8` 模块来生成。在老版本的 `Node.js` 中我们也可以通过 [heapdump](https://www.npmjs.com/package/heapdump)或 [v8-profiler-next](https://www.npmjs.com/package/v8-profiler-next) 来生成。本质都是调用了 `Node.js` 的 `V8 C++` 代码 来生成内存快照。我们在之后也会提供 `Rust binding` 来访问 `V8 API` 来实现更多丰富的能力。

```c++
isolate->GetHeapProfiler()->TakeHeapSnapshot(Nan:: EmptyString()); 

```

### 上传文件分析

在 [在线工具](https://v8.ssr-fc.com/) 中，我们可以通过选择本地文件进行上传。或者如果你想体验本工具的能力。我们已经默认内置了上述代码生成的内存快照进行分析。

点击左侧查看默认示例，我们将会通过上述代码的内存快照来生成图示。目前的计算时间根据内存快照的大小，原生的 `Rust` 代码大概需要运行 `0-6s` 经过 `Webassembly`的损耗后大概需要 `3-20s` 左右的时间，目前的算法还有一些可以优化的空间，我们将会在之后的版本中不断的优化性能。

在控制面板中我们提供了诸多控制图表绘制参数的控制能力，通过这些功能我们可以轻松的过滤无关信息来获取想要的信息同时可以获得流畅的绘制性能。

### 排列节点

通过上面的代码，我们生成了三个快照文件。首先上传 `big-closure.heapsnapshot` 进行分析。

在上面我们提到了，容易发生内存泄露的节点往往是那些 `Retained Size` 很大的节点。所以我们默认按照 `Retained Size` 通过箭头的顺序 `从大到小` 排列。选取前 `50(数量可修改)`个节点进行展示。

![](https://res.wx.qq.com/shop/public/7302809c-d577-4d4b-907e-9f055365afb1.png)

当鼠标 hover 到节点时，我们将会展示节点的详细信息包括 `节点id`、`节点名称`、`节点大小`、`节点可被回收大小`、`节点源码位置(如能找到)`


节点面积越大，代表可被回收的大小越大

一般面积最大的节点都是各种 `GC` 根节点。这些节点的类型是 `Synthetic` 一般是 `C++` 层代码合成的，一般无需特别关注。这里用`黑色节点`表示，我们在关注图表时，将优先关注 `蓝色节点`。我们之后将提供更加精确的筛选手段。

通过图表我们可以看到在业务节点中最大的节点名是 `replceThing`，`someMethod` 的节点，并且`someMethod`节点存在了很多个。这时候我们点击节点，将会展示其的具体引用关系。

### 查看节点引用关系

点击最大的 `someMethod` 节点，我们将会展开其信息, 并将该节点以红色展示。红色边代表强引用，黑色边代表弱引用，引用关系以箭头表示。

![](https://res.wx.qq.com/shop/public/a3e6dfe5-2374-47c7-bd78-081bf937bb26.png)

这时候出现了该节点的引用节点和被引用节点。此时存在较多的无关干扰信息，由于该节点是最大的节点，我们只需要关注它引用了哪些节点即可。此时通过左侧的控制面板，设置 `被引用深度` 为0，`引用深度` 为 4，`边数量`调整为 3，这是针对不同的内存快照可能需要不同的调整参数。开发者可以自行多尝试几次

![](https://res.wx.qq.com/shop/public/58154200-dcf1-43ea-923d-7ea3475c5bd9.png)

如果我们仍然觉得信息太繁杂，这时候设置`过滤原生节点`值为 1，我们将会过滤 `Synthetic|Hidden` 类型的节点引用关系

![](https://res.wx.qq.com/shop/public/f7b4b644-43cf-48b4-ad36-f2b82d088e7a.png)

这样瞬间就清爽了很多。在这一步基本可以定位内存泄漏原因在 `someMethod` 这个节点了，这时候在通过节点名称进行过滤，来查看完整的引用关系链

![](https://res.wx.qq.com/shop/public/fd065136-9189-4844-97ba-a650fec16427.png)

## 快照对比

通过快照对比我们可以迅速找到在两次快照中被创建的新节点，以及相同节点但是可GC大小增大的节点。这些节点往往代表着内存泄漏。

同时上传 `small-closure.heapsnahshot` 和 `big-closure.heapsnahshot`

![](https://res.wx.qq.com/shop/public/a5f3ad4e-c616-4518-9d53-5258a7e74874.png)

默认的对比方式是`新增节点`。同样我们将会按照 `retained_size` 的大小，从大到小排列新增节点。可以看到新增的节点中与业务相关的节点，多了很多 `someMethod` 节点。

为了更好的看到占用内存增大的节点，这时候我们上传 `medium-closure.heapsnahshot` 和 `big-closure.heapsnahshot`

将对比类型改为 `增长节点` 并点击重新绘制

![](https://res.wx.qq.com/shop/public/99d44ecf-b531-4ea6-90f7-86a9d960da88.png)

此时，我们将会比较相同的节点，在两次快照中，可被 GC 回收大小的增长。并按照大小排列。

可以看到 `replaceThing` 这个业务代码中的节点，在请求次数从 `40` 次到 `50`次的时候可GC大小增长了 `76MB`，存在内存泄漏的可能。

至此，我们的一次分析内存泄漏的过程就完成了。可以看到简单的内存泄漏，我们只需要上传一次快照文件就可以基本定位泄露位置。复杂的内存泄漏情况我们可以通过上传前后两次快照的对比来找到变动的节点。

我们将会在之后持续优化性能以及增加新的分析能力，敬请期待。欢迎 Star ✨

## 自定义能力分析

`Webassembly` 版本我们提供了 `npm` 包来帮助有需求的开发者根据我们序列化好的内存节点结构来进行自定义的分析能力。

### In Webpack 

```shell
$ npm i v8-profiler-rs
```

```js
import {
    parse_v8_snapshot
} from 'v8-profiler-rs/v8_profiler_rs'

const snapshot = parse_v8_snapshot(heapsnapshot as string)
```

### In Browser

```shell
$ npm i v8-profiler-rs-web
```

```html
<script type="module">
    import init, {
        parse_v8_snapshot
    } from 'v8-profiler-rs-web'

    init().then(() => {
        const snapshot = parse_v8_snapshot(heapsnapshot as string)
    })
</script>
```

### In Node.js

```shell
$ npm i v8-profiler-rs-node
```

```js
const {
    parse_v8_snapshot
} = require('v8-profiler-rs-node')
const snapshot = parse_v8_snapshot(heapsnapshot as string)
```
### 