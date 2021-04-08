// 二叉搜索树
class Node {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      !root.left ? root.left = newNode : this.insertNode(root.left, newNode)
    } else {
      !root.right ? root.right = newNode : this.insertNode(root.right, newNode)
    }
  }
  insert(value) {
    let newNode = new Node(value)
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  removeNode(root, value) {
    if (!root) return null

    if (value < root.value) {
      
    }
    if (value === root.value) {
      // 如果当前节点无左右子节点
      if (!root.left && !root.right) {
        root = null
        return root
      }
      // 只有左节点
      if (root.left && !root.right) {
        root = root.left
        return root
      } else if (!root.left && root.right) {
      // 只有右节点
        root = root.right
        return root
      }
      // 有左右两个子节点
      
    }
  }
}

// 字典树
// 节点
// class PrefixTreeNode {
//   constructor(value) {
//     // 存储子节点
//     this.children = {}
//     this.isEnd = null
//     this.value = value
//   }
// }
// // 继承类
// class PrefixTree extends PrefixTreeNode {
//   constructor() {
//     super(null)
//   }
//   // 创建节点
//   addWord(str) {
//     const addWordHelper = (node, str) => {
//       if (!str) { return }
//       if (!node.children[str[0]]) {
//         node.children[str[0]] = new PrefixTreeNode(str[0])
//         if (str.length === 1) {
//           node.children[str[0]].isEnd = true
//         } else if (str.length > 1) {
//           addWordHelper(node.children[str[0]], str.slice(1))
//         }
//       } else {
//         addWordHelper(node.children[str[0]], str.slice(1))
//       }
//     }
//     addWordHelper(this, str)
//   }
//   // 给定一个字符串，返回字典树中以该子串开头的所有单词
//   predictWord(str) {
//     let getRemainingTree = function(str, tree) {
//       let node = tree
//       while(str) {
//         node = node.children[str[0]]
//         str = str.substr(1)
//       }
//       return node
//     }
//   }
// }

// 图
// 节点
// 边
class Graph {
  constructor() {
    this.AdjList = new Map()
  }
  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, [])
    } else {
      throw 'vertex already exist!'
    }
  }
  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex)
        if (!arr.includes(node)) {
          arr.push(node)
        }
      } else {
        throw `Can't add non-existing vertex ${node}`
      }
    } else {
      throw `You should add ${vertex} first`
    }
  }
  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value)
    }
  }
  // BFS
  createVisitedObject() {
    let map = {}
    for (let key of this.AdjList.keys()) {
      map[key] = false
    }
    return map
  }

  bfs(initialNode) {
    // 创建一个已访问节点的map
    let visited = this.createVisitedObject()
    // 模拟一个队列
    let queue = []

    // 第一个节点已访问
    visited[initialNode] = true
    // 第一个节点入队列
    queue.push(initialNode)

    while(queue.length > 0) {
      let current = queue.shift()
      console.log(current)

      // 获取该节点的其它节点关系
      let arr = this.AdjList.get(current)
      for (let item of arr) {
        if (!visited[item]) {
          visited[item] = true
          queue.push(item)
        }
      }
    }
  }
  dfs(initialNode) {
    // 创建一个已访问节点的map
    let visited = this.createVisitedObject()
    this.dfsHelper(initialNode, visited)
  }
  dfsHelper(node, visited) {
    visited[node] = true
    console.log(node)

    let arr = this.AdjList.get(node)
    for (let item of arr) {
      if (!visited[item]) {
        this.dfsHelper(item, visited)
      }
    }
  }
}


const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')
graph.addEdge('A', 'C')
graph.addEdge('A', 'B')
graph.addEdge('A', 'F')
graph.addEdge('B', 'D')
graph.addEdge('B', 'C')
graph.addEdge('C', 'B')
graph.addEdge('D', 'C')
graph.addEdge('F', 'A')
graph.addEdge('F', 'B')
graph.addEdge('F', 'C')
graph.addEdge('F', 'E')

// graph.bfs('A') // A C B F D E
graph.dfs('A') // A C B D F E

// graph.print()


