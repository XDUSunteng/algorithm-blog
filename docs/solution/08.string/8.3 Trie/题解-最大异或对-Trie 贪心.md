# 最大异或对

[AcWing-143-最大异或对](https://www.acwing.com/problem/content/145/)

## 实现

```cpp
#include <iostream>
using namespace std;
const int N = 100010;
int n, a[N];
int idx, trie[N * 32][2];
void insert(int x)
{
    int ptr = 0;
    for(int i = 30; i >= 0; -- i)
    {
        int k = (x >> i) & 1;
        if(trie[ptr][k] == 0) trie[ptr][k] = ++ idx;
        ptr = trie[ptr][k];
    }
}
int solve(int x)
{
    int ptr = 0, res = 0;
    for(int i = 30; i >= 0; -- i)
    {
        int k = (x >> i) & 1;
        if(trie[ptr][!k] != 0)
        {
            res = res | (1 << i);
            ptr = trie[ptr][!k];
        }
        else
            ptr = trie[ptr][k];
    }
    return res;
}
int main()
{
    scanf("%d", &n);
    int res = 0;
    for(int i = 1; i <= n; ++ i)
    {
        scanf("%d", &a[i]);
        insert(a[i]);
        res = max(res, solve(a[i]));
    }
    printf("%d\n", res);
    return 0;
}
```

