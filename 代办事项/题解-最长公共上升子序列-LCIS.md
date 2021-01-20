# 题目

AcWing-272-最长公共上升子序列

[链接](https://www.acwing.com/problem/content/274/)

# 实现

```cpp
// 优化前，O(n^3)
#include <iostream>
using namespace std;
const int N = 3010;
int n, a[N], b[N];
int f[N][N];

int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; ++ i) scanf("%d", &a[i]);
    for(int i = 1; i <= n; ++ i) scanf("%d", &b[i]);

    for(int i = 1; i <= n; ++ i)
    {
        for(int j = 1; j <= n; ++ j)
        {
            f[i][j] = f[i - 1][j];
            if(a[i] == b[j])
            {
                f[i][j] = max(f[i][j], 1);
                for(int k = 1; k < j; ++ k)
                    if(b[k] < b[j])
                        f[i][j] = max(f[i][j], f[i][k] + 1);
            }
        }
    }
    int res = 0;
    for(int i = 1; i <= n; ++ i) res = max(res, f[n][i]);
    printf("%d\n", res);
    return 0;
}
// 优化后，O(n^2)
#include <iostream>
using namespace std;
const int N = 3010;
int n, a[N], b[N];
int f[N][N];

int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; ++ i) scanf("%d", &a[i]);
    for(int i = 1; i <= n; ++ i) scanf("%d", &b[i]);

    for(int i = 1; i <= n; ++ i)
    {
        int max_val = 1;
        for(int j = 1; j <= n; ++ j)
        {
            f[i][j] = f[i - 1][j];
            if(a[i] == b[j]) f[i][j] = max(f[i][j], max_val);
            if(b[j] < a[i]) max_val = max(max_val, f[i][j] + 1);
        }
    }
    int res = 0;
    for(int i = 1; i <= n; ++ i) res = max(res, f[n][i]);
    printf("%d\n", res);
    return 0;
}
```

