---
title: Others
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/others/
---
## 169.1.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int majorityElement(vector<int>& nums)
    {
        sort(nums.begin(), nums.end());
        return nums[nums.size() / 2];
    }
};
```

## 169.2.Moore_Voting.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int majorityElement(vector<int>& nums)
    {
        int count = 0;
        int maxcount = 0;
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        cout.tie(NULL);
        for (int i = 0; i < nums.size(); i++) {
            if (count == 0) {
                maxcount = nums[i];
                count++;
            } else if (maxcount == nums[i]) {
                count++;
            } else {
                count--;
            }
        }
        return maxcount;
    }
};
```

