# 静态序列第K大

#### [数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 分析

快速排序的思路，时间复杂度$O(n)$。

## 实现

```cpp
class Solution {
private:
    int partition (vector<int>& a, int l, int r) { // 《啊哈！算法》的快排模板
        int pivot = a[l], i = l, j = r;
        while (i != j) {
            while (i < j && a[j] <= pivot) -- j;
            while (i < j && a[i] >= pivot) ++ i;
            if (i < j) swap(a[i], a[j]);
        }
        a[l] = a[i], a[i] = pivot;
        return i;
    }
    int nth_element (vector<int>& a, int l, int r, int k) {
        int pivot_idx = partition(a, l, r);
        int cnt = pivot_idx - l + 1;
        if (cnt == k)
            return a[pivot_idx];
        else if (cnt < k)
            return nth_element(a, pivot_idx + 1, r, k - cnt);
        else // cnt > k
            return nth_element(a, l, pivot_idx - 1, k);
    }
public:
    int findKthLargest(vector<int>& a, int k) {
        return nth_element(a, 0, a.size() - 1, k);
    }
};

// STL nth_element
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) { // 0-index
        nth_element(nums.begin(), nums.begin + (k - 1), nums.end());
        return nums[k - 1];
    }
};
```

