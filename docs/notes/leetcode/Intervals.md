---
title: Intervals
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/intervals/
---
## 228.SummaryRanges.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/summary-ranges/
// Difficulty: Easy

class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums)
    {
        vector<string> ans;
        int len = nums.size();
        for (int i = 0, j = 0; i < len; i = j) {
            j = i + 1;
            while (j < len && nums[j] == nums[j - 1] + 1)
                j += 1;
            string l = to_string(nums[i]), r = to_string(nums[j - 1]);
            ans.push_back(nums[i] == nums[j - 1] ? l : l + "->" + r);
        }
        return ans;
    }
};
```

## 452.MinimumNumBalloon.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link:
// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/

// Analysis: Greedy Algorithm
// - Sort the points by the start position
// - For each point, we can shoot an arrow to the position bewtween the start
// and end position
// - For the next one, if we can shoot the arrow in the same interval
//      continue to use the same arrow, and contract the start and end position
// - If we cannot shoot the arrow in the same interval
//       we need to use another arrow

// The keypoint is to prove the effectiveness of the greedy algorithm
// This can be proved by the fact that shooting the arrow in the interval at the
// start position and end position does not affect the result, since the current
// interval is either grouped with the previous interval or the next interval.

typedef vector<int> Point;
class Solution {
public:
    int findMinArrowShots(vector<Point>& points)
    {
        sort(points.begin(), points.end(),
            [](Point& p1, Point& p2) { return p1[0] < p2[0]; });
        // for (Point& p: points)
        //     cout<< std::format("[{},{}] ", p[0], p[1]);
        // cout << endl;
        const int len = points.size();
        int ans = 0;
        for (int i = 0, idx = 0; i < len; i = idx) {
            int left = points[i][0], right = points[i][1];
            idx = i + 1;
            // cout << std::format("left={}, right={}", left, right) << endl;
            while (idx < len && points[idx][0] <= right) {
                left = max(left, points[idx][0]);
                right = min(right, points[idx][1]);
                idx++;
            }
            ans += 1;
        }
        return ans;
    }
};
```

## 56.MergeIntervals.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/merge-intervals/
// Difficulty: Medium
// Problem: Given an array of intervals where intervals[i] = [starti, endi],
//          merge all overlapping intervals, and return an array of the non-overlapping
//          intervals that cover all the intervals in the input.
// Example: Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
//          Output: [[1,6],[8,10],[15,18]]
//          Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
// Example2: Input: intervals = [[1,4],[4,5]]
//           Output: [[1,5]]
//           Explanation: Intervals [1,4] and [4,5] are considered overlapping.

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals)
    {
        vector<vector<int>> ans;
        int len = intervals.size();
        int begin, end, next_left, next_right;
        sort(intervals.begin(), intervals.end(),
            [](const vector<int>& a, const vector<int>& b) { return a[0] < b[0]; });
        for (int idx = 0, idx_r = 0; idx < len; idx = idx_r) {
            begin = intervals[idx][0];
            end = intervals[idx][1];
            idx_r = idx + 1;
            while (idx_r < len) {
                next_left = intervals[idx_r][0];
                next_right = intervals[idx_r][1];
                if (end < next_left) break;
                end = max(end, next_right);
                idx_r++;
            }
            ans.push_back({ begin, end });
        }
        return ans;
    }
};

// Approach: Sort the intervals based on the start time. Then iterate through the intervals
```

## 57.InsertInterval.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/insert-interval/
// Difficulty: Hard
// Analysis: The most difficult part of this problem is to treat different
// boundary cases when inserting the new interval.
class Solution {
public:
    vector<vector<int>> insert(
        vector<vector<int>>& intervals, vector<int>& newInterval)
    {
        const int len = intervals.size();
        if (len == 0) {
            intervals.push_back(newInterval);
            return intervals;
        }
        int begin = 0, end = 0;
        // the intervals between the indices [begin, end) shall be removed.

        // IMPORTANT: Clearly defining the left and right boundaries helps to
        // avoid confusion.
        int left, right; // add the interval [left, right] to ans
        if (newInterval[0] < intervals[0][0]) {
            // if newInterval[0] is strictly less than the first interval
            begin = 0;
        } else
            for (int i = 0; i < len; i++) {
                if (intervals[i][0] <= newInterval[0]
                    && newInterval[0] <= intervals[i][1]) {
                    // newInterval[0] is in the closed interval
                    left = intervals[i][0];
                    begin = i;
                    break;
                }
                if (i + 1 == len
                    || (intervals[i][1] < newInterval[0]
                        && newInterval[0] < intervals[i + 1][0])) {
                    // newInterval[0] is situated in between two intervals or at
                    // the end of all intervals
                    left = newInterval[0];
                    begin = i + 1;
                    break;
                }
            }
        // cout << "left="<<left << " begin=" << begin << endl;

        // end index of removal
        if (begin == len || newInterval[1] < intervals[begin][0]) {
            // if newInterval[1] is strictly less than the first interval, or we
            // have reached the end
            right = newInterval[1];
            end = begin - 1;
        } else
            for (int j = begin; j < len; j++) {
                // newInterval[1] is in the closed interval
                if (intervals[j][0] <= newInterval[1]
                    && newInterval[1] <= intervals[j][1]) {
                    right = intervals[j][1];
                    end = j;
                    break;
                }
                if (j + 1 == len
                    || (intervals[j][1] < newInterval[1]
                        && newInterval[1] < intervals[j + 1][0])) {
                    // newInterval[1] is in between two intervals, or at the end
                    // of all intervals
                    right = newInterval[1];
                    end = j;
                    break;
                }
            }
        // cout << "right="<<right << " end=" << end << endl;

        // construct the answer
        vector<vector<int>> ans;
        for (int i = 0; i < begin; i++)
            ans.push_back(intervals[i]);
        ans.push_back({ left, right });
        for (int i = end + 1; i < len; i++)
            ans.push_back(intervals[i]);
    }
};
```

