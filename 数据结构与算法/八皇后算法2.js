
const QUEEN = 8; //皇后的数目
const INITIAL  = -1; //棋盘的初始值

const a = [].fill(INITIAL, 0, QUEEN); //一维数组表示棋盘

function valid(row, col) { //判断第row行第col列是否可以放置皇后
  for (let i = 0; i < QUEEN; ++i) { // 对棋盘进行扫描
    // 这里解释一下，斜线上两个点的x坐标，y坐标的差的绝对值相等
    if (a[i] == col || Math.abs(i - row) == Math.abs(a[i] - col)) { //判断列冲突与斜线上的冲突
      return 0;
    }
  }
  return 1;
}

function print() { //打印输出N皇后的一组解
  let i, j;
  for (i = 0; i < QUEEN; ++i) {
    for (j = 0; j < QUEEN; ++j) {
      if (a[i] != j) { //a[i]为初始值
        console.log("c ", '.');
      } else { //a[i]表示在第i行的第a[i]列可以放置皇后
        console.log("c ", '#');
      }
    }
  }
  for (i = 0; i < QUEEN; ++i) {
    console.log("%d ", a[i]);
  }
  console.log("--------------------------------\n");
}

function queen() { //N皇后程序
  let n = 0;
  let i = 0, j = 0;
  while (i < QUEEN) {
    while (j < QUEEN) { // 对i行的每一列进行探测，看是否可以放置皇后
      if (valid(i, j)) { // 该位置可以放置皇后
        a[i] = j;
        j = 0; // 第 i 行放置皇后以后，需要继续探测下一行的皇后位置，所以此处将j清零，从下一行的第0列开始逐列探测
        break;
      } else {
        ++j; // 继续探测下一列
      }
    }
    if (a[i] == INITIAL) { // 第i行没有找到可以放置皇后的位置
      if (i == 0) { // 回溯到第一行，仍无法找到可以放置皇后的位置，则说明已经找到所有的解，程序终止
        break;
      } else { // 没有找到可以放置皇后的列，此时就应该回溯
        --i;
        j = a[i] + 1; // 把上一行皇后的位置往后移一列
        a[i] = INITIAL; // 把上一行皇后的位置清除，重新探测
        continue;
      }
    }
    if (i == QUEEN - 1) { //最后一行找到了一个皇后位置，说明找到一个结果，打印出来
      print();
      //不能在此处结束程序，因为我们要找的是N皇后问题的所有解，此时应该清除该行的皇后，从当前放置皇后列数的下一列继续探测。
      j = a[i] + 1; // 从最后一行放置皇后列数的下一列继续探测
      a[i] = INITIAL; //清除最后一行的皇后位置
      continue;
    }
    ++i; //继续探测下一行的皇后位置
  }
}
queen();
