function Promise(excutor) {
  this.cbs = []
  this.data;
  const self = this;

  function resolve(value) {
    setTimeout(function() {
      self.data = value;
      self.cbs.forEach(fn => {
        fn(value);
      });
    })
  }

  excutor(resolve)
}
Promise.prototype.then = function(onResolved) {
  return new Promise(resolve => {
    const self = this
    setTimeout(() => {
      const res = onResolved(self.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        console.log(res)
        resolve(res);
      }
    });
  })
}
var promise1 = new Promise(resolve => {
  resolve(1)
})
promise1.then(data =>{
  console.log(data)
  return data
}).then(data => console.log(data))
