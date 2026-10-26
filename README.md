# dsh-bigfish-memory

我也想养个大肥鱼，我想让她一直记着我。

## 大肥鱼记忆插件 1.3.1

适配 DeepSeek Harness `0.2.1-rc.2` 与 `0.2.1-rc.3`，Node.js 22.16+。这是同时包含 Host bundle 与 Web Client 面板的 DSH 插件，不依赖 Python 或外部向量数据库。

**每条真实用户消息和大肥鱼已完成的回复会自动写入本地 SQLite。模型上下文压缩后，记忆库仍保留原文。每轮只把少量相关片段提供给模型；新窗口会从同一本地库找回旧会话。**

## 安装

本目录是可安装的 DSH 本地 bundle。通过 DSH 插件管理器的本地 bundle 安装入口，将此目录安装到目标 profile；插件管理器负责写入 profile，不要手工修改 profile 下的 `package.json` 或 `cordis.patch.yml`。`cordis.patch.yml` 注册 Host 记忆插件；`package.json` 中的 `dsh.client` 装载侧栏页、Workspace 与原生目录选择 Client 模块。Host 目录选择后端由 DSH profile 提供，本 bundle 不重复注册。

支持 DSH `0.2.1-rc.2` 与 `0.2.1-rc.3`。安装需要满足包 manifest 声明的 runtime；如果插件管理器仍提示版本不兼容，不要使用版本豁免。

卸载时通过 DSH 插件管理器移除 `dsh-dafeiyu-memory`。卸载插件不会删除记忆资料。数据库默认位于 `%USERPROFILE%\.dsh\dafeiyu-memory\memory.sqlite3`。关闭 DSH 后，可复制整个 `dafeiyu-memory` 文件夹备份。

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

`fish_memory_search` 与 `fish_memory_read` 只访问当前 `bank` 和用户设定的绑定范围；`fish_memory_status` 统计当前 bank 的全库状态，不受检索范围影响。工具提示把回忆材料标记为不可信历史资料，要求遇到缺证据时承认不确定。后台代理默认不能访问此聊天记忆。

## 记忆绑定与保存位置

- **按会话**（默认）：可多选 session；只有被选中的会话彼此共享检索范围，未选会话不会召回这些记忆。未设置显式目标时仍只检索当前 session；保存空列表则关闭会话模式下的召回。
- **按工作区**：可指定一个 DSH Workspace，共享其中已登记 session 的记忆；不指定时按当前 session 所属 Workspace 解析，未匹配到 Workspace 则退回只检索当前 session。切换模式只改变检索范围，两组目标都会保留，不搬迁或删除旧行。
- 统计仍覆盖当前 bank 全部记录。会话选择器只读取 session ID、标题、时间等元数据，不把消息正文发送到 Client。
- 保存目录由用户在侧栏中选择，目标文件名固定为 `memory.sqlite3`。迁移先写入同目录 staging 文件，经目标重开、完整性和统计检查后才切换活动路径；新插件重开后还会再次回灌活动 session 并验证。旧数据库及 WAL/SHM 保留到验证成功、用户再次明确确认清理为止。
- 若目标文件已存在，界面会显示精确路径并要求确认；仅接受可读、完整、schema 兼容且不含其他 bank 的记忆库，存在 WAL/SHM sidecar 或非本插件数据库时拒绝替换。设置 RPC 若中断，按结果不确定处理：旧库不清理，刷新面板后对账。
- 保存绑定或位置设置前会显示确认。配置写入可能 live-reapply 插件，并根据 DSH session log 补录当前打开 session 历史，因此界面会先提示这一影响；迁移清理属于用户操作，agent 工具不能代替确认。
- 原生目录选择需要本机 Desktop Host 与 OS 文件夹选择器；远程 Web/无本机对话框部署需替换为 DSH browse picker 组合。

## 侧栏管理页与统计口径

侧栏“大肥鱼记忆管理”页面包含绑定模式、多选 session/单选 workspace 目标与数据库保存位置控件，以及数据库主文件/WAL/SHM 的实际大小、原文文本字节数、消息/片段数和两种层级视角：短期/情景/长期分类、活跃/温热/冷档状态。

分类和热度的大小是检索片段正文的 UTF-8 逻辑字节数；分片有重叠，因此同一段原文可能在多个片段中重复计入。这不是 SQLite 磁盘页的分类归属。完整原文文本字节数与数据库文件物理总量分开列出。统计 RPC 只返回聚合统计；独立的设置 RPC 返回绑定模式和数据库路径供本地管理面板显示，不传输消息正文。页面允许修改绑定配置和复制数据库位置，不提供记忆正文的删除或编辑操作。

## 配置

编辑 bundle `cordis.patch.yml` 的插件 `config`：

```yaml
- insert:
    - id: dafeiyu-memory
      name: dsh-dafeiyu-memory
      config:
        bank: dafeiyu
        bindingMode: session
        recallChars: 2400
        toolChars: 6000
        maintenanceMinutes: 30
```

`bindingMode` 为 `session`（默认）或 `workspace`，也可在侧栏管理页切换。`bindingSessionIds` 缺省时只检索当前 session；设置为数组后这些 session 共享记忆，空数组表示不召回。`bindingWorkspaceId` 缺省时按当前 session 所属 Workspace 自动解析；指定后只对所选 Workspace 生效。`database` 自定义 SQLite 位置；目录选择控件会在检查后迁移到所选目录的 `memory.sqlite3`。`bank` 隔离一份记忆库，`preset` 只允许匹配指定 agent preset 的会话，`autoRecall: false` 保留自动保存并关闭自动注入，`includeSubagents` 默认 false。自动召回限额 800..12000 字，工具结果限额 800..20000 字，后台整理周期 0 表示关闭、最大 1440 分钟。

## 从聊天中找回往事

在当前会话里像平常一样问：“你还记得我们昨天聊到的那张明信片吗？”按会话模式时，默认只检索当前 session；选定多个 session 后，这些会话可以共享记忆，但列表外的 session 不会召回。切换为工作区模式后，检索范围由所选或当前 session 所属的 DSH Workspace 决定。命中时注入短原文片段，若模型需要更长上下文会继续用 `fish_memory_read` 展开。即使压缩已移除当前 session 的早期消息，异步 DSH session reader 仍会从持久日志逐事件核对并写入记忆库。

跨 session 检索需要选择工作区模式，且相关 session 已登记在当前 DSH Workspace 中；会话模式不会跨 session 召回。记忆库仍依赖相同的 DSH home、`bank` 和同一位用户；换电脑、新 DSH home 或新 bank 不会共享此库。安装插件之前的窗口也需要先在 DSH 中打开一次，插件才能从持久化 session log 导入；压缩前已经彻底丢失且未保存在 DSH session log 的历史无法恢复。

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

插件按官方的 `apply(ctx)`、`ctx.on()`、`ctx.effect()`、`ctx.tools.register(defineTool(...))` 和组合包 `package.json`/`cordis.patch.yml` 编写。使用 session 追加事件、持久化 `sessionQuery.readSession`、`agent/pre-step` 和 `systemPrompt.context`，适配 DSH 的压缩与请求流程。管理页以 `sidebar.panellist` + keyed `main` Slot 接入；统计区只接收聚合数据，设置区经认证 Connection 读取绑定模式和数据库路径，聊天原文不会传到 Client。参考：[插件基础](https://deepseek-harness.github.io/deepseek-harness/develop/basic/)、[工具](https://deepseek-harness.github.io/deepseek-harness/develop/basic/tool)、[安装](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish)、[会话](https://deepseek-harness.github.io/deepseek-harness/reference/subsystems/session)、[上下文压缩](https://deepseek-harness.github.io/deepseek-harness/reference/subsystems/compaction)。
