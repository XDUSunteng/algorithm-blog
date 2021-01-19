# dijkstra（堆优化）

[洛谷-P4779-【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)

## 实现

```cpp
#include <iostream>
#include <queue>
#include <cstring>
using namespace std;
const int N = 100010, M = 200010;
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
struct element
{
    int idx;
    int dis;
    bool operator <(const element &o) const { return dis > o.dis; }
};
void dijkstra(int s)// 堆优化
{
    memset(dis, 0x3f, sizeof(dis));
    dis[s] = 0;
    priority_queue<element> pq;
    pq.push({s, dis[s]});
    while(!pq.empty())
    {
        int cur = pq.top().idx;
        pq.pop();
        if(mark[cur] == true) continue;
        mark[cur] = true;
        for(int i = head[cur]; i != -1; i = e[i].next)
        {
            int to = e[i].to;
            int w = e[i].w;
            if(dis[to] > dis[cur] + w)
            {
                dis[to] = dis[cur] + w;
                pq.push({to, dis[to]});
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
    dijkstra(s);
    for(int i = 1; i <= n; ++ i)
        printf("%d ", dis[i]);
    return 0;
}
```

