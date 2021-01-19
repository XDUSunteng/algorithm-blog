# 台阶Nim游戏

[AcWing-892-台阶-Nim游戏](https://www.acwing.com/solution/AcWing/content/8393/)

## 实现

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n;
    scanf("%d", &n);
    int res = 0;
    for(int i = 1, x; i <= n; ++ i)
    {
        scanf("%d", &x);
        if(i % 2 == 1) res ^= x;
    }
    printf(res ? "Yes" : "No");
    return 0;
}
```

