// 모듈 가져오기
import { contextBridge, ipcRenderer } from "electron";
import { NoteTitleDTO, NoteDetailDTO } from "./types/note";
import Note from "./models/Note";

contextBridge.exposeInMainWorld("api", {
    // 노트 여러 개 저장
    saveNoteList: (notes: NoteDetailDTO[]): Promise<NoteTitleDTO[]> => ipcRenderer.invoke("saveNoteList", notes),

    // 노트의 제목 리스트 불러오기
    loadNoteTitleList: (): Promise<NoteTitleDTO[]> => ipcRenderer.invoke("loadNoteTitleList"),

    // 노트 상세보기
    loadNoteContent: (id: number): Promise<NoteDetailDTO> => ipcRenderer.invoke("loadNoteContent", id),

    // 대화 목록 동기화
    convertFileToNote: (): Promise<void> => ipcRenderer.invoke("convertFileToNote")
});