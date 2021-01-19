# 集合Nim游戏

[AcWing-893-集合-Nim游戏](https://www.acwing.com/solution/AcWing/content/3929/)

## 分析

样例:

```
2
2 5
3
2 4 7
```

有向图游戏`7`:

![0034](/img/0034.bmp)

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <unordered_set>
using namespace std;
const int N = 110, M = 10010;
int n, m;
int s[N], f[M];
int sg(int x)// 记忆化搜索
{
    if(f[x] != -1) return f[x];
    unordered_set<int> us;
    for(int i = 1; i <= m; ++ i)
        if(x >= s[i])
            us.insert(sg(x - s[i]));
    for(int i = 0; ; ++ i)// mex
        if(us.find(i) == us.end())
            return f[x] = i;
}
int main()
{
    memset(f, -1, sizeof(f));
    scanf("%d", &m);
    for(int i = 1; i <= m; ++ i) scanf("%d", &s[i]);
    scanf("%d", &n);
    int res = 0;
    for(int i = 1, x; i <= n; ++ i)
    {
        scanf("%d", &x);
        res ^= sg(x);
    }
    printf("%s\n", res == 0 ? "No" : "Yes");
    return 0;
}
```

