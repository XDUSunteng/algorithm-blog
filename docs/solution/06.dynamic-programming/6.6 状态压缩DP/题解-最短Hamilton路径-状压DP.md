# 最短Hamilton路径

[AcWing-91-最短Hamilton路径](https://www.acwing.com/problem/content/93/)

## 分析

![](/img/0044.bmp)

## 实现

```cpp
#include <iostream>
#include <cstring>
using namespace std;
const int N = 20;
int n;
int dis[N][N];
int f[1 << N][N];
int main()
{
    cin >> n;
    for(int i = 0; i < n; ++ i)
        for(int j = 0; j < n; ++ j)
            cin >> dis[i][j];
    memset(f, 0x3f, sizeof(f));
    f[1][0] = 0;
    for(int state = 1; state < (1 << n); ++ state)
        for(int i = 0; i < n; ++ i)
            if(state & (1 << i))
                for(int j = 0; j < n; ++ j)
                    if(state & (1 << j))
                        f[state][j] = min(f[state][j], f[state ^ (1 << j)][i] + dis[i][j]);
    cout << f[(1 << n) - 1][n - 1] << endl;
    return 0;
}
```

