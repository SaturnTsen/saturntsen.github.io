---
title: Tree
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/tree/
---

## 104 DFS
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

## 105 Construct Binary Tree from Preorder and Inorder Traversal

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* build(
        vector<int>& preorder, int l_pre, int r_pre,
        unordered_map<int, int>& indexOf, int l_in, int r_in
    ) {
        // [l_pre, r_pre) of preorder
        // [l_in, r_in) of inorder
        if (l_pre >= r_pre) return nullptr;
        
        // build root
        int val = preorder.at(l_pre);
        TreeNode* root = new TreeNode(val);

        // get idx of val in the inorder array
        int idx = indexOf[val];
        // left subtree size
        int length_l = idx - l_in;
        // right subtree size
        int length_r = r_in - idx - 1;

        root -> left = build(preorder, l_pre + 1, l_pre + 1 + length_l,
                             indexOf, l_in, idx);
        root -> right = build(preorder, l_pre + 1 + length_l, r_pre,
                             indexOf, idx + 1, r_in);
        return root;
    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> indexOf;
        for (int idx = 0; idx < inorder.size(); ++idx) {
            indexOf[inorder[idx]] = idx;
        }
        return build(preorder, 0, preorder.size(),
                    indexOf, 0, inorder.size());
    }
};
```

