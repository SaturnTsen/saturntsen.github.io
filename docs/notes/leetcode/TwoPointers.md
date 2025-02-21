---
title: TwoPointers
createTime: 2025/02/21 15:20:47
permalink: /notes/notes/leetcode/cg89ewo7/
---
## 11.Container_With_Most_Water.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/container-with-most-water/

#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height)
    {
        int left = 0, right = height.size() - 1;
        int ans_left = 0, ans_right = right;
        int max_amount = min(height[left], height[right]) * (right - left);
        while (left < right) {
            // cout << "left: " << left << " right: " << right << endl;
            // cout << "ans_left: " << ans_left << " ans_right: " << ans_right << endl;
            int amount = min(height[left], height[right]) * (right - left);
            if (amount > max_amount) {
                ans_left = left;
                ans_right = right;
                max_amount = amount;
            }
            bool flag = false;
            if (height[left] < height[right]) {
                int h = height[left];
                for (int l = left + 1; l < right; l++) {
                    if (height[l] > h) {
                        left = l;
                        flag = true;
                        break;
                    }
                }
            } else {
                int h = height[right];
                for (int r = right - 1; r > left; r--) {
                    if (height[r] > h) {
                        right = r;
                        flag = true;
                        break;
                    }
                }
            }
            if (!flag)
                break;
        }
        return max_amount;
    }
};

int main()
{
    // vector<int> height = { 1, 8, 6, 2, 5, 4, 8, 3, 7 };
    vector<int> height = { 2, 3, 4, 5, 18, 17, 6 };
    Solution sol;
    cout << sol.maxArea(height) << endl;
}
```

## 12.3Sum.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/3sum/

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums)
    {
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());
        for (int idx = 0; idx < nums.size(); idx++) {
            if (nums[idx] > 0) break;
            if (idx > 0 && nums[idx] == nums[idx - 1]) continue;
            // Notice that the solution set must not contain duplicate triplets.
            int i = idx + 1, j = nums.size() - 1;
            while (i < j) {
                if (nums[idx] + nums[i] + nums[j] == 0) {
                    ans.push_back({ nums[idx], nums[i], nums[j] });
                    while (i < j && nums[i] == nums[i + 1])
                        i++;
                    while (i < j && nums[j] == nums[j - 1])
                        j--;
                    i++;
                    j--;
                } else if (nums[idx] + nums[i] + nums[j] < 0)
                    i++;
                else {
                    j--;
                }
            }
        }
        return ans;
    }
};

int main()
{
    vector<int> nums = { -8, -5, -5, -5, 0, 0, 0, 10, 20 };
    Solution s;
    vector<vector<int>> ans = s.threeSum(nums);
    for (auto v : ans) {
        for (int x : v)
            cout << x << " ";
        cout << endl;
    }
}
```

