
/**
 * 「NN 皇后问题」 研究的是如何将 NN 个皇后放置在 N\ times NN× N 的棋盘上， 并且使皇后彼此之间不能相互攻击。

 皇后的走法是： 可以横直斜走， 格数不限。 因此要求皇后彼此之间不能相互攻击， 等价于要求任何两个皇后都不能在同一行、 同一列以及同一条斜线上。

 直观的做法是暴力枚举将 NN 个皇后放置在 N\ times NN× N 的棋盘上的所有可能的情况， 并对每一种情况判断是否满足皇后彼此之间不相互攻击。 暴力枚举的时间复杂度是非常高的， 因此必须利用限制条件加以优化。

 显然， 每个皇后必须位于不同行和不同列， 因此将 NN 个皇后放置在 N\ times NN× N 的棋盘上， 一定是每一行有且仅有一个皇后， 每一列有且仅有一个皇后， 且任何两个皇后都不能在同一条斜线上。 基于上述发现， 可以通过回溯的方式寻找可能的解。

 回溯的具体做法是： 使用一个数组记录每行放置的皇后的列下标， 依次在每一行放置一个皇后。 每次新放置的皇后都不能和已经放置的皇后之间有攻击： 即新放置的皇后不能和任何一个已经放置的皇后在同一列以及同一条斜线上， 并更新数组中的当前行的皇后列下标。 当 NN 个皇后都放置完毕， 则找到一个可能的解。 当找到一个可能的解之后， 将数组转换成表示棋盘状态的列表， 并将该棋盘状态的列表加入返回列表。

 由于每个皇后必须位于不同列， 因此已经放置的皇后所在的列不能放置别的皇后。 第一个皇后有 NN 列可以选择， 第二个皇后最多有 N - 1 N− 1 列可以选择， 第三个皇后最多有 N - 2 N− 2 列可以选择（ 如果考虑到不能在同一条斜线上， 可能的选择数量更少）， 因此所有可能的情况不会超过 N!N!种， 遍历这些情况的时间复杂度是 O(N!) O(N!)。

 为了降低总时间复杂度， 每次放置皇后时需要快速判断每个位置是否可以放置皇后， 显然， 最理想的情况是在 O(1) O(1) 的时间内判断该位置所在的列和两条斜线上是否已经有皇后。

 以下两种方法分别使用集合和位运算对皇后的放置位置进行判断， 都可以在 O(1) O(1) 的时间内判断一个位置是否可以放置皇后， 算法的总时间复杂度都是 O(N!) O(N!)。

 方法一： 基于集合的回溯
 为了判断一个位置所在的列和两条斜线上是否已经有皇后， 使用三个集合\ textit {
   columns
 }
 columns、\ textit {
   diagonals
 }
 _1diagonals
 1​
 和\ textit {
   diagonals
 }
 _2diagonals
 2​
 分别记录每一列以及两个方向的每条斜线上是否有皇后。

 列的表示法很直观， 一共有 NN 列， 每一列的下标范围从 00 到 N - 1 N− 1， 使用列的下标即可明确表示每一列。

 如何表示两个方向的斜线呢？ 对于每个方向的斜线， 需要找到斜线上的每个位置的行下标与列下标之间的关系。

 方向一的斜线为从左上到右下方向， 同一条斜线上的每个位置满足行下标与列下标之差相等， 例如(0, 0)(0, 0) 和(3, 3)(3, 3) 在同一条方向一的斜线上。 因此使用行下标与列下标之差即可明确表示每一条方向一的斜线。

 作者： LeetCode - Solution
 链接： https: //leetcode-cn.com/problems/n-queens/solution/nhuang-hou-by-leetcode-solution/
   来源： 力扣（ LeetCode）
 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。
 */
// const N = 8;
// const queenArray = []; // 二维数组，里边是棋盘上皇后的坐标
// let i = j = 0; // x 坐标  y 坐标
// const result = []; // 结果数组，二维
// function queen(x, y) {
//   if (!rightQueen(x, y)) {
//     return false;
//   }
//   queenArray.push([x, y]); // 添加皇后坐标
//   if (queenArray.length === N) {
//     result.push(queenArray.concat([]));
//     queenArray.pop();
//   }
// }
// /**
//  * 判断某一步是否是正确的
//  * @param {number} x
//  * @param {number} y
//  * @returns {boolean}
//  */
// function rightQueen(x, y) {
//   for(let i = 0, len = queenArray.length; i < len; i++) {
//     if (x == queenArray[i][0] || y == queenArray[i][1] || (queenArray[i][1] == queenArray[i][0] + (y - x))|| (queenArray[i][1] == (y + x) - queenArray[i][0])) {
//       return false
//     }
//   }
//   return true
// }
// class Solution {
//   public List < List < String >> solveNQueens(int n) {
//     List < List < String >> solutions = new ArrayList < List < String >> ();
//     int[] queens = new int[n];
//     Arrays.fill(queens, -1);
//     Set < Integer > columns = new HashSet < Integer > ();
//     Set < Integer > diagonals1 = new HashSet < Integer > ();
//     Set < Integer > diagonals2 = new HashSet < Integer > ();
//     backtrack(solutions, queens, n, 0, columns, diagonals1, diagonals2);
//     return solutions;
//   }

//   public void backtrack(List < List < String >> solutions, int[] queens, int n, int row, Set < Integer > columns, Set < Integer > diagonals1, Set < Integer > diagonals2) {
//     if (row == n) {
//       List < String > board = generateBoard(queens, n);
//       solutions.add(board);
//     } else {
//       for (int i = 0; i < n; i++) {
//         if (columns.contains(i)) {
//           continue;
//         }
//         int diagonal1 = row - i;
//         if (diagonals1.contains(diagonal1)) {
//           continue;
//         }
//         int diagonal2 = row + i;
//         if (diagonals2.contains(diagonal2)) {
//           continue;
//         }
//         queens[row] = i;
//         columns.add(i);
//         diagonals1.add(diagonal1);
//         diagonals2.add(diagonal2);
//         backtrack(solutions, queens, n, row + 1, columns, diagonals1, diagonals2);
//         queens[row] = -1;
//         columns.remove(i);
//         diagonals1.remove(diagonal1);
//         diagonals2.remove(diagonal2);
//       }
//     }
//   }

//   public List < String > generateBoard(int[] queens, int n) {
//     List < String > board = new ArrayList < String > ();
//     for (int i = 0; i < n; i++) {
//       char[] row = new char[n];
//       Arrays.fill(row, '.');
//       row[queens[i]] = 'Q';
//       board.add(new String(row));
//     }
//     return board;
//   }
// }

/**
 * 递归方法的一个重要问题时何时回溯及如何回溯的问题。 程序首先对N行中的每一行进行探测， 
 * 寻找该行中可以放置皇后的位置， 具体方法是对该行的每一列进行探测， 看是否可以放置皇后，
 * 如果可以， 则在该列放置一个皇后， 然后继续探测下一行的皇后位置。 
 * 如果已经探测完所有的列都没有找到可以放置皇后的列， 此时就应该回溯， 把上一行皇后的位置往后移一列， 
 * 如果上一行皇后移动后也找不到位置， 则继续回溯直至某一行找到皇后的位置或回溯到第一行， 
 * 如果第一行皇后也无法找到可以放置皇后的位置， 则说明已经找到所有的解程序终止。 
 * 如果该行已经是最后一行， 则探测完该行后， 如果找到放置皇后的位置， 
 * 则说明找到一个结果， 打印出来。 但是此时并不能再此处结束程序， 因为我们要找的是所有N皇后问题所有的解， 
 * 此时应该清除该行的皇后， 从当前放置皇后列数的下一列继续探测。————————————————
 * 版权声明： 本文为CSDN博主「 hackbuteer1」 的原创文章， 遵循CC 4.0 BY - SA版权协议， 转载请附上原文出处链接及本声明。
 * 原文链接： https: //blog.csdn.net/Hackbuteer1/article/details/6657109
 */
/**
 * 回溯法解N皇后问题
 * 使用一个一维数组表示皇后的位置
 * 其中数组的下标表示皇后所在的行
 * 数组元素的值表示皇后所在的列
 * 这样设计的棋盘，所有皇后必定不在同一行，于是行冲突就不存在了
 * date  : 2011-08-03 
 * author: liuzhiwei
 **/

#include <stdio.h>

#include <stdlib.h>

#include <math.h>

#
define QUEEN 8 //皇后的数目
# define INITIAL - 10000 //棋盘的初始值

int a[QUEEN]; //一维数组表示棋盘

void init() //对棋盘进行初始化
{
  int * p;
  for (p = a; p < a + QUEEN; ++p) {
    * p = INITIAL;
  }
}

int valid(int row, int col) //判断第row行第col列是否可以放置皇后
{
  int i;
  for (i = 0; i < QUEEN; ++i) //对棋盘进行扫描
  {
    if (a[i] == col || abs(i - row) == abs(a[i] - col)) //判断列冲突与斜线上的冲突
      return 0;
  }
  return 1;
}

void print() //打印输出N皇后的一组解
{
  int i, j;
  for (i = 0; i < QUEEN; ++i) {
    for (j = 0; j < QUEEN; ++j) {
      if (a[i] != j) //a[i]为初始值
        printf("%c ", '.');
      else //a[i]表示在第i行的第a[i]列可以放置皇后
        printf("%c ", '#');
    }
    printf("\n");
  }
  for (i = 0; i < QUEEN; ++i)
    printf("%d ", a[i]);
  printf("\n");
  printf("--------------------------------\n");
}

void queen() //N皇后程序
{
  int n = 0;
  int i = 0, j = 0;
  while (i < QUEEN) {
    while (j < QUEEN) //对i行的每一列进行探测，看是否可以放置皇后
    {
      if (valid(i, j)) //该位置可以放置皇后
      {
        a[i] = j; //第i行放置皇后
        j = 0; //第i行放置皇后以后，需要继续探测下一行的皇后位置，所以此处将j清零，从下一行的第0列开始逐列探测
        break;
      } else {
        ++j; //继续探测下一列
      }
    }
    if (a[i] == INITIAL) //第i行没有找到可以放置皇后的位置
    {
      if (i == 0) //回溯到第一行，仍然无法找到可以放置皇后的位置，则说明已经找到所有的解，程序终止
        break;
      else //没有找到可以放置皇后的列，此时就应该回溯
      {
        --i;
        j = a[i] + 1; //把上一行皇后的位置往后移一列
        a[i] = INITIAL; //把上一行皇后的位置清除，重新探测
        continue;
      }
    }
    if (i == QUEEN - 1) //最后一行找到了一个皇后位置，说明找到一个结果，打印出来
    {
      printf("answer %d : \n", ++n);
      print();
      //不能在此处结束程序，因为我们要找的是N皇后问题的所有解，此时应该清除该行的皇后，从当前放置皇后列数的下一列继续探测。
      //_sleep(600);
      j = a[i] + 1; //从最后一行放置皇后列数的下一列继续探测
      a[i] = INITIAL; //清除最后一行的皇后位置
      continue;
    }
    ++i; //继续探测下一行的皇后位置
  }
}

int main(void) {
  init();
  queen();
  system("pause");
  return 0;
}
