# Hash（拉链法）

## 实现

```cpp
const int N = 100003; // 质数
vector<int> h[N];

void insert (int val) {
    int idx = (val % N + N) % N;
    h[idx].push_back(val);
}
bool find (int val) {
    int idx = (val % N + N) % N;
    for (int i = 0; i < h[idx].size(); ++ i)
        if (h[idx][i] == val)
            return true;
    return false;
}
```

