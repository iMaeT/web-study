try {
  module.exports = Promise
} catch (e) {}
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 构造函数的框架
function Promise(excutor) {
  var self = this;
  this.status = PENDING; // Promise当前的状态
  this.data = undefined; // promise 的值
  // Promise resolve 时的回调函数集，因为在Promise结束前可能有多个回调添加到它上面
  // 比如连续promise1.then(), promise1.then(), promise1.then()
  this.onResolvedCallback = [];
  this.onRejectCallback = []; // Promise reject 时的回调函数集，因为在Promise结束前可能有多个回调添加到它上面

  function resolve(value) {
    setTimeout(function () { // 异步执行所有的回调函数 2.2.4
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.data = value;
        self.onResolvedCallback.forEach(fn => {
          fn(value)
        })
      }
    }, 0)
    
  }
  function reject(reason) {
    setTimeout(function () {  // 异步执行所有的回调函数 2.2.4
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.data = reason;
        self.onRejectCallback.forEach(fn => {
          fn(reason)
        })
      }
    }, 0)
    
  }

  // 考虑到excutor可能出错,并且在出错后以catch到的值reject掉这个Promise
  try {
    excutor(resolve, reject)
  } catch(reason) {
    reject(reason)
  }
}
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2;
  console.log(self.status)
  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {return v}
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {throw r}

  if (self.status === FULFILLED) {
    // 如果promise1(此处即为this/self)的状态已经确定并且是fulfilled，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(function() {
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) { // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      },0)
    })
  }
  if (self.status === REJECTED) {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(function () { // 异步执行onResolved
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) { // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      }, 0)
    })
  }
  if (self.status === PENDING) {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    return promise2 = new Promise((resolve, reject) => {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          console.log(x)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) { // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      })
      self.onRejectCallback.push(function(reason) {
        try {
          var x = onRejected(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) { // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      })
    })
  }
}

// 不同的Promise实现之间需要无缝的可交互，即Q的Promise，ES6的Promise，
// 和我们实现的Promise之间以及其它的Promise实现，应该并且是有必要无缝相互调用的，比如：
// new MyPromise(function (resolve, reject) { // 我们实现的Promise
//   setTimeout(function () {
//     resolve(42)
//   }, 2000)
// }).then(function () {
//   return new Promise.reject(2) // ES6的Promise
// }).then(function () {
//   return Q.all([ // Q的Promise
//     new MyPromise(resolve => resolve(8)), // 我们实现的Promise
//     new Promise.resolve(9), // ES6的Promise
//     Q.resolve(9) // Q的Promise
//   ])
// })
// 下面这样的代码目前也是没办法处理的：
// new Promise((resolve, reject) => resolve(8))
//   .then()
//   .then(function foo(value) {
//     alert(value)
//   })

// 所以如果想要把then的实参留空且让值可以穿透到后面，意味着then的两个参数的默认值分别为
// function(value) { return value } ，
// function(reason) { throw reason } 。
// 所以我们只需要把then里判断onResolved和onRejected的部分改成如下即可：
// onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value}
// onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

/**
 * x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
 * resolvePromise函数即为根据x值来决定promise2的状态的函数
 * resolve`和`reject`实际上是`promise2`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来
 * 接下来就对应标准一条条转化为代码
 * 
 */
function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise2 === x) { // 标准2.3.1
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) { // 标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    // 这里“正常” 是除拥有 thenable 类的 promise 之外的值
    if (x.status === PENDING) {
      return x.then(function(value) {
        return resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      return x.then(resolve, reject)
    }
  }
  if ((x !== null) && (typeof x === 'object' || typeof x === 'function')) { // 标准2.3.3节
    try {
      then = x.then
      if (typeof then === 'function') { // 2.3.3.3
        then.call(x, function rs(y) { // 2.3.3.3.1
          if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁先执行就以谁的结果为准
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) { // 2.3.3.3.2
            if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁先执行就以谁的结果为准
            thenCalledOrThrow = true
            return reject(r)
        })
      } else {
        return resolve(x) // 2.3.3.4
      }
    } catch (e) { // 2.3.3.2
      if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁先执行就以谁的结果为准
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    return resolve(x) // 2.3.4
  }
}
/**
 * 为了下文方便，我们顺便实现一个catch方法
 * catch() 方法返回一个Promise，并且处理拒绝的情况。
 * 它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 
 * (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
/**
 * Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
 * 如果这个值是一个 promise ，那么将返回这个 promise ；
 * 如果这个值是thenable（即带有"then" 方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
 * 否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。
 */
Promise.resolve = function (param) {
  var promise = new Promise((resolve, reject) => {
    resolvePromise(promise, param, resolve, reject)
  })
  return promise
}
/**
 * Promise.reject 方法返回一个带有拒绝原因的Promise对象。
 */
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
// Promise 构造函数接收一个 excutor 函数执行完同步或者异步操作后，调用它的两个参数 resolve 和 reject
var promise = new Promise((resolve, reject) => {
 
})


