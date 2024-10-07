// import { sequelize } from "../config/sequelize";
// import { NoteTitleDTO, NoteDetailDTO } from "../types/tApi";
// import Note from "../models/Note";

// // 노트 1개 저장
// // async function saveNote(note) {
// //     const { title, content } = note;
// //     try {
// //         const result = await Note.create({ title, content });
// //         return result.id;
// //     } catch (err) {
// //         console.error("[ERROR/DB] saveNote Error", err);
// //         throw err;
// //     }
// // }

// // 노트 리스트 저장
// async function saveNoteList(notes: NoteDetailDTO[]): Promise<Note[]> {
//     // 트랜잭션
//     const transaction = await sequelize.transaction();

//     try {
//         const formattedNotes = notes.map(note => ({
//             title: note.title,
//             content: note.content.join("\n")    // content 배열을 문자열로 변환
//         }));
//         const result = await Note.bulkCreate(formattedNotes, { transaction });
//         await transaction.commit();
//         return result;
//     } catch(err) {
//         await transaction.rollback();   // 에러시 롤백
//         console.error("[ERROR/DB] saveNoteList Error", err);
//         throw err;
//     }
// }

// // 노트의 제목 리스트 로드
// async function loadNoteTitleList(): Promise<NoteTitleDTO[]>{
//     try {
//         const noteList = await Note.findAll();
//         return noteList.map((note: Note) => {
//             return {
//                 id: note.dataValues.id as number,
//                 title: note.dataValues.title as string,
//             } as NoteTitleDTO;
//         });
//     } catch (err) {
//         console.error("[ERROR/DB] loadNotes Error", err);
//         throw err;
//     }
// }

// // 노트 상세보기
// async function loadNoteContent(id: number): Promise<NoteDetailDTO> {
//     try {
//         const note = await Note.findByPk(id);
//         if (note === undefined) {
//             throw new Error("노트를 찾을 수 없습니다."); // 노트가 없는 경우 처리
//         }
//         return {
//             title: note?.dataValues.title,
//             content: note?.dataValues.content || []
//         } as NoteDetailDTO;
//     } catch (err) {
//         console.error("[ERROR/DB] loadNoteById Error", err);
//         throw err;
//     }
// }

// export {
//     // saveNote,
//     saveNoteList,
//     loadNoteTitleList,
//     loadNoteContent
// }
