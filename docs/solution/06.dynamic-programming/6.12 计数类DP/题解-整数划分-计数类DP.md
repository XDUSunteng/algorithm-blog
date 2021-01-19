# 整数划分

[AcWing-900-整数划分](https://www.acwing.com/problem/content/description/902/)

## 方法一

### 实现

```cpp
#include <iostream>
using namespace std;
const int N = 1010, M = 1e9 + 7;
int n;
int f[N];
int main()
{
    cin >> n;
    f[0] = 1;
    for(int i = 1; i <= n; ++ i)
        for(int j = i; j <= n; ++ j)
            f[j] = (f[j] + f[j - i]) % M;
    cout << f[n] << endl;
    return 0;
}
```

## 方法二

### 实现

```cpp
#include <iostream>
using namespace std;
const int N = 1010, M = 1e9 + 7;
int n;
int f[N][N];
int main()
{
    cin >> n;
    f[0][0] = 1;
    for(int i = 1; i <= n; ++ i)
        for(int j = 1; j <= i; ++ j)
            f[i][j] = (f[i - 1][j - 1] + f[i - j][j]) % M;
    int res = 0;
    for(int i = 1; i <= n; ++ i) res = (res + f[n][i]) % M;
    cout << res;
    return 0;
}
```

