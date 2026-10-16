---
title: Powershell
tags:
  - utils
createTime: 2024/02/11 15:00
permalink: /notes/misc/powershell-and-oh-my-posh/
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
  - Powershell 管道内传送的不是字符串，而是 C# 对象。因此每个命令实际上返回的是
    一个对象，具有属性和方法。
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

### 历史记录

- **查看历史记录**：
  - 当前会话：`Get-History`
  - 所有历史：`Get-Content (Get-PSReadlineOption).HistorySavePath`

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

## Oh-my-posh
- **参考**：[Oh-my-posh 简介](https://blog.csdn.net/weixin_52802958/article/details/123636511)
- **安装**：[官方安装指南](https://ohmyposh.dev/)
- **字体安装**
- **修改主题**
- **增加 Conda 支持**
  - 删除 `conda-hook` 中的多余提示。
- **Command Line 特性**：[多盘符的当前目录](https://devblogs.microsoft.com/oldnewthing/20101011-00/?p=12563)

## 参考 Profile

### 配置代码
```powershell
Write-Host "Loading D:\ming\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"

#Oh my posh initialization
oh-my-posh init pwsh --config "D:\Utils\Config\myrobbyrussell.omp.json" | Invoke-Expression

#f45873b3-b655-43a6-b217-97c00aa0db58 PowerToys CommandNotFound module
Import-Module -Name Microsoft.WinGet.CommandNotFound
#f45873b3-b655-43a6-b217-97c00aa0db58

### Chocolatey Profile
# Import the Chocolatey Profile that contains the necessary code to enable
# tab-completions to function for `choco`.
# Be aware that if you are missing these lines from your profile, tab completion
# for `choco` will not function.
# See https://ch0.co/tab-completion for details.
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

### User Scope Utils
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

# Other Shortcuts
function ubuntu {
        wsl -d Ubuntu-22.04
}
function Get-HelpLess {
        param ( [string]$Command)
        Get-Help $Command | less
}
Set-Alias help Get-HelpLess
function Get-AllHistory {
        Get-Content (Get-PSReadlineOption).HistorySavePath
}
Set-Alias history Get-AllHistory

### Timer to shutdown
$timerScriptPath = "D:\Utils\Plugins\ShutdownTimer.ps1"
if (Test-Path $timerScriptPath) {
    . $timerScriptPath  # 点操作符加载到全局作用域
    Write-Host "[√] 已加载防摸鱼关机锁" -ForegroundColor Cyan
} else {
    Write-Warning "[!] 未找到关机定时器脚本：$timerScriptPath"
}
Set-Alias -Name shame_on_you -Value Start-ShutdownTimer

### Remind me to update softwares
$lastRunFile = Join-Path ([Environment]::GetFolderPath('MyDocuments')) "LastPwshDate.txt"
$lastRunMonth =  if (Test-Path $lastRunFile) {Get-Content $lastRunFile} else { "Never" }
$currentMonth = $(Get-Date).ToString("yyyy-MM")
if ($currentMonth -ne $lastRunMonth) {
    Write-Host "这是你本月第一次打开PowerShell，记得检查更新。"
    $currentMonth | Out-File $lastRunFile
} else {
        Write-Host "Have a nice day!" -ForegroundColor Yellow
}
Remove-Variable -Name lastRunFile, lastRunMonth, currentMonth
```

```powershell
# ShutdownTimer.ps1
function Start-ShutdownTimer {
    param (
        [double]$Minutes = 10
    )

    # 嵌入C#异步蜂鸣类
    Add-Type -TypeDefinition @"
    using System;
    using System.Threading;
    public class AsyncBeep {
        public static void Play(int frequency, int duration) {
            new Thread(() => {
                try { Console.Beep(frequency, duration); }
                catch {}
            }).Start();
        }
    }
"@

    # 配置参数
    $MinAllowedTime = 0.5    # 最小允许设置时间（分钟）
    $OneMinuteMark = 60      # 一分钟提醒阈值（秒）
    $CriticalTime = 30       # 最后关键提醒时间（秒）
    $BaseFrequency = 600     # 基础蜂鸣频率
    $FrequencyStep = 50      # 频率递增步长
    $NormalSleep = 100       # 正常检测间隔（毫秒）
    $UrgentSleep = 200       # 关键时段检测间隔（毫秒）

    # 输入验证
    if ($Minutes -lt $MinAllowedTime) {
        Write-Host "最少需要设置 ${MinAllowedTime}分钟！" -ForegroundColor Red
        return
    }

    # 禁用Ctrl+C
    [Console]::TreatControlCAsInput = $true
    $Host.UI.RawUI.FlushInputBuffer()

    # 随机嘲讽语句
    $taunts = @(
        "你确定要继续浪费时间吗？",
        "电脑：这个主人不太聪明的样子...",
        "摸鱼终结者已上线！",
        "生命倒计时启动！",
        "放弃吧，你是赢不了我的！",
        "关机是假，催你干活是真！"
    )

    # 验证码生成函数
    function New-VerificationCode {
        $chars = 48..57 + 65..90  # 0-9 + A-Z
        -join (Get-Random -InputObject $chars -Count 10 | ForEach-Object { [char]$_ })
    }

    # 初始化
    $verificationCode = New-VerificationCode
    $TotalSeconds = [math]::Max([math]::Ceiling($Minutes * 60), 1)
    $startTime = Get-Date
    $inputBuffer = ""
    $lastSystemBeep = [DateTime]::MinValue  # 记录上次系统蜂鸣时间

    # 界面初始化
    Clear-Host
    Write-Host "=== 防摸鱼关机锁 ===" -ForegroundColor Magenta
    Write-Host "休息时间: ${Minutes}分钟" -ForegroundColor Cyan
    Write-Host ($taunts | Get-Random) -ForegroundColor Yellow
    Write-Host "验证码: $verificationCode (输入错误自动更换)`n"
    Write-Host "输入提示 => " -NoNewline -ForegroundColor DarkGray

    # 主循环
    while ($true) {
        # 计算剩余时间
        $elapsed = (Get-Date) - $startTime
        $remaining = $TotalSeconds - [math]::Floor($elapsed.TotalSeconds)

        # 时间到自动退出循环
        if ($remaining -le 0) { break }

        # 动态时间显示
        Write-Host -NoNewline "`r剩余时间: " -ForegroundColor Cyan
        Write-Host -NoNewline "$([timespan]::fromseconds($remaining).ToString('mm\:ss'))   " -ForegroundColor Yellow

        # 输入检测
        if ([Console]::KeyAvailable) {
            $key = [Console]::ReadKey($true)

            switch ($key.Key) {
                { $_ -eq [ConsoleKey]::Enter } {
                    if ($inputBuffer -eq $verificationCode) {
                        Write-Host "`n`n验证成功！关机已取消" -ForegroundColor Green
                        return
                    }
                    else {
                        $verificationCode = New-VerificationCode
                        Write-Host "`n`n验证失败！新验证码: " -NoNewline -ForegroundColor Red
                        Write-Host $verificationCode -ForegroundColor Yellow
                        Write-Host "输入提示 => " -NoNewline -ForegroundColor DarkGray
                        $inputBuffer = ""
                    }
                }
                { $_ -eq [ConsoleKey]::Backspace } {
                    if ($inputBuffer.Length -gt 0) {
                        $inputBuffer = $inputBuffer.Substring(0, $inputBuffer.Length - 1)
                    }
                }
                default {
                    if ($key.KeyChar -match '[A-Z0-9]') {
                        $inputBuffer += $key.KeyChar
                    }
                }
            }
        }

        # 声音提醒系统
        $now = Get-Date
        if ($remaining -le $OneMinuteMark -and $remaining -gt $CriticalTime) {
            # 最后一分钟系统蜂鸣（每秒一次）
            if (($now - $lastSystemBeep).TotalSeconds -ge 1) {
                [System.Media.SystemSounds]::Beep.Play()
                $lastSystemBeep = $now
            }
            Start-Sleep -Milliseconds $NormalSleep
        }
        elseif ($remaining -le $CriticalTime) {
            # 最后30秒高频蜂鸣
            $currentStep = $CriticalTime - $remaining
            $frequency = $BaseFrequency + ($currentStep * $FrequencyStep)
            [AsyncBeep]::Play($frequency, 200)
            Start-Sleep -Milliseconds $UrgentSleep
        }
        else {
            Start-Sleep -Milliseconds $NormalSleep
        }
    }

    # 时间到执行关机
    Write-Host "`n`n时间到！正在关机..." -ForegroundColor Red
    shutdown -s -t 0
}

## Old implementation
# function Start-ShutdownTimer {
#     param (
#         [int]$Minutes = 10  # 默认10分钟后关机
#     )

#     $TotalSeconds = $Minutes * 60
#     $WarningTime = 60
#     $CriticalTime = 10

#     # 随机嘲讽语句
#     $Taunts = @(
#         "还在摸鱼？时间不等人哦！",
#         "你的电脑即将罢工，赶紧干活！",
#         "倒计时已经开始，别怪我没提醒你！",
#         "电脑：我累了，想休息了...",
#         "你确定要继续浪费时间吗？",
#         "关机警告！请珍惜每一秒！"
#     )

#     # 随机选择一条嘲讽语句
#     $RandomTaunt = $Taunts | Get-Random
#     Write-Host $RandomTaunt
#     Write-Host "关机倒计时开始：$Minutes 分钟后关机！"

#     # 每分钟提醒
#     for ($i = $TotalSeconds; $i -gt $WarningTime; $i--) {
#         if ($i % 60 -eq 0) {
#             $RemainingMinutes = [math]::Floor($i / 60)
#             Write-Host "剩余时间：$RemainingMinutes 分钟"
#         }
#         Start-Sleep -Seconds 1
#     }

#     # 最后一分钟每秒提醒
#     Write-Host "还剩1分钟！超时电脑将关机！"
#     for ($i = $WarningTime; $i -gt $CriticalTime; $i--) {
#         [System.Media.SystemSounds]::Beep.Play()
#         Write-Host "剩余时间：$i 秒"
#         Start-Sleep -Seconds 1
#     }

#     # 最后10秒急促提醒
#     Write-Host "最后10秒！"
#     for ($i = $CriticalTime; $i -gt 0; $i--) {
#         for ($j = 0; $j -lt 5; $j++) {
#             [System.Media.SystemSounds]::Beep.Play()
#             Start-Sleep -Milliseconds 200
#         }
#         Write-Host "剩余时间：$i 秒"
#     }

#     # 关机
#     Write-Host "时间到！正在关机..."
#     shutdown -s -t 0
# }
```