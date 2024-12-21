---
title: SSH 和 Tmux
tags:
  - utils
createTime: 2024/01/11 16:19:20
permalink: /utils/ssh-and-tmux/
---

## 1. SSH

### 1.1 安装 SSH Server
- 安装 SSH Server：  
  `apt install ssh-server`
- 查看服务端状态：  
  `service sshd status`

### 1.2 客户端配置
- 安装 SSH 客户端：  
  `apt install ssh-client`
- 生成 SSH 密钥：  
  `ssh-keygen -t rsa` （使用 rsa 算法生成密钥）
- 将公钥复制到远程服务器：  
  `ssh-copy-id [用户名]@[ip]`
- 设置密钥权限：  
  `chmod 0400 id_rsa`

### 1.3 连接
- 使用 SSH 连接远程服务器：
  `ssh -i ~/.ssh/id_rsa -p 999 root@140.143.18.32`
- 默认端口连接：
  `ssh -p [端口] [用户名]@[ip]`
- 使用 RSA 文件连接：
  `ssh -i [rsa文件] -p [端口] [用户名]@[ip]`
- 登出：  
  `logout`

### 1.4 导出日志
- 导出远程服务器日志：  
  `ssh root@47.116.28.185 journalctl > journal.txt`

---

## 2. VS Code SSH 配置

### 2.1 配置步骤
1. 编辑 SSH 配置文件：  
   `~/.ssh/config`
2. 配置内容示例：
   ```
   Host <myhost>
     HostName <myhost>
     User <remoteuser>
     Port 22
     PreferredAuthentications publickey
     IdentityFile "/Users/<localuser>/.ssh/keys/<myhost>_rsa"
   ```

3. 生成 SSH 密钥：  
   `ssh-keygen -q -b 2048 -P "" -f /Users/<localuser>/.ssh/keys/<myhost>_rsa -t rsa`
   - 生成两个文件：  
     `<myhost>_rsa`（私钥）  
     `<myhost>_rsa.pub`（公钥）

4. 将公钥 `<myhost>_rsa.pub` 复制到服务器的 `~/.ssh/authorized_keys` 文件中。  
   - 如果 `authorized_keys` 文件不存在，可以重命名 `<myhost>_rsa.pub` 为 `authorized_keys` 并设置权限：  
     `chmod 600 authorized_keys`

5. 连接测试：  
   在终端输入：  
   `ssh <remoteuser>@<myhost>`  
   无需输入密码即可登录。

---

## 3. tmux

### 3.1 Tmux 简介
- Tmux 是一个终端复用器（terminal multiplexer），允许在单一窗口中同时运行多个会话，并支持分离会话、共享会话等功能。
- 它的主要功能：
  1. 允许多个会话共用一个窗口。
  2. 支持在不同终端之间共享会话。
  3. 支持窗口的垂直和水平拆分。

### 3.2 安装 Tmux
- 在 Ubuntu 或 Debian 上安装：  
  `sudo apt-get install tmux`
- 在 CentOS 或 Fedora 上安装：  
  `sudo yum install tmux`
- 在 Mac 上安装：  
  `brew install tmux`

### 3.3 基本操作
- 启动 Tmux：  
  `tmux`
- 退出 Tmux：  
  `exit` 或按 `Ctrl+d`

### 3.4 前缀键
- 默认前缀键是 `Ctrl+b`，所有快捷键需先按 `Ctrl+b`，然后再按其他按键。
  - 示例：`Ctrl+b ?` 查看帮助。

### 3.5 会话管理
1. **新建会话**：  
   `tmux new -s <session-name>`
2. **分离会话**：  
   `Ctrl+b d` 或 `tmux detach`
3. **列出所有会话**：  
   `tmux ls`
4. **接入会话**：  
   `tmux attach -t <session-name>`
5. **杀死会话**：  
   `tmux kill-session -t <session-name>`
6. **切换会话**：  
   `tmux switch -t <session-name>`
7. **重命名会话**：  
   `tmux rename-session -t <session-name> <new-name>`

### 3.6 最简操作流程
1. 新建会话：  
   `tmux new -s my_session`
2. 在 Tmux 窗口运行程序。
3. 分离会话：  
   `Ctrl+b d`
4. 下次连接会话：  
   `tmux attach -t my_session`

### 3.7 窗格操作
1. **划分窗格**：
   - 垂直划分：  
     `Ctrl+b %`
   - 水平划分：  
     `Ctrl+b "`
2. **切换窗格**：
   - 上方窗格：  
     `Ctrl+b ↑`
   - 下方窗格：  
     `Ctrl+b ↓`
   - 左边窗格：  
     `Ctrl+b ←`
   - 右边窗格：  
     `Ctrl+b →`
3. **交换窗格位置**：
   - 上移：  
     `Ctrl+b U`
   - 下移：  
     `Ctrl+b D`
4. **关闭窗格**：  
   `Ctrl+b x`

### 3.8 窗口管理
1. **新建窗口**：  
   `Ctrl+b c`
2. **切换窗口**：
   - 上一个窗口：  
     `Ctrl+b p`
   - 下一个窗口：  
     `Ctrl+b n`
   - 切换到指定窗口：  
     `Ctrl+b <number>`
3. **重命名窗口**：  
   `Ctrl+b ,`

---

## 参考链接
- [Tmux 基本用法](https://www.ruanyifeng.com/blog/2019/10/tmux.html)