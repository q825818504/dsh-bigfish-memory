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
        const [selectedSessionIds, setSelectedSessionIds] = React.useState(settings.bindingSessionIds ?? []);
        const [selectedWorkspaceId, setSelectedWorkspaceId] = React.useState(settings.bindingWorkspaceId ?? '');
        const [sessionItems, setSessionItems] = React.useState(settings.sessionPage?.items ?? []);
        const [missingSessionIds, setMissingSessionIds] = React.useState(settings.sessionPage?.missingSelectedIds ?? []);
        const [sessionTotal, setSessionTotal] = React.useState(settings.sessionPage?.total ?? 0);
        const [nextOffset, setNextOffset] = React.useState(settings.sessionPage?.nextOffset ?? null);
        const [sessionSearch, setSessionSearch] = React.useState('');
        const [loadingMore, setLoadingMore] = React.useState(false);
        const [busy, setBusy] = React.useState(false);
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
            setNotice(payload.action === 'change-database-directory' ? t('migrationChecking')
              : payload.action === 'finalize-migration' ? t('migrationCleanupDone') : t('settingsSaved'));
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
        const chooseDirectory = async () => {
          setError('');
          setNotice('');
          if (typeof uiWorkspace?.pickDirectory !== 'function') {
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
                  disabled: busy || scopeDirty || typeof uiWorkspace?.pickDirectory !== 'function',
                }, t('chooseDirectory')),
                typeof uiWorkspace?.pickDirectory !== 'function' ? h('span', { className: 'dfm-setting-hint' }, t('settingsUnavailable')) : null))),
          sessionControls,
          pendingMode ? h('div', { className: 'dfm-confirm' },
            h('p', null, t('modeConfirmBody')),
            h('div', { className: 'dfm-setting-actions' },
              h('button', { type: 'button', className: 'dfm-action dfm-action--quiet', disabled: busy, onClick: () => setPendingMode('') }, t('cancel')),
              h('button', {
                type: 'button', className: 'dfm-action', disabled: busy, 'aria-busy': busy,
                onClick: () => runAction({ action: 'set-binding-mode', bindingMode: pendingMode }),
              }, busy ? t('savingSettings') : t('confirmChange')))) : null,
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
                onClick: () => runAction(pendingTarget === 'session'
                  ? { action: 'set-session-targets', sessionIds: selectedSessionIds }
                  : pendingTarget === 'session-default'
                    ? { action: 'set-session-targets', sessionIds: null }
                    : { action: 'set-workspace-target', workspaceId: selectedWorkspaceId }),
              }, busy ? t('savingSettings') : t('confirmChange')))) : null,
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
        const overviewItems = data ? [
          {
            id: 'database', label: t('dbTotal'), value: formatBytes(data.databaseFiles.totalBytes, localeId),
            detail: `${t('mainFile')} ${formatBytes(data.databaseFiles.mainBytes, localeId)} · ${t('walFile')} ${formatBytes(data.databaseFiles.walBytes, localeId)} · ${t('shmFile')} ${formatBytes(data.databaseFiles.shmBytes, localeId)}`,
            total: true,
          },
          { id: 'original', label: t('originalText'), value: formatBytes(data.originalTextBytes, localeId) },
          { id: 'messages', label: t('messageCount'), value: formatCount(data.messages, localeId) },
          { id: 'chunks', label: t('chunkCount'), value: formatCount(data.chunks, localeId) },
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
                    h('dd', null, item.value, item.detail ? h('small', null, item.detail) : null)))),
                h('p', { className: 'dfm-updated' }, `${t('lastCapture')}: ${lastCapture || t('neverCaptured')}`)),
              data.messages === 0 ? h('p', { className: 'dfm-empty' },
                h('strong', null, t('emptyTitle')),
                t('emptyBody')) : null,
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
