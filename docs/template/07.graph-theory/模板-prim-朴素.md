# prim（朴素）

[洛谷-P3366-【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

## 分析

`Prim`算法的时间复杂度为$O(n^2)$,可以用二叉堆优化到$O(mlogn)$.但用二叉堆优化不如直接使用`Kruskal`算法更加方便.因此`Prim`主要用于稠密图,尤其是完全图的最小生成树的求解.

`Prim`算法总是维护最小生成树的一部分.最初,`Prim`算法仅确定`1`号顶点属于最小生成树.

在任意时刻,设已经确定属于最小生成树的顶点集合为`T`,剩余顶点集合为`S`.

`Prim`算法找到$\min _{x \in S, y \in T}\{z\}$,即两个端点分别属于集合`S, T`的权值最小的边,然后把点`x`从集合`S`中删除,加入到集合`T`,并把`z`累加到答案中.

具体说来,可以维护数组`d`:

- 若$x \in S$,则`d[x]`表示顶点`x`与集合`T`中的顶点之间权值最小的边的权值
- 若$x \in T$,则`d[x]`就等于`x`被加入`T`时选出的最小边的权值

可以类比`dijkstra`算法,用一个数组标记顶点是否属于`T`.每次从未标记的顶点中选出`d`值最小的,把它标记(新加入`T`),同时扫描所有出边,更新另一个端点的`d`值.最后,最小生成树的权值总和就是$\Sigma _{x=2}^nd[x]$.

## 实现

```cpp
#include <iostream>
#include <cstring>
#define inf 0x3f3f3f3f
using namespace std;
const int N = 5010, M = 200010;
struct edge
{
    int next;
    int to;
    int w;
};
edge e[2 * M];
int idx, head[N];
int n, m;
bool mark[N];
int dis[N];// 顶点到当前最小生成树的距离
void add_edge(int u, int v, int w)
{
    e[idx].w = w;
    e[idx].to = v;
    e[idx].next = head[u];
    head[u] = idx ++;
}
int prim()
{
    memset(dis, 0x3f, sizeof(dis));
    dis[1] = 0;
    for(int i = 1; i <= n; ++ i)
    {
        int cur = -1;
        for(int j = 1; j <= n; ++ j)
            if(mark[j] == false && (cur == -1 || dis[cur] > dis[j]))
                cur = j;
        mark[cur] = true;
        for(int i = head[cur]; i != -1; i = e[i].next)
        {
            int to = e[i].to;
            int w = e[i].w;
            if(mark[to] == true) continue;
            dis[to] = min(dis[to], w);
        }
    }
    for(int i = 1; i <= n; ++ i)
        if(dis[i] == inf)
            return -1;
    int res = 0;
    for(int i = 1; i <= n; ++ i)
        res += dis[i];
    return res;
}
int main()
{
    memset(head, -1, sizeof(head));
    scanf("%d%d", &n, &m);
    for(int i = 1, u, v, w; i <= m; ++ i)
    {
        scanf("%d%d%d", &u, &v, &w);
        add_edge(u, v, w);
        add_edge(v, u, w);
    }
    int res = prim();
    if(res == -1)
        printf("orz");
    else
        printf("%d", res);
    return 0;
}
```
