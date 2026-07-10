// ================= i18n =================
const I18N = {
    zh: {
        title: "安全檔案加密工具",
        subtitle: "您的檔案不會離開您的裝置。",
        drop: "拖曳檔案到這裡，或點擊選擇",
        pw: "密碼",
        gen: "🎲 產生",
        encrypt: "加密",
        decrypt: "解密",
        needFile: "請選擇檔案",
        needPw: "請輸入密碼",
        encrypting: "加密中...",
        decrypting: "解密中...",
        encDone: "✅ 加密完成",
        decDone: "✅ 解密完成：",
        wrongPw: "❌ 密碼錯誤或檔案損毀",
        encFail: "❌ 加密失敗",
        canceled: "已取消",
        badFormat: "❌ 不支援的檔案格式",
        weak: "弱", medium: "中", strong: "強",
        langBtn: "🌐 EN",
        // 科普
        infoTitle: "ℹ️ 這個工具如何保護你？",
        infoLead: "你的檔案與密碼永遠不會離開這台裝置。沒有伺服器、沒有上傳、沒有追蹤。",
        howTitle: "🔍 它是怎麼運作的？",
        howAes: "AES-256-GCM 就像一個超級保險箱，而你的密碼是唯一的鑰匙。GCM 還會加上一道「封條」，只要有人動過內容，打開時就會立刻發現 —— 這也是為什麼密碼錯誤或檔案損毀時，解密會直接失敗。",
        howPbkdf: "PBKDF2 則像是把鑰匙反覆打磨 60 萬次才拿去開鎖。這讓想暴力破解的攻擊者每猜一次都要付出同樣的代價，大幅拖慢破解速度。",
        specTitle: "⚙️ 技術規格",
        specAlgo: "加密演算法",
        specKdf: "金鑰導出",
        specIter: "迭代次數",
        specSalt: "每次隨機 16 bytes",
        specIv: "每區塊隨機 12 bytes",
        specWhere: "運算位置",
        specWhereV: "100% 瀏覽器本機 (Web Crypto API)",
        limitTitle: "⚠️ 誠實的限制",
        limit1: "安全性完全取決於你的密碼強度 —— 弱密碼再強的演算法也救不了。",
        limit2: "密碼一旦遺失，檔案將永遠無法復原（沒有後門、沒有找回機制）。",
        limit3: "本工具無法防護「裝置本身已被惡意程式入侵」的情境。"
    },
    en: {
        title: "Secure File Encryptor",
        subtitle: "Your files never leave your device.",
        drop: "Drop file here, or click to select",
        pw: "Password",
        gen: "🎲 Generate",
        encrypt: "Encrypt",
        decrypt: "Decrypt",
        f1: "Client-side only", f3: "No uploads", f4: "No tracking",
        needFile: "Please select a file",
        needPw: "Please enter a password",
        encrypting: "Encrypting...",
        decrypting: "Decrypting...",
        encDone: "✅ Encryption completed",
        decDone: "✅ Restored: ",
        wrongPw: "❌ Wrong password or corrupted file",
        encFail: "❌ Encryption failed",
        canceled: "Canceled",
        badFormat: "❌ Unsupported file format",
        weak: "Weak", medium: "Medium", strong: "Strong",
        langBtn: "🌐 中文",
        // info
        infoTitle: "ℹ️ How does this tool protect you?",
        infoLead: "Your files and password never leave this device. No server, no upload, no tracking.",
        howTitle: "🔍 How it works",
        howAes: "AES-256-GCM is like a super-safe, and your password is the only key. GCM also adds a tamper seal — if anyone alters the contents, it's detected instantly. That's why decryption fails outright on a wrong password or corrupted file.",
        howPbkdf: "PBKDF2 is like grinding the key 600,000 times before use. Every guess an attacker makes costs the same effort, dramatically slowing brute-force attacks.",
        specTitle: "⚙️ Technical specs",
        specAlgo: "Cipher",
        specKdf: "Key derivation",
        specIter: "Iterations",
        specSalt: "Random 16 bytes each time",
        specIv: "Random 12 bytes per chunk",
        specWhere: "Runs on",
        specWhereV: "100% in-browser (Web Crypto API)",
        limitTitle: "⚠️ Honest limitations",
        limit1: "Security depends entirely on your password strength — no algorithm saves a weak one.",
        limit2: "If the password is lost, the file is gone forever (no backdoor, no recovery).",
        limit3: "It cannot protect against a device already compromised by malware."
    }
};

let lang = localStorage.getItem("lang") || "zh";
function t(k) { return I18N[lang][k]; }

function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const k = el.getAttribute("data-i18n");
        if (I18N[lang][k]) el.innerText = I18N[lang][k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
        const k = el.getAttribute("data-i18n-ph");
        if (I18N[lang][k]) el.placeholder = I18N[lang][k];
    });
    langBtn.innerText = t("langBtn");
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
}

// ================= 常數 =================
const CHUNK_SIZE = 16 * 1024 * 1024;
const VERSION_SMALL = 1;
const VERSION_LARGE = 2;
const ITERATIONS = 600000;
const SMALL_FILE_LIMIT = 100 * 1024 * 1024;

// ================= DOM =================
const dropZone   = document.getElementById("dropZone");
const dropText   = document.getElementById("dropText");
const fileInput  = document.getElementById("fileInput");
const password   = document.getElementById("password");
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const statusDiv  = document.getElementById("status");
const progWrap   = document.getElementById("progressWrap");
const progBar    = document.getElementById("progressBar");
const langBtn    = document.getElementById("langBtn");
const themeBtn   = document.getElementById("themeBtn");
const genPw      = document.getElementById("genPw");
const togglePw   = document.getElementById("togglePw");
const pwStrength = document.getElementById("pwStrength");
const infoToggle = document.getElementById("infoToggle");
const infoBody   = document.getElementById("infoBody");
const infoArrow  = document.getElementById("infoArrow");

let selectedFile = null;

// ================= 主題 =================
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.innerText = "☀️";
}
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const light = document.body.classList.contains("light");
    themeBtn.innerText = light ? "☀️" : "🌙";
    localStorage.setItem("theme", light ? "light" : "dark");
});

// ================= 語言 =================
langBtn.addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh";
    localStorage.setItem("lang", lang);
    applyLang();
    if (selectedFile) refreshFileLabel();
});
applyLang();

// ================= 科普折疊 =================
infoToggle.addEventListener("click", () => {
    infoBody.classList.toggle("open");
    infoArrow.classList.toggle("open");
});

// ================= 密碼產生器 =================
genPw.addEventListener("click", () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
    const arr = crypto.getRandomValues(new Uint8Array(20));
    let pw = "";
    arr.forEach(n => pw += chars[n % chars.length]);
    password.value = pw;
    password.type = "text";
    togglePw.innerText = "🙈";
    updateStrength();
});

// ================= 密碼顯示切換 =================
togglePw.addEventListener("click", () => {
    if (password.type === "password") { password.type = "text"; togglePw.innerText = "🙈"; }
    else { password.type = "password"; togglePw.innerText = "👁"; }
});

// ================= 密碼強度 =================
password.addEventListener("input", updateStrength);
function updateStrength() {
    const v = password.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 14) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    let pct = 0, color = "#ef4444", label = t("weak");
    if (v.length === 0) { pct = 0; }
    else if (score <= 2) { pct = 33; color = "#ef4444"; label = t("weak"); }
    else if (score <= 4) { pct = 66; color = "#f59e0b"; label = t("medium"); }
    else { pct = 100; color = "#22c55e"; label = t("strong"); }

    pwStrength.innerHTML = `<span style="width:${pct}%;background:${color}"></span>`;
    pwStrength.title = label;
}

// ================= UI 工具 =================
function setStatus(msg) { statusDiv.innerText = msg; }
function setProgress(pct) {
    if (pct === null) { progWrap.style.display = "none"; return; }
    progWrap.style.display = "block";
    progBar.style.width = pct + "%";
}
function setBusy(b) { encryptBtn.disabled = b; decryptBtn.disabled = b; }

function pickFile(file) {
    selectedFile = file;
    dropZone.classList.add("has-file");
    refreshFileLabel();
}
function refreshFileLabel() {
    dropText.innerText = `📄 ${selectedFile.name} (${formatSize(selectedFile.size)})`;
}
function formatSize(b) {
    const u = ["B","KB","MB","GB"];
    let i = 0, n = b;
    while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
    return n.toFixed(1) + " " + u[i];
}

// ================= 拖曳 / 選檔 =================
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) pickFile(fileInput.files[0]);
});
["dragenter","dragover"].forEach(ev =>
    dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add("dragover"); }));
["dragleave","drop"].forEach(ev =>
    dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove("dragover"); }));
dropZone.addEventListener("drop", e => {
    if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
});

// ================= 金鑰 =================
async function deriveKey(pwd, salt, iterations) {
    const km = await crypto.subtle.importKey(
        "raw", new TextEncoder().encode(pwd),
        "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
        { name:"PBKDF2", salt, iterations, hash:"SHA-256" },
        km, { name:"AES-GCM", length:256 }, false, ["encrypt","decrypt"]);
}

function validate() {
    if (!selectedFile) { alert(t("needFile")); return false; }
    if (!password.value) { alert(t("needPw")); return false; }
    return true;
}

const supportsFS = "showSaveFilePicker" in window;

// ================= 加密 =================
encryptBtn.addEventListener("click", async () => {
    if (!validate()) return;
    setBusy(true);
    try {
        if (supportsFS && selectedFile.size > SMALL_FILE_LIMIT)
            await encryptLarge(selectedFile, password.value);
        else
            await encryptSmall(selectedFile, password.value);
    } catch (err) {
        console.error(err);
        setStatus(err.name === "AbortError" ? t("canceled") : t("encFail"));
    } finally { setBusy(false); setProgress(null); }
});

async function encryptSmall(file, pwd) {
    setStatus(t("encrypting"));
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(pwd, salt, ITERATIONS);
    const nameBytes = new TextEncoder().encode(file.name);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt(
        { name:"AES-GCM", iv }, key, await file.arrayBuffer());

    const header = new ArrayBuffer(1+16+4+2+nameBytes.length);
    const dv = new DataView(header);
    let off = 0;
    dv.setUint8(off, VERSION_SMALL);            off += 1;
    new Uint8Array(header, off, 16).set(salt);   off += 16;
    dv.setUint32(off, ITERATIONS);               off += 4;
    dv.setUint16(off, nameBytes.length);         off += 2;
    new Uint8Array(header, off).set(nameBytes);

    triggerDownload(new Blob([header, iv, enc]), file.name + ".enc");
    setStatus(t("encDone"));
}

async function encryptLarge(file, pwd) {
    const handle = await window.showSaveFilePicker({ suggestedName: file.name + ".enc" });
    const w = await handle.createWritable();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(pwd, salt, ITERATIONS);
    const nameBytes = new TextEncoder().encode(file.name);

    const header = new ArrayBuffer(1+16+4+4+2+nameBytes.length);
    const dv = new DataView(header);
    let off = 0;
    dv.setUint8(off, VERSION_LARGE);            off += 1;
    new Uint8Array(header, off, 16).set(salt);   off += 16;
    dv.setUint32(off, ITERATIONS);               off += 4;
    dv.setUint32(off, CHUNK_SIZE);               off += 4;
    dv.setUint16(off, nameBytes.length);         off += 2;
    new Uint8Array(header, off).set(nameBytes);
    await w.write(header);

    let pos = 0;
    while (pos < file.size) {
        const chunk = await file.slice(pos, pos+CHUNK_SIZE).arrayBuffer();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const enc = await crypto.subtle.encrypt({ name:"AES-GCM", iv }, key, chunk);
        const lenBuf = new ArrayBuffer(4);
        new DataView(lenBuf).setUint32(0, enc.byteLength);
        await w.write(iv); await w.write(lenBuf); await w.write(enc);
        pos += CHUNK_SIZE;
        const p = Math.min(100, Math.round(pos/file.size*100));
        setProgress(p); setStatus(`${t("encrypting")} ${p}%`);
        await new Promise(r => setTimeout(r, 0));
    }
    await w.close();
    setStatus(t("encDone"));
}

// ================= 解密 =================
decryptBtn.addEventListener("click", async () => {
    if (!validate()) return;
    setBusy(true);
    try {
        const version = new DataView(await selectedFile.slice(0,1).arrayBuffer()).getUint8(0);
        if (version === VERSION_LARGE) await decryptLarge(selectedFile, password.value);
        else if (version === VERSION_SMALL) await decryptSmall(selectedFile, password.value);
        else setStatus(t("badFormat"));
    } catch (err) {
        console.error(err);
        setStatus(err.name === "AbortError" ? t("canceled") : t("wrongPw"));
    } finally { setBusy(false); setProgress(null); }
});

async function decryptSmall(file, pwd) {
    setStatus(t("decrypting"));
    const buf = new Uint8Array(await file.arrayBuffer());
    const dv = new DataView(buf.buffer);
    let off = 1;
    const salt = buf.slice(off, off+16); off += 16;
    const iterations = dv.getUint32(off); off += 4;
    const nameLen = dv.getUint16(off);    off += 2;
    const filename = new TextDecoder().decode(buf.slice(off, off+nameLen)); off += nameLen;
    const iv = buf.slice(off, off+12);    off += 12;
    const cipher = buf.slice(off);
    const key = await deriveKey(pwd, salt, iterations);
    const dec = await crypto.subtle.decrypt({ name:"AES-GCM", iv }, key, cipher);
    triggerDownload(new Blob([dec]), filename);
    setStatus(t("decDone") + filename);
}

async function decryptLarge(file, pwd) {
    const head = new DataView(await file.slice(0,27).arrayBuffer());
    const salt = new Uint8Array(await file.slice(1,17).arrayBuffer());
    const iterations = head.getUint32(17);
    const nameLen = head.getUint16(25);
    const filename = new TextDecoder().decode(await file.slice(27,27+nameLen).arrayBuffer());

    const handle = await window.showSaveFilePicker({ suggestedName: filename });
    const w = await handle.createWritable();
    const key = await deriveKey(pwd, salt, iterations);

    let pos = 27 + nameLen;
    while (pos < file.size) {
        const iv = new Uint8Array(await file.slice(pos, pos+12).arrayBuffer()); pos += 12;
        const cipherLen = new DataView(await file.slice(pos, pos+4).arrayBuffer()).getUint32(0); pos += 4;
        const cipher = await file.slice(pos, pos+cipherLen).arrayBuffer(); pos += cipherLen;
        const dec = await crypto.subtle.decrypt({ name:"AES-GCM", iv }, key, cipher);
        await w.write(dec);
        const p = Math.min(100, Math.round(pos/file.size*100));
        setProgress(p); setStatus(`${t("decrypting")} ${p}%`);
        await new Promise(r => setTimeout(r, 0));
    }
    await w.close();
    setStatus(t("decDone") + filename);
}

// ================= 下載 =================
function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
}