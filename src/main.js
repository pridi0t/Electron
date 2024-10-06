// app: 애플리케이션의 생명 주기 관리
// BrowserWindow : 창 생성시 사용
const { app, BrowserWindow, ipcMain } = require("electron");
const { initDB } = require("./config/sequelize");
const { saveNote, loadNoteTitleList, loadNoteContent } = require("./controllers/noteController");
const path = require("path");

// 애플리케이션이 준비 되었을 때 (이벤트 발생)
app.on("ready", async() => {
    // DB 초기화
    await initDB();

    // 새창 생성 및 설정
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    // index.html 파일 로드
    win.loadFile(path.join(__dirname, "public", "index.html"));
    
    // 개발자 도구 열기
    win.webContents.openDevTools();
});

// 모든 창이 닫혔을 때 (이벤트 발생)
app.on("window-all-closed", () => {
    // macOS가 아닌 경우 애플리케이션을 종료
    // macOS에서는 일반적으로 애플리케이션이 종료되지 않고 백그라운드에서 실행되므로 이 경우에만 app.quit()을 호출해서 종료
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// 애플리케이션 아이콘이 클릭되었을 때 (이벤트 발생)
app.on("activate", () => {
    // 모든 창이 닫혀있다면 새 창 생성
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/* 노트 관련 로직 */
// 노트 저장
ipcMain.handle("saveNote", async(event, note) => {
    return await saveNote(note);
});

// 노트의 제목 리스트 로드
ipcMain.handle("loadNoteTitleList", async() => {
    return await loadNoteTitleList();
});

// 특정 노트 내용 로드
ipcMain.handle("loadNoteContent", async(event, id) => {
    return await loadNoteContent(id);
});
