<div align="center">

# 🔒 Crypt — Secure File Encryptor

**Your files never leave your devic** · 你的檔案，永遠不會離開這台**。**

A zero-server, fully client-side file encryption tool built on the Web Crypto API.
純前端、零上傳、無追蹤的檔案加密工具。

!license
https://img.shields.io/badge/backend-none-blue
![crypto](https://img.shields.io/badge/crypto-Web%20Crypto%20API-orange)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

English · #-中文

</div>

---

## 🌐 English

### Overview
**Crypt** encrypts and decrypts files entirely inside your browser. There is **no server, no upload**and no tracking** — your files and password never leave your machine. All cryptographic operations run locally via the nativePI.

### ✨ Features
- 🔐 **AES-256-GCM*ated encryption (built-in tamper detection)
- 🔑 **PBKDF2-HMAC-SHA256** key derivation with **600,000 iterations**
- 🧩 **Streaming large-file support** via the File System Access API (16 MB chunks)
- 📊 **Real-time password strength meter**
- 🎲 **Secure password generator** (CSPRNG via `crypto.getRandomValues`)
- 🌐 **Bilingual UI** (English / 繁體中文)
- 🌗 **Dark / Light theme** with persistent preference
- 🖱️ **Drag & drop** file selection
- 📴 **100% offline** — works with no network connection

### 🚀 Getting Started
No build step, no dependencies. Just serve the static files.

```bash
git clone https://github.com/<your-username>/crypt.git
cd crypt

# Option 1 — open directly
open index.html

# Option 2 — run a local server (recommended)
python -m http.server 8080
# then visit http://localhost:8080
```

> 💡 A local server is recommended so the **File System Access API** (used for large files) works correctly.

### 📖 How to Use
1. **Drag & drop** a file (or click to browse).
2. Enter a **password**, or click 🎲 to generate a strong one.
3. Click **Encrypt** → download the `.enc` file.
4. To restore, load the `.enc` file, enter the same password, and click **Decrypt**.

> ⚠️ If you lose the password, the file **cannot** be recovered. There is no backdoor.

### 🔬 How It Works
- **AES-256-GC*** acts like a vault where your password is the only key. GCM adds a *tamper seal*: any modification to the ciphertext makes decryption fail immediately.
- **PBK**2** "grinds" the key 600,000 times, so every brute-force guess costs the same effort — dramatically slowing attacks.

### ⚙️ Technical Specifications
| Item | Value |
|------|-------|
| Cipher | AES-256-GCM |
| Key derivation | PBKDF2-HMAC-SHA256 |
| Iterations | 600,000 |
| Salt | Random 16 bytes (per file) |
| IV | Random 12 bytes (per chunk) |
| Large-file chunk size | 16 MB |
| Small/large threshold | 100 MB |
| Runs on | 100% in-browser (Web Crypto API) |

### 📦 File Format
**Small file (**rsion 1):**
```
[1B version][16B salt][4B iterations][2B nameLen][name][12B IV][ciphertext+tag]
```

**Large file (Version 2, streamed):**
```
[1B version][16B salt][4B iterations][4B chunkSize][2B nameLen][name]
  then repeating: [12B IV][4B cipherLen][ciphertext+tag] ...
```

### ⚠️ Honest Limitations
- Security depends **entirely** on your password strength — no algorithm can save a weak one.
- If the password is lost, the file is gone **forever** (no recovery mechanism).
- It **cannot** protect against a device already compromised by malware.

### 🌍 Browser Support
| Feature | Requirement |
|---------|-------------|
| Encryption / decryption | Any modern browser with Web Crypto API |
| Large-file streaming | Chromium-based browsers (File System Access API) |

### 🗂️ Project Structure
```
.
├── index.html   # UI structure
├── style.css    # Theming (dark/light) & responsive layout
└── app.js       # i18n, crypto logic, UI handlers
```

### 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

### 📄 License
Released under the **MIT License**. See LICENSE for details.

---

## 🀄 中文

### 專案簡介
**Crypt** 是一款完全在瀏覽器內運行的檔案加密／解密工具。**沒有伺服器、沒有上傳、沒有追蹤** —— 你的檔案與密碼永遠不會離開你的裝置。所有加密運算皆透過瀏覽器原生的 https://developer.mozilla.org/docs/Web/API/Web_Crypto_API 在本機完成。

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
git clone https://github.com/<your-username>/crypt.git
cd crypt

# 方法一：直接開啟
open index.html

# 方法二：啟動本機伺服器（建議）
python -m http.server 8080
# 接著開啟 http://localhost:8080
```

> 💡 建議使用本機伺服器，讓大型檔案所需的 **File System Access API** 能正常運作。

### 📖 使用方式
1. **拖曳** 檔案到區塊中（或點擊選擇）。
2. 輸入 **密碼**，或點擊 🎲 產生高強度密碼。
3. 點擊 **加密** → 下載 `.enc` 檔案。
4. 還原時載入 `.enc`、輸入相同密碼，點擊 **解密**。

> ⚠️ 密碼一旦遺失，檔案將**無法**復原，沒有任何後門或找回機制。

### 🔬 運作原理
- **AES-256-GCM** 就像一個超級保險箱，而你的密碼是唯一的鑰匙。GCM 會加上一道「封條」，只要內容被動過，解密時就會立刻失敗。
- **PBKDF2** 把鑰匙反覆打磨 60 萬次才拿去開鎖，讓暴力破解者每猜一次都得付出同樣代價，大幅拖慢破解速度。

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

### ⚠️ 誠實的限制
- 安全性完全取決於你的密碼強度 —— 弱密碼再強的演算法也救不了。
- 密碼一旦遺失，檔案將**永遠**無法復原。
- 本工具無法防護「裝置本身已被惡意程式入侵」的情境。

### 📄 授權
本專案採用 **MIT License** 授權，詳見 LICENSE。

---

<div align="center">
Made with ❤️ and the Web Crypto API · Privacy first, always.
</div>
