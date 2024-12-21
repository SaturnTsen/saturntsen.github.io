---
title: WSL常用指令
createTime: 2024/02/04 18:31:53
permalink: /utils/WSL-commands/
---


### WSL 命令整理与格式化笔记

---

### 基本使用
- **`--help`**  
  显示使用情况信息。

- **运行 WSL**  
  如果未提供命令行，`wsl.exe` 将启动默认 shell。
  - **`--exec`, `-e <CommandLine>`**  
    不使用默认 Linux shell 的情况下执行指定的命令。
  - **选项**：
    - **`--distribution`, `-d <Distro>`**  
      运行指定的分发版。
    - **`--user`, `-u <UserName>`**  
      以指定用户身份运行。
    - **`--cd <Directory>`**  
      将指定目录设置为当前工作目录。
      - 使用 `~` 表示 Linux 用户的主路径。
      - 路径以 `/` 开头时表示绝对 Linux 路径。
      - 否则需为绝对 Windows 路径。

---

### 系统管理
- **`--shutdown`**  
  立即终止所有正在运行的分发版和 WSL 2。

- **`--terminate`, `-t <Distro>`**  
  终止指定的分发版。

- **`--status`**  
  显示适用于 Linux 的 Windows 子系统状态。

- **`--version`, `-v`**  
  显示版本信息。

- **`--set-default-version <Version>`**  
  更改新分发版的默认安装版本。

- **`--update`**  
  更新适用于 Linux 的 Windows 子系统包。

- **`--manage <Distro> <Options...>`**  
  更改分发版特定选项。
  - **选项**：
    - **`--set-sparse`, `-s <true|false>`**  
      将分发版的 vhdx 设置为稀疏，允许自动回收磁盘空间。

- **`--mount <Disk>`**  
  在所有 WSL 2 分发版中附加和装载物理或虚拟磁盘。
  - **选项**：
    - **`--vhd`**  
      指定 `<Disk>` 引用虚拟硬盘。
    - **`--bare`**  
      将磁盘附加到 WSL 2，但不要装载。
    - **`--name <Name>`**  
      使用自定义名称装载磁盘。
    - **`--type <Type>`**  
      文件系统类型（默认 `ext4`）。
    - **`--options <Options>`**  
      其他装载选项。
    - **`--partition <Index>`**  
      指定分区索引（默认整个磁盘）。

- **`--unmount [Disk]`**  
  从所有 WSL 2 分发版中卸载和分离磁盘。
  - 无参数时卸载所有磁盘。

- **`--debug-shell`**  
  打开 WSL 2 调试 shell（用于诊断）。

---

### 分发版管理
- **`--list`, `-l [Options]`**  
  列出分发版。
  - **选项**：
    - **`--all`**  
      列出所有分发版，包括正在安装或卸载的分发版。
    - **`--running`**  
      仅列出当前正在运行的分发版。
    - **`--quiet`, `-q`**  
      仅显示分发版名称。
    - **`--verbose`, `-v`**  
      显示分发版详细信息。
    - **`--online`, `-o`**  
      显示可通过 `wsl --install` 安装的分发版列表。

- **`--set-default`, `-s <Distro>`**  
  将分发版设置为默认值。

- **`--set-version <Distro> <Version>`**  
  更改指定分发版的版本。

---

### 安装与删除
- **`--install [Distro] [Options...]`**  
  安装分发版。
  - **选项**：
    - **`--no-launch`, `-n`**  
      安装后不启动分发版。
    - **`--web-download`**  
      从互联网下载分发版，而非 Microsoft Store。
    - **`--no-distribution`**  
      仅安装可选组件，不安装分发版。
    - **`--enable-wsl1`**  
      启用 WSL 1 支持。

- **`--unregister <Distro>`**  
  取消注册分发版并删除根文件系统。

---

### 导入与导出
- **`--export <Distro> <FileName> [Options]`**  
  将分发版导出到 `.tar` 文件。
  - **选项**：
    - **`--vhd`**  
      导出为 `.vhdx` 文件。

- **`--import <Distro> <InstallLocation> <FileName> [Options]`**  
  将 `.tar` 文件导入为新分发版。
  - **选项**：
    - **`--version <Version>`**  
      指定版本。
    - **`--vhd`**  
      将 `.vhdx` 文件作为新分发版导入。

- **`--import-in-place <Distro> <FileName>`**  
  使用 `.vhdx` 文件直接创建新分发版（需为 `ext4` 文件系统格式）。
