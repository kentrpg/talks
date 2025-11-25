# 依賴管理策略

## 目前架構

這個 monorepo 使用 PNPM workspace + catalog 來管理依賴,採用**雙層依賴宣告**策略。

### 依賴分層

```
根目錄 (talks/)
├── devDependencies (開發工具)
│   ├── @slidev/cli (所有專案共用)
│   ├── @slidev/theme-* (所有專案共用)
│   ├── eslint, typescript (工具鏈)
│   └── vue, monaco-editor (共用庫)
│
└── 子專案 (YYYY-MM-DD/src/)
    └── dependencies (runtime 依賴)
        ├── @slidev/cli (明確宣告)
        ├── @slidev/theme-* (明確宣告)
        └── vue (明確宣告)
```

### 為什麼要重複宣告?

#### ✅ 優點

1. **Slidev CLI 相容性**: Slidev 在子專案目錄執行時需要找到這些依賴
2. **明確的專案需求**: 每個 presentation 獨立運作
3. **版本統一管理**: Catalog 確保所有專案使用相同版本
4. **PNPM 智能去重**: 實際只會安裝一份,不會浪費空間

#### 🎯 PNPM 如何處理重複宣告

```yaml
# pnpm-lock.yaml 結果
importers:
  .:
    2025-11-19/src:
      dependencies:
        # 指向同一個實例 '@slidev/cli': version: 52.9.1
        '@slidev/cli':
          specifier: 'catalog:'
          version: 52.9.1

    2025-11-25/src:
      dependencies:
        # 指向同一個實例 '@slidev/cli': version: 52.9.1
        '@slidev/cli':
          specifier: 'catalog:'
          version: 52.9.1
```

**實際檔案結構**:
```
node_modules/
└── .pnpm/
    └── @slidev+cli@52.9.1/  # ← 只有一份實體
```

### Catalog 配置

[pnpm-workspace.yaml](../pnpm-workspace.yaml:3-27) 定義所有版本:

```yaml
catalog:
  '@slidev/cli': ^52.1.0
  '@slidev/theme-default': ^0.25.0
  '@slidev/theme-seriph': ^0.25.0
  vue: ^3.5.18
```

所有子專案使用 `catalog:` 引用:

```json
{
  "dependencies": {
    "@slidev/cli": "catalog:",
    "vue": "catalog:"
  }
}
```

### 依賴更新流程

1. **更新版本**: 只需在 [pnpm-workspace.yaml](../pnpm-workspace.yaml) 的 catalog 更新
2. **安裝依賴**: 執行 `pnpm install`
3. **自動同步**: 所有子專案自動使用新版本

### 最佳實踐

#### ✅ 應該做的

- 所有 presentation 專案使用相同的依賴聲明
- 使用 `catalog:` 而非具體版本號
- 在根目錄同時宣告 devDependencies (支援工具鏈)

#### ❌ 不應該做的

- 在子專案使用具體版本號 (破壞統一管理)
- 移除子專案的依賴聲明 (Slidev 可能找不到)
- 混合使用 catalog 和具體版本

### 標準 Presentation 專案結構

每個新的 presentation 都應該使用這個模板:

```json
{
  "name": "YYYY-MM-DD",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "catalog:",
    "@slidev/theme-default": "catalog:",
    "@slidev/theme-seriph": "catalog:",
    "vue": "catalog:"
  }
}
```

### 常見問題

**Q: 為什麼 pnpm-lock.yaml 看起來有重複?**

A: 這是 PNPM 的記錄方式。每個子專案的依賴都會被記錄,但實際只會安裝一份。

**Q: 如何確認沒有重複安裝?**

A: 執行 `pnpm ls @slidev/cli -r` 查看所有專案使用的版本,應該都指向同一個實例。

**Q: 可以完全移除子專案的依賴嗎?**

A: 不建議。Slidev CLI 需要在當前目錄找到依賴才能正常運作。

### 參考資料

- [PNPM Workspace](https://pnpm.io/workspaces)
- [PNPM Catalog](https://pnpm.io/catalogs)
- [Slidev Documentation](https://sli.dev/)