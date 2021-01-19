# 雪花雪花雪花

[AcWing-137-雪花雪花雪花](https://www.acwing.com/problem/content/description/139/)

## 实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
const int N = 100010, M = 100003;
struct snowflake
{
    vector<int> v;
    bool operator ==(snowflake o)
    {
        bool flag;
        for(int i = 0; i < 6; ++ i)
        {
            flag = true;
            for(int j = 0; j < 6; ++ j)
            {
                if(v[(i + j) % 6] != o.v[j])
                {
                    flag = false;
                    break;
                }
            }
            if(flag == true) return true;
        }
        reverse(o.v.begin(), o.v.end());
        for(int i = 0; i < 6; ++ i)
        {
            flag = true;
            for(int j = 0; j < 6; ++ j)
            {
                if(v[(i + j) % 6] != o.v[j])
                {
                    flag = false;
                    break;
                }
            }
            if(flag == true) return true;
        }
        return false;
    }
};
snowflake a[N];
vector<snowflake> h[M];
int snowflakeHashValue(snowflake x)
{
    int res = 1;
    for(int i = 0; i < 6; ++ i) res *= x.v[i];
    for(int i = 0; i < 6; ++ i) res += x.v[i];
    return (res % M + M) % M;
}
void insert(snowflake x) { h[snowflakeHashValue(x)].push_back(x); }
bool find(snowflake x)
{
    int idx = snowflakeHashValue(x);
    for(int i = 0; i < h[idx].size(); ++ i)
        if(h[idx][i] == x)
            return true;
    return false;
}
int main()
{
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n; ++ i)
    {
        for(int j = 1, val; j <= 6; ++ j)
        {
            scanf("%d", &val);
            a[i].v.push_back(val);
        }
    }
    for(int i = 1; i <= n; ++ i)
    {
        if(h[snowflakeHashValue(a[i])].size() > 0 && find(a[i]) == true)
        {
            printf("Twin snowflakes found.\n");
            return 0;
        }
        else
            insert(a[i]);
    }
    printf("No two snowflakes are alike.\n");
    return 0;
}
```

