# H数

[洛谷-P1748-H数](https://www.luogu.com.cn/problem/P1748)

## 分析

![](/img/0019.bmp)

## 实现

```cpp
#include <iostream>
using namespace std;
typedef long long LL;
int n, h[10010];
int main()
{
    int a = 1, b = 1, c = 1, d = 1;
    h[1] = 1;
    for(int i = 2; i <= 10000; ++ i)
    {
        h[i] = min(min(h[a] * 2, h[b] * 3), min(h[c] * 5, h[d] * 7));
        if(h[i] == h[a] * 2) ++ a;
        if(h[i] == h[b] * 3) ++ b;
        if(h[i] == h[c] * 5) ++ c;
        if(h[i] == h[d] * 7) ++ d;
    }
    while(cin >> n) cout << h[n] << endl;
    return 0;
}
```

