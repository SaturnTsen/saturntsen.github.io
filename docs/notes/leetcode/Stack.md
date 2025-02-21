---
title: Stack
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/stack/
---
## 150.ReversePolishNotation.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link:
// https://leetcode.com/problems/evaluate-reverse-polish-notation/

class Solution {
public:
    int op(char token, int loperand, int roperand)
    {
        switch (token) {
        case '+':
            return loperand + roperand;
        case '-':
            return loperand - roperand;
        case '*':
            return loperand * roperand;
        case '/':
            return loperand / roperand;
        }
        return 1 << 30;
    }
    int evalRPN(vector<string>& tokens)
    {
        stack<int> mem;
        int loperand, roperand;
        for (string& token : tokens) {
            if (token.length() == 1 && !isdigit(token[0])) {
                roperand = mem.top();
                mem.pop();
                loperand = mem.top();
                mem.pop();
                mem.push(op(token[0], loperand, roperand));
            } else {
                mem.push(stoi(token));
            }
        }
        return mem.top();
    }
};
```

## 155.MinStack.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/min-stack/
class MinStack {
    stack<int> data_;
    stack<int> min_;

public:
    MinStack() { }

    void push(int val)
    {
        if (data_.empty()) {
            min_.push(val);
            data_.push(val);
            return;
        }
        data_.push(val);
        min_.push(std::min(min_.top(), val));
    }

    void pop()
    {
        data_.pop();
        min_.pop();
    }

    int top() { return data_.top(); }

    int getMin() { return min_.top(); }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

## 20.Valid_Parentheses.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/valid-parentheses

class Solution {
public:
    bool isValid(string s)
    {
        stack<char> st;
        char top;
        for (char c : s) {
            switch (c) {
            case ')':
                top = '(';
                break;
            case ']':
                top = '[';
                break;
            case '}':
                top = '{';
                break;
            default:
                st.push(c);
                continue;
            }
            if (st.empty() || st.top() != top)
                return false;
            st.pop();
        }
        return st.empty();
    }
};
```

## 224.BasicCalculator.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/basic-calculator/

class Solution {
    map<char, int> pre
        = { { '(', 0 }, { '+', 1 }, { '-', 1 }, { '*', 2 }, { '/', 2 } };

private:
    stack<char> ops;
    stack<int> nums;

    void executeBinOperator(char op)
    {
        int num2 = nums.top();
        nums.pop();
        int num1 = nums.top();
        nums.pop();
        if (op == '+') {
            nums.push(num1 + num2);
        } else if (op == '-') {
            nums.push(num1 - num2);
        } else if (op == '*') {
            nums.push(num1 * num2);
        } else if (op == '/') {
            nums.push(num1 / num2);
        }
    }

public:
    int calculate(string s)
    {
        s.erase(std::remove(s.begin(), s.end(), ' '), s.end());
        cout << "s: " << s << endl;
        nums = stack<int>();
        ops = stack<char>();
        for (int i = 0; i < s.size(); i++) {
            char op = s[i];
            if (isdigit(op)) {
                int j = i;
                while (j < s.size() && isdigit(s[j]))
                    j++;
                nums.push(stoi(s.substr(i, j - i)));
                i = j - 1;
                continue;
            }
            if (op == '(') {
                ops.push('(');
                continue;
            }
            if (op == ')') {
                while (ops.top() != '(') {
                    executeBinOperator(ops.top());
                    ops.pop();
                }
                ops.pop();
                continue;
            }
            if (op == '-' && (i == 0 || s[i - 1] == '(')) { nums.push(0); }
            while (!ops.empty() && pre[ops.top()] >= pre[op]) {
                executeBinOperator(ops.top());
                ops.pop();
            }
            ops.push(op);
        }
        while (!ops.empty()) {
            executeBinOperator(ops.top());
            ops.pop();
        }
        return nums.top();
    }
};

int main()
{
    Solution sol;
    vector<string> tests
        = { "1 + 1", " 2-1 + 2 ", "(1+(4*5+2)-3)+(6+8)", "2+(-1)" };
    for (string& s : tests) {
        int ans = sol.calculate(s);
        cout << "result = " << ans << endl;
    }
    return 0;
}
```

## 71.Simplify_path.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/simplify-path/
// Difficulty: Easy
// Analysis: A simple implementation of stack

struct stack_str {
    vector<string> v;
    int top;
    // stack content: [0, top)
    // top == 0 <-> empty stack
    stack_str() { top = 0; }
    void push(string s)
    {
        if (top == v.size()) {
            v.push_back(s);
            top++;
            return;
        }
        v[top++] = s;
    }
    void pop()
    {
        if (top == 0) return;
        top--;
    }
    string getCwd()
    {
        string s = "";
        for (int i = 0; i < top; i++) {
            s += "/";
            s += v[i];
        }
        return s == "" ? "/" : s;
    }
};
class Solution {
public:
    string simplifyPath(string path)
    {
        int len = path.length();
        stack_str cwd;
        for (int begin = 0, end = 0; begin < len;) {
            if (path[begin] == '/') {
                begin++;
                continue;
            }
            end = begin + 1;
            // [begin, end)
            while (end < len && path[end] != '/')
                end++;
            string folder_name = path.substr(begin, end - begin);
            if (folder_name == "..")
                cwd.pop();
            else if (folder_name != ".")
                cwd.push(folder_name);
            begin = end;
        }
        return cwd.getCwd();
    }
};
```

## test.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link:

int main()
{
    unordered_set<int> s;
    auto key = s.find(1);
    if (key == s.end()) {
        cout << "Not found" << endl;
    } else {
        cout << "Found" << endl;
    }
    return 0;
}
```

