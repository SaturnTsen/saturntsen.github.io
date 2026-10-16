---
title: Linux 系统级常用指令
tags:
   - utils
createTime: 2023/10/03 12:09:35
permalink: /notes/misc/linux-commands-system/
---

## 系统级指令

### 启动过程

1. **启动内核**：系统引导开始，加载操作系统的内核。
2. **运行init**：`init` 是所有进程的起点，负责初始化系统。
3. **确定运行级别**：
   - `0`：停机。
   - `1`：单用户模式，仅 root 用户可以登录。
   - `2`：多用户模式（无网络）。
   - `3`：完全多用户模式（有网络）。
   - `4`：保留。
   - `5`：图形用户界面模式（GUI）。
   - `6`：系统重启。
   - 这些级别的配置存放在 `/etc/rc*.d` 目录中。

4. **系统初始化**：在内核加载后，系统进行初始化，如激活交换分区、检查磁盘、加载硬件模块等。
5. **建立终端**：准备好终端进行用户登录。
6. **用户登录**：用户进入系统并进行操作。

### 文件系统结构

1. **/boot**：包含启动的核心文件，如内核、initrd 镜像等。
2. **/run**：存储系统启动以来的临时信息，重启时清空。
3. **/lost+found**：用于非法关机后自动恢复文件。
4. **/usr/src**：存放内核源代码。
5. **/sbin**：基本系统命令（如 `shutdown`、`reboot`）。
6. **/bin**：系统命令（如 `ls`、`chmod`、`sh`）。
7. **/usr/bin**：普通用户级的基础指令。
8. **/usr/sbin**：root 用户管理程序（如 `httpd`、`netconfig`）。
9. **/lib**：动态链接库，类似于 Windows 中的 DLL 文件。
10. **/opt**：存放额外安装的用户级应用程序。
11. **/etc**：存放系统配置文件。
12. **/srv**：存放提供服务的用户数据。
13. **/tmp**：临时文件目录。
14. **/var**：存放日志、缓存等数据。
15. **/dev**：外部设备文件。
16. **/media**：自动挂载的设备（如 USB、光驱）。
17. **/mnt**：用户临时挂载的文件系统。
18. **/proc**：虚拟文件系统，存放当前内核和系统状态的信息。
19. **/home**：普通用户的主目录。
20. **/root**：root 用户的主目录。
21. **/selinux**：Redhat/CentOS 特有的安全相关目录。
22. **/sys**：集成了内核设备树的文件系统，提供与内核、进程、设备、伪终端相关的信息。

### 系统信息

1. **查看系统架构**：
   - `arch`：显示机器的处理器架构。
   - `uname -m`：显示机器的处理器架构。
   - `uname -r`：显示正在使用的内核版本。

2. **查看内核和CPU信息**：
   - `cat /proc/version`：显示内核版本。
   - `cat /proc/cpuinfo`：显示 CPU 信息。
   - `cat /proc/meminfo`：显示内存使用情况。
   - `cat /proc/interrupts`：显示中断信息。

3. **查看其他系统信息**：
   - `lspci -tv`：列出 PCI 设备。
   - `lsusb -tv`：列出 USB 设备。
   - `cat /proc/net/dev`：显示网络适配器和统计信息。
   - `cat /proc/swaps`：显示哪些 swap 被使用。
   - `cat /proc/mounts`：显示已挂载的文件系统。

4. **查看日期和时间**：
   - `date`：显示系统日期。
   - `cal 2007`：显示 2007 年的日历。

### 关机与重启

1. **关机和重启命令**：
   - `init 0` 或 `telinit 0`：关闭系统。
   - `shutdown -h hours:minutes`：按预定时间关闭系统。
   - `shutdown -r now`：立即重启系统。
   - `reboot`：重启系统。
   - `logout`：注销当前用户。

2. **取消关机**：
   - `shutdown -c`：取消按预定时间关闭系统。

3. **建议操作**：在关机、重启前运行 `sync` 命令以确保数据写入磁盘。

注意：
- 该部分已经逐步被systemd替代，shutdown实际是systemctl的symlink
- halt/shutdown/poweroff前建议sync

### 挂载与卸载

1. **挂载命令**：
   - `mount /dev/hda2 /mnt/hda2`：挂载一个名为 `hda2` 的硬盘。
   - `mount -o loop file.iso /mnt/cdrom`：挂载一个 ISO 镜像文件。
   - `mount -t vfat /dev/hda5 /mnt/hda5`：挂载一个 Windows FAT32 文件系统。

2. **卸载命令**：
   - `umount /dev/hda2`：卸载名为 `hda2` 的设备。
   - `fuser -km /mnt/hda2`：强制卸载设备。

3. **挂载其他设备**：
   - `mount /dev/cdrom /mnt/cdrom`：挂载 CD-ROM。
   - `mount /dev/sda1 /mnt/usbdisk`：挂载 USB 磁盘。

4. **挂载 Windows 网络共享**：
   - `mount -t smbfs -o username=user,password=pass //WinClient/share /mnt/share`：挂载 Windows 网络共享目录。

### 磁盘空间管理

1. **磁盘查询命令**：
   - `df --help`：显示磁盘空间相关参数及帮助信息。
   - `du`：查看文件或目录的磁盘使用情况。
   - `lsblk`：显示磁盘分区的状态和挂载信息。
   - `blkid`：显示设备的标识信息。

2. **查看磁盘使用情况**：
   - `df -h`：以易于阅读的格式显示已挂载分区的磁盘空间。
   - `ls -lSr | more`：按文件大小排序并分页显示文件和目录。
   - `du -sh dir1`：估算目录 `dir1` 使用的磁盘空间。
   - `du -sk * | sort -rn`：按文件/目录大小显示，并按容量大小排序。

3. **查看已安装软件包占用的空间**：
   - Fedora/RedHat 系统：`rpm -q -a --qf '%10{SIZE}t%{NAME}n' | sort -k1,1n`。
   - Debian/Ubuntu 系统：`dpkg-query -W -f='${Installed-Size;10}t${Package}n' | sort -k1,1n`。

### 文件系统分析与修复

1. **检查坏块**：
   - `badblocks -v /dev/hda1`：检查磁盘 `hda1` 上的坏块。

2. **文件系统检查与修复**：
   - `fsck /dev/hda1`：修复或检查 `hda1` 上的 Linux 文件系统完整性。
   - `fsck.ext2 /dev/hda1`：检查并修复 `ext2` 文件系统。
   - `e2fsck /dev/hda1`：检查并修复 `ext2` 文件系统。
   - `fsck.ext3 /dev/hda1`：检查并修复 `ext3` 文件系统。
   - `fsck.vfat /dev/hda1`：检查并修复 `vfat` 文件系统。
   - `fsck.msdos /dev/hda1`：检查并修复 `msdos` 文件系统。
   - `dosfsck /dev/hda1`：检查并修复 `dos` 文件系统。

### 文件系统初始化

1. **创建文件系统**：
   - `mkfs /dev/hda1`：在 `hda1` 分区创建文件系统。
   - `mke2fs /dev/hda1`：在 `hda1` 分区创建 `ext2` 文件系统。
   - `mke2fs -j /dev/hda1`：在 `hda1` 分区创建 `ext3` 文件系统（支持日志）。
   - `mkfs -t vfat32 -F /dev/hda1`：在 `hda1` 分区创建 FAT32 文件系统。
   - `fdformat -n /dev/fd0`：格式化软盘。
   - `mkswap /dev/hda3`：创建一个 swap 文件系统。

### SWAP 文件系统管理

1. **SWAP 创建与启用**：
   - `mkswap /dev/hda3`：在 `hda3` 分区创建 swap 文件系统。
   - `swapon /dev/hda3`：启用新的 swap 文件系统。
   - `swapon /dev/hda2 /dev/hdb3`：启用多个 swap 分区。

### 备份与恢复命令

1. **使用 `dump` 和 `restore` 备份和恢复文件系统**：
   - `dump -0aj -f /tmp/home0.bak /home`：对 `/home` 目录进行完整备份，并将备份文件保存为 `/tmp/home0.bak`。
   - `dump -1aj -f /tmp/home0.bak /home`：对 `/home` 目录进行增量备份，并将备份文件保存为 `/tmp/home0.bak`。
   - `restore -if /tmp/home0.bak`：从备份文件 `/tmp/home0.bak` 恢复文件。

2. **使用 `rsync` 进行目录同步**：
   - `rsync -rogpav --delete /home /tmp`：同步 `/home` 目录到 `/tmp` 目录，并删除目标目录中不再存在的文件。
   - `rsync -rogpav -e ssh --delete /home ip_address:/tmp`：通过 SSH 通道将 `/home` 目录同步到远程主机的 `/tmp` 目录。
   - `rsync -az -e ssh --delete ip_addr:/home/public /home/local`：通过 SSH 和压缩将远程主机的 `/home/public` 目录同步到本地的 `/home/local` 目录。
   - `rsync -az -e ssh --delete /home/local ip_addr:/home/public`：通过 SSH 和压缩将本地的 `/home/local` 目录同步到远程主机的 `/home/public` 目录。

3. **使用 `dd` 进行磁盘备份与恢复**：
   - `dd bs=1M if=/dev/hda | gzip | ssh user@ip_addr 'dd of=hda.gz'`：通过 SSH 远程备份本地磁盘 `/dev/hda` 到远程主机。
   - `dd if=/dev/sda of=/tmp/file1`：将磁盘 `/dev/sda` 的内容备份到文件 `/tmp/file1`。

4. **使用 `tar` 进行文件备份**：
   - `tar -Puf backup.tar /home/user`：对 `/home/user` 目录进行交互式备份，并将备份保存为 `backup.tar`。
   - `( cd /tmp/local/ && tar c . ) | ssh -C user@ip_addr 'cd /home/share/ && tar x -p'`：通过 SSH 在远程主机复制 `/tmp/local/` 目录的内容。 
   - `( tar c /home ) | ssh -C user@ip_addr 'cd /home/backup-home && tar x -p'`：通过 SSH 在远程主机复制本地的 `/home` 目录。
   - `tar cf - . | (cd /tmp/backup ; tar xf - )`：将一个目录复制到另一个位置，保持原有权限和链接。

5. **使用 `find` 与 `cp` 进行文件查找与复制**：
   - `find /home/user1 -name '*.txt' | xargs cp -av
   --target-directory=/home/backup/ --parents`：查找 `/home/user1` 目录下的所有
   `.txt` 文件并复制到 `/home/backup/` 目录。 - `find /var/log -name '*.log' |
   tar cv --files-from=- | bzip2 > log.tar.bz2`：查找所有以 `.log` 结尾的文件并
   将其打包成 `.tar.bz2` 格式的压缩文件。

6. **备份和恢复 MBR**：
   - `dd if=/dev/hda of=/dev/fd0 bs=512 count=1`：将 MBR（主引导记录）内容复制到软盘。
   - `dd if=/dev/fd0 of=/dev/hda bs=512 count=1`：从软盘恢复 MBR 内容到磁盘。

### 网络连接相关命令

1. **网络接口配置与控制**：
   - `ifconfig eth0`：显示以太网卡 `eth0` 的配置信息。
   - `ifup eth0`：启用网络接口 `eth0`。
   - `ifdown eth0`：禁用网络接口 `eth0`。
   - `ifconfig eth0 192.168.1.1 netmask 255.255.255.0`：设置 `eth0` 网络接口的 IP 地址为 `192.168.1.1`，子网掩码为 `255.255.255.0`。
   - `ifconfig eth0 promisc`：设置 `eth0` 网络接口为混杂模式，允许嗅探网络数据包。

2. **DHCP配置**：
   - `dhclient eth0`：以 DHCP 模式启用网络接口 `eth0`，自动获取 IP 地址。

3. **路由配置**：
   - `route -n`：显示路由表。
   - `route add -net 0/0 gw IP_Gateway`：设置默认网关，`IP_Gateway` 为网关 IP 地址。
   - `route add -net 192.168.0.0 netmask 255.255.0.0 gw 192.168.1.1`：设置静态路
     由，通过 `192.168.1.1` 网关访问 `192.168.0.0/16` 网络。
   - `route del 0/0 gw IP_gateway`：删除默认路由。

4. **启用 IP 转发**：
   - `echo "1" > /proc/sys/net/ipv4/ip_forward`：启用 IP 转发，允许数据包在网络间转发。

5. **主机名与域名解析**：
   - `hostname`：显示当前系统的主机名。
   - `host www.example.com`：查询域名 `www.example.com` 并解析其 IP 地址。
   - `nslookup www.example.com`：查询域名 `www.example.com`，解析主机名到 IP 地
     址，或将 IP 地址解析为主机名。

6. **网络接口状态与统计信息**：
   - `ip link show`：显示所有网络接口的链接状态。
   - `mii-tool eth0`：查看网络接口 `eth0` 的链路状态。
   - `ethtool eth0`：显示网络接口 `eth0` 的统计信息。

7. **网络连接与监听**：
   - `netstat -tup`：显示所有活动的网络连接及其对应的 PID。
   - `netstat -tupl`：显示系统上所有监听的网络服务及其对应的 PID。

8. **数据包嗅探**：
   - `tcpdump tcp port 80`：显示所有 TCP 端口为 80 的 HTTP 流量。

9. **无线网络相关命令**：
   - `iwlist scan`：扫描可用的无线网络。
   - `iwconfig eth1`：显示无线网卡 `eth1` 的配置信息。

10. **主机名与域名解析**：
   - `hostname`：显示当前系统的主机名。
   - `host www.example.com`：查询 `www.example.com` 域名并解析其对应的 IP 地址。
   - `nslookup www.example.com`：查找域名 `www.example.com`，解析为 IP 地址，或
     者将 IP 地址解析为主机名。

11. **WHOIS查询**：
    - `whois www.example.com`：查询域名 `www.example.com` 的 WHOIS 信息。

以下是补充的关于光盘相关的命令：

### 光盘操作命令

1. **清空光盘内容**：
   - `cdrecord -v gracetime=2 dev=/dev/cdrom -eject blank=fast -force`：清空一个
     可复写的光盘内容。
   
2. **创建ISO镜像文件**：
   - `mkisofs /dev/cdrom > cd.iso`：在磁盘上创建一个光盘的ISO镜像文件。
   - `mkisofs /dev/cdrom | gzip > cd_iso.gz`：创建一个压缩的光盘ISO镜像文件。
   - `mkisofs -J -allow-leading-dots -R -V "Label CD" -iso-level 4 -o ./cd.iso data_cd`：
     创建一个目录 `data_cd` 的ISO镜像文件，并设置ISO的一些参数。

3. **刻录ISO镜像文件**：
   - `cdrecord -v dev=/dev/cdrom cd.iso`：将ISO镜像文件 `cd.iso` 刻录到光盘。
   - `gzip -dc cd_iso.gz | cdrecord dev=/dev/cdrom -`：将压缩的ISO镜像文件
     `cd_iso.gz` 刻录到光盘。

4. **挂载ISO镜像文件**：
   - `mount -o loop cd.iso /mnt/iso`：将ISO镜像文件 `cd.iso` 挂载到 `/mnt/iso` 目录。

5. **转录音轨到wav文件**：
   - `cd-paranoia -B`：从CD光盘转录音轨到wav文件中。
   - `cd-paranoia -- "-3"`：从CD光盘转录音轨到wav文件中，使用参数 `-3`。

6. **扫描SCSI总线识别光盘设备**：
   - `cdrecord --scanbus`：扫描总线以识别SCSI光盘设备。

7. **计算MD5校验值**：
   - `dd if=/dev/hdc | md5sum`：计算设备 `/dev/hdc`（例如CD驱动器）内容的MD5校验和。


以下是有关 **RPM 包** 和 **YUM 软件包管理** 的命令：

### **RPM 包管理命令** (适用于 Fedora、Redhat 及类似系统)

1. **安装、更新和删除 RPM 包**：
   - `rpm -ivh package.rpm`：安装一个 RPM 包。
   - `rpm -ivh --nodeeps package.rpm`：安装一个 RPM 包，并忽略依赖关系警告。
   - `rpm -U package.rpm`：更新一个 RPM 包，但不改变其配置文件。
   - `rpm -F package.rpm`：更新一个已安装的 RPM 包（必须已经安装）。
   - `rpm -e package_name.rpm`：删除一个 RPM 包。

2. **查询已安装的 RPM 包**：
   - `rpm -qa`：列出系统中所有已安装的 RPM 包。
   - `rpm -qa | grep httpd`：显示所有名称中包含 "httpd" 的 RPM 包。
   - `rpm -qi package_name`：获取一个已安装包的详细信息。
   - `rpm -qg "System Environment/Daemons"`：显示属于特定组件的 RPM 包。
   - `rpm -ql package_name`：显示一个已安装的 RPM 包提供的文件列表。
   - `rpm -qc package_name`：显示一个已安装的 RPM 包提供的配置文件列表。
   - `rpm -q package_name --whatrequires`：显示与该 RPM 包存在依赖关系的其他包。
   - `rpm -q package_name --whatprovides`：显示该 RPM 包提供的功能或文件。
   - `rpm -q package_name --scripts`：显示安装或删除期间执行的脚本。
   - `rpm -q package_name --changelog`：显示该 RPM 包的修改历史。

3. **查询 RPM 包和文件**：
   - `rpm -qf /etc/httpd/conf/httpd.conf`：确认某个文件由哪个 RPM 包提供。
   - `rpm -qp package.rpm -l`：显示一个尚未安装的 RPM 包提供的文件列表。

4. **验证和检查 RPM 包的完整性**：
   - `rpm --import /media/cdrom/RPM-GPG-KEY`：导入公钥数字证书。
   - `rpm --checksig package.rpm`：确认一个 RPM 包的签名和完整性。
   - `rpm -qa gpg-pubkey`：确认已安装的所有 RPM 包的公钥完整性。
   - `rpm -V package_name`：验证一个已安装的 RPM 包的文件完整性。
   - `rpm -Va`：检查系统中所有已安装的 RPM 包。
   - `rpm -Vp package.rpm`：验证一个 RPM 包是否已安装。

5. **从 RPM 包提取文件**：
   - `rpm2cpio package.rpm | cpio --extract --make-directories *bin*`：从一个
     RPM 包中提取可执行文件。

6. **RPM 源码包操作**：
   - `rpm -ivh /usr/src/redhat/RPMS/`arch`/package.rpm`：从源码包安装一个已经构建好的 RPM 包。
   - `rpmbuild --rebuild package_name.src.rpm`：重新构建一个 RPM 包。

---

### **YUM 软件包管理命令** (适用于 Fedora、Redhat 及类似系统)

1. **安装、更新和删除软件包**：
   - `yum install package_name`：下载并安装一个 RPM 包。
   - `yum localinstall package_name.rpm`：安装本地 RPM 包，并解决依赖关系。
   - `yum update package_name.rpm`：更新系统中所有安装的 RPM 包。
   - `yum update package_name`：更新一个指定的 RPM 包。
   - `yum remove package_name`：删除一个 RPM 包。

2. **列出和搜索软件包**：
   - `yum list`：列出当前系统中安装的所有包。
   - `yum search package_name`：在 YUM 仓库中搜索软件包。

3. **清理和管理缓存**：
   - `yum clean packages`：清理 RPM 缓存，删除下载的包。
   - `yum clean headers`：删除所有头文件。
   - `yum clean all`：删除所有缓存的包和头文件。