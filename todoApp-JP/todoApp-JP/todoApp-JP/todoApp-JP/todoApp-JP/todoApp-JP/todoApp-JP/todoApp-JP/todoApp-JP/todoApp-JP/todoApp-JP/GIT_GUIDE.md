# Git 上傳指南

## 初始化 Git 倉庫

1. **初始化 Git**
   ```bash
   git init
   ```

2. **添加所有文件**
   ```bash
   git add .
   ```

3. **創建首次提交**
   ```bash
   git commit -m "Initial commit: Team Todo App with Tailwind CSS and advanced features"
   ```

4. **連接遠程倉庫**（將 `<your-repo-url>` 替換為您的 GitHub/GitLab 倉庫 URL）
   ```bash
   git remote add origin <your-repo-url>
   ```

5. **推送到遠程倉庫**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 項目文件說明

### 需要上傳的文件
- ✅ `src/` - 所有源代碼
- ✅ `index.html` - HTML 模板
- ✅ `package.json` - 項目依賴
- ✅ `package-lock.json` - 鎖定依賴版本
- ✅ `vite.config.js` - Vite 配置
- ✅ `tailwind.config.js` - Tailwind 配置
- ✅ `postcss.config.js` - PostCSS 配置
- ✅ `.gitignore` - Git 忽略文件
- ✅ `README.md` - 項目說明文檔

### 已被 .gitignore 忽略的文件
- ❌ `node_modules/` - 依賴包（不上傳）
- ❌ `dist/` - 構建輸出（不上傳）
- ❌ `*.local` - 本地配置文件

## 克隆後的使用

其他開發者克隆倉庫後需要：

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

## 注意事項

- ✅ 所有舊的 CSS 文件已刪除
- ✅ 項目已清理完畢，可以安全上傳
