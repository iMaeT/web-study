// Function.prototype.bind = function(context) {
// // Function.prototype.bind = Function.prototype.bind || function(context) {
//   // 保存调用bind的函数
//   const me = this
//   const argsArray = Array.prototype.slice.call(arguments, 1)
//   const F = function () {}
//   F.prototype = this.prototype
//   console.log(F.prototype)
//   console.log(this)
//   const bound = function () {
//     const boundArgs = Array.prototype.slice.call(arguments)
//     const allArgs = argsArray.concat(boundArgs)
//     // 如果new 调用 bound，则构造函数bound的实例即this，此时this的__proto__指向bound.prototype,
//     // 而bound.prototype是F的实例，即this的__proto__指向F的实例 那么 this instanceof F === true
//     // 所以bound做构造函数使用时，我们的绑定 this 就需要“被忽略”，this要绑定到实例上
//     console.log(F.prototype)
//     return me.apply(this instanceof F ? this : context || this, allArgs)
//   }
//   bound.prototype = new F()
//   return bound
// }
// function bind(that) {
//   var target = this
  
// }
// const name = 'java'
// const obj = {
//   name: 'javascript',
//   fn: function () {
//     console.log(this.name)
//   }
// }
// const objFn = obj.fn
// console.log(objFn.bind(obj, 1,2,3)('python', 'go'))
// console.log(new objFn.bind(obj, 1,2,3));

// function bind(that) {
//   var target = this;
//   if (!isCallable(target)) {
//     throw new TypeError('Function.prototype.bind called on incompatible ' + target);
//   }
//   var args = array_slice.call(arguments, 1);
//   var bound;
//   var binder = function () {
//     if (this instanceof bound) {
//       var result = target.apply(
//         this,
//         array_concat.call(args, array_slice.call(arguments))
//       );
//       if ($Object(result) === result) {
//         return result;
//       }
//       return this;
//     } else {
//       return target.apply(
//         that,
//         array_concat.call(args, array_slice.call(arguments))
//       );
//     }
//   };
//   var boundLength = max(0, target.length - args.length);
//   var boundArgs = [];
//   for (var i = 0; i < boundLength; i++) {
//     array_push.call(boundArgs, '$' + i);
//   }
//   bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

//   if (target.prototype) {
//     Empty.prototype = target.prototype;
//     bound.prototype = new Empty();
//     Empty.prototype = null;
//   }
//   return bound;
// }

Array.prototype.map = function (callback, thisArg) {
  console.log('Inside our Array.prototype.map implementation: ')
  var T, A, k;
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }

  var O = Object(this)
  var len = O.length>>>0

  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function')
  }

  if (arguments.length > 1) {
    T = arguments[1]
  }

  A = new Array(len)

  k = 0;

  while(k < len) {
    var kValue, mappedValue;
    if (k in O) {
      kValue = O[k]

      mappedValue = callback.call(T, kValue, k, O)

      A[k] = mappedValue
    }

    k++
  }
  return A;
}
/**
 * 防抖函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debouce(func, wait, immediate) {
  let timeout, context, timestamp, args, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  return function(...args) {
    context = this;
    // 记录下当前事件的时间戳
    timestamp = +new Date()
    // 是否立即调用
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
// const throttle = (fn, delay) => {
//   let context
//   let prev = +new Date()
//   return function (...args) {
//     context = this
//     const now = +new Date()
//     console.log(now - prev)
//     if (now - prev > delay) {
//       fn.apply(context, args)
//       prev = +new Date()
//     }
//   }
// }
// const handleScroll = throttle(() => {
//   console.log('scroll')
// }, 1000)
// window.addEventListener('resize', handleScroll, false)


// 假设现在后端有一个服务，支持批量返回书籍信息，
// 它接受一个数组作为请求数据，数组储存了需要获取书目信息的书目 id，
// 这个服务 fetchBooksInfo 大概是这个样子：
// 1、但是这个接口最多只支持 100 个 id 的查询。
// 2、支持调用单个书目信息
// 3、短时间（100 毫秒）内多次连续调用，只发送一个请求，且获得各个书目信息：
// 注意这里必须只发送一个请求，也就是说调用了一次 fetchBooksInfo。
// 要考虑服务端出错的情况，比如批量接口请求[123, 446] 书目信息，
// 但是服务端只返回了书目 123 的信息。此时应该进行合理的错误处理。
// 对 id 重复进行处理
/**
 * 我们来将思路清理一下：
100 毫秒内的连续请求，要求进行合并，只触发一次网络请求。
因此需要一个 bookIdListToFetch 数组，并设置 100 毫秒的定时。
在 100 毫秒以内，将所有的书目 id push 到 bookIdListToFetch 中，
bookIdListToFetch 长度为 100 时，进行 clearTimeout，
并调用 fetchBooksInfo 发送请求
因为服务端可能出错，返回的批量接口结果可能缺少某个书目信息。
我们需要对相关的调用进行抛错，比如 100 毫秒内连续调用：
 */

// (function () {
//   // 存放需要请求的bookId
//   let bookIdListToFetch = []

//   // 存放promise请求
//   let promiseMap = {}

//   // 数组去重
//   const getUniqueArray = array => Array.from(new Set(array))

//   // 定时器
//   let timer = null

//   const getBooksInfo = bookId => new Promise((resolve, reject) => {
//     // 存储每个bookId请求的 promise 状态
//     promiseMap[bookId] = promiseMap[bookId] || { resolve, reject }

//     const clearTask = () => {
//       // 清空任务和存储
//       bookIdListToFetch = []
//       promiseMap = {}
//     }
//     // 进行单个请求
//     if (bookIdListToFetch.length === 0) {
//       bookIdListToFetch.push(bookId)

//       timer = setTimeout(function () {
//         handleFetch(bookIdListToFetch, promiseMap)

//         clearTask()
//       }, 100)
//     } else {
//       // 此时timer正等待执行
//       // 100ms 内除了第一个id，100个限制内的其它的都push进来
//       bookIdListToFetch.push(bookId)
//       bookIdListToFetch = getUniqueArray(bookIdListToFetch)
//       // 如果id有100个了，把timer清掉，重新发起请求
//       // 如果没到100个，timer执行时，因为id已经合并到bookIdListToFetch，
//       // 也达到了一起请求的目的
//       if (bookIdListToFetch.length >= 100) {
//         // 100ms内只能发起一次请求
//         clearTimeout(timer)
//         handleFetch(bookIdListToFetch, promiseMap)

//         clearTask()
//       }
//     }
//   })

//   const handleFetch = (list, map) => {
//     console.log('开始请求')
//     fetchBooksInfo(list).then(resultArray => {
//       const resultIdArray = resultArray.map(item => item.id)

//       // 处理存在的bookId
//       resultArray.forEach(data => promiseMap[data.id].resolve(data))
//       // 处理失败没拿到的bookId
//       const rejectIdArray = []
//       bookIdListToFetch.forEach(id => {
//         if (!resultIdArray.includes(id)) {
//           rejectIdArray.push(id)
//         }
//       })
//       rejectIdArray.forEach(id => promiseMap[id].reject())
//     }, error => {
//       console.log(error)
//     })
//   }
// })()

