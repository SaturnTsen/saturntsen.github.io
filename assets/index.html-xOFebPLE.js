import{_ as e,c as d,f as o,o as r}from"./app-Ch-a3JOR.js";const a={};function n(i,t){return r(),d("div",null,t[0]||(t[0]=[o(`<h3 id="dism-用法整理" tabindex="-1"><a class="header-anchor" href="#dism-用法整理"><span>DISM 用法整理</span></a></h3><h4 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法"><span><strong>基本用法</strong></span></a></h4><ul><li><strong>查看帮助</strong>: <code>DISM /help</code></li><li><strong>基本命令格式</strong>:<div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>DISM.exe [dism_options] {Imaging_command} [&lt;Imaging_arguments&gt;]</span></span>
<span class="line"><span>DISM.exe {/Image:&lt;path_to_offline_image&gt; | /Online} [dism_options] {servicing_command} [&lt;servicing_arguments&gt;]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><hr><h3 id="dism-选项" tabindex="-1"><a class="header-anchor" href="#dism-选项"><span><strong>DISM 选项</strong></span></a></h3><table><thead><tr><th>选项</th><th>功能说明</th></tr></thead><tbody><tr><td><code>/English</code></td><td>以英语显示命令行输出。</td></tr><tr><td><code>/Format</code></td><td>指定报告的输出格式。</td></tr><tr><td><code>/WinDir</code></td><td>指定 Windows 目录的路径。</td></tr><tr><td><code>/SysDriveDir</code></td><td>指定 BootMgr 系统加载文件的路径。</td></tr><tr><td><code>/LogPath</code></td><td>指定日志文件的路径。</td></tr><tr><td><code>/LogLevel</code></td><td>指定日志的输出级别 (1-4)。</td></tr><tr><td><code>/NoRestart</code></td><td>禁止自动重启或重启提示。</td></tr><tr><td><code>/Quiet</code></td><td>仅显示错误信息，抑制所有其他输出。</td></tr><tr><td><code>/ScratchDir</code></td><td>指定暂存目录的路径。</td></tr></tbody></table><hr><h3 id="操作系统映像管理-generic-imaging-commands" tabindex="-1"><a class="header-anchor" href="#操作系统映像管理-generic-imaging-commands"><span><strong>操作系统映像管理 (Generic Imaging Commands)</strong></span></a></h3><table><thead><tr><th>命令</th><th>功能说明</th></tr></thead><tbody><tr><td><code>/Split-Image</code></td><td>分割 WIM 映像。</td></tr><tr><td><code>/Get-ImageInfo</code></td><td>获取映像信息。</td></tr><tr><td><code>/Apply-Image</code></td><td>应用一个映像。</td></tr><tr><td><code>/Mount-Image</code></td><td>挂载映像。</td></tr><tr><td><code>/Get-MountedImageInfo</code></td><td>查看挂载的映像。</td></tr><tr><td><code>/Commit-Image</code></td><td>保存更改至映像。</td></tr><tr><td><code>/Unmount-Image</code></td><td>卸载映像。</td></tr><tr><td><code>/Cleanup-Mountpoints</code></td><td>清理挂载点。</td></tr></tbody></table><hr><h3 id="操作对象指定-image-specifications" tabindex="-1"><a class="header-anchor" href="#操作对象指定-image-specifications"><span><strong>操作对象指定 (Image Specifications)</strong></span></a></h3><table><thead><tr><th>选项</th><th>功能说明</th></tr></thead><tbody><tr><td><code>/Online</code></td><td>对当前操作系统进行操作。</td></tr><tr><td><code>/Image</code></td><td>指定离线 Windows 映像的根目录路径。</td></tr></tbody></table><hr><h3 id="wim-映像管理-wim-commands" tabindex="-1"><a class="header-anchor" href="#wim-映像管理-wim-commands"><span><strong>WIM 映像管理 (WIM Commands)</strong></span></a></h3><table><thead><tr><th>命令</th><th>功能说明</th></tr></thead><tbody><tr><td><code>/Apply-CustomDataImage</code></td><td>去除自定义数据映像中的文件。</td></tr><tr><td><code>/Capture-CustomImage</code></td><td>捕获定制内容到 WIMBoot 系统的增量 WIM 文件中。</td></tr><tr><td><code>/Get-WIMBootEntry</code></td><td>显示指定磁盘卷的 WIMBoot 配置条目。</td></tr><tr><td><code>/Update-WIMBootEntry</code></td><td>更新指定磁盘卷的 WIMBoot 配置条目。</td></tr><tr><td><code>/List-Image</code></td><td>显示指定映像中的文件和文件夹列表。</td></tr><tr><td><code>/Delete-Image</code></td><td>删除 WIM 文件中多卷映像的指定卷映像。</td></tr><tr><td><code>/Export-Image</code></td><td>将指定映像的副本导出到另一个文件。</td></tr><tr><td><code>/Append-Image</code></td><td>向 WIM 文件中添加另一个映像。</td></tr><tr><td><code>/Capture-Image</code></td><td>将驱动器映像捕获到新的 WIM 文件中（包含所有子文件夹和数据）。</td></tr><tr><td><code>/Get-MountedWimInfo</code></td><td>显示有关已挂载的 WIM 映像的信息。</td></tr><tr><td><code>/Get-WimInfo</code></td><td>显示 WIM 文件中映像的信息。</td></tr><tr><td><code>/Commit-Wim</code></td><td>保存对挂载的 WIM 映像的更改。</td></tr><tr><td><code>/Unmount-Wim</code></td><td>卸载挂载的 WIM 映像。</td></tr><tr><td><code>/Mount-Wim</code></td><td>挂载 WIM 文件中的映像。</td></tr><tr><td><code>/Remount-Wim</code></td><td>恢复孤立的 WIM 挂载目录。</td></tr><tr><td><code>/Cleanup-Wim</code></td><td>删除与损坏的 WIM 映像相关的资源。</td></tr></tbody></table><hr><h3 id="更多帮助" tabindex="-1"><a class="header-anchor" href="#更多帮助"><span><strong>更多帮助</strong></span></a></h3><ul><li>可通过在命令后加 <code>/?</code> 查看帮助，例如： <ul><li><code>DISM.exe /Mount-Wim /?</code></li><li><code>DISM.exe /ScratchDir /?</code></li></ul></li></ul><hr><h3 id="winpe-使用流程" tabindex="-1"><a class="header-anchor" href="#winpe-使用流程"><span><strong>WinPE 使用流程</strong></span></a></h3><ol><li><strong>创建 WinPE 工作目录</strong>: 使用 <code>Copype</code> 命令。</li><li><strong>挂载与自定义映像</strong>: <ul><li>挂载：参考 <a href="https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-mount-and-customize?view=windows-11" target="_blank" rel="noopener noreferrer">WinPE 挂载与自定义</a>。</li><li>添加组件：参考 <a href="https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-add-packages--optional-components-reference?view=windows-11" target="_blank" rel="noopener noreferrer">添加可选组件</a>。</li></ul></li><li><strong>创建介质</strong>: 参考 <a href="https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive?view=windows-11" target="_blank" rel="noopener noreferrer">创建 USB 启动盘</a>。</li></ol><hr><h3 id="官方文档链接" tabindex="-1"><a class="header-anchor" href="#官方文档链接"><span><strong>官方文档链接</strong></span></a></h3><ul><li><a href="https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11" target="_blank" rel="noopener noreferrer">WinPE 概述</a></li><li><a href="https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/copype-command-line-options?view=windows-11" target="_blank" rel="noopener noreferrer">Copype 命令行选项</a></li></ul>`,24)]))}const c=e(a,[["render",n],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/utils/DISM-and-WinPE/","title":"DISM 和 WinPE","lang":"en-US","frontmatter":{"title":"DISM 和 WinPE","tags":["utils"],"createTime":"2024/01/11 16:36:01","permalink":"/utils/DISM-and-WinPE/","description":"DISM 用法整理 基本用法 查看帮助: DISM /help 基本命令格式: DISM 选项 操作系统映像管理 (Generic Imaging Commands) 操作对象指定 (Image Specifications) WIM 映像管理 (WIM Commands) 更多帮助 可通过在命令后加 /? 查看帮助，例如： DISM.exe /Mou...","head":[["meta",{"property":"og:url","content":"https://saturntsen.github.io/utils/DISM-and-WinPE/"}],["meta",{"property":"og:site_name","content":"SaturnTsen"}],["meta",{"property":"og:title","content":"DISM 和 WinPE"}],["meta",{"property":"og:description","content":"DISM 用法整理 基本用法 查看帮助: DISM /help 基本命令格式: DISM 选项 操作系统映像管理 (Generic Imaging Commands) 操作对象指定 (Image Specifications) WIM 映像管理 (WIM Commands) 更多帮助 可通过在命令后加 /? 查看帮助，例如： DISM.exe /Mou..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-21T19:35:06.000Z"}],["meta",{"property":"article:tag","content":"utils"}],["meta",{"property":"article:modified_time","content":"2024-12-21T19:35:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DISM 和 WinPE\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-21T19:35:06.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.32,"words":696},"git":{"updatedTime":1734809706000,"contributors":[{"name":"SaturnTsen","username":"SaturnTsen","email":"minger233@outlook.com","commits":2,"avatar":"https://avatars.githubusercontent.com/SaturnTsen?v=4","url":"https://github.com/SaturnTsen"}]},"autoDesc":true,"filePathRelative":"utils/DISM and WinPE.md","categoryList":[{"id":"2b3583","sort":10002,"name":"utils"}],"bulletin":false}');export{c as comp,m as data};