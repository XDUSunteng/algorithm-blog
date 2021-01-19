const prefix = '/solution/01.primary-algorithm/'

module.exports = {
    getPrimaryAlgorithmSidebar: () => [{
        title: '位运算',
        children: [
            prefix + '1.1 位运算/题解-起床困难综合症-位运算.md',
            prefix + '1.1 位运算/题解-只出现一次的数字-位运算.md',
        ],
    }, {
        title: '递推与递归',
        children: [
            prefix + '1.2 递推与递归/题解-Fractal-分形.md',
            prefix + '1.2 递推与递归/题解-分形之城-分形.md',
            prefix + '1.2 递推与递归/题解-奇怪的汉诺塔-递推.md',
            prefix + '1.2 递推与递归/题解-汉诺塔问题-递归.md',
            prefix + '1.2 递推与递归/题解-约数之和-分治.md',
            prefix + '1.2 递推与递归/题解-费解的开关-枚举.md',
        ],
    }, {
        title: '前缀和与差分',
        children: [
            prefix + '1.3 前缀和与差分/题解-增减序列-差分.md',
            prefix + '1.3 前缀和与差分/题解-最高的牛-差分.md',
            prefix + '1.3 前缀和与差分/题解-连续自然数和-前缀和 二分.md',
        ],
    }, {
        title: '二分',
        children: [
            prefix + '1.4 二分/题解-最佳牛围栏-最大化平均值.md',
        ],
    }, {
        title: '排序',
        children: [
            prefix + '1.5 排序/题解-士兵-货仓选址.md',
            prefix + '1.5 排序/题解-逆序对的数量-归并排序.md',
        ],
    }, {
        title: '倍增',
        children: [
        ],
    }, {
        title: '贪心',
        children: [
            prefix + '1.7 贪心/题解-Maximize The Beautiful Value-贪心 前缀和.md',
            prefix + '1.7 贪心/题解-三值的排序-贪心.md',
            prefix + '1.7 贪心/题解-区间覆盖-贪心.md',
            prefix + '1.7 贪心/题解-国王游戏-贪心.md',
            prefix + '1.7 贪心/题解-最大的和-贪心.md',
            prefix + '1.7 贪心/题解-田忌赛马-贪心.md',
            prefix + '1.7 贪心/题解-畜栏预定-贪心.md',
            prefix + '1.7 贪心/题解-防晒-贪心.md',
            prefix + '1.7 贪心/题解-雷达设备-贪心.md',
        ],
    }, {
        title: '双指针',
        children: [
            prefix + '1.8 双指针/题解-两数之和-双指针.md',
            prefix + '1.8 双指针/题解-数组元素的目标和-双指针.md',
            prefix + '1.8 双指针/题解-最长连续不重复子序列-双指针.md',
        ],
    }],
}