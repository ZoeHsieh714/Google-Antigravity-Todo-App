# Team Todo App

一個現代化的團隊協作待辦事項應用，支援任務分類、搜索、統計和通知功能。

![Team Todo App](https://img.shields.io/badge/React-18.3.1-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff)

## ✨ 功能特點

### 核心功能
- 📝 **任務管理** - 創建、編輯、刪除和完成任務
- 👥 **團隊協作** - 使用團隊代碼共享任務（同設備多標籤頁同步）
- 📅 **期限管理** - 設定任務到期日，自動標記逾期任務
- 📄 **分頁顯示** - 每頁 10 個任務，支援翻頁

### 進階功能
- 🏷️ **任務分類** - 支援工作、個人、緊急、其他四種分類
- 🔍 **搜索功能** - 實時搜索任務名稱或日期
- 📊 **統計面板** - 顯示總任務數、完成率、今日到期、已逾期等統計
- 🔔 **通知提醒** - 智能檢測即將到期的任務，支援瀏覽器通知

### UI/UX
- 🎨 **現代設計** - 使用 Tailwind CSS 構建的簡潔深色主題
- 🎯 **向量圖標** - 集成 Lucide React 圖標庫
- 📱 **響應式設計** - 完美支援桌面、平板和手機
- ⚡ **快速響應** - 基於 localStorage 的本地存儲，即時響應

## 🚀 快速開始

### 環境要求

- Node.js 18.x 或更高版本
- npm 或 yarn

### 安裝步驟

1. **克隆項目**
   ```bash
   git clone <your-repo-url>
   cd todoApp
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發服務器**
   ```bash
   npm run dev
   ```

4. **訪問應用**
   
   打開瀏覽器訪問 `http://localhost:5173`

### 構建生產版本

```bash
npm run build
```

構建後的文件將在 `dist` 目錄中。

## 📖 使用指南

### 1. 加入團隊

首次使用時，輸入：
- **團隊代碼**：您的團隊唯一標識（例如：team-alpha）
- **您的名稱**：您的顯示名稱

> 💡 同一團隊的成員使用相同的團隊代碼即可共享任務

### 2. 創建任務

1. 點擊「新增任務」按鈕
2. 填寫任務名稱
3. 選擇期限日期
4. 選擇任務分類（工作/個人/緊急/其他）
5. 點擊「創建任務」

### 3. 管理任務

- ✅ **完成任務** - 點擊任務前的複選框
- ✏️ **編輯任務** - 點擊編輯按鈕
- 🗑️ **刪除任務** - 點擊刪除按鈕

### 4. 搜索和篩選

- **搜索** - 在搜索框輸入任務名稱或日期
- **分類篩選** - 點擊分類按鈕只顯示特定分類的任務
- **組合使用** - 搜索和篩選可以同時使用

### 5. 查看統計

統計面板實時顯示：
- 📋 總任務數
- ✅ 已完成任務數和完成率
- ⏰ 今日到期任務數
- ⚠️ 已逾期任務數

### 6. 啟用通知

1. 點擊右上角的鈴鐺圖標
2. 勾選「啟用瀏覽器通知」
3. 允許瀏覽器通知權限
4. 系統會自動檢測並提醒即將到期的任務

## 🏗️ 技術棧

### 前端框架
- **React 18.3.1** - UI 框架
- **Vite 5.4.21** - 構建工具

### 樣式
- **Tailwind CSS 3.4.1** - CSS 框架
- **PostCSS & Autoprefixer** - CSS 處理

### 圖標
- **Lucide React 0.294.0** - 向量圖標庫

### 數據存儲
- **localStorage** - 本地數據持久化
- **StorageEvent API** - 跨標籤頁同步

## 📁 項目結構

```
todoApp/
├── src/
│   ├── components/          # React 組件
│   │   ├── TeamSetup.jsx    # 團隊設置頁面
│   │   ├── Header.jsx       # 頁首組件
│   │   ├── TaskList.jsx     # 任務列表
│   │   ├── TaskDetail.jsx   # 任務詳情
│   │   ├── CategoryBadge.jsx    # 分類徽章
│   │   ├── CategoryFilter.jsx   # 分類篩選器
│   │   ├── SearchBar.jsx        # 搜索欄
│   │   ├── StatsDashboard.jsx   # 統計面板
│   │   └── NotificationBell.jsx # 通知鈴鐺
│   ├── utils/               # 工具函數
│   │   ├── storage.js       # 數據存儲
│   │   ├── stats.js         # 統計計算
│   │   └── notifications.js # 通知管理
│   ├── App.jsx              # 主應用組件
│   ├── main.jsx             # 應用入口
│   └── index.css            # Tailwind CSS
├── index.html               # HTML 模板
├── tailwind.config.js       # Tailwind 配置
├── vite.config.js           # Vite 配置
└── package.json             # 項目配置
```

## 🎨 任務分類

應用支援四種任務分類：

| 分類 | 顏色 | 圖標 | 用途 |
|------|------|------|------|
| 🟣 工作 | 紫色 | 💼 | 工作相關任務 |
| 🔵 個人 | 青色 | 👤 | 個人事務 |
| 🔴 緊急 | 紅色 | ⚠️ | 需要優先處理 |
| ⚪ 其他 | 灰色 | 🏷️ | 其他類型 |

## 🔔 通知類型

系統會自動檢測並提醒：

- 🔴 **已逾期** - 任務已過期限日
- 🟡 **今日到期** - 任務今天到期
- 🔵 **明日到期** - 任務明天到期

## 💾 數據存儲

### 存儲方式

應用使用 `localStorage` 存儲數據：
- 每個團隊的任務獨立存儲（key: `team_{teamCode}_tasks`）
- 團隊信息存儲（key: `team_info`）
- 通知設置存儲（key: `notification_settings`）

### 數據結構

```javascript
// 任務對象
{
  id: number,           // 唯一標識
  name: string,         // 任務名稱
  due_date: string,     // 期限日期 (YYYY-MM-DD)
  category: string,     // 分類 (work/personal/urgent/other)
  completed: boolean,   // 完成狀態
  created_at: string,   // 創建時間
  updated_at: string    // 更新時間
}
```

### 跨標籤頁同步

使用 `StorageEvent` API 實現同一瀏覽器多個標籤頁之間的實時同步。

## ⚠️ 限制說明

- **同設備限制** - 數據存儲在本地 localStorage，不支援跨設備同步
- **瀏覽器限制** - 不同瀏覽器的數據獨立，無法共享
- **團隊規模** - 適合小型團隊（5 人以下）使用

> 💡 如需跨設備協作，建議集成雲端後端服務（如 Firebase、Supabase）

## 🔮 未來改進

- [ ] 雲端同步 - 支援跨設備協作
- [ ] 任務優先級 - 高/中/低優先級設定
- [ ] 子任務 - 支援任務分解
- [ ] 標籤系統 - 更靈活的任務組織
- [ ] 團隊協作 - 任務分配、評論功能
- [ ] 數據導出 - 導出為 CSV/JSON
- [ ] 主題切換 - 支援淺色主題
- [ ] 鍵盤快捷鍵 - 提高操作效率

## 📄 許可證

MIT License

## 👨‍💻 開發者

由 Gemini AI 協助開發

---

**享受高效的任務管理！** 🎉
