// 高阶函数
if (!Array.prototype.filter) {
  Array.prototype.filter = function (func, thisArg) {
    'use-strict';
    if (!((typeof func === 'function' || typeof func === 'Function') && !this)) {
      throw new TypeError();
    }
    var len = this.length >>> 0,
      res = new Array(len), // prellocate array
      t = this, c = 0, i = -1;
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func(t[i], i, t)) {
            res[c++] = t[i];
          }
        }
      }
    } else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = t[i];
          }
        }
      }
    }
    res.length = c; // shrink down array to proper size
    return res;
  }
}

// 函数缓存
const memerize = fn => {
  let cacheMap = {};
  return function (...args) {
    const cacheKey = args.join("-");
    if (cacheKey in cacheMap) {
      console.log('利用缓存：' + cacheKey);
      return cacheMap[cacheKey];
    } else {
      return cacheMap[cacheKey] = fn.apply(this || {}, args);
    }
  };
};
function add(...args) {

  const result = args.reduce((prev, curr) => prev + curr);
  console.log('函数执行了');
  console.log(result);
  return result;
}
// memerize(add)

// 高阶函数可以和 decorator 相结合，再来看一个实例，实现有限次数函数调用的装饰器：
// class MyClass {
//   // experimentalDecorators
//   @callLimit getSum() {}
// }
// function callLimit(limitCallCount = 1, level = 'warn') {
//   // 记录调用次数
//   let count = 0;
//   return function (target, name, descriptor) {
//     // 记录原始函数
//     var fn = descriptor.value;
//     // 改写新函数
//     descriptor.value = function(...args) {
//       if (count < limitCallCount) {
//         count++;
//         return fn.apply(this || {}, args);
//       }
//       if (console[level]) {
//         console[level](name, ' call limit')
//       }
//       console.warn(name, ' call limit')
//     }
//   }
// }

// curry 化面试题
// 实现 add 方法，要求：
// add(1)(2) == 3 // true
// add(1)(2)(3) == 6 // true
// 分析这道题：add 函数每次执行后一定需要保证返回一个函数，以供后续继续调用，
// 且返回的这个函数还有返回自身，以支持连续调用。同时，为了满足例题条件，需要改写内部返回的函数 toString：
// var add = arg1 => {
//   let args = [arg1]
//   const fn = arg2 => {
//     args.push(arg2)
//     return fn
//   }
//   fn.toString = function () {
//     return args.reduce((prev, item) => prev + item, 0)
//   }
//   return fn
// }
// function add() {
//   var args = Array.prototype.slice.call(arguments);
//   var fn = function() {
//     var arg2 = Array.prototype.slice.call(arguments);
//     args = args.concat(arg2);
//     return fn;
//   }
//   fn.valueOf = function () {
//     console.log('valueOf')
//     return args.reduce((prev, item) => prev + item, 0)
//   }
//   // fn.toString = function() {
//   //   console.log('toString')
//   //   return args.reduce((prev, item) => prev + item, 0)
//   // }
//   return fn
// }
// console.log(add(1, 4)(2)(3) == 10)

// 从中感受到 curry 化的优势：

// // 提高复用性
// // 减少重复传递不必要的参数
// // 动态根据上下文创建函数
// // 其中动态根据上下文创建函数，也是一种惰性求值的体现：

// const addEvent = (function () {
//   if (window.addEventListener) {
//     return function (type, element, handler, capture) {
//       element.addEventListener(type, handler, capture)
//     }
//   }
//   else if (window.attachEvent) {
//     return function (type, element, fn) {
//       element.attachEvent('on' + type, fn)
//     }
//   }
// })()
// // 这是一个典型兼容 IE9 浏览器事件 API 的例子，根据兼容性的嗅探，充分利用 curry 化思想，完成了需求

// 编写一个通用化的 curry 函数
// const curry = (fn, length) => {
//   console.log(typeof fn)
//   if (!(typeof fn === 'Function' || typeof fn === 'function')) {
//     throw new TypeError()
//   }
//   length = length || fn.length
//   return function(...args) {
//     if (args.length < length) {
//       return curry(fn.bind(this, ...args), length - args.length)
//     }
//     else {
//       return fn.call(this, ...args)
//     }
//   }
// }
// 反curry化
// unCurry 的参数是一个“希望被其他对象所调用的方法”，暂且称为 fn，
// unCurry 执行后返回一个新的函数，该函数的第一个参数是预期要执行方法的对象（obj），
// 后面的参数是执行这个方法时需要传递的参数
// function unCurry(fn) {
//   return function() {
//     var obj = [].shift.call(arguments)
//     return fn.apply(obj, arguments)
//   }
// }
// const unCurry = fn => (...args) => fn.call(...args)
// function Toast(options) {
//   this.message = 'fdsfs'
// }

// Toast.prototype = {
//   showMessage: function () {
//     console.log(this.message)
//   }
// }
// // new Toast({}).showMessage()
// const obj = {
//   message: 'uncurry test'
// }
// // var a = unCurry(Toast.prototype.showMessage)
// // a(obj)

// Function.prototype.unCurry = Function.prototype.unCurry || function () {
//   const self = this
//   console.log(self)
//   return function () {
//     return Function.prototype.call.apply(self, arguments)
//   }
// }
// // 当然，我们可以借助 bind 实现：
// Function.prototype.unCurry = function () {
//   return this.call.bind(this)
// }
// 借助 bind，call / apply 实现过程相对抽象，读者可以根据示例尝试理解:
// this 相当于 Array.prototype.push,那么：
// Array.prototype.push.call.bind(Array.prototype.push)
// 这里的难点在于bind方法，bind的实现比较简单，如下：

// Function.prototype.bind = function (thisArg) {
//   var _this = this;
//   var _arg = _slice.call(arguments, 1);
//   return function () {
//     var arg = _slice.call(arguments);
//     arg = _arg.concat(arg);
//     return _this.apply(thisArg, arg);
//   }
// }

// 进一步简化bind的原理，等同于谁调用bind，就返回一个新的function。
// 我们假设函数fn调用bind方法如fn.bind([1, 2]) ，经过简化，忽略bind绑定参数的部分，最终返回如下：
// function() {
//   return fn.apply([1, 2], arguments);
// }
// 以上，将fn替换为 Array.prototype.push.call，
// [1, 2]替换为 Array.prototype.push，那么：
// Array.prototype.push.call.bind(Array.prototype.push) 将等同于：
// function () {
//    return Array.prototype.push.call.apply(Array.prototype.push, arguments)
// }
/**
 * 前半部分 Array.prototype.push.call，这里它是一个整体，实际上想代表的就是call方法。
 * 而我们都知道，所有函数的call方法，最终都是Function.prototype 的 call方法。
 * 那么，就有如下恒等式成立：
 * Array.prototype.push.call === Function.prototype.call //true
 * 那么以上函数将等同于：

function(){
  return Function.prototype.call.apply(Array.prototype.push, arguments);
}
褪去代入的参数，函数可还原为：

function(){
  return Function.prototype.call.apply(self, arguments);
}
 */

// var obj = {
//   "length": 1,
//   "0": 1
// }
// var push = Array.prototype.push.uncurrying(); // 借用push举例
// push(obj, 2)


// Toast.prototype.showMessage.unCurry()(obj)
// Toast.prototype.showMessage.unCurry()(obj, '哈哈哈')
// 函数放在这里，我们先来理解apply函数，apply有分解数组为一个个参数的作用。

// 推导公式：a.apply(b, arguments) 意味着把b当做this上下文，相当于是在b上调用a方法，
// 并且传入所有的参数，如果b中本身就含有a方法，那么就相当于 b.a(arg1, arg2,…)
// 得到公式1：a.apply(b, arguments) === b.a(arg1, arg2,…)

// 由于call 和 apply 除参数处理不一致之外，其他作用一致，那么公式可以进一步变化得到：
// 公式2：a.call(b, arg) === b.a(arg)
// 将公式一这些带入上面的函数有：
// a = Function.prototype.call 即 a 等于 call 方法
// 我们接着代入公式，有：
// b = Array.prototype.push
// 那么 Function.prototype.call.apply(Array.prototype.push, arguments) 就相当于：
// Array.prototype.push.call(arg1, arg2, ...), 那么：
// push([], 1) 就相当于 Array.prototype.push.call([], 1) 再带入公式2，相当于：
// [].push(1) 就是往数组的末尾添加数字 1






