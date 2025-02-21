---
title: DP
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/dp/
---
## 121.Buy_and_Sell_Stock.cpp
```cpp
#include <vector>
using namespace std;
class Solution {
public:
    int maxProfit(vector<int>& prices)
    {
        int profit = 0;
        int min_price = prices[0];
        for (int i = 1; i < prices.size(); i++) {
            min_price = min(min_price, prices[i]);
            profit = max(prices[i] - min_price, profit);
        }
        return profit;
    }
};
```

## 122.Buy_and_Sell_Stock.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maxProfit(vector<int>& prices)
    {
        // 构造状态空间是难点
        // dp[i][0] 若第i天后不持股票的最大利润
        // dp[i][1] 若第i天后持有股票的最大利润
        int len = prices.size();
        int dp[len][2];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        for (int i = 1; i < len; i++) {
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        }
        return max(dp[len - 1][0], dp[len - 1][1]);
    }
};
```

## 139.Word_Break.cpp
```cpp
// https://leetcode.com/problems/word-break

```

## 198.House_Robber.cpp
```cpp
// https://leetcode.com/problems/house-robber
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int rob(vector<int>& nums)
    {
        int len = nums.size();
        if (len == 1) // 第一次忘记了边界条件
            return nums[0];
        vector<int> max_val(len);
        max_val[0] = nums[0];
        max_val[1] = max(max_val[0], nums[1]);
        for (int i = 2; i < len; i++)
            max_val[i] = max(max_val[i - 1], max_val[i - 2] + nums[i]);
        return max_val[len - 1];
    }
};
```

## 45.Jump_Game_II.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class
    Solution {
public:
    int jump(vector<int>& nums)
    {
        vector<int> farthest(nums.size());
        farthest[0] = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            farthest[i] = max(farthest[i - 1], nums[i] + i);
        }
        int ans = 0;
        for (int i = 0; i < nums.size() - 1;) {
            i = farthest[i];
            ans++;
        }
        return ans;
    }
};
```

## 70.cpp
```cpp
//简单二阶递推
class Solution {
public:
    int climbStairs(int n)
    {
        if (n == 1)
            return 1;
        if (n == 2)
            return 2;
        int val1 = 1, val2 = 2;
        int step = 0;
        for (int i = 2; i < n; i++) {
            step = val1 + val2;
            val1 = val2;
            val2 = step;
        }
        return step;
    }
};
```

