# 韓國自由行 (Seoul Travel Planner) 網站維護與更新指南

本專案為韓國首爾 5 天 4 夜自由行互動指南網頁，已透過 **GitHub Desktop** 與 **GitHub Pages** 部署至線上。

* **線上公開網址**：[https://celestial1303-design.github.io/seoul-travel/](https://celestial1303-design.github.io/seoul-travel/)
* **GitHub 儲存庫**：[https://github.com/celestial1303-design/seoul-travel](https://github.com/celestial1303-design/seoul-travel)
* **本地同步資料夾**：`d:\Antigravity 工作區\韓國自由行\seoul-travel`

---

## 快速目錄
1. [平日修改與同步更新 SOP](#1-平日修改與同步更新-sop)
2. [如何確認線上更新成功](#2-如何確認線上更新成功)
3. [未來不用時的下架與移除方法](#3-未來不用時的下架與移除方法)
4. [常見問題與排查 (FAQ)](#4-常見問題與排查-faq)

---

## 1. 平日修改與同步更新 SOP

當你修改了行程、CSS 樣式或 JS 互動功能後，請按照以下步驟同步到線上：

### 步驟 A：將修改後的檔案更新到 `seoul-travel`
如果你是在工作區根目錄編輯檔案（例如修改了 `index.html`、`styles.css`、`app.js`）：
* 將修改後的檔案複製並覆蓋到 `seoul-travel` 資料夾中。
*(小提示：你也可以直接編輯 `seoul-travel` 資料夾內的檔案，省去複製步驟)*

### 步驟 B：使用 GitHub Desktop 提交變更 (Commit)
1. 打開 **GitHub Desktop** 應用程式。
2. 左上角確認目前的儲存庫為 **`seoul-travel`**。
3. 程式會自動偵測到你有變更的檔案（左側欄位會顯示修改的檔案列表）。
4. 在左下角的 **Summary** 輸入本次修改的簡短描述（例如：`更新第二天行程景點` 或 `微調 CSS 配色`）。
5. 點擊藍色按鈕 **「Commit to main」**。

### 步驟 C：推送到線上 (Push)
1. Commit 完成後，右上角會出現藍色按鈕 **「Push origin」**。
2. 點擊 **「Push origin」**，等待上傳進度完成。
3. **完成！** GitHub Pages 收到推播後會自動開始打包部署。

---

## 2. 如何確認線上更新成功

1. 推送後約需等待 **1 ～ 3 分鐘**，GitHub 伺服器需要時間建置快取。
2. 開啟線上網址：[https://celestial1303-design.github.io/seoul-travel/](https://celestial1303-design.github.io/seoul-travel/)。
3. **強制重新整理**（避免瀏覽器暫存舊版檔案）：
   * **Windows 電腦**：按下 `Ctrl + F5` 或 `Ctrl + Shift + R`。
   * **手機瀏覽器**：關閉該分頁並清除瀏覽器快取後重新開啟。

---

## 3. 未來不用時的下架與移除方法

### 方案一：暫時下架網站（保留檔案，隨時可重新上架）
1. 前往 GitHub 網頁版 [Pages 設定頁面](https://github.com/celestial1303-design/seoul-travel/settings/pages)。
2. 在頂部顯示站點狀態的方框旁，點選 **「...」** ➔ 選擇 **「Unpublish site」**。
3. 網址會立刻失效變成 404，但你的程式碼不會被刪除。

### 方案二：轉為私有儲存庫 (Make Private)
1. 前往 [儲存庫設定](https://github.com/celestial1303-design/seoul-travel/settings)。
2. 滾動到最下方的 **Danger Zone**。
3. 點選 **「Change repository visibility」** ➔ 改為 **Private**。
4. 免費方案的私有專案不支援 GitHub Pages，網站會自動關閉，外部訪客也看不到程式碼。

### 方案三：徹底刪除儲存庫 (Delete Repository)
1. 前往 [儲存庫設定](https://github.com/celestial1303-design/seoul-travel/settings)。
2. 滾動到最下方點選 **「Delete this repository」**。
3. 輸入儲存庫名稱確認後即徹底刪除。

---

## 4. 常見問題與排查 (FAQ)

* **Q：有沒有不用手動清除快取、就能自動顯示最新版本的方式？**
  * A：**有！本專案已為你內建以下防快取機制：**
    1. **HTML 標頭防快取（已加入）**：在 `<head>` 中加入了 `Cache-Control: no-cache, no-store, must-revalidate`，瀏覽器每次開啟都會主動向伺服器確認是否有新內容。
    2. **版本號參數（Cache Busting，如使用外部 CSS/JS 時）**：在引用的檔案後面加上版本號或時間戳，例如 `<link rel="stylesheet" href="styles.css?v=2">`，瀏覽器會視為新檔案立即下載。
    3. **網址加參數強制刷新**：若遇上極度頑固的手機快取，可直接在網址後方隨意加問號與文字，例如 `https://celestial1303-design.github.io/seoul-travel/?t=1` 即可強迫抓取最新版。
* **Q：新增圖片後線上網頁顯示破圖？**
  * A：請確保圖片副檔名大小寫完全一致（Linux 主機對 `.jpg` 與 `.JPG` 是嚴格區分的），且圖片路徑必須為相對路徑（例如 `./hero.jpg`）。
