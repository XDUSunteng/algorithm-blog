# 求欧拉函数第n项（线性筛）

[AcWing-847-筛法求欧拉函数](https://www.acwing.com/solution/AcWing/content/3952/)

## 实现

```cpp
#include <iostream>
using namespace std;
typedef long long LL;
const int N = 1000010;
int idx, prime[N];
bool mark[N];
int phi[N];
void getPhis(int n)
{
    phi[1] = 1;
    for(int i = 2; i <= n; ++ i)
    {
        if(mark[i] == false)
        {
            prime[++ idx] = i;
            phi[i] = i - 1;
        }
        for(int j = 1; prime[j] <= n / i; ++ j)
        {
            mark[prime[j] * i] = true;
            if(i % prime[j] == 0)
            {
                phi[prime[j] * i] = phi[i] * prime[j];
                break;
            }
            phi[prime[j] * i] = phi[i] * (prime[j] - 1);
        }
    }
}
int main()
{
    int n;
    scanf("%d", &n);

    getPhis(n);
    
    LL res = 0;
    for(int i = 1; i <= n; ++ i) res += phi[i];
    printf("%lld\n", res);
    return 0;
}
```

