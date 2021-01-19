# 八数码难题

[洛谷-P1379-八数码难题](https://www.luogu.com.cn/problem/P1379)

## 实现

```cpp
#include <iostream>
#include <queue>
using namespace std;
int dirx[4] = {-1, 1, 0, 0};
int diry[4] = {0, 0, -1, 1};
int f[9] = {40320, 5040, 720, 120, 24, 6, 2, 1, 1};// 倒序阶乘表, 8!, 7!, ..., 0!
struct state
{
    string str;// 棋盘布局
    int x, y;// 0的坐标
    int cost;// 花费的操作数
};
int a[4][4];
bool mark[400010];// 标记状态
int cantor(const string & str)// 康托展开
{
    int res = 0;
    for(int i = 0; i <= 8; ++ i)
    {
        int cnt = 0;// 比str[i]小的数有几个
        for(int j = i + 1; j <= 8; ++ j)
            if(str[j] < str[i])
                ++ cnt;
        res += cnt * f[i];
    }
    return res;
}
string trans(string str, int x, int y, int i)// 状态转移
{
    int idx = 3 * (x - 1) + (y - 1);// 计算出0在字符串中的下标
    if(i == 0) swap(str[idx], str[idx - 3]);// 上
    if(i == 1) swap(str[idx], str[idx + 3]);// 下
    if(i == 2) swap(str[idx], str[idx - 1]);// 左
    if(i == 3) swap(str[idx], str[idx + 1]);// 右
    return str;
}
bool bfs(state beg)
{
    queue<state> q;
    q.push(beg);// 将起始状态入队
    mark[cantor(beg.str)] = true;// 标记
    while(!q.empty())
    {
        state cur = q.front();
        q.pop();
        for(int i = 0; i <= 3; ++ i)
        {
            int nx = cur.x + dirx[i], ny = cur.y + diry[i];
            if(nx < 1 || nx > 3 || ny < 1 || ny > 3) continue;
            string next_str = trans(cur.str, cur.x, cur.y, i);
            int val = cantor(next_str);// 计算哈希值
            if(val == 46685)// 如果到达了终点
            {
                printf("%d\n", cur.cost + 1);
                return true;
            }
            if(mark[val] == false)
            {
                q.push({next_str, nx, ny, cur.cost + 1});
                mark[val] = true;
            }
        }
    }
    return false;
}
int main()
{
    string beg = "";
    int x, y;
    for(int i = 1; i <= 3; ++ i)
    {
        for(int j = 1; j <= 3; ++ j)
        {
            scanf("%1d", &a[i][j]);
            beg += (a[i][j] + '0');
            if(a[i][j] == 0) x = i, y = j;
        }
    }
    if(cantor(beg) == 46685)
    {
        printf("0\n");
        return 0;
    }
    if(bfs({beg, x, y, 0}) == false)
        printf("cannot\n");
    return 0;
}
```

