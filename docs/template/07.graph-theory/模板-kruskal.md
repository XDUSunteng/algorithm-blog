# kruskal

[洛谷-P3366-【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

## 分析

定理:

任意一棵最小生成树一定包含无向图中权值最小的边.

证明:

反证法.假设无向图`G = (V, E)`存在一棵最小生成树不包含权值最小的边.设`e = (x, y ,z)`是无向图中权值最小的边.把`e`添加到树中,**`e`会和树上从`x`到`y`的路径一起构成一个环**,并且环上其他边的权值都比`z`大.因此,用`e`代替环上的其他任意一条边,会形成一棵权值和更小的生成树,**与假设矛盾**.故假设不成立,原命题成立.

推论:

给定一张无向图`G = (V, E), n = |V|, m = |E|`.从`E`中选出`k < n - 1`条边构成`G`的一个生成森林.若再从剩余的`m - k`条边中选`n - 1 - k`条添加到生成森林中,使其成为`G`的生成树,并且选出的边的权值和最小,则**该生成树一定包含这`m - k`条边中连接生成森林的两个不连通结点的权值最小的边**.

思路：

首先按照边的权值从小到大排序,每次从剩余的边中选择权值较小且边的两个顶点不在同一个集合内的边(就是不会产生回路的边)加入到生成树中,直到加入了`n - 1`条边为止.

`Kruskal`算法总是维护无向图的最小生成森林.

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;
const int N = 5010, M = 200010;
struct edge
{
    int u, v, w;
    bool operator <(const edge &o) const { return w < o.w; }
};
edge e[M];
int n, m;
int f[N];
int find(int x)
{
    if(f[x] != x) f[x] = find(f[x]);
    return f[x];
}
void merge(int x, int y) { f[find(x)] = find(y); }
bool query(int x, int y) { return find(x) == find(y); }
int kruskal()
{
    sort(e + 1, e + m + 1);
    for(int i = 1; i <= n; ++ i) f[i] = i;
    int res = 0, cnt = 0;
    for(int i = 1; i <= m; ++ i)
    {
        int u = e[i].u, v = e[i].v, w = e[i].w;
        if(query(u, v) == false)
        {
            merge(u, v);
            ++ cnt;
            res += w;
        }
    }
    return (cnt < n - 1 ? -1 : res);
}
int main()
{
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= m; ++ i)
        scanf("%d%d%d", &e[i].u, &e[i].v, &e[i].w);
    int res = kruskal();
    if(res == -1)
        printf("orz");
    else
        printf("%d", res);
    return 0;
}
```
