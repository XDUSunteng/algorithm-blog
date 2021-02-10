# K叉Huffman树

[AcWing-149-荷马史诗](https://www.acwing.com/problem/content/151/)

## 分析

考虑这样一个问题：给出一棵包含`n`个叶子结点的`k`叉树，其中第`i`个叶子结点带有权值$w_i$，要求最小化$\Sigma w_i \times l_i$，其中$l_i$表示第`i`个叶子结点到根结点的距离。

为了最小化$\Sigma w_i \times l_i$，应该让权值大的叶子结点的深度尽量小。当`k = 2`时，我们很容易想到用下面这个贪心算法来求出二叉`Huffman`树。

1. 建立一个小根堆，插入这`n`个叶子结点的权值。
2. 从堆中取出最小的两个权值$w_1$和$w_2$，令`res +=`$(w_1 + w_2)$。
3. 建立一个权值为$w_1+w_2$的树结点`p`，令`p`成为权值为$w_1$和$w_2$的树结点的父亲。
4. 在堆中插入权值$w_1 + w_2$。
5. 重复第`2`~`4`步，直到堆的大小为`1`。

最后，由所有新建的`p`与原来的叶子结点构成的树就是二叉`Huffman`树，变量`res`就是$\Sigma w_i \times l_i$的最小值。

![](/img/0021.bmp)

---

对于`k(k > 2)`叉`Huffman`树的求解，直观的想法是在上述贪心算法的基础上，改为每次从堆中取出最小的`k`个权值。然而，仔细思考可以发现，如果在执行最后一轮循环时，堆的大小在`2`~`k-1`之间(不足以取出`k`个)，那么整个`Huffman`树的根的子结点个数就小于`k`。这显然不是最优解——我们任意取`Huffman`树中一个深度最大的结点，把它改为树根的子结点，就会使$\Sigma w_i \times l_i$变小。

因此，我们应该在执行上述贪心算法之前，额外补加一些权值为`0` 的叶子结点，使叶子结点的个数`n`满足$(n-1) \% (k - 1) = 0$。**也就是说,我们让子结点不足`k`个的情况发生在最底层，而不是根结点处**。在$(n-1) \% (k - 1) = 0$时，执行"每次从堆中取出最小的`k`个权值"的贪心算法就是正确的。

-----

在本题中，《荷马史诗》经过重新编码以后的最短长度为最小化的$\Sigma w_i \times l_i$，最长字符串$s_i$的长度为`Huffman`树的高度，要使得`Huffman`树的高度尽可能地小，就要利用启发式合并的思想，在每次合并权值相同的结点时优先考虑高度较小的树。

## 实现

```cpp
#include <iostream>
#include <queue>
#define inf 0x3f3f3f3f
using namespace std;

typedef long long LL;
struct node {
    LL w; // 第一关键字
    int h; // 第二关键字，以其为根结点的子树的高度
    bool operator < (const node& o) const {
        if (w == o.w)
            return h > o.h;
        return w > o.w;
    }
};
priority_queue<node> pq;

int main () {
    int n, k;
    cin >> n >> k;
    for (int i = 1; i <= n; ++ i) {
        LL w;
        cin >> w;
        pq.push({ w, 0});
    }

    while ((n - 1) % (k - 1) != 0) { // 添加权值为0的结点
        ++ n;
        pq.push({ 0, 0});
    }
    LL min_length = 0;
    while (pq.size() != 1) {
        LL sum_w = 0;
        int max_height = -inf;
        for (int i = 1; i <= k; ++ i) {
            sum_w += pq.top().w;
            max_height = max(max_height, pq.top().h);
            pq.pop();
        }
        min_length += sum_w;
        pq.push({ sum_w, max_height + 1 });
    }
    cout << min_length << endl << pq.top().h << endl;
    return 0;
}
```

