# Hash（拉链法）

```cpp
const int N = 100003;// 质数
vector<int> h[N];
void insert(int val)
{
    int k = (val % N + N) % N;
    h[k].push_back(val);
}
bool find(int val)
{
    int k = (val % N + N) % N;
    for(int i = 0; i < h[k].size(); ++ i)
        if(h[k][i] == val)
            return true;
    return false;
}
```

