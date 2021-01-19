# 求欧拉函数第n项（试除法）

```cpp
int phi(int x)
{
    int res = x;
    for(int i = 2; i <= x / i; ++ i)// i * i <= x有溢出的风险
    {
        if(x % i == 0)
        {
            res = res / i * (i - 1);
            while(x % i == 0) x /= i;
        }
    }
    if(x > 1) res = res / x * (x - 1);
    return res;
}
```

