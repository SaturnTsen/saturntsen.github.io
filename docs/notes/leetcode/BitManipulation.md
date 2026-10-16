---
title: BitManipulation
createTime: 2025/02/21 15:23:20
permalink: /notes/leetcode/bitmanipulation/
---
## 137.Single_Number_II.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
/**
 * @brief TODO
 * 
 * class Solution:
 *    def singleNumber(self, nums: List[int]) -> int:
 *        ones = 0
 *        twos = 0
 *        for num in nums:
 *            ones = (ones ^ num) & ~twos
 *            twos = (twos ^ num) & ~ones
 *        return ones
 * 
When a number appears
the first time: add to once
the second time: remove from once and add to twice
the third time: remove from twice and won’t add to once because of ~twice
 */
class Solution {
public:
    int singleNumber(vector<int>& nums)
    {
        const int hight_bit = 32;
        char bin[hight_bit];
        for (int i = 0; i < hight_bit; i++)
            bin[i] = 0;
        for (int num : nums)
            for (int i = 0; i < hight_bit; i++)
                if (num & (1 << i))
                    bin[i] = (bin[i] + 1) % 3;
        int ans = 0;
        for (int i = 0; i < hight_bit; i++)
            ans |= bin[i] << i;
        return ans;
    }
};
```

