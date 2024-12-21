---
title: Powershell 和 oh-my-posh
createTime: 2024/02/11 15:00
permalink: /utils/powershell-and-oh-my-posh/
---

## 目录
1. 简介
2. 常用指令
   - 查询指令
   - 操作符：Comparison Operators
   - 系统操作
   - PowershellGet：Powershell 包管理器
3. Oh-my-posh
4. 参考 Profile

---

## 简介
Powershell 是基于 .NET 和 C# 开发的交互式命令行工具。

- **特点**：
  - Powershell 管道内传送的不是字符串，而是 C# 对象。因此每个命令实际上返回的是一个对象，具有属性和方法。
  - 命令行实际输出是当前对象的 `textstring`，类似于 IPython。

- **设计理念**：
  - **Filter Left, Format Right**
    - Filter Left：尽可能减少管道的使用。
    - Format Right：因为格式化之后就不是原来的对象了。

---

## 常用指令

### 查询指令
- **获取帮助信息**：
  - `Get-Help help`
  - `help 指令名 -Online(-o)`：查找在线帮助。
  - `help 指令名 -Full`：显示所有帮助文档。
  - `help 指令名 -Examples(-e)`：查找示例。
  - `help 指令名 -Parameter 参数名`：查找某参数的说明。

- **获取命令信息**：
  - `Get-Command` (`gcm`, `command`)
    - `command 名称`：返回名称对应的指令对象。
    - `command 名称 -Syntax`：查找该命令的常用用法。
    - `Get-Command -ParameterType 类型`：查找接受该类型对象作为输入的命令。
  - `Get-MrPipelineInput -Name 指令名`：查看指令接受管道输入的类型。

- **获取对象信息**：
  - `Get-Member` (`gm`, `member`)
    - `member`：获取对象的成员变量和函数。
    - 返回值中 `TypeName` 表示当前对象的类型。
    - `Get-Member -MemberType Method, Property, ...`

- **获取别名**：
  - `Get-Alias` (`gal`, `alias`)
    - `alias -def cmdlet`：获取指令的别名。
    - `alias`：获取所有别名。

### 操作符：Comparison Operators
- **常用过滤和格式化命令**：
  - `Select-Object` (`select`)：接收一个列表，将每个元素逐个过滤，返回指定属性。
  - `Select-String` (`sls`)：接收一个字符串，逐个过滤，返回筛选结果的清单。
  - `Format-List` (`fl`)：将对象在控制台输出成每行一个键值对的格式。
  - `Format-Table` (`ft`)：将对象在控制台输出成横向表格的格式。

### 系统操作
- **文件与目录操作**：
  - `Get-PSProvider`
  - `Get-PSDrive` (`psdrive`)
  - `Get-ChildItem` (`ls`)
  - `Set-Location` (`cd`)
  - `New-ItemProperty`
  - `Get-ItemProperty` (`gp`)
  - `Set-ItemProperty` (`sp`)

- **进程与服务操作**：
  - `Get-Process` (`ps`)
  - `Start-Process` (`start`)
  - `Get-Service` (`gsv`)
    - 示例：`gsv -Name w32time`
  - `Start-Service` (`sasv`)
    - 示例：`sasv -PassThru`
  - `Get-EventLog` (`eventlog`)

- **其他操作**：
  - `Out-Host` (`oh`)

### PowershellGet：Powershell 包管理器
- **常用指令**：
  - 查找模块：
    ```powershell
    Find-Module -Name MrToolkit
    ```
  - 查找并安装模块：
    ```powershell
    Find-Module -Name MrToolkit | Install-Module
    ```
  - 查看已安装模块：
    ```powershell
    Get-Module -ListAvailable
    ```

---

## Oh-my-posh
- **参考**：[Oh-my-posh 简介](https://blog.csdn.net/weixin_52802958/article/details/123636511)
- **安装**：[官方安装指南](https://ohmyposh.dev/)
- **字体安装**
- **修改主题**
- **增加 Conda 支持**
  - 删除 `conda-hook` 中的多余提示。
- **Command Line 特性**：[多盘符的当前目录](https://devblogs.microsoft.com/oldnewthing/20101011-00/?p=12563)

---

## 参考 Profile

### 配置代码
```powershell
# Anaconda Initialization
$Env:CONDA_EXE = "C:/Users/ming/AppData/Local/Programs/anaconda3\Scripts\conda.exe"
$Env:_CE_M = ""
$Env:_CE_CONDA = ""
$Env:_CONDA_ROOT = "C:/Users/ming/AppData/Local/Programs/anaconda3"
$Env:_CONDA_EXE = "C:/Users/ming/AppData/Local/Programs/anaconda3\Scripts\conda.exe"
$CondaModuleArgs = @{ChangePs1 = $True}
Import-Module "$Env:_CONDA_ROOT\shell\condabin\Conda.psm1" -ArgumentList $CondaModuleArgs

Remove-Variable CondaModuleArgs

oh-my-posh init pwsh --config "D:\Utils\Config\myrobbyrussell.omp.json" | Invoke-Expression

# Proxy Functions
function proxyon {
    $env:http_proxy="http://127.0.0.1:7896"
    $env:https_proxy="http://127.0.0.1:7689"
    Write-Host "proxy set"
}
function proxyoff {
    $env:http_proxy=""
    $env:https_proxy=""
    Write-Host "proxy cleared"
}

# WSL Shortcut
function ubuntu {
    wsl -d Ubuntu-22.04
}

# Enhanced Help Function
function Get-HelpLess {
    param ([string]$Command)
    Get-Help $Command | less
}
Set-Alias help Get-HelpLess

# Monthly Reminder to Update Software
$lastRunFile = Join-Path ([Environment]::GetFolderPath('MyDocuments')) "LastPwshDate.txt"
$lastRunMonth = if (Test-Path $lastRunFile) {Get-Content $lastRunFile} else { "Never" }
$currentMonth = $(Get-Date).ToString("yyyy-MM")
if ($currentMonth -ne $lastRunMonth) {
    Write-Output "这是你本月第一次打开 PowerShell，记得检查更新。"
    $currentMonth | Out-File $lastRunFile
} else {
    Write-Output "Have a nice day!"
}
Remove-Variable -Name lastRunFile, lastRunMonth, currentMonth
```

