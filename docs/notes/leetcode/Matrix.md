---
title: Matrix
createTime: 2025/02/21 15:20:47
permalink: /notes/leetcode/matrix/
---
## 289.Game_of_Life.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/game-of-life
#include <iostream>
#include <vector>

using namespace std;

vector<pair<int, int>> directions = {
    { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 },
    { -1, -1 }, { -1, 1 }, { 1, -1 }, { 1, 1 }
};

class Solution {
public:
    void gameOfLife(vector<vector<int>>& board)
    {
        // 0 -> 0: 0
        // 1 -> 0：1
        // 0 -> 1: 2
        // 1 —> 1: 3
        const int n = board.size(), m = board[0].size();
        for (int x = 0; x < n; x++) {
            for (int y = 0; y < m; y++) {
                int i, j;
                int cnt_neighbors = 0;
                for (auto direction : directions) {
                    i = x + direction.first;
                    j = y + direction.second;
                    if (0 <= i && i < n && 0 <= j && j < m && (board[i][j] & 1))
                        cnt_neighbors++;
                }
                if (board[x][y] & 1) {
                    // if alive
                    if (cnt_neighbors < 2)
                        board[x][y] = 1;
                    else if (cnt_neighbors <= 3)
                        board[x][y] = 3;
                    else
                        board[x][y] = 1;
                } else {
                    // if dead
                    if (cnt_neighbors == 3)
                        board[x][y] = 2;
                    else
                        board[x][y] = 0;
                }
            }
        }
        for (int x = 0; x < n; x++)
            for (int y = 0; y < m; y++)
                board[x][y] = (board[x][y] & 2) ? 1 : 0;
    }
};
```

## 36.Valid_Sudoku.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/valid-sudoku

class Solution {
public:
    void clear(bool arr[])
    {
        for (int i = 0; i < 9; i++)
            arr[i] = false;
    }
    bool isValidSudoku(vector<vector<char>>& board)
    {
        bool used[9];

        for (int i = 0; i < 9; i++) {
            clear(used);
            for (int j = 0; j < 9; j++)
                if (board[i][j] == '.')
                    continue;
                else if (used[board[i][j] - '0'])
                    return false;
                else
                    used[board[i][j] - '0'] = true;
        }
        for (int i = 0; i < 9; i++) {
            clear(used);
            for (int j = 0; j < 9; j++)
                if (board[j][i] == '.')
                    continue;
                else if (used[board[j][i] - '0'])
                    return false;
                else
                    used[board[j][i] - '0'] = true;
        }
        for (int i = 0; i < 9; i += 3) {
            for (int j = 0; j < 9; j += 3) {
                clear(used);
                for (int dx = 0; dx < 3; dx++)
                    for (int dy = 0; dy < 3; dy++)
                        if (board[j][i] == '.')
                            continue;
                        else if (used[board[j][i] - '0'])
                            return false;
                        else
                            used[board[j][i] - '0'] = true;
            }
        }

        return true;
    }
};
```

## 48.Rotate_Image.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/rotate-image

class Solution {
public:
    void swap(int& a, int& b)
    {
        int tmp;
        tmp = a;
        a = b;
        b = tmp;
    }
    void rotate(vector<vector<int>>& matrix)
    {
        int size = matrix.size();
        for (int i = 1; i < size; i++)
            for (int j = 0; j < i; j++)
                swap(matrix[i][j], matrix[j][i]);
        for (int j = 0; j < size / 2; j++)
            for (int i = 0; i < size; i++)
                swap(matrix[i][j], matrix[i][size - j - 1]);
    }
};
```

## 54.Spiral_Matrix.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/spiral-matrix/

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix)
    {
        int state = 0, n = matrix.size(), m = matrix[0].size();
        int directions[4][2] = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };
        int i = 0, j = 0;
        int stride_i = n, stride_j = m, stride = m - 1;
        vector<int> ans(n * m);
        int step = 0;
        ans[step++] = matrix[0][0];
        while (step < n * m) {
            // printf("stride %d\n", stride);
            for (int cnt = 0; cnt < stride; cnt++) {
                i += directions[state][0];
                j += directions[state][1];
                ans[step++] = matrix[i][j];
                // printf("%d %d %d %d\n",state, step, i, j);
            }
            if (state & 1) {
                stride_j--;
                stride = stride_j;
            } else {
                stride_i--;
                stride = stride_i;
            }
            state = (state + 1) % 4;
        }
        // 4*5: (4, 3, 4, 2, 3, 1, 2)
        // 5*8: (7, 4, 7, 3, 6, 2, 5, 1, 4)
        return ans;
    }
};
```

## 73.SetMatrixZeros.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

// Leetcode link: https://leetcode.com/problems/set-matrix-zeroes/

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix)
    {
        int n = matrix.size(), m = matrix[0].size();
        vector<bool> vec_row(n);
        vector<bool> vec_col(m);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] == 0) {
                    vec_row[i] = true;
                    vec_col[j] = true;
                }
            }
        }
        for (int i = 0; i < n; i++)
            if (vec_row[i])
                for (int j = 0; j < m; j++)
                    matrix[i][j] = 0;
        for (int j = 0; j < m; j++)
            if (vec_col[j])
                for (int i = 0; i < n; i++)
                    matrix[i][j] = 0;
    }
};
```

