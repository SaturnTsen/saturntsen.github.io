---
title: Docker 和 VirtualBox
tags:
  - utils
createTime: 2024/02/04 13:37:36
permalink: /utils/docker-and-virtualbox/
---

# Docker 笔记

## 参考资料
- [Docker文档](https://docs.docker.com/reference/)
- [Docker容器中使用非root用户](https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user)
- **Windows 下 Docker 的默认地址**: `%localappdata%\Docker\wsl`

---

## 基础使用
### Docker 使用流程
1. 导入 tar 包为镜像。
2. 由镜像创建容器。
3. 运行容器。
4. 连接容器。

### 导入镜像
将 tar 镜像导入 Docker，并命名为 `c_course:v2023`：
```bash
docker load < c_course.tar
```
验证镜像：
```bash
docker images
```
查看是否存在一个名为 `speit_sutuo_server`标签为 `v2022` 的镜像。

### 创建容器
根据 `c_course:v2023` 镜像创建一个容器，将本地文件夹挂载到容器里的
`/home/user/TP` 目录，命名为 `c_course`，设置默认用户为 `user`，并打开容器中的
`/bin/zsh`终端：
```bash
docker run -v C:\Users\P1206\TP:/home/user/TP -u=user --name c_course -it c_course:v2023 /bin/zsh
```

### 运行容器
启动并连接容器：
```bash
docker start c_course && docker exec -it c_course zsh
```

### VS Code 连接容器
1. 在 VS Code 中安装 Docker 扩展。
2. 点击 VS Code 左下角双箭头。
3. 打开远程窗口，附加到正在运行的容器。
4. 选择想连接的容器。

### Windows 目录映射注意事项
将 Windows 目录映射到 Docker 容器后，所有映射的目录在容器里均会被赋予 `root` 所
有者和 `root`权限。

---

## 镜像管理

### 容器
- **列出所有容器**:
  ```bash
  docker ps -a
  ```
- **重命名容器**:
  ```bash
  docker rename old_name c_course
  ```
- **删除容器**:
  ```bash
  docker rm old_name
  ```

### 导出和导入容器
- 导出容器：
  ```bash
  docker export c_course -o E:\c_course\sys_img.tar
  ```
- 导入为镜像：
  ```bash
  docker import E:\c_course\sys_img.tar c_course:v2023
  ```

### 提交容器为镜像
将容器保存为镜像，并添加信息：
```bash
docker commit -a="Maxence CHEN" -m="ubuntu 20.04 for course C of SPEIT" c_course c_course:v2023.10.2
```

### 镜像
- **列出所有镜像**:
  ```bash
  docker images
  ```
- **删除镜像**:
  ```bash
  docker rmi image_name
  ```
- **下载镜像**:
  ```bash
  docker pull image_name
  ```

### 导出和导入镜像
- **推荐导出**:
  ```bash
  docker save c_course -o E:\c_course\sys_img.tar
  ```
- **不推荐** (依赖于 Shell/OS):
  ```bash
  docker save c_course > E:\c_course\sys_img.tar
  ```
- **推荐导入**:
  ```bash
  docker load -i E:\c_course\sys_img.tar
  ```
- **不推荐** (依赖于 Shell/OS):
  ```bash
  docker load < E:\c_course\sys_img.tar
  ```

---

## Dockerfile 构建示例
```dockerfile
FROM ubuntu:latest
MAINTAINER Yiming saturntsen@gmail.com

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential
```

---

## VirtualBox

### 虚拟机挂载主机文件
1. **设置共享文件夹** 在 VirtualBox 中。
2. 在虚拟机中创建一个目录：
   ```bash
   mkdir /path/to/mount
   ```
3. 挂载共享文件夹：
   ```bash
   sudo mount -t vboxsf shared_folder_name /path/to/mount
   ```


