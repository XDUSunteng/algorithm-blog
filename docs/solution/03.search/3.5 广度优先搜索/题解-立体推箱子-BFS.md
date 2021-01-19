# 立体推箱子

[AcWing-172-立体推箱子](https://www.acwing.com/problem/content/description/174/)

## 实现

```cpp
#include <iostream>
#include <cstring>
#include <queue>
#define inf 0x3f3f3f3f
#define map MaP
#define end EnD
using namespace std;
const int N = 510;
struct state
{
    int x, y, k;
    int c;
};
int n, m;
char map[N][N];
state beg, end;
bool mark[N][N][3];
bool isValid(int x, int y) { return 1 <= x && x <= n && 1 <= y && y <= m; }
void pre_work()
{
    for(int i = 1; i <= n; ++ i)
        for(int j = 1; j <= m; ++ j)
            if(map[i][j] == 'O')
                end = {i, j, 0, 0}, map[i][j] = '.';
    for(int i = 1; i <= n; ++ i)
    {
        for(int j = 1; j <= m; ++ j)
        {
            if(map[i][j] == 'X')
            {
                beg = {i, j, 0, 0};
                if(isValid(i + 1, j) && map[i + 1][j] == 'X')
                {
                    beg.k = 2;
                    map[i][j] = map[i + 1][j] = '.';
                    return;
                }
                if(isValid(i, j + 1) && map[i][j + 1] == 'X')
                {
                    beg.k = 1;
                    map[i][j] = map[i][j + 1] = '.';
                    return;
                }
            }
        }
    }
}
int dirx[3][4] = {{-2, 1, 0, 0}, {-1, 1, 0, 0}, {0, 0, -1, 2}};
int diry[3][4] = {{0, 0, 1, -2}, {0, 0, 2, -1}, {-1, 1, 0, 0}};
int dirk[3][4] = {{2, 2, 1, 1}, {0, 0, -1, -1}, {0, 0, -2, -2}};
int bfs()
{
    queue<state> q;
    q.push(beg);
    mark[beg.x][beg.y][beg.k] = true;
    while(!q.empty())
    {
        state cur = q.front();
        q.pop();
        if(cur.x == end.x && cur.y == end.y && cur.k == end.k) return cur.c;
        for(int j = 0; j <= 3; ++ j)
        {
            int nx = cur.x + dirx[cur.k][j];
            int ny = cur.y + diry[cur.k][j];
            int nk = cur.k + dirk[cur.k][j];
            if(isValid(nx, ny) == false || map[nx][ny] == '#') continue;
            if(mark[nx][ny][nk] == true) continue;
            if(nk == 0 && map[nx][ny] == 'E') continue;
            if(nk == 1 && (isValid(nx, ny + 1) == false || map[nx][ny + 1] == '#')) continue;
            if(nk == 2 && (isValid(nx + 1, ny) == false || map[nx + 1][ny] == '#')) continue;
            q.push({nx, ny, nk, cur.c + 1});
            mark[nx][ny][nk] = true;
        }
    }
    return inf;
}
int main()
{
    while(scanf("%d%d", &n, &m) && n && m)
    {
        memset(mark, 0, sizeof(mark));
        beg = end = {0, 0, 0, 0};
        for(int i = 1; i <= n; ++ i) scanf("%s", map[i] + 1);
        pre_work();
        int res = bfs();
        if(res == inf)
            printf("Impossible\n");
        else
            printf("%d\n", res);
    }
    return 0;
}
```

