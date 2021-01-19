# KMP

[洛谷-P3375-【模板】KMP字符串匹配](https://www.luogu.com.cn/problem/P3375)

## 实现

```cpp
#include <iostream>
#include <cstring>
#define next NeXt
using namespace std;
const int N = 1000010;
char s[N], t[N];// 文本串, 模式串
int n, m;
int next[N];
void calcNext()
{
    next[1] = 0;
    int j = 0;
    for(int i = 2; i <= m; ++ i)
    {
        while(j > 0 && t[i] != t[j + 1]) j = next[j];
        if(t[i] == t[j + 1]) ++ j;
        next[i] = j;
    }
}
void KMP()
{
    calcNext();
    int j = 0;
    for(int i = 1; i <= n; ++ i)
    {
        while(j > 0 && s[i] != t[j + 1]) j = next[j];
        if(s[i] == t[j + 1]) ++ j;
        if(j == m) printf("%d\n", i - m + 1);
    }
}
int main()
{
    scanf("%s%s", s + 1, t + 1);
    n = strlen(s + 1), m = strlen(t + 1);
    KMP();
    for(int i = 1; i <= m; ++ i) printf("%d ", next[i]);
    return 0;
}
```

