// 如何将一个数组打乱顺序
/**
 * 数组sort API
 */
// const log = console.log
// Array.prototype.sort = function (compareFn) {
//   log("Inside our Array.sort implementation :)")
//   return mergeSort(this)
//   // Slipt the array into halves and merge them recursively
//   function mergeSort(arr) {
//     // return once we hit an array with a single item
//     if (arr.length === 1) {
//       return arr
//     }
//     const middle = Math.floor(arr.length / 2)
//     const left = arr.slice(0, middle)
//     const right = arr.slice(middle)

//     return merge(mergeSort(left), mergeSort(right))
//   }
//   // Compare the arrays item by item and return the concatenated result
//   function merge(left, right) {
//     let result = []
//     let indexLeft = 0
//     let indexRight = 0

//     if (!compareFn || !(typeof compareFn === 'function' || typeof compareFn === 'Function')) {
//       compareFn = (left, right) => left < right
//     }

//     while(indexLeft < left.length && indexRight < right.length) {
//       const _left = left[indexLeft]
//       const _right = right[indexRight]
//       compareFnRusult = composeCompareFn(compareFn(_left, _right))
//       if (compareFnRusult) {
//         result.push(left[indexLeft])
//         indexLeft++
//       } else {
//         result.push(right[indexRight])
//         indexRight++
//       }
//     }
//     return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
//   }

//   function composeCompareFn(compareResult) {
//     if (Math.sign(compareResult) == -1) {
//       return false
//     }
//     if (Math.sign(compareResult) == 1) {
//       return true
//     }
//     if (Math.sign(compareResult) == 0) {
//       return false
//     }
//   }
// }

// var list = ['a', 34, 32, 10, 56, 14654, 23, 75, 61]
// log(list.sort())

// 快速排序 
// 快速排序的特点就是分治
/**
 * 我们首先在数组中选取一个基准点，叫做 pivot，根据这个基准点：
 * 把比基准点小的数组值放在基准点左边，把比基准点大的数组值放在基准点右边。
 * 这样一来，基于基准点，
 * 左边分区的值都小于基准点，右边分区的值都大于基准点，
 * 然后针对左边分区和右边分区进行同样的操作，直到最后排序完成。
 */
// 简单实现
// const quickSort = array => {
//   if (array.length < 2) {
//     return array.slice()
//   }

//   let len = array.length
//   // 随机找到 pivot
//   let pivot = array[Math.floor(Math.random() * len)]

//   let left = []
//   let right = []
//   let middle = []
//   for (let i = 0; i < len; i++) {
//     let value = array[i]
    
//     if (value < pivot) {
//       left.push(value)
//     }

//     if (value === pivot) {
//       middle.push(value)
//     }
    
//     if (value > pivot) {
//       right.push(value)
//     }
//   }
//   return quickSort(left).concat(middle, quickSort(right))
// }

// const quickSort = (array, start, end) => {
//   start = start === undefined ? 0 : start
//   end = end === undefined ? array.length - 1 : end
//   let partitionIndex

//   if (start >= end) {
//     return
//   }

//   partitionIndex = partition(array, start, end)

//   quickSort(array, start, partitionIndex - 1)
//   quickSort(array, partitionIndex + 1, end)
// }
// const partition = (arr, left, right) => {
//   let pivot = arr[left] // 参照数/基准点

//   let i = left
//   let j = right

//   while (i < j) {
//     // 找出右边第一个小于参照数的下标并记录
//     while (i < j && arr[j] >= pivot) {
//       j--
//     }

//     if (i < j) {
//       // 将右边小于参照数的数赋值给基准点，即起始位置。这个时候j这个位置为空了
//       // i自加一,为了下边的循环从基准点从后一位开始比较
//       arr[i++] = arr[j]
//     }

//     // 找出左边第一个大于参照数的下标，并记录
//     while (i < j && arr[i] < pivot) {
//       i++
//     }

//     if (i < j) {
//       // 将左边大于参照数的数,即i位置的数,赋值到上边空出的位置j
//       arr[j--] = arr[i]
//     }
//   }
//   // 
//   arr[i] = pivot

//   return i
// }


// function quickSort(arr, left, right) {
//   /*
//    * len为数组的长度;
//    * left为需要数组中参与排序的起始点；right为数组中参与排序的终止点;
//    * left如果有传数字那么就为left，没有传参则为0；
//    * right如果有传参那么就为right，没有传参则为len-1;
//    * 有传参可能会部分排序可能不会排序，没传参默认排序整个数组;
//    * partitionIndex为分组界限;
//    */
//   var len = arr.length,
//     partitionIndex,
//     left = typeof left !== 'number' ? 0 : left,
//     right = typeof right !== 'number' ? len - 1 : right;

//   // 如果需要排序的起始索引小于终止索引则执行排序;递归的终止条件；
//   if (left < right) {

//     // partition的返回值作为partitionIndex来分隔数组；
//     // 索引partitionIndex左边的元素均小于arr[partitionIndex]；
//     // 右边的元素均大于arr[partitionIndex]；
//     partitionIndex = partition(arr, left, right);

//     // 数组中小于arr[partitionIndex]的部分(索引left到partitionIndex-1)再次使用quickSort排序；
//     quickSort(arr, left, partitionIndex - 1);

//     // 数组中大于arr[partitionIndex]的部分(索引partitionIndex+1到right)再次使用quickSort排序；
//     quickSort(arr, partitionIndex + 1, right);
//   }
//   // 递归执行直到不满足left<right;返回本身；
//   return arr;
// }

// function partition(arr, left, right) {
//   /*
//    * 这部分是具体实现排序的部分；
//    * 将left赋值给pivot，作为参照物，因为left在最左边，只需要从左到右比较一遍即可判断整个数组；
//    * index索引是arr中待交换位置；
//    */
//   var pivot = left,
//     index = pivot + 1;
//   // for循环从参照物arr[pivot]下一个元素arr[pivot+1]开始一直比较到子数组结束arr[right]；
//   for (var i = index; i <= right; i++) {

//     // 循环中如果有任何小于参照物的，就将他交换到index的位置，然后index向右移动到下一个位置；
//     if (arr[i] < arr[pivot]) {
//       swap(arr, i, index);
//       index++;
//     }
//   }
//   /*
//    * 因为每次都是交换完后index移动到下一个位置，所以在循环结束时，index仍为待交换的位置；
//    * 此时索引pivot+1到index-1的元素都小于参照物arr[pivot]；
//    */

//   // 交换pivot和index-1索引的值之后index-1索引左边全都是小于arr[index-1]的元素；
//   swap(arr, pivot, index - 1);

//   // 返回index-1作为拆分子数组的分界线；
//   return index - 1;
// }
// /*
//  * 普通的交换，将a[i]和a[j]的数值交换；
//  */
// function swap(arr, i, j) {
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }

// let arr = [3, 5, 2, 4, 6, 1, 9, 10]
// quickSort(arr, 0, arr.length - 1)
// console.log(arr)

// // 插入排序
// const insertSort = array => {
//   const length = array.length
//   let preIndex, current
//   for (let i = 1; i < length; i++) {
//     preIndex = i - 1
//     current = array[i]

//     while(preIndex >= 0 && array[preIndex] > current) {
//       array[preIndex + 1] = array[preIndex]
//       preIndex--
//     }

//     array[preIndex + 1] = current
//   }
// }
// // 是用二分法优化上述插入排序
// const dichotomyInsertSort = array => array.reduce(insert, [])
// // [1 5 2 4 6]
// const insert = (sortedArray, value) => {
//   const length = sortedArray.length

//   if (length == 0) {
//     sortedArray.push(value)
//     return sortedArray
//   }

//   let i = 0
//   let j = length
//   let mid

//   // 先判断是否为极端值
//   if (value < sortedArray[i]) {
//     // 直接插入数组头部
//     sortedArray.unshift(value)
//     return sortedArray
//   }
//   if (value >= sortedArray[j - 1]) {
//     // 直接插入尾部
//     sortedArray.push(value)
//     return sortedArray
//   }

//   // 开始二分查找
//   while(i < j) {
//     // 转换为32位(向下取整)
//     mid = ((i + j) / 2) | 0

//     if (mid == i) {
//       break
//     }

//     if (value < sortedArray[mid]) {
//       j = mid
//     }

//     if (value === sortedArray[mid]) {
//       i = mid
//       break
//     }

//     if (value > sortedArray[mid]) {
//       i = mid
//     }
//   }

//   let midArray = [value]
//   let lastArray = sortedArray.slice(i + 1)

//   return sortedArray.slice(0, i + 1).concat(midArray).concat(lastArray)
// }
// console.log(dichotomyInsertSort([11,1, ,1, 5, 2, 4, 6]))

/**
 * 我们知道，快速排序是一种不稳定的排序算法，而归并排序是一种稳定的排序算法。什么是排序的稳定性呢？

简单说，就是能保证排序前 2 个相等的数其在序列的前后位置顺序和排序后它们两个的前后位置顺序相同。形式化一下，
如果 array[i] = array[j]，array[i] 原来在位置前，排序后 array[i] 还是要在 array[j] 位置前。
在很多情况下，不稳定的排序也不会造成影响。但是在一些场景中，可能就会“有毒”。比如对于一个数组对象，场景是：

某市的机动车牌照拍卖系统，最终中标的规则为：按价格进行倒排序；相同价格则按照竞标顺位（即价格提交时间）进行正排序。
如果采用不稳定排序，那么结果就有可能不符合预期。

那么如果一些浏览器引擎实现的排序采用了不稳定排序算法应该怎么办呢？方案：

将待排序数组进行预处理，为每个待排序的对象增加自然序属性，不与对象的其他属性冲突即可。自定义排序比较方法 compareFn，
总是将自然序作为前置判断相等时的第二判断维度。
 */
// const HELPER = Symbol('helper')

// // 获取comparFn的结果 > 0 或者 = 0 或者 < 0,如果两个值相等,则根据他们的先后顺序来确定compareFn的结果
// const getCompare = compare => 
//   (left, right) => {
//     let result = compare(left, right)

//     return result === 0 ? left[HELPER]- right[HELPER] : result
//   }

// // 将待排序数组进行预处理，为每个待排序的对象增加自然序属性，不与对象的其他属性冲突(这里用Symbol,独一无二)
// const sort = (array, compare) => {
//   array = array.map(
//     (item, index) => {
//       if (typeof item === 'object') {
//         item[HELPER] = index
//       }
//       return item
//     }
//   )

//   return array.sort(getCompare(compare))
// }

/**
 * 交换星号

题目：一个字符串中只包含 * 和数字，请把 * 号都放开头。

思路：使用两个指针，从后往前扫字符串，遇到数字则赋值给后面的指针，继续往后扫，遇到 * 则不处理。
 */
// const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)
// /**
//  * @param {string}
//  * @return {string}
//  */
// const solution = s => {
//   const n = s.length
//   let arr = s.split('')
//   let j = n - 1

//   for (let i = n - 1; i >= 0; --i) {
//     if (isNumeric(arr[i])) {
//       arr[j--] = arr[i]
//     }
//   }
//   for (; j >= 0; --j) {
//     arr[j] = '*'
//   }

//   return arr.join('')
// }
/**
 * 这样一来，我们逆序操作数组，遇见数字则向后置，遍历完一遍后，所有的数字都已经在后边了，同时把前边的数组项用 * 填充。
 * Longest Substring Without Repeating Characters
 * 题意：给定一个字符串，返回它最长的不包含重复的子串长度。例如，输入 abcabcbb 输出 3（对应 abc）。
 * 
 * 思路：
 * 1、暴力枚举起点和终点，并判断重复，时间复杂度是 O(n²)；
 * 2、通过双指针、滑动窗口，动态维护窗口 [i..j)，使窗口内字符不重复。
 * 3、后面的字符串不断与第一个字符串比较,找到和第一个字符重复的字符位置,将此字符前边的的子串,再递归
 * 我们看第二种思路解法，保证窗口 [i..j) 之间没有重复字符：

 * 首先 i, j 两个指针均指向字符串头部，如果没有重复字符，则 j 不断向右滑动，直到出现重复字符；
 * 如果出现了重复的字符，重复字符出现在第 str[j] 处，这时候开始移动指针 i，找到另一个重复的字读出现在 str[i] 处，
 * 那么能保证 [0, i] 以及 [i, j] 子字符串是不重复的，更新临时结果为 Math.max(result, j - i)。
 */
// const LengthOfLongestSubstring = str => {
//   let result = 0
//   const len = str.length
//   const mapping = {} // 存储字符

//   for (let i = 0, j = 0; ; i++) {
//     while(j < len && !mapping[str[j]]) {
//       mapping[str[j++]] = true
//     }
//     result = Math.max(result, j - i)
//     if (j >= len) {
//       break
//     }

//     while(str[i] !== str[j]) {
//       mapping[str[i++]] = false
//     }
//     mapping[str[i]] = false
//   }
//   return result
// }
/**qwertyuiopid
 * 爬楼梯

题目：假设我们需要爬一个楼梯，这个楼梯一共有 N 阶，可以一步跨越 1 个或者 2 个台阶，那么爬完楼梯一共有多少种方式？

示例：输入 2（标注 N = 2，一共是 2 级台阶）；

输出：2 （爬完一共两种方法：一次跨两阶 + 分两次走完，一次走一阶）

示例：输入 3；输出 3（1 阶 + 1 阶 + 1 阶；1 阶 + 2 阶；2 阶 + 1 阶）

思路：最直接的想法其实类似 Fibonacci 数列，使用递归比较简单。比如我们爬 N 个台阶，
其实就是爬 N － 1 个台阶的方法数 + 爬 N － 2 个台阶的方法数。
 */
// 科普Fibonacci数列，从第三项开始，每一项等于它前面两项之和，
// 1, 1, 2, 3, 5, 8, 13, ... 又称为黄金分割数列
// 黄金分割点 0.618 (从第三项开始，每一项与前一项的比例越来越接近0.618)
// const climbing1 = n => { // 时间复杂度为O(2^n)
//   if (n === 1) return 1 
//   if (n === 2) return 2 
//   return climbing1(n-1) + climbing1(n-2)
// }
// const climbing2 = n => { //使用了一个数组 array 来储存计算结果，时间复杂度为 O(n)。
//   let array = []
//   const step = n => {
//     if (n === 1) return 1
//     if (n === 2) return 2
//     if (array[n] > 0) return array[n];

//     array[n] = step(n-1) + step(n-2);
//     return array[n]
//   }
//   return step(n)
// }
// const climbing3 = n => { // 时间复杂度仍然为 O(n)，但是我们优化了内存的开销。
//   if (n === 1) return 1
//   if (n === 2) return 2

//   let array = []
//   array[1] = 1
//   array[2] = 2

//   for (let i = 3; i <= n; i++) {
//     array[i] = array[i-1] + array[i - 2]
//   }

//   return array[n]
// }

/**
 * Combination Sum

这个算法，让我们来聚焦“回溯”这两个字，题目出处 Combination Sum。

题目：给定一组不含重复数字的非负数组和一个非负目标数字，在数组中找出所有数加起来等于给定的目标数字的组合。
 */
// 示例：输入

// const array = [1, 2, 3, 6, 7]
// const target = 7
// /**
//  * 直接来看优化后的思想：回溯解决问题的套路就是先用“笨办法”，
//  * 遍历所有的情况来找出问题的解，在这个遍历过程当中，
//  * 以深度优先的方式搜索解空间，并且在搜索过程中用剪枝函数避免无效搜索
//  */
// const find = (array, target) => {
//   const result = []
//   const len = array.length
//   const dfs = (index, sum, tmpArray) => {
//     if (sum === target) {
//       result.push(tmpArray.slice())
//     }

//     if (sum > target) {
//       return
//     }

//     for (let i = index; i < len; i++) {
//       tmpArray.push(array[i])

//       dfs(i, sum + array[i], tmpArray)
//       tmpArray.pop()
//     }
//   }

//   dfs(0,0,[])

//   return result
// }

// console.log(find(array, target))
/**
 * 该题有另一个变种：

从一个数组中找出 N 个数，其和为 M 的所有可能。
这里我们指定数组元素个数的和，需要这个和为指定值。

举例：从数组 [1, 2, 3, 4] 中选取 2 个元素，求和为 5 的所有可能。答案是两组组合: [1, 4] 和 [2, 3]。

这里我们介绍一种借助“二进制”实现的解法，可以用 0 和 1 来表示数组中相应的元素是否被选中。因此，对于一个长度为 4 的数组来说：

0000 表示没有选择数组中的任何元素
0100 表示选择了数组中第 1 位元素
以此类推，数组长度为 4，那么上述情况一共有 16 种可能（Math.pow(2, length)）。

而这道题目中，只需要选择指定数组元素个数的和，还是对于数组长度为 4 的情况：
只需要考虑 0011 等 1 的个数累加为 0 case，而不需要考虑类似 0111 这样的 case。

这里解释一下，为什么通过0000这种方式可以拿到有两个1（比如1100，1010，1001，0110，0101，0011 6种可能）
因为i<16 这里二进制 0000 这种形式，可以表示的最小数为0（即0000），最大数为15（即1111），
所以0000到1111的所有0和1的随机组合可以表示完所有（0~15）的数，那么我们拿到的包含两个1的个数，就等于选取2个元素的所有可能


针对符合个数的所有情况，我们进行数组项目的求和，判断是否等于指定值的情况即可：
 */
// const array = [1, 2, 3, 4]
// const findN = (array, target, sum) => {
//   const len = array.length;
//   const max = Math.pow(2, len)
//   const result = []

//   // i 为可能性数量
//   for (let i = 0; i < max; i++) {
//     // getCount(i) 判断当前i是否是选取了2个元素例如1001这种
//     if (getCount(i) == target) {
//       let temp = []
//       let s = 0
//       for (let j = 0; j < len; j++) {
//         // 此时 拿到了包含有 N 个 1的i，
//         // i 中 1的位置即为选取的array数的下标,现在获取 1 的位置
//         // 原理：i 与 只有一个 1 的 4位二进制（比如1000）数进行
//         // 按位与&运算，结果为0，第0位没有1，反之此位置有1
//         if (i & 1 << (len - 1 - j)) { // 根据运算符优先级， 先运算<< 再运算 &
//           temp.push(array[j])
//           s += array[j]
//         }
//       }

//       if (s == sum) {
//         result.push(temp)
//       }
//     }
//   }

//   return result
// }

// function getCount(i) {
//   let count = 0
//   // i为0直接返回
//   while(i) {
//     // 一个数与1（即0001）进行按位与操作，如果这个数
//     // 最后一位不为1（比如0110），结果为0，即false，为1结果为true，count加1
//     // 然后再将i进行 >>= 1（即i = i >> 1）操作，即向右位移一位
//     // 这里结合while循环，知道i中所有的1都移掉了，即i为0了，循环结束，
//     // 这时候count就是i中1的个数
//     // 比如i = 3（0101）与 1进行 & 运算，结果为0001即为1 true 
//     // count++
//     // 然后 i >>= 1 运算，i = 0010，此时最后一位为0，i & 1为false，继续将i右移一位
//     // 知道i=0，循环结束
//     if (i & 1) {
//       ++count
//     }
//     i >>= 1
//   }
//   return count
// }
// 最牛方法
// 布赖恩·克尼根算法
/**
 * 法二是逐位移动，逐位比较边缘位置是否为 1。寻找一种更快的方法找出等于 1 的位数。

是否可以像人类直观的计数比特为 1 的位数，跳过两个 1 之间的 0。例如：10001000。

上面例子中，遇到最右边的 1 后，如果可以跳过中间的 0，直接跳到下一个 1，效率会高很多。

这是布赖恩·克尼根位计数算法的基本思想。该算法使用特定比特位和算术运算移除等于 1 的最右比特位。

当我们在 number 和 number-1 上做 AND 位运算时，原数字 number 的最右边等于 1 的比特会被移除

作者：LeetCode
链接：https://leetcode-cn.com/problems/hamming-distance/solution/yi-ming-ju-chi-by-leetcode/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 * 
 */
// function getCount(i, j = 0) {
//   let count = 0
//   let xor = i ^ j

//   while(xor) {
//     count++
//     xor &= (xor-1)
//   }
// }
// console.log(findN(array, 2, 5))

/**
 * 题目：对一个给定一个排序数组去重，同时返回去重后数组的新长度。
难点：这道题并不困难，但是需要临时加一些条件，即需要原地操作，在使用 O(1) 额外空间的条件下完成。
示例：
输入：
// let array = [0,0,1,1,1,2,2,3,3,4]
输出：
console.log(removeDuplicates(array))
// 5
console.log(array)
// 0, 1, 2, 3, 4
这道题既然规定 in-place 的操作，那么可以考虑算法中的另一个重要思想：双指针。
使用快慢指针：

开始时，快指针和慢指针都指向数组中的第一项
如果快指针和慢指针指的数字相同，则快指针向前走一步
如果快指针和慢指针指的数字不同，则两个指针都向前走一步，同时快指针指向的数字赋值给慢指针指向的数字
当快指针走完整个数组后，慢指针当前的坐标加 1 就是数组中不同数字的个数
 */
// const removeDuplicates = array => {
//   const len = array.length
//   let slowPointer = 0

//   for (let fastPointer = 0; fastPointer < len; fastPointer++) {
//     if (array[slowPointer] != array[fastPointer]) {
//       slowPointer++
//       array[slowPointer] = array[fastPointer]
//     }
//   }
//   // 去重后数组中不同数字的个数
//   slowPointer++
//   array.splice(slowPointer, len)
//   return slowPointer
// }
// let array = [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4]
// console.log(removeDuplicates(array))

/**
 * 求众数
 * 这也是一道简单的题目，关键点在于如何优化。

题目：给定一个大小为 N 的数组，找到其中的众数。众数是指在数组中出现次数大于 N/2 的元素。

可能大家都会想到使用一个额外的空间，记录元素出现的次数，我们往往用一个 map 就可以轻易地实现。那优化点在哪里呢？答案就是投票算法
 */
// map 实现
// const find = array => {
//   let n
//   const len = array.length
//   const N = len / 2
//   const map = {}
//   console.log(len, N)

//   for (let i = 0; i < len; i++) {
//     if (map[array[i]]) {
//       map[array[i]]++
//       if (map[array[i]] > N) {
//         n = array[i]
//         break
//       }
//     } else {
//       map[array[i]] = 1
//     }
//   }

//   return n
// }
//  摩尔投票算法
// const find = (array) => {
//   if (array.length === 0) return
//   const len = array.length

//   let count = 1
//   let result = array[0]

//   // 配对阶段
//   for (let i = 0; i < len; i++) {
//     if (count === 0) result = array[i]

//     if (array[i] === result) {
//       count++
//     } else {
//       count--
//     }
//   }
//   // 计数阶段
//   let counter = 0
//   for (let j = 0; j < len; j++) {
//     if (array[j] === result) {
//       counter++
//     }
//   }
//   if (counter > len / 2) {
//     return result
//   }
// }
// let array2 = ['A', 'A', 'A', 'B', 'C']
// console.log(find(array2))

/**
 * 有效括号
 * 有效括号这个题目和前端息息相关，在之前课程模版解析时，其实都需要类似的算法进行模版的分析，进而实现数据的绑定。我们来看题目：

举例：输入 "()"

输出：true

举例：输入 "()[]{}"

输出：true

举例：输入 "{[]}"

输出：false

举例：输入 "([)]"

输出：false

这道题目的解法非常典型，就是借助栈实现，将这些括号自右向左看做栈结构。
我们把成对的括号分为左括号和右括号，需要左括号和右括号一一匹配，通过一个 Object 来维护关系：
 * 利用一个对象来维护关系
 * obj = {
 *   "]": "[",
 *   "}": "{",
 *   ")": "(",
 * }
 * 
 */
// const isValid = str => {
//   let len = str.length
//   const stack = []
//   const obj = {
//     "]": "[",
//     "}": "{",
//     ")": "(",
//   }

//   for (let i = 0; i < len; i++) {
//     if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
//       stack.push(str[i])
//     } else {
//       let key = stack.pop()
//       if (obj[key] !== str[i]) {
//         return false
//       }
//     }
//   }
//   if (!stack.length) {
//     return true
//   }

//   return false
// }

/**
 * LRU 缓存算法
 * RU（Least Recently Used）算法是缓存淘汰算法的一种。简单地说，由于内存空间有限，
 * 需要根据某种策略淘汰不那么重要的数据，用以释放内存。
 * 
 * LRU 的策略是最早操作过的数据放最后，最晚操作过的放开始，按操作时间逆序，如果达到上限，则淘汰末尾的项。
 * 整个 LRU 算法有一定的复杂度，并且需要很多功能扩展。因此在生产环境中建议直接使用成熟的库，比如 npm 搜索 lru-cache
 * 
 * 这里我们尝试实现一个微型体统级别的 LRU 算法：

运用你所掌握的数据结构，设计和实现一个 LRU（最近最少使用）缓存机制。它应该支持以下操作：获取数据 get 和 写入数据 put 。
获取数据 get(key) － 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 －1。

写入数据 put(key, value) － 如果密钥不存在，则写入其数据值。
当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。

我们先来整体思考：尽量满足 O(1) 的时间复杂度中完成获取和写入的操作，
那么可以使用一个 Object 来进行存储，如果 key 不是简单类型，可以使用 Map 实现：
 */
// const LRUCache = function(capacity) {

// }
/**
 * 在这个算法中，最复杂的应该是淘汰策略，淘汰数据的时间复杂度必须是 O(1) 的话，
 * 我们一定需要额外的数据结构来完成 O(1) 的淘汰策略。那应该用什么样的数据结构呢？答案是双向链表。

链表在插入与删除操作上，都是 O(1) 时间的复杂度，唯一有问题的查找元素过程比较麻烦，是 O(n)。
但是这里我们不需要使用双向链表实现查找逻辑，因为 map 已经很好的弥补了缺陷。

赘述一下：我们在写入值的时候，判断缓存容量是否已经达到上限，如果缓存容量达到上限时，
应该删除最近最少使用的数据值，从而为以后的新的数据值留出空间。

结合链表的话，我们将刚刚写入的目标值设置为链表的首项，超过限制，就删除链表的尾项。

最终实现：
 */
// const LRUCache = function(capacity) {
//   this.map = {}
//   this.size = 0
//   this.maxSize = capacity

//   // 链表初始化，初始化只有一个头尾
//   this.head = {
//     prev: null,
//     next: null
//   }
//   this.tail = {
//     prev: this.head,
//     next: null
//   }
//   this.head.next = this.tail
// }
// // get获取某个节点数据，那么代表这个节点最近在使用，就插入到链表最前面
// LRUCache.prototype.get = function(key) {
//   if (this.map[key]) {
//     // 抽取此节点
//     const node = this.extractNode(this.map[key])
//     // 最新访问，将该节点放到链表的首项
//     this.insertNodeToHead(node)

//     return this.map[key].val
//   } else {
//     return -1
//   }
// }
// // 添加节点
// LRUCache.prototype.put = function(key, value) {
//   let node

//   if (this.map[key]) {
//     // 该项已经存在，更新值
//     node = this.extractNode(this.map[key])
//     node.val = value
//   } else {
//     // 如果该项不存在
//     // 创造新结点
//     node = {
//       prev: null,
//       next: null,
//       val: value,
//       key
//     }
//     this.map[key] = node

//   }
//   // 插入到链表首项
//   this.insertNodeToHead(node)
//   this.size++

//   // 如果容量满了,删除尾项
//   if (this.size > this.maxSize) {
//     const nodeToDelete = this.tail.prev
//     const keyToDelete = nodeToDelete.key

//     this.extractNode(nodeToDelete)
//     this.size--
//     delete this.map[keyToDelete]
//   }
// }

// // 插入到链表首项，并非头部
// LRUCache.prototype.insertNodeToHead = function(node) {
//   const head = this.head
//   const afterHeadNode = this.head.next

//   node.prev = head
//   head.next = node
//   node.next = afterHeadNode
//   afterHeadNode.prev = node

//   return node
// }

// // 从链表中抽取节点,抽取的时候要把此节点的pre和next节点关系处理好
// LRUCache.prototype.extractNode = function(node) {
//   const beforeNode = node.prev
//   const afterNode = node.next

//   beforeNode.next = afterNode
//   afterNode.prev = beforeNode

//   node.next = null
//   node.prev = null

//   return node
// }
/**
 * 反转链表

题目：对一个单链表进行反转

输入：1→2→3→4→5→NULL

输出：5→4→3→2→1→NULL

最直观的解法是使用三个指针，把头节点变成尾节点，进行遍历：下一个节点 拼接到当前节点的头部，以此类推。
这种方法的实现我们不再手写，而是重点关注一下递归解法。

递归解法就要先判断递归终止条件，当下一个节点为 null，找到尾节点时，将其返回。我们从后往前进行：
 */
// const reverseList = head => {
//   if (head === null || head.next === null) {
//     return head
//   }

//   let newHead = reverseList(head.next)
//    // 将当前节点的一下节点的 next 指向，指向为当前节点
//   head.next.next = head
//   // 暂时情况当前节点的 next 指向
//   head.next = null
//   return newHead
// }

// 常规方法
// const reverseList = head => {
//   if (head === null || head.next === null) return head

//   let cur = head
//   let pre = null

//   while(cur) {
//     const next = cur.next
//     cur.next = pre
//     pre = cur
//     cur = next
//   }
//   return pre
// }
// const reverseObj = {
//   next: {
//     next: {
//       next: {
//         next: {
//           next: null,
//           key: 5
//         },
//         key: 4
//       },
//       key: 3
//     },
//     key: 2
//   },
//   key: 1
// }
// console.log(reverseList(reverseObj))

/**
 * 删除链表的倒数第 N 个节点

题目：给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

输入：1→2→3→4→5，和 n = 2

输出：1→2→3→5

这道题目的关键是如何优雅地找到倒数第 N 个节点。

我们当然可以使用两次循环，第一次循环得到整个链表的长度 L，那么需要删除的节点就位于 L - N + 1 位置处，第二次遍历到相关位置进行操作即可。

这道题其实是可以用一次遍历来解决的。我们需要使用双指针，快指针 fast 先前进 N，找到需要删除的节点；
然后慢指针 slow 从 head 开始，和快指针 fast 一起前进，直到 fast 走到末尾。 此时 slow 的下一个节点就是要删除的节点，
也就是倒数第 N 个节点。需要注意的是，如果快指针移动 N 步之后，已经到了尾部，那说明需要删除的就是头节点。
 * 
 */
// const removeNthFromEnd = (head, n) => {
//   if (head === null) return head

//   if (n === 0) return head

//   let slow = head
//   let fast = head

//   // fast 先前进 n 步
//   while(n) {
//     fast = fast.next
//     n--
//   }
//   // 如果快指针移动 N 步之后，已经到了尾部，那说明需要删除的就是头节点
//   if (fast === null) {
//     return head.next
//   }

//   while(fast.next) {
//     fast = fast.next
//     slow = slow.next
//   }

//   slow.next = slow.next.next

//   return head
// }
// const reverseObj = {
//   next: {
//     next: {
//       next: {
//         next: {
//           next: null,
//           key: 5
//         },
//         key: 4
//       },
//       key: 3
//     },
//     key: 2
//   },
//   key: 1
// }
// console.log(removeNthFromEnd(reverseObj, 2))
/**
 * 算法学习

本节课内容到这里，我们只是列举了一些算法题目，也算不上“题海战术”，但问题都比较典型。
可是面对这些相对零散的内容，我们应该如何入手学习呢？只是一味的刷题，似乎效率低下而无趣。

我认为对于算法的学习，需要做到“分门别类”，按照不同类别的算法思想，
遵循循序渐进的进步路线，才会“越来越有感觉”。我把算法的一些基础思想进行了归并：

枚举
模拟
递归/分治
贪心
排序
二分
倍增
构造
前缀和/差分
我们来简单总结一下这些算法基础思想
 */

/* 杨辉三角 II
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。 
 */

/**
* @param {number} rowIndex
* @return {number[]}
*/
/* var getRow = function (rowIndex) {
  if (rowIndex === 0) return [1];

  let array = [];

  for (let i = 0; i <= rowIndex; i++) {
    let item = [];
    const i1 = i + 1;
    let len = Math.ceil(i1 / 2);
    for (let j = 1; j <= len; j++) {
      if (j === 1 || j === i1) {
        item[j - 1] = 1;
        item[i1 - j] = 1;
        continue;
      }
      item[j - 1] = array[i1 - 2][j - 2] + array[i1 - 2][j - 1];
      if (j * 2 <= i1) {
        item[i1 - j] = item[j - 1]
      }
    }
    array[i] = item;
  }
  return array[rowIndex];
}; */

// 空间复杂度为 O(k)
/* var getRow = function (rowIndex) {
  if (rowIndex == 0) return [1];
  let res = [1];
  for (let i = 1; i < rowIndex + 1; i++) {
    res.unshift(0);
    for (let j = 0; j < i; j++) {
      res[j] = res[j] + res[j + 1];
    }
  }
  return res;
}; */
// console.log(getRow(3))

/**
 * 反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 */

/**
* @param {ListNode} head
* @return {ListNode}
*/
// 递归
// var reverseList = function (head) {
//   if (head === null || head.next === null) {
//     return head
//   }

//   let newHead = reverseList(head.next)
//   head.next.next = head
//   head.next = null

//   return newHead
// };
// // 迭代
// var reverseList2 = function(head) {
//   if (head === null || head.next === null) {
//     return head
//   }

//   let cur = head
//   let pre = null
//   while(cur) {
//     const next = cur.next
//     cur.next = pre
//     pre = cur
//     cur = next
//   }
//   return pre
// }
/**
 * 给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归
/* var maxDepth = function (root) {
    if (root == null) return 0;

    let leftMax = dep(root.left)
    let rightMax = dep(root.right)

    return Math.max(leftMax, rightMax) + 1
}; */

/**
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:

输入: 2.00000, 10
输出: 1024.00000
示例 2:

输入: 2.10000, 3
输出: 9.26100
示例 3:

输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
说明:

-100.0 < x < 100.0
n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1]
 */

/**
* @param {number} x
* @param {number} n
* @return {number}
*/
// 递归
/* var myPow = function(x, n) {
  if (n < 0) {
    x =  1 / x;
    n = -n;
  }

  const add = function(x, n) {
    if (n === 0) return 1;
    if (n === 1) return x;
    
    // 关键 e>>>1 为无符号除以二取整
    let half = add(x, n >>> 1);

    if (n % 2 === 0) {
      return half * half;
    } else {
      return half * half * x;
    }
  }

  return add(x, n);
}
console.log(myPow(2, 3)); */
/**
 * 方法二：快速幂 + 迭代
作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/powx-n/solution/powx-n-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
这样以来，我们从 x 开始不断地进行平方，得到 x^2, x^4, x^8, x^{16}⋯，如果 n 的第 k 个（从右往左，从 0 开始计数）二进制位为 1，
那么我们就将对应的贡献 x^{2^k}计入答案。

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/powx-n/solution/powx-n-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
// var myPow = function(x, n) {

//   const quickMul = function(x, N) {
//     let ans = 1;

//     // 贡献的初始值为x
//     let x_contribute = x;
//     // 在对N进行二进制拆分的同时计算答案
//     while(N > 0) {
//       if (N % 2 === 1) {
//         // 如果 N 二进制表示的最低位为 1，那么需要计入贡献
//         ans = ans * x_contribute;
//       }
//       // 将贡献不断地平方
//       x_contribute *= x_contribute;
//       N = N >>> 1; // N >>> 1 为无符号除以二取整
//     }
//     return ans;
//   };

//   return n >= 0 ? quickMul(x, n) : 1 / quickMul(x, -n);
// }

/**
 * 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * 示例：

 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

 /**
  * @param {array} l1
  * @param {array} l2
  * @return {array}
  */
//  递归
// const mergeTwoLists = function(l1, l2) {
//   if (l1 === null) {
//     return l2;
//   } else if (l2 === null) {
//     return l1;
//   } else if (l1.val < l2.val) {
//     l1.next = mergeTwoLists(l1.next, l2);
//     return l1;
//   } else {
//     l2.next = mergeTwoLists(l1, l2.next);
//     return l2;
//   }
// }
// // 迭代
// const mergeTwoListLoop = function(l1, l2) {
//   let preHead = {}
//   let pre = preHead

//   while(l1 !== null && l2 !== null) {
//     if (l1.val < l2.val) {
//       pre.next = l1
//       l1 = l1.next      
//     } else {
//       pre.next = l2
//       l2 = l2.next
//     }
//     pre = pre.next
//   }

//   pre.next = l1 === null ? l2 : l1;
//   return preHead.next;
// }
/**
 * 第K个语法符号
在第一行我们写上一个 0。接下来的每一行，将前一行中的0替换为01，1替换为10。

给定行数 N 和序数 K，返回第 N 行中第 K个字符。（K从1开始）


例子:

输入: N = 1, K = 1
输出: 0

输入: N = 2, K = 1
输出: 0

输入: N = 2, K = 2
输出: 1

输入: N = 4, K = 5
输出: 1

解释:
第一行: 0
第二行: 01 n=2 k=2 1
第三行: 01 1 0 n = 3  k = 3 1
第四行: 01101 0 01 n = 4  k = 6 0
第五行: 0110100110 0 10110 n=5 k= 11 0

注意：

N 的范围 [1, 30].
K 的范围 [1, 2^(N-1)].
 */

 /**
  * 递归（父变体）
  * 思路和算法

  * 因为生成每一行只需要前一行的信息，所以我们可以考虑解析前一行的位来输出答案。
  * 结合上述例子分析
  * 第k位的父位应该是 (k + 1) / 2 位，
  * 如果父位是0，那么这一位就是(1 - (k % 2))
  * 如果父位是 1，那么这一位就是 K%2
  * 
  * 复杂度分析
  * 时间复杂度：O(N)。找出答案需要 N-1 步。
  * 空间复杂度：O(1)
  */
var kthGrammar = (n, k) => {
  if (n === 1) return 0;
  return (~k & 1) ^ kthGrammar(n - 1, (k+1) / 2);
}


/* 递归（翻转变体）
 * 思路和算法

 * 就像在 方法二 中那样，我们可以尝试按它前面的位来写出这一位。
 * 如果我们写出该序列中的几行，就可以发现：后半部分总是与前半部分相反，也就是说：'0' 变成 '1' 而 '1' 变成 '0'。
 * 我们可以用归纳法来验证这一推断。其关键思想是，如果字符串 X 生成 Y，那么翻转后的字符串X′将会生成 Y′。
 * 这就引出了下面的算法思想：
 * 如果 K 在后半部分，那么我们可以将 K -= (1 << N - 2) 设为前半部分，然后翻转得到最终答案。
 * 
 */

 /**
  * 复杂度分析

时间复杂度：O(N)。找出答案需要 N-1 步。

空间复杂度：O(1)。
  */
// class Solution {
//   public int kthGrammar(int N, int K) {
//     if (N == 1) return 0;
//     if (K <= 1 << N - 2)
//       return kthGrammar(N - 1, K);
//     return kthGrammar(N - 1, K - (1 << N - 2)) ^ 1;
//   }
// }

// 方法四：二进制计数
// 思路和算法

// 在 方法三 中，每一行的后半部分是前半部分反转后的结果。

// 当索引 K 写为二进制形式后（从 0 开始索引），后半部分的索引的第一位总是 1。

// 这意味着，当使用方法三中的算法时，我们翻转最终答案的次数仅仅是 K - 1 的二进制表示中的 1 的个数。
/**
 * 复杂度分析

时间复杂度：O(log N)即 N 的二进制表示的位数。如果logN 是有界的，那么可以将其视作 O(1)。

空间复杂度：O(1)。（在 Python 中，bin(X) 会创造一个长度为 O(logX) 的字符串，这是可以避免的。）
 */
// class Solution {
//   public int kthGrammar(int N, int K) {
//     return Integer.bitCount(K - 1) % 2;
//   }
// }

// 给定一个整数 n，生成所有由 1 ...n 为节点所组成的 二叉搜索树 。
// 示例：

// 输入：3
// 输出：
// [
//   [1, null, 3, 2],
//   [3, 2, null, 1],
//   [3, 1, null, null, 2],
//   [2, 1, 3],
//   [1, null, 2, null, 3]
// ]
// 解释：
// 以上的输出对应以下 5 种不同结构的二叉搜索树：

// 1         3     3      2      1
// \       /     / / \      \
// 3     2     1      1   3      2
//   / /       \                 \
// 2     1         2                 3

// class TreeNode {
//   constructor(data) {
//     this.left = null
//     this.right = null
//     this.value = data
//   }
// }
  
// var generateTrees = function(n) {
//   if (n == 0) {
//     return [];
//   }
//   var generate_trees = function(start, end) {
//     if (start > end) {
//       return [null];
//     }
//     var all_trees = [];

//     // pick up a root
//     for (let i = start; i <= end; i++) {
//       // All possible left subtrees if i is choosen to be a root
//       let left_trees = generate_trees(start, i - 1);
//       // All possible right subtrees if i is choosen to be a root
//       let right_trees = generate_trees(i + 1, end);

//       // connect left and right trees to the root i
//       for (let elem_l of left_trees.values()) {
//         for (let elem_r of right_trees.values()) {
//           const currentTree = new TreeNode(i);
//           currentTree.left = elem_l
//           currentTree.right = elem_r
//           all_trees.push(currentTree)
//         }
//       }
//     }
//     return all_trees;
//   };

//   return generate_trees(1, n);
// }
// console.log(generateTrees(3));

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str) {
  var len = str.len;
  var result = 0;
  var mapping = {};

  // 双指针，最开始同时指向起点，快指针先走，直到遇到重复的字符为止，此时移动慢指针到重复字符的另一个位置，
  // 并更新mapping中字符的状态
  // 此时[0, i]与[i, j]之间没有重复的
  // 判断字符是否重复，用对象保存每个字符
  for (var i = 0, j = 0; ; i++) {
    while (j < len && !mapping[str[j]]) {
      mapping[str[j++]] = true;
    }
    result = Math.max(result, j - i);

    if (j >= len) {
      break;
    }

    // 将i指针移动到重复字符所在的另一个位置
    while(str[i] !== str[j]) {
      mapping[str[i++]] = false;
    }

    mapping[str[i]] = false;
  }
  
  return result;
};
// 快速排序简单实现
// 分治
// var quickSort = array => {
//   var len = array.length;

//   if (len < 2) {
//     return array;
//   }
//   let left = [];
//   let middle = [];
//   let right = [];

//   // 随即找到 pivot
//   let pivot = array[Math.floor(Math.random() * len)];

//   for (let i = 0; i < len; i++) {
//     if (array[i] < pivot) {
//       left.push(array[i])
//     } else if (array[i] > pivot) {
//       right.push(array[i])
//     } else {
//       middle.push(array[i])
//     }
//   }
//   return quickSort(left).concat(middle, quickSort(right));
// };
// 原数组中操作
// var quickSort = (array, start, end) => {
//   start = start === undefined ? 0 : start
//   end = end === undefined ? (array.length - 1) : end

//   if (start >= end) return
  
//   let value = array[start];
//   let i = start;
//   let j = end;

//   while(i < j) {
//     // 找到右边第一个小于value的下标，并记录
//     while(i < j && array[j] >= value) {
//       j--;
//     }
//     if (i < j) {
//       array[i++] = array[j];
//     }
//     // 找到左边第一个大于value的下标，并记录
//     while(i < j && array[i] < value) {
//       i++;
//     }
//     if (i<j) {
//       array[j--] = array[i];
//     }
//   }
//   array[i] = value;

//   quickSort(array, start, i - 1)
//   quickSort(array, i + 1, end)
// }
// 优化上面方法，实现尾递归调用
// 最后两个调用思想是：左边所有小于标准值的再次进行排序操作，
// 直到左边排序完成，右边继续执行类似左边的操作
// 那么我们将两个递归调用怎么合并呢，重点，先完成左边，再完成右边
// 那这里我们可以用栈来管理这个调用顺序
var quickSort = (array, stack) => {
  let start = stack[0];
  let end = stack[1];

  let value = array[start];
  let i = start;
  let j = end;

  while (i < j) {
    // 找到右边第一个小于value的下标，并记录
    while(i < j && array[j] >= value) {
      j--;
    }
    if (i < j) {
      array[i++] = array[j];
    }
    // 找到左边第一个大于value的下标，并记录
    while(i < j && array[i] < value) {
      i++;
    }
    if (i<j) {
      array[j--] = array[i];
    }
  }
  array[i] = value;

  // 下标用完了就出栈
  stack.shift()
  stack.shift()

  // 存入新下标
  if (i + 1 < end) {
    stack.unshift(i + 1, end)
  }
  if (start < i - 1) {
    stack.unshift(start, i - 1)
  }
  if (stack.length === 0) return

  quickSort(array, stack)
}

const inserSort = array => array.reduce(insert, [])
const insert = (sortedArray, value) => {
  if (sortedArray.length === 0) {
    sortedArray.push(value)
    return sortedArray
  }

  let i = 0,
      j = sortedArray.length,
      mid;

  // 极端情况
  if (sortedArray[0] > value) {
    sortedArray.unshift(value)
    return sortedArray
  }
  if (sortedArray[j - 1] <= value) {
    sortedArray.push(value)
    return sortedArray
  }

  // 开始二分查找
  while(i < j) {
    mid = (i + j) >>> 1 // 除以二，再向下取整

    if (i == mid) {
      break;
    }

    if (value > sortedArray[mid]) {
      i = mid
    }
    if (value < sortedArray[mid]) {
      j = mid
    }
    if (value === sortedArray[mid]) {
      i = mid
    }
  }

  let midArray = [value]
  let lastArray = sortedArray.slice(i + 1);
  sortedArray = sortedArray.slice(0, i).concat(midArray, lastArray)

  return sortedArray;
}
