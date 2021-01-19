# spfa

[洛谷-P3371-【模板】单源最短路径（弱化版）](https://www.luogu.com.cn/problem/P3371)

## 实现

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#define inf 0x3f3f3f3f
using namespace std;
const int N = 10010, M = 500010;
struct edge
{
    int next;
    int to;
    int w;
};
edge e[M];// 无向图: 2 * M
int idx, head[N];
int dis[N];
bool mark[N];
void add_edge(int u, int v, int w)
{
    e[idx].w = w;
    e[idx].to = v;
    e[idx].next = head[u];
    head[u] = idx ++;
}
void spfa(int s)
{
    memset(dis, 0x3f, sizeof(dis));
    dis[s] = 0;
    queue<int> q;
    q.push(s);
    mark[s] = true;
    while(!q.empty())
    {
        int cur = q.front();
        q.pop();
        mark[cur] = false;
        for(int i = head[cur]; i != -1; i = e[i].next)
        {
            int to = e[i].to;
            int w = e[i].w;
            if(dis[to] > dis[cur] + w)
            {
                dis[to] = dis[cur] + w;
                if(mark[to] == false)
                {
                    q.push(to);
                    mark[to] = true;
                }
            }
        }
    }
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, m, s;
    scanf("%d%d%d", &n, &m, &s);
    for(int i = 1, u, v, w; i <= m; ++ i)
    {
        scanf("%d%d%d", &u, &v, &w);
        add_edge(u, v, w);
    }
    spfa(s);
    for(int i = 1; i <= n; ++ i)
        printf("%d ", dis[i] == inf ? ((1LL << 31) - 1) : dis[i]);
    return 0;
}
```

