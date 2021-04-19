const QUEEN = 8; //皇后的数目
const INITIAL  = -10000; //棋盘的初始值
let count = 0; // 符合要求的数量

const a = Array(QUEEN).fill(INITIAL, 0, QUEEN); //一维数组表示棋盘

function valid(row, col) { //判断第row行第col列是否可以放置皇后
  for (let i = 0; i < QUEEN; ++i) { // 对棋盘进行扫描
    // 这里解释一下，斜线上两个点的x坐标，y坐标的差的绝对值相等
    if (a[i] == col || Math.abs(i - row) == Math.abs(a[i] - col)) { //判断列冲突与斜线上的冲突
      return false;
    }
  }
  return true;
}

function print() { //打印输出N皇后的一组解
  let i, j;
  for (i = 0; i < QUEEN; ++i) {
    let str = '';
    for (j = 0; j < QUEEN; ++j) {
      if (a[i] != j) { //a[i]为初始值
        str += '. ';
      } else { //a[i]表示在第i行的第a[i]列可以放置皇后
        str += '# ';
      }
    }
    console.log(str)
  }
  let queenStr = '';
  for (i = 0; i < QUEEN; ++i) {
    queenStr += a[i]
  }
  console.log(queenStr);
  console.log("--------------------------------\n");
}
function printResult() { // 打印结果
  console.log(count);
}

/**
 * 回溯的三要点
 选择， 决定了搜索空间， 决定了搜索空间有哪些节点。
 约束， 用来剪枝， 避免进入无效的分支。
 目标， 决定了什么时候捕获有效的解， 提前结束递归， 开始回溯。
 链接： https: //leetcode-cn.com/problems/n-queens/solution/shou-hua-tu-jie-cong-jing-dian-de-nhuang-hou-wen-t/
 * @param {*} row 
 * @returns 
 */
function queen(row) { //N皇后程序
  if (row === QUEEN) { // 打印结果
    print();
    count++;
    return
  }
  for (let col = 0; col < QUEEN; col++) { // 枚举出所有选择
    if (valid(row, col)) { // 剪掉无效的选择
      a[row] = col; // 做出选择，放置皇后
      queen(row + 1); // 继续选择，往下递归
      // 执行到这里的话，说明是从下一行回溯到了当前行，把当前行的皇后位置清掉，
      // 继续从当前行的下一列开始判断
      a[row] = INITIAL; // 回溯，撤销当前选择
    }
  }
}
queen(0);
printResult();

