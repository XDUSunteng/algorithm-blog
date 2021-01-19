# 八皇后

[洛谷-P1219-八皇后](https://www.luogu.com.cn/problem/P1219)

## 分析

显然每行只能放置一个皇后.

如何判断能否放置皇后:

- 同一列
- 主对角线
- 副对角线

![](/img/0026.bmp)

## 实现

```cpp
#include <iostream>
using namespace std;
int n;
int res;
int mark[20];// 第i行的皇后放置在第mark[i]列
int k = 3;
void dfs(int cur)
{
    if(cur == n + 1)// 此时得到了一个解
    {
        ++ res;
        if(k > 0)
        {
            for(int i = 1; i <= n; ++ i)
                cout << mark[i] << ' ';
            cout << endl;
            -- k;
        }
        return;
    }
    bool flag;
    for(int j = 1; j <= n; ++ j)// 对于每一列(第cur行的)
    {
        flag = true;
        mark[cur] = j;
        for(int i = 1; i <= cur - 1; ++ i)// 第1 ~ cur-1行
        {
            if(mark[cur] == mark[i] 
            || cur - mark[cur] == i - mark[i] 
            || cur + mark[cur] == i + mark[i])
            {
                flag = false;// 不可以
                break;
            }
        }
        if(flag == true) dfs(cur + 1);// 可以放置再递归
    }
}
int main()
{
    cin >> n;
    dfs(1);
    cout << res << endl;
    return 0;
}
```

