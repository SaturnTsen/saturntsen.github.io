---
title: Linux 指令大全
tags:
   - utils
createTime: 2023/10/03 12:09:10
permalink: /notes/misc/linux-commands/
---

## 常用参考文档
1. [Linux Guide](https://linuxguide.readthedocs.io/zh_CN/latest/?badge=latest)
2. [Ubuntu 官方帮助文档](https://help.ubuntu.com/community/)
3. [ZJDoc部署文档](https://zjdoc-deploy.readthedocs.io/zh_CN/latest/)
4. [Missing Semester 中文版](https://missing-semester-cn.github.io/)

---

## 开发常用指令

### 文件与目录操作
- `pwd`：显示当前工作路径  
- `cd ~`：进入主目录  
- `cd ~user1`：进入`user1`的主目录  
- `cd -`：返回上次所在的目录  

- `ls -F`：查看目录中的文件  
- `ls -l`：显示文件和目录的详细资料  
- `ls -a`：显示隐藏文件  
- `ls -d`：列出目录本身  

- `tree`：显示文件和目录的树形结构（从当前目录开始）  
- `lstree`：显示文件和目录的树形结构（从根目录开始）  

- `mkdir [目录名]`：创建目录  
  - `mkdir dir1`：创建一个叫做 `dir1` 的目录  
  - `mkdir dir1 dir2`：同时创建两个目录  
  - `mkdir -p /tmp/dir1/dir2`：创建一个目录树  

- `rm -r -f`：强制删除目录及其内容  
  - `rm -rf dir1 dir2`：同时删除两个目录及它们的内容  
  - `rmdir dir1`：删除空目录 `dir1`  

- `mv dir1 new_dir`：重命名或移动一个目录  
  - `mv [原文件名] [新文件名]`：更改文件名  
  - `mv [文件] [目标目录]`：将文件移动到目标目录  
  - `mv [原目录] [新目录]`：将目录移动到新目录  

- `touch [文件名]`：新建文件  
- `touch -t 0712250000 file1`：修改文件 `file1` 的时间戳 (格式：YYMMDDhhmm)  

- `cp -r [源文件/目录] [目标目录]`：复制文件或目录及其内容  
  - `cp file1 file2`：复制文件 `file1` 到 `file2`  
  - `cp dir/* .`：复制目录下所有文件到当前工作目录  
  - `cp -a /tmp/dir1 .`：复制一个目录到当前工作目录  
  - `cp -a dir1 dir2`：复制目录 `dir1` 到 `dir2`  
  - `cp -r dir1 dir2`：复制目录及子目录  

- `ln -s file1 lnk1`：创建一个软链接 `lnk1` 指向 `file1`  
- `ln file1 lnk1`：创建一个物理链接 `lnk1` 指向 `file1`  
- `file file1`：输出 `file1` 的 MIME 类型  

---

### 进程与时间操作
- `ps -A`：查看所有进程  
- `kill [PID]`：关闭指定进程  
- `ctrl+d`：结束当前终端进程  

- `w`：显示系统登陆用户  
- `time [指令]`：显示某指令的执行时间  
- `date`：显示当前日期  

### 打包和压缩

- `bunzip2 file1.bz2`：解压一个叫做 `file1.bz2` 的文件  
- `bzip2 file1`：压缩一个叫做 `file1` 的文件  
- `gunzip file1.gz`：解压一个叫做 `file1.gz` 的文件  
- `gzip file1`：压缩一个叫做 `file1` 的文件  
- `gzip -9 file1`：最大程度压缩文件  

- `rar a file1.rar test_file`：创建一个叫做 `file1.rar` 的压缩包，包含 `test_file`  
- `rar a file1.rar file1 file2 dir1`：同时压缩 `file1`, `file2` 以及目录 `dir1`  
- `rar x file1.rar`：解压 `file1.rar` 压缩包  
- `unrar x file1.rar`：解压 `file1.rar` 压缩包  

- `tar -cvf archive.tar file1`：创建一个非压缩的 tarball 包，包含 `file1`  
- `tar -cvf archive.tar file1 file2 dir1`：创建一个包含 `file1`, `file2` 以及 `dir1` 的档案文件  
- `tar -tf archive.tar`：显示一个 tar 包中的内容  
- `tar -xvf archive.tar`：解压 `archive.tar` 包  
- `tar -xvf archive.tar -C /tmp`：将压缩包解压到 `/tmp` 目录下  

- `tar -cvfj archive.tar.bz2 dir1`：创建一个 bzip2 格式的压缩包  
- `tar -jxvf archive.tar.bz2`：解压一个 bzip2 格式的压缩包  
- `tar -cvfz archive.tar.gz dir1`：创建一个 gzip 格式的压缩包  
- `tar -zxvf archive.tar.gz`：解压一个 gzip 格式的压缩包  

- `zip file1.zip file1`：创建一个 zip 格式的压缩包  
- `zip -r file1.zip file1 file2 dir1`：将几个文件和目录同时压缩成一个 zip 格式的压缩包  
- `unzip file1.zip`：解压一个 zip 格式的压缩包  

---

### 用户和群组管理

- `useradd -s [shell目录] -g [所属用户组] –G [附加用户组1],[附加用户组2] -d [用户主目录] [用户名]`：创建新用户并指定 shell、用户组及主目录等参数  
- `usermod`：修改用户的相关信息（与 `useradd` 用法相似）  
- `userdel -r [用户名]`：删除用户并删除其主目录  
- `passwd user1`：修改用户 `user1` 的密码（仅限 root 执行）  
- `passwd [用户名]`：修改指定用户的密码  
- `passwd -d [用户名]`：删除指定用户的密码  
- `passwd -f [用户名]`：强制用户下次登录时修改密码  

- `groupadd (-g [指定用户组号]) [用户组名]`：创建一个新的用户组  
- `groupmod`：修改用户组信息（与 `groupadd` 用法相似）  
- `groupmod -n new_group_name old_group_name`：重命名一个用户组  

- `cat /etc/passwd`：查看用户信息  
- `cat /etc/group`：查看用户组信息  
- `groups [用户名]`：查看用户所属的用户组  
- `newgrp [现有用户组]`：切换当前使用的用户组  

- `groupdel group_name`：删除一个用户组  
- `chage -E 2005-12-31 user1`：设置用户 `user1` 的口令失效日期为 `2005-12-31`  

- `pwck`：检查 `/etc/passwd` 文件的格式和语法错误，以及存在的用户  
- `grpck`：检查 `/etc/group` 文件的格式和语法错误，以及存在的用户组

### 文件权限与属性

#### 权限管理
- 使用 `+` 设置权限，使用 `-` 取消权限
- `ls -lh`：显示文件的权限
- `ls /tmp | pr -T5 -W$COLUMNS`：将终端划分成 5 栏显示

#### 权限符号与数值
- `r = 4`：读取权限  
- `w = 2`：写入权限  
- `x = 1`：执行权限  

#### 修改权限
- `chmod (-r) [目录名]`：修改目录或文件的权限
- `chmod ugo+rwx directory1`：为所有人（u）、群组（g）以及其他用户（o）设置读取（r）、写入（w）和执行（x）权限  
- `chmod go-rwx directory1`：删除群组（g）与其他人（o）对目录的读、写、执行权限  

#### 修改所有者与群组
- `chown user1 file1`：改变文件的所有者  
- `chown -R user1 directory1`：改变目录及其下所有文件的所有者  
- `chgrp group1 file1`：改变文件的群组  
- `chown user1:group1 file1`：改变文件的所有者和群组  

#### SUID、SGID、Sticky 位
- `find / -perm -u+s`：罗列系统中所有使用了 SUID 位控制的文件  
- `chmod u+s /bin/file1`：设置一个二进制文件的 SUID 位  
- `chmod u-s /bin/file1`：禁用一个二进制文件的 SUID 位  
- `chmod g+s /home/public`：设置一个目录的 SGID 位（类似于 SUID，但针对目录）  
- `chmod g-s /home/public`：禁用一个目录的 SGID 位  
- `chmod o+t /home/public`：设置一个目录的 Sticky 位（只允许合法所有人删除文件）  
- `chmod o-t /home/public`：禁用一个目录的 Sticky 位  

#### 文件属性
- `chattr +a file1`：只允许以追加方式读写文件  
- `chattr +c file1`：允许文件被内核自动压缩/解压  
- `chattr +d file1`：在文件系统备份时，`dump` 程序将忽略该文件  
- `chattr +i file1`：将文件设置为不可变，不能被删除、修改、重命名或链接  
- `chattr +s file1`：允许文件被安全地删除  
- `chattr +S file1`：文件写操作后，立即将修改结果写到磁盘  
- `chattr +u file1`：若文件被删除，系统将允许恢复该文件  
- `lsattr`：显示文件的特殊属性  

### 文件查看与搜索

#### 查看文件内容
- `cat file1`：正向查看文件的内容  
- `tac file1`：反向查看文件的内容  
- `head -2 file1`：查看文件的前两行  
- `tail -2 file1`：查看文件的最后两行  
- `tail -f /var/log/messages`：实时查看文件内容的新增部分  
- `more file1`：分页显示文件内容  
- `less file1`：类似于 `more` 命令，但支持文件的正向和反向滚动  

#### 搜索文件
- `whereis halt`：显示二进制文件、源码或 `man` 页的位置  
- `which halt`：显示二进制文件或可执行文件的完整路径  
- `find / -name file1`：从根目录开始搜索指定文件或目录  
- `find / -user user1`：搜索属于用户 `user1` 的文件和目录  
- `find /home/user1 -name \*.bin`：在 `/home/user1` 目录下搜索所有以 `.bin` 结尾的文件  
- `find /usr/bin -type f -atime +100`：搜索过去 100 天内未被访问过的执行文件  
- `find /usr/bin -type f -mtime -10`：搜索过去 10 天内被创建或修改过的文件  
- `find / -name \*.rpm -exec chmod 755 '{}' \;`：搜索以 `.rpm` 结尾的文件并修改其权限  
- `find / -xdev -name \*.rpm`：搜索以 `.rpm` 结尾的文件，忽略可移动设备等其他文件系统  

#### 索引搜索
- `locate`：列出索引中匹配模式的文件  
- `updatedb`：更新文件索引数据库  
- 例：`locate \*.ps`：寻找以 `.ps` 结尾的文件（需要先运行 `updatedb`）

### 管道和重定向

#### 管道（Pipe）和重定向的基本用法
- **管道** `|` 用于将一个命令的输出传递给另一个命令作为输入。
- **标准输入（STDIN）**：通常通过键盘输入的数据。
- **标准输出（STDOUT）**：命令执行结果的默认输出，通常显示在终端。

#### 常见用法

1. **将多个文件内容合并并传递给命令**：
   - `cat file1 file2 ... | command <> file1_in.txt_or_file1_out.txt`  
     这是一种通用的语法，结合管道、标准输入和输出，通常用于文本处理命令如 `sed`,
     `grep`, `awk` 等。

2. **将命令的输出写入新文件**：
   - `cat file1 | command > result.txt`  
     合并 `file1` 内容并通过 `command`（如 `sed`, `grep`, `awk` 等）进行处理，然
     后将处理后的结果写入 `result.txt` 文件。

3. **将命令的输出追加到已有文件中**：
   - `cat file1 | command >> result.txt`  
     合并 `file1` 内容并通过 `command` 进行处理，将处理结果追加到已存在的
     `result.txt` 文件中。

### 文本处理

#### 常见命令及用法

1. **`cat`** - 查看文件内容并标示行号
   - `cat -n file1`：显示文件 `file1` 的内容，并标示行号。

2. **`wc`** - 计算文件的单词数、行数等
   - `wc file1`：显示文件 `file1` 的行数、单词数、字符数。

3. **`awk`** - 处理文本的工具，可以用来处理格式化的文本，支持按行或列处理
   - `cat example.txt | awk 'NR%2==1'`：删除 `example.txt` 文件中的所有偶数行。
   - `echo a b c | awk '{print $1}'`：查看一行的第一栏。
   - `echo a b c | awk '{print $1,$3}'`：查看一行的第一和第三栏。

4. **`grep`** - 文本搜索工具
   - `grep Aug /var/log/messages`：在 `/var/log/messages` 文件中查找包含 "Aug" 的行。
   - `grep ^Aug /var/log/messages`：查找以 "Aug" 开头的行。
   - `grep [0-9] /var/log/messages`：查找包含数字的行。
   - `grep Aug -R /var/log/*`：递归查找目录 `/var/log` 及其子目录中包含 "Aug" 的行。

5. **`sed`** - 流编辑器，用于处理文本文件，替换、删除、插入等
   - `sed 's/stringa1/stringa2/g' example.txt`：将 `example.txt` 文件中的 "stringa1" 替换为 "stringa2"。
   - `sed '/^$/d' example.txt`：删除文件 `example.txt` 中的空白行。
   - `sed '/ *#/d; /^$/d' example.txt`：删除文件中的注释行和空白行。
   - `sed -e '1d' result.txt`：删除 `result.txt` 文件的第一行。
   - `sed -n '/stringa1/p'`：仅显示包含 "stringa1" 的行。
   - `sed -e 's/ *$//' example.txt`：删除每一行最后的空白字符。
   - `sed -e 's/stringa1//g' example.txt`：删除 `example.txt` 中的 "stringa1" 并保留其他内容。
   - `sed -n '1,5p;5q' example.txt`：显示 `example.txt` 文件中的第 1 到第 5 行。
   - `sed -e 's/00*/0/g' example.txt`：用单个零替换多个连续的零。

6. **`paste`** - 合并文件或列
   - `paste file1 file2`：将 `file1` 和 `file2` 合并。
   - `paste -d '+' file1 file2`：将 `file1` 和 `file2` 合并，并用 "+" 作为分隔符。

7. **`sort`** - 排序文件内容
   - `sort file1 file2`：对 `file1` 和 `file2` 中的内容进行排序。
   - `sort file1 file2 | uniq`：去重，保留两个文件中不重复的行。
   - `sort file1 file2 | uniq -u`：删除交集，只留下不重复的行。
   - `sort file1 file2 | uniq -d`：取出两个文件中的交集。

8. **`comm`** - 比较两个文件的内容
   - `comm -1 file1 file2`：显示 `file1` 中存在但 `file2` 中没有的内容。
   - `comm -2 file1 file2`：显示 `file2` 中存在但 `file1` 中没有的内容。
   - `comm -3 file1 file2`：显示两个文件中共有的部分。

9. **`tr`** - 替换字符
  - `echo 'esempio' | tr '[:lower:]' '[:upper:]'`：将小写字母转换为大写字母。

10. **`xargs`** - 将标准输出转为参数，常与其他命令组合使用。

11. **`echo`** - 输出文本或变量
  - `echo 'esempio'`：输出文本内容。
  - `echo a b c`：将参数 `a`, `b`, `c` 输出到标准输出。

### 字符设置与格式转换

#### 格式转换

1. **`dos2unix` 和 `unix2dos`** - 转换文件格式：
   - `dos2unix filedos.txt fileunix.txt`：将文件 `filedos.txt` 从 MS-DOS 格式转换为 UNIX 格式，并保存为 `fileunix.txt`。
   - `unix2dos fileunix.txt filedos.txt`：将文件 `fileunix.txt` 从 UNIX 格式转换为 MS-DOS 格式，并保存为 `filedos.txt`。

2. **`recode`** - 格式转换工具，用于不同文本格式之间的转换：
   - `recode ..HTML < page.txt > page.html`：将文件 `page.txt` 转换为 HTML 格式，输出为 `page.html`。
   - `recode -l | more`：显示所有允许的文本格式转换。

#### 编码转换

1. **`iconv`** - 字符编码转换：
   - `iconv -l`：列出所有已知的字符编码。
   - `iconv -f fromEncoding -t toEncoding inputFile > outputFile`：将文件 `inputFile` 从 `fromEncoding` 编码转换为 `toEncoding` 编码，并输出到 `outputFile`。

#### 批量图片处理

1. **`convert`** - 使用 `ImageMagick` 对图片进行批量处理（如调整图片大小）：
   - `find . -maxdepth 1 -name *.jpg -print -exec convert "{}" -resize 80x60 "thumbs/{}" \;`：批量调整当前目录下所有 `.jpg` 图片的大小，并将调整后的图片输出到 `thumbs` 文件夹中。此命令需要安装 `ImageMagick` 包。

### APT 软件工具 (Debian, Ubuntu 以及类似系统)

1. **更新和升级软件包**：
   - `apt update`：更新软件包列表。
   - `apt upgrade`：升级所有已安装的软件包到最新版本。

2. **安装和删除软件包**：
   - `apt install package_name`：安装指定的软件包。
   - `apt remove package_name`：从系统删除指定的软件包。

3. **检查和清理软件包**：
   - `apt check`：确认软件仓库及其依赖关系是否正确。
   - `apt clean`：清理下载的软件包缓存。

4. **软件包搜索与安装**：
   - `apt-cache search searched-package`：返回包含所要搜索字符串的所有软件包名称。
   - `apt-cdrom install package_name`：从光盘安装指定的软件包。

### DEB 包 (Debian, Ubuntu 以及类似系统)

1. **安装、删除和列出包**：
   - `dpkg -i package.deb`：安装或更新一个 `.deb` 包。
   - `dpkg -r package_name`：从系统删除一个已安装的 `.deb` 包。
   - `dpkg -l`：列出系统中所有已安装的 `.deb` 包。
   - `dpkg -l | grep httpd`：列出所有包含 "httpd" 字样的已安装 `.deb` 包。

2. **获取包的信息**：
   - `dpkg -s package_name`：显示已安装包的详细信息。
   - `dpkg -L package_name`：列出指定包所提供的文件。
   
3. **查看未安装包的内容**：
   - `dpkg --contents package.deb`：查看尚未安装的 `.deb` 包所包含的文件。
   
4. **确认文件属于哪个包**：
   - `dpkg -S /bin/ping`：确认指定的文件是由哪个 `.deb` 包提供的。
