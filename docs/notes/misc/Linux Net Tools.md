---
title: Linux Net Tools
tags:
  - utils
  - network
createTime: 2023/11/04 20:56:04
permalink: /notes/misc/linux-net-tools/
---

## Linux 网络代理配置

```bash
function setproxy() {
    export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
    export http_proxy="http://172.16.6.115:12607"
    export https_proxy=$http_proxy
    echo -e "Testing proxy access to Instagram..."
    title=$(curl -s https://www.instagram.com | grep -oP '(?<=<title>).*?(?=</title>)')
    if [[ -n "$title" ]]; then
        echo -e "Proxy set successfully. [Test Page Title: $title"]
    else
        echo -e "Proxy might not be working. Could not retrieve page title."
    fi
    proxy_ip=$(curl -s https://api64.ipify.org?format=json | grep -oP '(?<="ip":")[^"]+')
    if [[ -n "$proxy_ip" ]]; then
        echo -e "Current public IP (via proxy): $proxy_ip"
    else
        echo -e "Failed to retrieve public IP. Proxy might not be working."
    fi
}

function unsetproxy(){
    unset http_proxy
    unset https_proxy
    echo -e "proxy off"
}
```

## Linux 网络管理方式总结

Linux 中有三种主要的网络管理方式：

1. **最早的方法**：
   - 使用 `/etc/network/interfaces` 文件和 `ifup/ifdown` 脚本来管理网络接口。

2. **第二种方法**：
   - 引入了 `network-manager` 守护进程（通常写作 `Network-Manager`），它提供了图形界面（GUI）管理网络接口。

3. **第三种方法（最新的）**：
   - 使用 `systemd-networkd` 守护进程（有时简称为 `networkd`），它基于 `systemd` 单元文件进行管理。

### 判断系统是否使用 `systemd`

可以通过以下命令判断你的系统是否使用 `systemd`：
```bash
ps -p 1 -o comm=  # 通过查看进程ID为1的命令来判断是否使用systemd
```

- 如果输出为 `systemd`，则说明系统正在运行 `systemd`。
- 如果不是，则说明系统没有使用 `systemd`。

### 检查正在运行的网络服务

如果系统正在使用 `systemd`，可以使用以下命令检查网络服务守护进程的状态：

1. 检查 `systemd-networkd` 的状态：
   ```bash
   sudo service systemd-networkd status
   ```

2. 检查 `network-manager`（Ubuntu V21.10之前）：
   ```bash
   sudo service network-manager status
   ```

3. 检查 `NetworkManager`（Ubuntu V21.10及之后）：
   ```bash
   sudo service NetworkManager status
   ```

每个命令都会显示以下信息：
- `Active: active (running)` 表示服务正在运行。
- `Active: inactive (dead)` 表示服务未运行。

### 注意事项

即使某个网络服务守护进程正在运行，网络硬件接口不一定由该守护进程管理，具体取决于以下情况：

1. **NetworkManager 的例外**：
   - 如果在 `/etc/network/interfaces` 文件中定义了接口，`network-manager` 将忽略这些接口的管理。更多详情请参考 `man 5 NetworkManager`。

2. **systemd-networkd 的例外**：
   - `systemd-networkd` 仅管理那些在 `.network` 文件中定义了适当 `[Match]` 部分的链接。更多详情请参考 `man 8 systemd-networkd`。

### 来源

此信息来自 [Ask Ubuntu](https://askubuntu.com/questions/1031439/am-i-running-networkmanager-or-networkd)。

## 应用层

### 下载工具
- **Wget 和 Curl**
  - 使用 `wget` 和 `curl` 下载文件，具体操作详见相关手册。

### FTP 文件传输
- `ftp [ip/域名]` 连接到 FTP 服务器
- `passive` 开启/关闭被动模式
- 常用命令：
  - `ls` 列出文件
  - `mkdir` 创建目录
  - `rm` 删除文件
  - `lcd` 选择本地目录
  - `put [文件名]` 上传文件
  - `get [文件名]` 下载文件

### DNS 查询工具
- **resolvectl**：查看 DNS 状态信息
  ```bash
  $ resolvectl
  ```
  输出示例：
  ```
  Global
         Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
  resolv.conf mode: stub
  
  Link 2 (ens33)
      Current Scopes: DNS
          Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
  Current DNS Server: 192.168.22.2
         DNS Servers: 192.168.22.2
          DNS Domain: localdomain
  ```
- **whois**：查询域名的注册信息
- **nslookup**：查询 DNS 信息
- **dig**：查询 DNS 信息

## 抓包工具

1. **tcpview**  
   - 用于显示当前计算机上的所有活动网络连接和监听端口。可以查看每个连接的状态，
     使用的协议，连接的远程地址和端口等信息。

2. **wireshark**  
   - 强大的网络抓包工具，用于捕获并分析网络数据包。通过其图形化界面，用户可以深
     入分析网络流量、协议细节等。

   过滤表达式：
   - `(_ws.col.protocol != "ARP") && !(_ws.col.info contains ".arpa") && !(ip.dst == 129.104.223.255) && !(ipv6.dst == ff02::fb)`  
     用于过滤抓包数据：
     - 排除 ARP 协议。
     - 排除包含 ".arpa" 的信息。
     - 排除目标 IP 为 `129.104.223.255` 的数据包。
     - 排除目标 IPv6 为 `ff02::fb` 的数据包。

### nmap 示例

1. **nmap 扫描端口**  
   - `nmap -p 1006 panel.ourspeit.top`  
     扫描 `panel.ourspeit.top` 主机上的端口 `1006`。

2. **nmap 扫描 IKEv2 端口**  
   - `nmap -sU -p 500,4500 stu.vpn.sjtu.edu.cn`  
     扫描 `stu.vpn.sjtu.edu.cn` 主机上的 UDP 端口 `500` 和 `4500`，这些端口通常用于 IKEv2 协议。

## 管理工具

1. **nmcli / nmtui (NetworkManager)**  
   - **nmcli**：一个命令行工具，用于与 NetworkManager 进行交互，控制网络连接。
   - **nmtui**：NetworkManager 的文本用户界面（TUI），提供更直观的方式来管理网络
     连接，适用于没有图形界面的环境。

2. **netplan**  
   - Netplan 是一个用于配置网络的前端工具，支持 Ubuntu 桌面版的 NetworkManager
     和 Ubuntu 服务器版的 systemd-networkd。
   - 使用 YAML 配置文件来定义网络设置，是一个新的网络配置工具。它补充了
     NetworkManager（Ubuntu Desktop 默认）和 systemd-networkd（Ubuntu Server 使
     用）。
   
   **常见命令**：
   - `netplan apply`：应用配置更改。
   - `netplan generate`：生成系统配置。

### net-tools 的弃用

由于 `net-tools` 逐渐被弃用，以下是一些常见命令的替代方法：

- **arp** → `ip n` 或 `ip neighbor`  
  显示和操作 ARP 表。
  
- **ifconfig** → `ip a`（查看地址信息），`ip link`（查看链路状态），`ip -s`（查看统计信息）  
  用于查看和配置网络接口。
  
- **iptunnel** → `ip tunnel`  
  用于管理隧道设备。
  
- **iwconfig** → `iw`  
  用于配置无线网络接口。
  
- **nameif** → `ip link` 或 `ifrename`  
  用于更改网络接口名称。
  
- **netstat** → `ss`，`ip route`（查看路由表，替代 `netstat -r`），`ip -s link`（查看网络接口状态，替代 `netstat -i`），`ip maddr`（查看多播地址，替代 `netstat -g`）  
  `ss` 是一个更高效的替代 `netstat` 的工具，用于显示网络连接和套接字信息。

**参考来源**：[Unix Stack Exchange](https://unix.stackexchange.com/questions/258711/alternative-to-netstat-s)

## 网络层 (TCP/IP)

### **ss / netstat 监控 IP 协议链接**

- **netstat**（已弃用）：  
  用于显示网络连接、路由表、接口统计等。下面是一些常见的 `netstat` 命令选项：
  
  ```bash
  sudo netstat -tlunp
  ```
  
  选项说明：
  - `-t`：显示 TCP 连接。
  - `-l`：显示监听状态的套接字。
  - `-u`：显示 UDP 连接。
  - `-n`：不解析主机名，显示 IP 地址和端口号。
  - `-p`：显示使用该端口的进程 PID 和程序名称。Windows 中对应 `-o`。
  - `-o`：显示计时器信息。

  **输出示例**：
  ```
  Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
  tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      1596/cupsd          
  tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      791/systemd-resolve 
  tcp        0      0 127.0.0.54:53           0.0.0.0:*               LISTEN      791/systemd-resolve 
  tcp6       0      0 ::1:631                 :::*                    LISTEN      1596/cupsd          
  udp        0      0 127.0.0.54:53           0.0.0.0:*                           791/systemd-resolve 
  udp        0      0 127.0.0.53:53           0.0.0.0:*                           791/systemd-resolve 
  udp        0      0 0.0.0.0:631             0.0.0.0:*                           1623/cups-browsed   
  udp        0      0 0.0.0.0:53768           0.0.0.0:*                           1337/avahi-daemon:  
  udp        0      0 0.0.0.0:5353            0.0.0.0:*                           1337/avahi-daemon:  
  udp6       0      0 :::44723                :::*                                1337/avahi-daemon:  
  udp6       0      0 :::5353                 :::*                                1337/avahi-daemon:  
  ```

  **字段说明**：
  - **Proto**：协议类型（TCP, UDP, Raw）。
  - **Recv-Q**：已建立连接时，接收队列中的字节数；监听时，显示当前的 SYN 阻塞队列大小（自 Linux 2.6.18 起）。
  - **Send-Q**：已建立连接时，发送队列中的字节数；监听时，显示 SYN 阻塞队列的最大大小（自 Linux 2.6.18 起）。
  - **Local Address**：本地端口的地址和端口号。除非指定 `-n`，否则默认解析为主机名和服务名。
  - **Foreign Address**：远程端口的地址和端口号。
  - **State**：连接的状态，如 LISTEN（监听）、ESTABLISHED（已建立）等。
  - **PID/Program name**：显示占用该端口的进程 PID 和程序名称。

### **替代命令**（使用 `ss`）

- **ss**：`ss` 是 `netstat` 的现代替代工具，速度更快，支持更多的选项。
  - 示例：`ss -tulnp`
  - 功能类似 `netstat`，可以显示 TCP、UDP 连接及其相关信息，支持实时查看网络连接。

  示例输出：
  ```bash
  Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port
  tcp   LISTEN 0      128    127.0.0.1:631      *:*    
  tcp   LISTEN 0      128    127.0.0.53:53      *:*    
  udp   UNCONN  0      0      127.0.0.54:53      *:*    
  udp6  UNCONN  0      0      :::5353             :::*
  ``` 

`ss` 是一个推荐使用的工具，因为它具有更高效的性能和更丰富的功能。

### nftables 数据包的处理和转发

1. **nftables**  
   - `nftables` 是一个现代的网络过滤框架，旨在取代传统的 `iptables` 和 `ip6tables`，并提供更简洁和高效的处理方式。
   - 它提供了一个统一的接口来处理 IPv4、IPv6 数据包的过滤、NAT 和流量控制等。
   - `nftables` 引入了规则集和表（tables）的概念，允许对数据包的处理进行更加灵活和模块化的配置。

2. **iptables / ip6tables**  
   - **iptables** 和 **ip6tables** 是分别用于处理 IPv4 和 IPv6 数据包的传统工
     具。
   - 它们用于配置数据包过滤、网络地址转换（NAT）、端口转发等。虽然 `iptables` 已
     经被 `nftables` 替代，但许多系统仍然使用它们，尤其是在旧版系统中。
   - `iptables` 和 `ip6tables` 通过链（chains）和规则（rules）来处理数据包。

   **注意**：  
   `iptables` 是一个较为陈旧的框架，而 `nftables` 旨在提供一个现代化的替代方案，
   并且包括一个兼容层，使得旧的 `iptables` 配置可以与 `nftables` 一起使
   用。`nftables` 在效率、灵活性以及简化规则管理方面都有显著改进。

**来自**：[ArchWiki - Iptables](https://wiki.archlinux.org/title/Iptables)

### `ip addr`/`get-netadapter` 查看网络接口层信息

- `ip addr`：查看网络接口信息
- `get-netadapter`：PowerShell中查看网络适配器信息（Windows系统）

#### 命令输出解析：
```bash
$ ip addr

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute 
       valid_lft forever preferred_lft forever

2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:0c:29:4c:eb:e8 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.22.128/24 brd 192.168.22.255 scope global dynamic noprefixroute ens33
       valid_lft 1385sec preferred_lft 1385sec
    inet6 fe80::20c:29ff:fe4c:ebe8/64 scope link 
       valid_lft forever preferred_lft forever

inet 127.0.0.1/8 scope host lo
    - inet 127.0.0.1/8: 这是该接口的 IPv4 地址，127.0.0.1 是环回地址，/8 表示子网掩码 255.0.0.0。
    - scope host: 地址的作用域为主机（只能在本地主机上通信）。
    - lo: 指示该 IP 地址属于 `lo` 接口。
    - valid_lft forever preferred_lft forever
        ○ valid_lft forever: 该 IP 地址永不过期。
        ○ preferred_lft forever: 该地址的优先使用期永不过期。

inet6 ::1/128 scope host noprefixroute
    - inet6 ::1/128: 这是环回接口的 IPv6 地址，::1 是 IPv6 的本地环回地址，/128 表示单个地址。
    - scope host: 作用域为本地主机。
    - noprefixroute: 不使用前缀路由。
    - valid_lft forever preferred_lft forever 与 IPv4 相同，表示地址和优先期永不过期。

net 192.168.22.128/24 brd 192.168.22.255 scope global dynamic noprefixroute ens33
    - inet 192.168.22.128/24: 该接口的 IPv4 地址，192.168.22.128 是地址，/24 表示子网掩码 255.255.255.0。
    - brd 192.168.22.255: 这是该子网的广播地址。
    - scope global: 该 IP 地址的作用域是全局（可与外部网络通信）。
    - dynamic: 表明此地址是动态分配的（通常通过 DHCP）。
    - noprefixroute: 不使用前缀路由。
    - ens33: 该地址属于 `ens33` 接口。
    - valid_lft 1510sec preferred_lft 1510sec
        ○ valid_lft 1510sec: 该 IP 地址在 1510 秒内有效。
        ○ preferred_lft 1510sec: 该 IP 地址在 1510 秒内为首选。

inet6 fe80::20c:29ff:fe4c:ebe8/64 scope link
    - inet6 fe80::20c:29ff:fe4c:ebe8/64: 这是接口的 IPv6 链路本地地址，`fe80::/64` 是链路本地地址空间。
    - scope link: 该地址的作用域仅限于本地链路（不能通过路由器转发）。
    - valid_lft forever preferred_lft forever 与 IPv4 的有效期类似，这个地址也是永不过期的。
```

1. **lo（环回接口）**  
   ```
   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
       inet 127.0.0.1/8 scope host lo
          valid_lft forever preferred_lft forever
       inet6 ::1/128 scope host noprefixroute
          valid_lft forever preferred_lft forever
   ```
   - **inet 127.0.0.1/8**:  
     - **127.0.0.1** 是该接口的 IPv4 地址，`/8` 表示子网掩码 255.0.0.0。
     - **scope host**: 地址作用域为主机（仅能在本地主机通信）。
     - **lo**: 该 IP 地址属于 `lo` 接口。
     - **valid_lft forever**: 该 IP 地址永不过期。
     - **preferred_lft forever**: 该地址的优先使用期永不过期。

   - **inet6 ::1/128**:  
     - **::1** 是 IPv6 本地环回地址，`/128` 表示单个地址。
     - **scope host**: 地址作用域为本地主机。
     - **noprefixroute**: 不使用前缀路由。
     - **valid_lft forever** 和 **preferred_lft forever**: 地址和优先期永不过期。

2. **ens33（网络接口）**  
   ```
   2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
       link/ether 00:0c:29:4c:eb:e8 brd ff:ff:ff:ff:ff:ff
       altname enp2s1
       inet 192.168.22.128/24 brd 192.168.22.255 scope global dynamic noprefixroute ens33
          valid_lft 1385sec preferred_lft 1385sec
       inet6 fe80::20c:29ff:fe4c:ebe8/64 scope link
          valid_lft forever preferred_lft forever
   ```
   - **inet 192.168.22.128/24**:  
     - **192.168.22.128** 是该接口的 IPv4 地址，`/24` 表示子网掩码 255.255.255.0。
     - **brd 192.168.22.255**: 这是该子网的广播地址。
     - **scope global**: 地址作用域为全局（可与外部网络通信）。
     - **dynamic**: 表明该地址是动态分配的（通常通过 DHCP）。
     - **noprefixroute**: 不使用前缀路由。
     - **ens33**: 该地址属于 `ens33` 接口。
     - **valid_lft 1385sec**: 该 IP 地址在 1385 秒内有效。
     - **preferred_lft 1385sec**: 该地址在 1385 秒内为首选。

   - **inet6 fe80::20c:29ff:fe4c:ebe8/64**:  
     - **fe80::20c:29ff:fe4c:ebe8/64** 是接口的 IPv6 链路本地地址，`fe80::/64` 是链路本地地址空间。
     - **scope link**: 该地址作用域仅限本地链路（不能通过路由器转发）。
     - **valid_lft forever** 和 **preferred_lft forever**: 地址和优先期永不过期。

### `tcpdump` 监听网络接口流量的笔记：

#### 1. **基本命令**
   - 使用 `tcpdump` 监听网络接口流量：
     ```bash
     tcpdump -i <interface> -nn
     ```
     例如：
     ```bash
     sudo tcpdump -i ens33 -nn
     ```

   **命令解释**：
   - `-i <interface>`：指定要监听的网络接口（如 `ens33`）。
   - `-nn`：禁止将主机名和端口号解析为名称，显示原始IP和端口信息。

#### 2. **输出示例**
   ```bash
   tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
   listening on ens33, link-type EN10MB (Ethernet), snapshot length 262144 bytes
   22:26:45.843638 ARP, Request who-has 192.168.22.2 tell 192.168.22.1, length 46
   22:26:45.932871 IP 192.168.22.1.55999 > 239.255.255.250.1900: UDP, length 175
   22:26:46.948501 IP 192.168.22.1.55999 > 239.255.255.250.1900: UDP, length 175
   22:26:47.246930 ARP, Request who-has 192.168.22.2 tell 192.168.22.1, length 46
   22:26:47.854029 ARP, Request who-has 192.168.22.2 tell 192.168.22.1, length 46
   22:26:47.963187 IP 192.168.22.1.55999 > 239.255.255.250.1900: UDP, length 175
   22:26:48.853831 ARP, Request who-has 192.168.22.2 tell 192.168.22.1, length 46
   22:26:48.978460 IP 192.168.22.1.55999 > 239.255.255.250.1900: UDP, length 175
   ```

#### 3. **输出说明**
   - `listening on ens33`：表示监听的网络接口是 `ens33`。
   - `link-type EN10MB (Ethernet)`：表示链路类型为 Ethernet。
   - `snapshot length 262144 bytes`：表示抓包的快照长度为 262144 字节。
   - 时间戳：每行开头显示的时间戳（例如 `22:26:45.843638`）。
   - `ARP Request who-has`：表示 ARP 请求，查询谁拥有 IP 地址。
   - `IP <src_ip>.<src_port> > <dst_ip>.<dst_port>: UDP, length <length>`：表示 UDP 数据包的传输，显示源 IP、源端口、目标 IP、目标端口和数据包长度。

#### 4. **抓包统计**
   - `8 packets captured`：表示共捕获了 8 个数据包。
   - `8 packets received by filter`：表示过滤器接收了 8 个数据包。
   - `0 packets dropped by kernel`：表示没有丢失任何数据包。

### `ip route` 查看路由表

以下是关于 `ip route` 和 `route` 路由表查询的整理笔记：

#### 1. **基本命令**
   - **查看路由表**：
     - `route -n`（`route` 命令已被废弃）：
       ```bash
       route -n
       ```
     - `ip route`：
       ```bash
       ip route
       ```

#### 2. **输出示例**（`route -n`）
   ```bash
   Kernel IP routing table
   Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
   0.0.0.0         192.168.10.254  0.0.0.0         UG    100    0        0 enp1s0
   192.168.10.0    0.0.0.0         255.255.255.0   U     100    0        0 enp1s0
   ```

#### 3. **字段解释**
   - **Destination**：目标网络的 IP 地址。
     - 例如，`0.0.0.0` 表示默认路由，代表任何地址。
   - **Gateway**：下一跳网关的 IP 地址。如果为 `0.0.0.0`，表示目标地址与当前网络
     直接连接，无需通过网关。
   - **Genmask**：子网掩码（Netmask），用来定义目标网络的地址范围。
     - 例如，`255.255.255.0` 表示子网掩码。
   - **Flags**：
     - `U`：该路由是可用的（Up）。
     - `G`：该路由需要通过网关进行传递（Gateway）。
     - `H`：该路由指向一台主机，而不是一个网络。
   - **Metric**：路由的优先级，数字越小优先级越高。
   - **Ref**：此字段通常为 0，表示路由参考计数。
   - **Use**：表示此路由表的使用次数。
   - **Iface**：网卡接口，即该路由适用的网络接口（如 `enp1s0`）。

## Troubleshooting

以下是关于 `ping`, `traceroute`, `mtr`, 和 `nmap` 的 Troubleshooting 相关的笔记：

### 1. **Ping / Traceroute：ICMP协议**

   - **Ping**：用于检查目标主机的可达性，基于 ICMP 协议，通过向目标发送回显请求
     （Echo Request）来测试网络连通性。

   - **Traceroute (tracert)**：
     - **功能**：用于追踪数据包到达目标主机所经过的路径。它通过发送 ICMP 数据包
       并记录每跳（router）返回的时间和 IP 地址来实现路径跟踪。
     
     **运行过程**：
     1. **发送 ICMP 数据包**：tracert 使用 ICMP 协议发送一个带有有限生存时间
        （TTL, Time to Live）的数据包到目标主机。TTL 限制数据包的跳数，避免在网
        络中无限循环。
     2. **TTL 逐步增加**：每次发送数据包时，TTL 从 1 开始，逐步增加，经过每个路
        由器时，TTL 减少。当 TTL 为 0 时，路由器丢弃该数据包并发送 ICMP 超时消
        息。
     3. **路由器响应**：路由器收到 TTL 为 0 的数据包时，返回一个 ICMP 超时消
        息，tracert 捕获这些消息并记录下每个路由器的 IP 地址和响应时间。
     4. **重复此过程直到目标**：tracert 持续增加 TTL 并发送数据包，直到成功到达
        目标主机，或者达到最大跳数（通常是 30）。

   - **命令示例**：
     ```bash
     tracert <destination_ip_or_host>
     ```

### 2. **MTR：ICMP**
   - **mtr 命令**（My Traceroute）结合了 `ping` 和 `traceroute` 命令的元素，提供
     实时的网络质量信息。它是一个非常好的工具，用于排查高延迟和丢包问题。
   
   - **功能**：mtr 命令将每一跳的延迟和丢包率实时显示，帮助用户更有效地诊断网络
     问题。
   
   - **命令示例**：
     ```bash
     mtr <destination_ip_or_host>
     ```

### 3. **Nmap**
   - **nmap**（Network Mapper）是一个开源的网络扫描工具，用于网络发现和安全审
     计。它可以检测主机、服务、操作系统以及开放端口。

   - **命令示例**：
     - 检查指定主机的端口：
       ```bash
       nmap -p 1006 panel.ourspeit.top
       ```
     - 使用 UDP 扫描检查指定端口：
       ```bash
       sudo nmap -sU -p 500,4500 stu.vpn.sjtu.edu.cn
       ```
       解释：
       - `-sU`：使用 UDP 扫描。
       - `-p`：指定端口。
       - `stu.vpn.sjtu.edu.cn`：目标主机。

       以下是关于 **VPN** 和 **strongSwan** 配置的整理笔记：

## VPN 配置

### 1. **启动 VPN**
   - **启动强制模式**（允许配置修改）：
     ```bash
     sudo aa-complain /usr/lib/ipsec/charon
     sudo aa-complain /usr/lib/ipsec/stroke
     ```
   - **重启 ipsec 服务**：
     ```bash
     sudo ipsec restart
     ```
   - **加载配置**：
     ```bash
     sudo swanctl --load-all
     ```
   - **启动 VPN**：
     ```bash
     sudo swanctl -i --child vpn-student
     ```

### 2. **停止 VPN**
   - **停止 VPN**：
     ```bash
     sudo swanctl -t --ike vpn-student
     ```

### 3. **配置 VPN 环境**
   - **安装必要的软件包**：
     ```bash
     sudo apt install -y apparmor-utils # (Ubuntu 桌面版本)
     sudo apt install -y strongswan strongswan-swanctl
     sudo apt install -y libstrongswan-extra-plugins libcharon-extra-plugins
     sudo apt install -y libcharon-extauth-plugins libstrongswan-standard-plugins
     ```
   - **移除证书文件并创建符号链接**：
     ```bash
     sudo rm -f /etc/ipsec.d/cacerts/*
     sudo ln -s /etc/ssl/certs/* /etc/ipsec.d/cacerts/
     ```
   - **编辑 VPN 配置文件**：
     ```bash
     sudo vim /etc/swanctl/conf.d/sjtuvpn.conf
     sudo chmod 0600 /etc/swanctl/conf.d/sjtuvpn.conf
     ```
   - **配置撤销文件**：
     ```bash
     sudo vim /etc/strongswan.d/charon/revocation.conf
     ```

### 4. **实用工具**
   - **获取公网 IP 地址**：
     - `47.116.28.185 whatsmyip.ourspeit.top`
     - `111.186.59.160 whatismyip.sjtu.edu.cn`

### 5. **后记：调试与问题排查**
   1. **调试过程**：
      - 使用 `journalctl` 查看日志时，发现问题是由于 Ubuntu 默认安装的
        `apparmor` 拒绝了 strongSwan 修改 `/etc/resolv.conf`，导致连接失败。
   2. **在 WSL 中重新配置**：
      - 重新配置时没有出现问题，推测可能是由于交大 VPN 页面要求安装
        `resolvctl`（已弃用）造成的问题。
   3. **问题定位**：
      - 经验证，问题源于 `resolvctl` 配置错误，导致 VPN 无法正常连接。

## 链路层

以下是整理后的链路层相关命令及解释：

### 1. **查看链路层接口信息： `ip link`**

   - 使用 `ip link` 命令查看网络接口的链路层信息：
     ```bash
     ip link
     ```

   **输出示例**：
   ```bash
   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
   2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
       link/ether 00:0c:29:4c:eb:e8 brd ff:ff:ff:ff:ff:ff
       altname enp2s1
   ```

   **解释**：
   - **接口编号和名称**：
     - `lo`：回环接口（loopback interface），编号为 1。
     - `ens33`：以太网接口，编号为 2。
   - **接口标志**：
     - `<LOOPBACK, UP, LOWER_UP>`：`lo` 接口的标志。表示回环接口已启用，且物理链路已连接。
     - `<BROADCAST, MULTICAST, UP, LOWER_UP>`：`ens33` 接口的标志。表示支持广
       播、组播，已启用，物理链路已连接。
   - **MTU（最大传输单元）**：
     - `mtu 65536`：回环接口的 MTU 值是 65536 字节。
     - `mtu 1500`：`ens33` 接口的 MTU 值为 1500 字节（以太网标准）。
   - **qdisc（队列调度器）**：
     - `qdisc noqueue`：`lo` 接口没有队列调度器。
     - `qdisc pfifo_fast`：`ens33` 接口使用 Linux 默认的队列调度器。
   - **state（接口状态）**：
     - `state UNKNOWN`：`lo` 接口的状态，通常没有明确的“状态”。
     - `state UP`：`ens33` 接口的状态，表示接口已启用并处于活动状态。
   - **link（链路层信息）**：
     - `link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00`：回环接口的链路层信息。
     - `link/ether 00:0c:29:4c:eb:e8 brd ff:ff:ff:ff:ff:ff`：以太网接口的 MAC 地址是 `00:0c:29:4c:eb:e8`，广播地址是 `ff:ff:ff:ff:ff:ff`。

### 2. **查看 ARP 表： `ip neigh` / `arp`**

   - 使用 `ip neigh` 查看 ARP 表信息：
     ```bash
     ip neigh
     ```

   **输出示例**：
   ```bash
   172.30.64.1 
   dev eth0
   lladdr 00:15:5d:b0:32:f1
   STALE
   ```

   - 使用 `arp -n` 查看 ARP 表（该命令已被废弃）：
     ```bash
     arp -n
     ```

   **输出示例**：
   ```bash
   Address                  HWtype  HWaddress           Flags Mask            Iface
   192.168.22.254           ether   00:50:56:f9:3e:d0   C                     ens33
   192.168.22.2             ether   00:50:56:f4:21:18   C                     ens33
   ```

   **解释**：
   - `Address`：目标 IP 地址。
   - `HWaddress`：目标设备的 MAC 地址。
   - `Flags`：标志位（如 `C` 表示已缓存）。
   - `Iface`：使用的网络接口（如 `ens33`）。
   - `STALE`：表示 ARP 表项为过时状态。

### 3. **查看以太网接口参数： `ethtool`**

   - 使用 `ethtool` 查看以太网接口的详细参数：
     ```bash
     ethtool eno1
     ```

   **输出示例**：
   ```bash
   Settings for eno1:
           Supported ports: [ TP ]
           Supported link modes:   10baseT/Half 10baseT/Full
                                   100baseT/Half 100baseT/Full
                                   1000baseT/Full
           Speed: 1000Mb/s
           Duplex: Full
           Auto-negotiation: on
           Port: Twisted Pair
           PHYAD: 1
           Transceiver: internal
           MDI-X: off (auto)
           Supports Wake-on: pumbg
           Wake-on: g
           Link detected: yes
   ```

   **解释**：
   - **支持的连接模式**（Supported link modes）：显示支持的连接速度，如 1000baseT/Full，表示支持 1Gbps 的全双工连接。
   - **当前速度**（Speed）：当前连接速度，如 `1000Mb/s`。
   - **双工模式**（Duplex）：表示是否为全双工（Full）或半双工（Half）。
   - **自动协商**（Auto-negotiation）：是否启用自动协商，`on` 表示启用。
   - **网络线类型**（Port）：使用的网络线类型，`Twisted Pair` 表示双绞线。
   - **Link detected**：是否检测到链路连接，`yes` 表示已连接。
