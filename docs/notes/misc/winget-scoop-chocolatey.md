---
title: Package Managers
createTime: 2024/02/04 18:31:53
permalink: /notes/misc/winget-scoop-chocolatey/
---

## Windows 软件包管理器

### **choco (Chocolatey) 基本操作**

choco的地位等价于Linux的apt-get或yum，安装需要管理员权限。

choco社区版没有自动卸载依赖的功能。

| 操作               | 命令                                   |
|--------------------|----------------------------------------|
| 安装软件           | `choco install <软件名>`               |
| 卸载软件           | `choco uninstall <软件名>`             |
| 更新软件           | `choco upgrade <软件名>`               |
| 更新所有软件       | `choco upgrade all`                    |
| 搜索软件           | `choco search <软件名>`                |
| 查看已安装软件     | `choco list --local-only`              |
| 查看软件信息       | `choco info <软件名>`                  |
| 清理缓存           | `choco cache delete`                   |


### **winget (Windows Package Manager) 基本操作**

winget是微软官方的软件包管理器，但功能较弱，依赖解析能力不如choco。

| 操作               | 命令                                   |
|--------------------|----------------------------------------|
| 安装软件           | `winget install <软件名>`              |
| 卸载软件           | `winget uninstall <软件名>`            |
| 更新软件           | `winget upgrade <软件名>`              |
| 更新所有软件       | `winget upgrade --all`                 |
| 搜索软件           | `winget search <软件名>`               |
| 查看已安装软件     | `winget list`                          |
| 查看软件信息       | `winget show <软件名>`                 |
| 清理缓存           | `winget source reset --force`          |


### **scoop 基本操作**

scoop可以用户态安装各类软件，类似于conda。

| 操作               | 命令                                   |
|--------------------|----------------------------------------|
| 安装软件           | `scoop install <软件名>`               |
| 卸载软件           | `scoop uninstall <软件名>`             |
| 更新软件           | `scoop update <软件名>`                |
| 更新所有软件       | `scoop update *`                       |
| 搜索软件           | `scoop search <软件名>`                |
| 查看已安装软件     | `scoop list`                           |
| 查看软件信息       | `scoop info <软件名>`                  |
| 清理缓存           | `scoop cache rm *`                     |
