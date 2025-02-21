---
title: Tree
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/tree/
---
## 104.DFS.cpp
```cpp
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
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maxDepth(TreeNode* root)
    {
        // if(root == nullptr)
        //     return 0;
        // else if(root->right == nullptr)
        //     return maxDepth(root->left) + 1;
        // else if(root->left == nullptr)
        //     return maxDepth(root->right) + 1;
        // return max(maxDepth(root->left),maxDepth(root->right))+1;

        if (root == nullptr)
            return 0;
        int max_depth = 0;
        auto stk = new stack<pair<TreeNode*, int>>;
        stk->push({ root, 1 });
        while (!stk->empty()) {
            auto [node, depth] = stk->top();
            stk->pop();
            max_depth = max(max_depth, depth);
            if (node->left)
                stk->push({ node->left, depth + 1 });
            if (node->right)
                stk->push({ node->right, depth + 1 });
        }
        delete stk;
        return max_depth;
    }
};
```

