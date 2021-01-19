# 数的划分

[洛谷-1025-数的划分](https://www.luogu.com.cn/problem/P1025)

## 方法一

### 分析

$dp(n,m)=dp(n - 1,m - 1)+dp(n-m,m)$.分类加法

分类标准:**是否**有一份物品的数量为**1**.

从是否二字可以看出,此分类标准是**不重不漏**的,关键就是写好方程了.

- 有`1`,它自成一份,问题转化为`n - 1`个物品分非空的`m - 1`份,
- 无`1`,如何保证这一点.先把m个物品放入每一份,再自由地划分.问题转化为`n - m`个物品分非空的`m`份



分类标准:

- 每份非空:讨论是否存在大小为1的份
- 每份可以为空:讨论是否存在大小为0(空)的份

### 实现

```cpp
int dp(int n,int m)// dp[n][m]表示将n个物品分成非空的m份的方法数
{
    if(m > n)
        return 0;
    else if(m == 1)
        return 1;
    else if(m == 0)
        return 0;
    else
        return dp(n - 1,m - 1) + dp(n - m,m);
}
```

## 方法二

### 分析

答案的重复来自于其无序性,如果保证每份的大小是递增的,就可以去掉冗余的答案.

### 实现

```cpp
int cnt;// 方案数
void dfs(int n,int m,int last)// n个物品分成非空的m份,上一份的大小为last
{
    if(n < m || n < last)// 可行性剪枝,非空 + 自增
        return;
    if(m == 1)// 递归边界
    {
        cnt++;
        return;
    }
    for(int i = last; i <= n; ++i)// 每份的大小非严格单调递增,防止答案重复
        dfs(n - i,m - 1,i);// 当前份的大小为i
}
int main()
{
    int n,k;
    cin >> n >> k;
    dfs(n,k,1);// 从1开始非严格单调递增
    cout << cnt << endl;
    return 0;
}
```

