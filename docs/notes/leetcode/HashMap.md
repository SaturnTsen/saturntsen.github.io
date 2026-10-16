---
title: HashMap
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/hashmap/
---
## 1.TwoSum.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link:  https://leetcode.com/problems/two-sum/

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target)
    {
        unordered_map<int, int> dict;
        const int len = nums.size();
        for (int i = 0; i < len; i++) {
            int num = nums[i];
            auto key = dict.find(target - num);
            if (key != dict.end())
                return { key->second, i };
            dict[num] = i;
        }
        return { -1, -1 };
    }
};
```

## 128.LongestConsecutiveSequence.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/longest-consecutive-sequence/
// Difficulty: Medium

class Solution {
public:
    int longestConsecutive(vector<int>& nums)
    {
        unordered_map<int, bool> hash; // num, count
        for (int num : nums) {
            //     auto key = hash.find(num);
            //     if (key == hash.end())
            hash[num] = 0;
            //     key = hash.find(num - 1);
            //     if (key != hash.end())
            //         hash[num] = 1;
            //     key = hash.find(num + 1);
            //     if (key != hash.end())
            //         hash[num + 1] = 1;
        }
        int ans = 0;
        for (pair<const int, int> key : hash) {
            // if (key.second == 0) {
            if (hash.find(key.first - 1) == hash.end()) {
                int current_ans = 1;
                auto next = hash.find(key.first + 1);
                while (next != hash.end()) {
                    current_ans++;
                    next = hash.find(next->first + 1);
                }
                ans = max(ans, current_ans);
            }
        }
        return ans;
    }
};
```

## 202.HappyNumber.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/happy-number/

class Solution {
public:
    bool isHappy(int n)
    {
        unordered_map<long long, char> dict;
        long long num = n;
        long long tmp;
        while (num != 1) {
            dict[num] = 0;
            tmp = 0;
            while (num != 0) {
                int r = num % 10;
                tmp += r * r;
                num /= 10;
            }
            if (dict.find(tmp) != dict.end())
                return false;
            num = tmp;
        }
        return true;
    }
};
```

## 205.IsomorphicStrings.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/isomorphic-strings/

class Solution {
public:
    bool isIsomorphic(string s, string t)
    {
        if (s.length() != t.length()) return false;
        unordered_map<char, char> dict;
        unordered_map<char, char> reversed_dict;
        int len = s.length();
        for (int i = 0; i < len; i++) {
            auto key = dict.find(s[i]);
            auto key_ = reversed_dict.find(t[i]);
            if (key == dict.end() ^ key_ == reversed_dict.end())
                return false;
            if (key == dict.end()) {
                dict[s[i]] = t[i];
                reversed_dict[t[i]] = s[i];
                continue;
            }
            if (key->second != t[i] || key_->second != s[i]) {
                return false;
            }
        }
        return true;
    }
};
```

## 242.ValidAnagram.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/valid-anagram/
// Difficulty: Easy

class Solution {
public:
    bool isAnagram(string s, string t)
    {
        int count[26];
        fill(count, count + 26, 0);
        for (char c : s)
            count[c - 'a']++;
        for (char c : t)
            count[c - 'a']--;
        for (int c : count)
            if (c != 0)
                return false;
        return true;
    }
};
```

## 291.ContainsDuplicate2.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/contains-duplicate-ii/

class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k)
    {
        if (k == 0) return false;
        unordered_map<int, bool> dict;
        for (int i = 0; i < k + 1 && i < nums.size(); i++) {
            auto key = dict.find(nums[i]);
            if (key != dict.end()) {
                return true;
            }
            dict[nums[i]] = true;
        }
        for (int i = 0, j = k + 1; j < nums.size(); i++, j++) {
            dict[nums[i]] = 0;
            auto key = dict.find(nums[j]);
            if (key == dict.end()) {
                dict[nums[j]] = true;
            } else if (key->second) {
                return true;
            } else {
                dict[nums[j]] = true;
            }
        }
        return false;
    }
};
```

## 380.insert-delete-getrandom-o1.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/insert-delete-getrandom-o1

class RandomizedSet {
private:
    unordered_map<int, int> map; //map[val] = index
    vector<int> arr; // arr[index] = val
public:
    RandomizedSet()
    {
        srand(time(nullptr));
    }
    bool insert(int val)
    {
        if (this->map.contains(val))
            return false;
        arr.push_back(val);
        map[val] = arr.size() - 1;
        return true;
    }

    bool remove(int val)
    {
        if (!this->map.contains(val))
            return false;
        int index = map[val];
        int v = arr[arr.size() - 1];
        if (val == v) {
            map.erase(val);
            arr.pop_back();
        } else {
            map.erase(val);
            arr[index] = v;
            map[v] = index;
            arr.pop_back();
        }
        return true;
    }

    int getRandom()
    {
        int len = this->arr.size();
        return arr[rand() % len];
    }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```

## 383.RansomNote.cpp
```cpp
#include<bits/stdc++.h>
using namespace std;

// Leetcode link: 
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        array<int,256> cnt;
        fill(cnt.begin(), cnt.end(), 0);
        for (char c: magazine)
            cnt[c]++;
        for (char c: ransomNote) {
            cnt[c]--;
            if(cnt[c] < 0)
                return false;
        }
        return true;
    }
};
```

## 49.GroupAnagrams.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/group-anagrams/

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs)
    {
        int size = strs.size();
        unordered_map<string, vector<string>> dict;
        for (int i = 0; i < size; i++) {
            string str = strs[i];
            sort(str.begin(), str.end());
            dict[str].push_back(strs[i]);
        }
        vector<vector<string>> ans;
        for (auto& p : dict)
            ans.push_back(std::move(p.second));
        return ans;
    }
};

int main()
{
    Solution s;
    // vector<string> strs = { "eat", "tea", "tan", "ate", "nat", "bat" };
    vector<string> strs = { "" };
    vector<vector<string>> ans = s.groupAnagrams(strs);
    for (auto& v : ans) {
        for (auto& str : v)
            cout << str << " ";
        cout << endl;
    }
    return 0;
}
```

