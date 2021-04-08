// 题意分析

// 我们来先看看题目：

// 实现一个 LazyMan，按照以下方式调用时，得到相关输出：
/**
 * LazyMan("Hank")
 * Hi! This is Hank!
 * 
 * LazyMan("Hank").sleep(10).eat("dinner")
 * // Hi! This is Hank!
 * // 等待10 秒..
 * // Wake up after 10
 * // Eat dinner~
 * 
 * LazyMan("Hank").eat("dinner").eat("supper")
 * // Hi This is Hank!
 * // Eat dinner ~
 * // Eat supper * ~

 * LazyMan("Hank").sleepFirst(5).eat("supper")
 * // 等待 5 秒
 * // Wake up after 5
 * // Hi This is Hank!
 * // Eat supper
 */
/* class LazyManGenerator {
  constructor(name) {
    this.arrayList = []

    // 初始化时任务
    const task = () => {
      console.log(`Hi! This is ${name}`)

      // 执行完初始化任务后，继续执行下一个任务
      this.next()
    }
    // 将初始化任务放入任务队列中
    this.arrayList.push(task)
    
    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    // 取出下一个任务并执行
    const task = this.arrayList.shift()
    task && task()
  }
  eat(food) {
    const task = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.arrayList.push(task)
    return this
  }
  sleep(time) {
    this.sleepTask(time, false)
    return this
  }
  sleepFirst(time) {
    this.sleepTask(time, true)
    return this
  }
  sleepTask(time, prior) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} seconds`)
        this.next()
      }, time * 1000)
    }
    if (prior) {
      this.arrayList.unshift(task)
    } else {
      this.arrayList.push(task)
    }
  }
}
function LazyMan(name) {
  return new LazyManGenerator(name)
}
LazyMan('John').sleepFirst(3).eat('dinner'); */


/* 将所有中间件（任务处理函数）储存在一个 list 中
循环依次调用中间件（任务处理函数）
senchalabs / connect 这个库做了很好的封装，是 express 等框架设计实现的原始模型。
这里我们简单分析一下 senchalabs / connect 这个库的实现。

用法：

首先使用 createServer 方法创建 app 实例，

const app = createServer()
对应源码： */
function createServer() {
  function app(req, res, next) {app.handle(req, res, next)}
  merge(app, proto);
  merge(app, EventEmitter.prototype);
  app.route = '/';
  app.stack = [];
  return app;
}
/**
 * 我们看 app 实例“继承”了 EventEmitter 类，实现事件发布订阅，同时 stack 数组来维护各个中间件任务。
接着使用 app.use 来添加中间件：
app.use('/api', function(req, res, next) {//...})
 */
proto.handle = function(req, res, out) {
  var index = 0;
  var protohost = getProtohost(req.url) || '';
  var removed = '';
  var slashAdded = false;
  var stack = this.stack;

  // final function handler
  var done = out || finalhandler(req, res, {
    env: env,
    onerror: logerror
  })
  // store the original URL
  req.originalUrl = req.originalUrl ||  req.url;
  function next(err) {
    // ...
  }
  next();
}


