---
title: Bash Script
tags:
  - utils
createTime: 2023/10/03 13:30:51
permalink: /notes/misc/bash-script/
---

Here's your formatted note about Shell scripting:

---

## 历史
- [Bash How to](https://tldp.org/HOWTO/Bash-Prompt-HOWTO/nonprintingchars.html)
- [变量与参数](https://mp.weixin.qq.com/s/PoaMA100b7qLUyL-UYUXPg)

---

## 基本语法

### 1. 脚本执行
- **脚本第一行写解释器的目录**：  
  `#!/bin/sh` 或 `#!/bin/php`
- **运行脚本**：  
  `$ ./xxx.sh` 或 `$ /bin/sh ./脚本`（指定解释器）

### 2. 输出变量
- **显示变量**：  
  `echo ${变量}`

### 3. 变量

- **定义变量**：
  ```bash
  var_a="studyShell"
  ```
  - 只能包含字母、数字、下划线，且不能以数字开头。
  - 变量名和等号之间不能有空格。
  - 不能与bash关键字冲突（可以使用`help`命令查看）。

- **赋值方式**：
  - 直接赋值
  - 用语句赋值，例如：`for 变量名 in '指令'` 枚举指令的全部输出。
  
- **引用变量**：  
  `echo ${变量名}`（花括号可加可不加，但加上可避免错误解释）

- **只读变量**：  
  `readonly [变量名]`（不可引用其值）

- **删除变量**：  
  `unset [变量名]`（`unset`不能删除只读变量）

- **变量类型**：
  - **局部变量**：仅在当前Shell实例中有效。
  - **环境变量**：预置的与路径等相关的变量。
  - **Shell变量**：既包括环境变量，也包括局部变量，保证Shell正常运行。

---

### 4. 字符串

- **字符串的定义**：
  - 单引号：`str='this is a string'`
  - 双引号：`str="this is a string"`

- **字符串拼接**：
  - 无符号拼接：`greeting="hello, "$your_name" !"`
  - `greeting_2='hello, '$your_name' !'` 与 `greeting_1="hello, ${your_name} !"` 等价。

- **获取字符串长度**：  
  `${#字符串}`

- **提取子字符串**：
  - 从下标开始提取：`string="runoob is a great site"`  
  `echo ${string:1:4}` 输出 `unoo`

---

### 5. 数组

- **定义数组**：
  ```bash
  array_name=(val0 val1 val2 ... valn)
  ```
  或分行定义：
  ```bash
  array_name=(
      val0
      val1
      val2
  )
  ```

- **访问数组元素**：  
  `value=${array_name[n]}`

- **获取数组长度**：  
  `length=${array_name[@]}`

- **获取单个元素的长度**：  
  `length=${#array_name[n]}`

---

### 6. 注释

- **单行注释**：以`#`开头。
- **多行注释**：  
  ```bash
  :<<标注
  内容                
  标注
  ```

---

### 7. 传参

- `$0`：执行脚本的路径和文件名
- `$1 ... $n`：脚本的各个参数
- `$#`：传递到脚本的参数个数
- `$*`：所有参数作为一个字符串显示
- `$$`：当前Shell进程的PID
- `$!`：最近执行的后台命令的PID

---

### 8. 运算

#### 算术表达式

**expr 运算**
```bash
val=`expr 2 + 2`
echo "两数之和为 : $val"
```
- 表达式和运算符之间要有空格，`2+2` 是不对的，必须写成 `2 + 2`。
- 完整的表达式要被反引号（`` ` `）包含，反引号用于调用命令并输出。

例如：
```bash
a=10
b=20
c=$b
`expr $a + $b`
`expr $a \* $b`  # 转义字符
`expr $a / $b`   # 整除
% 取模
```

**let 运算**
```bash
let num=num+3
let num+=3
let num++
```
- 使用时均无需加 `$` 符号。

**(( )) 双括号运算**
- 内部不需要用 `$` 引用。
- 可进行扩展四则运算，支持 C 语言算符，无需空格。

例如：
```bash
for ((i=0; i<=100; i++))
do
    # 指令
    ((表达式))
done

while ((i<=100))
do
    # 指令
done

if ((条件))
then
    # 指令
fi
```

#### 条件表达式

- `true` 或 `false` 为条件表达式。
- 条件必须放在方括号之间，并且左右两边必须有空格。

示例：
```bash
[ $a == $b ]  # 等于
[ $a -eq $b ] # 等于
[ $a == $b ]  # 不等于
[ $a -ne $b ] # 不等于

# 比较运算符
-gt   # 大于
-lt   # 小于
-ge   # 大于等于
-le   # 小于等于
```

#### 字符串运算

- `[ $a = $b ]` 或 `[ $a == $b ]` 判等。
- `!=` 判不等。
- `-z` 检测是否为空 `[ -z $a ]`。
- `-n` 检测是否非空 `[ -n $a ]`。

#### 逻辑运算

- `-a` 与（AND）
- `-o` 或（OR）
- `!` 非（NOT）

#### 高级逻辑运算

- `[[ 表达式1 && 表达式2 ]]` 与（AND）
- `[[ 表达式1 || 表达式2 ]]` 或（OR）
- `[[ > ]]` 字符串字典序比较（单括号需转义 `\>`）
- `[[ < ]]` 字符串字典序比较（单括号需转义 `\<`）

#### 文件运算

- `-b file` 判断是否为块设备文件。
- `-c file` 判断是否为字符设备文件。
- `-d file` 判断是否为目录。
- `-f file` 判断是否是普通文件。
- `-r file` 判断是否可读。
- `-w file` 判断是否可写。
- `-x file` 判断是否可执行。
- `-s file` 判断文件是否为空。
- `-e file` 判断文件是否存在。

--- 

### 循环与分支

#### 1. **if 分支**

基本结构：
```bash
if [ 条件1 ]
then
    指令1
elif [ 条件2 ]
then
    指令2
else
    指令3
fi
```

一行写法：
```bash
if [ 条件1 ]; then 指令1; elif [ 条件2 ]; then 指令2; fi
```

#### 2. **case 分支**

基本结构：
```bash
case 值 in
    模式一)
        指令
        ;;
    模式二)
        指令
        ;;
    *)
        指令
        ;;
esac
```

#### 3. **for 循环**

基本结构：
```bash
for 变量 in 第一个 第二个 第三个
do
    指令
    ...
done
```

一行写法：
```bash
for var in A B C; do 指令; 指令; done;
```

#### 4. **while 循环**

基本结构：
```bash
while 条件
do
    指令
done
```

#### 5. **无限循环**

基本结构：
```bash
while true
do
    指令
done
```

#### 6. **读入数据**

基本结构：
```bash
while read xxx
```

#### 7. **until 循环**

基本结构：
```bash
until 条件
do
    指令
done
```

#### 8. **循环控制**

- `continue`：跳出当前循环的当前迭代，进入下一次迭代。
- `break`：跳出整个循环。

---

### 9. 函数

#### 1. **定义函数**

基本结构：
```bash
函数名(){
    指令
    return 返回值 (0~255)
}
```

#### 2. **使用函数**

调用函数时，传入参数：
```bash
函数名 参数1 参数2 ... 参数n
```

在函数内部，可以使用传入的参数，例如：
- `$0`：函数名
- `$1, $2, ...`：函数的参数
- `$#`：传入参数的个数

#### 3. **返回值**

- `return` 用于返回函数的状态码。通常返回值为 **0** 表示成功，其他值表示错误。
  - 0：表示执行成功（在Bash中为true）
  - 非0：表示执行失败（在Bash中为false）

#### 4. **函数输出**

Bash函数的输出一般通过 `echo` 来实现，而不是通过 `return` 返回值。`return` 主要用于状态码。

#### 5. **文件包含**

- 使用 `source [文件]` 或 `. [文件]` 来执行文件中的代码。文件中的函数、变量等会
  被载入到当前环境中。

例如：
```bash
source myscript.sh
```

或者：
```bash
. myscript.sh
```

这样你可以在当前脚本中使用 `myscript.sh` 中定义的函数和变量。

### 10. 重定向

#### 1. **常用指令**

- `read [新变量名]`：读取用户输入并存储到变量中。
- `echo "字符串"`：输出字符串。可以使用 `-e` 开启转义字符（如 `\n` 换行，`\c` 不换行）。
- `cat [文件]`：显示文件内容。
- `head -数字 文件`：显示文件前n行。
- `tail -数字 文件`：显示文件后n行。
- `grep "目标字符串" "文件"`：查找文件中含有目标字符串的行，并输出。
- `wc -c`：显示文件字节数，`-l` 显示行数，`-w` 显示字数。

#### 2. **`printf` 格式化输出**

- `printf "控制字符串" 变量1 变量2 ... 变量n`
  - `%-10s`：输出字符串，10字符左对齐
  - `%8d`：输出整数，8字符右对齐
  - `%-4.2f`：输出两位小数，四字符左对齐
  - `\f`：换页
  - `\n`：换行
  - `\t`：制表
  - `\\`：反斜杠

#### 3. **输入输出流编号**

- **标准输入**：0（stdin）
- **标准输出**：1（stdout）
- **标准错误**：2（stderr）

#### 4. **文件重定向**

- `ls -A 1>output.txt`：将 `ls -A` 命令的标准输出全部重定向到 `output.txt`。
- `ls -A 2>&1`：将标准错误重定向到标准输出。
- `command < file`：将文件重定向到标准输入。

**重定向符号**：
- `>`：覆写文件
- `>>`：追加内容到文件

#### 5. **管道重定向**

- `命令A | 命令B`：将命令A的标准输出（stdout）重定向到命令B的标准输入（stdin）。
  - 注意：管道的方向从左到右。

#### 6. **文件重定向（进阶）**

- `command > file`：将命令的输出重定向到 `file`。
- `command < file`：将文件作为命令的输入。
- `command >> file`：将命令的输出以追加方式重定向到 `file`。
- `n > file`：将文件描述符 `n` 的输出重定向到 `file`。
- `n >> file`：将文件描述符 `n` 的输出以追加方式重定向到 `file`。
- `n >& m`：将文件描述符 `n` 和 `m` 的输出合并。
- `n <& m`：将文件描述符 `n` 和 `m` 的输入合并。
- `<< tag`：将开始标记 `tag` 和结束标记 `tag` 之间的内容作为输入。

#### 7. **输出到 `/dev/null`**

- `command > /dev/null`：将输出重定向到 `/dev/null`，即丢弃输出。这可以用来执行
  某个命令而不希望在屏幕上显示输出结果。


### 11.特殊符号

#### 1. **`${变量}`**：引用变量
- 用于引用变量的值。例如，`${var}` 引用变量 `var` 的值。

#### 2. **`` 指令 ``**：获取指令输出值（包括 `stderr`）
- 将命令放在反引号中，用于执行该命令并获取其输出。示例：`` result=`ls` `` 会将 `ls` 命令的输出赋值给变量 `result`。

#### 3. **`$(指令)`**：获取指令输出值（不包括 `stderr`）
- `$(...)` 是 `` `...` `` 的现代替代形式，功能相同，但更易读。它将执行指令并返回标准输出，不包含标准错误输出。示例：`result=$(ls)`。

#### 4. **`(指令1; 指令2; 指令n)`**：代码块（新Shell）
- 使用圆括号将多个指令放在同一代码块中执行，并且这些指令会在一个新的 shell 中执
  行。例如：`(cd /tmp; ls)`。这会在新 shell 中切换到 `/tmp` 目录并列出文件，但不
  会影响当前 shell。

#### 5. **`{ 指令1; 指令2; 指令n; }`**：代码块（同一Shell）
- 使用花括号 `{}` 将多个指令放在同一个 shell 中执行，指令之间必须用分号 `;` 分
  隔。例如：`{ cd /tmp; ls; }`。这会在当前 shell 中执行，且不启动新的 shell。

#### 6. **`$((表达式))`**：数学表达式
- 用于进行数学运算。可以执行加、减、乘、除等基本运算。例如：`$((3 + 4))` 会返回
  `7`。在进行运算时不需要使用 `$` 符号来引用变量，可以直接写变量名：`$((a +
  b))`。

#### 7. **`[]` 和 `[[ ]]`**：条件表达式
- `[]`：用于测试条件，支持基本的条件判断（如文件检查、字符串比较等）。
  - 示例：`[ -f file ]` 判断 `file` 是否为普通文件。
- `[[ ]]`：用于进行更复杂的条件判断，支持逻辑运算符和字符串比较（例如，`&&` 和 `||`）。`[[ ]]` 是一种更强大的语法，通常比 `[]` 更推荐使用。
  - 示例：`[[ $a -eq $b ]]` 判断 `$a` 是否等于 `$b`。