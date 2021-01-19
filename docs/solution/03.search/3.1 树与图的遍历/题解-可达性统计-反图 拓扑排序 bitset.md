# 可达性统计

[AcWing-164-可达性统计](https://www.acwing.com/problem/content/166/)

## 分析

建反图可以把顶点间的多对一转化为一对多.

对于某拓扑序大的顶点,有不少的顶点可以到达它.

建反图后,我们在反图上拓扑排序,可以更加方便地求出每个顶点的答案.

最初的想法是通过递推计数,后来通过样例发现这样会造成重复地计数.

![](/img/0031.bmp)

如图,`C`直接地对`A`产生了一次贡献,间接地对`A`产生了一次贡献.

联系状压DP,我们可以利用`bitset`标记顶点是否可达.

## 实现

```cpp
#include <iostream>
#include <bitset>
#include <queue>
#include <cstring>
using namespace std;
const int N = 30010, M = 30010;
struct edge
{
    int to;
    int next;
};
edge e[M];
int idx, head[N];

int n, m;
int in_deg[N];
bitset<N> mark[N];
void add_edge(int u, int v)
{
    e[idx].to = v;
    e[idx].next = head[u];
    head[u] = idx ++;
}
void topoSort()
{
    queue<int> q;
    for(int i = 1; i <= n; ++ i)
        if(in_deg[i] == 0)
            q.push(i);
    while(!q.empty())
    {
        int cur = q.front();
        q.pop();
        for(int i = head[cur]; i != -1; i = e[i].next)
        {
            int to = e[i].to;
            mark[to] |= mark[cur];
            -- in_deg[to];
            if(in_deg[to] == 0) q.push(to);
        }
    }
}
int main()
{
    memset(head, -1, sizeof(head));
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; ++ i) mark[i][i] = 1;
    for(int i = 1, u, v; i <= m; ++ i)
    {
        scanf("%d%d", &u, &v);
        add_edge(v, u);// 反图
        ++ in_deg[u];
    }
    topoSort();
    for(int i = 1; i <= n; ++ i) printf("%d\n", mark[i].count());
    return 0;
}
```

