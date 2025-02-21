---
title: LinkedList
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/linkedlist/
---
## 141.LinkedListCycle.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/linked-list-cycle/

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) { }
};

class Solution {
public:
    bool hasCycle(ListNode* head)
    // Floyd's Tortoise and Hare algorithm
    {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr and fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }

    bool hasCycle_plain(ListNode* head)
    {
        unordered_set<ListNode*> dict;
        while (head != nullptr) {
            auto query = dict.find(head);
            if (query != dict.end()) return true;
            dict.insert(head);
            head = head->next;
        }
        return false;
    }
};

```

## 2.Add.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode() :
        val(0), next(nullptr) { }
    ListNode(int x) :
        val(x), next(nullptr) { }
    ListNode(int x, ListNode* next) :
        val(x), next(next) { }
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2)
    {
        ListNode* head = new ListNode;
        ListNode* ptr = head;
        int p = 0;
        int v = 0;
        while (l1 != nullptr || l2 != nullptr || p != 0) {
            v = p;
            if (l1 != nullptr)
                v += l1->val;
            if (l2 != nullptr)
                v += l2->val;
            p = v / 10;
            v %= 10;
            ptr->next = new ListNode();
            ptr->next->val = v;
            ptr = ptr->next;
            if (l1 != nullptr)
                l1 = l1->next;
            if (l2 != nullptr)
                l2 = l2->next;
        }
        ListNode* ans = head->next;
        delete head;
        return ans;
    }
};
```

## 876.Middle.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode()
        : val(0)
        , next(nullptr)
    {
    }
    ListNode(int x)
        : val(x)
        , next(nullptr)
    {
    }
    ListNode(int x, ListNode* next)
        : val(x)
        , next(next)
    {
    }
};
class Solution {
public:
    ListNode* middleNode(ListNode* head)
    {
        if (head->next == nullptr)
            return head;
        ListNode *fast = head->next, *slow = head;
        while (fast) {
            fast = fast->next;
            slow = slow->next;
            if (fast)
                fast = fast->next;
        }
        return slow;
    }
};
```

