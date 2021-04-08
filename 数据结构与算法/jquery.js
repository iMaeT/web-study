jQuery.extend = jQuery.fn.extend = function () {
  var src, copyArray, copy, name, options, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
  
  // 如果第一个参数传入了类型boolen（true），深递归
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // 如果第一个参数传入了类型boolen为 true，则 i 从2开始
    i = 2;
  }

  // 如果target为字符串或者其它（或许在深拷贝中）
  if (typeof target !== 'object' && !jQuery.isFunction(target)) {
    target = {};
  }

  // 如果只传递一个参数，则扩展jquery本身
  if (length === i) {
    // 此时的this,如果外部调用的是jQuery.extend方法，则this指向jQuery类，扩展到jQuery类上。
    // 而如果是jquery.fn.extend方法，则指向jQuery的原型，扩展到jquery的原型上。
    target = this;
    --i;
  }

  // 可以传入多个复制源
  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    // 将每个源的属性全部复制到 target 上
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        // src 源（自身）的值
        // copy 即将要复制过去的值
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        // 防止有环，例如extend(true, target, {target: target})
        if (target === copy) {
          continue;
        }

        // 递归，如果我们合并纯对象或数组
        // 纯对象是用{}或者new Object创建的对象(排除null，DOM对象等)。
        // 如果是深拷贝
        if (deep && copy && (jQuery.isPlainObject(copy) ||(copyArray = jQuery.isArray(copy)))) {
          // 数组
          if (copyArray) {
            copyArray = false;
            clone = src && jQuery.isArray(src) ? src : [];
          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }
          // Never move original objects, clone them;
          // 递归
          target[name] = jQuery.extend(deep, clone, copy);

          // Don't bring in undefined values
          // 最终都会到这条分支
          // 简单的值覆盖
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  // 返回新的target
  // 如果 i < length，是直接返回没经过处理的target，也就是arguments[0]
  // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
  return target;
}
