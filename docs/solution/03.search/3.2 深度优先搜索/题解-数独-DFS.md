# 数独

[AcWing-166-数独](https://www.acwing.com/problem/content/168/)

## 分析

数独问题的搜索框架非常简单,我们关心的"状态"就是数独的每个位置上填了什么数.

在每个状态下,我们找出一个还没有填的位置,检查有哪些合法的数字可以填,这些合法的数字就构成该状态向下继续递归的"分支".

搜索边界分为两种:

- 如果所有位置都被填满,就找到了一个解
- 如果发现某个位置没有能填的合法数字,说明当前分支搜索失败,应该回溯去尝试其他分支

在任意一个状态下,我们只需要找出`1`个位置,考虑该位置上填什么数,不需要枚举所有的位置和可填的数字向下递归(因为其他位置在更深的层次会被搜索到).**新手常犯的错误就是重叠、混淆"层次"和"分支",造成重复遍历若干棵覆盖同一状态空间的搜索树,致使搜索的复杂度大规模增长**.

然而,数独问题的"搜索树"规模仍然很大,直接盲目搜索的效率实在不能接受.试想,如果是人类来玩数独,策略一定是先填上"**已经能够唯一确定的位置**",然后从那些填得比较满、选项比较少的位置实施突破.

所以在搜索算法中,也应该采取类似的策略:在每个状态下,从所有未填的位置里**选择"能填的合法数字"最少的位置**,考虑该位置上填什么数,作为搜索的分支,而不是任意找出`1`个位置.

在搜索程序中,影响时间效率的因数除了搜索树的规模(影响算法的时间复杂度),还有在每个状态上记录、检索、更新的开销(影响程序运行的"常数"时间).

我们可以使用位运算来代替数组执行"对数独各个位置所填数字的记录"以及"可填性的检查与统计".这就是我们所说的程序"常数优化".具体地说:

1. 对于每行、每列、每个九宫格,分别用一个`9`位二进制数(全局整数变量)保存哪些数字还可以填.
2. 对于每个位置,把它所在行、列、九宫格的`3`个二进制数做位与(`&`)运算,就可以得到该位置能填哪些数,用`lowbit`运算就可以把能填的数字取出.
3. 当一个位置填上某个数后,把该位置所在的行、列、九宫格记录的二进制数的对应位改为`0`,即可更新当前状态;回溯时改回`1`即可还原现场.

示意图如下:

![](/img/0032.bmp)

`r[i]`的第$j( 1 \le j \le 9)$位为`0`表示`j`已在第`i`行中存在了,`c, g`同理.

如果`r[i] & c[j] & g[calc(i, j)] == 0`,则说明`(i, j)`处没有能填的合法数字.

如果`r[i] & c[j] & g[calc(i, j)] > 0`,则说明至少存在一个数字没有在第`i`行、第`j`列和第`calc(i, j)`个九宫格中出现.

## 实现

```cpp
#include <iostream>
using namespace std;
char sudoku[10][10];// 9 x 9
int r[10], c[10], g[10];// 优化: 位运算
int popcount[512];// popcount[i]表示i在二进制表示下有几个1
int log_2[512];// log_2[i]表示以i(i为2的整数次幂)为底2的对数
int solve(int x, int y) { return ((x / 3) * 3) + (y / 3); }// (x, y)在第几个九宫格中
int lowbit(int x) { return x & -x; }
void flip(int x, int y, int k)// 取反, xor
{
    r[x] ^= 1 << k;// 横坐标
    c[y] ^= 1 << k;// 纵坐标
    g[solve(x, y)] ^= 1 << k;// 九宫格
}
bool dfs(int cur_cnt)
{
    if(cur_cnt == 0) return true;// 成功
    int temp = 10, x, y;
    // ---------------找此次要填的'.'---------------
    for(int i = 0; i < 9; ++ i)
    {
        for(int j = 0; j < 9; ++ j)
        {
            if(sudoku[i][j] != '.') continue;
            // 对于每一个'.'
            int val = r[i] & c[j] & g[solve(i, j)];
            if(val == 0) return false;// 没有能填的合法数字
            if(popcount[val] < temp)// 选择"能填的合法数字"最少的位置
            {
                // 记录
                temp = popcount[val];
                x = i, y = j;
            }
        }
    }
    for(int val = r[x] & c[y] & g[solve(x, y)]; val > 0; val -= lowbit(val))// 取位, 填每一个能填的数字
    {
        int k = log_2[lowbit(val)];// 2^i -> i
        sudoku[x][y] = k + '1';// 填
        flip(x, y, k);// 标记
        if(dfs(cur_cnt - 1) == true) return true;// 成功
        // -----失败, 回溯时还原现场-----
        flip(x, y, k);
        sudoku[x][y] = '.';
    }
    return false;
}

int main()
{
    // ---------------预处理---------------
    for(int i = 0; i < (1 << 9); ++ i)// 000000000 ~ 111111111
        for(int j = i; j > 0; j -= lowbit(j))
            ++ popcount[i];
    for(int i = 0; i < 9; ++ i) log_2[1 << i] = i;

    string str;
    while(cin >> str && str != "end")
    {
        for(int i = 0; i < str.size(); ++ i) sudoku[i / 9][i % 9] = str[i];// 1d -> 2d
        for(int i = 0; i < 9; ++ i) r[i] = c[i] = g[i] = (1 << 9) - 1;// 重置
        // ---------------'.'的数量---------------
        int cnt = 0;
        for(int i = 0; i < 9; ++ i)
        {
            for(int j = 0; j < 9; ++ j)
            {
                if(sudoku[i][j] == '.')
                    ++ cnt;
                else// 是数字
                    flip(i, j, sudoku[i][j] - '1');// 标记
            }
        }
        dfs(cnt);// 把'.'填上数字
        // ---------------输出---------------
        for(int i = 0; i < 9; ++ i)
            for(int j = 0; j < 9; ++ j)
                printf("%c", sudoku[i][j]);
        printf("\n");
    }
    return 0;
}
```

