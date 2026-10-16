---
title: Basic
createTime: 2025/02/21 15:18:08
permalink: /notes/leetcode/basic/
---
## 12.IntegerToRoman.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/integer-to-roman
class Solution {
    const char chars[3][3] = { { 'C', 'D', 'M' }, { 'X', 'L', 'C' }, { 'I', 'V', 'X' } };

public:
    string intToRoman(int num)
    {
        int n[4];
        for (int i = 3; i >= 0; i--) {
            n[i] = num % 10;
            num /= 10;
        }
        // 3749 -> {3, 7, 4, 9}
        string s = "";
        for (int j = 0; j < n[0]; j++)
            s += 'M';
        for (int i = 1; i <= 3; i++) {
            if (n[i] == 9) {
                s += chars[i - 1][0];
                s += chars[i - 1][2];
            } else if (n[i] >= 5) {
                s += chars[i - 1][1];
                for (int j = 0; j < n[i] - 5; j++)
                    s += chars[i - 1][0];
            } else if (n[i] == 4) {
                s += chars[i - 1][0];
                s += chars[i - 1][1];
            } else {
                for (int j = 0; j < n[i]; j++)
                    s += chars[i - 1][0];
            }
        }
        return s;
        // 1 2  3   4  5 6  7   8    9
        // I II III IV V VI VII VIII IX
        // 1 2  3   4  5 6  7   8    9
        // X XX XXX XL L LX LXX LXXX XC
        // 1 2  3   4  5 6  7   8    9
        // C CC CCC CD D DC DCC DCCC CM
    }
};
```

## 1342.cpp
```cpp
class Solution {
public:
    int numberOfSteps(int num)
    {
        int steps = 0;
        while (num) {
            if (num % 2) {
                num ^= 1;
            } else {
                num >>= 1;
            }
            steps += 1;
        }
        return steps;
    }
};
```

## 14.longest-common-prefix.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/longest-common-prefix
// 以引用的方式遍历，可以避免内存创建与复制，在很大程度上提高效率
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs)
    {
        size_t min_length = strs[0].length();
        for (string str : strs)
            min_length = min(str.length(), min_length);
        bool flag = false;
        int i;
        for (i = 0; i < min_length; i++) {
            for (string& str : strs)
                if (str[i] != strs[0][i])
                    return strs[0].substr(0, i);
        }
        return strs[0].substr(0, i);
    }
};
```

## 1480.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    vector<int> runningSum(vector<int>& nums)
    {
        vector<int> res(nums.size());
        res[0] = nums[0];
        for (int i = 1; i < nums.size(); i++)
            res[i] = res[i - 1] + nums[i];
        return res;
    }
};
```

## 1672.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts)
    {
        int sum = 0, max = 0;
        for (auto account : accounts) {
            sum = 0;
            for (int num : account)
                sum += num;
            max = sum > max ? sum : max;
        }
        return max;
    }
};
```

## 274.H_index.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/h-index

class Solution {
public:
    int hIndex(vector<int>& citations)
    {
        sort(citations.begin(), citations.end());
        int h_index = citations.size();
        for (int i = 0; i < citations.size(); i++) {
            if (citations[i] >= h_index)
                return h_index;
            h_index--;
        }
        return h_index;
    }
};
```

## 392.is_subsequence.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/is-subsequence

// Be simple, bo foolish
// You don't have to use dp to solve the problem
class Solution {
public:
    bool isSubsequence(string s, string t)
    {
        int i, j;
        for (i = 0, j = 0; i < s.length() && j < t.length(); j++)
            if (s[i] == t[j])
                i++;
        return i == s.length();
    }
};
```

## 412.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    vector<string> fizzBuzz(int n)
    {
        const string fizzbuzz("FizzBuzz");
        const string fizz("Fizz");
        const string buzz("Buzz");
        vector<string> answer(n);
        for (int i = 1; i <= n; i++) {
            if (i % 3) {
                if (i % 5) {
                    answer[i - 1] = to_string(i);
                } else {
                    answer[i - 1] = buzz;
                }
            } else {
                if (i % 5) {
                    answer[i - 1] = fizz;
                } else {
                    answer[i - 1] = fizzbuzz;
                }
            }
        }
        return answer;
    }
};
```

## 80.cpp
```cpp
#include <vector>
using namespace std;
class Solution {
public:
    int removeDuplicates(vector<int>& nums)
    {
        int pos = 0;
        for (int i = 0, j = 0; i < nums.size(); i = j) {
            j = i + 1;
            while (j < nums.size() && nums[j] == nums[i])
                j++;
            nums[pos++] = nums[i];
            if (j > i + 1)
                nums[pos++] = nums[i];
        }
        return pos;
    }
};
```

