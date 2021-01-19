# 区间DP

[AcWing-282-石子合并](https://www.acwing.com/problem/content/284/)

## 分析

![](/img/0043.bmp)

## 实现

```cpp
#include <iostream>
#define inf 0x3f3f3f3f
using namespace std;
const int N = 310;
int n;
int a[N], s[N];
int f[N][N];
int main()
{
    cin >> n;
    for(int i = 1; i <= n; ++ i) cin >> a[i];
    for(int i = 1; i <= n; ++ i) s[i] = s[i - 1] + a[i];
    for(int length = 2; length <= n; ++ length)
    {
        for(int i = 1; i + length - 1 <= n; ++ i)
        {
            int l = i, r = i + length - 1;
            f[l][r] = inf;
            for(int k = l; k <= r - 1; ++ k)
                f[l][r] = min(f[l][r], f[l][k] + f[k + 1][r] + s[r] - s[l - 1]);
        }
    }
    cout << f[1][n] << endl;
    return 0;
}
```

