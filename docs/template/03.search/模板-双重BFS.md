# 双重BFS

[AcWing-174-推箱子](https://www.acwing.com/problem/content/description/176/)

## 实现

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#define inf 0x3f3f3f3f
#define map MaP
using namespace std;
int n, m;
char map[30][30];
int dirx[4] = {-1, 1, 0, 0};
int diry[4] = {0, 0, -1, 1};
char dir_1[4] = {'N', 'S', 'W', 'E'};
char dir_2[4] = {'n', 's', 'w', 'e'};
struct element
{
    int x, y;
    int a, b;
    string res;
};
element beg;
string temp;
bool isValid(int x, int y) { return 1 <= x && x <= n && 1 <= y && y <= m && map[x][y] != '#'; }
bool bfs_2(element a, element b)
{
    temp = "";
    queue<element> q;
    q.push({a.a, a.b, 0, 0, temp});
    bool mark[30][30];
    memset(mark, 0, sizeof(mark));
    while(!q.empty())
    {
        element cur = q.front();
        q.pop();
        if(cur.x == a.x && cur.y == a.y)
        {
            temp = cur.res;
            return true;
        }
        for(int i = 0; i <= 3; ++ i)
        {
            int nx = cur.x + dirx[i], ny = cur.y + diry[i];
            if(isValid(nx, ny) == false) continue;
            if(nx == b.x && ny == b.y) continue;
            if(mark[nx][ny] == true) continue;
            q.push({nx, ny, 0, 0, cur.res + dir_2[i]});
            mark[nx][ny] = true;
        }
    }
    return false;
}
string bfs_1()
{
    queue<element> q;
    q.push(beg);
    bool mark[30][30][4];
    memset(mark, 0, sizeof(mark));
    string res = "Impossible.";
    int x = inf, y = inf, z;
    while(!q.empty())
    {
        element cur = q.front();
        q.pop();
        if(map[cur.x][cur.y] == 'T')
        {
            z = 0;
            for(int i = 0; i < cur.res.size(); ++ i)
                if('A' <= cur.res[i] && cur.res[i] <= 'Z')
                    ++ z;
            if(z < x || (z == x && cur.res.size() < y))
            {
                res = cur.res;
                x = z;
                y = cur.res.size();
            }
            continue;
        }
        for(int i = 0; i <= 3; ++ i)
        {
            int nx = cur.x + dirx[i], ny = cur.y + diry[i];
            if(isValid(nx, ny) == false) continue;
            if(mark[nx][ny][i] == true) continue;
            element prev = cur;
            if(i == 3)
                prev.y = cur.y - 1;
            else if(i == 2)
                prev.y = cur.y + 1;
            else if(i == 1)
                prev.x = cur.x - 1;
            else
                prev.x = cur.x + 1;
            if(bfs_2(prev, cur) == false) continue;
            mark[nx][ny][i] = true;
            q.push({nx, ny, cur.x, cur.y, cur.res + temp + dir_1[i]});
        }
    }
    return res;
}
int main()
{
    int k = 0;
    while(scanf("%d%d", &n, &m) && n && m)
    {
        for(int i = 1; i <= n; ++ i) scanf("%s", map[i] + 1);
        beg = {-1, -1, -1, -1, ""};
        for(int i = 1; i <= n; ++ i)
        {
            for(int j = 1; j <= m; ++ j)
            {
                if(map[i][j] == 'B') beg.x = i, beg.y = j, map[i][j] = '.';
                if(map[i][j] == 'S') beg.a = i, beg.b = j, map[i][j] = '.';
            }
        }
        printf("Maze #%d\n%s\n\n", ++ k, bfs_1().c_str());
    }
    return 0;
}
```

