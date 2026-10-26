window.__ModuleLoader__.load({
  id: 'dsh-dafeiyu-memory',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NAMESPACE = 'dafeiyu-memory';
    const PANEL_ID = 'dafeiyu-memory';
    const CHANNEL = '/api';
    const ENDPOINT = 'dafeiyu-memory/status';
    const SETTINGS_ENDPOINT = 'dafeiyu-memory/settings';

    const dictionary = {
      zh: {
        navLabel: '大肥鱼记忆管理',
        title: '大肥鱼记忆管理',
        intro: '查看本地记忆库的实际文件占用与两种记忆分布。',
        settingsTitle: '记忆范围与保存位置',
        bindingLabel: '绑定范围',
        bindingSession: '按会话',
        bindingWorkspace: '按工作区',
        bindingSessionHint: '选中的会话共享可检索记忆；未显式选择时仅检索当前会话。',
        bindingWorkspaceHint: '可指定一个工作区共享记忆；未指定时使用当前会话所属工作区。',
        sessionTargetsTitle: '选择共享会话',
        sessionTargetsHint: '勾选的会话可以互相召回记忆；未勾选的会话不会召回。',
        sessionSearch: '筛选会话',
        sessionCount: '已选会话',
        sessionDefault: '恢复默认（仅当前会话）',
        sessionDefaultHint: '当前为默认模式：每个会话只检索自身记忆。',
        unsavedTargetsHint: '目标有未保存的更改；先保存、撤销或再切换模式。',
        discardTargetChanges: '撤销更改',
        sessionSave: '保存会话选择',
        sessionEmptyWarning: '保存空列表后，任何会话都不会召回记忆。',
        sessionNoMatches: '没有匹配的会话。',
        sessionUnavailable: '会话已不存在',
        loadMoreSessions: '加载更多会话',
        loadingMoreSessions: '正在加载…',
        sessionLoadMoreError: '无法加载更多会话，请刷新后重试。',
        workspaceTargetTitle: '指定一个工作区',
        workspaceTargetHint: '只在所选工作区的会话间共享记忆；未指定时按当前会话所属工作区共享。无所属工作区时只检索当前会话。模式切换会保留此选择。',
        workspaceCurrent: '自动：使用当前会话所属工作区',
        workspaceSave: '保存工作区选择',
        targetSaveBody: '保存后插件可能重新装载，并补录当前打开会话的历史。',
        migrationTitle: '数据库迁移验证',
        migrationChecking: '正在重开新数据库并验证会话回灌…',
        migrationReady: '新数据库完整性与会话回灌验证通过。旧数据库仍保留。',
        migrationBlocked: '新数据库验证未通过，旧数据库仍保留。',
        migrationCleanupBody: '确认后将再次校验新数据库和会话回灌，再清理旧主库及其 WAL/SHM。',
        migrationCleanupAction: '再次验证并删除旧库',
        migrationRetry: '重新验证',
        migrationSource: '旧库',
        migrationTarget: '新库',
        migrationCleanupDone: '旧库清理完成。',
        migrationErrorFallback: '迁移校验失败。',
        migrationCleanupPending: '旧库清理未完成，可安全重试；新库已通过验证。',
        databaseLabel: '数据库文件',
        chooseDirectory: '选择保存目录',
        selectedTarget: '新文件位置',
        modeConfirmBody: '保存此设置可能重新装载插件，并把现有会话历史补录到记忆库。',
        locationConfirmBody: '将通过 SQLite 在线备份刷新目标目录中的 memory.sqlite3。若文件已存在，只替换通过本插件 schema/bank 校验且无 WAL/SHM 的目标副本；其他文件拒绝覆盖。回灌、重开与完整性检查通过后才切换，旧库会保留到切换后的二次验证。',
        confirmChange: '确认并保存',
        cancel: '取消',
        savingSettings: '保存中…',
        settingsSaved: '设置已保存。',
        settingsErrorTitle: '设置操作未确认',
        settingsLoadError: '无法读取记忆设置。请展开错误详情查看原因，或重试。',
        settingsInvalidResponse: '设置服务返回的数据格式无效。',
        settingsErrorDetails: '错误详情',
        retrySettings: '重新读取设置',
        settingsLoading: '正在读取记忆设置…',
        settingsUnavailable: '当前无法打开目录选择器。',
        browseTitle: '选择保存目录',
        browsePathLabel: '当前目录',
        browseUp: '上一级',
        browseHome: '用户目录',
        browseConfirm: '使用此目录',
        browseLoading: '正在读取目录…',
        browseEmpty: '此目录没有子文件夹。',
        browseCreatePlaceholder: '新建子文件夹名称',
        browseCreate: '新建',
        browseHint: '当前 DSH 组合提供目录浏览能力，请浏览并选择目标文件夹。',
        refresh: '刷新',
        refreshing: '刷新中…',
        loading: '正在读取本地记忆统计…',
        loadErrorTitle: '暂时无法读取统计',
        loadErrorBody: '请检查大肥鱼记忆插件是否启用、数据库是否可访问，然后重试。',
        retry: '重试',
        storageTitle: '本地存储',
        dbTotal: 'SQLite 文件总量',
        mainFile: '主库',
        walFile: 'WAL',
        shmFile: 'SHM',
        originalText: '原文文本',
        messageCount: '消息',
        chunkCount: '检索片段',
        categoryTitle: '记忆分类',
        categoryNote: '按片段正文的 UTF-8 字节合计；重叠片段会重复计入。',
        recencyTitle: '记忆热度',
        recencyNote: '按片段当前衰减强度分组，打开页面时重新计算。',
        columnTier: '层级',
        columnChunks: '片段数',
        columnSize: '正文大小',
        tierFleeting: '短期',
        tierEpisodic: '情景',
        tierDurable: '长期',
        tierOther: '其他',
        stateActive: '活跃',
        stateWarm: '温热',
        stateCold: '冷档',
        hintActive: '强度 ≥ 50%',
        hintWarm: '强度 10%–50%',
        hintCold: '强度 < 10%',
        logicalNote: '分类与热度的大小是逻辑正文体积，并非磁盘页分配。数据库总量包含主库、WAL 和 SHM；原文文本按消息表中的 UTF-8 正文计算。',
        scopeProbeTitle: '这个范围已有记忆库',
        scopeProbeBody: '检测到该范围已经保存过记忆，直接切换会继续使用这个库：',
        scopeProbeCount: '条记忆',
        scopeProbeUse: '读取已有记忆',
        scopeProbeChooseOther: '换一个保存目录',
        scopeProbeCancel: '取消',
        scopeSwitchedTo: '已切换到',        orphanTitle: '来源会话已删除的记忆',
        orphanUnit: '条记忆仍保留',
        orphanNote: '这些记忆的来源会话已从工作区移除。记忆本身仍然可用，你也可以在这里清理掉不再需要的内容——删除后无法恢复。',
        orphanShow: '展开查看',
        orphanHide: '收起',
        orphanMsgUnit: '条',
        orphanDelete: '删除这些记忆',
        orphanConfirm: '确认删除？不可恢复',
        orphanDeleteYes: '确认删除',
        orphanDeleteNo: '取消',
        orphanDeleting: '删除中…',        strictScopeLabel: '强制范围模式',
        strictScopeHint: '开启后只记录当前绑定范围内的会话，每个范围使用独立的库文件。范围外的对话不会写入任何记忆。',
        strictScopePath: '当前范围库',
        strictScopeNoPath: '（未确定：请先选择会话或工作区）',
        strictScopeOn: '已开启 · 点击关闭',
        strictScopeOff: '开启强制范围',
        strictScopeSplit: '把旧库拆分到各工作区',
        strictScopeBackfilling: '正在回灌该范围的历史对话…',
        strictScopeBackfilled: '已回灌会话数',
        strictScopeBackfillFailed: '回灌失败',        scopeOfBank: '全库',
        dbSharedNote: '整库共用一个文件，无法按范围切分',
        cellsTitle: '记忆细胞',
        cellsSub: '每一颗细胞是一段真实对话。颜色由内容决定，越长的记忆越大；点开看原文。只显示当前绑定范围内的记忆。',
        cellsUnit: '颗记忆',
        cellsSearch: '寻找',
        cellsSearchHint: '搜索关键词，比如某个名字、地点或事情',
        cellsFilterLabel: '按说话人筛选',
        cellsAll: '全部',
        cellsUser: '你说的',
        cellsAssistant: '大肥鱼说的',
        cellsLoading: '正在唤醒记忆…',
        cellsFailed: '没能读到记忆。稍后再试，或刷新页面。',
        cellsEmpty: '这里还没有匹配的记忆。换个词试试？',
        cellsMore: '再捞一些上来',
        cellsDetail: '记忆原文',
        cellsClose: '关闭',
        emptyTitle: '这本记忆库还没有对话文本',
        emptyBody: '开始一次 DSH 对话后，插件会按照现有保存设置记录支持的消息。',
        lastCapture: '最近保存',
        neverCaptured: '尚无保存记录',
        updated: '统计时间',
        refreshError: '最新统计读取失败，当前仍显示上一次快照。',
      },
      en: {
        navLabel: 'Big Fish Memory',
        title: 'Big Fish Memory',
        intro: 'Inspect local database files and two views of the saved memory.',
        settingsTitle: 'Memory scope and location',
        bindingLabel: 'Binding scope',
        bindingSession: 'By session',
        bindingWorkspace: 'By workspace',
        bindingSessionHint: 'Selected sessions can retrieve one another’s saved memories; without a selection, only this session is searched.',
        bindingWorkspaceHint: 'Choose one workspace to share memories; otherwise the current session’s workspace is used.',
        sessionTargetsTitle: 'Choose sessions to share',
        sessionTargetsHint: 'Checked sessions can retrieve one another’s memories; unchecked sessions cannot recall them.',
        sessionSearch: 'Filter sessions',
        sessionCount: 'Selected sessions',
        sessionDefault: 'Use default (current session only)',
        sessionDefaultHint: 'Default behavior: each session can retrieve only its own memories.',
        unsavedTargetsHint: 'Targets have unsaved changes; save or discard them before switching modes.',
        discardTargetChanges: 'Discard changes',
        sessionSave: 'Save session selection',
        sessionEmptyWarning: 'Saving an empty list means no session can retrieve memory.',
        sessionNoMatches: 'No matching sessions.',
        sessionUnavailable: 'Session no longer exists',
        loadMoreSessions: 'Load more sessions',
        loadingMoreSessions: 'Loading…',
        sessionLoadMoreError: 'Could not load more sessions. Refresh and try again.',
        workspaceTargetTitle: 'Choose one workspace',
        workspaceTargetHint: 'Only sessions in the selected workspace share memories; otherwise the current session workspace is used. With no workspace, recall stays session-local. Mode changes keep this selection.',
        workspaceCurrent: 'Automatic: use each session’s current workspace',
        workspaceSave: 'Save workspace selection',
        targetSaveBody: 'Saving may reload the plugin and backfill currently open session history.',
        migrationTitle: 'Database migration verification',
        migrationChecking: 'Reopening the new database and verifying session backfill…',
        migrationReady: 'The new database passed integrity and session-backfill checks. The old database is still kept.',
        migrationBlocked: 'The new database did not pass verification; the old database is still kept.',
        migrationCleanupBody: 'Confirm to recheck the new database and session backfill, then remove only the old database and its WAL/SHM files.',
        migrationCleanupAction: 'Verify again and remove old database',
        migrationRetry: 'Retry verification',
        migrationSource: 'Old database',
        migrationTarget: 'New database',
        migrationCleanupDone: 'Old database cleanup completed.',
        migrationErrorFallback: 'Migration verification failed.',
        migrationCleanupPending: 'Old database cleanup is incomplete and can be retried safely; the new database passed verification.',
        databaseLabel: 'Database file',
        chooseDirectory: 'Choose save folder',
        selectedTarget: 'New file location',
        modeConfirmBody: 'Saving this setting may reload the plugin and backfill existing session history into the memory database.',
        locationConfirmBody: 'SQLite online backup will refresh memory.sqlite3 in the selected folder. An existing file is replaced only if it passes this plugin’s schema/bank checks and has no WAL/SHM sidecars; unrelated or active files are refused. The path switches only after backfill, reopen, and integrity checks; the old database stays until post-switch verification.',
        confirmChange: 'Confirm and save',
        cancel: 'Cancel',
        savingSettings: 'Saving…',
        settingsSaved: 'Settings saved.',
        settingsErrorTitle: 'Settings update could not be confirmed',
        settingsLoadError: 'Memory settings could not be loaded. Expand the error details for the cause, or retry.',
        settingsInvalidResponse: 'The settings service returned an invalid response.',
        settingsErrorDetails: 'Error details',
        retrySettings: 'Retry settings',
        settingsLoading: 'Reading memory settings…',
        settingsUnavailable: 'The directory picker is unavailable.',
        browseTitle: 'Choose save folder',
        browsePathLabel: 'Current folder',
        browseUp: 'Up',
        browseHome: 'Home',
        browseConfirm: 'Use this folder',
        browseLoading: 'Reading folder…',
        browseEmpty: 'No subfolders here.',
        browseCreatePlaceholder: 'New subfolder name',
        browseCreate: 'Create',
        browseHint: 'This DSH composition provides folder browsing; browse to and pick the target folder.',
        refresh: 'Refresh',
        refreshing: 'Refreshing…',
        loading: 'Reading local memory statistics…',
        loadErrorTitle: 'Statistics are unavailable',
        loadErrorBody: 'Check that the Big Fish Memory plugin is enabled and its database is accessible, then try again.',
        retry: 'Retry',
        storageTitle: 'Local storage',
        dbTotal: 'SQLite files total',
        mainFile: 'Main',
        walFile: 'WAL',
        shmFile: 'SHM',
        originalText: 'Original text',
        messageCount: 'Messages',
        chunkCount: 'Search chunks',
        categoryTitle: 'Memory categories',
        categoryNote: 'Sum of UTF-8 chunk-text bytes; overlapping chunks are counted again.',
        recencyTitle: 'Memory recency',
        recencyNote: 'Grouped by each chunk’s current decay strength and recalculated on open.',
        columnTier: 'Layer',
        columnChunks: 'Chunks',
        columnSize: 'Text size',
        tierFleeting: 'Short-term',
        tierEpisodic: 'Episodic',
        tierDurable: 'Long-term',
        tierOther: 'Other',
        stateActive: 'Active',
        stateWarm: 'Warm',
        stateCold: 'Cold',
        hintActive: 'Strength ≥ 50%',
        hintWarm: 'Strength 10%–50%',
        hintCold: 'Strength < 10%',
        logicalNote: 'Category and recency sizes are logical text totals, not SQLite page allocations. The physical total includes the main database, WAL, and SHM files; original text counts UTF-8 message-body bytes.',
        scopeProbeTitle: 'This scope already has a memory library',
        scopeProbeBody: 'Memories were already saved for this scope. Switching will keep using this library:',
        scopeProbeCount: 'memories',
        scopeProbeUse: 'Use the existing memories',
        scopeProbeChooseOther: 'Choose another directory',
        scopeProbeCancel: 'Cancel',
        scopeSwitchedTo: 'switched to',        orphanTitle: 'Memories whose source session was deleted',
        orphanUnit: 'memories kept',
        orphanNote: 'The sessions that produced these memories are no longer in the workspace. The memories still work, and you can clear the ones you no longer need here — deletion cannot be undone.',
        orphanShow: 'Show',
        orphanHide: 'Hide',
        orphanMsgUnit: 'msgs',
        orphanDelete: 'Delete these memories',
        orphanConfirm: 'Delete permanently?',
        orphanDeleteYes: 'Delete',
        orphanDeleteNo: 'Cancel',
        orphanDeleting: 'Deleting…',        strictScopeLabel: 'Strict scope mode',
        strictScopeHint: 'Only sessions inside the current binding are recorded, and each scope gets its own database file. Conversations outside the scope are never written.',
        strictScopePath: 'Scope database',
        strictScopeNoPath: '(unresolved — pick a session or workspace first)',
        strictScopeOn: 'On · click to disable',
        strictScopeOff: 'Enable strict scope',
        strictScopeSplit: 'Split the old database per workspace',
        strictScopeBackfilling: 'Backfilling this scope from session logs…',
        strictScopeBackfilled: 'Sessions backfilled',
        strictScopeBackfillFailed: 'Backfill failed',        scopeOfBank: 'of',
        dbSharedNote: 'One file shared by every scope — it cannot be split per session',
        cellsTitle: 'Memory cells',
        cellsSub: 'Each cell is one real exchange. Colour comes from the content, longer memories grow bigger — open one to read it. Only the current binding scope is shown.',
        cellsUnit: 'memories',
        cellsSearch: 'Find',
        cellsSearchHint: 'Search a name, place, or moment',
        cellsFilterLabel: 'Filter by speaker',
        cellsAll: 'All',
        cellsUser: 'You said',
        cellsAssistant: 'Big Fish said',
        cellsLoading: 'Waking memories…',
        cellsFailed: 'Could not read memories. Try again or refresh the page.',
        cellsEmpty: 'No matching memory yet. Try another word?',
        cellsMore: 'Dredge up more',
        cellsDetail: 'Memory text',
        cellsClose: 'Close',
        emptyTitle: 'No conversation text is stored yet',
        emptyBody: 'After a DSH conversation, the plugin records supported messages according to its current capture settings.',
        lastCapture: 'Last capture',
        neverCaptured: 'No captures yet',
        updated: 'Measured',
        refreshError: 'The latest read failed; the previous snapshot is still shown.',
      },
    };

    const styles = `
      .dfm-page, .dfm-page * { box-sizing: border-box; }
      .dfm-page {
        --dfm-bg: var(--dsw-alias-bg-base);
        --dfm-surface: var(--dsw-alias-bg-layer-1);
        --dfm-row-hover: var(--dsw-alias-bg-layer-2);
        --dfm-border: var(--dsw-alias-border-l1);
        --dfm-border-strong: var(--dsw-alias-border-l2);
        --dfm-text: var(--dsw-alias-label-primary);
        --dfm-muted: var(--dsw-alias-label-secondary);
        --dfm-brand: var(--dsw-alias-brand-primary);
        height: 100%;
        min-height: 0;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior-y: contain;
        padding: 26px clamp(20px, 4vw, 44px) 44px;
        color: var(--dfm-text);
        background: var(--dfm-bg);
        font: inherit;
        line-height: 1.5;
        scrollbar-color: var(--dfm-border) transparent;
        scrollbar-width: thin;
      }
      .dfm-page ::selection {
        color: var(--dfm-text);
        background: color-mix(in srgb, var(--dfm-brand) 24%, var(--dfm-bg));
      }
      .dfm-content { width: min(100%, 920px); margin: 0 auto; }
      .dfm-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        padding-bottom: 22px;
        border-bottom: 1px solid var(--dfm-border);
      }
      .dfm-heading { min-width: 0; }
      .dfm-title { margin: 0; font-size: 23px; line-height: 1.25; font-weight: 650; letter-spacing: -0.02em; }
      .dfm-intro { max-width: 68ch; margin: 9px 0 0; color: var(--dfm-muted); font-size: 14px; }
      .dfm-refresh {
        flex: 0 0 auto;
        min-height: 36px;
        padding: 7px 13px;
        border: 1px solid var(--dfm-border-strong);
        border-radius: 9px;
        color: var(--dfm-text);
        background: var(--dfm-surface);
        font: inherit;
        font-size: 13px;
        font-weight: 550;
        cursor: pointer;
        transition: background-color 140ms ease-out, border-color 140ms ease-out;
      }
      .dfm-refresh:hover:not(:disabled) { background: var(--dfm-row-hover); border-color: var(--dfm-brand); }
      .dfm-refresh:focus-visible { outline: 2px solid var(--dfm-brand); outline-offset: 3px; }
      .dfm-refresh:disabled { color: var(--dfm-muted); border-color: var(--dfm-border); cursor: wait; }
      .dfm-settings { margin: 18px 0 0; padding: 0 0 18px; border-bottom: 1px solid var(--dfm-border); }
      .dfm-settings-title { margin: 0 0 14px; font-size: 15px; line-height: 1.35; font-weight: 620; }
      .dfm-settings-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 18px 32px; }
      .dfm-setting { min-width: 0; }
      .dfm-setting-label { display: block; color: var(--dfm-muted); font-size: 12px; font-weight: 560; }
      .dfm-setting-hint { margin: 6px 0 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-control { width: 100%; min-height: 36px; padding: 7px 10px; border: 1px solid var(--dfm-border-strong); border-radius: 8px; color: var(--dfm-text); background: var(--dfm-surface); font: inherit; font-size: 13px; }
      .dfm-control:focus-visible { outline: 2px solid var(--dfm-brand); outline-offset: 2px; }
      .dfm-target-setting { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--dfm-border); }
      .dfm-target-list { max-height: 210px; margin-top: 8px; overflow-y: auto; border: 1px solid var(--dfm-border); border-radius: 8px; background: var(--dfm-surface); scrollbar-color: var(--dfm-border) transparent; scrollbar-width: thin; }
      .dfm-target-option { display: grid; grid-template-columns: 16px minmax(0, 1fr); gap: 9px; align-items: start; padding: 8px 10px; border-bottom: 1px solid var(--dfm-border); cursor: pointer; font-size: 13px; }
      .dfm-target-option:last-child { border-bottom: 0; }
      .dfm-target-option input { margin: 3px 0 0; accent-color: var(--dfm-brand); }
      .dfm-target-option-title { display: block; overflow-wrap: anywhere; font-weight: 540; }
      .dfm-target-option-meta { display: block; margin-top: 2px; color: var(--dfm-muted); font-size: 11px; }
      .dfm-target-empty { padding: 12px 10px; color: var(--dfm-muted); font-size: 12px; }
      .dfm-browse-entry { display: block; width: 100%; padding: 8px 10px; border: 0; border-bottom: 1px solid var(--dfm-border); background: transparent; color: inherit; font: inherit; font-size: 13px; text-align: left; overflow-wrap: anywhere; cursor: pointer; }
      .dfm-browse-entry:last-child { border-bottom: 0; }
      .dfm-browse-entry:hover:not(:disabled) { background: var(--dfm-surface-hover, var(--dfm-surface)); }
      .dfm-browse-entry:disabled { cursor: default; opacity: .6; }
      .dfm-target-footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; margin-top: 8px; }
      .dfm-migration { margin-top: 18px; padding-top: 15px; border-top: 1px solid var(--dfm-border); }
      .dfm-migration-title { margin: 0 0 8px; font-size: 13px; font-weight: 600; }
      .dfm-migration-status { margin: 8px 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-migration-path { display: block; margin-top: 5px; overflow-wrap: anywhere; font-size: 11px; }
      .dfm-choice-row, .dfm-setting-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
      .dfm-choice, .dfm-settings .dfm-action { min-height: 34px; padding: 6px 11px; border: 1px solid var(--dfm-border-strong); border-radius: 8px; color: var(--dfm-text); background: var(--dfm-surface); font: inherit; font-size: 13px; font-weight: 540; cursor: pointer; transition: background-color 140ms ease-out, border-color 140ms ease-out; }
      .dfm-choice:hover:not(:disabled), .dfm-settings .dfm-action:hover:not(:disabled) { background: var(--dfm-row-hover); border-color: var(--dfm-brand); }
      .dfm-choice:focus-visible, .dfm-settings .dfm-action:focus-visible { outline: 2px solid var(--dfm-brand); outline-offset: 3px; }
      .dfm-choice[aria-pressed="true"] { border-color: var(--dfm-brand); background: var(--dfm-row-hover); }
      .dfm-choice:disabled, .dfm-settings .dfm-action:disabled { color: var(--dfm-muted); cursor: wait; }
      .dfm-settings .dfm-action--quiet { background: transparent; }
      .dfm-path { display: block; margin-top: 7px; color: var(--dfm-text); font-size: 12px; overflow-wrap: anywhere; }
      .dfm-confirm { margin-top: 13px; padding-top: 12px; border-top: 1px solid var(--dfm-border); }
      .dfm-confirm p { max-width: 76ch; margin: 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-confirm code { color: var(--dfm-text); overflow-wrap: anywhere; }
      .dfm-settings-message { margin: 10px 0 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-settings-error { color: var(--dsw-alias-state-error-primary); }
      .dfm-settings-success { color: var(--dsw-alias-state-success-primary); }
      .dfm-settings-loading { margin: 14px 0 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-updated { min-height: 20px; margin: 12px 0 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-overview {
        display: grid;
        grid-template-columns: minmax(190px, 1.5fr) repeat(3, minmax(110px, 1fr));
        gap: 14px 22px;
        margin: 22px 0 0;
        padding: 0 0 22px;
        border-bottom: 1px solid var(--dfm-border);
      }
      .dfm-metric { min-width: 0; }
      .dfm-metric dt { color: var(--dfm-muted); font-size: 12px; }
      .dfm-metric dd { margin: 4px 0 0; font-size: 17px; font-weight: 620; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
      .dfm-metric--total dd { font-size: 20px; }
      .dfm-metric small { display: block; margin-top: 5px; color: var(--dfm-muted); font-size: 11px; line-height: 1.55; font-weight: 400; }
      .dfm-metric .dfm-metric-scope { margin-top: 3px; color: var(--dfm-muted); font-size: 10.5px; opacity: .82; }
      .dfm-section { margin-top: 30px; }
      .dfm-section-head { margin-bottom: 10px; }
      .dfm-section-title { margin: 0; font-size: 16px; line-height: 1.35; font-weight: 620; }
      .dfm-section-note { max-width: 72ch; margin: 5px 0 0; color: var(--dfm-muted); font-size: 12px; }
      .dfm-table-wrap { width: 100%; overflow-x: auto; }
      .dfm-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
      .dfm-table thead { border-bottom: 1px solid var(--dfm-border-strong); }
      .dfm-table th { padding: 9px 10px; color: var(--dfm-muted); font-size: 11px; font-weight: 550; }
      .dfm-table td { padding: 11px 10px; border-bottom: 1px solid var(--dfm-border); }
      .dfm-table tbody tr:hover { background: var(--dfm-row-hover); }
      .dfm-table th:first-child, .dfm-table td:first-child { padding-left: 2px; }
      .dfm-table th:last-child, .dfm-table td:last-child { padding-right: 2px; }
      .dfm-num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .dfm-row-name { font-weight: 560; }
      .dfm-row-hint { display: block; margin-top: 2px; color: var(--dfm-muted); font-size: 11px; font-weight: 400; }
      .dfm-state--active { color: var(--dsw-alias-state-success-primary); }
      .dfm-state--warm { color: var(--dsw-alias-state-warn-primary); }
      .dfm-state--cold { color: var(--dsw-alias-state-idle-primary); }
      .dfm-note, .dfm-empty, .dfm-error {
        max-width: 76ch;
        margin: 22px 0 0;
        padding-top: 13px;
        border-top: 1px solid var(--dfm-border);
        color: var(--dfm-muted);
        font-size: 12px;
      }
      .dfm-empty strong { display: block; margin-bottom: 4px; color: var(--dfm-text); font-size: 13px; font-weight: 580; }
      .dfm-error { color: var(--dsw-alias-state-error-primary); }
      .dfm-failure { max-width: 70ch; margin-top: 28px; }
      .dfm-failure h2 { margin: 0; color: var(--dsw-alias-state-error-primary); font-size: 15px; font-weight: 620; }
      .dfm-failure p { margin: 7px 0 0; color: var(--dfm-muted); font-size: 13px; }
      @media (max-height: 520px) {
        .dfm-page { padding-top: 16px; padding-bottom: 22px; }
        .dfm-header { padding-bottom: 16px; }
      }
      @media (max-width: 700px) {
        .dfm-page { padding-right: 20px; padding-left: 20px; }
        .dfm-settings-grid { grid-template-columns: 1fr; gap: 15px; }
        .dfm-overview { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 20px; }
      }
      @media (max-width: 460px) {
        .dfm-header { align-items: flex-start; gap: 12px; }
        .dfm-title { font-size: 20px; }
        .dfm-refresh { padding: 7px 10px; }
        .dfm-table { min-width: 360px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dfm-refresh, .dfm-choice, .dfm-settings .dfm-action { transition: none; }
      }

      /* ── 记忆细胞 ─────────────────────────────────────────────────────
         多巴胺配色的核心：每个细胞用 HSL 按自身色相发光，饱和度高、明度分层。
         深色底用较高明度，浅色底自动降低饱和度，保证两种主题下都可读。 */
      .dfm-cells { margin-top: 34px; }
      .dfm-cells-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; flex-wrap: wrap; }
      .dfm-cells-sub { margin: 6px 0 0; color: var(--dfm-muted); font-size: 12px; max-width: 52ch; }
      .dfm-cells-count { display: flex; align-items: baseline; gap: 5px; }
      .dfm-cells-count strong {
        font-size: 30px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums;
        background: linear-gradient(120deg, hsl(340 90% 62%), hsl(258 88% 66%) 45%, hsl(172 78% 48%));
        -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      }
      .dfm-cells-count span { color: var(--dfm-muted); font-size: 12px; }

      /* ── 孤儿记忆（来源会话已删除）───────────────────────────────────── */
      .dfm-orphans {
        margin-top: 16px; padding: 12px 14px; border-radius: 12px;
        border: 1px solid hsl(38 92% 58% / .38);
        background: hsl(38 92% 58% / .07);
      }
      .dfm-orphans-head { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
      .dfm-orphans-head strong { font-size: 12.5px; font-weight: 640; }
      .dfm-orphans-head span { color: var(--dfm-muted); font-size: 11.5px; }
      .dfm-orphans-toggle {
        margin-left: auto; padding: 4px 10px; border-radius: 7px; cursor: pointer;
        border: 1px solid var(--dfm-border-strong); background: var(--dfm-surface);
        color: var(--dfm-text); font: inherit; font-size: 11.5px;
      }
      .dfm-orphans-toggle:hover { border-color: hsl(38 92% 58%); }
      .dfm-orphans-note { margin: 7px 0 0; color: var(--dfm-muted); font-size: 11px; line-height: 1.6; }
      .dfm-orphans-list { margin-top: 10px; display: grid; gap: 7px; }
      .dfm-orphans-row {
        display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
        padding: 8px 10px; border-radius: 9px; background: var(--dfm-surface);
        border: 1px solid var(--dfm-border);
      }
      .dfm-orphans-id { flex: 1 1 200px; min-width: 0; font-size: 11px; overflow-wrap: anywhere; opacity: .85; }
      .dfm-orphans-meta { color: var(--dfm-muted); font-size: 11px; white-space: nowrap; }
      .dfm-orphans-delete, .dfm-orphans-danger, .dfm-orphans-cancel {
        padding: 4px 10px; border-radius: 7px; cursor: pointer; font: inherit; font-size: 11.5px; font-weight: 560;
        border: 1px solid var(--dfm-border-strong); background: transparent; color: var(--dfm-text);
      }
      .dfm-orphans-delete:hover { border-color: hsl(0 78% 58%); color: hsl(0 78% 58%); }
      .dfm-orphans-confirm { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
      .dfm-orphans-confirm > span { color: hsl(0 72% 55%); font-size: 11.5px; }
      .dfm-orphans-danger { border-color: hsl(0 78% 58%); background: hsl(0 78% 58%); color: #fff; }
      .dfm-orphans-danger:hover:not(:disabled) { filter: brightness(1.08); }
      .dfm-orphans-danger:disabled, .dfm-orphans-cancel:disabled { opacity: .55; cursor: wait; }
      .dfm-orphans-error { margin: 8px 0 0; color: var(--dsw-alias-state-error-primary); font-size: 11.5px; }
      .dfm-cells-search { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
      .dfm-cells-search input {
        flex: 1 1 200px; min-width: 0; height: 36px; padding: 0 12px;
        border: 1px solid var(--dfm-border-strong); border-radius: 10px;
        background: var(--dfm-surface); color: var(--dfm-text); font: inherit; font-size: 13px;
      }
      .dfm-cells-search input:focus-visible { outline: 2px solid hsl(258 88% 66%); outline-offset: 2px; border-color: transparent; }
      .dfm-cells-filters { display: flex; gap: 6px; }
      .dfm-cells-chip {
        height: 32px; padding: 0 12px; border-radius: 999px; cursor: pointer;
        border: 1px solid var(--dfm-border-strong); background: transparent;
        color: var(--dfm-muted); font: inherit; font-size: 12px; font-weight: 560;
        transition: color 140ms ease-out, border-color 140ms ease-out, background-color 140ms ease-out;
      }
      .dfm-cells-chip:hover { color: var(--dfm-text); border-color: hsl(258 88% 66%); }
      .dfm-cells-chip--on {
        color: #fff; border-color: transparent;
        background: linear-gradient(120deg, hsl(340 90% 62%), hsl(258 88% 66%));
      }
      .dfm-cells-submit {
        height: 36px; padding: 0 16px; border-radius: 10px; cursor: pointer; border: 0;
        color: #fff; font: inherit; font-size: 13px; font-weight: 600;
        background: linear-gradient(120deg, hsl(340 90% 62%), hsl(258 88% 66%));
        transition: filter 140ms ease-out, transform 140ms ease-out;
      }
      .dfm-cells-submit:hover { filter: brightness(1.08); }
      .dfm-cells-submit:active { transform: scale(.98); }

      .dfm-cells-state {
        display: flex; align-items: center; gap: 9px; justify-content: center;
        margin-top: 22px; padding: 34px 18px; border-radius: 16px;
        border: 1px dashed var(--dfm-border-strong); color: var(--dfm-muted); font-size: 13px;
      }
      .dfm-cells-state--error { color: var(--dsw-alias-state-error-primary); border-style: solid; }
      .dfm-cells-spinner {
        width: 14px; height: 14px; border-radius: 50%;
        border: 2px solid hsl(258 88% 66% / .28); border-top-color: hsl(258 88% 66%);
        animation: dfm-spin .8s linear infinite;
      }
      @keyframes dfm-spin { to { transform: rotate(360deg); } }

      .dfm-cells-field {
        display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
        gap: 10px; margin-top: 22px; padding: 26px 10px;
        border-radius: 22px;
        background:
          radial-gradient(circle at 22% 28%, hsl(340 90% 62% / .07), transparent 42%),
          radial-gradient(circle at 78% 72%, hsl(196 92% 58% / .07), transparent 44%),
          var(--dfm-surface);
      }
      .dfm-cell {
        position: relative; flex: 0 0 auto;
        width: var(--cell-size); height: var(--cell-size);
        padding: 0; border: 0; border-radius: 50%; cursor: pointer;
        background: transparent; color: inherit; font: inherit;
        transform: translate(calc((var(--cell-x) - .5) * 10px), calc((var(--cell-y) - .5) * 10px));
        transition: transform 220ms cubic-bezier(.2,.8,.3,1);
      }
      .dfm-cell-glow {
        position: absolute; inset: 0; border-radius: 50%;
        background: radial-gradient(circle at 32% 28%,
          hsl(var(--cell-hue) 96% 72% / .95),
          hsl(var(--cell-hue) 92% 60% / .82) 46%,
          hsl(var(--cell-hue) 88% 48% / .62) 74%,
          hsl(var(--cell-hue) 84% 40% / .48));
        box-shadow:
          0 0 0 1px hsl(var(--cell-hue) 92% 70% / .28) inset,
          0 6px 18px -6px hsl(var(--cell-hue) 90% 52% / .55),
          0 0 26px -8px hsl(var(--cell-hue) 92% 62% / .42);
        animation: dfm-float 9s ease-in-out infinite;
      }
      .dfm-cell-body {
        position: absolute; inset: 0; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 2px;
        padding: 14%; text-align: center; overflow: hidden;
      }
      .dfm-cell-text {
        display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;
        overflow: hidden; width: 100%;
        font-size: 9.5px; line-height: 1.32; font-weight: 540;
        color: #fff; text-shadow: 0 1px 2px hsl(var(--cell-hue) 70% 22% / .55);
        overflow-wrap: anywhere;
      }
      .dfm-cell-meta {
        display: flex; align-items: center; gap: 4px;
        font-size: 8px; font-weight: 600; letter-spacing: .01em;
        color: hsl(var(--cell-hue) 40% 98% / .82); white-space: nowrap;
      }
      .dfm-cell-dot { width: 2px; height: 2px; border-radius: 50%; background: currentColor; opacity: .6; }
      .dfm-cell--user .dfm-cell-glow {
        box-shadow:
          0 0 0 1.5px hsl(var(--cell-hue) 96% 80% / .55) inset,
          0 6px 20px -6px hsl(var(--cell-hue) 90% 52% / .62),
          0 0 30px -8px hsl(var(--cell-hue) 92% 64% / .5);
      }
      .dfm-cell:hover, .dfm-cell:focus-visible {
        transform: translate(calc((var(--cell-x) - .5) * 10px), calc((var(--cell-y) - .5) * 10px - 4px)) scale(1.07);
        z-index: 2;
      }
      .dfm-cell:focus-visible { outline: 2px solid hsl(var(--cell-hue) 96% 78%); outline-offset: 3px; }
      @keyframes dfm-float {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.025); }
      }
      .dfm-cells-more {
        flex: 0 0 100%; margin: 6px auto 0; padding: 9px 20px; cursor: pointer;
        border-radius: 999px; border: 1px solid var(--dfm-border-strong);
        background: var(--dfm-surface); color: var(--dfm-text);
        font: inherit; font-size: 12px; font-weight: 560;
      }
      .dfm-cells-more:hover { border-color: hsl(258 88% 66%); }

      .dfm-cells-modal {
        position: fixed; inset: 0; z-index: 60; display: flex;
        align-items: center; justify-content: center; padding: 24px;
        background: hsl(240 30% 8% / .55); backdrop-filter: blur(3px);
        animation: dfm-fade 160ms ease-out;
      }
      @keyframes dfm-fade { from { opacity: 0; } to { opacity: 1; } }
      .dfm-cells-modal-card {
        width: min(100%, 620px); max-height: 76vh; display: flex; flex-direction: column;
        border-radius: 18px; overflow: hidden;
        background: var(--dfm-bg); border: 1px solid var(--dfm-border-strong);
        box-shadow: 0 24px 60px -18px hsl(240 40% 6% / .6);
      }
      .dfm-cells-modal-head {
        display: flex; align-items: center; gap: 10px;
        padding: 14px 16px; border-bottom: 1px solid var(--dfm-border);
      }
      .dfm-cells-modal-tag {
        padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 620; color: #fff;
        background: linear-gradient(120deg, hsl(340 90% 62%), hsl(258 88% 66%));
      }
      .dfm-cells-modal-time { flex: 1; color: var(--dfm-muted); font-size: 11.5px; }
      .dfm-cells-modal-close {
        width: 26px; height: 26px; border: 0; border-radius: 8px; cursor: pointer;
        background: transparent; color: var(--dfm-muted); font-size: 19px; line-height: 1;
      }
      .dfm-cells-modal-close:hover { background: var(--dfm-row-hover); color: var(--dfm-text); }
      .dfm-cells-modal-body { padding: 16px; overflow-y: auto; }
      .dfm-cells-modal-body p {
        margin: 0; font-size: 13.5px; line-height: 1.68; white-space: pre-wrap; overflow-wrap: anywhere;
      }
      .dfm-cells-modal-loading { color: var(--dfm-muted); }

      /* 浅色主题下降低饱和度，避免刺眼 */
      @media (prefers-color-scheme: light) {
        .dfm-cell-glow { filter: saturate(.88) brightness(1.02); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dfm-cell-glow { animation: none; }
        .dfm-cell, .dfm-cells-modal { transition: none; animation: none; }
      }
    `;

    function numberLocale(localeId) {
      return localeId === 'zh' ? 'zh-CN' : 'en-US';
    }

    function formatBytes(value, localeId) {
      const bytes = Number(value);
      if (!Number.isFinite(bytes) || bytes < 0) return '—';
      const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
      let size = bytes;
      let unit = 0;
      while (size >= 1024 && unit < units.length - 1) {
        size /= 1024;
        unit += 1;
      }
      const digits = unit === 0 ? 0 : 1;
      const formatted = new Intl.NumberFormat(numberLocale(localeId), {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      }).format(size);
      return `${formatted} ${units[unit]}`;
    }

    function formatCount(value, localeId) {
      const count = Number(value);
      if (!Number.isFinite(count) || count < 0) return '—';
      return new Intl.NumberFormat(numberLocale(localeId), { maximumFractionDigits: 0 }).format(count);
    }

    function formatDate(value, localeId) {
      if (!Number.isFinite(Number(value)) || Number(value) <= 0) return null;
      return new Intl.DateTimeFormat(numberLocale(localeId), {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(Number(value)));
    }

    function SidebarIcon({ size = 20, active = false }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 64 64',
        fill: 'none',
        stroke: active ? 'var(--dsw-alias-brand-primary)' : 'currentColor',
        strokeWidth: 3.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: 'false',
      },
      h('path', { d: 'M6 32c7.5-11.5 19-17.5 33-13.7L53 10v14.8c4.1 1.7 7.2 4.1 9 7.2-1.8 3.1-4.9 5.5-9 7.2V54l-14-8.3C25 49.5 13.5 43.5 6 32Z' }),
      h('circle', { cx: 42, cy: 27, r: 2.2, fill: 'currentColor', stroke: 'none' }),
      h('path', { d: 'M19 25c2.8 1.8 4.4 4.1 4.8 7-.4 2.9-2 5.2-4.8 7' }));
    }

    function BreakdownTable({ id, title, note, rows, localeId, t }) {
      const body = rows.map(row => h('tr', { key: row.id },
        h('th', { scope: 'row' },
          h('span', { className: row.stateClass ? `dfm-row-name ${row.stateClass}` : 'dfm-row-name' }, row.label),
          row.hint ? h('span', { className: 'dfm-row-hint' }, row.hint) : null),
        h('td', { className: 'dfm-num' }, formatCount(row.chunks, localeId)),
        h('td', { className: 'dfm-num' }, formatBytes(row.textBytes, localeId))));
      return h('section', { className: 'dfm-section', 'aria-labelledby': `${id}-title` },
        h('div', { className: 'dfm-section-head' },
          h('h2', { id: `${id}-title`, className: 'dfm-section-title' }, title),
          h('p', { className: 'dfm-section-note' }, note)),
        h('div', { className: 'dfm-table-wrap' },
          h('table', { className: 'dfm-table' },
            h('thead', null,
              h('tr', null,
                h('th', { scope: 'col' }, t('columnTier')),
                h('th', { scope: 'col', className: 'dfm-num' }, t('columnChunks')),
                h('th', { scope: 'col', className: 'dfm-num' }, t('columnSize')))),
            h('tbody', null, body))));
    }

    function createPanel(ctx) {
      const t = ctx.locale.bind(NAMESPACE);
      const locale = ctx.locale;
      const rpc = ctx.connection.rpc;
      const uiWorkspace = ctx.uiWorkspace;

      // ── 记忆细胞 ────────────────────────────────────────────────────────
      // 多巴胺配色：每条记忆按自身 id 哈希取一个色相，同一条记忆永远同色，
      // 于是"颜色"本身成了一条稳定的视觉身份线索。
      // 大小映射正文长度，位置用 id 做确定性错落，避免每次渲染跳动。
      const CELL_HUES = [340, 12, 32, 48, 96, 152, 172, 196, 220, 258, 288, 316];
      function cellTone(seed) {
        let hash = 2166136261;
        const text = String(seed);
        for (let i = 0; i < text.length; i++) {
          hash ^= text.charCodeAt(i);
          hash = Math.imul(hash, 16777619);
        }
        const hue = CELL_HUES[Math.abs(hash) % CELL_HUES.length];
        const drift = (Math.abs(hash >> 8) % 14) - 7;
        return { hue: (hue + drift + 360) % 360, delay: (Math.abs(hash >> 16) % 420) / 100 };
      }
      function cellSize(chars) {
        if (chars <= 20) return 58;
        if (chars <= 60) return 70;
        if (chars <= 150) return 84;
        if (chars <= 400) return 100;
        if (chars <= 1000) return 116;
        return 132;
      }
      function relativeTime(time, localeId) {
        if (!time) return '';
        const zh = localeId === 'zh';
        const diff = Date.now() - time;
        if (diff < 60000) return zh ? '刚刚' : 'just now';
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return zh ? `${mins} 分钟前` : `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return zh ? `${hours} 小时前` : `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return zh ? `${days} 天前` : `${days}d ago`;
        return new Date(time).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' });
      }

      function MemoryCells({ localeId }) {
        const [cells, setCells] = React.useState([]);
        const [total, setTotal] = React.useState(0);
        const [nextOffset, setNextOffset] = React.useState(null);
        const [query, setQuery] = React.useState('');
        const [committed, setCommitted] = React.useState('');
        const [role, setRole] = React.useState('');
        const [loading, setLoading] = React.useState(true);
        const [failed, setFailed] = React.useState(false);
        const [active, setActive] = React.useState(null);
        const [detail, setDetail] = React.useState(null);
        const [inventory, setInventory] = React.useState(null);
        const [orphanOpen, setOrphanOpen] = React.useState(false);
        const [pendingDelete, setPendingDelete] = React.useState('');
        const [deleteBusy, setDeleteBusy] = React.useState(false);
        const [deleteError, setDeleteError] = React.useState('');
        const [reloadToken, setReloadToken] = React.useState(0);

        // 会话清单：用来发现"来源会话已被删除"的孤儿记忆。
        // 单独请求而不是塞进 page 响应，是因为它覆盖全库、与分页无关。
        React.useEffect(() => {
          const controller = new AbortController();
          rpc.call(CHANNEL, 'dafeiyu-memory/browse', { action: 'sessions' }, controller.signal)
            .then(result => {
              if (!result || result.ok !== true) throw new Error('sessions failed');
              setInventory(result.value);
            })
            .catch(() => setInventory(null));
          return () => controller.abort();
        }, [reloadToken]);

        React.useEffect(() => {
          const controller = new AbortController();
          setLoading(true);
          rpc.call(CHANNEL, 'dafeiyu-memory/browse', {
            action: 'page', offset: 0, limit: 40, preview: 110,
            query: committed || null, role: role || null,
          }, controller.signal).then(result => {
            if (!result || result.ok !== true) throw new Error(result?.error?.message || 'browse failed');
            setCells(result.value.items);
            setTotal(result.value.total);
            setNextOffset(result.value.nextOffset);
            setLoading(false);
            setFailed(false);
          }).catch(error => {
            if (controller.signal.aborted) return;
            setLoading(false);
            setFailed(true);
          });
          return () => controller.abort();
        }, [committed, role, reloadToken]);

        const showMore = () => {
          const controller = new AbortController();
          rpc.call(CHANNEL, 'dafeiyu-memory/browse', {
            action: 'page', offset: nextOffset, limit: 40, preview: 110,
            query: committed || null, role: role || null,
          }, controller.signal).then(result => {
            if (!result || result.ok !== true) throw new Error('browse failed');
            setCells(previous => [...previous, ...result.value.items]);
            setNextOffset(result.value.nextOffset);
          }).catch(() => setFailed(true));
        };

        const openCell = cell => {
          setActive(cell);
          setDetail(null);
          const controller = new AbortController();
          rpc.call(CHANNEL, 'dafeiyu-memory/browse', { action: 'detail', id: cell.id }, controller.signal)
            .then(result => {
              if (!result || result.ok !== true) throw new Error('detail failed');
              setDetail(result.value);
            })
            .catch(() => setDetail({ text: cell.preview, failed: true }));
        };

        const submit = event => {
          event.preventDefault();
          setCommitted(query.trim());
        };

        // 删除某个已失效会话的记忆。后端会再次校验"该会话确实不在绑定范围内"，
        // 前端这层只是让用户看清将要删掉多少条。
        const confirmDelete = sessionId => {
          setDeleteBusy(true);
          setDeleteError('');
          const controller = new AbortController();
          rpc.call(CHANNEL, 'dafeiyu-memory/browse',
            { action: 'delete-session', sessionId, confirm: true }, controller.signal)
            .then(result => {
              if (!result || result.ok !== true) throw new Error(result?.error?.message || 'delete failed');
              setPendingDelete('');
              setReloadToken(token => token + 1);
              setDeleteBusy(false);
            })
            .catch(error => {
              setDeleteError(error && error.message ? error.message : 'delete failed');
              setDeleteBusy(false);
            });
        };

        const orphanGroups = React.useMemo(() => {
          if (!inventory || !Array.isArray(inventory.items)) return [];
          const map = new Map();
          for (const item of inventory.items) {
            if (!item.orphan) continue;
            const entry = map.get(item.sessionId) ?? { sessionId: item.sessionId, messages: 0, lastAt: 0 };
            entry.messages += item.messages;
            entry.lastAt = Math.max(entry.lastAt, item.lastAt || 0);
            map.set(item.sessionId, entry);
          }
          return [...map.values()].sort((a, b) => b.lastAt - a.lastAt);
        }, [inventory]);

        return h('section', { className: 'dfm-cells' },
          h('div', { className: 'dfm-cells-head' },
            h('div', null,
              h('h2', { className: 'dfm-section-title' }, t('cellsTitle')),
              h('p', { className: 'dfm-cells-sub' }, t('cellsSub'))),
            h('div', { className: 'dfm-cells-count' },
              h('strong', null, total.toLocaleString(localeId === 'zh' ? 'zh-CN' : 'en-US')),
              h('span', null, t('cellsUnit')))),
          orphanGroups.length
            ? h('div', { className: 'dfm-orphans' },
              h('div', { className: 'dfm-orphans-head' },
                h('strong', null, t('orphanTitle')),
                h('span', null, `${inventory.orphanMessages} ${t('orphanUnit')}`),
                h('button', {
                  type: 'button', className: 'dfm-orphans-toggle',
                  'aria-expanded': orphanOpen,
                  onClick: () => { setOrphanOpen(open => !open); setPendingDelete(''); setDeleteError(''); },
                }, orphanOpen ? t('orphanHide') : t('orphanShow'))),
              h('p', { className: 'dfm-orphans-note' }, t('orphanNote')),
              orphanOpen
                ? h('div', { className: 'dfm-orphans-list' },
                  orphanGroups.map(group => h('div', { key: group.sessionId, className: 'dfm-orphans-row' },
                    h('code', { className: 'dfm-orphans-id' }, group.sessionId),
                    h('span', { className: 'dfm-orphans-meta' },
                      `${group.messages} ${t('orphanMsgUnit')} · ${relativeTime(group.lastAt, localeId)}`),
                    pendingDelete === group.sessionId
                      ? h('span', { className: 'dfm-orphans-confirm' },
                        h('span', null, t('orphanConfirm')),
                        h('button', {
                          type: 'button', className: 'dfm-orphans-danger', disabled: deleteBusy,
                          onClick: () => confirmDelete(group.sessionId),
                        }, deleteBusy ? t('orphanDeleting') : t('orphanDeleteYes')),
                        h('button', {
                          type: 'button', className: 'dfm-orphans-cancel', disabled: deleteBusy,
                          onClick: () => { setPendingDelete(''); setDeleteError(''); },
                        }, t('orphanDeleteNo')))
                      : h('button', {
                        type: 'button', className: 'dfm-orphans-delete',
                        onClick: () => { setPendingDelete(group.sessionId); setDeleteError(''); },
                      }, t('orphanDelete')))),
                  deleteError ? h('p', { className: 'dfm-orphans-error' }, deleteError) : null)
                : null)
            : null,
          h('form', { className: 'dfm-cells-search', onSubmit: submit },
            h('input', {
              type: 'search', value: query, placeholder: t('cellsSearchHint'),
              onChange: event => setQuery(event.target.value), 'aria-label': t('cellsSearchHint'),
            }),
            h('div', { className: 'dfm-cells-filters', role: 'group', 'aria-label': t('cellsFilterLabel') },
              [['', t('cellsAll')], ['user', t('cellsUser')], ['assistant', t('cellsAssistant')]].map(entry =>
                h('button', {
                  key: entry[0] || 'all', type: 'button',
                  className: role === entry[0] ? 'dfm-cells-chip dfm-cells-chip--on' : 'dfm-cells-chip',
                  'aria-pressed': role === entry[0],
                  onClick: () => setRole(entry[0]),
                }, entry[1]))),
            h('button', { type: 'submit', className: 'dfm-cells-submit' }, t('cellsSearch'))),
          loading && !cells.length
            ? h('div', { className: 'dfm-cells-state' }, h('span', { className: 'dfm-cells-spinner', 'aria-hidden': 'true' }), t('cellsLoading'))
            : null,
          failed ? h('div', { className: 'dfm-cells-state dfm-cells-state--error' }, t('cellsFailed')) : null,
          !loading && !failed && !cells.length ? h('div', { className: 'dfm-cells-state' }, t('cellsEmpty')) : null,
          cells.length
            ? h('div', { className: 'dfm-cells-field' },
              cells.map(cell => {
                const tone = cellTone(cell.id);
                return h('button', {
                  key: cell.id,
                  type: 'button',
                  className: cell.role === 'user' ? 'dfm-cell dfm-cell--user' : 'dfm-cell',
                  style: {
                    '--cell-hue': tone.hue,
                    '--cell-size': `${cellSize(cell.chars)}px`,
                    '--cell-x': ((cell.id * 37) % 100) / 100,
                    '--cell-y': ((cell.id * 61) % 100) / 100,
                    animationDelay: `${-tone.delay}s`,
                  },
                  title: cell.preview,
                  onClick: () => openCell(cell),
                },
                  h('span', { className: 'dfm-cell-glow', 'aria-hidden': 'true' }),
                  h('span', { className: 'dfm-cell-body' },
                    h('span', { className: 'dfm-cell-text' }, cell.preview),
                    h('span', { className: 'dfm-cell-meta' },
                      h('span', null, relativeTime(cell.time, localeId)),
                      h('span', { className: 'dfm-cell-dot', 'aria-hidden': 'true' }),
                      h('span', null, String(cell.chars)))));
              }),
              nextOffset !== null
                ? h('button', { type: 'button', className: 'dfm-cells-more', onClick: showMore }, t('cellsMore'))
                : null)
            : null,
          active
            ? h('div', {
              className: 'dfm-cells-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('cellsDetail'),
              onClick: event => { if (event.target === event.currentTarget) setActive(null); },
            },
              h('div', { className: 'dfm-cells-modal-card' },
                h('div', { className: 'dfm-cells-modal-head' },
                  h('span', { className: 'dfm-cells-modal-tag' }, active.role === 'user' ? t('cellsUser') : t('cellsAssistant')),
                  h('span', { className: 'dfm-cells-modal-time' }, new Date(active.time).toLocaleString(localeId === 'zh' ? 'zh-CN' : 'en-US')),
                  h('button', { type: 'button', className: 'dfm-cells-modal-close', onClick: () => setActive(null), 'aria-label': t('cellsClose') }, '×')),
                h('div', { className: 'dfm-cells-modal-body' },
                  detail ? h('p', null, detail.text) : h('p', { className: 'dfm-cells-modal-loading' }, t('cellsLoading')))))
            : null);
      }

      function useLocaleSnapshot() {
        const subscribe = React.useCallback(callback => locale.subscribe(callback), []);
        const getSnapshot = React.useCallback(() => locale.getSnapshot(), []);
        return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
      }

      function ManagementSettings({ settings, onRefresh, localeId }) {
        const [pendingMode, setPendingMode] = React.useState('');
        const [pendingDirectory, setPendingDirectory] = React.useState('');
        const [pendingTarget, setPendingTarget] = React.useState('');
        const [migrationConfirm, setMigrationConfirm] = React.useState(false);
        const [scopeProbe, setScopeProbe] = React.useState(null);
        const [selectedSessionIds, setSelectedSessionIds] = React.useState(settings.bindingSessionIds ?? []);
        const [selectedWorkspaceId, setSelectedWorkspaceId] = React.useState(settings.bindingWorkspaceId ?? '');
        const [sessionItems, setSessionItems] = React.useState(settings.sessionPage?.items ?? []);
        const [missingSessionIds, setMissingSessionIds] = React.useState(settings.sessionPage?.missingSelectedIds ?? []);
        const [sessionTotal, setSessionTotal] = React.useState(settings.sessionPage?.total ?? 0);
        const [nextOffset, setNextOffset] = React.useState(settings.sessionPage?.nextOffset ?? null);
        const [sessionSearch, setSessionSearch] = React.useState('');
        const [loadingMore, setLoadingMore] = React.useState(false);
        const [busy, setBusy] = React.useState(false);
        const [browseOpen, setBrowseOpen] = React.useState(false);
        const [browse, setBrowse] = React.useState(null);
        const [browseError, setBrowseError] = React.useState('');
        const [browseName, setBrowseName] = React.useState('');
        const [error, setError] = React.useState('');
        const [notice, setNotice] = React.useState('');
        const currentMode = settings.bindingMode === 'workspace' ? 'workspace' : 'session';
        const targetPath = directory => {
          const separator = directory.includes('\\') ? '\\' : '/';
          const normalized = directory.replace(/[\\\\/]+$/, '');
          return `${normalized}${separator}memory.sqlite3`;
        };
        const sameIds = (left, right) => left.length === right.length && left.every((id, index) => id === right[index]);
        const persistedSessionIds = settings.bindingSessionIds;
        const sessionDirty = Array.isArray(persistedSessionIds)
          ? !sameIds([...selectedSessionIds].sort(), [...persistedSessionIds].sort())
          : selectedSessionIds.length > 0;
        const workspaceDirty = selectedWorkspaceId !== (settings.bindingWorkspaceId || '');
        const scopeDirty = currentMode === 'session' ? sessionDirty : workspaceDirty;
        const workspaces = Array.isArray(settings.workspaces) ? settings.workspaces : [];
        const canChooseDirectory = typeof uiWorkspace?.pickDirectory === 'function' || typeof uiWorkspace?.listDirectory === 'function';
        const migration = settings.migration;
        const toggleSession = (id, checked) => setSelectedSessionIds(current => checked
          ? (current.includes(id) ? current : [...current, id])
          : current.filter(item => item !== id));
        const discardLocalTargets = () => {
          setSelectedSessionIds(settings.bindingSessionIds ?? []);
          setSelectedWorkspaceId(settings.bindingWorkspaceId ?? '');
        };
        const runAction = async payload => {
          setBusy(true);
          setError('');
          setNotice('');
          try {
            const result = await rpc.call(CHANNEL, SETTINGS_ENDPOINT, payload);
            if (!result || result.ok !== true || !result.value) {
              throw new Error(result?.error?.message || t('settingsErrorTitle'));
            }
            const scope = result.value.scopeSwitch;
            if (scope && scope.switched) {
              setNotice(`${t('settingsSaved')} · ${t('scopeSwitchedTo')} ${result.value.databasePath}`);
            } else if (result.value.warning) {
              setNotice(result.value.warning);
            } else {
              setNotice(payload.action === 'change-database-directory' ? t('migrationChecking')
                : payload.action === 'finalize-migration' ? t('migrationCleanupDone') : t('settingsSaved'));
            }
          } catch (actionError) {
            setError(`${t('settingsErrorTitle')}: ${actionError?.message || t('settingsErrorTitle')}`);
          } finally {
            setBusy(false);
            setPendingMode('');
            setPendingDirectory('');
            setPendingTarget('');
            setMigrationConfirm(false);
            onRefresh();
          }
        };

        // 切换绑定范围前先探测目标范围是否已有历史记忆库。
        // 有就让用户明确选择"读取已有"还是"换一个目录另存"，
        // 避免在不知情的情况下把旧工作区的记忆"切换掉"。
        // probe 只描述"要探测什么"，submit 才是真正的配置写入。
        const beginScopeChange = async (probe, submit) => {
          setBusy(true);
          setError('');
          setNotice('');
          try {
            const response = await rpc.call(CHANNEL, SETTINGS_ENDPOINT, { action: 'inspect-scope', ...probe });
            const info = response && response.ok === true ? response.value : null;
            if (info && info.exists && info.messages > 0) {
              setScopeProbe({ path: info.path, messages: info.messages, submit });
            } else {
              await runAction(submit);
            }
          } catch (probeError) {
            setError(`${t('settingsErrorTitle')}: ${probeError?.message || ''}`);
          } finally {
            setBusy(false);
          }
        };
        const loadMoreSessions = async () => {
          if (nextOffset === null || loadingMore || busy) return;
          setLoadingMore(true);
          setError('');
          try {
            const result = await rpc.call(CHANNEL, SETTINGS_ENDPOINT, { action: 'list-sessions', offset: nextOffset });
            if (!result || result.ok !== true || !result.value) throw new Error(result?.error?.message || t('sessionLoadMoreError'));
            const page = result.value;
            setSessionItems(current => {
              const ids = new Set(current.map(item => item.id));
              return [...current, ...(page.items ?? []).filter(item => !ids.has(item.id))];
            });
            setMissingSessionIds(page.missingSelectedIds ?? []);
            setSessionTotal(page.total ?? sessionTotal);
            setNextOffset(page.nextOffset ?? null);
          } catch (loadError) {
            setError(`${t('sessionLoadMoreError')} ${loadError?.message || ''}`.trim());
          } finally {
            setLoadingMore(false);
          }
        };
        const pickWithBrowser = async () => {
          // The composed picker may serve only the "browse" capability, so the native OS
          // chooser can be refused at runtime even though pickDirectory is callable.
          const listing = await uiWorkspace.listDirectory();
          setBrowse({ path: listing.path, home: listing.home, crumbs: listing.crumbs ?? [], entries: listing.entries ?? [], loading: false });
          setBrowseError('');
          setBrowseOpen(true);
        };
        const loadBrowseDirectory = async path => {
          setBrowse(previous => previous ? { ...previous, loading: true } : previous);
          setBrowseError('');
          try {
            const listing = await uiWorkspace.listDirectory(path);
            setBrowse({ path: listing.path, home: listing.home, crumbs: listing.crumbs ?? [], entries: listing.entries ?? [], loading: false });
          } catch (browseLoadError) {
            setBrowse(previous => previous ? { ...previous, loading: false } : previous);
            setBrowseError(browseLoadError?.message || t('settingsUnavailable'));
          }
        };
        const chooseDirectory = async () => {
          setError('');
          setNotice('');
          if (typeof uiWorkspace?.pickDirectory !== 'function') {
            if (typeof uiWorkspace?.listDirectory === 'function') {
              try {
                await pickWithBrowser();
              } catch (browseError) {
                setError(browseError?.message || t('settingsUnavailable'));
              }
              return;
            }
            setError(t('settingsUnavailable'));
            return;
          }
          try {
            const directory = await uiWorkspace.pickDirectory();
            if (directory) {
              setPendingDirectory(directory);
              setPendingMode('');
              setPendingTarget('');
            }
          } catch (pickerError) {
            // "needs the native capability; the composed picker serves browse" — fall back
            // to the in-app browser instead of surfacing an unusable error.
            if (typeof uiWorkspace?.listDirectory === 'function') {
              try {
                await pickWithBrowser();
                return;
              } catch (browseError) {
                setError(browseError?.message || pickerError?.message || t('settingsUnavailable'));
                return;
              }
            }
            setError(pickerError?.message || t('settingsUnavailable'));
          }
        };
        const query = sessionSearch.trim().toLowerCase();
        const filteredSessions = sessionItems.filter(item => `${item.title} ${item.id}`.toLowerCase().includes(query));
        const filteredMissing = missingSessionIds.filter(id => !query || `${t('sessionUnavailable')} ${id}`.toLowerCase().includes(query));
        const renderSessionItem = item => {
          const date = formatDate(item.createdAt, localeId);
          const meta = [date, item.id].filter(Boolean).join(' · ');
          return h('label', { key: item.id, className: 'dfm-target-option' },
            h('input', {
              type: 'checkbox', checked: selectedSessionIds.includes(item.id), disabled: busy,
              onChange: event => toggleSession(item.id, event.target.checked),
            }),
            h('span', null,
              h('span', { className: 'dfm-target-option-title' }, item.title || item.id),
              h('span', { className: 'dfm-target-option-meta' }, meta)));
        };
        const sessionRows = [
          ...filteredMissing.map(id => h('label', { key: `missing:${id}`, className: 'dfm-target-option' },
            h('input', {
              type: 'checkbox', checked: selectedSessionIds.includes(id), disabled: busy,
              onChange: event => toggleSession(id, event.target.checked),
            }),
            h('span', null,
              h('span', { className: 'dfm-target-option-title' }, t('sessionUnavailable')),
              h('span', { className: 'dfm-target-option-meta' }, id)))),
          ...filteredSessions.map(renderSessionItem),
        ];
        const sessionControls = currentMode === 'session' ? h('div', { className: 'dfm-target-setting' },
          h('h3', { className: 'dfm-settings-title' }, t('sessionTargetsTitle')),
          h('p', { className: 'dfm-setting-hint' }, t('sessionTargetsHint')),
          h('label', { className: 'dfm-target-search' },
            h('span', { className: 'dfm-setting-label' }, t('sessionSearch')),
            h('input', {
              className: 'dfm-control', type: 'search', value: sessionSearch, disabled: busy,
              onChange: event => setSessionSearch(event.target.value),
            })),
          h('div', { className: 'dfm-target-list', role: 'group', 'aria-label': t('sessionTargetsTitle') },
            sessionRows.length ? sessionRows : h('p', { className: 'dfm-target-empty' }, t('sessionNoMatches'))),
          h('div', { className: 'dfm-target-footer' },
            h('span', { className: 'dfm-setting-hint' }, `${formatCount(selectedSessionIds.length, localeId)} ${t('sessionCount')} · ${formatCount(sessionItems.length, localeId)}/${formatCount(sessionTotal, localeId)}`),
            nextOffset !== null ? h('button', {
              type: 'button', className: 'dfm-action', disabled: busy || loadingMore, 'aria-busy': loadingMore,
              onClick: loadMoreSessions,
            }, loadingMore ? t('loadingMoreSessions') : t('loadMoreSessions')) : null),
          !Array.isArray(persistedSessionIds) ? h('p', { className: 'dfm-setting-hint' }, t('sessionDefaultHint'))
            : selectedSessionIds.length === 0 ? h('p', { className: 'dfm-setting-hint' }, t('sessionEmptyWarning')) : null,
          scopeDirty ? h('p', { className: 'dfm-setting-hint' }, t('unsavedTargetsHint')) : null,
          h('div', { className: 'dfm-setting-actions' },
            h('button', {
              type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy || !Array.isArray(persistedSessionIds),
              onClick: () => setPendingTarget('session-default'),
            }, t('sessionDefault')),
            scopeDirty ? h('button', {
              type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy,
              onClick: discardLocalTargets,
            }, t('discardTargetChanges')) : null,
            h('button', {
              type: 'button', className: 'dfm-action', disabled: busy,
              onClick: () => setPendingTarget('session'),
            }, t('sessionSave')))) : h('div', { className: 'dfm-target-setting' },
          h('h3', { className: 'dfm-settings-title' }, t('workspaceTargetTitle')),
          h('p', { className: 'dfm-setting-hint' }, t('workspaceTargetHint')),
          h('label', { className: 'dfm-target-search' },
            h('span', { className: 'dfm-setting-label' }, t('workspaceTargetTitle')),
            h('select', {
              className: 'dfm-control', value: selectedWorkspaceId, disabled: busy,
              onChange: event => setSelectedWorkspaceId(event.target.value),
            },
            h('option', { value: '' }, t('workspaceCurrent')),
            selectedWorkspaceId && !workspaces.some(item => item.id === selectedWorkspaceId)
              ? h('option', { value: selectedWorkspaceId }, `${t('sessionUnavailable')}: ${selectedWorkspaceId}`) : null,
            workspaces.map(workspace => h('option', { key: workspace.id, value: workspace.id }, `${workspace.title} (${formatCount(workspace.sessionCount, localeId)})`)))),
          scopeDirty ? h('p', { className: 'dfm-setting-hint' }, t('unsavedTargetsHint')) : null,
          h('div', { className: 'dfm-setting-actions' },
            scopeDirty ? h('button', {
              type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy,
              onClick: discardLocalTargets,
            }, t('discardTargetChanges')) : null,
            h('button', {
              type: 'button', className: 'dfm-action', disabled: busy,
              onClick: () => setPendingTarget('workspace'),
            }, t('workspaceSave'))));
        const migrationPanel = migration ? h('section', { className: 'dfm-migration', 'aria-labelledby': 'dfm-migration-title' },
          h('h3', { id: 'dfm-migration-title', className: 'dfm-migration-title' }, t('migrationTitle')),
          h('p', { className: 'dfm-migration-path' }, `${t('migrationSource')}: `, h('code', null, migration.sourcePath || '—')),
          h('p', { className: 'dfm-migration-path' }, `${t('migrationTarget')}: `, h('code', null, migration.targetPath || '—')),
          h('p', { className: 'dfm-migration-status', role: migration.state === 'blocked' ? 'alert' : 'status' },
            migration.state === 'checking' ? t('migrationChecking')
              : migration.state === 'ready' ? t('migrationReady')
                : migration.state === 'cleanup-pending' ? t('migrationCleanupPending')
                  : t('migrationBlocked')),
          migration.error ? h('p', { className: 'dfm-settings-message dfm-settings-error', role: 'alert' }, migration.error) : null,
          migration.state === 'ready' || migration.state === 'cleanup-pending'
            ? migrationConfirm ? h('div', { className: 'dfm-confirm' },
              h('p', null, t('migrationCleanupBody')),
              h('div', { className: 'dfm-setting-actions' },
                h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy, onClick: () => setMigrationConfirm(false) }, t('cancel')),
                h('button', {
                  type: 'button', className: 'dfm-action', disabled: busy || !migration.id, 'aria-busy': busy,
                  onClick: () => runAction({ action: 'finalize-migration', migrationId: migration.id }),
                }, busy ? t('savingSettings') : t('migrationCleanupAction'))))
              : h('div', { className: 'dfm-setting-actions' },
                h('button', { type: 'button', className: 'dfm-action', disabled: busy || !migration.id, onClick: () => setMigrationConfirm(true) }, t('migrationCleanupAction')))
            : migration.state === 'blocked' ? h('div', { className: 'dfm-setting-actions' },
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy || !migration.id, 'aria-busy': busy,
                onClick: () => runAction({ action: 'retry-migration-verification', migrationId: migration.id }),
              }, busy ? t('savingSettings') : t('migrationRetry'))) : null) : null;
        return h('section', { className: 'dfm-settings', 'aria-labelledby': 'dfm-settings-title' },
          h('h2', { id: 'dfm-settings-title', className: 'dfm-settings-title' }, t('settingsTitle')),
          h('div', { className: 'dfm-settings-grid' },
            h('div', { className: 'dfm-setting' },
              h('span', { className: 'dfm-setting-label' }, t('bindingLabel')),
              h('div', { className: 'dfm-choice-row', role: 'group', 'aria-label': t('bindingLabel') },
                h('button', {
                  type: 'button', className: 'dfm-choice', 'aria-pressed': currentMode === 'session',
                  disabled: busy || scopeDirty || Boolean(pendingTarget),
                  onClick: () => { setError(''); setNotice(''); setPendingDirectory(''); setPendingMode(currentMode === 'session' ? '' : 'session'); },
                }, t('bindingSession')),
                h('button', {
                  type: 'button', className: 'dfm-choice', 'aria-pressed': currentMode === 'workspace',
                  disabled: busy || scopeDirty || Boolean(pendingTarget),
                  onClick: () => { setError(''); setNotice(''); setPendingDirectory(''); setPendingMode(currentMode === 'workspace' ? '' : 'workspace'); },
                }, t('bindingWorkspace'))),
              h('p', { className: 'dfm-setting-hint' }, t(currentMode === 'workspace' ? 'bindingWorkspaceHint' : 'bindingSessionHint'))),
            h('div', { className: 'dfm-setting' },
              h('span', { className: 'dfm-setting-label' }, t('databaseLabel')),
              h('code', { className: 'dfm-path' }, settings.databasePath || '—'),
              h('div', { className: 'dfm-setting-actions' },
                h('button', {
                  type: 'button', className: 'dfm-action', onClick: chooseDirectory,
                  disabled: busy || scopeDirty || !canChooseDirectory,
                }, t('chooseDirectory')),
                !canChooseDirectory ? h('span', { className: 'dfm-setting-hint' }, t('settingsUnavailable')) : null))),
          sessionControls,
          h('div', { className: 'dfm-setting dfm-setting--strict' },
            h('span', { className: 'dfm-setting-label' }, t('strictScopeLabel')),
            h('p', { className: 'dfm-setting-hint' }, t('strictScopeHint')),
            h('p', { className: 'dfm-setting-hint' }, t('strictScopePath'), ': ',
              h('code', null, settings.scopePath || t('strictScopeNoPath'))),
            settings.scopeBackfill
              ? h('p', { className: 'dfm-setting-hint' },
                settings.scopeBackfill.state === 'ready'
                  ? `${t('strictScopeBackfilled')} ${settings.scopeBackfill.sessions ?? 0}`
                  : settings.scopeBackfill.state === 'failed'
                    ? `${t('strictScopeBackfillFailed')} ${settings.scopeBackfill.error ?? ''}`
                    : t('strictScopeBackfilling'))
              : null,
            h('div', { className: 'dfm-setting-actions' },
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy,
                'aria-pressed': Boolean(settings.strictScope),
                onClick: () => runAction({ action: 'set-strict-scope', enabled: !settings.strictScope }),
              }, settings.strictScope ? t('strictScopeOn') : t('strictScopeOff')),
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy,
                onClick: () => runAction({ action: 'split-bank', sourceDatabase: settings.databasePath }),
              }, t('strictScopeSplit')))),
          pendingMode ? h('div', { className: 'dfm-confirm' },
            h('p', null, t('modeConfirmBody')),
            h('div', { className: 'dfm-setting-actions' },
              h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy, onClick: () => setPendingMode('') }, t('cancel')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy, 'aria-busy': busy,
                onClick: () => runAction({ action: 'set-binding-mode', bindingMode: pendingMode }),
              }, busy ? t('savingSettings') : t('confirmChange')))) : null,
          browseOpen && browse ? h('div', { className: 'dfm-confirm' },
            h('p', null, t('browseTitle')),
            h('p', { className: 'dfm-setting-hint' }, t('browseHint')),
            h('p', { className: 'dfm-setting-hint' }, t('browsePathLabel'), ': ', h('code', null, browse.path)),
            h('div', { className: 'dfm-setting-actions' },
              h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: browse.loading, onClick: () => loadBrowseDirectory(browse.home) }, t('browseHome')),
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet', disabled: browse.loading || !browse.crumbs.length,
                onClick: () => { const parent = browse.crumbs[browse.crumbs.length - 1]; if (parent) void loadBrowseDirectory(parent.path); },
              }, t('browseUp'))),
            browse.loading ? h('p', { className: 'dfm-setting-hint' }, t('browseLoading')) : null,
            !browse.loading && !browse.entries.length ? h('p', { className: 'dfm-target-empty' }, t('browseEmpty')) : null,
            h('div', { className: 'dfm-target-list', role: 'group', 'aria-label': t('browseTitle') },
              browse.entries.filter(entry => !entry.hidden).map(entry => h('button', {
                key: entry.path, type: 'button', className: 'dfm-browse-entry', disabled: browse.loading,
                onClick: () => void loadBrowseDirectory(entry.path),
              }, entry.name))),
            h('div', { className: 'dfm-setting-actions' },
              h('input', {
                className: 'dfm-control', type: 'text', value: browseName, disabled: browse.loading,
                placeholder: t('browseCreatePlaceholder'),
                onChange: event => setBrowseName(event.target.value),
              }),
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet',
                disabled: browse.loading || !browseName.trim() || typeof uiWorkspace?.createDirectory !== 'function',
                onClick: async () => {
                  try {
                    const created = await uiWorkspace.createDirectory(browse.path, browseName.trim());
                    setBrowseName('');
                    await loadBrowseDirectory(created);
                  } catch (createError) {
                    setBrowseError(createError?.message || t('settingsUnavailable'));
                  }
                },
              }, t('browseCreate'))),
            browseError ? h('p', { className: 'dfm-settings-message dfm-settings-error', role: 'alert' }, browseError) : null,
            h('div', { className: 'dfm-setting-actions' },
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet',
                onClick: () => { setBrowseOpen(false); setBrowseError(''); setBrowseName(''); },
              }, t('cancel')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: browse.loading,
                onClick: () => {
                  setPendingDirectory(browse.path);
                  setPendingMode('');
                  setPendingTarget('');
                  setBrowseOpen(false);
                  setBrowseError('');
                  setBrowseName('');
                },
              }, t('browseConfirm')))) : null,
          pendingDirectory ? h('div', { className: 'dfm-confirm' },
            h('p', null, t('locationConfirmBody')),
            h('p', { className: 'dfm-setting-hint' }, t('selectedTarget'), ': ', h('code', null, targetPath(pendingDirectory))),
            h('div', { className: 'dfm-setting-actions' },
              h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy, onClick: () => setPendingDirectory('') }, t('cancel')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy, 'aria-busy': busy,
                onClick: () => runAction({ action: 'change-database-directory', directory: pendingDirectory, replaceTarget: true }),
              }, busy ? t('savingSettings') : t('confirmChange')))) : null,
          pendingTarget ? h('div', { className: 'dfm-confirm' },
            h('p', null, t('targetSaveBody')),
            pendingTarget === 'session' && selectedSessionIds.length === 0 ? h('p', { className: 'dfm-setting-hint' }, t('sessionEmptyWarning')) : null,
            h('div', { className: 'dfm-setting-actions' },
              h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy, onClick: () => setPendingTarget('') }, t('cancel')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy, 'aria-busy': busy,
                onClick: () => beginScopeChange(
                  pendingTarget === 'session'
                    ? { bindingMode: 'session', sessionIds: selectedSessionIds }
                    : pendingTarget === 'session-default'
                      ? { bindingMode: 'session', sessionIds: null }
                      : { bindingMode: 'workspace', workspaceId: selectedWorkspaceId },
                  pendingTarget === 'session'
                    ? { action: 'set-session-targets', sessionIds: selectedSessionIds }
                    : pendingTarget === 'session-default'
                      ? { action: 'set-session-targets', sessionIds: null }
                      : { action: 'set-workspace-target', workspaceId: selectedWorkspaceId }),
              }, busy ? t('savingSettings') : t('confirmChange')))) : null,
          scopeProbe ? h('div', { className: 'dfm-confirm dfm-confirm--scope' },
            h('p', null, t('scopeProbeTitle')),
            h('p', { className: 'dfm-setting-hint' },
              t('scopeProbeBody'), ' ', h('code', null, scopeProbe.path), ' ',
              `${scopeProbe.messages} ${t('scopeProbeCount')}`),
            h('div', { className: 'dfm-setting-actions' },
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy,
                onClick: () => { setScopeProbe(null); setPendingDirectory(''); },
              }, t('scopeProbeCancel')),
              h('button', {
                type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy,
                onClick: () => { setScopeProbe(null); setPendingTarget(''); },
              }, t('scopeProbeChooseOther')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy, 'aria-busy': busy,
                onClick: async () => {
                  const pending = scopeProbe;
                  setScopeProbe(null);
                  if (pending) await runAction(pending.submit);
                },
              }, busy ? t('savingSettings') : t('scopeProbeUse')))) : null,
          migrationPanel,
          error ? h('p', { className: 'dfm-settings-message dfm-settings-error', role: 'alert' }, error) : null,
          notice ? h('p', { className: 'dfm-settings-message dfm-settings-success', role: 'status', 'aria-live': 'polite' }, notice) : null);
      }

      return function MemoryPanel() {
        const localeSnapshot = useLocaleSnapshot();
        const localeId = localeSnapshot.active;
        const [requestId, setRequestId] = React.useState(0);
        const [view, setView] = React.useState({
          data: null, settings: null, loading: true, failed: false, settingsLoading: true, settingsFailed: false, settingsError: '',
        });

        React.useEffect(() => {
          let cancelled = false;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          setView(previous => ({ ...previous, loading: true, failed: false, settingsLoading: true, settingsFailed: false, settingsError: '' }));
          const statsRequest = rpc.call(CHANNEL, ENDPOINT, {}, controller.signal).then(result => {
            if (!result || result.ok !== true || !result.value || !result.value.databaseFiles) {
              throw new Error('Invalid storage statistics response');
            }
            if (!cancelled) setView(previous => ({ ...previous, data: result.value, loading: false, failed: false }));
          }).catch(() => {
            if (!cancelled) setView(previous => ({ ...previous, loading: false, failed: true }));
          });
          const settingsRequest = rpc.call(CHANNEL, SETTINGS_ENDPOINT, { action: 'read' }, controller.signal).then(result => {
            if (!result || result.ok !== true) {
              const message = result?.error?.message;
              throw new Error(typeof message === 'string' && message.trim() ? message : t('settingsLoadError'));
            }
            const settings = result.value;
            if (!settings || !['session', 'workspace'].includes(settings.bindingMode) || typeof settings.databasePath !== 'string') {
              throw new Error(t('settingsInvalidResponse'));
            }
            if (!cancelled) setView(previous => ({ ...previous, settings, settingsLoading: false, settingsFailed: false, settingsError: '' }));
          }).catch(error => {
            const message = typeof error?.message === 'string' ? error.message.replace(/\s+/g, ' ').slice(0, 300) : '';
            if (!cancelled) setView(previous => ({ ...previous, settingsLoading: false, settingsFailed: true, settingsError: message }));
          });
          Promise.all([statsRequest, settingsRequest]).finally(() => clearTimeout(timeout));
          return () => {
            cancelled = true;
            clearTimeout(timeout);
            controller.abort();
          };
        }, [requestId, rpc]);

        const data = view.data;
        const lastCapture = data ? formatDate(data.lastCapture, localeId) : null;
        const measured = data ? formatDate(data.measuredAt, localeId) : null;
        const statusText = view.loading ? (data ? t('refreshing') : t('loading')) : measured ? `${t('updated')}: ${measured}` : ' ';
        const categoryRows = data ? [
          { id: 'fleeting', label: t('tierFleeting'), ...data.tiers.fleeting },
          { id: 'episodic', label: t('tierEpisodic'), ...data.tiers.episodic },
          { id: 'durable', label: t('tierDurable'), ...data.tiers.durable },
        ] : [];
        if (data && data.tiers.other && data.tiers.other.chunks > 0) {
          categoryRows.push({ id: 'other', label: t('tierOther'), ...data.tiers.other });
        }
        const recencyRows = data ? [
          { id: 'active', label: t('stateActive'), hint: t('hintActive'), stateClass: 'dfm-state--active', ...data.recency.active },
          { id: 'warm', label: t('stateWarm'), hint: t('hintWarm'), stateClass: 'dfm-state--warm', ...data.recency.warm },
          { id: 'cold', label: t('stateCold'), hint: t('hintCold'), stateClass: 'dfm-state--cold', ...data.recency.cold },
        ] : [];

        const refresh = () => setRequestId(value => value + 1);
        const settingsPanel = view.settings
          ? h(ManagementSettings, { key: `${view.settings.revision ?? 0}:${requestId}`, settings: view.settings, onRefresh: refresh, localeId })
          : view.settingsLoading
            ? h('p', { className: 'dfm-settings-loading', role: 'status' }, t('settingsLoading'))
            : h('div', { className: 'dfm-settings-message dfm-settings-error', role: 'alert' },
              t('settingsLoadError'),
              view.settingsError ? h('details', { style: { marginTop: 8 } },
                h('summary', { style: { cursor: 'pointer' } }, t('settingsErrorDetails')),
                h('code', { style: { display: 'block', marginTop: 6, overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' } }, view.settingsError)) : null,
              h('button', {
                type: 'button', className: 'dfm-refresh', style: { marginTop: 10 }, onClick: refresh,
                disabled: view.loading || view.settingsLoading,
                'aria-busy': view.loading || view.settingsLoading,
              }, view.loading || view.settingsLoading ? t('refreshing') : t('retrySettings')));
        // 顶部指标跟随绑定范围。数据库文件是物理文件、无法按会话切分，
        // 所以它保持全库口径并明确标注；消息/片段/原文体积显示本范围，
        // 并在下方给出全库对照，避免"数字对不上"的困惑。
        const totals = data && data.bankTotals ? data.bankTotals : null;
        const scopeNote = (value, total, format) =>
          !totals || value === total ? null : `${t('scopeOfBank')} ${format(total, localeId)}`;
        const overviewItems = data ? [
          {
            id: 'database', label: t('dbTotal'), value: formatBytes(data.databaseFiles.totalBytes, localeId),
            detail: `${t('mainFile')} ${formatBytes(data.databaseFiles.mainBytes, localeId)} · ${t('walFile')} ${formatBytes(data.databaseFiles.walBytes, localeId)} · ${formatBytes(data.databaseFiles.shmBytes, localeId)}`,
            note: data.scoped ? t('dbSharedNote') : null,
            total: true,
          },
          { id: 'original', label: t('originalText'), value: formatBytes(data.originalTextBytes, localeId),
            note: scopeNote(data.originalTextBytes, totals && totals.originalTextBytes, formatBytes) },
          { id: 'messages', label: t('messageCount'), value: formatCount(data.messages, localeId),
            note: scopeNote(data.messages, totals && totals.messages, formatCount) },
          { id: 'chunks', label: t('chunkCount'), value: formatCount(data.chunks, localeId),
            note: scopeNote(data.chunks, totals && totals.chunks, formatCount) },
        ] : [];

        return h('div', { className: 'dfm-page' },
          h('style', null, styles),
          h('div', { className: 'dfm-content' },
            h('header', { className: 'dfm-header' },
              h('div', { className: 'dfm-heading' },
                h('h1', { className: 'dfm-title' }, t('title')),
                h('p', { className: 'dfm-intro' }, t('intro'))),
              h('button', {
                type: 'button',
                className: 'dfm-refresh',
                onClick: refresh,
                disabled: view.loading,
                'aria-busy': view.loading,
              }, view.loading ? t('refreshing') : view.failed && !data ? t('retry') : t('refresh'))),
            h('p', { className: 'dfm-updated', role: 'status', 'aria-live': 'polite' },
              statusText),
            view.failed && data ? h('p', { className: 'dfm-error', role: 'status' }, t('refreshError')) : null,
            !data && view.failed ? h('section', { className: 'dfm-failure', role: 'alert' },
              h('h2', null, t('loadErrorTitle')),
              h('p', null, t('loadErrorBody'))) : null,
            data ? h(React.Fragment, null,
              h('section', { className: 'dfm-section', 'aria-labelledby': 'dfm-storage-title' },
                h('div', { className: 'dfm-section-head' },
                  h('h2', { id: 'dfm-storage-title', className: 'dfm-section-title' }, t('storageTitle'))),
                h('dl', { className: 'dfm-overview' }, overviewItems.map(item =>
                  h('div', { key: item.id, className: item.total ? 'dfm-metric dfm-metric--total' : 'dfm-metric' },
                    h('dt', null, item.label),
                    h('dd', null, item.value,
                      item.detail ? h('small', null, item.detail) : null,
                      item.note ? h('small', { className: 'dfm-metric-scope' }, item.note) : null)))),
                h('p', { className: 'dfm-updated' }, `${t('lastCapture')}: ${lastCapture || t('neverCaptured')}`)),
              data.messages === 0 ? h('p', { className: 'dfm-empty' },
                h('strong', null, t('emptyTitle')),
                t('emptyBody')) : null,
              data.messages > 0 ? h(MemoryCells, { localeId }) : null,
              h(BreakdownTable, {
                id: 'dfm-categories',
                title: t('categoryTitle'),
                note: t('categoryNote'),
                rows: categoryRows,
                localeId,
                t,
              }),
              h(BreakdownTable, {
                id: 'dfm-recency',
                title: t('recencyTitle'),
                note: t('recencyNote'),
                rows: recencyRows,
                localeId,
                t,
              }),
              h('p', { className: 'dfm-note' }, t('logicalNote')))
              : null,
            settingsPanel));
      };
    }

    return {
      inject: ['slots', 'locale', 'connection', 'uiWorkspace'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NAMESPACE, dictionary), 'dafeiyu-memory: locale');
        const t = ctx.locale.bind(NAMESPACE);
        const Panel = createPanel(ctx);
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 20,
          label: () => t('navLabel'),
        }, SidebarIcon));
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
        }, Panel));
      },
    };
  },
});
