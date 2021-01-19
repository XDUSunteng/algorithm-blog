# Trie

[AcWing-142-前缀统计](https://www.acwing.com/problem/content/144/)

## 实现

```cpp
#include <iostream>
using namespace std;
const int N = 100010;
int trie[N][26], cnt[N], idx;// 0 号结点为根节点,表示空字符串
void insert(const string &str)
{
    int ptr = 0;
    for(int i = 0; i < str.size(); ++ i)
    {
        int ch = str[i] - 'a';
        if(trie[ptr][ch] == 0) trie[ptr][ch] = ++ idx;
        ptr = trie[ptr][ch];
    }
    cnt[ptr] ++;
}
int query(const string &str)
{
    int res = 0;
    int ptr = 0;
    for(int i = 0; i < str.size(); ++ i)
    {
        int ch = str[i] - 'a';
        if(trie[ptr][ch] == 0) break;
        ptr = trie[ptr][ch];
        res += cnt[ptr];
    }
    return res;
}
int main()
{
    int n, m;
    cin >> n >> m;
    for(int i = 1; i <= n; ++ i)
    {
        string str;
        cin >> str;
        insert(str);
    }
    while(m --)
    {
        string str;
        cin >> str;
        cout << query(str) << endl;
    }
    return 0;
}
```

