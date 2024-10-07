export interface NoteTitleDTO {
    id: number;
    title: string;
}

export interface NoteDetailDTO {
    title: string;
    content: string[];
}

export interface API {
    // 노트 여러 개 저장
    saveNoteList: (notes: NoteTitleDTO[]) => Promise<NoteTitleDTO[]>;

    // 노트의 제목 리스트 불러오기
    loadNoteTitleList: () => Promise<NoteTitleDTO[]>;

    // 노트 상세보기
    loadNoteContent: (id: number) => Promise<NoteDetailDTO>;

    // 대화 목록 동기화
    convertFileToNote: () => Promise<void>;
}