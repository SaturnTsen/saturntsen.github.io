---
title: Backtracing
createTime: 2025/02/21 15:23:20
permalink: /notes/leetcode/backtracking/
---
## 46.Permutations.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
#include <stack>
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums)
    {

        vector<vector<int>> ans;
        int n = nums.size();
        vector<bool> visited(n, false);
        stack<pair<vector<int>, vector<bool>>> stk;
        stk.push({ {}, visited });

        while (!stk.empty()) {
            auto [currentPerm, currentVisited] = stk.top();
            stk.pop();

            if (currentPerm.size() == n) {
                ans.push_back(currentPerm);
                continue;
            }

            for (int i = 0; i < n; ++i) {
                if (!currentVisited[i]) {
                    currentPerm.push_back(nums[i]);
                    currentVisited[i] = true;
                    stk.push({ currentPerm, currentVisited });
                    currentPerm.pop_back();
                    currentVisited[i] = false;
                }
            }
        }

        return ans;
    }
};
```

