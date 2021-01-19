# AC自动机

[洛谷-P3796-【模板】AC自动机（加强版）](https://www.luogu.com.cn/problem/P3796)

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <queue>
using namespace std;
const int N = 150 * 70 + 10;
char s[1000010], t[150 + 10][70 + 10];

int tot, trie[N][26], indexOfString[N];// indexOfString[i]表示结点trie[i]对应的字符串在数组t中的下标

int fail[N], val[N], cnt[160];
void insert(char str[], int idx)
{
    int ptr = 0;
    for(int i = 1; str[i] != '\0'; ++ i)
    {
        int ch = str[i] - 'a';
        if(trie[ptr][ch] == 0) trie[ptr][ch] = ++ tot;
        ptr = trie[ptr][ch];
    }
    indexOfString[ptr] = idx;
}
void AC_build()
{
    queue<int> q;
    for(int i = 0; i < 26; ++ i)
        if(trie[0][i] != 0)
            q.push(trie[0][i]);
    while(!q.empty())
    {
        int cur = q.front();
        q.pop();
        for(int i = 0; i < 26; ++ i)
        {
            if(trie[cur][i] != 0)
            {
                fail[trie[cur][i]] = trie[fail[cur]][i];
                q.push(trie[cur][i]);
            }
            else
                trie[cur][i] = trie[fail[cur]][i];
        }
    }
}
int AC_query(char s[])
{
    int ptr = 0, res = 0;
    for(int i = 1; s[i] != '\0'; ++ i)
    {
        int ch = s[i] - 'a';
        ptr = trie[ptr][ch];
        for(int j = ptr; j != 0; j = fail[j]) ++ val[j];
    }
    for(int i = 0; i <= tot; ++ i)
    {
        if(indexOfString[i] != 0)
        {
            res = max(res, val[i]);
            cnt[indexOfString[i]] = val[i];
        }
    }
    return res;
}
void clean()
{
    tot = 0;
    memset(trie, 0, sizeof(trie));
    memset(indexOfString, 0, sizeof(indexOfString));
    memset(fail, 0, sizeof(fail));
    memset(val, 0, sizeof(val));
    memset(cnt, 0, sizeof(cnt));
}
int main()
{
    int n;
    while(scanf("%d", &n) && n)
    {
        clean();
        for(int i = 1; i <= n; ++ i)
        {
            scanf("%s", t[i] + 1);
            insert(t[i], i);
        }
        AC_build();
        scanf("%s", s + 1);
        int res = AC_query(s);
        printf("%d\n", res);
        for(int i = 1; i <= n; ++ i)
            if(cnt[i] == res)
                printf("%s\n", t[i] + 1);
    }
    return 0;
}
```



