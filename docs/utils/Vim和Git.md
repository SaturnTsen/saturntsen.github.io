---
title: Vim和Git
createTime: 2024/12/21 18:38:03
permalink: /utils/Vim-and-Git/
---

# 笔记

## 目录
- [Vim](#vim)
  - [移动](#vim-移动)
  - [编辑](#vim-编辑)
  - [撤销重做](#vim-撤销重做)
  - [Visual mode](#vim-visual-mode)
  - [搜索替换](#vim-搜索替换)
  - [页面分割](#vim-页面分割)
  - [详见 vim Cheatsheet](#vim-详见-vim-cheatsheet)
- [Git](#git)
  - [Git 的命令行接口](#git-git-的命令行接口)
  - [基础](#git-基础)
  - [分支和合并](#git-分支和合并)
  - [远端操作](#git-远端操作)
  - [撤销](#git-撤销)
  - [Git 高级操作](#git-git-高级操作)
- [ltrace, dtrace](#ltrace-dtrace)
- [Clangd, clang-format](#clangd-clang-format)
  - [详见clang-format配置文件](#clangd-详见clang-format配置文件)

---

## Vim

### 移动
- `0`：跳转至本行开头  
- `$`：跳转至行尾  
- `^`：跳转至本行第一个非空格字符  
- `g_`：跳转至本行最后一个非空格字符  
- `w`：移动到下一个单词开头  
- `b`：移动到上一个单词开头  
- `e`：移动到上一个单词结尾  
- `ge`：移动到下一个单词结尾  
- `W`：移动到下一个字符串开头  
- `B`：移动到上一个字符串开头  
- `g~`：大小写互换  
- `G`：跳到最后一行  
- `gg`：跳到第一行  
- `ngg`：跳到第n行  
- `}`：向下跳过一整段  
- `{`：向上跳过一整段  
- `CTRL-D`：向下翻半页  
- `CTRL-U`：向上翻半页  
- `gd`：前往定义  
- `gf`：前往文件（光标下的文件）

### 编辑
- `c`：剪切并编辑  
- `d`：剪切  
- `x`：删除  
- `y`：复制  
- `p`：粘贴  
- `o`：下方插入  
- `O`：上方插入  
- `J`：合并下一行  
- `g~`：切换大小写  
- `>`：右移  
- `<`：左移  
- `=`：格式化  
- `{operator}{count}{motion}`：对选中文本应用操作

### 撤销重做
- `u`：撤销  
- `Ctrl+R`：重做

### Visual mode
- `Ctrl+V`：切换为可视模式  
- `I`：在光标前插入  
- `A`：在光标后插入

### 搜索替换
- `:[range]/[pattern]/[replacement]/mode`：替换指定范围内的模式  
- `/{pattern}`：向前搜索  
- `?{pattern}`：向后搜索  
- `/`：重复上次搜索（向前）  
- `?`：重复上次搜索（向后）  
- `n`：前往下一个匹配项  
- `N`：前往上一个匹配项  
- 例：`:%/[pattern]/replacement/gc`：在全文范围(%)匹配所有内容(g-global)，逐个确认并替换  
- `4f{字符}`：跳转到第四次出现字符的位置

### 页面分割
- `:sp file`：水平分割页面  
- `:vsp file`：垂直分割页面  

详见 vim Cheatsheet。

---

## Git

### Git 的命令行接口
为了避免重复信息，我们将不会详细解释以下命令行。  
强烈推荐您阅读 Pro Git 中文版。

### 基础
- `git help <command>`：获取 git 命令的帮助信息  
- `git init`：创建一个新的 git 仓库，其数据会存放在一个名为 .git 的目录下  
- `git status`：显示当前的仓库状态  
- `git add <filename>`：添加文件到暂存区  
- `git commit`：创建一个新的提交  
  - 如何编写良好的提交信息  
  - 为何要编写良好的提交信息  
- `git log`：显示历史日志  
- `git log --all --graph --decorate`：可视化历史记录（有向无环图）  
- `git diff <filename>`：显示与暂存区文件的差异  
- `git diff <revision> <filename>`：显示某个文件两个版本之间的差异  
- `git checkout <revision>`：更新 HEAD 和目前的分支

### 分支和合并
- `git branch`：显示分支  
- `git branch <name>`：创建分支  
- `git checkout -b <name>`：创建分支并切换到该分支（相当于 `git branch <name>`; `git checkout <name>`）  
- `git merge <revision>`：合并到当前分支  
- `git mergetool`：使用工具来处理合并冲突  
- `git rebase`：将一系列补丁变基为新的基线

### 远端操作
- `git remote`：列出远端  
- `git remote add <name> <url>`：添加一个远端  
- `git push <remote> <local branch>:<remote branch>`：将对象传送至远端并更新远端引用  
- `git branch --set-upstream-to=<remote>/<remote branch>`：创建本地和远端分支的关联关系  
- `git fetch`：从远端获取对象/索引  
- `git pull`：相当于 `git fetch`；`git merge`  
- `git clone`：从远端下载仓库

### 撤销
- `git commit --amend`：编辑提交的内容或信息  
- `git reset HEAD <file>`：恢复暂存的文件  
- `git checkout -- <file>`：丢弃修改  
- `git restore`：git2.32版本后取代 `git reset` 进行许多撤销操作

### Git 高级操作
- `git config`：Git 是一个高度可定制的工具  
- `git clone --depth=1`：浅克隆（不包括完整的版本历史信息）  
- `git add -p`：交互式暂存  
- `git rebase -i`：交互式变基  
- `git blame`：查看最后修改某行的人  
- `git stash`：暂时移除工作目录下的修改内容  
- `git bisect`：通过二分查找搜索历史记录  
- `.gitignore`：指定故意不追踪的文件

---

## ltrace, dtrace

---

## Clangd, clang-format

详见 clang-format 配置文件。
