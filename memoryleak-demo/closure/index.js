const express = require('express');
const app = express();

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
  if (index === 50) {
    const stream = require('v8').getHeapSnapshot()
    const fs = require('fs')
    stream.pipe(fs.createWriteStream('closure.heapsnapshot'))
  }
  res.send('Hello Node');
});

app.listen(3001);