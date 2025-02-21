---
title: SlidingWindow
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/slidingwindow/
---
## 209.MinimumSizeSubarraySum.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/minimum-size-subarray-sum/

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums)
    {
        int left = 0, right = 0, sum = 0, ans = nums.size() + 1;
        // scan all subarrays whose sum is greater than or equal to target
        while (right < nums.size()) {
            sum += nums[right++];
            while (left <= right && sum >= target) {
                ans = min(ans, right - left);
                sum -= nums[left++];
            }
        }
        return ans == nums.size() + 1 ? 0 : ans;
    }
};
```

## 3.LongestSubstringWithoutRepeatingCharacters.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/longest-substring-without-repeating-characters

class Solution {
public:
    int lengthOfLongestSubstring(string s)
    {
        int left = 0, right = 0, len = 0;
        bool flag = false;
        vector<int> cnt(256);
        while (left <= right && left < s.length() && right <= s.length()) {
            while (right < s.length() && cnt[s[right]] == 0)
                cnt[s[right++]] += 1;
            len = max(len, right - left);
            while (left < right && right < s.length() && cnt[s[right]] != 0) {
                cnt[s[left++]] -= 1;
                flag = true;
            }
            if (!flag)
                break;
        }
        return len;
    }
};

int main()
{
    string s = "abcabcbb";
    Solution sol;
    cout << sol.lengthOfLongestSubstring(s) << endl;
    return 0;
}

```

## 30.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/substring-with-concatenation-of-all-words/
class Solution {
public:
    bool isPermutation(
        string& s,
        unordered_map<string, int>& dict,
        vector<int>& maximum,
        const int begin, const int end,
        const int len_word, const int targets)
    {
        vector<int> used(dict.size());
        std::fill(used.begin(), used.end(), 0);
        for (int i = begin; i < end; i += len_word) {
            auto key = dict.find(s.substr(i, len_word));
            if (key == dict.end())
                return false;
            int token = key->second;
            if (used[token] < maximum[token]) {
                used[token]++;
            } else {
                return false;
            }
        }
        return true;
    }
    vector<int> findSubstring(string s, vector<string>& words)
    {
        const int len_str = s.length(); // len
        const int len_word = words[0].length();
        const int len_words = words.size();

        // create hash map
        unordered_map<string, int> dict; // dict
        for (int i = 0, idx = 0; i < len_words; i++)
            if (dict.find(words[i]) == dict.end())
                dict[words[i]] = (idx++);
        // maximum count of each word
        vector<int> maximum(dict.size());
        std::fill(maximum.begin(), maximum.end(), 0);
        for (int i = 0; i < len_words; i++)
            maximum[dict[words[i]]]++;

        vector<int> ans; // ans
        for (int begin = 0, end = len_words * len_word; end <= len_str; begin++, end++) {
            // find all possible beginnings and endings
            if (isPermutation(s, dict, maximum, begin, end, len_word, len_words)) {
                ans.push_back(begin);
            }
        }
        return ans;
    }
};

int main()
{
    // string s = "barfoofoobarthefoobarmanmanafoobarthemanmanbarthefoo";
    // vector<string> words = { "bar", "foo", "the" };
    string s = "wordgoodgoodgoodbestword";
    vector<string> words = { "word", "good", "best", "good" };
    // string s = "aaawordgoodgoodgoodbestwordaaaawordbestgoodgoodwordaaaaaword";
    // vector<string> words = { "word", "good", "best", "good" };
    // string s = "aaaaaaaaaaaaaa";
    // vector<string> words = { "aa", "aa" };
    Solution sol;
    vector<int> ans = sol.findSubstring(s, words);
    if (ans.size() == 0) {
        cout << "No solution" << endl;
        return 0;
    }
    for (int i = 0; i < ans.size(); i++)
        cout << ans[i] << " ";
    cout << endl;
    return 0;
}
```

## 30_WA.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/substring-with-concatenation-of-all-words/

class Solution {
public:
    void findPermutation(vector<int>& ans, vector<int>& arr,
        vector<int>& maximum,
        const int begin, const int end,
        const int lendict, const int lenwrd)
    {
        // [begin, end)
        int left = begin, right = begin; // [left, right)
        vector<int> used(lendict);
        std::fill(used.begin(), used.end(), false);
        while (left < end) {
            while (right < end && used[arr[right]] < maximum[arr[right]]) // extend
                used[arr[right++]]++;
            if (right - left == lendict)
                ans.push_back(left * lenwrd);
            used[arr[left++]]--; // contract
        }
    }
    vector<int> findSubstring(string s, vector<string>& words)
    {
        const int lenstr = s.length(); // len
        const int lenwrd = words[0].length();
        const int lendict = words.size();
        const int lenarr = lenstr / lenwrd;

        // create hash map
        unordered_map<string, int> dict; // dict
        for (int i = 0, idx = 0; i < lendict; i++)
            if (dict.find(words[i]) == dict.end())
                dict[words[i]] = (idx++);
        // maximum count of each word
        vector<int> maximum(dict.size());
        std::fill(maximum.begin(), maximum.end(), 0);
        for (int i = 0; i < lendict; i++)
            maximum[dict[words[i]]]++;

        // serialize the strings
        vector<int> arr(lenarr);
        std::fill(arr.begin(), arr.end(), 0);
        for (int i = 0, j = 0; i < lenstr; i += lenwrd, j++) {
            string wrd = std::move(s.substr(i, lenwrd));
            auto key = dict.find(wrd);
            if (key == dict.end())
                arr[j] = -1;
            else
                arr[j] = key->second;
        }

        vector<int> ans; // ans
        int begin = 0, end = 0; // Scan all possible substrings
        while (begin < lenarr) {
            // [begin, end)
            while (begin < lenarr && arr[begin] == -1)
                begin++;
            if (begin == lenarr) // if not found
                break;
            end = begin + 1;
            while (end < lenarr && arr[end] != -1)
                end++;
            findPermutation(ans, arr, maximum, begin, end, lendict, lenwrd);
            begin = end;
        }

        return ans;
    }
};

int main()
{
    // string s = "barfoofoobarthefoobarmanmanfoobarthemanmanfoo";
    // vector<string> words = { "bar", "foo", "the" };
    string s = "wordgoodgoodgoodbestword";
    vector<string> words = { "word", "good", "best", "good" };
    Solution sol;
    vector<int> ans = sol.findSubstring(s, words);
    for (int i = 0; i < ans.size(); i++)
        cout << ans[i] << " ";
    cout << endl;
    return 0;
}
```

## 30_WA2.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/substring-with-concatenation-of-all-words/
class Solution {
public:
    void findAllPermutations(
        vector<int>& ans,
        string& s,
        unordered_map<string, int>& dict,
        vector<int>& maximum,
        const int begin, const int end,
        const int len_word, const int targets)
    {
        if (end - begin < targets * len_word) return;
        int left = begin, right = begin;
        // [left, right) & empty if left == right
        vector<int> used(dict.size());
        std::fill(used.begin(), used.end(), 0);
        while (left + targets * len_word <= end) {
            while (right < end) {
                int token = dict.find(s.substr(right, len_word))->second;
                if (used[token] < maximum[token]) { // extend
                    used[token]++;
                    right += len_word;
                } else {
                    break;
                }
            }
            if (right - left == targets * len_word)
                ans.push_back(left);
            used[dict[s.substr(left, len_word)]]--;
            left += len_word;
        }
    }
    vector<int> findSubstring(string s, vector<string>& words)
    {
        const int len_str = s.length(); // len
        const int len_word = words[0].length();
        const int len_words = words.size();

        // create hash map
        unordered_map<string, int> dict; // dict
        for (int i = 0, idx = 0; i < len_words; i++)
            if (dict.find(words[i]) == dict.end())
                dict[words[i]] = (idx++);
        // maximum count of each word
        vector<int> maximum(dict.size());
        std::fill(maximum.begin(), maximum.end(), 0);
        for (int i = 0; i < len_words; i++)
            maximum[dict[words[i]]]++;

        vector<int> ans; // ans
        int begin = 0, end = 0; // Scan all possible substrings
        while (true) { // find all possible beginning and end
            // [begin, end)
            bool stop_flag = false;
            while (true) {
                if (begin + len_word > len_str) {
                    stop_flag = true;
                    break;
                }
                auto key = dict.find(s.substr(begin, len_word));
                if (key == dict.end()) { // not found
                    begin++;
                } else {
                    break;
                }
            }
            if (stop_flag)
                break;
            // [begin, end)
            end = begin + len_word;
            while (end <= len_str) {
                if (end + len_word > len_str) {
                    findAllPermutations(ans, s, dict, maximum,
                        begin, end, len_word, len_words);
                    break;
                }
                auto key = dict.find(s.substr(end, len_word));
                if (key != dict.end()) {
                    end += len_word;
                } else {
                    findAllPermutations(ans, s, dict, maximum,
                        begin, end, len_word, len_words);
                    break;
                }
            }
            end = begin;
        }
        return ans;
    }
};

int main()
{
    // string s = "barfoofoobarthefoobarmanmanafoobarthemanmanbarthefoo";
    // vector<string> words = { "bar", "foo", "the" };
    // string s = "wordgoodgoodgoodbestword";
    // vector<string> words = { "word", "good", "best", "word" };
    // string s = "aaawordgoodgoodgoodbestwordaaaawordbestgoodgoodwordaaaaaword";
    // vector<string> words = { "word", "good", "best", "good" };
    string s = "aaaaaaaaaaaaaa";
    vector<string> words = { "aa", "aa" };
    Solution sol;
    vector<int> ans = sol.findSubstring(s, words);
    if (ans.size() == 0) {
        cout << "No solution" << endl;
        return 0;
    }
    for (int i = 0; i < ans.size(); i++)
        cout << ans[i] << " ";
    cout << endl;
    return 0;
}
```

