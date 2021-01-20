# 题目

[链接](https://vjudge.net/problem/OpenJ_Bailian-2995)

# 实现

```cpp
#include <iostream>
using namespace std;
const int N = 1010;
int n, a[N];
int f[N], g[N];
int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; ++ i) scanf("%d", &a[i]);

    for(int i = 1; i <= n; ++ i)
    {
        f[i] = 1;
        for(int j = 1; j < i; ++ j)
            if(a[j] < a[i])
                f[i] = max(f[i], f[j] + 1);
    }

    for(int i = n; i >= 1; -- i)
    {
        g[i] = 1;
        for(int j = n; j > i; -- j)
            if(a[i] > a[j])
                g[i] = max(g[i], g[j] + 1);
    }

    int res = 0;
    for(int i = 1; i <= n; ++ i) res = max(res, f[i] + g[i] - 1);
    printf("%d\n", res);
    return 0;
}
```

