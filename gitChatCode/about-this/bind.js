Function.prototype.bind = Function.prototype.bind || function(context) {
// Function.prototype.bind = function(context) {
  let me = this
  let args = Array.prototype.slice.call(arguments, 1)
  let fn = function(){}
  fn.prototype = this.prototype
  let bound = function() {
    let innerArgs = Array.prototype.slice.call(arguments)
    let totalArgs = args.concat(innerArgs)
    return me.apply(context || this, totalArgs)
  }
  bound.prototype = new fn()
  return bound
}
/**
 * new 操作符做了什么
 * 生成一个新的对象
 * 对象的__proto__ 指向构造的 prototype
 * 返回这个新对象
 * 
 */


function fn() {
  console.log(this instanceof fn)
  console.log(this.text)
}
let obj = {
  text: '哦1',
  name: 'obj'
}
let test1 = fn.bind(obj)
let obj2 = test1()
// let obj2 = {
//   o1: test1,
//   // o2: fn.bind()
// }
// // let obj2 = new test1()
// obj2.o1()
// obj2.o2()
