# 拆分Nim游戏

AcWing-894-拆分-Nim游戏

给定`n`堆石子，两位玩家轮流操作，每次操作可以取走其中的一堆石子，然后放入两堆**规模更小的**石子（新堆规模可以为0，且两个新堆石子总数可以大于取走的那堆石子数），最后无法进行操作的人视为失败。

问如果两人都采用最优策略，先手是否必胜。

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <unordered_set>
using namespace std;
const int N = 110;
int f[N];
int sg(int x)
{
    if(f[x] != -1) return f[x];

    unordered_set<int> s;
    for(int i = 0; i < x; ++ i)
        for(int j = 0; j < i; ++ j)
            s.insert(sg(i) ^ sg(j));

    // mex
    for(int i = 0; ; ++ i)
        if(s.count(i) == 0)
            return f[x] = i;
}
int main()
{
    memset(f, -1, sizeof(f));
    int n;
    scanf("%d", &n);
    int res = 0;
    for(int i = 1, x; i <= n; ++ i)
    {
        scanf("%d", &x);
        res ^= sg(x);
    }
    printf(res ? "Yes" : "No");
    return 0;
}
```

   