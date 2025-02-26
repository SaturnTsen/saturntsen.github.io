---
title: Array
createTime: 2025/02/21 15:17:52
permalink: /notes/leetcode/array/
---

## 169 Majority Element

Given an array nums of size `n`, return the majority element.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Boyer-Moore Voting Algorithm**

Time complexity: $O(n)$

Space complexity: $O(1)$

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int m = 0;
        int ans;
        for (int& num: nums) {
            if (m == 0) {
                ans = num;
                m++;
            } else if (ans == num) {
                m++;
            } else {
                m--;
            }
        }
        return ans;
    }
};
```

**Correctness**

Loop Invariant: after processing $n$ input elements, the input sequence can be
partitioned into $(n-c)/2$ pairs of unequal elements and $c$ copies of $m$ left
over.

Try to prove the loop invariant by induction. Think about why $n-c$ is even.

# 135 Candy 

```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/candy

// This solution is O(n log n)
// There is a better solution O(n)

class child {
public:
    int number;
    int rating;
    bool operator<(const child& that)
    {
        return this->rating < that.rating;
    }
};

class Solution {
public:
    int candy(vector<int>& ratings)
    {
        int len = ratings.size();
        if (len == 1)
            return 1;
        vector<child> children(len);
        vector<int> alloc(len);
        for (int i = 0; i < len; i++) {
            children[i].number = i;
            children[i].rating = ratings[i];
            alloc[i] = 0;
        }
        sort(children.begin(), children.end());
        for (child c : children) {
            int i = c.number;
            if (i == 0)
                alloc[0] = (c.rating > ratings[1] ? alloc[1] + 1 : 0);
            else if (i == len - 1)
                alloc[len - 1] = c.rating > ratings[len - 2] ? alloc[len - 2] + 1 : 0;
            else if (c.rating > max(ratings[i - 1], ratings[i + 1]))
                alloc[i] = max(alloc[i + 1], alloc[i - 1]) + 1;
            else if (c.rating > ratings[i - 1])
                alloc[i] = alloc[i - 1] + 1;
            else if (c.rating > ratings[i + 1])
                alloc[i] = alloc[i + 1] + 1;
            else
                alloc[i] = 0;
        }
        int ans = 0;
        for (int i = 0; i < len; i++) {
            ans += alloc[i];
        }
        return ans + len;
    }
};

int main()
{
    vector<int> ratings = { 0, 1, 2, 5, 3, 2, 7 };
    Solution sol;
    cout << "ans=" << sol.candy(ratings) << endl;
    return 0;
}
```

## 13 RomanToInteger
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/roman-to-integer

class Solution {
public:
    map<char, int> valOf = { { 'I', 1 }, { 'V', 5 }, { 'X', 10 }, { 'L', 50 },
        { 'C', 100 }, { 'D', 500 }, { 'M', 1000 } };
    int romanToInt(string s)
    {
        int max_val = 1;
        int res = 0;
        int val = 0;
        for (int i = s.size() - 1; i >= 0; i--) {
            val = valOf[s[i]];
            if (val < max_val) {
                res -= val;
            } else {
                max_val = val;
                res += val;
            }
        }
        return res;
    }
};
```

## 189 Rotate Array
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    void reverse(vector<int>& nums, int start, int end)
    {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
    void rotate(vector<int>& nums, int k)
    {
        k %= nums.size();
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
        return nums;
    }
};
```

## 238.array_product.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/product-of-array-except-self
class Solution {
public:
    // static vector<int> productExceptSelf(vector<int>& nums)
    // {
    //     int len = nums.size();
    //     vector<pair<int, int>> products(len);
    //     products[0] = make_pair(1, 1); // prefix, suffix
    //     products[len - 1] = make_pair(1, 1);
    //     for (int i = 1, j = nums.size() - 2; i < nums.size(); i++, j--) {
    //         products[i].first = products[i - 1].first * nums[i - 1];
    //         products[j].second = products[j + 1].second * nums[j + 1];
    //     }
    //     vector<int> ans(len);
    //     for (int k = 0; k < len; k++) {
    //         ans[k] = products[k].first * products[k].second;
    //     }
    //     return ans;
    // }

    static vector<int> productExceptSelf(vector<int>& nums)
    {
        // improved version
        int len = nums.size();
        vector<int> ans(len);
        ans[0] = 1; // prefixes
        for (int i = 1; i < len; i++) {
            ans[i] = ans[i - 1] * nums[i - 1];
        }
        int suffix = 1;
        for (int k = len - 2; k >= 0; k--) {
            suffix = suffix * nums[k + 1];
            ans[k] *= suffix;
        }
        return ans;
    }
};

int main()
{
    vector<int> nums = { 1, 2, 3, 4 };
    Solution solution;
    auto ans = solution.productExceptSelf(nums);
    for (int i = 0; i < ans.size(); i++)
        cout << ans[i] << " ";
    cout << endl;
}
```

## 26.Remove_Duplicate.cpp
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
        }
        return pos;
    }
};
```

## 27.Remove_Element.cpp
```cpp
#include <vector>
using namespace std;
int removeElement(vector<int>& nums, int val)
{
    int len = nums.size();
    int cnt = 0;
    for (auto it = nums.begin(), pos = nums.begin(); true; it++, pos++) {
        while (it != nums.end() && *it == val) {
            it++;
            cnt++;
        }
        if (it == nums.end())
            break;
        *pos = *it;
    }
    return len - cnt;
}

int main()
{
    vector<int> nums = { 0, 1, 2, 2, 3, 0, 4, 2 };
    int t = removeElement(nums, 2);
}
```

## 383.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine)
    {
        int bucket[256];
        for (int i = 0; i < 256; i++)
            bucket[i] = 0;
        for (int i = 0; i < magazine.length(); i++) {
            bucket[magazine[i]]++;
        }
        for (int i = 0; i < ransomNote.length(); i++) {
            bucket[ransomNote[i]]--;
        }
        for (int i = 0; i < 256; i++)
            if (bucket[i] < 0)
                return false;
        return true;
    }
};
```

## 55.cpp
```cpp
#include <vector>
using namespace std;
int removeElement(vector<int>& nums, int val)
{
    int len = nums.size();
    int cnt = 0;
    for (auto it = nums.begin(), pos = nums.begin(); true; it++, pos++) {
        while (it != nums.end() && *it == val) {
            it++;
            cnt++;
        }
        if (it == nums.end())
            break;
        *pos = *it;
    }
    return len - cnt;
}

int main()
{
    vector<int> nums = { 0, 1, 2, 2, 3, 0, 4, 2 };
    removeElement(nums, 2);
    return 0;
}
```

## 6.zigzag-conversion.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/zigzag-conversion

class Solution {
public:
    string convert(string s, const int numRows)
    {
        const int len = s.length();
        if (numRows == 1 || numRows > len)
            return s;
        string ans;
        const int period = 2 * numRows - 2;
        for (int j = 0; j < len; j += period)
            ans += s[j];
        for (int i = 1; i < numRows - 1; i++) {
            for (int cnt = 0, j = 0; i + j < len; cnt++) {
                ans += s[i + j];
                j += (cnt & 1) ? (2 * i) : (period - 2 * i);
            }
        }
        for (int j = numRows - 1; j < len; j += period)
            ans += s[j];
        return ans;
    }
};
```

## 68.text-justification.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/text-justification

class Solution {
    vector<string>* words;
    int maxWidth;

public:
    Solution() { }
    Solution(vector<string>& words, const int maxWidth)
    {
        this->words = &words;
        this->maxWidth = maxWidth;
    }
    vector<string> fullJustify(vector<string>& words, const int maxWidth)
    {
        this->words = &words;
        this->maxWidth = maxWidth;
        vector<string> ans;
        const int size = words.size();
        int begin = 0;
        int cumsum = 0;
        int count_words = 0;
        for (int i = 0; i < size - 1; i++) {
            if (cumsum + count_words + words[i].length() > maxWidth) {
                ans.push_back(createFullLine(begin, i - 1));
                cumsum = 0;
                count_words = 0;
                begin = i;
            }
            cumsum += words[i].length();
            count_words++;
        }
        if (cumsum + count_words + words[size - 1].length() > maxWidth) {
            ans.push_back(createFullLine(begin, size - 2));
            begin = size - 1;
        }
        ans.push_back(createLeftLine(begin, size - 1));
        return ans;
    }
    string createLeftLine(const int begin, const int end)
    {
        string line = "";
        for (int i = begin; i <= end - 1; i++) {
            line += (*words)[i];
            line += ' ';
        }
        line += (*words)[end];
        while (line.length() < maxWidth)
            line += ' ';
        return line;
    }
    string createFullLine(const int begin, const int end)
    {
        string line = "";
        const int cnt_space = end - begin;
        if (cnt_space == 0) {
            line += (*words)[begin];
            while (line.length() < maxWidth)
                line += ' ';
            return line;
        }
        int wordLength = 0;
        for (int i = begin; i <= end; i++)
            wordLength += (*words)[i].length();
        const int totalSpaceWidth = maxWidth - wordLength;
        const int short_space_len = totalSpaceWidth / cnt_space;
        const int cnt_long_space = totalSpaceWidth % cnt_space;
        string short_space;
        for (int i = 0; i < short_space_len; i++)
            short_space += ' ';
        for (int j = begin; j <= end - 1; j++) {
            line += (*words)[j];
            line += short_space;
            if (j - begin < cnt_long_space)
                line += ' ';
        }
        line += (*words)[end];
        return line;
    }
};

int main()
{
    vector<string> s = { "Science", "is", "what", "we" };
    const int maxWidth = 20;
    Solution* sol = new Solution(s, 20);
    cout << sol->createFullLine(0, 3);
    return 0;
}
```

## 88.Merge.cpp
```cpp
#include <vector>
using namespace std;
class Solution
{
public:
    void merge(vector<int> &nums1, int m, vector<int> &nums2, int n)
    {
        int i, j, pos;
        for (i = m + n - 1; i >= n; i--)
        {
            nums1[i] = nums1[i - n];
        }
        for (i = n, j = 0, pos = 0; i < m + n && j < n;)
        {
            if (nums1[i] < nums2[j])
                nums1[pos++] = nums1[i++];
            else
                nums1[pos++] = nums2[j++];
        }
        while (i < m + n)
            nums1[pos++] = nums1[i++];
        while (j < n)
            nums1[pos++] = nums2[j++];
    }
};
```

## 9.Palindrome_Number.cpp
```cpp
#include <string>
using std::string;
class Solution {
public:
    bool isPalindrome(int x)
    {
        string s(std::to_string(x));
        for (int i = 0, j = s.length() - 1; i < j; i++, j--)
            if (s[i] != s[j])
                return false;
        return true;
    }
};
```

