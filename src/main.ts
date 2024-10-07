// app: 애플리케이션의 생명 주기 관리
// BrowserWindow : 창 생성시 사용
import { app, BrowserWindow, ipcMain } from "electron";
import { initDB } from "./config/sequelize";
import { loadNoteTitleList, loadNoteContent, saveNoteList } from "./controllers/noteController";
import { convertFileToNote } from "./controllers/fileController";
import * as path from "path";

// 전역 변수로 윈도우 참조를 유지하여 가비지 컬렉션 방지
let win: BrowserWindow | null = null;

// 새창 생성 및 설정
function createWindow(): void {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    // index.html 파일 로드
    win.loadFile(path.join(__dirname, "public", "index.html"));
    
    // 개발자 도구 열기
    win.webContents.openDevTools();

    // 창이 닫힐 때의 이벤트 처리
    win.on("closed", () => {
        win = null;
    });
}

// 애플리케이션이 준비 되었을 때 (이벤트 발생)
app.on("ready", async() => {
    // DB 초기화
    await initDB();
    
    // 창 생성
    createWindow();
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
// 노트 1개 저장
// ipcMain.handle("saveNote", async(_, note: any) => {
//     return await saveNote(note);
// });

// 노트의 제목 리스트 로드
ipcMain.handle("loadNoteTitleList", async() => {
    return await loadNoteTitleList();
});

// 특정 노트 내용 로드
ipcMain.handle("loadNoteContent", async(_, id: number) => {
    return await loadNoteContent(id);
});

// 대화 목록 동기화
ipcMain.handle("convertFileToNote", async() => {
    const conversations = await convertFileToNote();
    return await saveNoteList(conversations);
});
