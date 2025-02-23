---
title: Proxy
createTime: 2024/09/12 10:03:30
permalink: /notes/misc/network-proxy/
---

### 网络代理配置笔记

#### **MacOS & Linux**
##### 配置命令
```bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=$http_proxy
```

##### 快捷指令
```bash
function proxy_on() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=$http_proxy
    echo -e "终端代理已开启。"
}

function proxy_off(){
    unset http_proxy https_proxy
    echo -e "终端代理已关闭。"
}
```

---

#### **Windows CMD**
##### 配置命令
```cmd
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
```

##### 还原命令
```cmd
set http_proxy=
set https_proxy=
```

---

#### **Windows PowerShell**
##### 配置命令
```powershell
$env:http_proxy="http://127.0.0.1:1080"
$env:https_proxy="http://127.0.0.1:1080"
```

##### 还原命令
```powershell
$env:http_proxy=""
$env:https_proxy=""
```

---

#### **DNS 缓存相关操作**
1. **查看 DNS 缓存**  
   ```cmd
   ipconfig /displaydns
   ```
2. **清除 DNS 缓存**  
   ```cmd
   ipconfig /flushdns
   ```

---

#### **Netsh 代理配置**
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