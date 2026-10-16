---
title: Greedy
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/greedy/
---
## #134.Gas_Station.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/gas-station

// Proof: https://www.youtube.com/watch?v=rf66wlb9aNQ

class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost)
    {
        // 0 1 2 ------------ i    i+1 ------------ len-1
        //  negative net gain        positive net gain
        // if positive net gain >= negative net gain
        // then starting from i+1 is feasible
        int positive = 0, negative = 0, res = 0;
        int len = gas.size();
        for (int i = 0; i < len; i++) {
            positive += gas[i] - cost[i];
            if (positive < 0) {
                negative += positive;
                positive = 0;
                res = i + 1;
            }
        }
        return (negative + positive >= 0) ? (res) : (-1);
    }
};
```

## 42.trapping_water.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/trapping-rain-waters

class Solution {
public:
    int trap(vector<int>& height)
    {
        int len = height.size();
        if (len == 1)
            return 0;
        int ans = 0;
        int max_index = 0;
        int max_height = height[0];
        int sum_blocks = 0;
        for (int i = 1; i < len; i++) {
            sum_blocks += height[i];
            if (height[i] >= max_height) {
                if (i - max_index >= 2)
                    ans += max_height * (i - max_index - 1) - (sum_blocks - height[i]);
                sum_blocks = 0;
                max_index = i;
                max_height = height[i];
            }
        }
        max_index = len - 1;
        max_height = height[len - 1];
        sum_blocks = 0;
        for (int j = len - 2; j >= 0; j--) {
            sum_blocks += height[j];
            if (height[j] > max_height) {
                if (max_index - j >= 2)
                    ans += max_height * (max_index - j - 1) - (sum_blocks - height[j]);
                sum_blocks = 0;
                max_index = j;
                max_height = height[j];
            }
        }
        return ans;
    }
};

int main()
{
    vector<int> height = { 4, 2, 3 };
    Solution* sol = new Solution();
    cout << sol->trap(height) << endl;
    delete sol;
    return 0;
}

```

## 55.Jump_Game.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    bool canJump(vector<int>& nums)
    {
        int len = nums.size();
        int step = nums[0];
        for (int i = 1; i < len; i++) {
            if (--step < 0)
                return false;
            if (step < nums[i])
                step = nums[i];
        }
        return true;
    }
};
```

## 846.Hand_of_Staights.cpp
```cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

bool isNStraightHand(vector<int>& hand, int groupSize)
{
    int len = hand.size();
    if (len % groupSize)
        return false;
    bool* used = new bool[len];
    for (int i = 0; i < len; i++)
        used[i] = false;
    std::sort(hand.begin(), hand.end());
    for (int i = 0; i < len; i++) {
        if (used[i])
            continue;
        used[i] = true;
        int cnt = 1;
        int number = hand[i];
        for (int j = i + 1; j < len && cnt < groupSize; j++) {
            if (!used[j] && hand[j] == number + 1) {
                used[j] = true;
                number++;
                cnt++;
            }
        }
        if (cnt < groupSize)
            return false;
    }
    return true;
}
int main()
{
    vector<int> hand = { 1, 2, 3, 6, 2, 3, 4, 7, 8 };
    cout << isNStraightHand(hand, 3);
    return 0;
}
```

## 945.last.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/minimum-increment-to-make-array-unique

class Solution {
public:
    int minIncrementForUnique(vector<int>& nums)
    {
        // optimized version
        // 1 1 2 2 2 3 9 9
        // 1 2 3 4 5 6 9 10
        const int len = nums.size();
        sort(nums.begin(), nums.end());
        int last_num = nums[0];
        int ans = 0;
        for (int i = 1; i < len; i++) {
            if (nums[i] <= last_num) {
                ans += last_num - nums[i] + 1;
                last_num += 1;
            } else {
                last_num = nums[i];
            }
        }
        return ans;
    }
};

// class Solution
// {
// public:
//     int minIncrementForUnique(vector<int>& nums)
//     {
//         int ans = 0;
//         sort(nums.begin(), nums.end());

//         for(int i=1;i<nums.size();i++)
//         {
//             if(nums[i] <= nums[i-1])
//             {
//                 ans += abs(nums[i] - nums[i-1] - 1);
//                 nums[i] = nums[i-1]+1;
//             }
//         }
//         return ans;
//     }
// };
```

