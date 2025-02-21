---
title: Win2WinSSH
createTime: 2025/02/21 10:41:47
permalink: /notes/misc/win2win-ssh/
---

## 1. Win2Win SSH 注意事项

在配置[ActivityWatch](https://docs.activitywatch.net/en/latest/remote-server.html#i-know-what-i-m-doing-how-can-i-set-it-up-anyway)时，遇到如下提示：


> This is intentionally incomplete documentation, you’re expected to figure the
> rest out yourself (and if you can’t, you probably shouldn’t try.)

这一下激发了我的挑战欲……本来以为ssh配置很迅速，但期间因为`Add-WindowsCapability`
卡死和找不到`ssh-server`显示log的方法，以及权限上踩了坑，配置了很久，在此记录一下。


### 4.1 ssh-server安装推荐
   - Windows 自带的添加系统功能选项非常之慢，而且由于内部使用C#实现，各种不稳
     定，怒换choco
     - (不推荐) `Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0`
   - 强烈推荐使用 Chocolatey 安装 OpenSSH-Server
     - `choco install openssh --params='/SSHServerFeature' -y`
     - **日志路径明确**：不像 Windows 自带的日志在 Event Viewer 中打谜语一般模糊
       不清，choco 的日志清晰详细，方便查找。

### 4.2 防火墙配置
   - 放行必要的 **端口** 和 **子网** 即可，确保通信正常。
   
```powershell
$Subnet = "192.168.XX.0/24"
$Port = 22
$RuleName = "Allow-SSH-192.168.XX.0-24"

# 创建防火墙规则，允许入站流量
New-NetFirewallRule `
    -DisplayName $RuleName `
    -Direction Inbound `
    -Protocol TCP `
    -LocalPort $Port `
    -RemoteAddress $Subnet `
    -Action Allow `
    -Profile Any `
    -Description "允许从 192.168.22.0/24 子网到本地端口 22 的 SSH 流量"
```

### 4.3 服务端配置 (Server)
   1. **`ssh_config` 配置调整**  
      - 建议注释或移除 `Match Administrators` 段落，避免 `authorized_keys` 的默
        认目录指向错误。
      - 使用`DEBUG3`以便排查连接错误。

```ini
ListenAddress 192.168.XX.1 # 这里是本机路由接口
Port SERVER_PORT # SSH服务端口

# Logging
SyslogFacility LOCAL0
LogLevel VERBOSE

# Auth
MaxAuthTries 2
AllowUsers vmuser
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
PermitEmptyPasswords no
PermitRootLogin no
PubkeyAuthentication yes

#Forwarding
AllowAgentForwarding no
X11Forwarding no

Subsystem       sftp    sftp-server.exe

Match User user_name
    AllowTcpForwarding yes
    PermitTTY no
    ForceCommand cmd.exe /c exit
    PermitOpen 127.0.0.1:5600

# 强烈建议注释掉这里
# Match Group administrators
#        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

  2. **`authorized_keys` 权限设置**  
      Windows 的 ACL 权限系统非常复杂，不能直接用 `chmod`，需要以下步骤：  
      - 重新设置权限：
        ```
        icacls authorized_keys /reset
        icacls authorized_keys /inheritance:r
        icacls authorized_keys /grant <当前用户名>:(F)
        icacls authorized_keys /grant SYSTEM:(F)
        ```
      - 移除 NT Authorities 和其他用户的权限，确保只有当前用户和 SYSTEM。  
      - 注意：如果权限不正确，SSH Server 会拒绝加载 `authorized_keys`，需要到日
        志中排查错误。
    
  3. 排错日志路径是`C:\ProgramData\ssh\logs\sshd.log`，按如上方式启用DEBUG3级别
        的log后，可以看到具体问题。

### 4.4 客户端配置 (Client)
   - 客户端配置问题相对较少，按常规流程操作即可，无需额外调整。
   - 以下是参考配置，提高安全性，不分配TTY，只做端口转发。

```ini
Host aw-tunnel
    HostName 192.168.XX.XX # 服务器
    User user_name # 用户
    Port XXX # SSH 服务端口
    IdentityFile ~/.ssh/id_rsa  # 替换为你的密钥路径
    LocalForward 127.0.0.1:5600 127.0.0.1:5600
    ExitOnForwardFailure yes
    ServerAliveInterval 30
    TCPKeepAlive yes
    Compression yes
    LogLevel QUIET
```

完成后使用`ssh -N aw-tunnel`即可连接到主机。

### 4.5 独立用户

为提高安全性，可以新建普通用户专用于ssh.

```powershell
net user sshuser YourPassword /add
```

使用RunAs以不同用户身份运行程序:

```
runas /user:用户名 cmd
```
