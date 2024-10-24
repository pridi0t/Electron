// 모듈 가져오기
import { contextBridge, ipcRenderer } from "electron";
import { ConversationTitleButtonInfo, DialogueInfo } from "./types/tApi";
// import { NoteTitleDTO, NoteDetailDTO } from "./types/note";
// import Note from "./models/Note";

contextBridge.exposeInMainWorld("api", {
    /* 대화 관련 로직 */
    convertFileToDB: (): Promise<void> => ipcRenderer.invoke("convertFileToDB"),                                                 // 대화 목록 동기화
    loadConversationTitleList: (): Promise<ConversationTitleButtonInfo[]> => ipcRenderer.invoke("loadConversationTitleList"),    // 대화 목록 리스트 불러오기
    loadDialogue: (id: number): Promise<DialogueInfo[]> => ipcRenderer.invoke("loadDialogue", id),                                   // 대화 상세보기

    /* 노트 관련 로직 */
    // saveNoteList: (notes: NoteDetailDTO[]): Promise<NoteTitleDTO[]> => ipcRenderer.invoke("saveNoteList", notes),   // 노트 여러 개 저장
    // loadNoteTitleList: (): Promise<NoteTitleDTO[]> => ipcRenderer.invoke("loadNoteTitleList"),                      // 노트의 제목 리스트 불러오기
    // loadNoteContent: (id: number): Promise<NoteDetailDTO> => ipcRenderer.invoke("loadNoteContent", id),             // 노트 상세보기
});