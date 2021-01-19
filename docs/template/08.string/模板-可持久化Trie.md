# 可持久化Trie

[洛谷-P4735-最大异或和](https://www.luogu.com.cn/problem/P4735)

## 实现

```cpp
#pragma GCC optimize(2)
#include <iostream>
using namespace std;
const int N = 600010;
int a[N], xor_sum[N];

int rt[N];
int idx, trie[N << 5][2];// 非结构体写法
int cnt[N << 5];
void insert(int cur, int prev, int val)
{
    for(int i = 28; i >= 0; -- i)
    {
        cnt[cur] = cnt[prev] + 1;
        if((val >> i) & 1)// 1
        {
            if(trie[cur][1] == 0) trie[cur][1] = ++ idx;
            trie[cur][0] = trie[prev][0];
            cur = trie[cur][1], prev = trie[prev][1];
        }
        else
        {
            if(trie[cur][0] == 0) trie[cur][0] = ++ idx;
            trie[cur][1] = trie[prev][1];
            cur = trie[cur][0], prev = trie[prev][0];
        }
    }
    cnt[cur] = cnt[prev] + 1;
}
int query(int x, int y, int val)
{
    int res = 0;
    for(int i = 28; i >= 0; -- i)
    {
        int k = (val >> i) & 1;
        if(cnt[trie[x][!k]] - cnt[trie[y][!k]] > 0)
        {
            res += (1 << i);
            x = trie[x][!k], y = trie[y][!k];
        }
        else
            x = trie[x][k], y = trie[y][k];
    }
    return res;
}
int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; ++ i) scanf("%d", &a[i]);
    for(int i = 1; i <= n; ++ i) xor_sum[i] = xor_sum[i - 1] ^ a[i];
    for(int i = 1; i <= n; ++ i)
    {
        rt[i] = ++ idx;
        insert(rt[i], rt[i - 1], xor_sum[i]);
    }
    while(m --)
    {
        char opt[5];
        scanf("%s", opt);
        if(opt[0] == 'A')
        {
            scanf("%d", &a[++ n]);
            xor_sum[n] = xor_sum[n - 1] ^ a[n];
            rt[n] = ++ idx;
            insert(rt[n], rt[n - 1], xor_sum[n]);
        }
        else
        {
            int l, r, x;
            scanf("%d%d%d", &l, &r, &x);
            -- l, -- r;
            if(l == r && r == 0)
                printf("%d\n", xor_sum[n] ^ x);
            else
                printf("%d\n", query(rt[r], rt[max(l - 1, 0)], xor_sum[n] ^ x));
        }
    }
    return 0;
}
```

