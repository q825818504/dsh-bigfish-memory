# dsh-bigfish-memory

我也想养个大肥鱼，我想让她一直记着我。

## 大肥鱼记忆插件 1.0

适配 DeepSeek Harness `0.2.1-rc.2`，Node.js 22.16+。这是 DSH bundle 插件，不依赖 Python 或外部向量数据库。

**每条真实用户消息和大肥鱼已完成的回复会自动写入本地 SQLite。模型上下文压缩后，记忆库仍保留原文。每轮只把少量相关片段提供给模型；新窗口会从同一本地库找回旧会话。**

## 安装

在 DSH 源码开发 checkout 中：

```powershell
dsh plugin --profile desktop add ./dafeiyu-memory
dsh --profile desktop --dump-config
dsh --profile desktop
```

确认 dump 中出现 `# == dsh-dafeiyu-memory` 后启动。将示例中的路径换成本插件文件夹绝对路径。`cordis.patch.yml` 会自动把插件插入 Web profile。

本机直接使用 npm 包时，也可在插件目录 `npm pack`，然后用 `dsh plugin --profile desktop add ./dsh-dafeiyu-memory-1.0.0.tgz` 安装打包文件。

卸载：

```powershell
dsh plugin --profile desktop remove dsh-dafeiyu-memory
```

插件卸载不会删除资料。数据库默认位于 `%USERPROFILE%\.dsh\dafeiyu-memory\memory.sqlite3`。关闭 DSH 后，可复制整个 `dafeiyu-memory` 文件夹备份。

## 会记住什么

- 保存 DSH 持久化 session log 中用户的真实输入和 assistant 已完成回复。记录由 DSH commit 的 event seq 去重，时间戳直接采用 Harness 产生的 event 时间；模型不能写入时间。
- 自动保存发生在 DSH `session/event` 上，完成当前轮落盘的 `session/flush` 也会再核对。如果数据库写入暂时失败，插件会在下一次模型请求前补录；补录失败会阻止调用模型并报告错误，以免默默漏记。
- 系统提示词压缩、摘要、重试、工具输出和其他运行时注入不当作用户或助手的聊天原文。仅保存 DSH 持久化日志确实出现的内容。
- 本地 FTS5 检索英文词和中文单字/双字片段。每条原文按字符分为约 800 字、相互重叠的片段，检索后返回片段和稳定记忆 ID。需要前后细节时，模型可分页展开原消息。
- 相关片段与别名锚点帮助同义说法找到相同经历。`fish_memory_search` 支持 UTC 时间范围；`fish_memory_read` 逐页回读原文。模型每次回答前只自动注入最多 2400 字左右的相关片段。
- 当用户自己的新消息再次匹配到旧片段时，宿主会以该条 DSH 消息 ID 恢复片段活跃度；同一条用户输入重试不重复强化。自动注入和模型自己回读不会强化。
- 默认不保存由 subagent 产生的会话，以免混入后台代理内容；如需包含可在 patch 中设置 `includeSubagents: true`。
- 本地后台维护索引和原文重复分组，不改写或删除聊天原文，不因后台检查而强化记忆。短暂闲聊仍然保存在硬盘，半衰期只辅助排序；查档工具绕过衰减。

## 可用工具

- `fish_memory_search`：按关键词/别名找跨会话原文，也可以提供 ISO 时间边界。
- `fish_memory_read`：按照 ID 和偏移分页展开原消息。
- `fish_memory_status`：查看本地库中消息、片段数量和注入字符量。

所有工具只访问当前 `bank`。工具提示把回忆材料标记为不可信历史资料，要求遇到缺证据时承认不确定。后台代理默认不能访问此聊天记忆。

## 配置

编辑 bundle `cordis.patch.yml` 的插件 `config`：

```yaml
- insert:
    - id: dafeiyu-memory
      name: dsh-dafeiyu-memory
      config:
        bank: dafeiyu
        recallChars: 2400
        toolChars: 6000
        maintenanceMinutes: 30
```

`database` 自定义 SQLite 位置，`bank` 隔离一份记忆库，`preset` 只允许匹配指定 agent preset 的会话，`autoRecall: false` 保留自动保存并关闭自动注入，`includeSubagents` 默认 false。自动召回限额 800..12000 字，工具结果限额 800..20000 字，后台整理周期 0 表示关闭、最大 1440 分钟。

## 从聊天中找回往事

新窗口里像平常一样问：“你还记得我们昨天聊到的那张明信片吗？”插件按当前问题在全部旧会话检索，注入命中的短原文片段。若模型需要更长上下文，会继续用 `fish_memory_read` 展开。即使压缩已移除当前 session 的早期消息，异步 DSH session reader 仍会从持久日志逐事件核对并写入记忆库。

跨窗口记忆依赖两个条件：DSH 的 session 持久化正常工作，且新窗口使用相同的 DSH home、`bank` 和同一位用户。换电脑、新 DSH home 或新 bank 不会共享此库。安装插件之前的窗口也需要先在 DSH 中打开一次，插件才能从持久化 session log 导入；压缩前已经彻底丢失且未保存在 DSH session log 的历史无法恢复。

## 管理与从 v0.2 导入

```powershell
dafeiyu-memory status "$env:USERPROFILE\.dsh\dafeiyu-memory\memory.sqlite3"
dafeiyu-memory search "$env:USERPROFILE\.dsh\dafeiyu-memory\memory.sqlite3" dafeiyu "明信片在哪里"
dafeiyu-memory backup "$env:USERPROFILE\.dsh\dafeiyu-memory\memory.sqlite3" dafeiyu D:\Backups\fish-2026.sqlite3
dafeiyu-memory import-v02 <旧 Python 数据库.sqlite3> dafeiyu <旧owner>
```

命令的参数顺序是 `操作 数据库路径 bank 其他参数`。`important <片段ID>` 给被明确指定的片段设置较慢衰减；`anchor <名称> <逗号分隔片段ID> [别名...]` 手工建立联想。语音、图片和附件的原始文件仍由 DSH 附件系统管理；记忆库只保存对话中可序列化的附件引用。

v0.2 导入只复制所选 owner 的 user/assistant 原文，不沿用无法确认来源的旧时间、标签或总结；导入时间由当前系统写入。无需先删除旧库。

## 数据与限制

SQLite 和 WAL/Journals 使用本地明文文件。插件不连接网络或模型，不加密数据库。请定期停写复制整个数据库文件夹，以免只备份主库文件而漏掉 WAL。可用 `backup` 命令进行一致性备份。

这是聊天记忆插件，不承诺每次检索都成功：没命中时可用时间范围、具体名词或工具查档；查不到时模型应该说不确定。普通中文模型同义表达依赖人工锚点，插件不自动发明事实。锚点可以通过 CLI 增加。

只有当前已读的 DSH 会话会从 session query 服务导入。休眠且从未打开的历史会话不会自动扫描；首次启动或在旧聊天窗口发消息就会导入当前会话。附件二进制不拷贝进记忆库。

## DSH 对接点

插件按官方的 `apply(ctx)`、`ctx.on()`、`ctx.effect()`、`ctx.tools.register(defineTool(...))` 和组合包 `package.json`/`cordis.patch.yml` 编写。使用 session 的追加事件与持久化 `sessionQuery.readLog`，以及 `agent/pre-step` 和 `systemPrompt.context`，适配 DSH 的压缩与请求流程。参考：[插件基础](https://deepseek-harness.github.io/deepseek-harness/develop/basic/)、[工具](https://deepseek-harness.github.io/deepseek-harness/develop/basic/tool)、[安装](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish)、[会话](https://deepseek-harness.github.io/deepseek-harness/reference/subsystems/session)、[上下文压缩](https://deepseek-harness.github.io/deepseek-harness/reference/subsystems/compaction)。
