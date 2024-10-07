import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";

// export interface NoteTitleDTO {
//     id: number;
//     title: string;
// }

// export interface NoteDetailDTO {
//     title: string;
//     content: string[];
// }

export interface API {
    /* 대화 관련 로직 */
    convertFileToDB: ()=> Promise<void>;                        // 대화 목록 동기화
    loadConversationList: () => Promise<Conversation[]>;        // 대화 목록 리스트 불러오기
    loadDialogue: (id: number) => Promise<Dialogue[]>;          // 대화 상세보기

    /* 노트 관련 로직 */
    // saveNoteList: (notes: NoteDetailDTO[]) => Promise<NoteTitleDTO[]>;   // 노트 여러 개 저장
    // loadNoteTitleList: () => Promise<NoteTitleDTO[]>;   // 노트의 제목 리스트 불러오기
    // loadNoteContent: (id: number) => Promise<NoteDetailDTO> // 노트 상세보기
}