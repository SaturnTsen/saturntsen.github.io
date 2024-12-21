---
title: DISM 和 WinPE
createTime: 2024/01/11 16:36:01
permalink: /utils/DISM-and-WinPE/
---

### DISM 用法整理

#### **基本用法**
- **查看帮助**: `DISM /help`
- **基本命令格式**:  
  ```
  DISM.exe [dism_options] {Imaging_command} [<Imaging_arguments>]
  DISM.exe {/Image:<path_to_offline_image> | /Online} [dism_options] {servicing_command} [<servicing_arguments>]
  ```

---

### **DISM 选项**
| 选项                 | 功能说明                                                                                       |
|----------------------|------------------------------------------------------------------------------------------------|
| `/English`           | 以英语显示命令行输出。                                                                        |
| `/Format`            | 指定报告的输出格式。                                                                          |
| `/WinDir`            | 指定 Windows 目录的路径。                                                                     |
| `/SysDriveDir`       | 指定 BootMgr 系统加载文件的路径。                                                             |
| `/LogPath`           | 指定日志文件的路径。                                                                          |
| `/LogLevel`          | 指定日志的输出级别 (1-4)。                                                                   |
| `/NoRestart`         | 禁止自动重启或重启提示。                                                                      |
| `/Quiet`             | 仅显示错误信息，抑制所有其他输出。                                                           |
| `/ScratchDir`        | 指定暂存目录的路径。                                                                          |

---

### **操作系统映像管理 (Generic Imaging Commands)**
| 命令                   | 功能说明                        |
|------------------------|---------------------------------|
| `/Split-Image`         | 分割 WIM 映像。               |
| `/Get-ImageInfo`       | 获取映像信息。                 |
| `/Apply-Image`         | 应用一个映像。                 |
| `/Mount-Image`         | 挂载映像。                     |
| `/Get-MountedImageInfo`| 查看挂载的映像。               |
| `/Commit-Image`        | 保存更改至映像。               |
| `/Unmount-Image`       | 卸载映像。                     |
| `/Cleanup-Mountpoints` | 清理挂载点。                   |

---

### **操作对象指定 (Image Specifications)**
| 选项     | 功能说明                                    |
|----------|---------------------------------------------|
| `/Online`| 对当前操作系统进行操作。                   |
| `/Image` | 指定离线 Windows 映像的根目录路径。         |

---

### **WIM 映像管理 (WIM Commands)**
| 命令                       | 功能说明                                                                                              |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `/Apply-CustomDataImage`   | 去除自定义数据映像中的文件。                                                                          |
| `/Capture-CustomImage`     | 捕获定制内容到 WIMBoot 系统的增量 WIM 文件中。                                                        |
| `/Get-WIMBootEntry`        | 显示指定磁盘卷的 WIMBoot 配置条目。                                                                  |
| `/Update-WIMBootEntry`     | 更新指定磁盘卷的 WIMBoot 配置条目。                                                                  |
| `/List-Image`              | 显示指定映像中的文件和文件夹列表。                                                                   |
| `/Delete-Image`            | 删除 WIM 文件中多卷映像的指定卷映像。                                                                |
| `/Export-Image`            | 将指定映像的副本导出到另一个文件。                                                                   |
| `/Append-Image`            | 向 WIM 文件中添加另一个映像。                                                                        |
| `/Capture-Image`           | 将驱动器映像捕获到新的 WIM 文件中（包含所有子文件夹和数据）。                                       |
| `/Get-MountedWimInfo`      | 显示有关已挂载的 WIM 映像的信息。                                                                   |
| `/Get-WimInfo`             | 显示 WIM 文件中映像的信息。                                                                         |
| `/Commit-Wim`              | 保存对挂载的 WIM 映像的更改。                                                                        |
| `/Unmount-Wim`             | 卸载挂载的 WIM 映像。                                                                               |
| `/Mount-Wim`               | 挂载 WIM 文件中的映像。                                                                             |
| `/Remount-Wim`             | 恢复孤立的 WIM 挂载目录。                                                                           |
| `/Cleanup-Wim`             | 删除与损坏的 WIM 映像相关的资源。                                                                   |

---

### **更多帮助**
- 可通过在命令后加 `/?` 查看帮助，例如：
  - `DISM.exe /Mount-Wim /?`  
  - `DISM.exe /ScratchDir /?`

---

### **WinPE 使用流程**
1. **创建 WinPE 工作目录**: 使用 `Copype` 命令。  
2. **挂载与自定义映像**:  
   - 挂载：参考 [WinPE 挂载与自定义](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-mount-and-customize?view=windows-11)。  
   - 添加组件：参考 [添加可选组件](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-add-packages--optional-components-reference?view=windows-11)。  
3. **创建介质**: 参考 [创建 USB 启动盘](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive?view=windows-11)。  

---

### **官方文档链接**
- [WinPE 概述](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11)  
- [Copype 命令行选项](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/copype-command-line-options?view=windows-11)  
