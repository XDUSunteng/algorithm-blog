# 序列的第K大元素值

[题目](https://www.nowcoder.com/questionTerminal/097ab63cffa847d89716f2ca8c23524f)

## 实现

### 快速排序的思想,$O(n)$

```cpp
#include <iostream>
#include <vector>
using namespace std;
int partition(vector<int> &a, int l, int r)
{
    int i = l, j = r, pivot = a[l];
    while(i != j)
    {
        while(i < j && a[j] <= pivot) -- j;
        while(i < j && a[i] >= pivot) ++ i;
        if(i < j) swap(a[i], a[j]);
    }
    a[l] = a[i], a[i] = pivot;
    return i;
}
int kth_element(vector<int> &a, int l, int r, int k)
{
    int idx = partition(a, l, r);// pivot的下标
    /*  此时,val(a[l ~ idx-1]) ≥ val(a[idx+1, r])  */
    int cnt = idx - l + 1;// pivot及其左边元素的个数
    if(cnt == k)// 正好k个
        return a[idx];
    else if(cnt < k)// 少于k个,在区间[idx + 1, r]中找第k - cnt大的元素
        return kth_element(a, idx + 1, r, k - cnt);
    else// 多于k个,在区间[l, idx - 1]中找第k大的元素
        return kth_element(a, l, idx - 1, k);
}
int main()
{
    // ----------输入----------
    int k;
    vector<int> a;
    while(scanf("%d", &k) != EOF) a.push_back(k);
    k = a.back(), a.pop_back();


    printf("%d\n", kth_element(a, 0, a.size() - 1, k));
    return 0;
}
```

### 二分,$O(nlogm)$

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#define inf 0x3f3f3f3f
using namespace std;
bool isSatiable(vector<int> &a, int val, int k)// count(> val)是否 < k
{
    int cnt = 0;
    for(int i = 0; i < a.size(); ++ i)
        if(a[i] > val)
            ++ cnt;
    return cnt < k;
}
int kth_element(vector<int> &a, int k)
{
    unordered_map<int, int> mark;
    int l = inf, r = -inf;
    for(int i = 0; i < a.size(); ++ i)
    {
        mark[a[i]] = 1;
        l = min(l, a[i]), r = max(r, a[i]);
    }
    while(l < r)
    {
        int mid = l + r >> 1;
        if(isSatiable(a, mid, k) == true)
        {
            if(mark.find(mid) != mark.end())// mid在a中
                r = mid;
            else
                r = mid - 1;
        }
        else
            l = mid + 1;
    }
    return l;
}
int main()
{
    // ----------输入----------
    int k;
    vector<int> a;
    while(scanf("%d", &k) != EOF) a.push_back(k);
    k = a.back(), a.pop_back();


    printf("%d\n", kth_element(a, k));
    return 0;
}
```

### STL

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n, a[1000010];
int main()
{
    //freopen("in.txt","r",stdin);
    // ----------输入----------
    while(scanf("%d", &a[++ n]) != EOF);
    int k = a[-- n];
    -- n;


    nth_element(a + 1, a + (n - k + 1), a + n + 1);// 第n - k + 1小
    printf("%d\n", a[n - k + 1]);
    return 0;
}
```

