# 双向BFS

[AcWing-177-噩梦](https://www.acwing.com/problem/content/179/)

## 实现

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#define map MaP
using namespace std;
const int N = 810;
int dirx[4] = {-1, 1, 0, 0};
int diry[4] = {0, 0, -1, 1};
struct point { int x, y; };
int n, m;
char map[N][N];
point boy, girl, ghost1, ghost2;
bool mark_boy[N][N], mark_girl[N][N];
bool isValid(int x, int y, int t)
{
    if(x < 0 || x > n || y < 0 || y > m) return false;
    if(map[x][y] == 'X') return false;
    if(abs(x - ghost1.x) + abs(y - ghost1.y) <= 2 * t) return false;
    if(abs(x - ghost2.x) + abs(y - ghost2.y) <= 2 * t) return false;
    return true;
}
int Z_dir_bfs()
{
    queue<point> qb, qg;
    qb.push(boy), mark_boy[boy.x][boy.y] = true;
    qg.push(girl), mark_girl[girl.x][girl.y] = true;
    int t = 0;
    while(!qb.empty() && !qg.empty())
    {
        ++ t;
        int k = 3;
        while(k --)
        {
            int s = qb.size();
            for(int i = 1; i <= s; ++ i)
            {
                point cur = qb.front();
                qb.pop();
                if(isValid(cur.x, cur.y, t) == false) continue;
                for(int j = 0; j <= 3; ++ j)
                {
                    int nx = cur.x + dirx[j], ny = cur.y + diry[j];
                    if(mark_boy[nx][ny] == false && isValid(nx, ny, t) == true)
                    {
                        qb.push({nx, ny});
                        mark_boy[nx][ny] = true;
                    }
                }
            }
        }
        int s = qg.size();
        for(int i = 1; i <= s; ++ i)
        {
            point cur = qg.front();
            qg.pop();
            if(isValid(cur.x, cur.y, t) == false) continue;
            for(int j = 0; j <= 3; ++ j)
            {
                int nx = cur.x + dirx[j], ny = cur.y + diry[j];
                if(mark_girl[nx][ny] == false && isValid(nx, ny, t) == true)
                {
                    if(mark_boy[nx][ny] == true) return t;
                    qg.push({nx, ny});
                    mark_girl[nx][ny] = true;
                }
            }
        }
    }
    return -1;
}
void find(point &p, char ch)
{
    for(int i = 1; i <= n; ++ i)
    {
        for(int j = 1; j <= m; ++ j)
        {
            if(map[i][j] == ch)
            {
                p.x = i, p.y = j;
                map[i][j] = '.';
                return;
            }
        }
    }
}
int main()
{
    int T;
    scanf("%d\n", &T);
    while(T --)
    {
        memset(mark_boy, 0, sizeof(mark_boy));
        memset(mark_girl, 0, sizeof(mark_girl));
        scanf("%d%d", &n, &m);
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= m; ++j)
                cin >> map[i][j];
        find(boy, 'M'), find(girl, 'G'), find(ghost1, 'Z'), find(ghost2,'Z');
        printf("%d\n", Z_dir_bfs());
    }
    return 0;
}
```

