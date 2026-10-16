---
title: BST
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/bst/
---

## 230.KthSmallestElement.cpp
```cpp
//  Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() :
        val(0), left(nullptr), right(nullptr) { }
    TreeNode(int x) :
        val(x), left(nullptr), right(nullptr) { }
    TreeNode(int x, TreeNode* left, TreeNode* right) :
        val(x), left(left), right(right) { }
};
class Solution {
public:
    int ans = -1, count = 0;
    void kth_smallest(TreeNode* root, int k)
    {
        if (ans != -1) return;
        if (root->left) {
            kth_smallest(root->left, k);
        }
        count += 1;
        if (count == k) {
            ans = root->val;
            return;
        }
        if (root->right) {
            kth_smallest(root->right, k);
        }
        return;
    }
    int kthSmallest(TreeNode* root, int k)
    {
        kth_smallest(root, k);
        return ans;
    }
};
```

## 530.MinimumAbsoluteDifference.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/minimum-absolute-difference-in-bst/

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() :
        val(0), left(nullptr), right(nullptr) { }
    TreeNode(int x) :
        val(x), left(nullptr), right(nullptr) { }
    TreeNode(int x, TreeNode* left, TreeNode* right) :
        val(x), left(left), right(right) { }
};

const int INF = 1 << 20;
struct triplet {
    int min, max, diff;
    triplet(int min, int max, int diff) :
        min(min), max(max), diff(diff) { }
};
int min(const int& a, const int& b, const int& c)
{
    int t = a;
    t = (t < b) ? t : b;
    t = (t < c) ? t : c;
    return t;
}
class Solution {
public:
    triplet getMinMaxDiff(TreeNode* tree)
    {
        triplet res(tree->val, tree->val, INF);
        if (tree->left) {
            triplet res_left(getMinMaxDiff(tree->left));
            res.min = min(res_left.min, res.min);
            res.diff = min(res.diff, res_left.diff, tree->val - res_left.max);
        }
        if (tree->right) {
            triplet res_right(getMinMaxDiff(tree->right));
            res.max = max(res_right.max, res.max);
            res.diff = min(res.diff, res_right.diff, res_right.min - tree->val);
        }
        return res;
    }
    int getMinimumDifference(TreeNode* root)
    {
        return getMinMaxDiff(root).diff;
    }
};
```

## 98.ValidateBST.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/validate-binary-search-tree/

/**
 * Definition for a binary tree node.
*/

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() :
        val(0), left(nullptr), right(nullptr) { }
    TreeNode(int x) :
        val(x), left(nullptr), right(nullptr) { }
    TreeNode(int x, TreeNode* left, TreeNode* right) :
        val(x), left(left), right(right) { }
};

class Solution {
public:
    bool isInvalid;
    pair<int, int> Search(TreeNode* root)
    {
        if (isInvalid)
            return { -1, -1 };
        int min = root->val, max = root->val;
        if (root->left) {
            pair<int, int> left_min_max = Search(root->left);
            isInvalid = isInvalid || left_min_max.second >= root->val;
            min = std::min(min, left_min_max.first);
        }
        if (root->right) {
            pair<int, int> right_min_max = Search(root->right);
            isInvalid = isInvalid || right_min_max.first <= root->val;
            max = std::max(max, right_min_max.second);
        }
        return { min, max };
    }
    bool isValidBST(TreeNode* root)
    {
        isInvalid = false;
        Search(root);
        return !isInvalid;
    }
};
```

