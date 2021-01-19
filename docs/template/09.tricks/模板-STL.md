# STL

## vector

1. 支持比较运算(按字典序)

## pair

1. 常用`typedef pair<int, int> PII;`
2. 支持比较运算.`first`为第一关键字,`second`为第二关键字.

## string

1. 读入一行字符串`getline(cin, str);`
2. `c_str()`
3. `substr(起始下标, (字串长度));`

## queue

1. `size()`
2. `back()`

## priority_queue(默认为大顶堆)

### 定义为小顶堆

1. `priority_queue<int, vector<int>, greater<int>> pq;`

2. ```cpp
   struct cmp
   {
       bool operator ()(const int &a, const int &b)
       {
           return a > b;
       }
   };
   priority_queue<int, vector<int>, cmp> pq;
   ```

3. ```cpp
   struct customType
   {
       int val;
       bool operator <(const customType &o) const
       {
           return val > o.val;
       }
   };
   priority_queue<customType> pq;
   ```

4. ```cpp
   struct customType
   {
       int val;
   };
   bool operator <(const customType &a, const customType &b)
   {
       return a.val > b.val;
   }
   priority_queue<customType> pq;
   ```

## deque

1. 支持下标运算符`[]`

## bitset

1. `count();// 1 的个数`
2. `set();// 置 1`
3. `reset();// 置 0`
4. `flip();// 等价于 ~`
5. `flip(k);// 把第 k 位取反`