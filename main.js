// app: 애플리케이션의 생명 주기 관리
// BrowserWindow : 창 생성시 사용
const { app, BrowserWindow, ipcMain } = require("electron");

// 애플리케이션이 준비 되었을 때 (이벤트 발생)
app.on("ready", () => {
    // 새창 생성 및 설정
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: `${__dirname}/preload.js`,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    // index.html 파일 로드
    win.loadFile("index.html");
    
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

// 노트 로직
const fs = require("fs");       // 파일 시스템과 상호작용
const filePath = `${__dirname}/notes.txt`;

// 노트 저장
ipcMain.handle("saveNote", (event, note) => {
    return fs.appendFileSync(filePath, note + "\n");
});

// 노트 로드
ipcMain.handle("loadNotes", () => {
    // 파일이 존재하지 않는 경우 빈 파일 생성
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "");
        return ;
    }
    return fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
})