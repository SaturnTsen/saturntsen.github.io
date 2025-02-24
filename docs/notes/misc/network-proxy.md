---
title: Network
createTime: 2024/09/12 10:03:30
permalink: /notes/misc/network-proxy/
---

## 网络代理配置笔记

### 配置

1. 设置代理
 ```powershell
 $env:http_proxy="http://127.0.0.1:1080"
 $env:https_proxy="http://127.0.0.1:1080"
 ```
2. 还原
 ```powershell
 $env:http_proxy=""
 $env:https_proxy=""
 ```
3. 快捷指令

```powershell
# proxies
function proxyon {
        $env:http_proxy="http://192.168.22.135:1080"
        $env:https_proxy="http://192.168.22.135:1080"
        Write-Host "proxy set"
}
function proxyoff {
        $env:http_proxy=""
        $env:https_proxy=""
        Write-Host "proxy cleared"
}
```

### **DNS 缓存相关操作**
1. **查看 DNS 缓存**  
   ```cmd
   ipconfig /displaydns
   ```
2. **清除 DNS 缓存**  
   ```cmd
   ipconfig /flushdns
   ```

### **Netsh 代理配置**
1. **设置代理**
   ```cmd
   netsh winhttp set proxy host:port
   ```
   示例：
   ```cmd
   netsh winhttp set proxy 127.0.0.1:7890
   ```
2. **查看代理服务器列表**
   ```cmd
   netsh winhttp show proxy
   ```
3. **重置代理服务器列表**
   ```cmd
   netsh winhttp reset proxy
   ```

## Powershell 中的网络管理
### 网络接口层
1. **查看网络连接**
   ```powershell
   Get-NetConnectionProfile
   ```
2. **重命名网络连接**
   ```powershell
   Rename-NetConnectionProfile -InterfaceAlias "Ethernet" -NewName "Local"
   ```
3. **查看网络适配器**
   ```powershell
   Get-NetAdapter -IncludeHidden
   ```
4. **查看网络配置**
   ```powershell
   Get-NetIPAddress
   ```

### 网络层
1. **查看网络路由**
   ```powershell
   Get-NetRoute
   ```
2. **添加网络路由**
   ```powershell
   New-NetRoute -DestinationPrefix "192.168.1.0/24" -NextHop "192.168.1.1" -InterfaceAlias "Ethernet"
   ```
3. **移除网络路由**
   ```powershell
   Remove-NetRoute -DestinationPrefix "192.168.1.0/24" -NextHop "192.168.1.1" -InterfaceAlias "Ethernet"
   ```

### 应用层
1. **防火墙**
   ```powershell
   Get-NetFirewallRule
   ```
2. **启用防火墙规则**
   ```powershell
   Enable-NetFirewallRule -DisplayName "File and Printer Sharing (Echo Request - ICMPv4-In)"
   ```
3. **禁用防火墙规则**
   ```powershell
   Disable-NetFirewallRule -DisplayName "File and Printer Sharing (Echo Request - ICMPv4-In)"
   ```

### 其他常用命令
1. **查看网络统计信息**
   ```powershell
   Get-NetTCPConnection
   ```
2. **测试网络连接**
   ```powershell
   Test-NetConnection -ComputerName "www.google.com"
   ```
3. **查看网络适配器统计信息**
   ```powershell
   Get-NetAdapterStatistics
   ```

## Cmd 中的网络管理

### 网络接口层
1. **ipconfig**：用于显示网络接口
   ```cmd
   ipconfig /all
   ```
2. **netsh**: 用于配置网络接口、防火墙、路由等
   ```cmd
   netsh
   ```
3. **arp**: 用于查看 ARP 缓存
   ```cmd
   arp -a
   ```

### 网络层
1. **route**: 用于配置网络路由
   ```cmd
   route print
   ```
2. **netstat**: 用于查看网络连接
   查看端口占用
   ```cmd
   netstat -ano | findstr :8086
   ```
3. **rasdial**：用于连接 VPN
   ```cmd
   rasdial "VPN Connection" username password
   ```

### 应用层
1. **nslookup**: 用于查询 DNS
   ```cmd
   nslookup www.google.com
   ```
2. **traceroute**: 用于追踪数据包的路径
   ```cmd
   tracert www.google.com
   ```
3. **ping**: 用于测试网络连接
   ```cmd
   ping www.google.com
   ```
   ```

## Troubleshooting:

有时候端口没占用，为什么就用不了？
如果安装了Hyper-V，那么有时候端口会被系统保留，需要通过以下命令查看：
```cmd
netsh int ipv4 show excludedportrange protocol=tcp
```
