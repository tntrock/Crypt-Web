<div align="center">

# 🔒 Secure File Encryptor

A zero-server, fully client-side file encryption tool built on the Web Crypto API.  
純前端、零上傳、無追蹤的檔案加密工具。

![license](https://img.shields.io/badge/backend-none-blue)
![crypto](https://img.shields.io/badge/crypto-Web%20Crypto%20API-orange)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

Demo: https://crypt.info-sec.vip
</div>

---

### 專案簡介
**Crypt** 是一款完全在瀏覽器內運行的檔案加密／解密工具。  
**沒有伺服器、沒有上傳、沒有追蹤** — 你的檔案與密碼永遠不會離開你的裝置。  
所有加密運算皆透過瀏覽器原生的 https://developer.mozilla.org/docs/Web/API/Web_Crypto_API 在本機完成。

### ✨ 功能特色
- 🔐 **AES-256-GCM** 具驗證的加密（內建竄改偵測）
- 🔑 **PBKDF2-HMAC-SHA256** 金鑰導出，迭代 **600,000 次**
- 🧩 **大型檔案串流加密**（File System Access API，16 MB 分塊）
- 📊 **即時密碼強度顯示**
- 🎲 **安全密碼產生器**（採用密碼學等級亂數）
- 🌐 **雙語介面**（繁體中文 / English）
- 🌗 **深色 / 淺色主題**，並記憶偏好設定
- 🖱️ **拖曳上傳** 選檔
- 📴 **100% 離線可用**，無需網路連線

### 🚀 開始使用
無需編譯、無任何相依套件，直接部署靜態檔案即可。

```bash
git clone https://github.com/tntrock/Crypt-Web.git
cd crypt

open index.html
```

### 📖 使用方式
1. **拖曳** 檔案到區塊中（或點擊選擇）。
2. 輸入 **密碼**，或點擊 🎲 產生高強度密碼。
3. 點擊 **加密** → 下載 `.enc` 檔案。
4. 還原時載入 `.enc`、輸入相同密碼，點擊 **解密**。

> ⚠️ 密碼一旦遺失，檔案將**無法**復原，沒有任何後門或找回機制。

### ⚙️ 技術規格
| 項目 | 規格 |
|------|------|
| 加密演算法 | AES-256-GCM |
| 金鑰導出 | PBKDF2-HMAC-SHA256 |
| 迭代次數 | 600,000 |
| Salt | 每檔隨機 16 bytes |
| IV | 每區塊隨機 12 bytes |
| 大檔分塊大小 | 16 MB |
| 大／小檔門檻 | 100 MB |
| 運算位置 | 100% 瀏覽器本機（Web Crypto API） |

### 📄 授權
本專案採用 **MIT License** 授權，詳見 LICENSE。
