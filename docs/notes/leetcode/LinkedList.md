---
title: LinkedList
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/linkedlist/
---

## 141 LinkedListCycle

该题是一个链表中是否有环的问题，可以使用哈希表或者快慢指针来解决。

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

## 2 Add

该题是一个链表的加法，需要注意进位的处理。

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

## 876 Middle

该题引入一个核心想法，即快慢指针。

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

## 82 RemoveDuplicates

该题难度中偏易，需要处理头部节点和尾部节点为空的特殊情况。

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    void printall(ListNode* head) {
        while (head) {
            cout << head->val << " ";
            head = head->next;
        }
        cout << endl;
    }
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* prior = new ListNode();  // the node prior to begin
        ListNode* real_head = prior; // real list head
        ListNode* begin = head; // position from which the deletion starts
        ListNode* end; // position at which the deletion stops, not inclduing this node
        prior -> next = head; // a placehoder node at the beginning
        while (begin) {
            end = begin->next;
            // if duplicates are detected
            if(end && end->val == begin->val) {
                // search for the ending
                while (end && end -> val == begin-> val) {
                    end = end -> next;
                }
                // deletion
                // cout << "begin: " << begin->val  << " end: " << (end ? end->val : -1) <<endl;
                ListNode* start = begin;
                while (start != end) {
                    ListNode* ptr = start;
                    start = start -> next;
                    delete ptr;
                }
                // concat
                prior -> next = end;
            // if no duplicates
            } else {
                prior = prior -> next;
            }
            // always set begin to prior -> next to detect duplicates
            begin = prior -> next;
            // printall(real_head);
        }
        ListNode* ret = real_head->next;
        delete real_head;
        return ret;
    }
};
```