# Splay

[洛谷-P3369-【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)

## 分析

左旋`zag`:

![0035](/img/0035.gif)

口诀:"左旋拎右左挂右".

右旋`zig`:

![0036](/img/0036.gif)

口诀:"右旋拎左右挂左".

## 实现

```cpp
#include <iostream>
#define new NeW
#define delete DeLeTe
using namespace std;
const int N = 100010;
struct splayNode
{
    int ls, rs;
    int val, cnt;//当前结点重复次数，默认为1
    int size;
    #define ls(x) t[x].ls
    #define rs(x) t[x].rs
    #define val(x) t[x].val
    #define cnt(x) t[x].cnt
    #define size(x) t[x].size
};
int idx; splayNode t[N];
int rt;
void new(int &cur, int val)
{
    cur = ++ idx;
    val(cur) = val;
    ++ cnt(cur);
    ++ size(cur);
}
void update(int cur) { size(cur) = size(ls(cur)) + size(rs(cur)) + cnt(cur); }
void zig(int &cur)
{
    int old_ls = ls(cur);
    ls(cur) = rs(old_ls);
    rs(old_ls) = cur;
    cur = old_ls;
    update(rs(cur)), update(cur);
}
void zag(int &cur)
{
    int old_rs = rs(cur);
    rs(cur) = ls(old_rs);
    ls(old_rs) = cur;
    cur = old_rs;
    update(ls(cur)), update(cur);
}
void splay(int x, int &y)// x -> y  我要把x伸展到y那个位置！
{
    if(x == y) return;//如果到了终点，return
    int &lsy = ls(y), &rsy = rs(y);
    if(x == lsy)//如果左儿子是终点，那就单旋
        zig(y);
    else if(x == rsy)//右儿子是终点也是单旋
        zag(y);
    else//否则就一定是双旋
    {
        if(val(x) < val(y))
        {
            if(val(x) < val(lsy))
                splay(x, ls(lsy)), zig(y), zig(y);//zigzig情况
            else
                splay(x, rs(lsy)), zag(lsy), zig(y); //zagzig情况
        }
        else
        {
            if(val(x) > val(rsy))
                splay(x, rs(rsy)), zag(y), zag(y); //zagzag情况
            else
                splay(x, ls(rsy)), zig(rsy), zag(y);//zigzag情况
        }
    }
}
void insert(int &cur, int val)
{
    if(cur == 0)
        new(cur, val), splay(cur, rt);
    else if(val < val(cur))
        insert(ls(cur), val);
    else if(val > val(cur))
        insert(rs(cur), val);
    else
    {
        ++ cnt(cur);
        ++ size(cur);
        splay(cur, rt);
    }
}
void delete(int cur, int val)
{
    if(val < val(cur))
        delete(ls(cur), val);
    else if(val > val(cur))
        delete(rs(cur), val);
    else//特判相同的情况
    {
        splay(cur, rt);//将要删除的结点伸展至根结点
        if(cnt(cur) > 1)
        {
            -- cnt(cur);
            -- size(cur);
        }
        else if(rs(rt) != 0)//否则如果当前结点有后继
        {
            int ptr = rs(rt);
            while(ls(ptr) != 0) ptr = ls(ptr);//找到后继
            splay(ptr, rs(rt));//将其伸展至根结点右儿子
            ls(rs(rt)) = ls(rt);//右儿子左儿子变为根结点
            rt = rs(rt);//根结点变为根结点右儿子
            update(rt);//更新一下size信息
        }
        else//伸展之后没有后继，说明它是最大的了，那就直接删除
            rt = ls(rt);
    }
}
int rankOf(int val)
{
    int cur = rt, rk = 1;
    while(cur != 0)
    {
        if(val(cur) == val)//找到了要的结点，这个之前的没有
        {
            rk += size(ls(cur));
            splay(cur, rt);
            break;
        }
        if(val <= val(cur))
            cur = ls(cur);
        else
        {
            rk += size(ls(cur)) + cnt(cur);
            cur = rs(cur);
        }
    }
    return rk;
}
int valueOf(int rk)
{
    int cur = rt;
    while(cur != 0)
    {
        int lsize = size(ls(cur));
        if(lsize + 1 <= rk && rk <= lsize + cnt(cur))//如果在这个范围内，那就是当前结点
        {
            splay(cur, rt);
            break;
        }
        else if(lsize >= rk)
            cur = ls(cur);
        else
        {
            rk -= lsize + cnt(cur);
            cur = rs(cur);
        }
    }
    return val(cur);
}

int main()
{
    freopen("in.txt", "r", stdin);
    int m;
    scanf("%d", &m);
    while(m --)
    {
        int opt, x;
        scanf("%d%d", &opt, &x);
        if(opt == 1) insert(rt, x);
        if(opt == 2) delete(rt, x);
        if(opt == 3) printf("%d\n", rankOf(x));
        if(opt == 4) printf("%d\n", valueOf(x));
        if(opt == 5) printf("%d\n", valueOf(rankOf(x) - 1));
        if(opt == 6) printf("%d\n", valueOf(rankOf(x + 1)));
    }
    return 0;
}
```

`0`表示`NULL`.









