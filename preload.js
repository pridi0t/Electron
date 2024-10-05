// 모듈 가져오기
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    saveNote: (note) => ipcRenderer.invoke("saveNote", note),    // 메인 프로세스로 노트 데이터 전송
    loadNotes: () => ipcRenderer.invoke("loadNotes"),            // 메인프로세스로부터 노트 데이터 요청
});