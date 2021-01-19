# Maximize The Beautiful Value

[牛客竞赛-牛客算法周周练1-A-Maximize The Beautiful Value](https://ac.nowcoder.com/acm/contest/5086/A)

## 分析

移动前,$F(n) = \Sigma _{i = 1}^n i \times a_i$.

设移动`k`个单位,把$a_i$移动到$a_j(j=i-k)$.

在此过程中,

1. $a_{i-k},a_{i-k+1},...,a_{i-1}$向右移动了`1`个单位,增加量$\Delta_1=\Sigma _{x = i-k}^{i-1}a_x$.
2. $a_i$向左移动了`k`个单位,减少量$\Delta_2 =k\times a_i$.

$F(n)$的增加量$\Delta_1-\Delta_2 = \Sigma _{x = i-k}^{i-1}a_x-k\times a_i=\Sigma _{x= i-k}^{i-1}(a_x - a_i)$.

因为$a_x - a_i \le 0$,所以`k`越小越好(贪心).

前缀和优化.

## 实现

```cpp
#include <iostream>
using namespace std;
typedef long long LL;
const int N = 100010;
LL a[N], sum[N];
int main()
{
    int T;
    scanf("%d", &T);
    while(T --)
    {
        int n, k;
        scanf("%d%d", &n, &k);
        for(int i = 1; i <= n; ++ i) scanf("%lld", &a[i]);
        for(int i = 1; i <= n; ++ i) sum[i] = sum[i - 1] + a[i];
        LL val = 0;
        for(int i = 1; i <= n; ++ i) val += i * a[i];
        LL delta = -1e15;// 要足够小
        for(int i = k + 1; i <= n; ++ i)
            delta = max(delta, sum[i - 1] - sum[i - k - 1] - k * a[i]);
        printf("%lld\n", val + delta);
    }
    return 0;
}
```

