# GitHub Actions Workflows

此目錄包含用於自動化部署 Slidev presentations 的 GitHub Actions workflows。

## 工作流程說明

### 1. `deploy.yml` - 自動部署 Workflow

**觸發條件**：
- 手動觸發 (`workflow_dispatch`)，可選擇指定 presentation 資料夾

**功能**：
- 🔍 **自動驗證**：掃描所有符合格式的 presentation 資料夾
- ✅ **結構檢查**：確保資料夾結構符合專案規範
- 🏗️ **批次建置**：使用 `scripts/build/build-all-presentations.sh` 建置所有 presentations
- 📄 **生成首頁**：使用 `scripts/build/generate-index.sh` 生成統一的 index 頁面
- 🚀 **自動部署**：部署到 GitHub Pages

### 2. `ci.yml` - 持續整合 Workflow

**觸發條件**：
- Push 到 main branch
- Pull Request 到 main branch

**功能**：
- 🔍 **變更檢測**：使用 `dorny/paths-filter@v3` 檢測哪些 presentation 有檔案變更
- 📋 **Matrix 策略**：只針對變更的子專案運行檢查，提高 CI 效率
- ✅ **程式碼品質**：對變更的專案執行 ESLint 檢查
- 🔧 **型別檢查**：對變更的專案執行 TypeScript 型別檢查

**運作流程**：
1. **Changes Job**：檢測變更的 presentation 專案
2. **Lint Job**：只針對變更的專案運行 lint 檢查
3. **Typecheck Job**：只針對變更的專案運行類型檢查

**建置流程**：
1. **validate-and-build** Job：
  - 安裝 Node.js 和 PNPM
  - 設置 @antfu/ni 統一套件管理
  - 安裝根目錄依賴項
  - 執行建置腳本 (`scripts/build/build-all-presentations.sh`)
  - 生成首頁 (`scripts/build/generate-index.sh`)
  - 設置並上傳 GitHub Pages artifacts

2. **deploy** Job：
  - 僅在非本地測試環境 (`if: ${{ !github.event.act }}`) 執行
  - 部署到 GitHub Pages 並提供存取網址

## 腳本架構

專案使用模組化的腳本架構，分為三個主要目錄：

### `scripts/dev/` - 開發工具
- **`picker.ts`**：互動式選擇器，用於本地開發時選擇 presentation

### `scripts/build/` - 建置腳本
- **`build-all-presentations.sh`**：建置所有 presentations 的主腳本
- **`generate-index.sh`**：使用模板生成統一首頁的腳本

### `scripts/templates/` - 模板檔案
- **`index.html`**：首頁 HTML 模板

### `scripts/workflow/` - Workflow 測試工具
- **`run-nektos-act.sh`**：本地測試 GitHub Actions 的通用腳本
- **`test-matrix-ci.sh`**：專門測試 CI Matrix Strategy 的腳本

## 專案結構要求

workflows 會驗證以下結構：

```
your-presentation-folder/    # 必須以四個數字開頭 (如：2025-06-06)
├── src/                     # 必須有 src 子目錄
│   ├── slides.md           # 必須有 slides.md 檔案
│   ├── package.json        # 必須有 package.json 檔案
│   └── components/          # 可選：Vue components
└── README.md               # 可選：說明文件
```

## 環境設定

### 必要的 Repository 設定

1. **啟用 GitHub Pages**：
  - 前往 Settings > Pages
  - 選擇 "GitHub Actions" 作為部署來源

2. **設定 Permissions**：
  - 確保 Actions 具有以下權限：
    - `contents: read`
    - `pages: write`
    - `id-token: write`

### 依賴項需求

workflows 使用以下工具：
- **Node.js**: LTS 版本
- **PNPM**: 作為套件管理器 (`pnpm@10.10.0`)
- **@antfu/ni**: 用於統一的套件管理指令
- **ESLint**: 程式碼品質檢查
- **TypeScript**: 類型檢查

## 故障排除

### 常見問題

1. **資料夾格式錯誤**：
  - 確保資料夾名稱以四個數字開頭（如：`2025-06-06`）

2. **缺少必要檔案**：
  - 確保 `src/slides.md` 存在
  - 確保 `src/package.json` 存在

3. **建置失敗**：
  - 檢查 ESLint 錯誤並修正
  - 檢查 TypeScript 類型錯誤並修正
  - 確保所有依賴項已正確安裝

4. **部署失敗**：
  - 確保 GitHub Pages 已啟用
  - 確保 Repository 權限設定正確

### 查看執行記錄

前往 GitHub repository 的 Actions 頁面查看詳細的執行記錄和錯誤訊息。

## 開發建議

### 本地開發
- 使用 `pnpm dev` 進行本地開發（內部調用 `pnpm run picker dev --open`）
- 使用 `picker` 加上 -y 參數代表對全部 presentation 運行相同指令，否則會進入互動式選擇器選擇 presentation

### 程式碼品質
- 提交前執行 `pnpm lint` 確保程式碼品質
- 使用 `pnpm export` 匯出靜態檔案
- 遵循 Conventional Commits 格式撰寫提交訊息

### 本地測試 GitHub Actions

專案提供兩種本地測試工具：

#### 1. 通用 Workflow 測試
使用 `./scripts/workflow/run-nektos-act.sh` 腳本測試 deploy.yml 等 workflow：

**功能**：
- 📋 **互動式選擇**：自動掃描並選擇 `.github/workflows/` 下的 workflow 檔案
- 🐳 **本地執行**：使用 nektos/act 在本地 Docker 環境中執行 workflow
- 📦 **Artifacts 處理**：自動解壓縮執行產生的 artifacts
- 🌐 **即時預覽**：啟動本地 server (port 4173) 預覽生成的靜態網頁

**使用方式**：
```bash
# 執行腳本
./scripts/workflow/run-nektos-act.sh

# 按照提示選擇要測試的 workflow 檔案
# 腳本會自動：
# 1. 使用 nektos/act 執行 workflow
# 2. 解壓縮 artifacts 到 talks 目錄
# 3. 啟動 http://localhost:4173/talks/ 預覽結果
```

#### 2. CI Matrix Strategy 測試
使用 `./scripts/workflow/test-matrix-ci.sh` 腳本專門測試 ci.yml 的 matrix strategy：

**使用方式**：
```bash
# 測試變更檢測
./scripts/workflow/test-matrix-ci.sh changes

# 測試 lint job
./scripts/workflow/test-matrix-ci.sh lint

# 測試 typecheck job
./scripts/workflow/test-matrix-ci.sh typecheck

# 測試所有 job
./scripts/workflow/test-matrix-ci.sh all
```

**前置需求**：
- 安裝 [nektos/act](https://nektosact.com/installation/)
- 安裝並登入 GitHub CLI (`gh auth login`)
- 確保 Docker 環境運行正常

### 批次建置
- 使用 `pnpm build` 清理並建置當前選擇的 presentation
- 使用 `pnpm build:all` 建置所有 presentations（等同於 `pnpm -r run build`）