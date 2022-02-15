
// 函数柯里化
// const filterLowerThan10 = array => {
//   let result = []
//   for (let i = 0, length = array.length; i < length; i++) {
//     let currentValue = array[i]
//     if (currentValue < 10) result.push(currentValue)
//   }
//   return result
// }
// function filterLowerThanAny(max) {
//   return function (array) {
//     let result = []
//     for (let i = 0, length = array.length; i < length; i++) {
//       let currentValue = array[i]
//       if (currentValue < max) result.push(currentValue)
//     }
//     return result
//   }
// }
// const filterLowerThan10 = filterLowerThanAny(10)
// // filterLowerThan10([10, 5, 12, 9, 8])
// console.log(filterLowerThan10([10, 5, 12, 9, 8]))

// curry 化
// 实现 add 方法
// add(1)(2) == 3 // true
// add(1, 2)(3) == 6 // true
// var add = (...arg1) => {
//   var args = [...arg1]
//   const fn = (...arg2) => {
//     args = [...args, ...arg2]
//     return fn
//   }
//   fn.toString = function() {
//     console.log(args)
//     const result = args.reduce((prev, now) => prev + now, 0)
//     console.log(result)
//     return result
//   }
//   return fn
// }
// console.log(add(1)(2) == 3)

// 编写一个通用化的 curry 函数
// const curry = (fn, length) => {
//   console.log(typeof fn)
//   if (!(typeof fn === 'function' || typeof fn === 'function')) {
//     throw new TypeError()
//   }
//   length = length || fn.length
//   return function(...args) {
//     console.log(fn)
//     if (args.length < length) {
//       return curry(fn.bind(this, ...args), length - args.length)
//     } else {
//       return fn.apply(this, args)
//     }
//   }
// }

// function add() {
//   console.log(arguments)
//   const args = [].slice.call(arguments)
//   const result = args.reduce((prev, now) => prev * now, 1)
//   console.log(result)
//   return result
// }
// const curryadd = curry(add, 4)


// function uncurry(fn) {
//   return function() {
//     var obj = [].shift.call(arguments)
//     return fn.apply(obj, arguments)
//   }
// }
// function Toast(options) {
//   // this.message = '哈哈哈，被其他人调用了！'
//   this.message = '哈哈哈，这个是本尊！'
// }
// Toast.prototype.showMessage = function () {
//   console.log(this)
//   console.log(this.message)
// }
// // var toast = new Toast()
// // toast.showMessage()

// const forgerytoast = {
//   message: '哈哈哈，我是伪造的！'
// }

// Function.prototype.unCurry = Function.prototype.unCurry || function() {
//   const self = this
//   console.log(self)
//   return function() {
//     return Function.prototype.call.apply(self, arguments)
//   }
// }
// a = Toast.prototype.showMessage.unCurry()
// a(forgerytoast)
// b = [].slice.call()

// Function.prototype.bind = function(context) {
//   const target = this;
 
//   var args = [].slice.call(arguments, 1);
//   var bound;
//   var fn = function() {};
//   var binder = function() {
//     if (this instanceof bound) {
//       var result = target.apply(this, args.concat([].slice.call(arguments)));
//       if (result && typeof result === 'object') {
//         return result;
//       }
//       return this;
//     } else {
//       return target.apply(context, [].slice.call(arguments));
//     }
//   };

//   var boundLength = Math.max(0, target.length - args.length);
//   var boundArgs = [];
//   for (var i = 0; i < boundLength; i++) {
//     boundArgs.push('$' + i);
//   }
//   bound = Function('binder', 'return function (' + boundArgs.join(',') + ') { return binder.apply(this, arguments)}')(binder);
//   if (target.prototype) {
//     fn.prototype = target.prototype;
//     bound.prototype = new fn();
//     fn.prototype = null;
//   }
//   return bound;
// }

// var name = 'java'
// const obj = {
//   name: 'javascript',
//   fn: function () {
//     console.log(this.name)
//   }
// }
// const objFn = obj.fn
// console.log(objFn.bind(obj, 1,2,3).prototype)
// console.log(objFn.bind(obj, 1,2,3)())

// Array.prototype.map = function(callback, thisArg) {
//   console.log('Inside our Array.prototype.map implementation: ');
//   var T, A, k;
//   if (this == null) {
//     throw new TypeError('this is null or not defined')
//   }

//   var O = Object(this); // 如果不是对象类型，调用map会转为包装对象
//   var len = O.length >>> 0; // 取整，并且当 O.length为 undefined，>>> 0 之后为 0

//   if (typeof callback !== 'function') {
//     throw new TypeError(callback + 'is not a function');
//   }
//   console.log(arguments)
//   if (arguments.length > 1) {
//     T = arguments[1]; // callback调用时候的this，即thisArg
//   }

//   A = new Array(len)

//   k = 0;

//   while(k < len) {
//     var kValue, mappedValue;
//     if (k in O) {
//       kValue = O[k];
//       mappedValue = callback.call(T, kValue, k, O);

//       A[k] = mappedValue;
//     }

//     k++;
//   }
//   return A;
// }

// Function.prototype.reduce = function(callback, initialValue) {
//   if (this === null) {
//     throw new TypeError('Array.prototype.reduce ' +
//       'called on null or undefined')
//   }
//   if (typeof callback !== 'function') {
//     throw new TypeError(callback +
//       ' is not a function')
//   }
  
//   var O = Object(this);
//   var len = O.length >>> 0;
//   var k = 0, value;

//   if (arguments.length > 1) {
//     value = arguments[1]; // 拿到初始值
//   } else {
//     // 如果没有初始值且数组为空
//     while(k < len && !(k in O)) {
//       k++;
//     }

//     if (k >= len) {
//       throw new TypeError('Reduce of empty array ' + 'with no initial value')
//     }
//     value = O[k++]; // 数组第一个元素为初始值
//   }

//   while(k < len) {
//     if (k in O) {
//       value = callback(value, O[k], k, O);
//     }
//     k++;
//   }
//   return value;
// }

// console.log([1,2,3,,4].reduce((p, n) => p + n))

// var o = {
//   a: 'a',
//   b: 'b',
//   c: 'c'
// }
// var only = function (obj, keys) {
//   obj = obj || {}
//   if ('string' == typeof keys) keys = keys.split(/ +/)
//   return keys.reduce(function (ret, key) {
//     if (null == obj[key]) return ret
//     ret[key] = obj[key]
//     return ret
//   }, {})
// }
// only(o, 'a bc')   // {a: 'a',  b: 'b'}
// only(o, ['a', 'b'])   // {a: 'a',  b: 'b'}

var pipe = (...functions) => initArgs => functions.reduce(
  (acc, fn) => fn(acc),
  initArgs
)
var a = function() {
  console.log('a')
  var args = [].slice.call(arguments)
  console.log(args)
  return args.reduce((prev, next) => prev + next, 0);
}
var b = function(args) {
  console.log('b')
  console.log(args)
  return args + 1;
}
var c = function(args) {
  console.log('c')
  console.log(args)
  return args + 2;
}
var fpipe = pipe(a, b, c)
console.log(fpipe(1,2,3,4))
