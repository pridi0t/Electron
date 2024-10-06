// 모듈 가져오기
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    // saveNote: (note) => ipcRenderer.invoke("saveNote", note),            // 메인 프로세스로 노트 데이터 전송 (노트 1개)
    saveNoteList: (notes) => ipcRenderer.invoke("saveNoteList", notes),  // 노트 여러 개 저장
    loadNoteTitleList: () => ipcRenderer.invoke("loadNoteTitleList"),    // 메인프로세스로부터 노트의 제목 리스트 데이터 요청
    loadNoteContent: (id) => ipcRenderer.invoke("loadNoteContent", id),  // 노트 상세보기
    convertFileToNote: () => ipcRenderer.invoke("convertFileToNote")     // 대화 목록 동기화
});