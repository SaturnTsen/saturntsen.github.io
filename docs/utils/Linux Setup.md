---
title: Linux Setup
tags:
   - utils
createTime: 2024/02/04 13:47:40
permalink: /utils/Linux-Setup/
---

### 系统初始化

#### 服务器安装宝塔面板
- 安装链接：[宝塔面板安装](https://www.bt.cn/bbs/thread-19376-1-1.html)

#### 换源
1. 在`/etc/apt`目录下生成初始文件：
   ```bash
   cd /etc/apt
   cp sources.list sources.list.bak  # 备份默认源
   cat sources.list.bak | sed "%s/[a-z]*\.ubuntu\.com/mirrors.aliyun.com/g" > sources.list
   apt update
   ```

#### 安装常用包
```bash
apt install -y wget curl vim gcc g++ clangd git make cmake aconf
apt install -y zsh sudo  # 可选
unminimize && apt install -y man  # 可选
```

---

### 中文环境配置

#### 更改Ubuntu语言
1. 安装语言管理工具：
   ```bash
   apt install locales
   ```

2. 安装字体：
   ```bash
   apt install language-pack-zh-hans
   ```

3. 更改语言：
   ```bash
   locale-gen zh_CN.UTF-8
   ```

4. 添加语言环境设置：
   ```bash
   update-locale LANG=zh_CN.UTF-8 LANGUAGE=zh_CN.UTF-8 LC_ALL=zh_CN.UTF-8
   ```

5. 更新环境变量：
   ```bash
   printf "export LANG=zh_CN.UTF-8\nexport LANGUAGE=zh_CN.UTF-8\nexport LC_ALL=zh_CN.UTF-8\n" >> /etc/profile
   source /etc/profile
   ```

#### 其他
1. 使用`localectl`命令显示当前locale：
   ```bash
   localectl
   ```

2. 检查语言是否已安装：
   ```bash
   cat /etc/default/profile  # 检查是否安装语言
   cat /etc/profile          # 检查环境变量是否有中文
   ```

---

### 容器内字体配置
容器内无需安装字体，但如果需要：
1. 安装文泉驿字体：
   ```bash
   apt install ttf-wqy-microhei   # 文泉驿-微米黑
   apt install ttf-wqy-zenhei     # 文泉驿-正黑
   apt install xfonts-wqy         # 文泉驿-点阵宋体
   ```

---

### 其他配置

#### ZSH
1. 手动安装ZSH，参考：
   - [安装方法1](https://unix.stackexchange.com/questions/123597/building-zsh-without-admin-priv-no-terminal-handling-library-found)
   - [安装方法2](https://zsh.sourceforge.io/FAQ/zshfaq01.html#l7)

#### QQ AppImage
安装必要的依赖：
```bash
sudo apt install libfuse2 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgtk-3-0 libgbm-dev libasound2 libxcb1 libgl1 xdg-utils
```

#### Gnome/KDE 和 X11-Window/Wayland
- **Gnome** 和 **KDE** 是图形化界面的前端。
- **X11-Window** 和 **Wayland** 是图形化API。

#### 同步/异步 - 阻塞/非阻塞
- **同步**：执行的操作需要等待完成才能继续。
- **异步**：执行的操作无需等待，可以继续执行后续任务。
- **阻塞**：当前任务完成之前，不会有其他操作。
- **非阻塞**：当前任务完成前，其他操作可以进行。

### WSL初始化文件

```bash
#!/bin/bash
# init_vpn.sh

## USAGE
usage() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  vpn_username=XXX your VPN username"
    echo "  password=XXX     your VPN password"
    cleanup
    exit 1
}

# Function to clear password variables
# Trap SIGINT (Ctrl+C) to call cleanup function
cleanup() {
    unset PASSWORD
    unset VPN_NAME
    echo "Interruption"
    exit 1
}
trap cleanup SIGINT

# Initialize variables
user_name=$(whoami)
vpn_name=""
vpn_password=""

for arg in "$@"; do
    # Check if the argument starts with 'password='
    if [[ $arg == password=* ]]; then
        # Extract the password value
        vpn_password="${arg#password=}"
    elif [[ $arg == vpn_username=* ]]; then
        vpn_name="${arg#vpn_username=}"
    fi
done

if [[ -z $vpn_password || -z $vpn_name ]]; then
    echo "Error: No vpn_username and password argument found."
    usage  # Display usage information and exit

## UPDATES AND INSTALLATIONS
echo 'INSTALLING PACKAGES…'
sudo apt update
sudo apt upgrade -y
# sudo apt install -y apparmor-utils (for Ubuntu desktop distro)
sudo apt install -y ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy
sudo apt install -y strongswan strongswan-swanctl
sudo apt install -y libstrongswan-extra-plugins libcharon-extra-plugins
sudo apt install -y libcharon-extauth-plugins libstrongswan-standard-plugins
sudo rm -f /etc/ipsec.d/cacerts/*
sudo ln -s /etc/ssl/certs/* /etc/ipsec.d/cacerts/

## CONFIGURE VPN
echo 'CONFIGURING VPN'
sudo bash -c "cat <<EOF > '/etc/swanctl/conf.d/sjtuvpn.conf'
connections {
 vpn-student { 
  vips = 0.0.0.0,:: 
  remote_addrs = stu.vpn.sjtu.edu.cn 
  send_certreq = no 
  local { 
   auth = eap-peap 
   eap_id = username
   aaa_id = @radius.net.sjtu.edu.cn 
  } 
  remote { 
   auth = pubkey 
   id = @stu.vpn.sjtu.edu.cn 
  } 
  children { 
   vpn-student { 
   remote_ts = 0.0.0.0/0,::/0 
   } 
  } 
  version = 2 
  mobike = no 
 } 
}

secrets {
 eap-jaccount {
  id = username
  secret = \"PASSWORD\"
 }
}
EOF"
sudo sed -i -e "s/eap_id = username/eap_id = $vpn_name/" \
             -e "s/id = username/id = $vpn_name/" \
             -e "s/secret = \"PASSWORD\"/secret = \"$vpn_password\"/" \
             "/etc/swanctl/conf.d/sjtuvpn.conf"
sudo chmod 0600 /etc/swanctl/conf.d/sjtuvpn.conf
sudo sed -i 's/load = yes/load = no/' /etc/strongswan.d/charon/revocation.conf

## FIREFOX
echo 'INSTALLING FIREFOX'
sudo snap install firefox
echo "firefox > /dev/null 2>&1 &" > "/home/${user_name}/firefox.sh"
sudo chmod 755 "/home/${user_name}/firefox.sh"
sudo ln -s "/home/${user_name}/firefox.sh" "/usr/bin/browser"

## CREATE SHORTCUTS 
echo 'CREATING SHORTCUTS'
sudo cat <<EOF > "/home/${user_name}/vpnon.sh"
# sudo aa-complain /usr/lib/ipsec/charon
# sudo aa-complain /usr/lib/ipsec/stroke
sudo ipsec restart
sleep 0.5s
sudo swanctl --load-all
sudo swanctl -i --child vpn-student
EOF
sudo chmod 755 "/home/${user_name}/vpnon.sh"
echo "sudo swanctl -t --ike vpn-student" > "/home/${user_name}/vpnoff.sh"
sudo chmod 755 "/home/${user_name}/vpnoff.sh"
sudo ln -s "/home/${user_name}/vpnon.sh" "/usr/sbin/vpnon"
sudo ln -s "/home/${user_name}/vpnoff.sh" "/usr/sbin/vpnoff"
```