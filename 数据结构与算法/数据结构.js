/**
 * 八大类
 * 数组：Array
 * 堆栈：Stack
 * 队列：Queue
 * 链表：Linked Lists
 * 树：Trees
 * 图：Graphs
 * 字典树：Trie
 * 散列表（哈希表）：Hash Tables
 * 
 * */

/**
 * 栈和队列是类似数组的结构，非常多的初级题目要求用数组实现栈和队列，他们在插入和删除的方式上和数组有所差异，但是实现还是非常简单的；
 * 链表、树和图这种数据结构的特点是，其节点需要引用到其他节点，因此在增删时，需要注意对相关前驱和后继节点的影响；
 * 可以从堆栈和队列出发，构建出链表；
 * 树和图最为复杂，因为他们本质上是扩展了链表的概念；
 * 散列表的关键是理解散列函数，明白依赖散列函数实现保存和定位数据的过程；
 * 直观上认为，链表适合记录和存储数据；哈希表和字典树在检索数据以及搜索方面有更大的应用场景。
 */
// 堆栈和队列
// 栈的实现，后进先出 LIFO（Last in、First out）：
// class Stack {
//   constructor(...args) {
//     this.stack = [...args];
//   }

//   // Modifiers
//   push(...items) {
//     return this.stack.push(...items);
//   }

//   pop() {
//     return this.stack.pop()
//   }

//   // Element access
//   peek() {
//     return this.isEmpty() ? undefined : this.stack[this.size() -1];
//   }

//   // Capacity
//   isEmpty() {
//     return this.size() == 0;
//   }

//   size() {
//     return this.stack.length;
//   }
// }
// // 队列的实现，先进先出 FIFO（First in、First out）：
// class Queue {
//   constructor(...args) {
//     this.queue = [...args]
//   }

//   // Modifiers
//   enqueue(...items) {
//     return this.queue.push(...items)
//   }

//   dequeue() {
//     return this.queue.shift()
//   }

//   // Element access
//   front() {
//     return this.isEmpty()
//           ? undefined
//           : this.queue[0]
//   }

//   back() {
//     return this.isEmpty()
//           ? undefined
//           : this.queue[this.size() - 1]
//   }

//   // Capacity
//   isEmpty() {
//     return this.size() == 0
//   }

//   size() {
//     return this.queue.length
//   }
// }


/**
 * 二叉搜索树的实现和遍历

说二叉树最为基本，因为他的结构最简单，每个节点至多包含两个子节点。
二叉树又非常有用：因为根据二叉树，我们可以延伸出二叉搜索树（BST）、平衡二叉搜索树（AVL）、红黑树（R/B Tree）等。

二叉搜索树有以下特性：

左子树上所有结点的值均小于或等于它的根结点的值
右子树上所有结点的值均大于或等于它的根结点的值
左、右子树也分别为二叉搜索树

我们实现二叉搜索树的以下方法：

insertNode：根据一个父节点，插入一个子节点
insert：插入一个新节点
removeNode：根据一个父节点，移除一个子节点
remove：移除一个节点
findMinNode：获取子节点的最小值
searchNode ：根据一个父节点，查找子节点
search ：查找节点
preOrder：前序遍历
InOrder：中序遍历
PostOrder：后续遍历
 */
// 二叉树节点方法
// class Node {
//   constructor(data) {
//     this.left = null
//     this.right = null
//     this.value = data
//   }
// }
// class BinarySearchTree {
//   insertNode(root, newNode) {
//     if (newNode.value < root.value) {
//       (!root.left) ? root.left = newNode : this.insertNode(root.left, newNode)
//     } else {
//       (!root.right) ? root.right = newNode : this.insertNode(root.right, newNode)
//     }
//   }

//   insert(value) {
//     let newNode = new Node(value)
//     if (!this.root) {
//       this.root = newNode
//     } else {
//       this.insertNode(this.root, newNode)
//     }
//   }
//   removeNode(root, value) {
//     if (!root) {
//       return null
//     }

//     if (value < root.value) {
//       root.left = this.removeNode(root.left, value)
//       return root
//     } else if (value > root.value) {
//       root.right = this.removeNode(root.right, value)
//       return root
//     } else {
//       // 找到了需要删除的节点
//       // 如果当前 root 节点无左右子节点
//       if (!root.left && !root.right) {
//         root = null
//         return root
//       }

//       // 只有左节点
//       if (root.left && !root.right) {
//         root = root.left
//         return root
//       }
//       // 只有右节点
//       else if (root.right) {
//         root = root.right
//         return root
//       }
//       // 有左右两个节点
//       /**
//        * 当需要删除的节点含有左右两个子节点时，
//        * 因为我们要把当前节点删除，就需要找到合适的“补位”节点，
//        * 这个“补位”节点一定在该目标节点的右侧树当中，
//        * 因为这样才能保证“补位”节点的值一定大于该目标节点的左侧树所有节点，
//        * 
//        * 而该目标节点的左侧树不需要调整；
//        * 同时为了保证“补位”节点的值一定要小于该目标节点的右侧树值，
//        * 因此要找的“补位”节点其实就是该目标节点的右侧树当中最小的那个节点。
//        */
//       let minRight = this.findMinNode(root.right)
//       root.value = minRight.value
//       // 通过递归在原来的位置删除补位节点
//       root.right = this.removeNode(root.right, minRight.value)
//       return root
//     }
//   }
//   remove(value) {
//     if (this.root) {
//       this.removeNode(this.root, value)
//     }
//   }
//   // 该方法不断递归，直到找到最左叶子节点即可
//   findMinNode(root) {
//     if (!root.left) {
//       return root
//     } else {
//       return this.findMinNode(root.left)
//     }
//   }
//   // 根据一个父节点，查找子节点
//   searchNode(root, value) {
//     if (!root) {
//       return null
//     } else {
//       if (value < root.value) {
//         return this.searchNode(root.left, value)
//       } else if (value > root.value) {
//         return this.searchNode(root.right, value)
//       }
//       return root
//     }
//   }
//   // 查找结点
//   search(value) {
//     if (!this.root) {
//       return false
//     }
//     return Boolean(this.searchNode(this.root, value))
//   }
//   // 前序遍历
//   preOrder(root) {
//     if (root) {
//       console.log(root.value)
//       this.preOrder(root.left)
//       this.preOrder(root.right)
//     }
//   }
//   // 中序遍历
//   inOrder(root) {
//     if (root) {
//       this.inOrder(root.left)
//       console.log(root.value)
//       this.inOrder(root.right)
//     }
//   }
//   // 后序遍历
//   postOrder(root) {
//     if (root) {
//       this.postOrder(root.left)
//       this.postOrder(root.right)
//       console.log(root.value)
//     }
//   }
// }

// 字典树
// 字典树（Trie）是针对特定类型的搜索而优化的树数据结构。
// 典型的例子是 autoComplete，也就是说它适合实现：通过部分值得到完整值的场景。
// 字典树因此也是一种搜索树，我们有时候也叫做前缀树，因为任意一个节点的后代都存在共同的前缀。
/**
 * 总结一下它的特点：

 * 字典树能做到高效查询和插入，时间复杂度为 O(k)，k 为字符串长度
 * 但是如果大量字符串没有共同前缀，那就很耗内存，读者可以想象一下最极端的情况，所有单词都没有共同前缀时，这颗字典树是什么样子
 * 字典树的核心就是减少没必要的字符比较，使查询高效率，也就是说用空间换时间，再利用共同前缀来提高查询效率
 */
/**
 * 字典树还有很多其他应用场景：

 * 搜索
 * 输入法选项
 * 分类
 * IP 地址检索
 * 电话号码检索
 */
// 一个字典树上的节点
// class PrefixTreeNode {
//   constructor(value) {
//     // 存储子节点
//     this.children = {}
//     this.isEnd = null
//     this.value = value
//   }
// }
// // 一个字典树继承 PrefixTreeNode 类：
// class PrefixTree extends PrefixTreeNode {
//   constructor() {
//     super(null)
//   }
//   /**
//    * addWord：创建一个字典树节点
//    * predictWord：给定一个字符串，返回字典树中以该字符串开头的所有单词
//    */
//   addWord(str) {
//     const addWordHelper = (node, str) => {
//       // 当前node不含当前 str 开头的目标
//       if (!node.children[str[0]]) {
//         // 以当前 str 开头的第一个字母，创建一个 PrefixTreeNode 实例
//         node.children[str[0]] = new PrefixTreeNode(str[0])
//         if (str.length === 1) {
//           node.children[str[0]].isEnd = true
//         } else if (str.length > 1) {
//           addWordHelper(node.children[str[0]], str.slice(1))
//         }
//       }
//     }
//     addWordHelper(this, str)
//   }
//   predictWord(str) {
//     let getRemainingTree = function(str, tree) {
//       let node = tree
//       while (str) {
//         node = node.children[str[0]]
//         str = str.substr(1)
//       }
//       return node
//     }
//     // 该数组维护所有以 str 开头的单词
//     let allWords = []

//     let allWordsHelper = function(stringSoFar, tree) {
//       for (let k in tree.children) {
//         const child = tree.children[k]
//         let newString = stringSoFar + child.value
//         if (child.endWord) {
//           allWords.push(newString)
//         }
//         allWordsHelper(newString, child)
//       }
//     }
//     let remainingTree = getRemainingTree(str, this)
//     if (remainingTree) {
//       allWordsHelper(str, remainingTree)
//     }

//     return allWords
//   }
// }
/**
 * 图是由具有边的节点集合组成的数据结构，图可以是定向的或不定向的
 * LBS 地图服务以及 GPS 系统
 * 社交媒体网站的用户关系图
 * 前端工程化中的开发依赖图
 * 搜索算法使用图，保证搜索结果的相关性
 * 寻找降低运输和交付货物和服务成本的最佳途径
 * 
 * 图的几种基本元素：
 * 节点 Node
 * 边 Edge
 * |V| 图中顶点（节点）的总数
 * |E| 图中的连接总数（边）
 */
// 图的实现和遍历
// 实现一个有向图
// class Graph {
//   constructor() {
//     this.AdjList = new Map()
//   }
//   // 使用 Map 数据结构表述图中顶点关系。
//   /**
//    * 实现方法：
//    * 添加顶点：addVertex
//    * 添加边：addEdge
//    * 打印图：print
//    * 广度优先算法遍历
//    * 深度优先算法
//    */
//   addVertex(vertex) {
//     if (!this.AdjList.has(vertex)) {
//       this.AdjList.set(vertex, [])
//     } else {
//       throw 'vertex already exist!'
//     }
//   }
//   addEdge(vertex, node) {
//     if (this.AdjList.has(vertex)) {
//       if (this.AdjList.has(node)) {
//         let arr = this.AdjList.get(vertex)
//         if (!arr.includes(node)) {
//           arr.push(node)
//         }
//       } else {
//         throw `Can't add non-existing vertex ${node}`
//       }
//     } else {
//       throw `You should add ${vertex} first`
//     }
//   }
//   print() {
//     for (let [key, value] of this.AdjList) {
//       console.log(key, value)
//     }
//   }
//   /**
//   * 广度优先算法（BFS），是一种利用队列实现的搜索算法。
//   * 对于图，其搜索过程和 “湖面丢进一块石头激起层层涟漪” 类似。
//   * 换成算法语言，就是从起点出发，对于每次出队列的点，都要遍历其四周的点。

//   * 因此 BFS 的实现步骤：

//   * 起始节点作为起始，并初始化一个空对象：visited
//   * 初始化一个空数组，该数组将模拟一个队列
//   * 将起始节点标记为已访问
//   * 将起始节点放入队列中
//   * 循环直到队列为空
//   */
//   createVisitedObject() {
//     let map = {}
//     for (let key of this.AdjList.keys()) {
//       map[key] = false
//     }
//     return map
//   }
//   bfs(initialNode) {
//     // 创建一个已访问节点的map
//     let visited = this.createVisitedObject()
//     // 模拟一个队列
//     let queue = []

//     // 第一个节点已访问
//     visited[initialNode] = true
//     // 第一个节点入队列
//     queue.push(initialNode)

//     while(queue.length) {
//       let current = queue.shift()
//       console.log(current)

//       // 获得该节点的其它节点关系
//       let arr = this.AdjList.get(current)

//       for (let elm of arr) {
//         // 如果当前节点没有访问过
//         if (!visited[elm]) {
//           visited[elm] = true
//           queue.push(elm)
//         }
//       }
//     }
//   }
//   /**
//    * 那么对于深度优先搜索算法（DFS），
//    * 我把它总结为：“不撞南墙不回头”，从起点出发，
//    * 先把一个方向的点都遍历完才会改变方向。
//    * 换成程序语言就是：“DFS 是利用递归实现的搜索算法”。

//   * 因此 DFS 过程：

//   * 起始节点作为起始，创建访问对象
//   * 调用辅助函数递归起始节点
//   */
//   dfs(initialNode) {
//     let visited = this.createVisitedObject()
//     this.dfsHealper(initialNode, visited)
//   }
//   dfsHealper(node, visited) {
//     visited[node] = true
//     console.log(node)

//     let arr = this.AdjList.get(node)

//     for (let elm of arr) {
//       if (!visited[elm]) {
//         this.dfsHealper(elm, visited)
//       }
//     }
//   }
// }
// // 创建顶点
// const graph = new Graph()
// graph.addVertex('A')
// graph.addVertex('B')
// graph.addVertex('C')
// graph.addVertex('D')
// graph.addEdge('B', 'D')
// graph.addEdge('A', 'C')
// graph.addEdge('A', 'B')
// graph.addEdge('C', 'B')
// graph.addEdge('D', 'C')
// graph.print()
// graph.bfs('A')
// graph.dfs('A')

/**
 * 散列表（哈希表）
 * 散列表是一种以 key-value 形式存储数据的数据结构，可以把散列表理解为一种高级的数组，
 * 这种数组的下标可以是很大的整数，浮点数，字符串甚至结构体
 * */
// 采用开链法来解决散列的冲突。
// 单向链表节点
// class ForwardListNode {
//   constructor(key, value) {
//     this.key = key
//     this.value = value
//     this.next = null
//   }
// }
// class HashTable {
//   constructor(bucketSize=97) {
//     this._bucketSize = bucketSize
//     this._size = 0
//     this._buckeks = new Array(this._bucketSize)
//   }
//   hash(key) {
//     let h = 0
//     for (let n = key.length, i = 0; i !== n; i++) {
//       h = (h << 5 | h >> 27)
//       h += key[i].charCodeAt()
//     }
//     return (h >>> 0) % this._bucketSize
//   }
//   // Modifiers
//   put(key, value) {
//     let index = this.hash(key)
//     let node = new ForwardListNode(key, value)

//     if (!this._buckeks[index]) {
//       // 如果桶是空的，则直接把新节点放入桶中即可
//       this._buckeks[index] = node
//     } else {
//       // 如果桶不为空，则在链表头插入新节点
//       node.next = this._buckeks[index]
//       this._buckeks[index] = node
//     }
//     this._size++
//     return index
//   }
//   delete(key) {
//     let index = this.hash(key)
//     if (!this._buckets[index]) {
//       return false
//     }

//     // 添加一个虚拟头节点，方便后面的删除操作
//     let dummy = new ForwardListNode(null, null)
//     dummy.next = this._buckets[index]
//     let cur = dummy.next, pre = dummy
//     while (cur) {
//       if (cur.key === key) {
//         // 从链表删除该节点
//         pre.next = cur.next
//         cur = pre.next
//         this._size--
//       } else {
//         pre = cur
//         cur = cur.next
//       }
//     }
//     this._buckets[index] = dummy.next
//     return true
//   }
//   find(key) {
//     let index = hash(key)

//     // if 对应的 _buckets 为空，不存在此key
//     if (!this._buckeks[index]) {
//       return null
//     }
//     // 遍历对应桶的链表
//     let p = this._buckeks[index]
//     while(p) {
//       // 找到key
//       if (p.key === key) {
//         return p.value
//       }
//       p = p.next
//     }
//     return null
//   }
//   size() {
//     return this._size
//   }
//   isEmpty() {
//     return this._size == 0
//   }
// }





