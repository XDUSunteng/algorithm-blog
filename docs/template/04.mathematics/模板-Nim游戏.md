# Nim游戏

[AcWing-891-Nim游戏](https://www.acwing.com/solution/AcWing/content/5879/)

## 实现

```cpp
#include <iostream>
using namespace std;
const int N = 100010;
int a[N];
int main()
{
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n; ++ i) scanf("%d", &a[i]);

    int res = 0;
    for(int i = 1; i <= n; ++ i) res = res ^ a[i];

    printf("%s\n", res == 0 ? "No" : "Yes");
    return 0;
}
```

