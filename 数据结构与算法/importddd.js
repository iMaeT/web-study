let obj = { a: 1, b: 2}
setTimeout(function(){
  console.log('延迟改变源文件')
  obj.a = 3
}, 1000)

export default obj
