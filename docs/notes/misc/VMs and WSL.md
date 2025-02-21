---
title: VMs
createTime: 2024/02/04 18:31:53
permalink: /notes/misc/vms/
---


## VirtualBox

### 虚拟机挂载主机文件
1. **设置共享文件夹** 在 VirtualBox 中。
2. 在虚拟机中创建一个目录
   ```bash
   mkdir /path/to/mount
   ```
3. 挂载共享文件夹
   ```bash
   sudo mount -t vboxsf shared_folder_name /path/to/mount
   ```
## VMware

### Static DHCP

```powershell
cd C:\ProgramData\VMware
vim vmnetdhcp.conf
```

```
# Windows 11 x64
host VMnet8 {
    hardware ethernet 00:0C:29:FC:71:56;
    fixed-address 192.168.22.135;
}
```

then restart the VMware DHCP service.

```powershell
net stop vmnetdhcp
net start vmnetdhcp
```

Reference: [How To Assign A Static IP Address To A VMWare Workstation VM](https://medium.com/shehuawwal/how-to-assign-a-static-ip-address-to-a-vmware-workstation-vm-de7773f9ef19)