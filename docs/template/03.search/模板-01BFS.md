# 01BFS

[洛谷-P1346-电车](https://www.luogu.com.cn/problem/P1346)

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <queue>
#define inf 0x3f3f3f3f
using namespace std;

const int N = 110, M = 10010;
struct edge {
    int to, next, w;
};
edge e[M];
int idx, head[N];
int n, a, b, dis[N];
bool mark[N];

void add_edge (int u, int v, int w) {
    e[idx].w = w;
    e[idx].to = v;
    e[idx].next = head[u];
    head[u] = idx ++;
}
int bfs_01 () {
    memset(dis, 0x3f, sizeof(dis));
    dis[a] = 0;
    deque<int> dq;
    dq.push_back(a);
    while (!dq.empty()) {
        int cur = dq.front();
        dq.pop_front();
        if (mark[cur] == true) continue;
        mark[cur] = true;
        for (int i = head[cur]; i != -1; i = e[i].next) {
            int to = e[i].to, w = e[i].w;
            if (dis[to] > dis[cur] + w) {
                dis[to] = dis[cur] + w;
                if (w == 0)
                    dq.push_front(to);
                else
                    dq.push_back(to);
            }
        }
    }
    return dis[b] == inf ? -1 : dis[b];
}

int main () {
    memset(head, -1, sizeof(head));
    scanf("%d%d%d", &n, &a, &b);
    for (int i = 1, k, to; i <= n; ++ i) {
        scanf("%d", &k);
        int w = 0;
        while (k --) {
            scanf("%d", &to);
            add_edge(i, to, w);
            w = 1;
        }
    }
    printf("%d", bfs_01());
    return 0;
}
```

